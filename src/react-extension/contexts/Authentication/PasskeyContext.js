/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.14.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withTranslation } from "react-i18next";
import { isWebAuthnSupported } from "../../../shared/services/webauthn/webAuthnCeremonyService";

export const PasskeyContext = React.createContext({
  loadConfiguration: () => {}, // Load whether a passkey kit exists locally
  hasUserAPasskeyKit: () => {}, // Returns true if the current profile has a passkey kit
  runSignInProcess: () => {}, // Launches the passkey login
  runEnrollProcess: () => {}, // Enrols a new security key for passkey login
  listCredentials: () => {}, // Lists the user's enrolled passkeys
  deleteCredential: () => {}, // Deletes one enrolled passkey
  isOrgEnabled: () => true, // Whether the organization enabled passkey login
  setOrgEnabled: () => {}, // Admin: enable/disable passkey login for the organization
});

/**
 * The related context provider
 */
export class PasskeyContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Load the local kit + organization toggle early so the login button and profile menu can gate on
   * them from the first render.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      await this.loadConfiguration();
    } catch {
      /* defaults (kit absent, org enabled) already apply */
    }
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      hasKit: false, // whether a passkey kit is stored locally for this profile
      orgEnabled: true, // whether the organization enabled passkey login (default: enabled)
      loadConfiguration: this.loadConfiguration.bind(this),
      hasUserAPasskeyKit: this.hasUserAPasskeyKit.bind(this),
      runSignInProcess: this.runSignInProcess.bind(this),
      runEnrollProcess: this.runEnrollProcess.bind(this),
      listCredentials: this.listCredentials.bind(this),
      deleteCredential: this.deleteCredential.bind(this),
      isOrgEnabled: this.isOrgEnabled.bind(this),
      setOrgEnabled: this.setOrgEnabled.bind(this),
    };
  }

  /**
   * Load whether a passkey kit exists locally (and the browser supports security keys).
   * @returns {Promise<boolean>}
   */
  async loadConfiguration() {
    let hasKit = false;
    let orgEnabled = true;
    if (isWebAuthnSupported()) {
      hasKit = Boolean(await this.props.context.port.request("passbolt.passkey.has-local-kit"));
      try {
        orgEnabled = Boolean(await this.props.context.port.request("passbolt.passkey.is-org-enabled"));
      } catch {
        orgEnabled = true; // a transient failure must not hide a working feature
      }
    }
    this.setState({ hasKit, orgEnabled });
    return hasKit;
  }

  /**
   * @returns {boolean} whether the organization enabled passkey login.
   */
  isOrgEnabled() {
    return Boolean(this.state.orgEnabled);
  }

  /**
   * Admin: enable/disable passkey login for the organization.
   * @param {boolean} enabled
   * @returns {Promise<boolean>}
   */
  async setOrgEnabled(enabled) {
    const result = await this.props.context.port.request("passbolt.passkey.set-org-enabled", enabled);
    this.setState({ orgEnabled: Boolean(result) });
    return Boolean(result);
  }

  /**
   * Returns true if the current profile has a passkey kit and can use passkey login.
   * @returns {boolean}
   */
  hasUserAPasskeyKit() {
    return Boolean(this.state.hasKit);
  }

  /**
   * Launch the passkey login.
   *
   * The challenge options come from the background; the WebAuthn call runs here (content-script world
   * at the passbolt origin, so the relying party id is correct); the raw assertion goes back to the
   * background, which releases the server kit half, recovers the passphrase and runs GPGAuth.
   *
   * @returns {Promise<void>}
   */
  async runSignInProcess() {
    const port = this.props.context.port;
    // The background opens the top-level ceremony popup, verifies the assertion, recovers the
    // passphrase and runs GPGAuth; the WebAuthn call cannot run here (extension app iframe).
    await port.request("passbolt.passkey.login");
    await port.request("passbolt.auth.post-login-redirect");
  }

  /**
   * Enrol a new security key for passkey login (the user is authenticated).
   *
   * The creation options come from the background; the WebAuthn call runs here (content-script world
   * at the passbolt origin); the raw attestation goes back to the background, which builds the kit,
   * stores the credential + server half, and keeps the client half locally.
   *
   * @param {string} [name] Optional friendly name for the security key
   * @returns {Promise<Object>} the stored credential summary
   */
  async runEnrollProcess(name) {
    const port = this.props.context.port;
    // The background opens the top-level ceremony popup, collects the attestation, builds the kit and
    // finishes; the WebAuthn call cannot run here (extension app iframe).
    const stored = await port.request("passbolt.passkey.enroll", name);
    this.setState({ hasKit: true });
    return stored;
  }

  /**
   * List the user's enrolled passkeys (for the profile management screen).
   * @returns {Promise<Array>}
   */
  async listCredentials() {
    return this.props.context.port.request("passbolt.passkey.list-credentials");
  }

  /**
   * Delete one enrolled passkey.
   * @param {string} credentialId
   * @returns {Promise<void>}
   */
  async deleteCredential(credentialId) {
    return this.props.context.port.request("passbolt.passkey.delete-credential", credentialId);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <PasskeyContext.Provider value={this.state}>{this.props.children}</PasskeyContext.Provider>;
  }
}

PasskeyContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation("common")(PasskeyContextProvider));

/**
 * Passkey Context Consumer HOC
 * @param WrappedComponent
 */
export function withPasskey(WrappedComponent) {
  return class withPasskey extends React.Component {
    render() {
      return (
        <PasskeyContext.Consumer>
          {(passkeyContext) => <WrappedComponent passkeyContext={passkeyContext} {...this.props} />}
        </PasskeyContext.Consumer>
      );
    }
  };
}
