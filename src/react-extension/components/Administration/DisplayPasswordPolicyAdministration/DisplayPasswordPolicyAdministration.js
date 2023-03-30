/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import DisplayAdministrationPasswordPolicyActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationPasswordPolicyActions/DisplayAdministrationPasswordPolicyActions";
import {withAdminPasswordPolicy} from "../../../contexts/Administration/AdministrationPasswordPolicyContext/AdministrationPasswordPolicyContext";
import Select from "../../Common/Select/Select";
import {MASKS, SecretGeneratorComplexity} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import PasswordMask from '../../../../shared/models/passwordPolicy/PasswordMask';
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";

class DisplayPasswordPolicyAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showPasswordSection: false,
      showPassphraseSection: false,
    };
    this.bindCallbacks();
  }

  /**
   * On the component did mount, set the workspace action component and get the account recovery policy
   *
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationPasswordPolicyActions);
    await this.props.adminPasswordPolicyContext.findSettings();
  }

  /**
   * On the component will unmount.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminPasswordPolicyContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
    this.handleMaskToggled = this.handleMaskToggled.bind(this);
    this.handlePasswordSectionToggle = this.handlePasswordSectionToggle.bind(this);
    this.handlePassphraseSectionToggle = this.handlePassphraseSectionToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSliderInputChange = this.handleSliderInputChange.bind(this);
  }

  /**
   * Handle change visibility of password configuration block
   */
  handlePasswordSectionToggle() {
    this.setState({showPasswordSection: !this.state.showPasswordSection});
  }

  /**
   * Handle change visibility of passphrase configuration block
   */
  handlePassphraseSectionToggle() {
    this.setState({showPassphraseSection: !this.state.showPassphraseSection});
  }

  /**
   * Get word case list
   * @returns {Array<{label: string, value: string}>}
   */
  get wordCaseList() {
    return [
      {value: "lowercase", label: this.props.t("Lower case")},
      {value: "uppercase", label: this.props.t("Upper case")},
      {value: "camelcase", label: this.props.t("Camel case")}
    ];
  }

  /**
   * Get word case list
   * @returns {Array<{label: string, value: string}>}
   */
  get providerList() {
    return [
      {value: "password", label: this.props.t("Password")},
      {value: "passphrase", label: this.props.t("Passphrase")},
    ];
  }

  /**
   * Handle external services checkbox input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleCheckboxInputChange(event) {
    const name = event.target.name;
    this.props.adminPasswordPolicyContext.setSettings(name, event.target.checked);
  }

  /**
   * Handle external services checkbox input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleSliderInputChange(event) {
    const value = parseInt(event.target.value, 10);
    const name = event.target.name;
    this.props.adminPasswordPolicyContext.setSettings(name, value);
  }

  /**
   * Handle change of generic form input.
   * @param {object} event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.props.adminPasswordPolicyContext.setSettings(name, value);
  }

  /**
   * Handle toggle of a password mask.
   * @param {string} name name of the mask
   */
  handleMaskToggled(name) {
    const value = !this.props.adminPasswordPolicyContext.getSettings()[name];
    this.props.adminPasswordPolicyContext.setSettings(name, value);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminPasswordPolicyContext.isProcessing();
  }

  /**
   * Returns the maximum entropy a secret can be with the current passphrase default configuration.
   * @returns {number}
   */
  getEntropyForPassphraseConfiguration() {
    const settings = this.props.adminPasswordPolicyContext.getSettings();
    return SecretGeneratorComplexity.entropyPassphrase(settings.passphraseWordsLength, settings.wordsSeparator);
  }

  /**
   * Returns the maximum entropy a secret can be with the current password default configuration.
   * @returns {number}
   */
  getEntropyForPasswordConfiguration() {
    const settings = this.props.adminPasswordPolicyContext.getSettings();
    const maskSize = this.passwordGeneratorMasks.reduce((maskSize, currentMask) => {
      if (currentMask.active) {
        maskSize += currentMask.characters.length;
      }
      return maskSize;
    }, 0);
    return SecretGeneratorComplexity.calculEntropy(settings.passwordLength, maskSize);
  }

  /**
   * Returns all the available password masks.
   * @returns {Array<Object>}
   */
  get passwordGeneratorMasks() {
    return MASKS.map(mask => new PasswordMask(mask, this.props.adminPasswordPolicyContext.getSettings()));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const settings = this.props.adminPasswordPolicyContext.getSettings();
    const errors = this.props.adminPasswordPolicyContext.getSettingsErrors();

    return (
      <div className="row">
        <div className="password-policy-settings col8 main-column">
          <h3 id="password-policy-settings-title"><Trans>Password Policy</Trans></h3>
          {this.props.adminPasswordPolicyContext.hasSettingsChanges() &&
            <div className="warning message" id="password-policy-setting-banner">
              <p>
                <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          <h4 className="title title--required"><Trans>Password generator default settings</Trans></h4>
          <p><Trans>You can modify the default settings of the passwords generator, note that this will not prevent a user from customizing the settings while generating a password.</Trans></p>

          <label>
            <Trans>Default password type</Trans>
          </label>
          <div className="singleline">
            <span><Trans>The default type is</Trans>&nbsp;</span>
            <Select id="configure-passphrase-default-generator" name="provider" className="inline" items={this.providerList} value={settings.provider} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
          </div>

          <div className="accordion-header">
            <button id="accordion-toggle-password" className="link no-border" type="button" onClick={this.handlePasswordSectionToggle}>
              <Icon name={this.state.showPasswordSection ? "caret-down" : "caret-right"}/><Trans>Passwords</Trans>
            </button>
          </div>
          { this.state.showPasswordSection && <div className="passwords-settings">
            <div className="estimated-entropy">
              <label><Trans>Estimated entropy</Trans></label>
              <PasswordComplexity entropy={this.getEntropyForPasswordConfiguration()}/>
            </div>
            <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="configure-password-generator-form-length">
                <Trans>Length</Trans>
              </label>
              <div className="slider">
                <input
                  name="passwordLength"
                  min="8"
                  max="128"
                  value={settings.passwordLength}
                  step="1"
                  type="range"
                  onChange={this.handleSliderInputChange}
                  disabled={this.hasAllInputDisabled()}/>
                <input
                  id="configure-password-generator-form-length"
                  type="number"
                  name="passwordLength"
                  min="8"
                  max="128"
                  value={settings.passwordLength}
                  onChange={this.handleInputChange}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
              {errors.passwordLength &&
                <div className="error-message">{errors.passwordLength}</div>
              }
            </div>

            <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="configure-password-generator-form-masks">
                <Trans>Selected set of characters</Trans>
              </label>
              <div className="button-group button-group--nowrap">
                {
                  this.passwordGeneratorMasks.map(mask => (
                    <button
                      key={mask.name}
                      className={`button button-toggle ${(mask.active || mask.required ? 'selected' : '')}`}
                      onClick={() => this.handleMaskToggled(mask.name)} disabled={this.hasAllInputDisabled()}>
                      {mask.label}
                    </button>
                  ))
                }
              </div>
              {errors.masks &&
                <div className="error-message">{errors.masks}</div>
              }

              <div className="input checkbox">
                <input
                  id="configure-password-generator-form-exclude-look-alike"
                  type="checkbox"
                  name="lookAlikeCharacters"
                  checked={settings.lookAlikeCharacters}
                  onChange={this.handleCheckboxInputChange}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="configure-password-generator-form-exclude-look-alike">
                  <Trans>Exclude look-alike characters</Trans>
                </label>
              </div>
              <p><Trans>You can select the set of characters used for the passwords that are generated randomly by passbolt in the password generator.</Trans></p>
            </div>
          </div>
          }
          <div className="accordion-header">
            <button id="accordion-toggle-passphrase" className="link no-border" type="button" onClick={this.handlePassphraseSectionToggle}>
              <Icon name={this.state.showPassphraseSection ? "caret-down" : "caret-right"}/><Trans>Passphrase</Trans>
            </button>
          </div>
          { this.state.showPassphraseSection && <div className="passphrase-settings">
            <div className="estimated-entropy">
              <label><Trans>Estimated entropy</Trans></label>
              <PasswordComplexity entropy={this.getEntropyForPassphraseConfiguration()}/>
            </div>
            <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="configure-passphrase-generator-form-word-count"><Trans>Number of words</Trans></label>
              <div className="slider">
                <input
                  name="passphraseWordsLength"
                  min="4"
                  max="40"
                  value={settings.passphraseWordsLength}
                  type="range"
                  onChange={this.handleSliderInputChange}
                  disabled={this.hasAllInputDisabled()}/>
                <input
                  type="number"
                  id="configure-passphrase-generator-form-word-count"
                  name="passphraseWordsLength"
                  min="4"
                  max="40"
                  value={settings.passphraseWordsLength}
                  onChange={this.handleInputChange}
                  disabled={this.hasAllInputDisabled()}/>
              </div>
              {errors.passphraseWordsLength &&
                <div className="error-message">{errors.passphraseWordsLength}</div>
              }
            </div>
            <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="configure-passphrase-generator-form-words-separator"><Trans>Words separator</Trans></label>
              <input type="text" id="configure-passphrase-generator-form-words-separator" name="wordsSeparator" value={settings.wordsSeparator} onChange={this.handleInputChange}
                placeholder={this.props.t("Type one or more characters")} disabled={this.hasAllInputDisabled()}/>
            </div>
            <div className={`select-wrapper input ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="configure-passphrase-generator-form-words-case"><Trans>Words case</Trans></label>
              <Select id="configure-passphrase-generator-form-words-case" name="wordCase" items={this.wordCaseList} value={settings.wordCase} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
            </div>
          </div>
          }

          <h4 id="password-policy-external-services-subtitle">
            <span className="input toggle-switch form-element ready">
              <input id="passphrase-policy-external-services-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="policyPassphraseExternalServices"
                onChange={this.handleCheckboxInputChange} checked={settings?.policyPassphraseExternalServices} disabled={this.hasAllInputDisabled()}/>
              <label htmlFor="passphrase-policy-external-services-toggle-button"><Trans>External services</Trans></label>
            </span>
          </h4>
          <span className="input toggle-switch form-element">
            <Trans>Allow passbolt to access external services to check if a password has been compromised.</Trans>
          </span>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>What is password policy?</Trans></h3>
            <p><Trans>For more information about the password policy settings, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/password-policy" target="_blank" rel="noopener noreferrer">
              <Icon name="life-ring"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayPasswordPolicyAdministration.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminPasswordPolicyContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdministrationWorkspace(withAdminPasswordPolicy(withTranslation('common')(DisplayPasswordPolicyAdministration))));
