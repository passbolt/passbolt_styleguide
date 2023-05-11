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
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withAdminSso} from "../../../contexts/AdminSsoContext";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

const uiStateEnum = {
  FORM: "form",
  SUCCESS: "success"
};

class TestSsoSettingsDialog extends React.Component {
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
      uiState: uiStateEnum.FORM,
      hasSuccessfullySignedInWithSso: false,
      processing: false,
      ssoToken: null,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleSignInTestClick = this.handleSignInTestClick.bind(this);
    this.handleActivateSsoSettings = this.handleActivateSsoSettings.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  /**
   * Handles the form submission
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleSignInTestClick(event) {
    event.preventDefault();
    try {
      this.setState({processing: true});
      const ssoToken = await this.props.context.port.request('passbolt.sso.dry-run', this.props.configurationId);
      this.setState({
        uiState: uiStateEnum.SUCCESS,
        hasSuccessfullySignedInWithSso: true,
        ssoToken: ssoToken
      });
    } catch (e) {
      // The user might manually close the popup but other errors than this one are unexpected
      if (e?.name !== "UserAbortsOperationError") {
        this.props.adminSsoContext.handleError(e);
      }
    }
    this.setState({processing: false});
  }

  /**
   * Handle the click on the settings activation button
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleActivateSsoSettings(event) {
    event.preventDefault();
    try {
      this.setState({processing: true});
      await this.props.context.port.request("passbolt.sso.activate-settings", this.props.configurationId, this.state.ssoToken);
      await this.props.context.port.request("passbolt.sso.generate-sso-kit", this.props.provider.id);
      this.props.onSuccessfulSettingsActivation();
      this.handleCloseDialog();
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("SSO settings have been registered successfully"));
    } catch (e) {
      this.props.adminSsoContext.handleError(e);
    }
    this.setState({processing: false});
  }

  /**
   * Handles the closing of the dialog and the notification of the dialog opener
   */
  handleCloseDialog() {
    this.props.onClose();
    this.props.handleClose();
  }

  /**
   * Returns true if the input must be disabled.
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns true when the AD has successfully tested the current draft SSO settings
   */
  canSaveSettings() {
    return !this.hasAllInputDisabled() && this.state.hasSuccessfullySignedInWithSso;
  }

  /**
   * Returns the title string to display on the dialog based on the UI state.
   * @returns {string}
   */
  get title() {
    const stateTitles = {
      form: this.translate("Test Single Sign-On configuration"),
      success: this.translate("Save Single Sign-On configuration"),
    };

    return stateTitles[this.state.uiState] || "";
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
      <DialogWrapper className='test-sso-settings-dialog sso-login-form' title={this.title}
        onClose={this.handleCloseDialog} disabled={this.hasAllInputDisabled()}>
        <form onSubmit={this.handleActivateSsoSettings}>
          <div className="form-content">
            {this.state.uiState === uiStateEnum.FORM &&
              <>
                <p><Trans>Before saving the settings, we need to test if the configuration is working.</Trans></p>
                <button type="button" className={`sso-login-button ${this.props.provider.id}`} onClick={this.handleSignInTestClick} disabled={this.hasAllInputDisabled()} >
                  <span className="provider-logo">
                    {this.props.provider.icon}
                  </span>
                  {this.translate(`Sign in with {{providerName}}`, {providerName: this.props.provider.name})}
                </button>
              </>
            }
            {this.state.uiState === uiStateEnum.SUCCESS &&
              <p>{this.translate(`You susccessfully signed in with your {{providerName}} account. You can safely save your configuration.`, {providerName: this.props.provider.name})}</p>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseDialog}/>
            <FormSubmitButton disabled={!this.canSaveSettings()} processing={this.state.processing} value={this.translate("Save settings")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

TestSsoSettingsDialog.propTypes = {
  context: PropTypes.object, // Application context
  adminSsoContext: PropTypes.object, // The administration SSO settings context
  onClose: PropTypes.func, // The close dialog callback
  t: PropTypes.func, // The translation function
  provider: PropTypes.object, // The selected SSO provider to test
  configurationId: PropTypes.string, // the configuration identifier to be tested
  actionFeedbackContext: PropTypes.any, // The action feedback context
  handleClose: PropTypes.func, // handle the closing of the dialog
  onSuccessfulSettingsActivation: PropTypes.func, // callback to notify when the settings hasve been activated successsfully
};

export default withAppContext(withAdminSso(withActionFeedback(withTranslation('common')(TestSsoSettingsDialog))));
