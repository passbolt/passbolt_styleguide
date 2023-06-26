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
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import Select from "../../Common/Select/Select";

class EditUserProfile extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
    this.createReferences();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      profile: { // The editing user profile data
        first_name: "",
        last_name: "",
        username: "",
        locale: "en-UK",
      },
      actions: {
        processing: false // True if one is processing the edit
      },
      errors: {
        isFirstnameEmpty: false, // True if the firstname is empty
        isLastnameEmpty: false // True if the lastname is empty
      },
      hasAlreadyBeenValidated: false // True if the data have already been validated once
    };
  }

  /**
   * Return trus if the export is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if actions can be performed
   */
  get areActionsAllowed() {
    return !this.isProcessing;
  }

  /**
   * True if the edit has validation errors
   */
  get hasErrors() {
    return Object.values(this.state.errors).some(value => value);
  }

  /**
   * Bind  handlers
   */
  bindHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /**
   * Create references
   */
  createReferences() {
    this.firstnameRef = React.createRef();
    this.lastnameRef = React.createRef();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({profile: Object.assign(this.state.profile, {[name]: value})});
    if (this.state.hasAlreadyBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Whenever the user wants to close
   */
  handleClose() {
    this.close();
  }

  /**
   * Whenever the user wants to save the changes on his profile
   * @param event A DOM event
   */
  async handleSave(event) {
    // Avoid the form to be submitted.
    event.preventDefault();
    await this.save();
  }

  /**
   * Populates the component with data
   */
  async populate() {
    const {first_name, last_name} = this.props.context.loggedInUser.profile;
    const locale = this.props.context.locale;
    await this.setState({profile: {first_name, last_name, locale}});
  }

  /**
   * Saves the change on the user profile
   */
  async save() {
    await this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();
    await this.validate();
    if (this.hasErrors) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }
    await this.updateUserProfile()
      .then(this.onSaveSuccess.bind(this))
      .catch(this.onSaveError.bind(this));
  }

  /**
   * Update the user profile.
   * @returns {Promise<void>}
   */
  async updateUserProfile() {
    const userToUpdateDto = this.buildUserToUpdateDto();
    await this.props.context.port.request("passbolt.users.update", userToUpdateDto);
    if (this.canIUseLocale) {
      const localeToUpdateDto = this.buildLocaleToUpdateDto();
      await this.props.userSettingsContext.onUpdateLocaleUserRequested(localeToUpdateDto);
    }
  }

  /**
   * Build the user to update DTO
   * @returns {object}
   */
  buildUserToUpdateDto() {
    const {id, username} = this.props.context.loggedInUser;
    const profile = {
      first_name: this.state.profile.first_name,
      last_name: this.state.profile.last_name,
    };
    return {id, username, profile};
  }

  /**
   * Build the locale to update DTO
   * @returns {object}
   */
  buildLocaleToUpdateDto() {
    return {locale: this.state.profile.locale};
  }

  /**
   * Whenever the save has been successful
   */
  async onSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been updated successfully"));
    const loggedInUser = await this.props.context.port.request("passbolt.users.find-logged-in-user");
    this.props.context.setContext({loggedInUser});
    this.props.context.onUpdateLocaleRequested();
    this.props.onClose();
  }

  /**
   * Whenever the save has failed
   * @param error The error
   */
  async onSaveError(error) {
    await this.toggleProcessing();
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Close the component
   */
  close() {
    this.props.onClose();
  }

  /**
   * Validates the edit data
   */
  async validate() {
    const isEmpty = s => s.trim().length === 0;
    const errors = {
      isFirstnameEmpty: isEmpty(this.state.profile.first_name),
      isLastnameEmpty: isEmpty(this.state.profile.last_name)
    };
    await this.setState({errors});
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.errors.isFirstnameEmpty) {
      this.firstnameRef.current.focus();
    } else if (this.state.errors.isLastnameEmpty) {
      this.lastnameRef.current.focus();
    }
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.actions.processing;
    return this.setState({actions: Object.assign(this.state.actions, {processing: !prev})});
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Get the supported locales
   * @returns {array}
   */
  get supportedLocales() {
    if (this.props.context.siteSettings.supportedLocales) {
      return this.props.context.siteSettings.supportedLocales.map(supportedLocale => ({value: supportedLocale.locale, label: supportedLocale.label}));
    }
    return [];
  }

  /**
   * Can I use the locale plugin.
   * @type {boolean}
   */
  get canIUseLocale() {
    return this.props.context.siteSettings.canIUse('locale');
  }

  /**
   * Render the component
   */
  render() {
    const firstnameErrorSelector = this.state.errors.isFirstnameEmpty ? "error" : "";
    const lastnameErrorSelector = this.state.errors.isLastnameEmpty ? "error" : "";
    return (
      <DialogWrapper
        title={this.translate("Edit profile")}
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}>

        <form
          className="user-edit-form"
          onSubmit={this.handleSave}
          noValidate>

          <div className="form-content">

            <div className={`input text required ${firstnameErrorSelector} ${!this.areActionsAllowed ? 'disabled' : ''}`}>
              <label htmlFor="user-profile-firstname-input"><Trans>First name</Trans></label>
              <input
                id="user-profile-firstname-input"
                name="first_name"
                type="text"
                placeholder={this.translate("First name")}
                required="required"
                autoComplete="off"
                autoFocus={true}
                ref={this.firstnameRef}
                value={this.state.profile.first_name}
                onChange={this.handleInputChange}
                disabled={!this.areActionsAllowed}/>
              {this.state.errors.isFirstnameEmpty &&
              <div className="first_name error-message">
                <Trans>A first name is required.</Trans>
              </div>
              }
            </div>

            <div className={`input text required ${lastnameErrorSelector} ${!this.areActionsAllowed ? 'disabled' : ''}`}>
              <label htmlFor="user-profile-lastname-input"><Trans>Last name</Trans></label>
              <input
                id="user-profile-lastname-input"
                name="last_name"
                type="text"
                placeholder={this.translate("Last name")}
                required="required"
                autoComplete="off"
                ref={this.lastnameRef}
                value={this.state.profile.last_name}
                onChange={this.handleInputChange}
                disabled={!this.areActionsAllowed}/>
              {this.state.errors.isLastnameEmpty &&
              <div className="last_name error-message">
                <Trans>A last name is required.</Trans>
              </div>
              }
            </div>

            <div className="input text required disabled">
              <label htmlFor="user-profile-username-input"><Trans>Username / Email</Trans></label>
              <input
                id="user-profile-username-input"
                name="username"
                type="text"
                disabled={true}
                aria-required={true}
                value={this.props.context.loggedInUser.username}/>
            </div>

            {this.canIUseLocale &&
            <div className={`select-wrapper input required ${!this.areActionsAllowed ? 'disabled' : ''}`}>
              <label htmlFor="user-profile-locale-input"><Trans>Language</Trans></label>
              <Select id="user-profile-locale-input" name="locale" value={this.state.profile.locale}
                items={this.supportedLocales} disabled={!this.areActionsAllowed} onChange={this.handleInputChange}/>
            </div>
            }

          </div>

          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              onClick={this.handleClose}/>
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value={this.translate("Save")}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}

EditUserProfile.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Whenever the dialog must be closed
  dialogContext: PropTypes.object, // The dialog context
  userSettingsContext: PropTypes.object, // The user settings context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withUserSettings(withTranslation('common')(EditUserProfile)))));
