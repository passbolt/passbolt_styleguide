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
 * @since         5.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class DisplayMetadataEnablementError extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      showErrorDetails: false // Display flag of the error details area
    };
  }

  /**
   * Bind the component handlers
   */
  bindCallbacks() {
    this.handleErrorDetailsToggle = this.handleErrorDetailsToggle.bind(this);
  }

  /**
   * Whenever the user click on the action
   */
  onClick(e) {
    e.preventDefault();
    this.props.onClickContinue();
  }

  /**
   * Handle the toggle display of error details
   */
  handleErrorDetailsToggle() {
    this.setState({showErrorDetails: !this.state.showErrorDetails});
  }

  /**
   * Does the provided error carry details.
   * @returns {boolean}
   */
  get hasErrorDetails() {
    const error = this.props?.error;
    return Boolean(error?.details) || Boolean(error?.data?.body);
  }

  /**
   * Format the error details as a string.
   * @returns {string}
   */
  formatErrors() {
    const errorMessage = this.props.error?.details || this.props.error?.data;
    return JSON.stringify(errorMessage, null, 4);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="setup-error">
        <h1><Trans>An unexpected error occurred</Trans></h1>
        <p><Trans>Encrypted metadata could not be enabled due to the following reason: </Trans>{this.props.error.message}</p>
        <p><Trans>You can manually enable this capability from the administration workspace.</Trans></p>
        {this.hasErrorDetails &&
          <div className="accordion error-details">
            <div className="accordion-header">
              <button className="no-border" type="button" onClick={this.handleErrorDetailsToggle}>
                {this.state.showErrorDetails
                  ? <CaretDownSVG className="caret-down"/>
                  : <CaretRightSVG className="caret-right"/>
                }
                <span><Trans>Error details</Trans></span>
              </button>
            </div>
            {this.state.showErrorDetails &&
              <div className="accordion-content">
                <div className="input text">
                  <label
                    htmlFor="js_field_debug"
                    className="visuallyhidden">
                    <Trans>Error details</Trans>
                  </label>
                  <textarea
                    id="js_field_debug"
                    defaultValue={`${this.formatErrors()}`}
                    readOnly />
                </div>
              </div>
            }
          </div>
        }
        <div className="form-actions">
          <button onClick={this.onClick.bind(this)} className="button primary big full-width" role="button"><Trans>Go to administration workspace</Trans></button>
        </div>
      </div>
    );
  }
}

DisplayMetadataEnablementError.propTypes = {
  context: PropTypes.any, // The application context
  error: PropTypes.any, // The error to display
  onClickContinue: PropTypes.func.isRequired, // the button callback
};

export default withAppContext(withTranslation("common")(DisplayMetadataEnablementError));
