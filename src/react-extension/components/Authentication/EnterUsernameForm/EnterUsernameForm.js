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
 */
import React, {Component} from "react";
import XRegExp from "xregexp";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import {ApiClient} from "../../../lib/apiClient/apiClient";
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";
import SiteSettings from "../../../lib/Settings/SiteSettings";

const REDIRECT_CHECK_MAILBOX_URL = "/auth/login/check-mailbox";
const REDIRECT_REGISTRATION = "/setup/name";
const REDIRECT_ERROR = "/auth/login/error";

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

      siteSettings: false,
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
  async componentDidMount() {
    const siteSettings = await this.getSiteSettings();
    this.setState({loading: false, siteSettings}, () => {
      this.usernameRef.current.focus();
    });
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
   * Retrieve the site settings
   * @returns {Promise<SiteSettings>}
   */
  async getSiteSettings() {
    const apiClientOptions = new ApiClientOptions()
      .setBaseUrl(window.location.origin)
      .setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.findAll();
    return new SiteSettings(body);
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
    this.setState({[name]: value});
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
      try {
        await this.sendUsername();
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
  async sendUsername() {
    const recoverDto = {
      username: this.state.username
    };
    const apiOptions = new ApiClientOptions()
      .setBaseUrl(window.location.origin)
      .setResourceName("users/recover");
    const apiClient = new ApiClient(apiOptions);
    await apiClient.create(recoverDto);
  }

  /**
   * Handle operation success.
   */
  async handleSuccess() {
    this.props.history.push(REDIRECT_CHECK_MAILBOX_URL);
  }

  /**
   * Handle save operation success.
   */
  async handleError(error) {
    const userNotFound = error.data && error.data.code === 404;
    if (userNotFound) {
      const isRegistrationPublic = await this.isRegistrationPublic();
      if (isRegistrationPublic) {
        this.props.history.push(REDIRECT_REGISTRATION);
      } else {
        this.props.history.push(REDIRECT_ERROR);
      }
    } else {
      console.log(error);
      await this.props.actionFeedbackContext.displayError("There was an unexpected error, please retry later...");
      await this.toggleProcessing();
    }
  }

  /**
   * Check if the registration is public.
   * @returns {Promise<boolean>}
   */
  async isRegistrationPublic() {
    return this.state.siteSettings.registrationPublic;
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
      usernameError = "A username is required.";
    } else if (!this.isEmail(username)) {
      usernameError = "The username should be a valid username address.";
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
   * Validate the agreed terms checkbox.
   * @returns {Promise<void>}
   */
  async validateAgreedTerms() {
    let agreedTermsError = null;
    const mustValidateTerms = this.privacyLink || this.termsLink;
    const agreedTerms = this.state.agreedTerms;
    if (mustValidateTerms && !agreedTerms) {
      agreedTermsError = "You have to accept it.";
    }
    return this.setState({agreedTermsError});
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.usernameError !== null || this.state.agreedTermsError !== null;
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
    if (this.state.siteSettings) {
      return this.state.siteSettings.privacyLink;
    }
    return false;
  }

  /**
   * Get the terms link
   * @returns {string|boolean} false if no terms
   */
  get termsLink() {
    if (this.state.siteSettings) {
      return this.state.siteSettings.termsLink;
    }
    return false;
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="enter-username">
        <h1>Please enter your email to continue.</h1>
        <form acceptCharset="utf-8" onSubmit={this.handleFormSubmit} noValidate>
          <div className={`input text required ${this.state.usernameError ? "error" : ""}`}>
            <label htmlFor="username">Email (username)</label>
            <input id="username-input" type="text" ref={this.usernameRef} name="username" value={this.state.username}
              onKeyUp={this.handleUsernameInputOnKeyUp} onChange={this.handleInputChange} placeholder="you@organization.com"
              required="required" disabled={this.hasAllInputDisabled()}/>
            {this.state.usernameError &&
            <div className="error-message">{this.state.usernameError}</div>
            }
          </div>
          {(this.privacyLink || this.termsLink) &&
          <div className="input checkbox">
            <input type="checkbox" name="agreedTerms" value={this.state.agreedTerms} onChange={this.handleInputChange}
              id="checkbox-terms" disabled={this.hasAllInputDisabled()}/>
            <label htmlFor="checkbox-terms">
              {(this.privacyLink || this.termsLink) &&
              <span>
                I accept the&nbsp;
                {this.termsLink && <a href={this.termsLink} target="_blank" rel="noopener noreferrer">terms</a>}
                {(this.termsLink && this.privacyLink) && <span> and </span>}
                {this.privacyLink &&
                <a href={this.privacyLink} target="_blank" rel="noopener noreferrer">privacy policy</a>}.
              </span>
              }
            </label>
            {this.state.agreedTermsError && !this.state.agreedTerms &&
            <div className="error-message">{this.state.agreedTermsError}</div>
            }
          </div>
          }
          <div className="form-actions">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} big={true} processing={this.state.processing} value="Next"/>
          </div>
        </form>
      </div>
    );
  }
}

EnterUsernameForm.propTypes = {
  history: PropTypes.object,
  actionFeedbackContext: PropTypes.object,
};

export default withRouter(withActionFeedback(EnterUsernameForm));
