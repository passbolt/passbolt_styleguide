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
import XRegExp from "xregexp";
import {withAppContext} from "../../../contexts/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";

class CreateUser extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createInputRefs();
    this.bindEventHandlers();
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
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,

      // Fields and errors
      first_name: "",
      first_nameError: null,
      last_name: "",
      last_nameError: null,
      username: "",
      usernameError: null,
      is_admin: false,
      hasAlreadyBeenValidated: false // True if the form has already been submitted once
    };
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.usernameRef = React.createRef();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstNameInputKeyUp = this.handleFirstNameInputKeyUp.bind(this);
    this.handleLastNameInputOnKeyUp = this.handleLastNameInputOnKeyUp.bind(this);
    this.handleUsernameInputOnKeyUp = this.handleUsernameInputOnKeyUp.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
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
   * Handle first name input keyUp event.
   */
  handleFirstNameInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateFirstNameInput();
      this.setState(state);
    }
  }

  /**
   * Handle last name input keyUp event.
   */
  handleLastNameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateLastNameInput();
      this.setState(state);
    }
  }

  /**
   * Handle username/email input keyUp event.
   */
  handleUsernameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateUsernameInput();
      this.setState(state);
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

    await this.setState({hasAlreadyBeenValidated: true});

    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      await this.validate();

      if (this.hasValidationError()) {
        await this.toggleProcessing();
        this.focusFirstFieldError();
        return;
      }
      try {
        await this.createUser();
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
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been added successfully"));
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
    } else if (this.hasUsernameAlreadyExists(error.data)) {
      this.setState({processing: false, usernameError: error.data.body.username.uniqueUsername});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * has username already exists
   * @param errorData the error data received
   * @returns {*}
   */
  hasUsernameAlreadyExists(errorData) {
    return errorData && errorData.body && errorData.body.username && errorData.body.username.uniqueUsername;
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
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
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
    } else if (this.state.username) {
      this.usernameRef.current.focus();
    }
  }

  /**
   * Create the user
   * @returns {Promise<Object>} User entity or Error
   */
  async createUser() {
    const role = this.props.context.roles.find(role => this.state.is_admin ? role.name === "admin" : role.name === "user");
    const userDto = {
      profile: {
        first_name: this.state.first_name,
        last_name: this.state.last_name
      },
      username: this.state.username.trim(),
      role_id: role.id
    };
    return await this.props.context.port.request("passbolt.users.create", userDto);
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    await Promise.all([
      this.validateFirstNameInput(),
      this.validateLastNameInput(),
      this.validateUsernameInput()
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
   * Validate the username input.
   * @returns {Promise<void>}
   */
  async validateUsernameInput() {
    let usernameError = null;
    const username = this.state.username.trim();
    if (!username.length) {
      usernameError = this.translate("A username is required.");
    } else if (!this.isEmail(username)) {
      usernameError = this.translate("The username should be a valid username address.");
    }
    return this.setState({usernameError});
  }

  /**
   * Check that a username is a valid email
   * @param {string }username the username to test
   */
  isEmail(username) {
    const hostnameRegexp = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
    const emailRegexp = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${hostnameRegexp}$`;
    const xregexp = XRegExp(emailRegexp);
    return xregexp.test(username);
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.first_nameError !== null || this.state.last_nameError !== null || this.state.usernameError !== null;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
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
    return (
      <DialogWrapper className='user-create-dialog' title={this.translate("Add User")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="user-create-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.first_nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="user-first-name-input"><Trans>First name</Trans></label>
              <input id="user-first-name-input" name="first_name"
                ref={this.firstNameRef}
                type="text" value={this.state.first_name} placeholder={this.translate("First name")}
                required="required" disabled={this.hasAllInputDisabled()}
                onKeyUp={this.handleFirstNameInputKeyUp} onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.first_nameError &&
              <div className="first_name error-message">{this.state.first_nameError}</div>
              }
            </div>
            <div className={`input text required ${this.state.last_nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="user-last-name-input"><Trans>Last name</Trans></label>
              <input id="user-last-name-input" name="last_name"
                ref={this.lastNameRef}
                type="text" value={this.state.last_name} placeholder={this.translate("Last name")}
                required="required" disabled={this.hasAllInputDisabled()}
                onKeyUp={this.handleLastNameInputOnKeyUp} onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.last_nameError &&
              <div className="last_name error-message">{this.state.last_nameError}</div>
              }
            </div>
            <div className={`input text required ${this.state.usernameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="user-username-input"><Trans>Username / Email</Trans></label>
              <input id="user-username-input" name="username"
                ref={this.usernameRef} type="text" value={this.state.username} placeholder={this.translate("Email")}
                required="required" disabled={this.hasAllInputDisabled()}
                onKeyUp={this.handleUsernameInputOnKeyUp} onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.usernameError &&
              <div className="username error-message">{this.state.usernameError}</div>
              }
            </div>
            <div className={`input checkbox-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="is_admin_checkbox"><Trans>Role</Trans></label>
              <div className="input checkbox">
                <input id="is_admin_checkbox" name="is_admin" onChange={this.handleCheckboxClick}
                  checked={this.state.is_admin} disabled={this.hasAllInputDisabled()} type="checkbox"/>
                <label htmlFor="is_admin_checkbox"> <Trans>This user is an administrator</Trans></label>
              </div>
              <div className="help-message">
                <Trans>Note: Administrators can add and delete users; They can also create groups and assign group managers; By default they can not see all passwords.</Trans>
              </div>
            </div>
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

CreateUser.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(CreateUser))));
