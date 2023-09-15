import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import debounce from 'debounce-promise';
import PownedService from "../../../shared/services/api/secrets/pownedService";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withPasswordPolicies} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";

class ResourceCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
    this.createInputRef();
    this.isPwndProcessingPromise = null;
    this.evaluatePasswordIsInDictionaryDebounce = debounce(this.evaluatePasswordIsInDictionaryDebounce, 300);
  }

  /**
   * Get the default state
   * @returns {void}
   */
  getDefaultState() {
    return {
      loaded: false,
      error: "",
      name: "",
      nameError: "",
      username: "",
      usernameError: "",
      uri: "",
      uriError: "",
      password: "",
      passwordError: "",
      passwordEntropy: null,
      isPwnedServiceAvailable: true,
      passwordInDictionary: false
    };
  }

  /**
   * initialize event handlers
   * @returns {void}
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  /**
   * when the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    this.initPwnedPasswordService();
    this.handleLastGeneratedPassword();
    await this.handlePreparedResource();
  }

  /**
   * Initialize the pwned password service
   */
  initPwnedPasswordService() {
    const isPwnedServiceAvailable = this.props.passwordPoliciesContext.shouldRunDictionaryCheck();

    if (isPwnedServiceAvailable) {
      this.pownedService = new PownedService(this.props.context.port);
    }

    this.setState({isPwnedServiceAvailable});
  }

  createInputRef() {
    this.nameInputRef = React.createRef();
    this.uriInputRef = React.createRef();
    this.usernameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  /*
   * =============================================================
   *  Resource password generator
   * =============================================================
   */

  /**
   * Whenever a new password has been generated through the generator
   */
  handleLastGeneratedPassword() {
    const currentLastGeneratedPassword = this.props.prepareResourceContext.consumeLastGeneratedPassword();
    if (currentLastGeneratedPassword?.length > 0) {
      this.loadPassword(currentLastGeneratedPassword);
    }
  }

  /**
   * Whenever a resource has been prepared
   */
  async handlePreparedResource() {
    const resource = this.props.prepareResourceContext.consumePreparedResource();
    const lastGeneratedPassword = this.props.prepareResourceContext.lastGeneratedPassword;
    if (resource) {
      this.setState({name: resource.name, uri: resource.uri, username: resource.username});
      this.loadPassword(lastGeneratedPassword ?? resource.password);
    } else {
      await this.loadPasswordMetaFromTabInfo();
    }
  }

  /*
   * =============================================================
   *  Autofill fields from tab
   * =============================================================
   */
  async loadPasswordMetaFromTabInfo() {
    const {name, uri, username, password} = await this.getPasswordMetaFromTabInfo();
    this.setState({name, uri, username});
    if (password?.length > 0) {
      this.loadPassword(password);
    }

    await this.focusFirstEmptyField(name, uri, username, password);
    this.setState({loaded: true});
  }

  /**
   * Retrieve the password meta information of the current tab
   * @returns {Promise<{name: string, uri: string, username: string, password: string}>}
   */
  async getPasswordMetaFromTabInfo() {
    let name = "";
    let uri = "";
    let username = "";
    let password = "";
    const ignoreNames = ["newtab"];
    const ignoreUris = ["chrome://newtab/", "about:newtab"];

    try {
      const tabInfo = await this.props.context.port.request("passbolt.quickaccess.prepare-resource", this.props.context.getOpenerTabId());
      if (!ignoreNames.includes(tabInfo["name"])) {
        name = tabInfo["name"].substring(0, 255);
      }
      if (!ignoreUris.includes(tabInfo["uri"])) {
        uri = tabInfo["uri"];
      }
      if (tabInfo.username?.length > 0) {
        username = tabInfo.username;
      } else {
        username = this.props.context.userSettings.username;
      }
      if (tabInfo.secret_clear?.length > 0) {
        password = tabInfo.secret_clear;
      } else {
        password = this.generateSecret();
      }
    } catch (error) {
      console.error(error);
    }
    return {name, uri, username, password};
  }

  /**
   * Focuses on the first empty field in the form
   * @param {string} name
   * @param {string} uri
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  focusFirstEmptyField(name, uri, username, password) {
    return new Promise(resolve => {
      /*
       * Wait 210ms, the time for the animation to be completed.
       * If we don't wait the animation to be completed, then the focus will screw the animation. Some browsers need
       * elements to be visible to give them focus, therefore the browser makes it visible while the animation is
       * running, making the element blinking.
       */
      setTimeout(() => {
        if (name === "") {
          this.nameInputRef.current.focus();
        } else if (uri === "") {
          this.uriInputRef.current.focus();
        } else if (username === "") {
          this.usernameInputRef.current.focus();
        } else if (password === "") {
          this.passwordInputRef.current.focus();
        }
        resolve();
      }, 210);
    });
  }

  /**
   * Handles click on the `go back` button
   * @param {React.Event} ev
   */
  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.prepareResourceContext.resetSecretGeneratorSettings();
    this.props.history.goBack();
  }

  /**
   * Handles the click on the "x" button
   */
  handleCancelButtonClick() {
    this.props.prepareResourceContext.resetSecretGeneratorSettings();
  }

  /**
   * Validate the form data and returns true if it's valid
   * @returns {boolean}
   */
  validateFields() {
    const state = {
      nameError: "",
      passwordError: ""
    };
    let isValid = true;

    if (this.state.name === "") {
      state.nameError = this.translate("A name is required.");
      isValid = false;
    }

    if (this.state.password === "") {
      state.passwordError = this.translate("A password is required.");
      isValid = false;
    }

    this.setState(state);
    return isValid;
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    this.setState({
      processing: true,
      error: "",
      nameError: "",
      usernameError: "",
      uriError: "",
    });

    if (!this.validateFields()) {
      this.setState({processing: false});
      return;
    }

    const resourceDto = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri
    };
    const secretDto = this.state.password;

    try {
      const resource = await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
      /*
       * Remove the create step from the history.
       * The user needs to be redirected to the home page and not the create page while clicking on go back
       * password details page.
       */
      const goToComponentState = {
        goBackEntriesCount: -2
      };
      this.props.prepareResourceContext.resetSecretGeneratorSettings();
      this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`, goToComponentState);
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

  /**
   * Handles error during form submission
   * @param {Error} error
   */
  handleSubmitError(error) {
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else if (error.name === "PassboltApiFetchError"
      && error.data.code === 400 && error.data.body
      && (error.data.body.name || error.data.body.username || error.data.body.uri)) {
      // Could not validate resource data.
      this.setState({
        nameError: this.formatValidationFieldError(error.data.body.name),
        usernameError: this.formatValidationFieldError(error.data.body.username),
        uriError: this.formatValidationFieldError(error.data.body.uri),
        processing: false
      });
    } else {
      // An unexpected error occured.
      this.setState({
        error: error.message,
        processing: false
      });
    }
  }

  /**
   * Evaluate to check if password is in a dictionary.
   * @return {Promise}
   */
  async evaluatePasswordIsInDictionaryDebounce(password) {
    const passwordEntropy = password?.length > 0 ? SecretGenerator.entropy(password) : null;
    if (password && this.state.isPwnedServiceAvailable && this.pownedService) {
      const result = await this.pownedService.evaluateSecret(password);
      const passwordInDictionary = password.length > 0 ?  result.inDictionary : false;
      this.setState({isPwnedServiceAvailable: result.isPwnedServiceAvailable, passwordInDictionary});
    }
    this.setState({passwordEntropy});
  }

  /**
   * Format the error messages into a single message
   * @param {Object} fieldErrors
   * @param {React.Event} event
   */
  formatValidationFieldError(fieldErrors) {
    if (!fieldErrors) {
      return "";
    }
    return Object.values(fieldErrors).join(', ');
  }

  /**
   * Handles change on password input
   * @param {React.Event} event
   */
  handlePasswordChange(event) {
    const password = event.target.value;
    if (password.length) {
      this.isPwndProcessingPromise = this.evaluatePasswordIsInDictionaryDebounce(password);
    } else {
      this.setState({
        passwordInDictionary: false,
      });
    }
    this.loadPassword(password);
  }

  /**
   * Handles form input change
   * @param {React.Event} event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Handles click on "regenerate" a password
   */
  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    this.setState({passwordInDictionary: false});
    const password = this.generateSecret();
    this.loadPassword(password);
  }

  /**
   * Generates a new secret based on the current configuration
   * @returns {string}
   */
  generateSecret() {
    const configuration = this.props.prepareResourceContext.settings;
    return SecretGenerator.generate(configuration);
  }

  /**
   * Whenever the user wants to go to the password generator
   */
  handleOpenGenerator() {
    if (this.state.processing) {
      return;
    }

    const password = this.generateSecret();
    this.loadPassword(password);

    const resource = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
      password: this.state.password
    };
    this.props.prepareResourceContext.onPrepareResource(resource);
    this.props.history.push('/webAccessibleResources/quickaccess/resources/generate-password');
  }

  loadPassword(password) {
    const passwordEntropy = password ? SecretGenerator.entropy(password) : null;
    this.setState({passwordEntropy, password});
    this.isPwndProcessingPromise = this.evaluatePasswordIsInDictionaryDebounce(password);
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse('passwordGenerator');
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;

    return (
      <div className="resource-create">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Cancel the operation")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title"><Trans>Create password</Trans></span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" onClick={this.handleCancelButtonClick} className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <form onSubmit={this.handleFormSubmit}>

          <div className="resource-create-form">
            <div className="form-container">
              <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
                <label htmlFor="name"><Trans>Name</Trans></label>
                <input name="name" value={this.state.name} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.nameInputRef} className="required fluid" maxLength="255" type="text" id="name" autoComplete="off" />
                {this.state.nameError &&
                <div className="error-message">{this.state.nameError}</div>
                }
              </div>
              <div className={`input text ${this.state.uriError ? "error" : ""}`}>
                <label htmlFor="uri"><Trans>URL</Trans></label>
                <input name="uri" value={this.state.uri} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.uriInputRef} className="fluid" maxLength="1024" type="text" id="uri" autoComplete="off" />
                {this.state.uriError &&
                <div className="error-message">{this.state.uriError}</div>
                }
              </div>
              <div className="input text">
                <label htmlFor="username"><Trans>Username</Trans></label>
                <input name="username" value={this.state.username} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.usernameInputRef} className="fluid" maxLength="255" type="text" id="username" autoComplete="off" />
                {this.state.usernameError &&
                <div className="error-message">{this.state.usernameError}</div>
                }
              </div>
              <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""}`}>
                <label htmlFor="password"><Trans>Password</Trans>
                  {(this.state.passwordInDictionary || !this.state.isPwnedServiceAvailable)  && this.pownedService &&
                  <Icon name="exclamation"/>
                  }</label>
                <div className="password-button-inline">
                  <Password name="password" value={this.state.password} preview={true} onChange={this.handlePasswordChange} disabled={this.state.processing}
                    autoComplete="new-password" placeholder={this.translate('Password')} id="password" inputRef={this.passwordInputRef}/>
                  <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                    className={`password-generate button-icon button ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='dice'/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </button>
                  {this.canUsePasswordGenerator &&
                    <button type="button" onClick={this.handleOpenGenerator}
                      className="password-generator button-icon button">
                      <Icon name='settings'/>
                      <span className="visually-hidden"><Trans>Open generator</Trans></span>
                    </button>
                  }
                </div>
                <PasswordComplexity entropy={passwordEntropy} error={Boolean(this.state.passwordError)}/>
                {this.state.passwordError &&
                  <div className="error-message">{this.state.passwordError}</div>
                }

                {this.pownedService &&
                  <>
                    {!this.state.isPwnedServiceAvailable && this.pownedService !== null &&
                      <div className="pwned-password warning-message"><Trans>The pwnedpasswords service is unavailable, your password might be part of an exposed data breach</Trans></div>
                    }
                    {this.state.passwordInDictionary && this.pownedService !== null &&
                      <div className="pwned-password warning-message"><Trans>The password is part of an exposed data breach.</Trans></div>
                    }
                  </>
                }
              </div>
            </div>
          </div>
          <div className="submit-wrapper input">
            <button type="submit" className={`button primary big full-width ${this.state.processing ? "processing" : ""}`} role="button"
              disabled={this.state.processing}>
              <Trans>Save</Trans>
              {this.state.processing &&
                <Icon name="spinner"/>
              }
            </button>
            {this.state.error &&
            <div className="error-message">{this.state.error}</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

ResourceCreatePage.propTypes = {
  context: PropTypes.any, // The application context
  prepareResourceContext: PropTypes.any, // The password generator context
  history: PropTypes.object,
  location: PropTypes.any,
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
};

export default withAppContext(withRouter(withPrepareResourceContext(withPasswordPolicies(withTranslation('common')(ResourceCreatePage)))));
