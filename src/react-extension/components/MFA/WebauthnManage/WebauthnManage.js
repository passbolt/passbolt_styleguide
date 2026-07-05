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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation, Trans } from "react-i18next";
import { MfaSettingsWorkflowStates, withMfa } from "../../../contexts/MFAContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import DeleteSVG from "../../../../img/svg/delete.svg";

/**
 * Lists the user's registered WebAuthn security keys and lets them register another key or remove an
 * existing one. Removing the last key disables the provider for the user (handled server-side).
 */
class WebauthnManage extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      credentials: [],
      loading: true,
    };
    this.bindCallbacks();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.loadCredentials();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  /**
   * Load the user's registered security keys.
   * @returns {Promise<Array>} the loaded credentials
   */
  async loadCredentials() {
    const credentials = (await this.props.mfaContext.getWebauthnCredentials()) ?? [];
    this.setState({ credentials, loading: false });
    return credentials;
  }

  /**
   * Register another security key: reuse the setup screen.
   */
  handleAddClick() {
    this.props.mfaContext.navigate(MfaSettingsWorkflowStates.SETUPWEBAUTHN);
  }

  /**
   * Go back to the provider list.
   */
  handleBackClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Remove one security key; if none remain, go back to the provider list.
   * @param {string} credentialId The base64url credential id
   */
  async handleRemoveClick(credentialId) {
    await this.props.mfaContext.removeWebauthnCredential(credentialId);
    // Use the freshly returned list, not this.state — setState has not flushed yet (React batching),
    // so reading this.state.credentials here would see the pre-removal array.
    const credentials = await this.loadCredentials();
    if (credentials.length === 0) {
      this.props.mfaContext.goToProviderList();
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="mfa-setup webauthn-manage main-column">
          <div className="main-content">
            <h3>
              <Trans>Your security keys</Trans>
            </h3>
            {this.state.loading && (
              <p className="description">
                <Trans>Loading your security keys…</Trans>
              </p>
            )}
            {!this.state.loading && this.state.credentials.length === 0 && (
              <p className="description">
                <Trans>You do not have any registered security key yet.</Trans>
              </p>
            )}
            {!this.state.loading && this.state.credentials.length > 0 && (
              <table className="table-info webauthn-credentials">
                <tbody>
                  {this.state.credentials.map((credential) => (
                    <tr key={credential.credential_id}>
                      <td className="name ellipsis">{credential.name || this.props.t("Security key")}</td>
                      <td className="actions">
                        <button
                          type="button"
                          className="button-transparent inline"
                          onClick={() => this.handleRemoveClick(credential.credential_id)}
                          disabled={this.props.mfaContext.isProcessing()}
                          title={this.props.t("Remove this security key")}
                        >
                          <DeleteSVG />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button secondary" type="button" onClick={this.handleBackClick}>
            <span>
              <Trans>Back</Trans>
            </span>
          </button>
          <button className="button primary" type="button" onClick={this.handleAddClick}>
            <span>
              <Trans>Register another security key</Trans>
            </span>
          </button>
        </div>
      </>
    );
  }
}

WebauthnManage.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(WebauthnManage)));
