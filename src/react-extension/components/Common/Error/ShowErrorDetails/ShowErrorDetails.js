/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

class ShowErrorDetails extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      showErrorDetails: false
    };
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleErrorDetailsToggle = this.handleErrorDetailsToggle.bind(this);
  }

  /**
   * Get error data
   * @returns {string}
   */
  get errorData() {
    let msg = 'No data available.';
    if (!this.props.error) {
      return msg;
    }

    msg += "Message \n----------------------\n";
    msg += this.props.error.message;
    msg += "\n\n";

    if (this.props.error.data) {
      msg += "Data \n----------------------\n";
      msg += JSON.stringify(this.props.error.data);
      msg += "\n\n";
    }

    msg += "Stack \n----------------------\n";
    msg += this.props.error.stack;

    return msg;
  }

  /**
   * Handle the toggle display of error details
   */
  handleErrorDetailsToggle() {
    this.toggleErrorDetails();
  }

  /**
   * Toggle the display of the error details
   */
  toggleErrorDetails() {
    this.setState({showErrorDetails: !this.state.showErrorDetails});
  }

  /**
   * Get the error main message
   * @returns {String|string} return default if string is empty
   */
  get message() {
    return this.props.error.message || 'No message.';
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="accordion error-details">
        <div className="accordion-header">
          <a onClick={this.handleErrorDetailsToggle}>
            <Icon baseline={true} name={this.state.showErrorDetails ? "caret-down" : "caret-right"}/>
            <Trans>Error details</Trans>
          </a>
        </div>
        {this.state.showErrorDetails &&
        <div className="accordion-content">
          <div className="input text">
            <label htmlFor="show-error-details" className="visuallyhidden">
              {this.props.error.message}
            </label>
            <textarea id="show-error-details" defaultValue={`${this.errorData}`} readOnly/>
          </div>
        </div>
        }
      </div>
    );
  }
}

ShowErrorDetails.propTypes = {
  error: PropTypes.object,
};

export default withTranslation("common")(ShowErrorDetails);
