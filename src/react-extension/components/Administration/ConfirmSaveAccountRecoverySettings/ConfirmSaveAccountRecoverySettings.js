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
 * @since         3.5.0
 */
import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../contexts/AppContext";
import {DateTime} from "luxon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

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
   * Handle close button click.
   */
  handleClose() {
    this.props.onCancel();
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
    await this.saveAccountRecoveryOrganizationSettings();
  }

  async saveAccountRecoveryOrganizationSettings() {
    await this.props.confirmSaveRequested();
  }

  /**
   * Get the current account recovery settings
   * @returns {null|*}
   */
  get currentAccountRecoverySettings() {
    return this.props.accountRecoveryPolicy.currentPolicy;
  }

  /**
   * Get the current account recovery organization key
   * @returns {null|*}
   */
  get currentOrganizationKey() {
    return this.currentAccountRecoverySettings.account_recovery_organization_public_key;
  }

  /**
   * Get the current account recovery organization key
   * @returns {null|*}
   */
  get currentOrganizationKeyDetail() {
    return this.props.accountRecoveryPolicy.currentKeyDetail;
  }

  /**
   * Get the current account recovery policy
   * @returns {null|*}
   */
  get currentPolicy() {
    return this.currentAccountRecoverySettings.policy;
  }

  /**
   * Get the new account recovery settings
   * @returns {null|*}
   */
  get newAccountRecoverySettings() {
    return this.props.accountRecoveryPolicy.newPolicy;
  }

  /**
   * Get the new account recovery organization key
   * @returns {null|*}
   */
  get newOrganizationKey() {
    return this.newAccountRecoverySettings.account_recovery_organization_public_key;
  }

  /**
   * Get the new account recovery organization key detail
   * @returns {null|*}
   */
  get newOrganizationKeyDetail() {
    return this.props.accountRecoveryPolicy.newKeyDetail;
  }

  /**
   * Get the new account recovery policy
   * @returns {null|*}
   */
  get newPolicy() {
    return this.newAccountRecoverySettings.policy;
  }

  /**
   * Has new account recovery policy
   * @returns {boolean}
   */
  hasNewAccountRecoveryPolicy() {
    return this.newPolicy !== this.currentPolicy;
  }

  /**
   * Has new account recovery organization key
   * @returns {boolean}
   */
  hasNewOrganizationRecoveryKey() {
    const hasCurrentOrganizationKey =  Boolean(this.currentOrganizationKey);
    return hasCurrentOrganizationKey ? this.newOrganizationKeyDetail.fingerprint !== this.currentOrganizationKeyDetail.fingerprint : Boolean(this.newOrganizationKey);
  }

  /**
   * format fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    fingerprint = fingerprint || "";
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
  }

  /**
   * format user ids
   * @param user_ids
   * @returns {JSX.Element}
   */
  formatUserIds(user_ids) {
    user_ids = user_ids || [];
    return user_ids.map((user, id) => <Fragment key={id}>{user.name}&lt;{user.email}&gt;<br/></Fragment>);
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
    switch (this.newPolicy) {
      case 'mandatory': return this.translate('Mandatory');
      case 'opt-out': return this.translate('Optional, Opt-out');
      case 'opt-in': return this.translate('Optional, Opt-in');
      case 'disabled': return this.translate('Disable');
      default: return '';
    }
  }

  /**
   * Get the policy info to inform the admin user
   * @returns {string}
   */
  get policyInfo() {
    switch (this.newPolicy) {
      case 'mandatory': return `${this.translate("Every user is required to provide a copy of their private key and passphrase during setup.")}\n${this.translate("Warning: You should inform your users not to store personal passwords.")}`;
      case 'opt-out': return this.translate("Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.");
      case 'opt-in': return this.translate("Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.");
      case 'disabled': return `${this.translate("Backup of the private key and passphrase will not be stored. This is the safest option.")}\n${this.translate("Warning: If users lose their private key and passphrase they will not be able to recover their account.")}`;
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
                        {this.policyInfo}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            }
            {this.hasNewOrganizationRecoveryKey() &&
              <>
                <label><Trans>New Organization Recovery Key</Trans></label>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="user-ids">
                        <td className="label"><Trans>Uid</Trans></td>
                        <td className="value">{this.formatUserIds(this.newOrganizationKeyDetail.user_ids)}</td>
                      </tr>
                      <tr className="fingerprint">
                        <td className="label"><Trans>Fingerprint</Trans></td>
                        <td className="value">{this.formatFingerprint(this.newOrganizationKeyDetail.fingerprint)}</td>
                      </tr>
                      <tr className="algorithm">
                        <td className="label"><Trans>Algorithm</Trans></td>
                        <td className="value">{this.newOrganizationKeyDetail.algorithm}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label"><Trans>Key length</Trans></td>
                        <td className="value">{this.newOrganizationKeyDetail.length}</td>
                      </tr>
                      <tr className="created">
                        <td className="label"><Trans>Created</Trans></td>
                        <td className="value">{this.formatDate(this.newOrganizationKeyDetail.created)}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label"><Trans>Expires</Trans></td>
                        <td className="value">{this.formatDateTimeAgo(this.newOrganizationKeyDetail.expires)}</td>
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
  onCancel: PropTypes.func, // The cancel callback
  confirmSaveRequested: PropTypes.func,
  accountRecoveryPolicy: PropTypes.object, // The account recovery
  actionFeedbackContext: PropTypes.object, // the action feeedback context
  currentKeyDetail: PropTypes.object, // the details of the current key
  newKeyDetail: PropTypes.object, // the details of the new key
  t: PropTypes.func, // The translation function
};
export default withAppContext(withActionFeedback(withTranslation('common')(ConfirmSaveAccountRecoverySettings)));
