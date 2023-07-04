/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withAdminSmtpSettings} from "../../../contexts/AdminSmtpSettingsContext";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import Icon from "../../../../shared/components/Icons/Icon";
import AppEmailValidatorService from "../../../../shared/services/validator/AppEmailValidatorService";

const uiStateEnum = {
  FORM: "form",
  ERROR: "error",
  SUCCESS: "success"
};

class SendTestMailDialog extends React.Component {
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
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      uiState: uiStateEnum.FORM,
      recipient: this.props.context.loggedInUser.username,
      processing: false,
      displayLogs: true,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleRetryClick = this.handleRetryClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDisplayLogsClick = this.handleDisplayLogsClick.bind(this);
  }

  /**
   * Handles the form submission
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      this.setState({processing: true});
      const details = await this.props.adminSmtpSettingsContext.sendTestMailTo(this.state.recipient);
      this.setState({
        uiState: uiStateEnum.SUCCESS,
        debugDetails: this.formatDebug(details.debug),
        displayLogs: false,
      });
    } catch (e) {
      this.handleError(e);
    }
    this.setState({processing: false});
  }

  /**
   * Handles form input changes
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleInputChange(event) {
    this.setState({recipient: event.target.value});
  }

  /**
   * Validates the current form
   * @returns {Promise<Boolean>} true if the form is valid, false otherwise
   */
  validateForm() {
    const isValid = AppEmailValidatorService.validate(this.state.recipient, this.props.context.siteSettings);
    this.setState({
      recipientError: isValid ? "" : this.translate("Recipient must be a valid email")
    });
    return isValid;
  }

  /**
   * Format the JSON debug message for the log details.
   * @param {object} data a serializable JS object
   * @returns {string} a human readable JSON
   */
  formatDebug(data) {
    return JSON.stringify(data, null, 4);
  }

  /**
   * Handles error by setting the debug info from the error message and setting the UI state to ERROR
   * @param {Error} error the error to parse
   */
  handleError(error) {
    //If an SMTP timeout errors happens, no debug is available but we have a clear error message in the header.
    const debugInfo = error.data?.body?.debug;
    const errorMessage = debugInfo?.length > 0
      ? debugInfo
      : error?.message;

    this.setState({
      uiState: uiStateEnum.ERROR,
      debugDetails: this.formatDebug(errorMessage),
      displayLogs: true,
    });
  }

  /**
   * Handle the click on "Logs" button by toggling the log details display state.
   */
  handleDisplayLogsClick() {
    this.setState({displayLogs: !this.state.displayLogs});
  }

  /**
   * Handle the click on "Retry" button by setting the UI to FORM state.
   */
  handleRetryClick() {
    this.setState({uiState: uiStateEnum.FORM});
  }

  /**
   * Returns true if the input must be disabled.
   * It's true when the data is under process in the admin SMTP context.
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns the title string to display on the dialog based on the UI state.
   * @returns {string}
   */
  get title() {
    const stateTitles = {
      form: this.translate("Send test email"),
      error: this.translate("Something went wrong!"),
      success: this.translate("Email sent")
    };

    return stateTitles[this.state.uiState] || "";
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper className='send-test-email-dialog' title={this.title}
        onClose={this.props.handleClose} disabled={this.hasAllInputDisabled()}>
        {this.state.uiState === uiStateEnum.FORM &&
          <form onSubmit={this.handleFormSubmit} noValidate>
            <div className="form-content">
              <div className={`input text required ${this.state.recipientError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label><Trans>Recipient</Trans></label>
                <input id="recipient" type="text" name="recipient" required="required" className="required fluid form-element ready" placeholder="name@email.com"
                  onChange={this.handleInputChange} value={this.state.recipient} disabled={this.hasAllInputDisabled()}/>
                {this.state.recipientError &&
                <div className="recipient error-message">{this.state.recipientError}</div>
                }
              </div>
            </div>
            <div className="message notice">
              <strong><Trans>Pro tip</Trans>:</strong> <Trans>after clicking on send, a test email will be sent to the recipient email in order to check that your configuration is correct.</Trans>
            </div>
            <div className="submit-wrapper clearfix">
              <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.handleClose} />
              <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Send")}/>
            </div>
          </form>
        }
        {this.state.uiState === uiStateEnum.ERROR &&
          <>
            <div className="dialog-body">
              <p><Trans>The test email could not be sent. Kindly check the logs below for more information.</Trans><br/>
                <a className="faq-link" href="https://help.passbolt.com/faq/hosting/why-email-not-sent" rel="noopener noreferrer" target="_blank"><Trans>FAQ: Why are my emails not sent?</Trans></a>
              </p>
              <div className="accordion-header">
                <button type="button" className="link no-border" onClick={this.handleDisplayLogsClick}>
                  <Icon name={this.state.displayLogs ? "caret-down" : "caret-right"}/> <Trans>Logs</Trans>
                </button>
              </div>
              {this.state.displayLogs &&
                <div className="accordion-content">
                  <textarea className="full_report" readOnly={true} value={this.state.debugDetails}/>
                </div>
              }
            </div>
            <div className="dialog-footer clearfix">
              <button type="button" className="cancel" disabled={this.hasAllInputDisabled()} onClick={this.handleRetryClick}><Trans>Retry</Trans></button>
              <button
                className="button primary"
                type='button'
                onClick={this.props.handleClose}
                disabled={this.isProcessing}>
                <span><Trans>Close</Trans></span>
              </button>
            </div>
          </>
        }
        {this.state.uiState === uiStateEnum.SUCCESS &&
          <>
            <div className="dialog-body">
              <p><Trans>The test email has been sent. Check your email box, you should receive it in a minute.</Trans></p>
              <div className="accordion-header">
                <button type="button" className="link no-border" onClick={this.handleDisplayLogsClick}>
                  <Icon name={this.state.displayLogs ? "caret-down" : "caret-right"}/> <Trans>Logs</Trans>
                </button>
              </div>
              {this.state.displayLogs &&
                <div className="accordion-content">
                  <textarea className="full_report" readOnly={true} value={this.state.debugDetails}/>
                </div>
              }
            </div>
            <div className="message notice">
              <strong><Trans>Pro tip</Trans>:</strong> <Trans>Check your spam folder if you do not hear from us after a while.</Trans>
            </div>
            <div className="dialog-footer clearfix">
              <button type="button" className="cancel" disabled={this.hasAllInputDisabled()} onClick={this.handleRetryClick}><Trans>Retry</Trans></button>
              <button
                className="button primary"
                type='button'
                onClick={this.props.handleClose}
                disabled={this.isProcessing}>
                <span><Trans>Close</Trans></span>
              </button>
            </div>
          </>
        }
      </DialogWrapper>
    );
  }
}

SendTestMailDialog.propTypes = {
  context: PropTypes.object, // Application context
  adminSmtpSettingsContext: PropTypes.object, // The administration SMTP settings context
  handleClose: PropTypes.func, // The close dialog callback
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminSmtpSettings(withTranslation('common')(SendTestMailDialog)));
