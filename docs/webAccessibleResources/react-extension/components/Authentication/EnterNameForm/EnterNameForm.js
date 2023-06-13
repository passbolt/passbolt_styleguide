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
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {withApiTriageContext} from "../../../contexts/ApiTriageContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {Trans, withTranslation} from "react-i18next";

class EnterNameForm extends Component {
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
      this.firstnameRef.current.focus();
    });
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
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

      await this.props.apiTriageContext.onRegistrationRequested(this.state.firstname, this.state.lastname);
    }
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
      firstnameError = this.translate("A first name is required.");
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
      lastnameError = this.translate("A last name is required.");
    }
    return this.setState({lastnameError});
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

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <div className="enter-name">
        <h1><Trans>New here? Enter your name to get started.</Trans></h1>
        <form acceptCharset="utf-8" onSubmit={this.handleFormSubmit} noValidate>
          <div className={`input text required ${this.state.firstnameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
            <label htmlFor="firstname"><Trans>First name</Trans></label>
            <input id="firstname-input" type="text" name="firstname" ref={this.firstnameRef} value={this.state.firstname}
              onKeyUp={this.handleFirstnameInputOnKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} placeholder={this.translate("First name")} required="required"/>
            {this.state.firstnameError &&
            <div className="error-message">{this.state.firstnameError}</div>
            }
          </div>
          <div className={`input text required ${this.state.lastnameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
            <label htmlFor="lastname"><Trans>Last name</Trans></label>
            <input id="lastname-input" type="text" name="lastname" ref={this.lastnameRef} value={this.state.lastname}
              onKeyUp={this.handleLastnameInputOnKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} placeholder={this.translate("Last name")} required="required"/>
            {this.state.lastnameError &&
            <div className="error-message">{this.state.lastnameError}</div>
            }
          </div>
          <div className="form-actions">
            <FormSubmitButton
              disabled={this.hasAllInputDisabled()} big={true} fullWidth={true} processing={this.state.processing}
              value={this.translate("Sign up")}
            />
            <a href={`${this.props.context.trustedDomain}/auth/login?locale=${this.props.context.locale}`}
              rel="noopener noreferrer">
              <Trans>I already have an account</Trans>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

EnterNameForm.propTypes = {
  apiTriageContext: PropTypes.object, // The api triage context
  context: PropTypes.any, // The application context provider
  t: PropTypes.func, // The translation function
};

export default withAppContext(withApiTriageContext(withTranslation('common')(EnterNameForm)));
