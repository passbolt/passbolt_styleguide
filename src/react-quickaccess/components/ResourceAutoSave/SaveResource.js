import React from "react";
import SimpleBar from "../SimpleBar/SimpleBar";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../contexts/AppContext";
import SecretComplexity from "../../../shared/lib/Secret/SecretComplexity";

class ResourceCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
  }

  componentDidMount() {
    this.loadPasswordMetaFromTabForm();
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
  }

  getDefaultState() {
    return {
      loaded: false,
      error: "",
      name: "",
      nameError: "",
      username: "",
      usernameError: "",
      url: "",
      urlError: "",
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

  async loadPasswordMetaFromTabForm() {
    const {name, uri, username, secret_clear} = await this.props.context.port.request("passbolt.resource.prepare-autosave");
    this.setState({name, url: uri, username, password: secret_clear});
    this.loadPassword(secret_clear);
    this.setState({loaded: true});
  }

  handleClose() {
    window.close();
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      processing: true,
      error: "",
      nameError: "",
      usernameError: "",
      urlError: "",
    });

    const resourceDto = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.url
    };
    const secretDto = this.state.password;

    try {
      await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
      this.handleClose();
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

  handleSubmitError(error) {
    if (error.name === "PassboltApiFetchError"
      && error.data.code === 400 && error.data.body
      && (error.data.body.name || error.data.body.username || error.data.body.uri)) {
      // Could not validate resource data.
      this.setState({
        nameError: this.formatValidationFieldError(error.data.body.name),
        usernameError: this.formatValidationFieldError(error.data.body.username),
        urlError: this.formatValidationFieldError(error.data.body.uri),
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

  loadPassword(password) {
    const passwordStrength = SecretComplexity.getStrength(password);
    const strengthClass = passwordStrength.id;
    const strengthLabel = passwordStrength.label;
    this.setState({password, strengthClass, strengthLabel});
  }

  render() {
    return (
      <div className="resource-auto-save">
        <h1 className="title"><Trans>Would you like to save this credential ?</Trans></h1>
        <form onSubmit={this.handleFormSubmit}>
          <SimpleBar className="resource-auto-save-form">
            <div className="form-container">
              <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
                <label htmlFor="name"><Trans>Name</Trans></label>
                <input name="name" value={this.state.name} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="required fluid" maxLength="64" type="text" id="name" required="required" autoComplete="off" />
                <div className="error-message">{this.state.nameError}</div>
              </div>
              <div className={`input text ${this.state.urlError ? "error" : ""}`}>
                <label htmlFor="url"><Trans>URL</Trans></label>
                <input name="url" value={this.state.url} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="fluid" maxLength="1024" type="text" id="url" autoComplete="off" />
                <div className="error-message">{this.state.urlError}</div>
              </div>
              <div className="input text">
                <label htmlFor="username"><Trans>Username</Trans></label>
                <input name="username" value={this.state.username} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="fluid" maxLength="64" type="text" id="username" autoComplete="off" />
                <div className="error-message">{this.state.usernameError}</div>
              </div>
              <div className="input text password required">
                <label htmlFor="password"><Trans>Password</Trans></label>
                <input name="password" maxLength="4096" value={this.state.password} onChange={this.handlePasswordChange} disabled={this.state.processing}
                  type={this.state.viewPassword ? "text" : "password"} className="required" placeholder={this.translate('Password')} id="password" required="required" />
                <a onClick={this.handleViewPasswordButtonClick} className={`password-view button button-icon button-toggle ${this.state.viewPassword ? "selected" : ""}`}>
                  <span className="fa icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z" /></svg>
                  </span>
                  <span className="visually-hidden"><Trans>view</Trans></span>
                </a>
                <span className="password-strength">
                  <span className="password-strength-bar"><span className={`password-strength-bar-value ${this.state.strengthClass}`}/></span>
                  <span className="password-strength-label"><Trans>Strength:</Trans></span>
                  <span className="password-strength-value">${this.state.strengthLabel}</span>
                </span>
              </div>
            </div>
          </SimpleBar>
          <div className="submit-wrapper input flex-row-end">
            <a className="cancel" disabled={this.state.processing} role="button" onClick={this.handleClose}>{this.translate("no, thanks")}</a>
            <input type="submit" className={`button primary big ${this.state.processing ? "processing" : ""}`} role="button"
              value={this.translate("save")} disabled={this.state.processing} />
            <div className="error-message">{this.state.error}</div>
          </div>
        </form>
      </div>
    );
  }
}

ResourceCreatePage.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation('common')(ResourceCreatePage)));
