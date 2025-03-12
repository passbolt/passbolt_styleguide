/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Password from "../../../../shared/components/Password/Password";
import DiceSVG from "../../../../img/svg/dice.svg";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import ConfigurePasswordGenerator from "../../../../shared/components/GeneratePassword/ConfigurePasswordGenerator";
import ConfigurePassphraseGenerator from "../../../../shared/components/GeneratePassword/ConfigurePassphraseGenerator";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

class AddResourcePassword extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      passwordEntropy: null,
      displayPasswordGenerator: false,
      generatorSettings: null,
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setState({
      generatorSettings: this.props.resourcePasswordGeneratorContext.getSettings()
    });
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleDisplayPasswordGeneratorClick = this.handleDisplayPasswordGeneratorClick.bind(this);
    this.handlePassphraseGeneratorConfigurationChanged = this.handlePassphraseGeneratorConfigurationChanged.bind(this);
    this.handleGeneratorTypeChanged = this.handleGeneratorTypeChanged.bind(this);
    this.handlePasswordGeneratorConfigurationChanged = this.handlePasswordGeneratorConfigurationChanged.bind(this);
    this.handleGeneratePasswordClick = this.handleGeneratePasswordClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle when the generator configuration has changed
   * @param {Object} generatorSettings The generator configuration
   */
  handleGeneratorConfigurationChanged(generatorSettings) {
    const generatedPassword = this.generatePassword(generatorSettings);
    this.setState({generatorSettings});
    this.handleInputChange({
      target: {
        name: "secret.password",
        value: generatedPassword
      }
    });
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
   * Handles the click on the display secrets button.
   */
  handleDisplayPasswordGeneratorClick() {
    this.setState({displayPasswordGenerator: !this.state.displayPasswordGenerator});
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
   * Handle when the passphrase generator configuration has changed
   * @param generator The generator configuration
   */
  handlePassphraseGeneratorConfigurationChanged(generator) {
    const settings = JSON.parse(JSON.stringify(this.state.generatorSettings));
    settings.passphrase_generator_settings = generator;
    this.handleGeneratorConfigurationChanged(settings);
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
   * Handle when the generate password has been clicked
   */
  handleGeneratePasswordClick() {
    const generatedPassword = this.generatePassword(this.state.generatorSettings);
    this.handleInputChange({
      target: {
        name: "secret.password",
        value: generatedPassword
      }
    });
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse("passwordGenerator");
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  /**
   * Checks if there is a max length warning for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length warnings.
   * @param {string} association - The association name.
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName, association) {
    return !this.isMaxLengthError(propName, association) && this.props.warnings?.hasError(propName, "maxLength");
  }

  /**
   * Checks if there is a max length error for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length errors.
   * @param {string} association - The association name.
   * @returns {boolean} - Returns true if there is a max length error for the property, false otherwise.
   */
  isMaxLengthError(propName, association) {
    if (propName.includes('.')) {
      const segments = propName.split('.');
      const propArrayName = segments[0];
      const propsArrayIndex = segments[1];
      return this.props.errors?.details?.[association]?.details?.[propArrayName]?.[propsArrayIndex]?.maxLength;
    } else {
      return this.props.errors?.details?.[association]?.hasError(propName, "maxLength");
    }
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <>
        <div className="title">
          <h2><Trans>Password</Trans></h2>
        </div>
        <div className="content">
          <div className="password-fields">
            <div className="input text">
              <label htmlFor="resource-uri"><Trans>URI</Trans></label>
              <input id="resource-uri" name="metadata.uris.0" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")} value={this.props.resource?.metadata?.uris?.[0]} onChange={this.handleInputChange}/>
              {this.isMaxLengthError("uris.0", "metadata") &&
                <div className="uri error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("uris.0", "metadata") &&
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
            </div>
            <div className="input text">
              <label htmlFor="resource-username"><Trans>Username</Trans></label>
              <input id="resource-username" name="metadata.username" type="text" className="fluid" maxLength="255" autoComplete="off" placeholder={this.translate("Username")} value={this.props.resource?.metadata?.username} onChange={this.handleInputChange}/>
              {this.isMaxLengthError("username", "metadata") &&
                <div className="username error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("username",  "metadata") &&
                <div className="username warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
            </div>
            <div className="input-password-wrapper input">
              <label htmlFor="resource-password">
                <Trans>Password</Trans>
              </label>
              <div className="password-button-inline">
                <Password id="resource-password" name="secret.password" autoComplete="new-password" placeholder={this.translate("Password")} preview={true} value={this.props.resource?.secret?.password} onChange={this.handleInputChange} />
                <button type="button" className="password-generate button-icon" onClick={this.handleGeneratePasswordClick}>
                  <DiceSVG/>
                </button>
              </div>
              {this.isMaxLengthError("password", "secret") &&
                <div className="password error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("password", "secret") &&
                <div className="password warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
              <PasswordComplexity entropy={this.state.passwordEntropy}/>
            </div>
          </div>
          {this.canUsePasswordGenerator &&
            <div className="additional-information">
              <button type="button" className="section-header no-border" onClick={this.handleDisplayPasswordGeneratorClick}>
                <h4><Trans>Advanced password generation</Trans></h4>
                {this.state.displayPasswordGenerator
                  ? <CaretDownSVG/>
                  : <CaretRightSVG/>
                }
              </button>
              {this.state.displayPasswordGenerator && this.state.generatorSettings?.default_generator &&
                <Tabs activeTabName={this.state.generatorSettings.default_generator}>
                  <Tab
                    key={"password"}
                    name={this.props.t("password")}
                    type={"password"}
                    onClick={() => this.handleGeneratorTypeChanged("password")}>
                    {this.state.generatorSettings.default_generator === "password" &&
                      <ConfigurePasswordGenerator
                        configuration={this.state.generatorSettings.password_generator_settings}
                        onConfigurationChanged={this.handlePasswordGeneratorConfigurationChanged}/>
                    }
                  </Tab>
                  <Tab
                    key={"passphrase"}
                    name={this.props.t("passphrase")}
                    type={"passphrase"}
                    onClick={() => this.handleGeneratorTypeChanged("passphrase")}>
                    {this.state.generatorSettings.default_generator === "passphrase" &&
                      <ConfigurePassphraseGenerator
                        configuration={this.state.generatorSettings.passphrase_generator_settings}
                        onConfigurationChanged={this.handlePassphraseGeneratorConfigurationChanged}/>
                    }
                  </Tab>
                </Tabs>
              }
            </div>
          }
        </div>

      </>
    );
  }
}

AddResourcePassword.propTypes = {
  context: PropTypes.any, // The app context
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, // The on change function
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object // The errors entity error validation
};

export default  withAppContext(withResourcePasswordGeneratorContext(withTranslation('common')(AddResourcePassword)));

