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
 * @since         5.18.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";

/** The error the background gives when the site excludes a passkey the user already holds. */
const PASSKEY_CREDENTIAL_EXCLUDED_ERROR = "PasskeyCredentialExcludedError";
/** The error the background gives when the user cancels the passphrase prompt. */
const USER_ABORTS_OPERATION_ERROR = "UserAbortsOperationError";

/**
 * Asks the user whether to save in passbolt the passkey a site wants to register. Closing the window hands the
 * request back to the browser.
 */
class PasskeyCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      request: null, // The site and account of the request
      processing: false,
      isAlreadySaved: false, // The site excludes a passkey the user already holds
      errorMessage: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    // The page ended the request: the Save of this window could no longer answer it.
    this.props.context.port.on("passbolt.passkey.create-request-ended", this.handleClose);
    try {
      const request = await this.props.context.port.request(
        "passbolt.passkey.get-create-request",
        this.props.requestId,
      );
      this.setState({ request });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  }

  /**
   * Save the passkey in passbolt.
   * @returns {Promise<void>}
   */
  async handleSave() {
    this.setState({ processing: true });
    // The passkey is saved while the window may lose the focus to the site, which must not close it meanwhile.
    const currentWindowBlurState = this.props.context.shouldCloseAtWindowBlur;
    this.props.context.setWindowBlurBehaviour(false);
    try {
      await this.props.context.port.request("passbolt.passkey.create", this.props.requestId);
      await this.props.context.closeWindow();
    } catch (error) {
      this.props.context.setWindowBlurBehaviour(currentWindowBlurState);
      await this.handleSaveError(error);
    }
  }

  /**
   * Show why the passkey was not saved, or close the window when the user cancelled. The site is already told so.
   * @param {Error} error The error.
   * @returns {Promise<void>}
   */
  async handleSaveError(error) {
    if (error.name === USER_ABORTS_OPERATION_ERROR) {
      await this.props.context.closeWindow();
    } else if (error.name === PASSKEY_CREDENTIAL_EXCLUDED_ERROR) {
      this.setState({ processing: false, isAlreadySaved: true });
    } else {
      this.setState({ processing: false, errorMessage: error.message });
    }
  }

  /**
   * Close the window. When nothing was saved, the browser handles the request.
   * @returns {Promise<void>}
   */
  async handleClose() {
    await this.props.context.closeWindow();
  }

  /**
   * Whether the request is ended and the window only offers to close.
   * @returns {boolean}
   */
  get isEnded() {
    return this.state.isAlreadySaved || Boolean(this.state.errorMessage);
  }

  /**
   * Render a property the site wrote, as plain text isolated from the surrounding text direction. Sites may leave a
   * name empty: nothing is rendered then.
   * @param {string} id The element id.
   * @param {JSX.Element} name The property name.
   * @param {string} value The property value.
   * @returns {JSX.Element|null}
   */
  renderProperty(id, name, value) {
    if (!value) {
      return null;
    }
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">{name}</span>
          <span className="property-value" id={id}>
            <bdi>{value}</bdi>
          </span>
        </div>
      </li>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const request = this.state.request;
    const rpId = request?.rp_id;
    return (
      <div className="passkey-create">
        {request && (
          <>
            <h1 className="title">
              <Trans>
                Save a passkey for <bdi id="rp-id">{{ rpId }}</bdi>
              </Trans>
            </h1>
            <ul className="properties">
              {this.renderProperty("name", <Trans>Name</Trans>, request.name)}
              {this.renderProperty("user-name", <Trans>Username</Trans>, request.user_name)}
              {this.renderProperty("user-display-name", <Trans>Display name</Trans>, request.user_display_name)}
            </ul>
          </>
        )}
        {this.state.isAlreadySaved && (
          <p className="passkey-create-message already-saved">
            <Trans>A passkey for this account is already saved in passbolt.</Trans>
          </p>
        )}
        {this.state.errorMessage && <p className="passkey-create-message error-message">{this.state.errorMessage}</p>}
        {!this.isEnded && (
          <p className="passkey-create-message hint">
            <Trans>Close this window to use a security key or another passkey.</Trans>
          </p>
        )}
        <div className="submit-wrapper input flex-row-end">
          {this.isEnded ? (
            <button type="button" className="button primary big close" onClick={this.handleClose}>
              <Trans>Close</Trans>
            </button>
          ) : (
            <>
              <button type="button" className="link cancel" onClick={this.handleClose} disabled={this.state.processing}>
                <Trans>Use another authenticator</Trans>
              </button>
              <button
                type="button"
                className={`button primary big save ${this.state.processing ? "processing" : ""}`}
                onClick={this.handleSave}
                disabled={!request || this.state.processing}
              >
                <Trans>Save</Trans>
                {this.state.processing && <SpinnerSVG />}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

PasskeyCreatePage.propTypes = {
  context: PropTypes.any, // The application context
  requestId: PropTypes.string, // The id of the create request QuickAccess was opened with
};

export default withAppContext(withTranslation("common")(PasskeyCreatePage));
