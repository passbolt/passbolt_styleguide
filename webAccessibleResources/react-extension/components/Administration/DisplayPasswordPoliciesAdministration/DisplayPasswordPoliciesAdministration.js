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
 * @since         4.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withAdministrationWorkspace } from "../../../contexts/AdministrationWorkspaceContext";
import DisplayAdministrationPasswordPoliciesActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationPasswordPoliciesActions/DisplayAdministrationPasswordPoliciesActions";
import { withAdminPasswordPolicies } from "../../../contexts/Administration/AdministrationPasswordPoliciesContext/AdministrationPasswordPoliciesContext";
import Select from "../../Common/Select/Select";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import { createSafePortal } from "../../../../shared/utils/portals";
import BuoySVG from "../../../../img/svg/buoy.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class DisplayPasswordPoliciesAdministration extends React.Component {
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
    await this.props.adminPasswordPoliciesContext.findSettings();
  }

  /**
   * On the component will unmount.
   */
  componentWillUnmount() {
    this.props.adminPasswordPoliciesContext.clearContext();
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
    this.handleLengthChange = this.handleLengthChange.bind(this);
  }

  /**
   * Handle change visibility of password configuration block
   */
  handlePasswordSectionToggle() {
    this.setState({ showPasswordSection: !this.state.showPasswordSection });
  }

  /**
   * Handle change visibility of passphrase configuration block
   */
  handlePassphraseSectionToggle() {
    this.setState({ showPassphraseSection: !this.state.showPassphraseSection });
  }

  /**
   * Get word case list
   * @returns {Array<{label: string, value: string}>}
   */
  get wordCaseList() {
    return [
      { value: "lowercase", label: this.props.t("Lower case") },
      { value: "uppercase", label: this.props.t("Upper case") },
      { value: "camelcase", label: this.props.t("Camel case") },
    ];
  }

  /**
   * Get word case list
   * @returns {Array<{label: string, value: string}>}
   */
  get providerList() {
    return [
      { value: "password", label: this.props.t("Password") },
      { value: "passphrase", label: this.props.t("Passphrase") },
    ];
  }

  /**
   * Handle external services checkbox input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleCheckboxInputChange(event) {
    const name = event.target.name;
    this.props.adminPasswordPoliciesContext.setSettings(name, event.target.checked);
  }

  /**
   * Handle external services checkbox input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleSliderInputChange(event) {
    const value = parseInt(event.target.value, 10);
    const name = event.target.name;
    this.props.adminPasswordPoliciesContext.setSettings(name, value);
  }

  /**
   * Handle change of generic form input.
   * @param {object} event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.props.adminPasswordPoliciesContext.setSettings(name, value);
  }

  /**
   * Handle change of generic form input.
   * @param {object} event
   */
  handleLengthChange(event) {
    const target = event.target;
    const value = parseInt(target.value, 10);
    const name = target.name;
    this.props.adminPasswordPoliciesContext.setSettings(name, value);
  }

  /**
   * Handle toggle of a password mask.
   * @param {string} name name of the mask
   */
  handleMaskToggled(name) {
    const value = !this.props.adminPasswordPoliciesContext.getSettings()[name];
    this.props.adminPasswordPoliciesContext.setSettings(name, value);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminPasswordPoliciesContext.isProcessing();
  }

  /**
   * Returns the source of the current settings
   * @returns {string}
   */
  get settingsSource() {
    return this.props.adminPasswordPoliciesContext?.getSettings()?.source;
  }

  /**
   * Returns the source of the current configuration
   * @returns {string}
   */
  get configurationSource() {
    return (
      {
        legacyEnv: this.props.t("environment variables (legacy)"),
        env: this.props.t("environment variables"),
        legacyFile: this.props.t("file (legacy)"),
        file: this.props.t("file"),
        db: this.props.t("database"),
        default: this.props.t("default configuration"),
      }[this.settingsSource] || this.props.t("unknown")
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const adminContext = this.props.adminPasswordPoliciesContext;
    const settings = adminContext.getSettings();
    const errors = adminContext.getSettingsErrors();
    const minimalAdvisedEntropy = adminContext.getMinimalAdvisedEntropy();
    const passwordEntropy = adminContext.getEntropyForPasswordConfiguration();
    const passphraseEntropy = adminContext.getEntropyForPassphraseConfiguration();
    const masks = adminContext.getPasswordGeneratorMasks();
    const isPasswordEntropyTooLow = passwordEntropy < minimalAdvisedEntropy;
    const isPassphraseEntropyTooLow = passphraseEntropy < minimalAdvisedEntropy;

    const hasWarnings =
      adminContext.isSourceChanging() ||
      adminContext.hasSettingsChanges() ||
      isPasswordEntropyTooLow ||
      isPassphraseEntropyTooLow;

    return (
      <div className="row">
        <div className="password-policies-settings main-column">
          <div className="main-content">
            <h3 className="title" id="password-policies-settings-title">
              <Trans>Password Policy</Trans>
            </h3>
            <form className="form">
              <h4>
                <Trans>Password generator default settings</Trans>
              </h4>
              <p>
                <Trans>You can modify the default settings of the passwords generator.</Trans>
              </p>
              <p>
                <Trans>
                  Note that this will not prevent a user from customizing the settings while generating a password.
                </Trans>
              </p>
              <label>
                <Trans>Default password type</Trans>
              </label>
              <div className="singleline">
                <span>
                  <Trans>The default type is</Trans>&nbsp;
                </span>
                <Select
                  id="configure-passphrase-default-generator"
                  name="provider"
                  className="inline"
                  items={this.providerList}
                  value={settings.provider}
                  onChange={this.handleInputChange}
                  disabled={this.hasAllInputDisabled()}
                />
              </div>
              <div className="accordion-header">
                <button
                  id="accordion-toggle-password"
                  className="link no-border"
                  type="button"
                  onClick={this.handlePasswordSectionToggle}
                >
                  {this.state.showPasswordSection ? (
                    <CaretDownSVG className="caret-down" />
                  ) : (
                    <CaretRightSVG className="caret-right" />
                  )}
                  <Trans>Passwords settings</Trans>
                </button>
              </div>
              {this.state.showPasswordSection && (
                <div className="passwords-settings">
                  <div className="estimated-entropy input">
                    <label>
                      <Trans>Estimated entropy</Trans>
                    </label>
                    <PasswordComplexity entropy={passwordEntropy} />
                    {errors.passwordMinimalRequiredEntropy && (
                      <div className="error-message">{errors.passwordMinimalRequiredEntropy}</div>
                    )}
                  </div>
                  <div className={`input text ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
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
                        disabled={this.hasAllInputDisabled()}
                      />
                      <input
                        id="configure-password-generator-form-length"
                        type="number"
                        name="passwordLength"
                        min="8"
                        max="128"
                        value={settings.passwordLength}
                        onChange={this.handleLengthChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                    </div>
                    {errors.passwordLength && (
                      <div id="passwordLength-error" className="error-message">
                        {errors.passwordLength}
                      </div>
                    )}
                  </div>
                  <p>
                    <Trans>
                      You can set the default length for the passwords that are generated randomly by passbolt in the
                      password generator.
                    </Trans>
                  </p>
                  <div className={`input text ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="configure-password-generator-form-masks">
                      <Trans>Selected set of characters</Trans>
                    </label>
                    <div className="button-group button-group--nowrap">
                      {Object.entries(masks).map(([maskName, mask]) => (
                        <button
                          type="button"
                          key={maskName}
                          className={`button button-toggle ${settings[maskName] ? "selected" : ""}`}
                          onClick={() => this.handleMaskToggled(maskName)}
                          disabled={this.hasAllInputDisabled()}
                        >
                          {mask.label}
                        </button>
                      ))}
                    </div>
                    {errors.masks && (
                      <div id="password-mask-error" className="error-message">
                        {errors.masks}
                      </div>
                    )}

                    <div className="input checkbox">
                      <input
                        id="configure-password-generator-form-exclude-look-alike"
                        type="checkbox"
                        name="excludeLookAlikeCharacters"
                        checked={settings.excludeLookAlikeCharacters}
                        onChange={this.handleCheckboxInputChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                      <label htmlFor="configure-password-generator-form-exclude-look-alike">
                        <Trans>Exclude look-alike characters</Trans>
                      </label>
                    </div>
                    <p>
                      <Trans>
                        You can select the set of characters used for the passwords that are generated randomly by
                        passbolt in the password generator.
                      </Trans>
                    </p>
                  </div>
                </div>
              )}
              <div className="accordion-header">
                <button
                  id="accordion-toggle-passphrase"
                  className="link no-border"
                  type="button"
                  onClick={this.handlePassphraseSectionToggle}
                >
                  {this.state.showPassphraseSection ? (
                    <CaretDownSVG className="caret-down" />
                  ) : (
                    <CaretRightSVG className="caret-right" />
                  )}
                  <Trans>Passphrase settings</Trans>
                </button>
              </div>
              {this.state.showPassphraseSection && (
                <div className="passphrase-settings">
                  <div className="estimated-entropy input">
                    <label>
                      <Trans>Estimated entropy</Trans>
                    </label>
                    <PasswordComplexity entropy={passphraseEntropy} />
                    {errors.passphraseMinimalRequiredEntropy && (
                      <div className="error-message">{errors.passphraseMinimalRequiredEntropy}</div>
                    )}
                  </div>
                  <div className={`input text ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="configure-passphrase-generator-form-word-count">
                      <Trans>Number of words</Trans>
                    </label>
                    <div className="slider">
                      <input
                        name="wordsCount"
                        min="4"
                        max="40"
                        value={settings.wordsCount}
                        type="range"
                        onChange={this.handleSliderInputChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                      <input
                        type="number"
                        id="configure-passphrase-generator-form-word-count"
                        name="wordsCount"
                        min="4"
                        max="40"
                        value={settings.wordsCount}
                        onChange={this.handleLengthChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                    </div>
                    {errors.wordsCount && (
                      <div id="wordsCount-error" className="error-message">
                        {errors.wordsCount}
                      </div>
                    )}
                  </div>
                  <p>
                    <Trans>
                      You can set the default length for the passphrases that are generated randomly by passbolt in the
                      password generator.
                    </Trans>
                  </p>
                  <div className={`input text ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="configure-passphrase-generator-form-words-separator">
                      <Trans>Words separator</Trans>
                    </label>
                    <input
                      type="text"
                      id="configure-passphrase-generator-form-words-separator"
                      name="wordsSeparator"
                      value={settings.wordsSeparator}
                      onChange={this.handleInputChange}
                      placeholder={this.props.t("Type one or more characters")}
                      disabled={this.hasAllInputDisabled()}
                    />
                    {errors.wordsSeparator && <div className="error-message">{errors.wordsSeparator}</div>}
                  </div>
                  <div className={`select-wrapper input ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="configure-passphrase-generator-form-words-case">
                      <Trans>Words case</Trans>
                    </label>
                    <Select
                      id="configure-passphrase-generator-form-words-case"
                      name="wordCase"
                      items={this.wordCaseList}
                      value={settings.wordCase}
                      onChange={this.handleInputChange}
                      disabled={this.hasAllInputDisabled()}
                    />
                  </div>
                </div>
              )}

              <h4 id="password-policies-external-services-subtitle">
                <span className="input toggle-switch form-element ready">
                  <input
                    id="passphrase-policy-external-services-toggle-button"
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="policyPassphraseExternalServices"
                    onChange={this.handleCheckboxInputChange}
                    checked={settings?.policyPassphraseExternalServices}
                    disabled={this.hasAllInputDisabled()}
                  />
                  <label htmlFor="passphrase-policy-external-services-toggle-button">
                    <Trans>External services</Trans>
                  </label>
                </span>
              </h4>
              <span className="input toggle-switch form-element">
                <Trans>Allow passbolt to access external services to check if a password has been compromised.</Trans>
              </span>
            </form>
          </div>
          {hasWarnings && (
            <div className="warning message">
              {adminContext.isSourceChanging() && (
                <div id="password-policies-setting-source-changing-banner">
                  <p>
                    <Trans>
                      The current configuration comes from a file or environment variables. If you save them, they will
                      be overwritten and come from the database instead.
                    </Trans>
                  </p>
                </div>
              )}
              {adminContext.hasSettingsChanges() && (
                <div id="password-policies-setting-banner">
                  <p>
                    <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                  </p>
                </div>
              )}
              {isPasswordEntropyTooLow && (
                <div id="minimal-password-entropy-advised-banner">
                  <p>
                    <Trans>The current password configuration generates passwords that are not strong enough.</Trans>
                    <br />
                    <Trans>Passbolt recommends a minimum of {{ minimalAdvisedEntropy }} bits to be safe.</Trans>
                  </p>
                </div>
              )}
              {isPassphraseEntropyTooLow && (
                <div id="minimal-passphrase-entropy-advised-banner">
                  <p>
                    <Trans>
                      The current passphrase configuration generates passphrases that are not strong enough.
                    </Trans>
                    <br />
                    <Trans>Passbolt recommends a minimum of {{ minimalAdvisedEntropy }} bits to be safe.</Trans>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <DisplayAdministrationPasswordPoliciesActions />
        {createSafePortal(
          <>
            <div className="sidebar-help-section" id="password-policies-source">
              <h3>
                <Trans>Configuration source</Trans>
              </h3>
              <p>
                <Trans>This current configuration source is: </Trans>
                {this.configurationSource}.
              </p>
            </div>
            <div className="sidebar-help-section">
              <h3>
                <Trans>What is password policy?</Trans>
              </h3>
              <p>
                <Trans>
                  For more information about the password policy settings, checkout the dedicated page on the help
                  website.
                </Trans>
              </p>
              <a
                className="button"
                href="https://passbolt.com/docs/admin/password-configuration/password-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BuoySVG />
                <span>
                  <Trans>Read the documentation</Trans>
                </span>
              </a>
            </div>
          </>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

DisplayPasswordPoliciesAdministration.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminPasswordPoliciesContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withAdministrationWorkspace(
    withAdminPasswordPolicies(withTranslation("common")(DisplayPasswordPoliciesAdministration)),
  ),
);
