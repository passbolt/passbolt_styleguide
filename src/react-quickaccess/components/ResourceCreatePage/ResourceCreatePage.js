import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../contexts/AppContext";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";

class ResourceCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
    this.createInputRef();
  }

  async componentDidMount() {
    await this.handlePreparedResource();
    this.handleLastGeneratedPassword();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
  }

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
    };
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
  async getCurrentGeneratorConfiguration() {
    const type = (await this.props.prepareResourceContext.getSettings()).default_generator;
    return this.props.prepareResourceContext.settings.generators.find(generator => generator.type === type);
  }

  /**
   * Whenever a new password has been generated through the generator
   */
  handleLastGeneratedPassword() {
    const currentLastGeneratedPassword = this.props.prepareResourceContext.getLastGeneratedPassword();
    if (currentLastGeneratedPassword?.length > 0) {
      this.loadPassword(currentLastGeneratedPassword);
    }
  }

  /**
   * Whenever a resource has been prepared
   */
  async handlePreparedResource() {
    const resource = this.props.prepareResourceContext.getPreparedResource();
    if (resource) {
      this.setState({name: resource.name, uri: resource.uri, username: resource.username});
      this.loadPassword(resource.password);
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

  async getPasswordMetaFromTabInfo() {
    let name = "";
    let uri = "";
    let username = "";
    let password = "";
    const ignoreNames = ["newtab"];
    const ignoreUris = ["chrome://newtab/", "about:newtab"];


    try {
      const tabInfo = await this.props.context.port.request("passbolt.quickaccess.prepare-resource", this.props.context.tabId);
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
        password = SecretGenerator.generate(await this.getCurrentGeneratorConfiguration());
      }
    } catch (error) {
      console.error(error);
    }

    return {name, uri, username, password};
  }

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

  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.history.goBack();
  }

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
      this.props.history.push(`/data/quickaccess/resources/view/${resource.id}`, goToComponentState);
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

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

  formatValidationFieldError(fieldErrors) {
    if (!fieldErrors) {
      return "";
    }
    return Object.values(fieldErrors).join(', ');
  }

  handlePasswordChange(event) {
    this.loadPassword(event.target.value);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }

    const password = SecretGenerator.generate(await this.getCurrentGeneratorConfiguration());
    this.loadPassword(password);
  }

  /**
   * Whenever the user wants to go to the password generator
   */
  handleOpenGenerator() {
    if (this.state.processing) {
      return;
    }
    const resource = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
      password: this.state.password
    };
    this.props.prepareResourceContext.onPrepareResource(resource);
    this.props.history.push('/data/quickaccess/resources/generate-password');
  }

  loadPassword(password) {
    const passwordEntropy = password ? SecretGenerator.entropy(password) : null;
    this.setState({password, passwordEntropy});
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse('passwordGenerator');
  }

  render() {
    return (
      <div className="resource-create">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Cancel the operation")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title"><Trans>Create password</Trans></span>
          </a>
          <Link to="/data/quickaccess.html" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
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
                <label htmlFor="password"><Trans>Password</Trans></label>
                <div className="password-button-inline">
                  <Password name="password" value={this.state.password} preview={true} onChange={this.handlePasswordChange} disabled={this.state.processing}
                    autoComplete="new-password" placeholder={this.translate('Password')} id="password" inputRef={this.passwordInputRef}/>
                  <a onClick={this.handleGeneratePasswordButtonClick}
                    className={`password-generate button-icon button ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='dice'/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </a>
                  {this.canUsePasswordGenerator &&
                    <a onClick={this.handleOpenGenerator}
                      className="password-generator button-icon button">
                      <Icon name='settings'/>
                      <span className="visually-hidden"><Trans>Open generator</Trans></span>
                    </a>
                  }
                </div>
                <PasswordComplexity entropy={this.state.passwordEntropy} error={Boolean(this.state.passwordError)}/>
                {this.state.passwordError &&
                  <div className="error-message">{this.state.passwordError}</div>
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
};

export default withAppContext(withRouter(withPrepareResourceContext(withTranslation('common')(ResourceCreatePage))));
