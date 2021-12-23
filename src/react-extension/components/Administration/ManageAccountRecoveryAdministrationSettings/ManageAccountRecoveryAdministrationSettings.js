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
 * @since         3.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../contexts/AppContext";
import DisplayAdministrationAccountRecoveryActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationAccountRecoveryAction/DisplayAdministrationAccountRecoveryActions";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import SelectAccountRecoveryOrganizationKey from "../SelectAccountRecoveryOrganizationKey/SelectAccountRecoveryOrganizationKey";
import DownloadOrganizationKey from "../SelectAccountRecoveryOrganizationKey/DownloadOrganizationKey";
import {withAdminAccountRecovery} from "../../../contexts/AdminAccountRecoveryContext";

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
   * @returns {Object}
   */
  get defaultState() {
    return {
      loading: true, // Component is loading or not
      processing: false, // Component is processing or not
    };
  }

  /**
   * On the component did mount, set the workspace action component and get the account recovery policy
   *
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationAccountRecoveryActions);
    this.findAccountRecoveryPolicy();
  }

  /**
   * On the component will unmount, reset the workspace action component
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRotateOrkClick = this.handleRotateOrkClick.bind(this);
    this.handleUpdateOrganizationKey = this.handleUpdateOrganizationKey.bind(this);
    this.doDownloadPrivateKey = this.doDownloadPrivateKey.bind(this);
  }

  /**
   * Get the account recovery settings
   * @returns {null|*}
   */
  get accountRecoverySettings() {
    return this.props.adminAccountRecoveryContext.newPolicy;
  }

  /**
   * Get the account recovery organization key
   * @returns {null|*}
   */
  get organizationKey() {
    return this.accountRecoverySettings && this.accountRecoverySettings.account_recovery_organization_public_key;
  }

  /**
   * Get the account recovery policy
   * @returns {null|*}
   */
  get policy() {
    return this.accountRecoverySettings && this.accountRecoverySettings.policy;
  }

  /**
   * fetch the account recovery organization settings
   */
  async findAccountRecoveryPolicy() {
    await this.props.adminAccountRecoveryContext.findAccountRecoveryPolicy();
    this.setState({
      loading: false,
    });
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const target = event.target;
    const accountRecoverySettings = {
      ...this.accountRecoverySettings,
      policy: target.value
    };
    await this.props.adminAccountRecoveryContext.changePolicy(accountRecoverySettings);
  }

  /**
   * Handle click on "Rotate key" button
   */
  handleRotateOrkClick() {
    this.props.dialogContext.open(SelectAccountRecoveryOrganizationKey, {handleUpdateOrganizationKey: this.handleUpdateOrganizationKey});
  }

  /**
   * Handle registration in current state of the new Organization public key
   */
  async handleUpdateOrganizationKey(newOrkPublicKey, newOrkPrivateKey) {
    const accountRecoverySettings = {
      ...this.accountRecoverySettings,
      account_recovery_organization_public_key: await this.getKeyDetail(newOrkPublicKey)
    };

    if (newOrkPrivateKey) {
      await this.doDownloadPrivateKey(newOrkPrivateKey);
      this.props.dialogContext.open(DownloadOrganizationKey, {
        privateKey: newOrkPrivateKey,
        handleDownloadAgain: async() => { await this.doDownloadPrivateKey(newOrkPrivateKey); }
      });
    }

    this.props.adminAccountRecoveryContext.changePolicy(accountRecoverySettings);
  }

  async doDownloadPrivateKey(private_key) {
    await this.props.context.port.request("passbolt.account-recovery.download-organization-generated-key", {armored_key: private_key});
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
    return Boolean(this.organizationKey);
  }

  /**
   * Has policy not disabled
   * @returns {boolean}
   */
  hasPolicyNotDisabled() {
    return Boolean(this.policy !== 'disabled');
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
   * Return the key details of a given armored key
   * @param {string} armored_key
   * @returns {ExternalGpgKeyEntity}
   */
  async getKeyDetail(armored_key) {
    if (null === armored_key) {
      return null;
    }

    return await this.props.context.port.request("passbolt.account-recovery.get-organization-key-details", {armored_key});
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Get the policy info to inform the admin user
   * @param policy
   * @returns {string}
   */
  getPolicyInfo(policy) {
    switch (policy) {
      case 'mandatory': return `${this.translate("Every user is required to provide a copy of their private key and passphrase during setup.")}\n${this.translate("Warning: You should inform your users not to store personal passwords.")}`;
      case 'opt-out': return this.translate("Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.");
      case 'opt-in': return this.translate("Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.");
      case 'disabled': return `${this.translate("Backup of the private key and passphrase will not be stored. This is the safest option.")}\n${this.translate("Warning: If users lose their private key and passphrase they will not be able to recover their account.")}`;
      default: return '';
    }
  }

  /**
   * If the user has changed settings
   * @returns {Boolean}
   */
  hasChangedSettings() {
    return this.props.adminAccountRecoveryContext.hasChanged;
  }

  /**
   * Is organisation key checked
   * @returns {boolean}
   */
  isOrganisationKeyChecked() {
    return Boolean(this.policy) && this.policy !== 'disabled';
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
          {this.hasChangedSettings() &&
            <div className="warning message" id="email-notification-setting-overridden-banner">
              <p>
                <Trans>Warning, Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          {!this.hasOrganisationRecoveryKey() && this.hasPolicyNotDisabled() &&
          <div className="warning message" id="email-notification-setting-overridden-banner">
            <p>
              <Trans>Warning, Don&apos;t forget to add an organization recovery key.</Trans>
            </p>
          </div>
          }
          <form className="form">
            <h3><Trans>Account Recovery Policy</Trans></h3>
            <p>
              <Trans>In this section you can choose the default behavior of account recovery for all users.</Trans>
            </p>
            <div className="radiolist-alt">
              <div className={`input radio ${this.policy === "mandatory" ? 'checked' : ''}`}>
                <input type="radio"
                  value="mandatory"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "mandatory"}
                  id="accountRecoveryPolicyMandatory"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyMandatory">
                  <span className="name"><Trans>Mandatory</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('mandatory')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "opt-out" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-out"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "opt-out"}
                  id="accountRecoveryPolicyOptOut"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptOut">
                  <span className="name"><Trans>Optional, Opt-out</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('opt-out')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "opt-in" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-in"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "opt-in"}
                  id="accountRecoveryPolicyOptIn"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptIn">
                  <span className="name"><Trans>Optional, Opt-in</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('opt-in')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "disabled" ? 'checked' : ''}`}>
                <input type="radio"
                  value="disabled"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "disabled"}
                  id="accountRecoveryPolicyDisable"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyDisable">
                  <span className="name"><Trans>Disable (Default)</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('disabled')}
                  </span>
                </label>
              </div>
            </div>
            <h3>
              <span className="input toggle-switch form-element ">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="organisationRecoveryKeyToggle" disabled={this.hasAllInputDisabled()} checked={this.isOrganisationKeyChecked()} id="recovery-key-toggle-button" />
                <label className="toggle-switch-button" htmlFor="recovery-key-toggle-button" />
              </span>
              <label htmlFor="recovery-key-toggle-button"><Trans>Organization Recovery Key</Trans></label>
            </h3>
            {this.isOrganisationKeyChecked() &&
              <div>
                <p>
                  <Trans>Your organization recovery key will be used to decrypt and recover the private key and passphrase of the users that are participating in the account recovery program.</Trans> <Trans>The organization private recovery key should not be stored in passbolt.</Trans> <Trans>You should keep it offline in a safe place.</Trans>
                </p>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="fingerprint">
                        <td className="label">Fingerprint</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatFingerprint(this.organizationKey.fingerprint)) || 'not available'}</td>
                        <td className="table-button">
                          <button className="button primary medium" type="button" disabled={this.hasAllInputDisabled()} onClick={this.handleRotateOrkClick}>
                            {this.hasOrganisationRecoveryKey() &&
                            <Trans>Rotate Key</Trans>
                            }
                            {!this.hasOrganisationRecoveryKey() &&
                            <Trans>Add an Organization Recovery Key</Trans>
                            }
                          </button>
                        </td>
                      </tr>
                      <tr className="algorithm">
                        <td className="label">Algorithm</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.organizationKey.algorithm) || 'not available'}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label">Key length</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.organizationKey.length) || 'not available'}</td>
                      </tr>
                      <tr className="created">
                        <td className="label">Created</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.organizationKey.created)) || 'not available'}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label">Expires</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.organizationKey.expires)) || 'not available'}</td>
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
            <p><Trans>For more information about account recovery, checkout the dedicated page on the help website.</Trans></p>
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
  dialogContext: PropTypes.any, // The dialog context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminAccountRecoveryContext: PropTypes.object, // The admin account recovery context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withAdministrationWorkspace(withAdminAccountRecovery(withTranslation('common')(ManageAccountRecoveryAdministrationSettings)))));
