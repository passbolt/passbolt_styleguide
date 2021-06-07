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
import Icon from "../../Common/Icons/Icon";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";
import {withAppContext} from "../../../contexts/AppContext";
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import SecretComplexity from "../../../../shared/lib/Secret/SecretComplexity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";

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
      isObfuscated: true, // True if the paasphrase should not be visible
      generator: null, // The current password generator
      loading: true,
      processing: false
    };
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    const type = this.props.resourcePasswordGeneratorContext.settings.default_generator;
    const initialGenerator = this.generators.find(generator => generator.type === type);

    await this.handleGeneratorChanged(initialGenerator);
    this.setState({loading: false});
  }

  /**
   * Initialize the event handlers
   */
  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewPasswordToggle = this.handleViewPasswordToggle.bind(this);
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
    this.handleGeneratorChanged = this.handleGeneratorChanged.bind(this);
    this.handleCopyPassword = this.handleCopyPassword.bind(this);
  }

  /**
   * Returns the possible generators
   */
  get generators() {
    return  this.props.resourcePasswordGeneratorContext.settings.generators;
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
  handleGeneratePassword() {
    this.generatePassword();
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
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
    await this.props.resourcePasswordGeneratorContext.onPasswordGenerated(this.state.password, this.state.generator);
    this.props.onClose();
  }

  /**
   * Whenever one wants to copy the password
   */
  async handleCopyPassword() {
    await this.props.context.port.request("passbolt.clipboard.copy", this.state.password);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been copied to clipboard"));
  }

  /**
   * Generate the password
   */
  generatePassword() {
    const password = SecretGenerator.generate(this.state.generator);
    this.setState({password});
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
    const passwordStrength = SecretComplexity.getStrength(this.state.password);
    const passwordEntropy = SecretComplexity.entropy(this.state.password);
    return (
      <>
        {!this.state.loading &&
        <DialogWrapper
          title="Password Generator"
          className="generate-resource-password-dialog"
          disabled={this.state.processing}
          onClose={this.handleClose}>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-content">
              <div className="input-password-wrapper input">
                <label htmlFor="generate-resource-password-form-password"><Trans>Password</Trans></label>
                <div className="input text password">
                  <input
                    id="generate-resource-password-form-password"
                    name="password"
                    className="required"
                    placeholder={this.translate("Password")}
                    type={this.state.isObfuscated ? "password" : "text"}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    disabled={this.state.processing}/>
                  <a
                    onClick={this.handleViewPasswordToggle}
                    className={`password-view button button-icon toggle ${this.state.isObfuscated ? "" : "selected"}`}>
                    <Icon name='eye-open' big={true}/>
                    <span className="visually-hidden">view</span>
                  </a>
                </div>
                <ul className="actions inline">
                  <li>
                    <a onClick={this.handleGeneratePassword} className="password-generate button-icon button">
                      <Icon name='magic-wand' big={true}/>
                      <span className="visually-hidden">generate</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={this.handleCopyPassword}
                      className={`copy-to-clipboard button button-icon`}>
                      <Icon name='copy-to-clipboard' big={true}/>
                      <span className="visually-hidden">view</span>
                    </a>
                  </li>
                </ul>
                <div className={`password-complexity ${passwordStrength.id}`}>
                  <span className="progress">
                    <span className={`progress-bar ${passwordStrength.id}`} />
                  </span>
                  <span className="complexity-text">
                    <div>
                      <Trans>Complexity:</Trans> <strong>{this.translate(passwordStrength.label)}</strong>
                    </div>
                    <div>
                      <Trans>Entropy:</Trans> <strong>{passwordEntropy.toFixed(1)} bits</strong>
                    </div>

                  </span>
                </div>
              </div>

              <br/>

              <Tabs activeTabName={this.state.generator.name}>
                {this.generators.map(generator =>
                  <Tab
                    key={generator.type}
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
            </div>
            <div className="submit-wrapper clearfix">
              <FormSubmitButton value={this.translate("Apply")} disabled={this.state.processing || this.isPasswordEmpty()} processing={this.state.processing}/>
              <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
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
