import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import Tabs from "../../../react-extension/components/Common/Tab/Tabs";
import Tab from "../../../react-extension/components/Common/Tab/Tab";
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {SecretGeneratorComplexity} from "../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Transition from "react-transition-group/cjs/Transition";
import Icon from "../../../react-extension/components/Common/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";

class GeneratePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  get defaultState() {
    return {
      password: "", // The password
      isObfuscated: true, // True if the passphrase should not be visible
      generator: {}, // The current password generator
      copySecretState: "default",
      processing: false
    };
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    const type = this.props.prepareResourceContext.settings.default_generator;
    const initialGenerator = this.generators.find(generator => generator.type === type);
    await this.handleGeneratorChanged(initialGenerator);
  }

  /**
   * Initialize the event handlers
   */
  initEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewPasswordToggle = this.handleViewPasswordToggle.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleGeneratorChanged = this.handleGeneratorChanged.bind(this);
    this.handleCopyPassword = this.handleCopyPassword.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  /**
   * Returns the possible generators
   */
  get generators() {
    return  this.props.prepareResourceContext.settings.generators;
  }

  /**
   * Handle when the generator configuration has changed
   * @param generatorConfiguration The generator configuration
   * @returns {Promise<void>}
   */
  async handleGeneratorChanged(generatorConfiguration) {
    await this.setState({generator: generatorConfiguration});
    this.generatePassword();
  }

  /**
   * Handle when one wants to generate password
   */
  handleGeneratePasswordButtonClick() {
    this.generatePassword();
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle view password button click.
   */
  handleViewPasswordToggle() {
    if (this.state.processing) {
      return;
    }
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  /**
   * Handle the submission of the generated password.
   * @params {ReactEvent} The react event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({processing: true});
    await this.props.prepareResourceContext.onPasswordGenerated(this.state.password, this.state.generator);
    this.props.history.goBack();
  }

  /**
   * Whenever one wants to copy the password
   */
  async handleCopyPassword() {
    this.setState({copySecretState: 'processing'});
    await navigator.clipboard.writeText(this.state.password);
    this.setState({copySecretState: 'done'});
    setTimeout(() => {
      this.setState({copySecretState: 'default'});
    }, 3000);
  }

  /**
   * Generate the password
   */
  generatePassword() {
    const password = SecretGenerator.generate(this.state.generator);
    this.setState({password});
  }

  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.history.goBack();
  }

  get translate() {
    return this.props.t;
  }

  isPasswordEmpty() {
    return this.state.password === "";
  }

  hasGeneratorName() {
    return this.state.generator.name;
  }

  render() {
    const passwordEntropy = SecretGenerator.entropy(this.state.password);
    return (
      <>
        {!this.state.loading &&
        <div className="generate-password">
          <div className="back-link">
            <a href="#" className="primary-action" onClick={this.handleGoBackClick}
              title={this.translate("Cancel the operation")}>
              <span className="icon fa">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
                </svg>
              </span>
              <span className="primary-action-title"><Trans>Generate password</Trans></span>
            </a>
            <Link to="/data/quickaccess.html" className="secondary-action button-icon button"
              title={this.translate("Cancel")}>
              <span className="fa icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                </svg>
              </span>
              <span className="visually-hidden"><Trans>cancel</Trans></span>
            </Link>
          </div>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-container">
              <div className="input-password-wrapper input">
                <label htmlFor="generate-resource-password-form-password"><Trans>Password</Trans></label>
                <div className="password-button-inline">
                  <Password
                    id="generate-resource-password-form-password"
                    name="password"
                    autoComplete="off"
                    readOnly={true}
                    placeholder={this.translate("Password")}
                    preview={true}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    disabled={this.state.processing}/>
                  <a onClick={this.handleGeneratePasswordButtonClick} className="password-generate button">
                    <span className="fa icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z" /></svg>
                    </span>
                    <span className="visually-hidden"><Trans>generate</Trans></span>
                  </a>
                  <a onClick={this.handleCopyPassword} className="copy-to-clipboard button">
                    <span className="fa icon">
                      <Transition in={this.state.copySecretState === "default"} appear={false} timeout={500}>
                        {status => (
                          <svg className={`transition fade-${status} ${this.state.copySecretState !== "default" ? "visually-hidden" : ""}`} xmlns="http://www.w3.org/2000/svg" width="1792" height="1792" viewBox="0 0 1792 1792"><path d="M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z"/></svg>
                        )}
                      </Transition>
                      <Transition in={this.state.copySecretState === "processing"} appear={true} timeout={500}>
                        {status => (
                          <svg className={`fade-${status} ${this.state.copySecretState !== "processing" ? "visually-hidden" : ""}`} width="22px" height="22px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none" ><g id="loading_white" transform="translate(2, 2)" strokeWidth="4"><circle id="Oval" stroke="#CCC" cx="9" cy="9" r="9" /></g><g id="loading_white" transform="translate(2, 2)" strokeWidth="2"><path d="M18,9 C18,4.03 13.97,0 9,0" id="Shape" stroke="#000"><animateTransform attributeName="transform" type="rotate" from="0 9 9" to="360 9 9" dur="0.35s" repeatCount="indefinite" /></path></g></g></svg>
                        )}
                      </Transition>
                      <Transition in={this.state.copySecretState === "done"} appear={true} timeout={500}>
                        {status => (
                          <svg className={`fade-${status} ${this.state.copySecretState !== "done" ? "visually-hidden" : ""}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>
                        )}
                      </Transition>
                    </span>
                    <span className="visually-hidden"><Trans>copy</Trans></span>
                  </a>
                </div>
                <PasswordComplexity entropy={passwordEntropy}/>
              </div>
              {this.hasGeneratorName() &&
              <Tabs activeTabName={this.state.generator.name}>
                {this.generators.map(generator =>
                  <Tab
                    key={generator.name}
                    name={generator.name}
                    type={generator.type}
                    onClick={() => this.handleGeneratorChanged(generator)}>
                    {generator.type === "password" &&
                    <ConfigurePasswordGenerator
                      configuration={this.state.generator}
                      onChanged={this.handleGeneratorChanged}/>
                    }
                    {generator.type === "passphrase" &&
                    <ConfigurePassphraseGenerator
                      configuration={this.state.generator}
                      onChanged={this.handleGeneratorChanged}/>
                    }
                  </Tab>
                )}
              </Tabs>
              }
            </div>
            <div className="submit-wrapper input">
              <button
                type="submit"
                className={`button primary big full-width ${this.state.processing ? 'processing' : ''}`}
                role="button"
                disabled={this.state.processing || this.isPasswordEmpty()}>
                <Trans>Apply</Trans>
                {this.state.processing &&
                  <Icon name="spinner"/>
                }
              </button>
            </div>
          </form>
        </div>
        }
      </>
    );
  }
}

GeneratePasswordPage.propTypes = {
  prepareResourceContext: PropTypes.any, // The password generator context
  history: PropTypes.any, // The history router
  t: PropTypes.func, // The translation function
};

export default withRouter(withPrepareResourceContext(withTranslation('common')(GeneratePasswordPage)));