import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import Tabs from "../../../react-extension/components/Common/Tab/Tabs";
import Tab from "../../../react-extension/components/Common/Tab/Tab";
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Transition from "react-transition-group/cjs/Transition";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import ClipBoard from '../../../shared/lib/Browser/clipBoard';

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
    await ClipBoard.copy(this.state.password, this.props.context.port);
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
    const passwordEntropy = this.state.password ? SecretGenerator.entropy(this.state.password) : null;
    return (
      <>
        {!this.state.loading &&
        <div className="generate-password">
          <div className="back-link">
            <a href="#" className="primary-action" onClick={this.handleGoBackClick}
              title={this.translate("Cancel the operation")}>
              <Icon name="chevron-left"/>
              <span className="primary-action-title"><Trans>Generate password</Trans></span>
            </a>
            <Link to="/webAccessibleResources/quickaccess.html" className="secondary-action button-transparent button"
              title={this.translate("Cancel")}>
              <Icon name="close"/>
              <span className="visually-hidden"><Trans>Cancel</Trans></span>
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
                  <a onClick={this.handleGeneratePasswordButtonClick} className="password-generate button button-icon">
                    <Icon name="dice"/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </a>
                  <a onClick={this.handleCopyPassword} className="copy-to-clipboard button button-icon">
                    <Transition in={this.state.copySecretState === "default"} appear={false} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copySecretState !== "default" ? "visually-hidden" : ""}`}>
                          <Icon name="copy-to-clipboard"/>
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copySecretState === "processing"} appear={true} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copySecretState !== "processing" ? "visually-hidden" : ""}`}>
                          <Icon name="spinner"/>
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copySecretState === "done"} appear={true} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copySecretState !== "done" ? "visually-hidden" : ""}`}>
                          <Icon name="check"/>
                        </span>
                      )}
                    </Transition>
                    <span className="visually-hidden"><Trans>Copy</Trans></span>
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
  context: PropTypes.any, // The application context
  prepareResourceContext: PropTypes.any, // The password generator context
  history: PropTypes.any, // The history router
  t: PropTypes.func, // The translation function
};

export default withRouter(withPrepareResourceContext(withTranslation('common')(GeneratePasswordPage)));
