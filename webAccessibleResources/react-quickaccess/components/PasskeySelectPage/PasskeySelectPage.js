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
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import PasskeyTypeSVG from "../../../img/passbolt-default-resource-type-icons/passkey.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";

/**
 * Asks the user which passkey to sign in with on a site. Picking one is the user's consent; cancelling or closing the
 * window hands the request back to the browser.
 */
class PasskeySelectPage extends React.Component {
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
      request: null, // The site of the request and the passkeys the user can pick
      processingPasskeyId: null, // The passkey the site is being signed in with
      errorMessage: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    // The page ended the request: a pick in this window could no longer answer it.
    this.props.context.port.on("passbolt.passkey.request-ended", this.handleClose);
    try {
      const request = await this.props.context.port.request(
        "passbolt.passkey.get-pending-request",
        this.props.requestId,
      );
      this.setState({ request });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    this.props.context.port.removeListener("passbolt.passkey.request-ended", this.handleClose);
  }

  /**
   * Sign in with the passkey the user picked.
   * @param {string} passkeyId The id of the passkey resource.
   * @returns {Promise<void>}
   */
  async handleSelect(passkeyId) {
    this.setState({ processingPasskeyId: passkeyId });
    // The site is signed in while the window may lose the focus to it, which must not close it meanwhile.
    const currentWindowBlurState = this.props.context.shouldCloseAtWindowBlur;
    this.props.context.setWindowBlurBehaviour(false);
    try {
      await this.props.context.port.request("passbolt.passkey.authenticate", this.props.requestId, passkeyId);
      await this.props.context.closeWindow();
    } catch (error) {
      this.props.context.setWindowBlurBehaviour(currentWindowBlurState);
      this.handleSelectError(error);
    }
  }

  /**
   * Show why the site could not be signed in; the site is already told so. When the user cancelled the passphrase
   * prompt, the request still waits: the user may pick another passkey or leave the request to the browser.
   * @param {Error} error The error.
   */
  handleSelectError(error) {
    if (error.name === "UserAbortsOperationError") {
      this.setState({ processingPasskeyId: null });
    } else {
      this.setState({ processingPasskeyId: null, errorMessage: error.message });
    }
  }

  /**
   * Close the window. When no passkey was picked, the browser handles the request.
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
    return Boolean(this.state.errorMessage);
  }

  /**
   * Whether the site is being signed in.
   * @returns {boolean}
   */
  get isProcessing() {
    return this.state.processingPasskeyId !== null;
  }

  /**
   * Render the passkeys the user can pick, names as plain text isolated from the surrounding text direction.
   * @returns {JSX.Element}
   */
  renderPasskeys() {
    return (
      <ul className="list-items passkeys">
        {this.state.request.passkeys.map((passkey) => {
          const isProcessing = this.state.processingPasskeyId === passkey.id;
          return (
            <li className="passkey" key={passkey.id}>
              <button
                type="button"
                className={`passkey-entry ${isProcessing ? "processing" : ""}`}
                onClick={() => this.handleSelect(passkey.id)}
                disabled={this.isProcessing || this.isEnded}
              >
                <span className="teaser-image" aria-hidden="true">
                  <PasskeyTypeSVG />
                </span>
                <span className="passkey-details">
                  <span className="passkey-name">
                    <bdi>{passkey.name}</bdi>
                  </span>
                  {passkey.username && (
                    <span className="passkey-username">
                      <bdi>{passkey.username}</bdi>
                    </span>
                  )}
                </span>
                <span className="passkey-action" aria-hidden="true">
                  {isProcessing ? <SpinnerSVG /> : <CaretRightSVG />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
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
      <div className="passkey-select">
        {request && (
          <>
            <h1 className="title">
              <Trans>
                Sign in to <bdi id="rp-id">{{ rpId }}</bdi>
              </Trans>
            </h1>
            {!this.isEnded && (
              <p className="passkey-message instruction">
                <Trans>Choose the passkey to sign in with.</Trans>
              </p>
            )}
            <div className="index-list">
              <div className="list-container">{this.renderPasskeys()}</div>
            </div>
          </>
        )}
        {this.state.errorMessage && <p className="passkey-message error-message">{this.state.errorMessage}</p>}
        {!this.isEnded && (
          <p className="passkey-message hint">
            <Trans>Select Cancel to use a security key or a passkey stored elsewhere.</Trans>
          </p>
        )}
        <div className="submit-wrapper input flex-row-end">
          {this.isEnded ? (
            <button type="button" className="button primary big close" onClick={this.handleClose}>
              <Trans>Close</Trans>
            </button>
          ) : (
            <button type="button" className="button big cancel" onClick={this.handleClose} disabled={this.isProcessing}>
              <Trans>Cancel</Trans>
            </button>
          )}
        </div>
      </div>
    );
  }
}

PasskeySelectPage.propTypes = {
  context: PropTypes.any, // The application context
  requestId: PropTypes.string, // The id of the get request QuickAccess was opened with
};

export default withAppContext(withTranslation("common")(PasskeySelectPage));
