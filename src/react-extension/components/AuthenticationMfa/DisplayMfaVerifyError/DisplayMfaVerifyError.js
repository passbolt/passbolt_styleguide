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
 * @since         5.17.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import SelectAnotherMfaProvider from "../SelectAnotherMfaProvider/SelectAnotherMfaProvider";
import ReturnToApplication from "../ReturnToApplication/ReturnToApplication";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";
import CarretDownSVG from "../../../../img/svg/caret_down.svg";
import CarretRightSVG from "../../../../img/svg/caret_right.svg";

/**
 * The MFA verification error screen.
 */
class DisplayMfaVerifyError extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      displayLogs: false, // Whether the logs are displayed
    };
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDisplayLogsClick = this.handleDisplayLogsClick.bind(this);
    this.handleTryAgainClick = this.handleTryAgainClick.bind(this);
  }

  /**
   * Handles the click on the display logs button.
   */
  handleDisplayLogsClick() {
    this.setState({ displayLogs: !this.state.displayLogs });
  }

  /**
   * Handles the click on the try again button.
   */
  handleTryAgainClick() {
    this.props.apiMfaVerifyContext.onRetryRequested();
  }

  /**
   * Returns the error formatted for the logs
   * @returns {string}
   */
  get logs() {
    const { name, message, data } = this.props.apiMfaVerifyContext.error || {};
    return JSON.stringify({ name, message, data }, null, 4);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const hideLogs = this.props.apiMfaVerifyContext.hideErrorLogs;
    return (
      <div className="mfa-verify-error">
        <AnimatedFeedback name="attention" />
        <h1>
          <Trans>Something went wrong!</Trans>
        </h1>
        <p>
          {hideLogs ? (
            <Trans>Please try again, or return to the application.</Trans>
          ) : (
            <Trans>Please try again later or check the logs for more information.</Trans>
          )}
        </p>
        <div className="form-actions">
          <button type="button" className="button primary big full-width" onClick={this.handleTryAgainClick}>
            <Trans>Try again</Trans>
          </button>
          <SelectAnotherMfaProvider />
          <ReturnToApplication />
        </div>
        {!hideLogs && (
          <div className="accordion-header">
            <button type="button" className="link no-border" onClick={this.handleDisplayLogsClick}>
              <Trans>Logs</Trans> {this.state.displayLogs ? <CarretDownSVG /> : <CarretRightSVG />}
            </button>
          </div>
        )}
        {this.state.displayLogs && (
          <div className="accordion-content">
            <textarea readOnly={true} value={this.logs} />
          </div>
        )}
      </div>
    );
  }
}

DisplayMfaVerifyError.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(withTranslation("common")(DisplayMfaVerifyError));
