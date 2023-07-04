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
 * @since         3.6.0
 */
import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {DateTime} from "luxon";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

class ConfirmSaveAccountRecoverySettings extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
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
    this.props.onClose();
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
   * @param {Event} event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.toggleProcessing();
    try {
      await this.props.onSubmit();
      this.props.onClose();
    } catch (error) {
      await this.toggleProcessing();
      if (error.name === "UserAbortsOperationError") {
        // It can happen when the user has closed the passphrase entry dialog by instance. Do nothing.
      } else {
        // The component passing the onSubmit prop should take care of any unexpected errors, this code should not run.
        console.error('Uncaught uncontrolled error');
        throw error;
      }
    }
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
    if (date === null) {
      return "n/a";
    }
    if (date === 'Infinity') {
      return this.translate("Never");
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
            {this.props.policy &&
              <>
                <label><Trans>New Account Recovery Policy</Trans></label>
                <div className="radiolist-alt">
                  <div className="input radio">
                    <label htmlFor="accountPolicy">
                      <span className="name">
                        {{
                          mandatory: <Trans>Mandatory</Trans>,
                          'opt-out': <Trans>Optional, Opt-out</Trans>,
                          'opt-in': <Trans>Optional, Opt-in</Trans>,
                          disabled: <Trans>Disable</Trans>
                        }[this.props.policy]}
                      </span>
                      <span className="info">
                        {{
                          mandatory: <><Trans>Every user is required to provide a copy of their private key and passphrase during setup.</Trans><br/><Trans>Warning: You should inform your users not to store personal passwords.</Trans></>,
                          'opt-out': <Trans>Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.</Trans>,
                          'opt-in': <Trans>Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.</Trans>,
                          disabled: <><Trans>Backup of the private key and passphrase will not be stored. This is the safest option.</Trans><br/><Trans>Warning: If users lose their private key and passphrase they will not be able to recover their account.</Trans></>
                        }[this.props.policy]}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            }
            {this.props.keyInfo &&
              <>
                <label><Trans>New Organization Recovery Key</Trans></label>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="user-ids">
                        <td className="label"><Trans>Uid</Trans></td>
                        <td className="value">{this.formatUserIds(this.props.keyInfo.user_ids)}</td>
                      </tr>
                      <tr className="fingerprint">
                        <td className="label"><Trans>Fingerprint</Trans></td>
                        <td className="value">{this.formatFingerprint(this.props.keyInfo.fingerprint)}</td>
                      </tr>
                      <tr className="algorithm">
                        <td className="label"><Trans>Algorithm</Trans></td>
                        <td className="value">{this.props.keyInfo.algorithm}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label"><Trans>Key length</Trans></td>
                        <td className="value">{this.props.keyInfo.length}</td>
                      </tr>
                      <tr className="created">
                        <td className="label"><Trans>Created</Trans></td>
                        <td className="value">{this.formatDate(this.props.keyInfo.created)}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label"><Trans>Expires</Trans></td>
                        <td className="value">{this.formatDateTimeAgo(this.props.keyInfo.expires)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            }
          </div>
          <div className="warning message">
            <Trans>Please review carefully this configuration as it will not be trivial to change this later.</Trans>
          </div>
          <div className="submit-wrapper clearfix">
            <a
              target="_blank" rel="noopener noreferrer"
              href="https://help.passbolt.com/configure/account-recovery"
              className={`button button-left ${this.isProcessing ? "disabled" : ''}`}>
              <Trans>Learn more</Trans>
            </a>
            <FormCancelButton
              onClick={this.handleClose}
              disabled={this.isProcessing}/>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.isProcessing}
              processing={this.isProcessing}
              warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmSaveAccountRecoverySettings.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Callback when the dialog must be closed
  onSubmit: PropTypes.func, // The submit callback
  policy: PropTypes.string, // The account recovery policy if any change of policy
  keyInfo: PropTypes.object, // The account recovery public key details if any change of key
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(ConfirmSaveAccountRecoverySettings));
