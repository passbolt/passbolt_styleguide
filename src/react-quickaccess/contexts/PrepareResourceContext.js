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

import * as React from "react";
import PropTypes from "prop-types";
import { withPasswordPolicies } from "../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { withActiveSessionLocalStorage } from "../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../shared/models/entity/session/userActiveSessionEntity";

const USER_GENERATOR_SETTINGS_STORAGE_KEY_PREFIX = "passlyQuickAccessPasswordGeneratorSettings";
const GENERATOR_TYPES = ["password", "passphrase"];
const PASSWORD_GENERATOR_MASKS = [
  "mask_upper",
  "mask_lower",
  "mask_digit",
  "mask_parenthesis",
  "mask_emoji",
  "mask_char1",
  "mask_char2",
  "mask_char3",
  "mask_char4",
  "mask_char5",
];
const PASSWORD_GENERATOR_BOOLEAN_FIELDS = [...PASSWORD_GENERATOR_MASKS, "exclude_look_alike_chars"];
const PASSPHRASE_WORD_CASES = ["lowercase", "uppercase", "camelcase"];

function cloneGeneratorSettings(settings) {
  return settings ? JSON.parse(JSON.stringify(settings)) : settings;
}

function toInteger(value, fallback) {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function clampInteger(value, min, max, fallback) {
  return Math.min(Math.max(toInteger(value, fallback), min), max);
}

function getUserGeneratorSettingsStorageKey(context) {
  const userId = context.userSettings?.id || context.account?.id || "default";
  return `${USER_GENERATOR_SETTINGS_STORAGE_KEY_PREFIX}-${userId}`;
}

function mergeSavedPasswordGeneratorSettings(settings, savedSettings) {
  if (!settings || !savedSettings || typeof savedSettings !== "object") {
    return;
  }

  PASSWORD_GENERATOR_BOOLEAN_FIELDS.forEach((field) => {
    if (typeof savedSettings[field] === "boolean") {
      settings[field] = savedSettings[field];
    }
  });

  const minLength = toInteger(settings.min_length, 8);
  const maxLength = toInteger(settings.max_length, 128);
  settings.length = clampInteger(savedSettings.length, minLength, maxLength, settings.length);

  if (!PASSWORD_GENERATOR_MASKS.some((mask) => settings[mask])) {
    settings.mask_lower = true;
  }
}

function mergeSavedPassphraseGeneratorSettings(settings, savedSettings) {
  if (!settings || !savedSettings || typeof savedSettings !== "object") {
    return;
  }

  const minWords = toInteger(settings.min_words, 4);
  const maxWords = toInteger(settings.max_words, 40);
  settings.words = clampInteger(savedSettings.words, minWords, maxWords, settings.words);

  if (typeof savedSettings.word_separator === "string") {
    settings.word_separator = savedSettings.word_separator.substring(0, 10);
  }

  if (PASSPHRASE_WORD_CASES.includes(savedSettings.word_case)) {
    settings.word_case = savedSettings.word_case;
  }
}

function applySavedGeneratorSettings(passwordPolicies, savedSettings) {
  const settings = cloneGeneratorSettings(passwordPolicies);
  if (!settings || !savedSettings || typeof savedSettings !== "object") {
    return settings;
  }

  if (GENERATOR_TYPES.includes(savedSettings.default_generator)) {
    settings.default_generator = savedSettings.default_generator;
  }

  mergeSavedPasswordGeneratorSettings(settings.password_generator_settings, savedSettings.password_generator_settings);
  mergeSavedPassphraseGeneratorSettings(
    settings.passphrase_generator_settings,
    savedSettings.passphrase_generator_settings,
  );

  return settings;
}

/**
 * Context related to prepare a resource ( name, url, username, password.)
 */
export const PrepareResourceContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  resourcePrepared: null, // The resource prepared
  onPrepareResource: () => {}, // Whenever a resource has been prepared
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  onGeneratorSettingsChanged: () => {}, // Whenever generator settings have been changed
  getSettings: () => {}, // Whenever the settings must be get
  consumePreparedResource: () => {}, // Whenever the prepared resource must be get
  resetSecretGeneratorSettings: () => {}, // reset the secret generator settings with the organisation's default
});

/**
 * The related context provider
 */
class PrepareResourceContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settings: null, // The current settings of generators
      lastGeneratedPassword: null, // The last password generated
      resourcePrepared: null, // The resource prepared
      getSettings: this.getSettings.bind(this), // returns the current generator settings
      onPrepareResource: this.onPrepareResource.bind(this), // Whenever a resource has been prepared
      onPasswordGenerated: this.onPasswordGenerated.bind(this), // Whenever the a password has been generated with the generator
      onGeneratorSettingsChanged: this.onGeneratorSettingsChanged.bind(this), // Whenever generator settings have been changed
      consumePreparedResource: this.consumePreparedResource.bind(this), // Whenever the prepared resource must be get
      resetSecretGeneratorSettings: this.resetSecretGeneratorSettings.bind(this), // reset the secret generator settings with the organisation's default
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.resetSecretGeneratorSettings();
  }

  /**
   * Initialize the secret generator settings.
   * @return {Promise<void>}
   */
  async resetSecretGeneratorSettings() {
    const activeSession = this.props.activeSession || this.props.activeSessionLocalStorageContext?.get();
    if (activeSession && !activeSession.isSessionOnline) {
      return;
    }
    const passwordPolicies = await this.props.passwordPoliciesContext.loadPolicies();
    const savedSettings = await this.getSavedSecretGeneratorSettings();
    const settings = applySavedGeneratorSettings(passwordPolicies, savedSettings);
    this.setState({ settings });
  }

  /**
   * Returns the user saved generator settings.
   * @returns {Promise<object|null>}
   */
  async getSavedSecretGeneratorSettings() {
    const storage = this.props.context.storage?.local;
    if (!storage) {
      return null;
    }

    try {
      const storageKey = getUserGeneratorSettingsStorageKey(this.props.context);
      const storageData = await storage.get([storageKey]);
      return storageData[storageKey] || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Saves the user generator settings locally.
   * @param {object} generatorSettings The current generator settings.
   * @returns {Promise<void>}
   */
  async saveSecretGeneratorSettings(generatorSettings) {
    const storage = this.props.context.storage?.local;
    if (!storage || !generatorSettings) {
      return;
    }

    try {
      const storageKey = getUserGeneratorSettingsStorageKey(this.props.context);
      await storage.set({ [storageKey]: cloneGeneratorSettings(generatorSettings) });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Whenever generator settings have been changed.
   * @param {object} newGeneratorSettings The updated generator settings.
   */
  onGeneratorSettingsChanged(newGeneratorSettings) {
    this.setState({ settings: newGeneratorSettings });
    this.saveSecretGeneratorSettings(newGeneratorSettings);
  }

  /**
   * Whenever a password has been generated with the generator
   * @param password The generated password
   */
  onPasswordGenerated(newPassword, newGeneratorSettings) {
    this.setState({
      lastGeneratedPassword: newPassword,
      settings: newGeneratorSettings,
    });
    this.saveSecretGeneratorSettings(newGeneratorSettings);
  }

  /**
   * Whenever a resource has been prepared by the user
   * @param resource The prepared resource
   */
  onPrepareResource(resource) {
    this.setState({ resourcePrepared: resource });
  }

  /**
   * Get the settings of the password generator
   * @returns {Object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Consume the prepared resource
   * @returns {Object|null}
   */
  consumePreparedResource() {
    const resourcePrepared = this.state.resourcePrepared;
    this.setState({ resourcePrepared: null });
    return resourcePrepared;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <PrepareResourceContext.Provider value={this.state}>{this.props.children}</PrepareResourceContext.Provider>;
  }
}

PrepareResourceContextProvider.displayName = "PrepareResourceContextProvider";
PrepareResourceContextProvider.propTypes = {
  context: PropTypes.object,
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity),
  passwordPoliciesContext: PropTypes.object, // The password settings context
  children: PropTypes.any,
};

export default withActiveSessionLocalStorage(withAppContext(withPasswordPolicies(PrepareResourceContextProvider)));

/**
 * Generate Password Context Consumer HOC
 * @param WrappedComponent
 */
export function withPrepareResourceContext(WrappedComponent) {
  return class WithPrepareResource extends React.Component {
    render() {
      return (
        <PrepareResourceContext.Consumer>
          {(PrepareResourceContext) => (
            <WrappedComponent prepareResourceContext={PrepareResourceContext} {...this.props} />
          )}
        </PrepareResourceContext.Consumer>
      );
    }
  };
}
