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
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import SelectAccountRecoveryOrganizationKey from "../SelectAccountRecoveryOrganizationKey/SelectAccountRecoveryOrganizationKey";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";
import DownloadOrganizationKey from "../SelectAccountRecoveryOrganizationKey/DownloadOrganizationKey";

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
      loading: true, // component is loading or not
      processing: false, // component is processing or not
      hasChangedSettings: false, // if the settings has changed
      organisationRecoveryKeyToggle: false,
      organisationRecoveryKeyError: null,
      currentAccountRecoverySettings: {
        policy: null,
        organisationRecoveryKey: null
      },
      accountRecoverySettings: {
        policy: null,
        organisationRecoveryKey: null
      }
    };
  }

  async componentDidMount() {
    this.findRecoverAccountSettings();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleMustSave(prevProps.administrationWorkspaceContext.must.save);
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
   * Handle the must save change
   * @param previousMustSaveSettings Previous must save settings
   */
  async handleMustSave(previousMustSaveSettings) {
    const hasMustSaveChanged = this.props.administrationWorkspaceContext.must.save !== previousMustSaveSettings;
    if (hasMustSaveChanged && this.props.administrationWorkspaceContext.must.save) {
      await this.handleFormSubmit();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  /**
   * fetch the account recovery organization settings
   */
  async findRecoverAccountSettings() {
    const accountRecovery = await this.props.context.port.request("passbolt.account-recovery.organization.get");
    this.setState({
      loading: false,
      organisationRecoveryKeyToggle: Boolean(accountRecovery.account_recovery_organization_key),
      currentAccountRecoverySettings: {
        policy: accountRecovery.policy,
        organisationRecoveryKey: accountRecovery.account_recovery_organization_key
      },
      accountRecoverySettings: {
        policy: accountRecovery.policy,
        organisationRecoveryKey: accountRecovery.account_recovery_organization_key
      }
    });
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const target = event.target;
    this.setState({
      accountRecoverySettings: {
        ...this.state.accountRecoverySettings,
        policy: target.value
      }
    });

    this.handleChangeSettings(target.value !== "disabled");

    if (!this.props.administrationWorkspaceContext.can.save) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
  }

  /**
   * Handle any change on recover account setting
   */
  handleChangeSettings(organisationRecoveryKeyToggle) {
    this.setState({
      hasChangedSettings: true,
      organisationRecoveryKeyToggle: organisationRecoveryKeyToggle
    });
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
    this.setState({
      accountRecoverySettings: {
        ...this.state.accountRecoverySettings,
        organisationRecoveryKey: await this.getKeyDetail(newOrkPublicKey)
      }
    });

    if (newOrkPrivateKey) {
      await this.doDownloadPrivateKey(newOrkPrivateKey);
      this.props.dialogContext.open(DownloadOrganizationKey, {
        privateKey: newOrkPrivateKey,
        handleDownloadAgain: async() => { await this.doDownloadPrivateKey(newOrkPrivateKey); }
      });
    }

    if (!this.props.administrationWorkspaceContext.can.save) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
  }

  async doDownloadPrivateKey(private_key) {
    await this.props.context.port.request("passbolt.account-recovery.organization.download-generated-key", {armored_key: private_key});
  }

  /**
   * Handle enabled the save button
   */
  handleEnabledSaveButton() {
    if (!this.props.administrationWorkspaceContext.can.save) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
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
    return Boolean(this.state.currentAccountRecoverySettings.organisationRecoveryKey);
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
    return <>{result.substr(0, 24)}<br />{result.substr(25)}</>;
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

    return await this.props.context.port.request("passbolt.account-recovery.organization.get-key-details", {armored_key});
  }

  /**
   * Handle form submit event.
   * @returns {void}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      this.saveAccountRecoveryOrganisationSettings();
      await this.toggleProcessing();
    }
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Validate the organisation recovery key.
   * @returns {Boolean}
   */
  validateOrganisationRecoveryKey() {
    if (this.state.accountRecoverySettings.policy !== 'disabled') {
      return this.hasOrganisationRecoveryKey();
    }
    return false;
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return  this.state.organisationRecoveryKeyError !== null;
  }

  /**
   * save account recovery organisation settings
   */
  saveAccountRecoveryOrganisationSettings() {
    const policyChanged = this.state.currentAccountRecoverySettings.policy !== this.state.accountRecoverySettings.policy;
    const orkChanged = this.state.currentAccountRecoverySettings.organisationRecoveryKey !== this.state.accountRecoverySettings.organisationRecoveryKey;
    const policy = policyChanged
      ? this.state.accountRecoverySettings.policy
      : this.state.currentAccountRecoverySettings.policy;

    const ork = orkChanged
      ? this.state.accountRecoverySettings.organisationRecoveryKey
      : this.state.currentAccountRecoverySettings.organisationRecoveryKey;

    const accountRecovery = {
      policy: {
        value: policy,
        info: this.getPolicyInfo(policy),
        hasChanged: policyChanged
      },
      organisationRecoveryKey: {
        value: ork,
        hasChanged: orkChanged
      }
    };

    this.props.dialogContext.open(ConfirmSaveAccountRecoverySettings, {accountRecovery});
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
   * Handle form submit event.
   * @returns {void}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      this.saveAccountRecoveryOrganisationSettings();
      await this.toggleProcessing();
    }
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Validate the organisation recovery key.
   * @returns {Boolean}
   */
  validateOrganisationRecoveryKey() {
    if (this.state.accountRecoveryPolicy !== 'disabled') {
      return this.hasOrganisationRecoveryKey();
    }
    return false;
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return  this.state.organisationRecoveryKeyError !== null;
  }

  /**
   * save account recovery organisation settings
   */
  saveAccountRecoveryOrganisationSettings() {
    const policyChanged = this.state.currentAccountRecoverySettings.policy !== this.state.accountRecoverySettings.policy;
    const orkChanged = this.state.currentAccountRecoverySettings.organisationRecoveryKey !== this.state.accountRecoverySettings.organisationRecoveryKey;
    const policy = policyChanged
      ? this.state.accountRecoverySettings.policy
      : this.state.currentAccountRecoverySettings.policy;

    const ork = orkChanged
      ? this.state.accountRecoverySettings.organisationRecoveryKey
      : this.state.currentAccountRecoverySettings.organisationRecoveryKey;

    const accountRecovery = {
      policy: {
        value: policy,
        info: this.getPolicyInfo(policy),
        hasChanged: policyChanged
      },
      organisationRecoveryKey: {
        value: ork,
        hasChanged: orkChanged
      }
    };

    this.props.dialogContext.open(ConfirmSaveAccountRecoverySettings, {accountRecovery});
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
            <div className="warning message" id="email-notification-setting-overridden-banner">
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
              <div className={`input radio ${this.state.accountRecoverySettings.policy === "mandatory" ? 'checked' : ''}`}>
                <input type="radio"
                  value="mandatory"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoverySettings.policy === "mandatory"}
                  id="accountRecoveryPolicyMandatory"
                  disabled={this.hasAllInputDisabled()} />
                <label htmlFor="accountRecoveryPolicyMandatory">
                  <span className="name"><Trans>Mandatory</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('mandatory')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoverySettings.policy === "opt-out" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-out"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoverySettings.policy === "opt-out"}
                  id="accountRecoveryPolicyOptOut"
                  disabled={this.hasAllInputDisabled()} />
                <label htmlFor="accountRecoveryPolicyOptOut">
                  <span className="name"><Trans>Optional, Opt-out</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('opt-out')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoverySettings.policy === "opt-in" ? 'checked' : ''}`}>
                <input type="radio"
                  value="opt-in"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoverySettings.policy === "opt-in"}
                  id="accountRecoveryPolicyOptIn"
                  disabled={this.hasAllInputDisabled()} />
                <label htmlFor="accountRecoveryPolicyOptIn">
                  <span className="name"><Trans>Optional, Opt-in</Trans></span>
                  <span className="info">
                    {this.getPolicyInfo('opt-in')}
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.accountRecoverySettings.policy === "disabled" ? 'checked' : ''}`}>
                <input type="radio"
                  value="disabled"
                  onChange={this.handleInputChange}
                  name="accountRecoveryPolicy"
                  checked={this.state.accountRecoverySettings.policy === "disabled"}
                  id="accountRecoveryPolicyDisable"
                  disabled={this.hasAllInputDisabled()} />
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
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="organisationRecoveryKeyToggle" disabled={this.hasAllInputDisabled()} checked={this.state.organisationRecoveryKeyToggle} id="recovery-key-toggle-button" />
                <label className="toggle-switch-button" htmlFor="recovery-key-toggle-button" />
              </span>
              <label htmlFor="recovery-key-toggle-button"><Trans>Organization Recovery Key</Trans></label>
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
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatFingerprint(this.state.currentAccountRecoverySettings.organisationRecoveryKey.fingerprint)) || 'not available'}</td>
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
                        <td className="label">Algoritm</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.state.currentAccountRecoverySettings.organisationRecoveryKey.algorithm) || 'not available'}</td>
                      </tr>
                      <tr className="key-length">
                        <td className="label">Key length</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.state.currentAccountRecoverySettings.organisationRecoveryKey.keyLength) || 'not available'}</td>
                      </tr>
                      <tr className="created">
                        <td className="label">Created</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.state.currentAccountRecoverySettings.organisationRecoveryKey.created)) || 'not available'}</td>
                      </tr>
                      <tr className="expires">
                        <td className="label">Expires</td>
                        <td className={`${this.hasOrganisationRecoveryKey() ? "value" : "empty-value"}`}>{(this.hasOrganisationRecoveryKey() && this.formatDateTimeAgo(this.state.currentAccountRecoverySettings.organisationRecoveryKey.expires)) || 'not available'}</td>
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
              <Icon name="life-ring" />
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
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withAdministrationWorkspace(withTranslation('common')(ManageAccountRecoveryAdministrationSettings))));
