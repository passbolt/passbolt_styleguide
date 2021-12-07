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
 * @since         3.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../contexts/AppContext";

/**
 * This component allows to display the email notifications for the administration
 */
class ManageAccountRecoveryAdministrationSettings extends React.Component {
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
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true, // component is loading or not
      processing: false, // component is processing or not
      hasChangedSettings: false, // if the settings has changed

      accountRecoveryPolicy: null,
    };
  }

  async componentDidMount() {
    this.findRecoverAccountSettings();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * fetch the email notifications settings
   */
  async findRecoverAccountSettings() {
    const accountRecovery = await this.props.context.port.request("passbolt.account-recovery.organization.get");

    this.setState({
      loading: false,
      accountRecoveryPolicy: accountRecovery.policy || 'Disable',
      organisationRecoveryKeyToggle: Boolean(accountRecovery.organisationRecoveryKey),
    });
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    this.handleChangeSettings();
  }

  /**
   * Handle any change on recover account setting
   */
  handleChangeSettings() {
    this.setState({hasChangedSettings: true});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Has a recovery key
   * @returns {boolean}
   */
  hasOrganisationRecoveryKey() {
    return this.props.accountRecovery.organisationRecoveryKey;
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
      <div className="row">
        <div className="recover-account-settings col8">
          <h3><Trans>Account Recovery</Trans></h3>
          {this.state.hasChangedSettings &&
          <div className="warning message">
            <p>
              <Trans>Warning, Don&apos;t forget to save your settings to apply your modification.</Trans>
            </p>
          </div>
          }
          <form className="form">
            <h3><Trans>Account Recovery Policy</Trans></h3>
            <p>
              <Trans>In this section you can choose the default behavior of account recovery for all users.</Trans>
            </p>
            <div className="radiolist-alt">
              <div className={`input radio ${this.state.accountRecoveryPolicy === "Mandatory" ? 'checked' : ''}`}>
                <input type="radio"
                  value="Mandatory"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoveryPolicy === "Mandatory"}
                  id="accountRecoveryPolicyMandatory"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyMandatory">
                  <span className="name"><Trans>Mandatory</Trans></span>
                  <span className="info">
                    <Trans>Every user is required to provide a copy of their private key and passphrase during setup.</Trans>
                    <br/>
                    <Trans>Warning: You should inform your users not to store personal passwords.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoveryPolicy === "Opt-out" ? 'checked' : ''}`}>
                <input type="radio"
                  value="Opt-out"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoveryPolicy === "Opt-out"}
                  id="accountRecoveryPolicyOptOut"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptOut">
                  <span className="name"><Trans>Optional, Opt-out</Trans></span>
                  <span className="info">
                    <Trans>Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoveryPolicy === "Opt-in" ? 'checked' : ''}`}>
                <input type="radio"
                  value="Opt-in"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoveryPolicy === "Opt-in"}
                  id="accountRecoveryPolicyOptIn"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptIn">
                  <span className="name"><Trans>Optional, Opt-in</Trans></span>
                  <span className="info">
                    <Trans>Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoveryPolicy === "Disable" ? 'checked' : ''}`}>
                <input type="radio"
                  value="Disable"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoveryPolicy === "Disable"}
                  id="accountRecoveryPolicyDisable"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyDisable">
                  <span className="name"><Trans>Disable (Default)</Trans></span>
                  <span className="info">
                    <Trans>Backup of the private key and passphrase will not be stored. This is the safest option.</Trans>
                    <br/>
                    <Trans>Warning: If users lose their private key and passphrase they will not be able to recover their account.</Trans>
                  </span>
                </label>
              </div>
            </div>
            <h3>
              <span className="input toggle-switch form-element ">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="organisationRecoveryKeyToggle" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.organisationRecoveryKeyToggle} id="recovery-key-toggle-button"/>
                <label className="toggle-switch-button" htmlFor="recovery-key-toggle-button"/>
              </span>
              <label htmlFor="recovery-key-toggle-button"><Trans>Organisation Recovery Key</Trans></label>
            </h3>
            {this.state.organisationRecoveryKeyToggle &&
            <div>
              <p>
                <Trans>Your organization recovery key will be used to decrypt and recover the private key and passphrase of the users that are participating in the account recovery program.</Trans> <Trans>The organization private recovery key should not be stored in passbolt.</Trans> <Trans>You should keep it offline in a safe place.</Trans>
              </p>
              <div className="recovery-key-details">
                <table className="table-info recovery-key">
                  <tbody>
                    <tr className="fingerprint">
                      <td className="label">Fingerprint</td>
                      <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatFingerprint(this.props.accountRecovery.organisationRecoveryKey.fingerprint)) || 'not available'}</td>
                      <td className="table-button">
                        <button className="button primary medium" type="button" disabled={this.hasAllInputDisabled()}>
                          {this.hasOrganisationRecoveryKey() &&
                          <Trans>Rotate Key</Trans>
                          }
                          {!this.hasOrganisationRecoveryKey() &&
                          <Trans>Add an Organisation Recovery Key</Trans>
                          }
                        </button>
                      </td>
                    </tr>
                    <tr className="algorithm">
                      <td className="label">Algoritm</td>
                      <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.props.accountRecovery.organisationRecoveryKey.algorithm) || 'not available'}</td>
                    </tr>
                    <tr className="key-length">
                      <td className="label">Key length</td>
                      <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.props.accountRecovery.organisationRecoveryKey.keyLength) || 'not available'}</td>
                    </tr>
                    <tr className="created">
                      <td className="label">Created</td>
                      <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.props.accountRecovery.organisationRecoveryKey.created)) || 'not available'}</td>
                    </tr>
                    <tr className="expires">
                      <td className="label">Expires</td>
                      <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.props.accountRecovery.organisationRecoveryKey.expires)) || 'not available'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            }
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about account recovery, chekout the dedicated page on the help website.</Trans></p>
            <a className="button" href="" target="_blank" rel="noopener noreferrer">
              <Icon name="life-ring"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ManageAccountRecoveryAdministrationSettings.propTypes = {
  context: PropTypes.object, // Application context
  accountRecovery: PropTypes.any, // The account recovery
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ManageAccountRecoveryAdministrationSettings));
