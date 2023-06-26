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

import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayAdministrationAccountRecoveryActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationAccountRecoveryAction/DisplayAdministrationAccountRecoveryActions";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import SelectAccountRecoveryOrganizationKey
  from "../SelectAccountRecoveryOrganizationKey/SelectAccountRecoveryOrganizationKey";
import DownloadOrganizationKey from "../SelectAccountRecoveryOrganizationKey/DownloadOrganizationKey";
import {withAdminAccountRecovery} from "../../../contexts/AdminAccountRecoveryContext";

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
      keyInfoDto: null, // Key info
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
   * On the component will unmount.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminAccountRecoveryContext.resetChanges();
  }

  /**
   * On the component did updated
   */
  async componentDidUpdate() {
    const publicArmoredKey = this.props?.adminAccountRecoveryContext?.policyChanges?.publicKey || this.props?.adminAccountRecoveryContext?.currentPolicy?.account_recovery_organization_public_key?.armored_key;
    const keyInfoDto = await this.props?.adminAccountRecoveryContext?.getKeyInfo(publicArmoredKey);
    /*
     * Formerly, we compared the armored key together to check if the key changed.
     * This yield into a bug sometimes where the react updates in an infinite loop.
     * The reason was that openpgpjs might produce another amored key string than the original one and the comparison failed everytime.
     * So comparing fingerprints avoid to have this infinite refresh loop.
     */
    if (Boolean(publicArmoredKey) && this.state.keyInfoDto?.fingerprint !== keyInfoDto?.fingerprint) {
      this.setState({keyInfoDto});
    } else if (!publicArmoredKey && this.state.keyInfoDto) {
      this.setState({keyInfoDto: null});
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePolicyInputChange = this.handlePolicyInputChange.bind(this);
    this.HandleUpdatePublicKeyClick = this.HandleUpdatePublicKeyClick.bind(this);
    this.handleUpdateOrganizationKey = this.handleUpdateOrganizationKey.bind(this);
    this.downloadPrivateKey = this.downloadPrivateKey.bind(this);
  }

  /**
   * Get the account recovery policy
   * @returns {null|string}
   */
  get policy() {
    return this.props.adminAccountRecoveryContext.policyChanges.policy
      || this.props.adminAccountRecoveryContext.currentPolicy?.policy;
  }

  /**
   * Get the account recovery organization public key.
   * @returns {null|string} The armored organization public key.
   */
  get organizationKey() {
    return this.props.adminAccountRecoveryContext.policyChanges.publicKey
      || this.props.adminAccountRecoveryContext.currentPolicy?.account_recovery_organization_public_key.armored_key;
  }

  /**
   * Get the account recovery organization key info
   * @returns {null|object}
   */
  get organizationKeyInfo() {
    return this.state.keyInfoDto;
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
   * Handle policy input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handlePolicyInputChange(event) {
    const policy = event.target.value;
    if (policy === "disabled") {
      // the keyinfo will be updated in componentDidUpdate.
      this.resetKeyInfo();
    }
    await this.props.adminAccountRecoveryContext.changePolicy(policy);
  }

  /**
   * Handle click on "Rotate key" button
   */
  HandleUpdatePublicKeyClick() {
    this.props.dialogContext.open(SelectAccountRecoveryOrganizationKey, {handleUpdateOrganizationKey: this.handleUpdateOrganizationKey});
  }

  /**
   * Handle registration in current state of the new Organization public key
   * @param {string} publicKey The new organization public key
   * @param {string} privateKey (Optional) The new organization private key. Presents if the user generate a key via the UI.
   */
  async handleUpdateOrganizationKey(publicKey, privateKey) {
    this.resetKeyInfo();
    await this.props.adminAccountRecoveryContext.changePublicKey(publicKey);
    if (privateKey) {
      await this.downloadPrivateKey(privateKey);
    }
  }

  /**
   * Download the generated organization private key.
   * @param {string} privateKey The new organization private key.
   * @returns {Promise<void>}
   */
  async downloadPrivateKey(privateKey) {
    await this.props.adminAccountRecoveryContext.downloadPrivateKey(privateKey);
    this.props.dialogContext.open(DownloadOrganizationKey, {
      privateKey: privateKey,
      handleDownloadAgain: async() => { await this.props.adminAccountRecoveryContext.downloadPrivateKey(privateKey); }
    });
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
    const publicORK = this.state.keyInfoDto;
    return Boolean(publicORK);
  }

  /**
   * Is policy enabled.
   * @returns {boolean}
   */
  isPolicyEnabled() {
    return Boolean(this.policy !== 'disabled');
  }

  /**
   * Reset the key details.
   */
  resetKeyInfo() {
    this.setState({keyInfoDto: null});
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    this.setState({processing: !this.state.processing});
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
   * get fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    if (!fingerprint) {
      return null;
    }
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br />{result.substr(25)}</>;
  }

  /**
   * Format organization key user ids.
   * @param user_ids
   * @returns {null|*}
   */
  formatUserIds(user_ids) {
    if (!user_ids) {
      return null;
    }
    return user_ids.map((user, id) => <Fragment key={id}>{user.name} &lt;{user.email}&gt;<br/></Fragment>);
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
        <div className="recover-account-settings col8 main-column">
          <h3><Trans>Account Recovery</Trans></h3>
          {this.props.adminAccountRecoveryContext.hasPolicyChanges() &&
            <div className="warning message" id="email-notification-setting-overridden-banner">
              <p>
                <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          {!this.hasOrganisationRecoveryKey() && this.isPolicyEnabled() &&
          <div className="warning message" id="email-notification-setting-overridden-banner">
            <p>
              <Trans>Warning, Don&apos;t forget to add an organization recovery key.</Trans>
            </p>
          </div>
          }
          <form className="form">
            <h4 className="no-border"><Trans>Account Recovery Policy</Trans></h4>
            <p>
              <Trans>In this section you can choose the default behavior of account recovery for all users.</Trans>
            </p>
            <div className="radiolist-alt">
              <div className={`input radio ${this.policy === "mandatory" ? 'checked' : ''}`}>
                <input type="radio"
                  value="mandatory"
                  onChange={this.handlePolicyInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "mandatory"}
                  id="accountRecoveryPolicyMandatory"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyMandatory">
                  <span className="name"><Trans>Mandatory</Trans></span>
                  <span className="info">
                    <Trans>Every user is required to provide a copy of their private key and passphrase during setup.</Trans><br/>
                    <Trans>You should inform your users not to store personal passwords.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "opt-out" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-out"
                  onChange={this.handlePolicyInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "opt-out"}
                  id="accountRecoveryPolicyOptOut"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptOut">
                  <span className="name"><Trans>Optional, Opt-out</Trans></span>
                  <span className="info">
                    <Trans>Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "opt-in" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-in"
                  onChange={this.handlePolicyInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "opt-in"}
                  id="accountRecoveryPolicyOptIn"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyOptIn">
                  <span className="name"><Trans>Optional, Opt-in</Trans></span>
                  <span className="info">
                    <Trans>Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.policy === "disabled" ? 'checked' : ''}`}>
                <input type="radio"
                  value="disabled"
                  onChange={this.handlePolicyInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.policy === "disabled"}
                  id="accountRecoveryPolicyDisable"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="accountRecoveryPolicyDisable">
                  <span className="name"><Trans>Disable (Default)</Trans></span>
                  <span className="info">
                    <Trans>Backup of the private key and passphrase will not be stored. This is the safest option.</Trans>
                    <Trans>If users lose their private key and passphrase they will not be able to recover their account.</Trans>
                  </span>
                </label>
              </div>
            </div>
            <h4>
              <span className="input toggle-switch form-element ">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="organisationRecoveryKeyToggle" disabled={this.hasAllInputDisabled()} checked={this.isPolicyEnabled()} id="recovery-key-toggle-button" />
                <label htmlFor="recovery-key-toggle-button"><Trans>Organization Recovery Key</Trans></label>
              </span>
            </h4>
            {this.isPolicyEnabled() &&
              <>
                <p>
                  <Trans>Your organization recovery key will be used to decrypt and recover the private key and passphrase of the users that are participating in the account recovery program.</Trans> <Trans>The organization private recovery key should not be stored in passbolt.</Trans> <Trans>You should keep it offline in a safe place.</Trans>
                </p>
                <div className="recovery-key-details">
                  <table className="table-info recovery-key">
                    <tbody>
                      <tr className="user-ids">
                        <td className="label"><Trans>User ids</Trans></td>
                        {this.organizationKeyInfo?.user_ids && <td className="value">{this.formatUserIds(this.organizationKeyInfo.user_ids)}</td>}
                        {!this.organizationKeyInfo?.user_ids && <td className="empty-value"><Trans>not available</Trans></td>}
                        <td className="table-button">
                          <button className="button primary medium" type="button" disabled={this.hasAllInputDisabled()} onClick={this.HandleUpdatePublicKeyClick}>
                            {this.hasOrganisationRecoveryKey() && <Trans>Rotate Key</Trans>}
                            {!this.hasOrganisationRecoveryKey() && <Trans>Add an Organization Recovery Key</Trans>}
                          </button>
                        </td>
                      </tr>
                      <tr className="fingerprint">
                        <td className="label"><Trans>Fingerprint</Trans></td>
                        {this.organizationKeyInfo?.fingerprint && <td className="value">{this.formatFingerprint(this.organizationKeyInfo.fingerprint)}</td>}
                        {!this.organizationKeyInfo?.fingerprint && <td className="empty-value"><Trans>not available</Trans></td>}
                      </tr>
                      <tr className="algorithm">
                        <td className="label"><Trans>Algorithm</Trans></td>
                        {this.organizationKeyInfo?.algorithm && <td className="value">{this.organizationKeyInfo.algorithm}</td>}
                        {!this.organizationKeyInfo?.algorithm && <td className="empty-value"><Trans>not available</Trans></td>}
                      </tr>
                      <tr className="key-length">
                        <td className="label"><Trans>Key length</Trans></td>
                        {this.organizationKeyInfo?.length && <td className="value">{this.organizationKeyInfo.length}</td>}
                        {!this.organizationKeyInfo?.length && <td className="empty-value"><Trans>not available</Trans></td>}
                      </tr>
                      <tr className="created">
                        <td className="label"><Trans>Created</Trans></td>
                        {this.organizationKeyInfo?.created && <td className="value">{this.formatDateTimeAgo(this.organizationKeyInfo.created)}</td>}
                        {!this.organizationKeyInfo?.created && <td className="empty-value"><Trans>not available</Trans></td>}
                      </tr>
                      <tr className="expires">
                        <td className="label"><Trans>Expires</Trans></td>
                        {this.organizationKeyInfo?.expires && <td className="value">{this.formatDateTimeAgo(this.organizationKeyInfo.expires)}</td>}
                        {!this.organizationKeyInfo?.expires && <td className="empty-value"><Trans>not available</Trans></td>}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            }
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about account recovery, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/account-recovery" target="_blank" rel="noopener noreferrer">
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
