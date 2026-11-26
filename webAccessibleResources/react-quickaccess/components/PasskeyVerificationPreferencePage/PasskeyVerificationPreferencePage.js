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
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import CloseSVG from "../../../img/svg/close.svg";
import PasskeyVerificationOptions from "../../../shared/components/PasskeyVerificationOptions/PasskeyVerificationOptions";
import { PASSKEY_VERIFICATION_STRICT } from "../../../shared/constants/passkey.const";

/**
 * Asks the user, at their first passkey request requiring user verification, how passbolt verifies such requests.
 */
class PasskeyVerificationPreferencePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: PASSKEY_VERIFICATION_STRICT, processing: false };
    this.bindCallbacks();
    this.containerRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    // Focus inside the page, so that its Escape handler runs instead of the one closing QuickAccess.
    this.containerRef.current.querySelector("input[type='radio']:checked")?.focus();
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handle a preference change.
   * @param {string} value The selected preference.
   */
  handleChange(value) {
    this.setState({ value });
  }

  /**
   * Answer the selected preference.
   * @param {ReactEvent} event The submit event.
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }
    this.setState({ processing: true });
    this.props.context.port.emit(this.props.requestId, "SUCCESS", this.state.value);
    this.props.onComplete();
  }

  /**
   * Abort the request.
   */
  close() {
    this.props.context.port.emit(this.props.requestId, "ERROR", {
      name: "UserAbortsOperationError",
      message: "The dialog has been closed.",
    });
    this.props.onComplete();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Handle key down event
   * @param {ReactEvent} event The triggered event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // If not stopped it bubbles to the QuickAccess component, which closes QuickAccess.
      event.stopPropagation();
      this.close();
    }
  }

  render() {
    const rpId = this.props.rpId;
    return (
      <div className="passkey-verification-preference" onKeyDown={this.handleKeyDown} ref={this.containerRef}>
        <div className="back-link">
          <a className="primary-action">
            <span className="primary-action-title">
              <Trans>Choose how to verify passkeys</Trans>
            </span>
          </a>
          <a
            onClick={this.handleCloseClick}
            className="secondary-action button-transparent button"
            title={this.translate("Cancel the operation")}
          >
            <CloseSVG className="close" />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </a>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-container">
            <p>
              <Trans>
                <bdi id="rp-id">{{ rpId }}</bdi> requires user verification as part of the passkey protocol. Choose how
                Passbolt handles these requests.
              </Trans>
            </p>
            <PasskeyVerificationOptions
              value={this.state.value}
              onChange={this.handleChange}
              disabled={this.state.processing}
            />
            <p className="hint">
              <Trans>You can change this later in your settings.</Trans>
            </p>
          </div>
          <div className="submit-wrapper">
            <button type="submit" className="button primary big full-width" disabled={this.state.processing}>
              <Trans>Save and continue</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PasskeyVerificationPreferencePage.propTypes = {
  context: PropTypes.object, // The application context
  requestId: PropTypes.string.isRequired, // The request id
  rpId: PropTypes.string.isRequired, // The relying party id of the request
  onComplete: PropTypes.func.isRequired, // Called once the user answered or closed the page
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(PasskeyVerificationPreferencePage));
