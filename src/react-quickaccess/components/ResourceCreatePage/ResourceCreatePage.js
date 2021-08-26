import React from "react";
import {Link} from "react-router-dom";
import SimpleBar from "../SimpleBar/SimpleBar";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../contexts/AppContext";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {SecretGeneratorComplexity} from "../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import {withPasswordGeneratorContext} from "../../contexts/PasswordGeneratorContext";

class ResourceCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
    this.createInputRef();
  }

  componentDidMount() {
    this.loadPasswordMetaFromTabInfo();
    this.handleLastGeneratedPassword()
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
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
      viewPassword: false,
      strengthClass: "not_available",
      strengthLabel: "n/a",
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
  get currentGeneratorConfiguration() {
    const type = this.props.passwordGeneratorContext.settings.default_generator;
    return this.props.passwordGeneratorContext.settings.generators.find(generator => generator.type === type);
  }

  /**
   * Whenever a new password has been generated through the generator
   */
  handleLastGeneratedPassword() {
    const currentLastGeneratedPassword = this.props.passwordGeneratorContext.lastGeneratedPassword;
    if (currentLastGeneratedPassword?.length > 0) {
      this.loadPassword(currentLastGeneratedPassword)
      // clear the generated password
      this.props.passwordGeneratorContext.onLastGeneratedPasswordCleared();
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
    if(password?.length > 0) {
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
        name = tabInfo["name"].substring(0, 64);
      }
      if (!ignoreUris.includes(tabInfo["uri"])) {
        uri = tabInfo["uri"];
      }
      if (tabInfo.username?.length > 0) {
        username = tabInfo.username;
      }
      if (tabInfo.secret_clear?.length > 0) {
        password = tabInfo.secret_clear;
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
        } else if(password === "") {
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
    if(error.name === "UserAbortsOperationError") {
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

  handleViewPasswordButtonClick() {
    if (this.state.processing) {
      return;
    }

    this.setState({ viewPassword: !this.state.viewPassword });
  }

  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }

    const password = SecretGenerator.generate(this.currentGeneratorConfiguration);
    this.loadPassword(password);
  }

  /**
   * Whenever the user wants to go to the password generator
   */
  handleOpenGenerator() {
    if (this.state.processing) {
      return;
    }
    this.props.history.push('/data/quickaccess/resources/generate-password');
  }

  loadPassword(password) {
    const passwordEntropy = SecretGenerator.entropy(password);
    const passwordStrength = SecretGeneratorComplexity.strength(passwordEntropy);
    const strengthClass = passwordStrength.id;
    const strengthLabel = passwordStrength.label;
    this.setState({password, strengthClass, strengthLabel});
  }

  render() {
    return (
      <div className="resource-create">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Cancel the operation")}>
            <span className="icon fa">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" /></svg>
            </span>
            <span className="primary-action-title"><Trans>Create password</Trans></span>
          </a>
          <Link to="/data/quickaccess.html" className="secondary-action button-icon button" title={this.translate("Cancel")}>
            <span className="fa icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg>
            </span>
            <span className="visually-hidden"><Trans>cancel</Trans></span>
          </Link>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <SimpleBar className="resource-create-form">
            <div className="form-container">
              <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
                <label htmlFor="name"><Trans>Name</Trans></label>
                <input name="name" value={this.state.name} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.nameInputRef} className="required fluid" maxLength="64" type="text" id="name" required="required" autoComplete="off" />
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
                  ref={this.usernameInputRef} className="fluid" maxLength="64" type="text" id="username" autoComplete="off" />
                {this.state.usernameError &&
                <div className="error-message">{this.state.usernameError}</div>
                }
              </div>
              <div className="input text password required">
                <label htmlFor="password"><Trans>Password</Trans></label>
                <input name="password" maxLength="4096" value={this.state.password} onChange={this.handlePasswordChange} disabled={this.state.processing}
                  ref={this.passwordInputRef} type={this.state.viewPassword ? "text" : "password"} className="required" placeholder={this.translate('Password')} autoComplete="new-password" id="password" required="required" />
                <a onClick={this.handleViewPasswordButtonClick} className={`password-view button button-icon button-toggle ${this.state.viewPassword ? "selected" : ""}`}>
                  <span className="fa icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z" /></svg>
                  </span>
                  <span className="visually-hidden"><Trans>view</Trans></span>
                </a>
                <ul className="actions inline">
                  <li>
                    <a onClick={this.handleOpenGenerator} className="password-generate button-icon button">
                      <span className="fa icon">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path xmlns="http://www.w3.org/2000/svg" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
                         </svg>
                      </span>
                      <span className="visually-hidden"><Trans>password generator</Trans></span>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleGeneratePasswordButtonClick} className="password-generate button-icon button">
                      <span className="fa icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z" /></svg>
                      </span>
                      <span className="visually-hidden"><Trans>generate</Trans></span>
                    </a>
                  </li>
                </ul>
                <span className="password-strength">
                  <span className="password-strength-bar"><span className={`password-strength-bar-value ${this.state.strengthClass}`}/></span>
                  <span className="password-strength-label"><Trans>Strength:</Trans></span>
                  <span className="password-strength-value">${this.state.strengthLabel}</span>
                </span>
              </div>
            </div>
          </SimpleBar>
          <div className="submit-wrapper input">
            <input type="submit" className={`button primary big full-width ${this.state.processing ? "processing" : ""}`} role="button"
              value={this.translate("save")} disabled={this.state.processing} />
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
  passwordGeneratorContext: PropTypes.any, // The password generator context
  history: PropTypes.object,
  location: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withPasswordGeneratorContext(withTranslation('common')(ResourceCreatePage))));
