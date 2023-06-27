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
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";
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
      isObfuscated: true, // True if the passphrase should not be visible
      generator: {}, // The current password generator
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
    await this.setState({processing: true});
    await this.props.resourcePasswordGeneratorContext.onPasswordGenerated(this.state.password, this.state.generator);
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
    const passwordEntropy = this.state.password ? SecretGenerator.entropy(this.state.password) : null;
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
                    onChange={this.handleInputChange}
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
                <PasswordComplexity entropy={passwordEntropy}/>
              </div>

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
                      onChanged={this.handleGeneratorChanged}
                      disabled={this.state.processing}/>
                    }
                    {generator.type === "passphrase" &&
                    <ConfigurePassphraseGenerator
                      configuration={this.state.generator}
                      onChanged={this.handleGeneratorChanged}
                      disabled={this.state.processing}/>
                    }
                  </Tab>
                )}
              </Tabs>
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
