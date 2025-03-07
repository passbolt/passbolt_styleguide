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
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";
import {maxSizeValidation} from '../../../lib/Error/InputValidator';
import Icon from "../../../../shared/components/Icons/Icon";
import {USER_INPUT_MAX_LENGTH} from '../../../../shared/constants/inputs.const';
import Tooltip from "../../Common/Tooltip/Tooltip";
import {DateTime} from "luxon";

class EditUser extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.defaultState;
    this.createInputRefs();
    this.bindEventHandlers();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    const user = this.props.context.users.find(user => user.id === this.props.context.editUserDialogProps.id);
    const role = this.props.context.roles.find(role => role.id === user.role_id);
    const disabled = user.disabled ? new Date(user.disabled) : null;
    return {
      // Dialog states
      loading: true,
      processing: false,

      // Fields and errors
      first_name: user.profile.first_name,
      first_nameError: null,
      first_nameWarning: "",
      last_name: user.profile.last_name,
      last_nameError: null,
      last_nameWarning: "",
      username: user.username,
      disabled: disabled,
      is_admin: role.name === 'admin',
      hasAlreadyBeenValidated: false // True if the form has alreadt been submitted once
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.setState({loading: false}, () => {
      this.firstNameRef.current.focus();
    });
  }

  /**
   * Returns true if the editing user is actually the logged in user
   */
  get isLoggedInUserAsEditing() {
    return this.props.context.editUserDialogProps &&
      this.props.context.loggedInUser &&
      this.props.context.editUserDialogProps.id === this.props.context.loggedInUser.id;
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstNameInputOnKeyUp = this.handleFirstNameInputOnKeyUp.bind(this);
    this.handleLastNameInputOnKeyUp = this.handleLastNameInputOnKeyUp.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleIsSuspendedCheckboxClick = this.handleIsSuspendedCheckboxClick.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.context.setContext({editUserDialogProps: null});
    this.props.onClose();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  /**
   * Handle form checkbox input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleCheckboxClick(event) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;
    this.setState({[name]: checked});
  }

  /**
   * Handle "is suspended" checkbox input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleIsSuspendedCheckboxClick(event) {
    const checked = event.target.checked;
    const disabled = checked
      ? new Date()
      : null;

    this.setState({disabled});
  }

  /**
   * Handle first name input keyUp event.
   */
  handleFirstNameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateFirstNameInput();
      this.setState(state);
    } else {
      const first_nameWarning = maxSizeValidation(this.state.first_name, USER_INPUT_MAX_LENGTH, this.translate);
      this.setState({first_nameWarning});
    }
  }

  /**
   * Handle last name input keyUp event.
   */
  handleLastNameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateLastNameInput();
      this.setState(state);
    } else {
      const last_nameWarning = maxSizeValidation(this.state.last_name, USER_INPUT_MAX_LENGTH, this.translate);
      this.setState({last_nameWarning});
    }
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    // Avoid the form to be submitted.
    event.preventDefault();

    this.setState({hasAlreadyBeenValidated: true});

    // Do not re-submit an already processing form
    if (!this.state.processing) {
      this.toggleProcessing();
      await this.validate();
      if (this.hasValidationError()) {
        this.toggleProcessing();
        this.focusFirstFieldError();
        return;
      }

      try {
        await this.updateUser();
        await this.handleSaveSuccess();
      } catch (error) {
        this.handleSaveError(error);
      }
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been updated successfully"));
    await this.updateLoggedInUserIfNeeded();
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Toggle processing state
   */
  toggleProcessing() {
    const prev = this.state.processing;
    this.setState({processing: !prev});
  }

  /**
   * Focus the first field of the form which is in error state.
   * @returns {void}
   */
  focusFirstFieldError() {
    if (this.state.first_nameError) {
      this.firstNameRef.current.focus();
    } else if (this.state.last_nameError) {
      this.lastNameRef.current.focus();
    }
  }

  /**
   * Update the user
   * @returns {Promise<Object>} User entity or Error
   */
  async updateUser() {
    const role = this.props.context.roles.find(role => this.state.is_admin ? role.name === 'admin' : role.name === 'user');
    const userDto = {
      id: this.props.context.editUserDialogProps.id,
      username: this.state.username,
      profile: {
        first_name: this.state.first_name,
        last_name: this.state.last_name
      },
      role_id: role.id,
    };
    if (this.isSuspendedUserFeatureEnabled()) {
      userDto.disabled = this.getFormattedDate(this.state.disabled);
    }
    return await this.props.context.port.request("passbolt.users.update", userDto);
  }

  /**
   * Update the logged in user if he actually edited himself
   */
  async updateLoggedInUserIfNeeded() {
    const newContext = {editUserDialogProps: null};
    if (this.isLoggedInUserAsEditing) {
      const loggedInUser = await this.props.context.port.request("passbolt.users.find-logged-in-user", true);
      this.props.context.setContext({loggedInUser});
    }
    await this.props.context.setContext(newContext);
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    await Promise.all([
      this.validateFirstNameInput(),
      this.validateLastNameInput()
    ]);
    return this.hasValidationError();
  }

  /**
   * Validate the first name input.
   * @returns {Promise<void>}
   */
  async validateFirstNameInput() {
    let first_nameError = null;
    const first_name = this.state.first_name.trim();
    if (!first_name.length) {
      first_nameError = this.translate("A first name is required.");
    }
    return this.setState({first_nameError});
  }

  /**
   * Validate the last name input.
   * @returns {Promise<void>}
   */
  async validateLastNameInput() {
    let last_nameError = null;
    const last_name = this.state.last_name.trim();
    if (!last_name.length) {
      last_nameError = this.translate("A last name is required.");
    }
    return this.setState({last_nameError});
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.first_nameError !== null || this.state.last_nameError !== null;
  }

  /**
   * Is the user currently suspended.
   * @returns {boolean}
   */
  isUserSuspended() {
    if (!this.state.disabled) {
      return false;
    }

    const suspendedSince = new Date(this.state.disabled);
    return suspendedSince <= new Date();
  }

  /**
   * Returns the time at when the user will be suspended if any
   * @returns {string|null}
   */
  get suspendedDate() {
    if (!this.state.disabled) {
      return null;
    }

    return DateTime
      .fromJSDate(new Date(this.state.disabled))
      .setLocale(this.props.context.locale)
      .toLocaleString(DateTime.DATETIME_FULL);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Returns true if the plugin `disableUser` is enabled
   * @returns {boolean}
   */
  isSuspendedUserFeatureEnabled() {
    return this.props.context.siteSettings.canIUse('disableUser');
  }

  /**
   * Returns a date string value compatible with the API
   * @param {Date|null} date
   * @returns {string}
   */
  getFormattedDate(date) {
    if (!date || !(date instanceof Date)) {
      return null;
    }

    const formatNumber = num => num.toString().padStart(2, '0');
    const Y = date.getFullYear();
    const M = formatNumber(date.getUTCMonth() + 1);
    const D = formatNumber(date.getUTCDate());
    const h = formatNumber(date.getUTCHours());
    const m = formatNumber(date.getUTCMinutes());
    const s = formatNumber(date.getUTCSeconds());

    return `${Y}-${M}-${D}T${h}:${m}:${s}`;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const isUserSuspended = this.isUserSuspended();
    const suspendedDate = this.suspendedDate;
    return (
      <DialogWrapper className='user-edit-dialog' title={this.translate('Edit User')}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="user-edit-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.first_nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="user-first-name-input"><Trans>First name</Trans>{this.state.first_nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="user-first-name-input" name="first_name"
                ref={this.firstNameRef} type="text" value={this.state.first_name} placeholder={this.translate("First name")}
                required="required" disabled={this.hasAllInputDisabled()}
                onKeyUp={this.handleFirstNameInputOnKeyUp} onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.first_nameError &&
              <div className="first_name error-message">{this.state.first_nameError}</div>
              }
              {this.state.first_nameWarning && (
                <div className="firstname warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.first_nameWarning}
                </div>
              )}
            </div>
            <div className={`input text required ${this.state.last_nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="user-last-name-input"><Trans>Last name</Trans></label>
              <input id="user-last-name-input" name="last_name"
                maxLength="128"
                ref={this.lastNameRef} type="text" value={this.state.last_name} placeholder={this.translate("Last name")}
                required="required" disabled={this.hasAllInputDisabled()}
                onKeyUp={this.handleLastNameInputOnKeyUp} onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.last_nameError &&
              <div className="last_name error-message">{this.state.last_nameError}</div>
              }
              {this.state.last_nameWarning && (
                <div className="lastname warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.last_nameWarning}
                </div>
              )}
            </div>
            <div className="input text required disabled">
              <label htmlFor="user-username-input"><Trans>Username / Email</Trans>{this.state.last_nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="user-username-input" name="username"
                maxLength="128"
                type="text" value={this.state.username} placeholder={this.translate("Username")}
                required="required" disabled={true}
                autoComplete='off' autoFocus={true}
              />
            </div>
            <div className={`input checkbox-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Role</Trans></label>
              <span className="input toggle-switch form-element ready">
                <input
                  id="is_admin_checkbox"
                  name="is_admin"
                  disabled={this.isLoggedInUserAsEditing || this.hasAllInputDisabled()}
                  onChange={this.handleCheckboxClick}
                  className="toggle-switch-checkbox checkbox"
                  checked={this.state.is_admin}
                  type="checkbox"
                />
                <label htmlFor="is_admin_checkbox"><Trans>This user is an administrator</Trans></label>
                <Tooltip message={this.translate("Administrators can add and delete users. They can also create groups and assign group managers. By default they can not see all passwords.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
              </span>
              {this.isSuspendedUserFeatureEnabled() &&
                <span className="input toggle-switch form-element ready">
                  <input
                    id="is_suspended_checkbox"
                    name="disabled"
                    disabled={this.isLoggedInUserAsEditing || this.hasAllInputDisabled()}
                    onChange={this.handleIsSuspendedCheckboxClick}
                    checked={isUserSuspended}
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                  />
                  <label htmlFor="is_suspended_checkbox"> <Trans>Suspend this user</Trans></label>
                  <Tooltip message={this.translate("This user will not be able to sign in to passbolt and receive email notifications. Other users can share resource with it and add this user to a group.")}>
                    <Icon name="info-circle"/>
                  </Tooltip>
                </span>
              }
            </div>
            {!isUserSuspended && this.state.disabled &&
              <div className="message warning no-margin">
                <Trans><b>Warning:</b> Suspension is scheduled for the {{suspendedDate}}</Trans>
              </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditUser.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(EditUser))));
