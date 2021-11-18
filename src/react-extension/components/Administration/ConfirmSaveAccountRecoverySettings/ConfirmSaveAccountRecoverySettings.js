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
 * @since         3.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../contexts/AppContext";
import {DateTime} from "luxon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";

class ConfirmSaveAccountRecoverySettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
      processing: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.processing;
  }

  /**
   * Go to the next process
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.toggleProcessing();
    try {
      await this.saveAccountRecoveryOrganisationSettings();
      await this.handleSaveSuccess();
    } catch (error) {
      await this.handleSaveError(error);
    }
  }

  async saveAccountRecoveryOrganisationSettings() {
    const accountRecoveryOrganisationPolicyDto = {
      policy: this.props.accountRecovery.policy.value,
      account_recovery_organization_key: this.props.accountRecovery.organisationRecoveryKey.value
    };
    await this.props.context.port.request('passbolt.account-recovery.organization.save-settings', accountRecoveryOrganisationPolicyDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The account recovery organization settings has been updated successfully"));
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    this.props.context.setContext({errorDialogProps});
    this.props.dialogContext.open(NotifyError);
  }

  handleClose() {
    this.props.onClose();
  }

  /**
   * Has new account recovery policy
   * @returns {boolean}
   */
  hasNewAccountRecoveryPolicy() {
    return this.props.accountRecovery.policy.hasChanged;
  }

  /**
   * Has new account recovery organisation key
   * @returns {boolean}
   */
  hasNewOrganisationRecoveryKey() {
    return this.props.accountRecovery.organisationRecoveryKey.hasChanged;
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    fingerprint = fingerprint || "";
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    if (date === 'Never') {
      return date;
    }
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Format date
   * @param {string} date The date to format
   * @return {string}
   */
  formatDate(date) {
    return DateTime.fromJSDate(new Date(date)).setLocale(this.props.context.locale).toLocaleString(DateTime.DATETIME_FULL);
  }

  get policy() {
    switch (this.props.accountRecovery.policy.value) {
      case 'mandatory': return this.translate('Mandatory');
      case 'opt-out': return this.translate('Optional, Opt-out');
      case 'opt-in': return this.translate('Optional, Opt-in');
      case 'disabled': return this.translate('Disable');
      default: return '';
    }
  }

  /**
   * Format date
   * @param {string} date The date to format
   * @return {string}
   */
  formatDate(date) {
    return DateTime.fromJSDate(new Date(date)).setLocale(this.props.context.locale).toLocaleString(DateTime.DATETIME_FULL);
  }

  get policy() {
    switch (this.props.accountRecovery.policy.value) {
      case 'mandatory': return this.translate('Mandatory');
      case 'opt-out': return this.translate('Optional, Opt-out');
      case 'opt-in': return this.translate('Optional, Opt-in');
      case 'disabled': return this.translate('Disable');
      default: return '';
    }
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
      <DialogWrapper
        title={this.translate("Save Settings Summary")}
        onClose={this.handleClose}
        disabled={this.state.processing}
        className="save-recovery-account-settings-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            {this.hasNewAccountRecoveryPolicy() &&
              <>
                <label><Trans>New Account Recovery Policy</Trans></label>
                <div className="radiolist-alt">
                  <div className="input radio">
                    <label htmlFor="accountPolicy">
                      <span className="name">{this.policy}</span>
                      <span className="info">
                        {this.props.accountRecovery.policy.info}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            }
            {this.hasNewOrganisationRecoveryKey() &&
              <>
                <label><Trans>New Organization Recovery Key</Trans></label>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="fingerprint">
                        <td className="label"><Trans>Fingerprint</Trans></td>
                        <td className="value">{this.formatFingerprint(this.props.accountRecovery.organisationRecoveryKey.value.fingerprint)}</td>
                      </tr>
                      <tr className="algorithm">
                        <td className="label"><Trans>Algorithm</Trans></td>
                        <td className="value">{this.props.accountRecovery.organisationRecoveryKey.value.algorithm}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label"><Trans>Key length</Trans></td>
                        <td className="value">{this.props.accountRecovery.organisationRecoveryKey.value.length}</td>
                      </tr>
                      <tr className="created">
                        <td className="label"><Trans>Created</Trans></td>
                        <td className="value">{this.formatDate(this.props.accountRecovery.organisationRecoveryKey.value.created)}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label"><Trans>Expires</Trans></td>
                        <td className="value">{this.formatDateTimeAgo(this.props.accountRecovery.organisationRecoveryKey.value.expires)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            }
          </div>
          <div className="warning message">
            <Trans>Warning, Please review carefully this configuration as it will not be trivial to change this later.</Trans>
          </div>
          <div className="submit-wrapper clearfix">
            <button className={`button button-left ${this.isProcessing ? 'disabled' : ''}`} type="button">{this.translate("Learn More")}</button>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.isProcessing}
              processing={this.isProcessing}
              warning={true}/>
            <button
              className={`button cancel ${this.isProcessing ? 'disabled' : ''}`}
              role="button"
              type='button'
              onClick={this.handleClose}
              disabled={this.isProcessing}>
              <span><Trans>Cancel</Trans></span>
            </button>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmSaveAccountRecoverySettings.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // The close callback
  dialogContext: PropTypes.any, // The dialog context
  accountRecovery: PropTypes.any, // The account recovery
  actionFeedbackContext: PropTypes.object, // the action feeedback context
  t: PropTypes.func, // The translation function
};
export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(ConfirmSaveAccountRecoverySettings))));
