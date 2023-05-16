/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation, Trans} from "react-i18next";
import DialogWrapper from "../../Dialog/DialogWrapper/DialogWrapper";
import Icon from "../../../../../shared/components/Icons/Icon";

class NotifyError extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      showErrorDetails: false
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleErrorDetailsToggle = this.handleErrorDetailsToggle.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, {capture: true});
  }

  /**
   * componentWillUnmount
   * Invoked immediately before the component is removed from the tree
   * @return {void}
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, {capture: true});
  }

  /**
   * Get the error dialog title
   * @returns {String|string} return default if string is empty
   */
  getTitle() {
    return this.props.title
      ? this.props.title
      : this.props.t("There was an unexpected error...");
  }

  /**
   * Get the error dialog main message
   * @returns {String|string} return default if string is empty
   */
  getMessage() {
    return this.props.error.message;
  }

  /**
   * Handle key down on the component.
   * @params {ReactEvent} The react event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" or "Enter" keys.
    if (event.keyCode === 27 || event.keyCode === 13) {
      // Stop the event propagation in order to avoid a parent component to react to this ESC event.
      event.stopPropagation();
      this.props.onClose();
    }
  }

  /**
   * Handle toggling display of error details.
   */
  handleErrorDetailsToggle() {
    this.setState({
      showErrorDetails: !this.state.showErrorDetails
    });
  }

  /**
   * Returns true if the error embed some details to be displayed.
   * It is the case when the field `details` is set or if there is a field `data` with an non-empty `body` property.
   */
  get hasErrorDetails() {
    return Boolean(this.props.error.data?.body) || Boolean(this.props.error.details);
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
   * @return {JSX}
   */
  render() {
    return (
      <DialogWrapper
        className="dialog-wrapper error-dialog"
        onClose={this.props.onClose}
        title={this.getTitle()}>
        <div className="form-content">
          <p>{this.getMessage()}</p>
          {this.hasErrorDetails &&
                <div className="accordion error-details">
                  <div className="accordion-header">
                    <button type="button" className="link no-border" onClick={this.handleErrorDetailsToggle}>
                      <Trans>Error details</Trans>
                      <Icon baseline={true} name={this.state.showErrorDetails ? "caret-up" : "caret-down"} />
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
                          defaultValue={this.formatErrors()}
                          readOnly />
                      </div>
                    </div>
                  }
                </div>
          }</div>
        <div className="submit-wrapper clearfix">
          <button type="button" className="button primary warning" onClick={this.props.onClose}>Ok</button>
        </div>
      </DialogWrapper>
    );
  }
}

NotifyError.propTypes = {
  title: PropTypes.string, // The title to display in the header
  error: PropTypes.object.isRequired, // The error object to handle in the dialog
  onClose: PropTypes.func, // The close callback
  t: PropTypes.func // the translation function
};

export default withTranslation("common")(NotifyError);
