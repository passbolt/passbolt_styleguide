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
 * @since         3.7.3
 */

import React from "react";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import DisplayAdministrationSsoActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSsoAction/DisplayAdministrationSsoActions";
import {withAdminSso} from "../../../contexts/AdminSsoContext";
/**
 * This component displays the SSO administration settings
 */
class ManageSsoSettings extends React.Component {
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
      loading: true,
      processing: false,
      ssoConfig: {}
    };
  }

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSsoActions);
    await this.props.adminSsoContext.loadSsoConfiguration();
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    this.setState({
      ssoConfig,
      loading: false
    });
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
    this.handleProviderInputChange = this.handleProviderInputChange.bind(this);
    this.isValidUrl = this.isValidUrl.bind(this);
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
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const data = this.state.ssoConfig.data;
    data[name] = value;
    this.setState({data});
    this.handleEnabledSaveButton();
  }

  /**
   * Handle provider input change.
   */
  handleProviderInputChange(event) {
    const ssoConfig = this.state.ssoConfig || {};
    ssoConfig.provider = event.target.value;
    this.setState({ssoConfig});
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
   * Validate the form.
   * @returns {Promise<void>}
   */
  async validate() {
    // Validate the form inputs.
    await Promise.all([
      this.validateAzureInput(),
    ]);
  }

  /**
   * Validate the yubikey input.
   * @returns {Promise<void>}
   */
  async validateAzureInput() {
    const data = this.state.ssoConfig.data;
    return this.isValidUrl(data.url)
      && data.app_id !== ""
      && data.directory_id !== ""
      && data.secret !== "";
  }

  /**
   * Returns true if the url is valid;
   * @param {string} url
   */
  isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.hasAzureError();
  }

  /**
   * If Azure form has an error
   * @returns {boolean}
   */
  hasAzureError() {
    const data = this.state.ssoConfig?.data;
    return !data?.url
      || !data?.app_id
      || !data?.directory_id
      || !data?.secret;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {Promise<void>}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      await this.validate();
      if (this.hasValidationError()) {
        await this.toggleProcessing();
        return;
      }
      try {
        await this.saveSso();
        await this.handleSaveSuccess();
      } catch (error) {
        await this.handleSaveError(error);
      }
    }
  }

  /**
   * save Sso settings
   * @returns {Promise<void>}
   */
  async saveSso() {
    await this.props.administrationWorkspaceContext.onSaveSsoRequested({...this.state.ssoConfig});
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The SSO settings for the organization were updated."));
    this.setState({processing: false});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   * @returns {Promise<void>}
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
   * @returns {Promise<void>}
   */
  async handleError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
  }

  /**
   * Get the supported SSO providers.
   */
  get supportedSsoProviders() {
    return [
      {value: "azure", label: "Azure"}
    ];
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
    const ssoConfig = this.state.ssoConfig;
    return (
      <div className="row">
        <div className="sso-settings col7 main-column">
          <h3><Trans>SSO</Trans></h3>
          <form className="form">
            <div className="select-wrapper input">
              <label htmlFor="sso-provider-input"><Trans>SSO provider</Trans></label>
              <Select className="medium" id="sso-provider-input" name="provider" items={this.supportedSsoProviders} value={ssoConfig?.provider} onChange={this.handleProviderInputChange}/>
              <p><Trans>SSO explanation.</Trans></p>
            </div>
            {ssoConfig?.provider === "azure" &&
            <>
              <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label><Trans>Login URL</Trans></label>
                <input id="sso-azure-url-input" type="text" className="fluid form-element" name="url"
                  value={ssoConfig?.data?.url} onChange={this.handleInputChange} placeholder={this.translate("Login URL")}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
              <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label><Trans>Application (client) ID</Trans></label>
                <input id="sso-azure-client-id-input" type="text" className="fluid form-element" name="app_id"
                  value={ssoConfig?.data?.app_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
              <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label><Trans>Directory ID</Trans></label>
                <input id="sso-azure-directory-id-input" type="text" className="fluid form-element" name="directory_id"
                  value={ssoConfig?.data?.directory_id} onChange={this.handleInputChange} placeholder={this.translate("Directory ID")}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
              <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label><Trans>Secret</Trans></label>
                <input id="sso-azure-secret-input" type="text" className="fluid form-element" name="secret"
                  value={ssoConfig?.data?.secret} onChange={this.handleInputChange} placeholder={this.translate("Secret")}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
            </>
            }
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about SSO, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/sso" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
          {ssoConfig?.provider === "azure" &&
          <div className="sidebar-help">
            <h3><Trans>How do I configure a AzureAD SSO?</Trans></h3>
            <a className="button" href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso" target="_blank" rel="noopener noreferrer">
              <Icon name="external-link"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
          }
        </div>
      </div>
    );
  }
}

ManageSsoSettings.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withAdministrationWorkspace(withAdminSso(withTranslation('common')(ManageSsoSettings))));
