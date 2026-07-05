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
import { Trans, withTranslation } from "react-i18next";
import { withPasskey } from "../../../contexts/Authentication/PasskeyContext";
import { isWebAuthnSupported } from "../../../../shared/services/webauthn/webAuthnCeremonyService";
import DeleteSVG from "../../../../img/svg/delete.svg";

/**
 * Lets the user enrol a passkey to sign in without typing their passphrase (passkey login), and
 * see + remove the passkeys they have enrolled. The passphrase keeps working as a fallback.
 */
class DisplayPasskeyUserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.handleEnroll = this.handleEnroll.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get defaultState() {
    return {
      loading: true,
      hasKit: false,
      credentials: [], // the user's enrolled passkeys (server-side)
      name: "", // friendly name for the next passkey to enrol
      processing: false,
      enrolled: false,
      error: null,
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount() {
    if (!isWebAuthnSupported()) {
      this.setState({ loading: false });
      return;
    }
    try {
      const hasKit = await this.props.passkeyContext.loadConfiguration();
      const credentials = await this.loadCredentials();
      this.setState({ loading: false, hasKit: Boolean(hasKit), credentials });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  /**
   * @returns {Promise<Array>}
   */
  async loadCredentials() {
    try {
      return (await this.props.passkeyContext.listCredentials()) || [];
    } catch {
      return [];
    }
  }

  async handleEnroll() {
    if (this.state.processing) {
      return;
    }
    this.setState({ processing: true, error: null, enrolled: false });
    try {
      await this.props.passkeyContext.runEnrollProcess(this.state.name);
      const credentials = await this.loadCredentials();
      this.setState({ processing: false, enrolled: true, hasKit: true, credentials, name: "" });
    } catch (error) {
      console.error(error);
      this.setState({
        processing: false,
        error: error?.message || this.props.t("The passkey enrollment failed. Please try again."),
      });
    }
  }

  async handleDelete(credential) {
    try {
      // Delete by the base64url credential id (what the API keys credentials on) — not the DB row id.
      await this.props.passkeyContext.deleteCredential(credential.credential_id);
      const credentials = await this.loadCredentials();
      this.setState({ credentials, hasKit: credentials.length > 0, error: null });
    } catch (error) {
      this.setState({ error: error?.message || this.props.t("The passkey could not be removed.") });
    }
  }

  credentialLabel(credential) {
    return credential.name || this.props.t("Passkey");
  }

  credentialDate(credential) {
    return credential.created ? new Date(credential.created).toLocaleDateString() : "-";
  }

  render() {
    const supported = isWebAuthnSupported();
    const { credentials } = this.state;
    return (
      <>
        <div className="main-column passkey-settings">
          <div className="main-content">
            <h3>
              <Trans>Passkey</Trans>
            </h3>
            {!supported && (
              <p className="description">
                <Trans>This browser does not support passkeys, so passkey login is unavailable.</Trans>
              </p>
            )}
            {supported && (
              <>
                <p className="description">
                  <Trans>Enrol a passkey to sign in without typing your passphrase.</Trans>{" "}
                  <Trans>Your passphrase keeps working, so a lost passkey never locks you out.</Trans>{" "}
                  <Trans>
                    Passkey login is bound to this browser profile; enrol a passkey on every browser or device you use.
                  </Trans>
                </p>

                {this.state.enrolled && (
                  <div className="message success">
                    <Trans>Your passkey is now enrolled for passkey login.</Trans>
                  </div>
                )}

                {credentials.length === 0 && (
                  <p className="description">
                    <Trans>No passkey is enrolled yet.</Trans>
                  </p>
                )}

                {credentials.length > 0 && (
                  <table className="table-info passkeys">
                    <tbody>
                      {credentials.map((credential) => (
                        <tr key={credential.id || credential.credential_id}>
                          <td className="name ellipsis">{this.credentialLabel(credential)}</td>
                          <td className="date">{this.credentialDate(credential)}</td>
                          <td className="actions">
                            <button
                              type="button"
                              className="button-transparent inline"
                              onClick={() => this.handleDelete(credential)}
                              title={this.props.t("Remove this passkey")}
                            >
                              <DeleteSVG />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="input text">
                  <label htmlFor="passkey-name">
                    <Trans>Name for the new passkey</Trans>
                  </label>
                  <input
                    id="passkey-name"
                    name="name"
                    type="text"
                    maxLength="128"
                    autoComplete="off"
                    placeholder={this.props.t("e.g. Work laptop")}
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    disabled={this.state.loading || this.state.processing}
                  />
                </div>

                {this.state.error && <p className="error-message">{this.state.error}</p>}
              </>
            )}
          </div>
        </div>
        {supported && (
          <div className="actions-wrapper">
            <button
              type="button"
              className={`button primary ${this.state.processing ? "processing" : ""}`}
              onClick={this.handleEnroll}
              disabled={this.state.loading || this.state.processing}
            >
              {this.state.hasKit ? <Trans>Enrol another passkey</Trans> : <Trans>Set up passkey login</Trans>}
            </button>
          </div>
        )}
      </>
    );
  }
}

DisplayPasskeyUserSettings.propTypes = {
  passkeyContext: PropTypes.object, // The passkey context
  t: PropTypes.func, // The translation function
};

export default withPasskey(withTranslation("common")(DisplayPasskeyUserSettings));
