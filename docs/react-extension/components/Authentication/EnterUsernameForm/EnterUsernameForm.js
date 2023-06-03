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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withApiTriageContext} from "../../../contexts/ApiTriageContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {Trans, withTranslation} from "react-i18next";
import AppEmailValidatorService from "../../../../shared/services/validator/AppEmailValidatorService";

class EnterUsernameForm extends Component {
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
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true,
      processing: false,
      username: "",
      usernameError: null,
      agreedTerms: false,
      agreedTermsError: null,
      hasAlreadyBeenValidated: false // True if the form has already been submitted once
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    if (this.props.context.siteSettings !== null) {
      this.setState({loading: false}, () => {
        this.focusUsernameElement();
      });
    }
  }

  /**
   * componentDidUpdate
   * Invoked immediately after component is updated
   * @param {object} previousProps The previous props
   * @return {void}
   */
  async componentDidUpdate() {
    // If the component is still marked as loading when the site settings are retrieved, mark it as loaded and put the focus on the username field
    if (this.state.loading && this.props.context.siteSettings !== null) {
      this.setState({loading: false}, () => {
        this.focusUsernameElement();
      });
    }
  }

  /**
   * Focus the username element.
   */
  focusUsernameElement() {
    if (!this.isFocusOnBrowserExtension()) {
      this.usernameRef.current.focus();
    }
  }

  /**
   * Check if the focus is on the browser extension
   * @returns {boolean}
   */
  isFocusOnBrowserExtension() {
    const activeElement = document.activeElement;
    if (activeElement) {
      return activeElement.tagName.toLowerCase() === "iframe";
    }
    return false;
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUsernameInputOnKeyUp = this.handleUsernameInputOnKeyUp.bind(this);
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.usernameRef = React.createRef();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({[name]: value});

    if (this.state.hasAlreadyBeenValidated) {
      await this.validate();
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
        return;
      }
      this.props.apiTriageContext.onTriageRequested(this.state.username.trim());
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
      this.validateUsernameInput(),
      this.validateAgreedTerms()
    ]);
    return this.hasValidationError();
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
    } else if (!AppEmailValidatorService.validate(username, this.props.context.siteSettings)) {
      usernameError = this.translate("Please enter a valid email address.");
    }
    return this.setState({username, usernameError});
  }

  /**
   * Validate the agreed terms checkbox.
   * @returns {Promise<void>}
   */
  async validateAgreedTerms() {
    let agreedTermsError = false;
    const mustValidateTerms = this.privacyLink || this.termsLink;
    const agreedTerms = this.state.agreedTerms;
    if (mustValidateTerms && !agreedTerms) {
      agreedTermsError = true;
    }
    return this.setState({agreedTermsError});
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.usernameError !== null || this.state.agreedTermsError;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Get the privacy link.
   * @returns {string|boolean} false if no privacy link
   */
  get privacyLink() {
    if (this.props.context.siteSettings) {
      return this.props.context.siteSettings.privacyLink;
    }
    return false;
  }

  /**
   * Get the terms link
   * @returns {string|boolean} false if no terms
   */
  get termsLink() {
    if (this.props.context.siteSettings) {
      return this.props.context.siteSettings.termsLink;
    }
    return false;
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
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="enter-username">
        <h1><Trans>Please enter your email to continue.</Trans></h1>
        <form acceptCharset="utf-8" onSubmit={this.handleFormSubmit} noValidate>
          <div className={`input text required ${this.state.usernameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
            <label htmlFor="username"><Trans>Email</Trans></label>
            <input id="username-input" type="text" ref={this.usernameRef} name="username" value={this.state.username}
              onKeyUp={this.handleUsernameInputOnKeyUp} onChange={this.handleInputChange} placeholder={this.translate("you@organization.com")}
              required="required" disabled={this.hasAllInputDisabled()}/>
            {this.state.usernameError &&
            <div className="error-message">{this.state.usernameError}</div>
            }
          </div>
          {(this.privacyLink || this.termsLink) &&
          <div className={`input checkbox ${this.state.agreedTermsError ? 'error' : ''}`}>
            <input type="checkbox" name="agreedTerms" value={this.state.agreedTerms} onChange={this.handleInputChange}
              id="checkbox-terms" disabled={this.hasAllInputDisabled()}/>
            <label htmlFor="checkbox-terms">
              {(this.privacyLink || this.termsLink) &&
              <span>
                {this.termsLink && !this.privacyLink &&
                <Trans>I accept the <a href={this.termsLink} target="_blank" rel="noopener noreferrer">terms</a></Trans>
                }
                {!this.termsLink && this.privacyLink &&
                <Trans>I accept the <a href={this.privacyLink} target="_blank" rel="noopener noreferrer">privacy policy</a></Trans>
                }
                {this.termsLink && this.privacyLink &&
                <Trans>I accept the <a href={this.termsLink} target="_blank" rel="noopener noreferrer">terms</a> and the <a href={this.privacyLink} target="_blank" rel="noopener noreferrer">privacy policy</a></Trans>
                }
              </span>
              }
            </label>
          </div>
          }
          <div className="form-actions">
            <FormSubmitButton
              disabled={this.hasAllInputDisabled()} big={true} processing={this.state.processing} fullWidth={true}
              value={this.translate("Next")}
            />
            {this.props.isSsoRecoverEnabled &&
              <button className="link" type="button" onClick={this.props.onSecondaryActionClick}>
                <Trans>Continue with SSO.</Trans>
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}

EnterUsernameForm.defaultProps = {
  isSsoRecoverEnabled: false
};

EnterUsernameForm.propTypes = {
  apiTriageContext: PropTypes.object, // The api triage context
  context: PropTypes.any, // The application context provider
  isSsoRecoverEnabled: PropTypes.bool.isRequired, // Is the Sso recover plugin enabled
  onSecondaryActionClick: PropTypes.func, // The callback for the secondary action if any
  t: PropTypes.func, // The translation function
};

export default withAppContext(withApiTriageContext(withTranslation('common')(EnterUsernameForm)));
