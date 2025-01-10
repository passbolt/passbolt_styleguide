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
 * @since         3.3.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import ConfigurePassphraseGenerator from "../../../../shared/components/GeneratePassword/ConfigurePassphraseGenerator";
import ConfigurePasswordGenerator from "../../../../shared/components/GeneratePassword/ConfigurePasswordGenerator";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';

/**
 * This component generate password or passphrase following configuration
 */
class GenerateResourcePassword extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  get defaultState() {
    return {
      password: "", // The password
      generatorSettings: null,
      isObfuscated: true, // True if the passphrase should not be visible
      loading: true,
      processing: false,
    };
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    const generatorSettings = this.props.resourcePasswordGeneratorContext.getSettings();
    const password = this.generatePassword(generatorSettings);
    this.setState({
      loading: false,
      generatorSettings,
      password
    });
  }

  /**
   * Initialize the event handlers
   */
  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewPasswordToggle = this.handleViewPasswordToggle.bind(this);
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
    this.handlePassphraseGeneratorConfigurationChanged = this.handlePassphraseGeneratorConfigurationChanged.bind(this);
    this.handlePasswordGeneratorConfigurationChanged = this.handlePasswordGeneratorConfigurationChanged.bind(this);
    this.handleGeneratorConfigurationChanged = this.handleGeneratorConfigurationChanged.bind(this);
    this.handleCopyPassword = this.handleCopyPassword.bind(this);
    this.handleGeneratorTypeChanged = this.handleGeneratorTypeChanged.bind(this);
  }

  /**
   * Handle when the generator configuration has changed
   * @param {Object} generatorSettings The generator configuration
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
   * Handle when the secret generator type is changed.
   * @param {string} generatorType
   */
  handleGeneratorTypeChanged(generatorType) {
    const generatorSettings = JSON.parse(JSON.stringify(this.state.generatorSettings));
    generatorSettings.default_generator = generatorType;
    this.handleGeneratorConfigurationChanged(generatorSettings);
  }

  /**
   * Handle when one wants to generate password
   */
  handleGeneratePassword() {
    const password = this.generatePassword(this.state.generatorSettings);
    this.setState({password});
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
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
    this.props.resourcePasswordGeneratorContext.onPasswordGenerated(this.state.password, this.state.generatorSettings);
    this.props.onClose();
  }

  /**
   * Whenever one wants to copy the password
   */
  async handleCopyPassword() {
    await ClipBoard.copy(this.state.password, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been copied to clipboard"));
  }

  /**
   * Generate the password
   * @param {object} generatorConfiguration the configuration to be sued to generate a new password
   */
  generatePassword(generatorConfiguration) {
    const password = SecretGenerator.generate(generatorConfiguration);
    const passwordEntropy = password.length > 0 ? SecretGenerator.entropy(password) : null;
    this.setState({passwordEntropy});
    return password;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  isPasswordEmpty() {
    return this.state.password === "";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const generatorConfiguration = this.state.generatorSettings;
    return (
      <>
        {!this.state.loading &&
        <DialogWrapper
          title={this.translate("Password Generator")}
          className="generate-resource-password-dialog"
          disabled={this.state.processing}
          onClose={this.handleClose}>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-content">
              <div className={`input-password-wrapper input ${this.state.processing ? 'disabled' : ''}`}>
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
                    disabled={this.state.processing}/>
                  <button type="button" onClick={this.handleGeneratePassword}
                    className={`password-generate button-icon ${this.state.processing ? 'disabled' : ''}`}>
                    <Icon name='dice' big={true}/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </button>
                  <button type="button" onClick={this.handleCopyPassword}
                    className={`copy-to-clipboard button-icon ${this.state.processing ? 'disabled' : ''}`}>
                    <Icon name='copy-to-clipboard' big={true}/>
                    <span className="visually-hidden"><Trans>View</Trans></span>
                  </button>
                </div>
                <PasswordComplexity entropy={this.state.passwordEntropy}/>
              </div>
              {generatorConfiguration?.default_generator &&
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
            <div className="submit-wrapper clearfix">
              <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
              <FormSubmitButton value={this.translate("Apply")} disabled={this.state.processing || this.isPasswordEmpty()} processing={this.state.processing}/>
            </div>
          </form>
        </DialogWrapper>
        }
      </>
    );
  }
}

GenerateResourcePassword.propTypes = {
  context: PropTypes.any, // The application context
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func, // Whenever the component must be closed
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withResourcePasswordGeneratorContext(withTranslation('common')(GenerateResourcePassword))));
