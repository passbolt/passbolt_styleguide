/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import Tabs from "../../../react-extension/components/Common/Tab/Tabs";
import Tab from "../../../react-extension/components/Common/Tab/Tab";
import ConfigurePassphraseGenerator from "../../../shared/components/GeneratePassword/ConfigurePassphraseGenerator";
import ConfigurePasswordGenerator from "../../../shared/components/GeneratePassword/ConfigurePasswordGenerator";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Transition from "react-transition-group/cjs/Transition";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import ClipBoard from '../../../shared/lib/Browser/clipBoard';
import CloseSvg from "../../../img/svg/close.svg";
import DiceSVG from "../../../img/svg/dice.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import Icon from "../../../shared/components/Icons/Icon";

class GeneratePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  get defaultState() {
    return {
      password: "",
      generatorSettings: null,
      isObfuscated: true, // True if the passphrase should not be visible
      copySecretState: "default",
      processing: false,
      passwordEntropy: null,
    };
  }

  /**
   * Whenever the component has been mounted
   */
  componentDidMount() {
    const generatorSettings = this.props.prepareResourceContext.getSettings();
    const password = this.generatePassword(generatorSettings);
    this.setState({generatorSettings, password});
  }

  /**
   * Initialize the event handlers
   */
  initEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewPasswordToggle = this.handleViewPasswordToggle.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleGeneratorConfigurationChanged = this.handleGeneratorConfigurationChanged.bind(this);
    this.handlePasswordGeneratorConfigurationChanged = this.handlePasswordGeneratorConfigurationChanged.bind(this);
    this.handlePassphraseGeneratorConfigurationChanged = this.handlePassphraseGeneratorConfigurationChanged.bind(this);
    this.handleCopyPassword = this.handleCopyPassword.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  /**
   * Handle when the generator configuration has changed
   * @param generatorConfiguration The generator configuration
   */
  handleGeneratorConfigurationChanged(generatorSettings) {
    const password = this.generatePassword(generatorSettings);
    this.setState({generatorSettings, password});
  }

  /**
   * Handle when the password generator configuration has changed
   * @param generator The generator configuration
   */
  handlePasswordGeneratorConfigurationChanged(generator) {
    const settings = JSON.parse(JSON.stringify(this.state.generatorSettings));
    settings.password_generator_settings = generator;
    this.handleGeneratorConfigurationChanged(settings);
  }

  /**
   * Handle when the passphrase generator configuration has changed
   * @param generator The generator configuration
   */
  handlePassphraseGeneratorConfigurationChanged(generator) {
    const settings = JSON.parse(JSON.stringify(this.state.generatorSettings));
    settings.passphrase_generator_settings = generator;
    this.handleGeneratorConfigurationChanged(settings);
  }

  /**
   * Handle when the generator type has changed
   * @param generatorConfiguration The generator configuration
   */
  handleGeneratorTypeChanged(generatorType) {
    const generatorConfiguration = JSON.parse(JSON.stringify(this.state.generatorSettings));
    generatorConfiguration.default_generator = generatorType;
    this.handleGeneratorConfigurationChanged(generatorConfiguration);
  }

  /**
   * Handle when one wants to generate password
   */
  handleGeneratePasswordButtonClick() {
    const password = this.generatePassword(this.state.generatorSettings);
    this.setState({password});
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
  handleSubmit(event) {
    event.preventDefault();
    this.setState({processing: true});
    this.props.prepareResourceContext.onPasswordGenerated(this.state.password, this.state.generatorSettings);
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
   * @param {object} generatorConfiguration
   * @returns {string} the generated password
   */
  generatePassword(generatorConfiguration) {
    const password = SecretGenerator.generate(generatorConfiguration);
    const passwordEntropy = password?.length > 0 ? SecretGenerator.entropy(password) : null;
    this.setState({passwordEntropy});
    return password;
  }

  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.history.goBack();
  }

  isPasswordEmpty() {
    return this.state.password === "";
  }

  hasGeneratorConfiguration() {
    return Boolean(this.state.generatorSettings);
  }

  get translate() {
    return this.props.t;
  }

  render() {
    const generatorConfiguration = this.state.generatorSettings;
    return (
      <div className="generate-password">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick}
            title={this.translate("Cancel the operation")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title"><Trans>Generate password</Trans></span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button"
            title={this.translate("Cancel")}>
            <CloseSvg/>
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
                  <DiceSVG/>
                  <span className="visually-hidden"><Trans>Generate</Trans></span>
                </a>
                <a onClick={this.handleCopyPassword} className="copy-to-clipboard button button-icon">
                  <Transition in={this.state.copySecretState === "default"} appear={false} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copySecretState !== "default" ? "visually-hidden" : ""}`}>
                        <CopySVG/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copySecretState === "processing"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copySecretState !== "processing" ? "visually-hidden" : ""}`}>
                        <SpinnerSVG/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copySecretState === "done"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copySecretState !== "done" ? "visually-hidden" : ""}`}>
                        <HealthCheckSuccessSvg/>
                      </span>
                    )}
                  </Transition>
                  <span className="visually-hidden"><Trans>Copy</Trans></span>
                </a>
              </div>
              <PasswordComplexity entropy={this.state.passwordEntropy}/>
            </div>
            {this.hasGeneratorConfiguration() &&
            <Tabs activeTabName={generatorConfiguration.default_generator}>
              <Tab
                key={"password"}
                name={this.props.t("password")}
                type={"password"}
                onClick={() => this.handleGeneratorTypeChanged("password")}>
                {generatorConfiguration.default_generator === "password" &&
                <ConfigurePasswordGenerator
                  configuration={generatorConfiguration.password_generator_settings}
                  onConfigurationChanged={this.handlePasswordGeneratorConfigurationChanged}/>
                }
              </Tab>
              <Tab
                key={"passphrase"}
                name={this.props.t("passphrase")}
                type={"passphrase"}
                onClick={() => this.handleGeneratorTypeChanged("passphrase")}>
                {generatorConfiguration.default_generator === "passphrase" &&
                <ConfigurePassphraseGenerator
                  configuration={generatorConfiguration.passphrase_generator_settings}
                  onConfigurationChanged={this.handlePassphraseGeneratorConfigurationChanged}/>
                }
              </Tab>
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
                <SpinnerSVG/>
              }
            </button>
          </div>
        </form>
      </div>
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
