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
 * @since         3.0.0
 */
import React, {Component} from "react";
import LoginContext from "../../../contexts/LoginContext";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import {ApiClient} from "../../../../react-administration/lib/apiClient/apiClient";
import {ApiClientOptions} from "../../../../react-administration/lib/apiClient/apiClientOptions";
import XRegExp from "xregexp";
import {withRouter} from "react-router-dom";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import PropTypes from "prop-types";

class EnterNameForm extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.apiClient = new ApiClient(new ApiClientOptions().setBaseUrl(window.location.origin).setResourceName("users/register"));
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
      this.firstnameRef.current.focus();
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

      firstname: "",
      firstnameError: null,
      lastname: "",
      lastnameError: null,

      hasAlreadyBeenValidated: false // True if the form has already been submitted once
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstnameInputOnKeyUp = this.handleFirstnameInputOnKeyUp.bind(this);
    this.handleLastnameInputOnKeyUp = this.handleLastnameInputOnKeyUp.bind(this);
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.firstnameRef = React.createRef();
    this.lastnameRef = React.createRef();
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
   * Handle firstname input keyUp event.
   */
  handleFirstnameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateFirstnameInput();
      this.setState(state);
    }
  }

  /**
   * Handle firstname input keyUp event.
   */
  handleLastnameInputOnKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateLastnameInput();
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
        await this.sendName();
        await this.handleSuccess();
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  /**
   * Send the username
   * @returns {Promise<Object>}
   */
  async sendName() {
    const name = {
      first_name: this.state.firstname,
      last_name: this.state.lastname
    };
    await this.apiClient.create(name);
  }

  /**
   * Handle operation success.
   */
  async handleSuccess() {
    this.props.history.push('/setup/check-mailbox');
  }

  /**
   * Handle save operation success.
   */
  async handleError(error) {
    console.log(error);
    await this.props.actionFeedbackContext.displayError("There was an unexpected error, please retry later...");
    await this.toggleProcessing();
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
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    await Promise.all([
      this.validateFirstnameInput(),
      this.validateLastnameInput(),
    ]);
    return this.hasValidationError();
  }

  /**
   * Validate the firstname input.
   * @returns {Promise<void>}
   */
  async validateFirstnameInput() {
    let firstnameError = null;
    const firstname = this.state.firstname.trim();
    if (!firstname.length) {
      firstnameError = "A first name is required.";
    } else if (!this.isOnlyLetter(firstname)) {
      firstnameError = "The first name should contain only letters.";
    }
    return this.setState({firstnameError});
  }

  /**
   * Validate the firstname input.
   * @returns {Promise<void>}
   */
  async validateLastnameInput() {
    let lastnameError = null;
    const lastname = this.state.lastname.trim();
    if (!lastname.length) {
      lastnameError = "A last name is required.";
    } else if (!this.isOnlyLetter(lastname)) {
      lastnameError = "The last name should contain only letters.";
    }
    return this.setState({lastnameError});
  }

  /**
   * Check that a name contain only letters
   * @param {string }name the name to test
   */
  isOnlyLetter(name) {
    const lettersRegexp = `^[a-zA-Z]+$`;
    const xregexp = XRegExp(lettersRegexp);
    return xregexp.test(name);
  }

  /**
   * Focus the first field of the form which is in error state.
   * @returns {void}
   */
  focusFirstFieldError() {
    if (this.state.firstnameError) {
      this.firstnameRef.current.focus();
    } else if (this.state.lastnameError) {
      this.lastnameRef.current.focus();
    }
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.firstnameError !== null || this.state.lastnameError !== null;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  render() {
    return (
      <div className="enter-name">
        <h1>New here? Enter your email to get started.</h1>
        <form acceptCharset="utf-8" onSubmit={this.handleFormSubmit} noValidate>
          <div className={`input text required ${this.state.firstnameError ? "error" : ""}`}>
            <label htmlFor="firstname">First Name</label>
            <input id="firstname-input" type="text" name="firstname" ref={this.firstnameRef} value={this.state.firstname}
              onKeyUp={this.handleFirstnameInputOnKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} placeholder="first name" required="required"/>
            {this.state.firstnameError &&
            <div className="error-message">{this.state.firstnameError}</div>
            }
          </div>
          <div className={`input text required ${this.state.lastnameError ? "error" : ""}`}>
            <label htmlFor="lastname">Last Name</label>
            <input id="lastname-input" type="text" name="lastname" ref={this.lastnameRef} value={this.state.lastname}
              onKeyUp={this.handleLastnameInputOnKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} placeholder="last name" required="required"/>
            {this.state.lastnameError &&
            <div className="error-message">{this.state.lastnameError}</div>
            }
          </div>
          <div className="form-actions">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} big={true} processing={this.state.processing} value="Register"/>
            <a href="/auth/login">I already have an account</a>
          </div>
        </form>
      </div>
    );
  }
}

EnterNameForm.contextType = LoginContext;

EnterNameForm.propTypes = {
  history: PropTypes.object,
  actionFeedbackContext: PropTypes.object,
};

export default withRouter(withActionFeedback(EnterNameForm));
