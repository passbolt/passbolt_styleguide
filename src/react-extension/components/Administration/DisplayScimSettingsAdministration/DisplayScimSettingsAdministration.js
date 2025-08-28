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
 * @since         5.5.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import memoize from "memoize-one";
import {v4 as uuidv4} from "uuid";
import NotifyError from "../../../components/Common/Error/NotifyError/NotifyError";
import ScimSettingsEntity from "../../../../shared/models/entity/scimSettings/scimSettingsEntity";
import ScimSettingsFormEntity from "../../../../shared/models/entity/scimSettings/scimSettingsFormEntity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import ScimSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/scim/scimSettingsServiceWorkerService";
import CopySVG from "../../../../img/svg/copy.svg";
import RefreshSVG from "../../../../img/svg/refresh.svg";
import {withClipboard} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";
import Password from "../../../../shared/components/Password/Password";
import Select from "../../Common/Select/Select";
/*
 * import {createSafePortal} from "../../../../shared/utils/portals";
 * import InfoSVG from "../../../../img/svg/info.svg";
 */

/**
 * This component allows to display the SCIM settings for the administration
 */
class DisplayScimSettingsAdministration extends Component {
  /**
   * The original settings.
   * @type {ScimSettingsFormEntity}
   */
  originalSettings = null;

  /**
   * The form settings.
   * @type {ScimSettingsFormEntity}
   */
  formSettings = null;

  /**
   * The SCIM settings service.
   * @type {ScimSettingsServiceWorkerService}
   */
  scimSettingsService = null;

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.scimSettingsService = props.scimSettingsServiceWorkerService ?? new ScimSettingsServiceWorkerService(this.props.context.port);
    this.handleToggleEnabled = this.handleToggleEnabled.bind(this);
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      isProcessing: true, // Is the form processing (loading, submitting).
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
      enabled: false, // True if originalSettings is not null
      settings: { // Form data
        scim_user_id: uuidv4(),
        setting_id: uuidv4(),
        secret_token: this.generateScimSecretToken(),
      },
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
    this.handleToggleEnabled = this.handleToggleEnabled.bind(this);
    this.handleCopyScimUrl = this.handleCopyScimUrl.bind(this);
    this.handleCopySecretToken = this.handleCopySecretToken.bind(this);
    this.handleRegenerateSecretToken = this.handleRegenerateSecretToken.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    if (!this.props.context.users) {
      await this.props.context.port.request("passbolt.users.update-local-storage");
    }
    await this.findScimSettings();
    this.setState({isProcessing: false});
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.clearContext();
  }

  /**
   * display user firstname, lastname and username
   * @param user
   * @returns {string}
   */
  displayUser(user) {
    return `${user.profile.first_name} ${user.profile.last_name} (${user.username})`;
  }


  /**
   * Get admin users
   * @returns {Array} Array of active admin users
   */
  get adminUsers() {
    const adminRole = this.props.context.roles.find(role => role.name === "admin");
    const users = this.props.context.users;

    if (users !== null && adminRole) {
      return users.filter(user => user.active === true && user.role_id === adminRole.id);
    }
    return [];
  }


  /**
   * Get admin users formatted for select input
   * @returns {Array<{value: string, label: string}>} Array of admin users formatted for select input
   */
  get adminUsersForSelect() {
    return this.adminUsers && this.adminUsers.map(user => ({value: user.id, label: this.displayUser(user)}));
  }

  /**
   * Find the SCIM settings
   * @return {Promise<void>}
   */
  async findScimSettings() {
    this.setState({isProcessing: true});
    try {
      const scimSettings = await this.scimSettingsService.findSettings();
      if (!scimSettings) {
        this.setDefaultSettings();
      } else {
        this.originalSettings = new ScimSettingsFormEntity(scimSettings, {validate: false});
        this.formSettings = new ScimSettingsFormEntity(scimSettings, {validate: false});
        this.setState({
          settings: this.formSettings.toDto(),
          enabled: true
        });
      }
    } catch (error) {
      await this.handleUnexpectedError(error);
      this.setDefaultSettings();
    }
    this.setState({isProcessing: false});
  }

  /**
   * Generate a random secret token that matches the SCIM settings pattern
   * @returns {string} A secret token starting with "pb_" followed by 36 random alphanumeric characters
   */
  generateScimSecretToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'pb_';
    const secretLength = ScimSettingsEntity.SECRET_TOKEN_LENGTH - (result.length);
    for (let i = 0; i < secretLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  /**
   * Enable/Disable the settings
   */
  handleToggleEnabled() {
    this.setState({enabled: !this.state.enabled});
  }

  /**
   * Set default settings when no SCIM settings are found
   */
  setDefaultSettings() {
    this.originalSettings = null;
    this.formSettings = new ScimSettingsFormEntity(this.initSettings(), {validate: false});
    this.setState({
      settings: this.formSettings.toDto(),
      enabled: false // originalSettings is null
    });
  }

  /**
   * Initialize default settings
   * @returns {Object}
   */
  initSettings() {
    return {
      enabled: false,
      scim_user_id: this.adminUsers[0].id,
      setting_id: uuidv4(),
      secret_token: this.generateScimSecretToken(),
    };
  }

  /**
   * Check if the data have been changed.
   * @param {ScimSettingsFormEntity} originalSettings The original settings as provided by the API.
   * @param {ScimSettingsFormEntity} formSettings The settings updated by the user.
   * @return {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  hasSettingsChanges = memoize((originalSettings, formSettings, settings) => originalSettings?.hasDiffProps(formSettings) || false);

  /**
   * Handle form input changes.
   * @param {ReactEvent} event The react event
   * @returns {void}
   */
  handleInputChange(event) {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const {type, checked, name} = event.target;
    const parsedValue = type === "checkbox" ? checked : event.target.value;

    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Set a form property value. Trigger the validation if the form has already been submitted once.
   * @param {string} name The property name
   * @param {*} parsedValue The parsed value
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, {validate: false});
    this.setState({settings: this.formSettings.toDto()});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.isProcessing;
  }

  /**
   * Handle the copy to clipboard button
   */
  async handleCopyScimUrl() {
    await this.props.clipboardContext.copy(this.scimUrl, this.props.t("The SCIM URL has been copied to the clipboard."));
  }

  /**
   * Handle the copy to clipboard button
   */
  async handleCopySecretToken() {
    await this.props.clipboardContext.copy(this.state.settings.secret_token, this.props.t("The SCIM secret token has been copied to the clipboard."));
  }

  /**
   * Handle the regeneration of the secret token
   */
  handleRegenerateSecretToken() {
    const secretToken = this.generateScimSecretToken();
    this.setFormPropertyValue("secret_token", secretToken);
  }

  /**
   * Handle form submission that can be triggered when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();
    this.save();
  }

  /**
   * Save the settings.
   * @returns {Promise<void>}
   */
  async save() {
    if (this.state.isProcessing) {
      return;
    }

    this.setState({isProcessing: true});
    const validationError = this.validateForm();
    if (validationError?.hasErrors()) {
      this.setState({isProcessing: false, hasAlreadyBeenValidated: true});
      return;
    }

    try {
      await this.saveScimSettings();
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The SCIM settings were updated."));
    } catch (error) {
      await this.handleUnexpectedError(error);
    }

    this.setState({
      isProcessing: false,
      settings: this.formSettings.toDto()
    });
  }

  /**
   * Validate form.
   * @return {EntityValidationError|null}
   */
  validateForm() {
    if (!this.formSettings) {
      return null;
    }
    return this.formSettings.validate();
  }

  /**
   * Save the SCIM settings.
   * @returns {Promise<void>}
   */
  async saveScimSettings() {
    if (this.state.enabled) {
      if (!this.originalSettings) {
        await this.scimSettingsService.createSettings(this.formSettings);
      } else {
        await this.scimSettingsService.updateSettings(this.formSettings, this.originalSettings.id);
      }
    } else {
      await this.scimSettingsService.disableSettings(this.originalSettings.id);
    }
    await this.findScimSettings();
  }

  /**
   * Handle unexpected error
   * @param {Error} error The error
   * @returns {Promise<string>} Return the dialog key identifier.
   */
  handleUnexpectedError(error) {
    console.error(error);
    if (error.name !== "UserAbortsOperationError") {
      return this.props.dialogContext.open(NotifyError, {error});
    }
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    this.setState(this.defaultState);
  }

  /**
   * Return the formatted scim url
   * @returns {string} the formated scim url
   */
  get scimUrl() {
    return `${this.props.context.userSettings.getTrustedDomain()}/scim/v2/${this.state.settings.setting_id}`;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm() : null;
    const hasSettingsChanges = this.hasSettingsChanges(this.originalSettings, this.formSettings, this.state.settings);

    return (
      <div className="row">
        <div id="scim-settings" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
              <h3 className="title">
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="enabled"
                    onChange={this.handleToggleEnabled} checked={this.state.enabled} disabled={this.hasAllInputDisabled()}
                    id="scimSettingsToggle"/>
                  <label htmlFor="scimSettingsToggle"><Trans>SCIM</Trans></label>
                </span>
              </h3>
              <p className="description">
                <Trans>SCIM is a standard protocol that automates user provisioning and deprovisioning with identity providers.</Trans>
              </p>

              {
                this.state.enabled && <>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>SCIM URL</Trans></label>
                    <div className="button-inline">
                      <input id="scim-url-input" type="text" className="fluid form-element disabled" name="scim_url"
                        value={this.scimUrl} readOnly disabled={true}/>
                      <button type="button" onClick={this.handleCopyScimUrl} className="copy-to-clipboard button button-icon">
                        <CopySVG/>
                      </button>
                    </div>
                    <p>
                      <Trans>The URL to enter in your provider when configuring user provisioning.</Trans>
                    </p>
                  </div>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret Token</Trans></label>
                    <div className="button-inline">
                      <Password
                        id="scim-secret-token-input"
                        className="fluid form-element"
                        autoComplete="off"
                        name="scim_secret_token"
                        value={this.state.settings.secret_token}
                        preview={true}
                        disabled={!this.state.settings.secret_token}
                      />
                      <button type="button" disabled={!this.state.settings.secret_token} onClick={this.handleCopySecretToken} className="copy-to-clipboard button button-icon">
                        <CopySVG/>
                      </button>
                      <button type="button" onClick={this.handleRegenerateSecretToken} className="copy-to-clipboard button button-icon">
                        <RefreshSVG/>
                      </button>
                    </div>
                  </div>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>SCIM User</Trans></label>
                    <Select
                      items={this.adminUsersForSelect}
                      name="scim_user_id"
                      className="users"
                      value={this.state.settings.scim_user_id}
                      onChange={this.handleInputChange}
                      disabled={this.state.isProcessing}
                      search={true}
                      direction="bottom"/>
                    <p>
                      <Trans>The SCIM user is the user that will perform the operation in the logs.</Trans>
                    </p>
                  </div>
                  <div className="section">
                    <label><Trans>Synchronisation</Trans></label>
                    <span className="input toggle-switch form-element">
                      <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordUpdate"
                        disabled={true} checked={true}
                        id="send-password-update-toggle-button"/>
                      <label className="text" htmlFor="send-password-update-toggle-button">
                        <Trans>Users.</Trans>
                      </label>
                    </span>
                    <span className="input toggle-switch form-element">
                      <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordUpdate"
                        disabled={true}
                        checked={false}
                        id="send-password-update-toggle-button"/>
                      <label className="text" htmlFor="send-password-update-toggle-button">
                        <Trans>Groups (Not supported).</Trans>
                      </label>
                    </span>
                  </div>

                </>
              }
            </form>
          </div>
          {
            <div className="warning message">
              {!this.formSettings?.id && this.state.enabled &&
                    <div className="form-banner">
                      <p><Trans>Please save the settings to enable the feature.</Trans></p>
                    </div>
              }
              {this.formSettings?.id && !this.state.enabled &&
                    <div className="form-banner">
                      <p><Trans>Please save the settings to disable the feature.</Trans></p>
                    </div>
              }
              {!hasSettingsChanges && this.state.enabled && this.formSettings?.id &&
                    <div className="form-banner">
                      <p><b><Trans>Warning:</Trans></b> <Trans>if you think the secret has been compromised please regenerate and update it in your provider settings.</Trans></p>
                    </div>
              }
              {hasSettingsChanges && this.state.enabled && this.formSettings.id &&
                    <div className="form-banner">
                      <p><Trans>Don&apos;t forget to save your settings to apply your modification.</Trans></p>
                    </div>
              }
              {errors?.hasErrors() &&
                    <div className="form-banner">
                      <p><b><Trans>Warning:</Trans></b> <Trans>Please fix the errors in the form before saving.</Trans></p>
                    </div>
              }
            </div>
          }
        </div>
        <div className="actions-wrapper">
          <button type="button" className="button primary" disabled={this.state.isProcessing || errors?.hasErrors()} onClick={this.handleFormSubmit}>
            <span><Trans>Save</Trans></span>
          </button>
        </div>
        {/*
        createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For more information about SCIM, checkout the dedicated page on the official website.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://passbolt.com/docs/admin/scim/" >
              <InfoSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )
        */}
      </div>
    );
  }
}

DisplayScimSettingsAdministration.propTypes = {
  context: PropTypes.object, // The application context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  clipboardContext: PropTypes.object, // the clipboard service provider
  administrationWorkspaceContext: PropTypes.object,
  scimSettingsServiceWorkerService: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAdministrationWorkspace(
  withDialog(
    withActionFeedback(
      withClipboard(
        withAppContext(
          withTranslation('common')(DisplayScimSettingsAdministration)
        )
      )
    )
  )
);
