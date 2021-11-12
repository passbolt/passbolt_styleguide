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

class SaveAccountRecoverySettings extends Component {
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
  }

  handleClose() {
    this.props.onClose();
  }

  /**
   * Has new account recovery policy
   * @returns {boolean}
   */
  hasNewAccountRecoveryPolicy() {
    return Boolean(this.props.accountRecovery.policy)
  }

  /**
   * Has new account recovery organisation key
   * @returns {boolean}
   */
  hasNewOrganisationRecoveryKey() {
    return Boolean(this.props.accountRecovery.organisationRecoveryKey)
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
                <label>New Account Recovery Policy</label>
                <div className="radiolist-alt">
                  <div className="input radio">
                    <label htmlFor="statusRecoverAccountReject">
                      <span className="name"><Trans>Mandatory</Trans></span>
                      <span className="info">
                        <Trans>Every user is required to provide a copy of their private key and passphrase during the setup.</Trans>
                        <br/>
                        <Trans>Warning: You must inform your users not to store personal passwords or reuse their keys elsewhere.</Trans>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            }
            {this.hasNewOrganisationRecoveryKey() &&
              <>
                <label>New Organisation Recovery Key</label>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="fingerprint">
                        <td className="label">Fingerprint</td>
                        <td className="value">{this.formatFingerprint(this.props.accountRecovery.organisationRecoveryKey.fingerprint)}</td>
                      </tr>
                      <tr className="algorithm">
                        <td className="label">Algoritm</td>
                        <td className="value">{this.props.accountRecovery.organisationRecoveryKey.algorithm}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label">Key length</td>
                        <td className="value">{this.props.accountRecovery.organisationRecoveryKey.keyLength}</td>
                      </tr>
                      <tr className="created">
                        <td className="label">Created</td>
                        <td className="value">{this.formatDateTimeAgo(this.props.accountRecovery.organisationRecoveryKey.created)}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label">Expires</td>
                        <td className="value">{this.formatDateTimeAgo(this.props.accountRecovery.organisationRecoveryKey.expires)}</td>
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

SaveAccountRecoverySettings.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // The close callback
  accountRecovery: PropTypes.any, // The admin user
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(SaveAccountRecoverySettings));
