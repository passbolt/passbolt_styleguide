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
 * @since         3.0.0
 */
import getPropValue from "../../../react-extension/lib/Object/getPropValue";
import sanitizeUrl from "../../../react-extension/lib/Sanitize/sanitizeUrl";

export default class SiteSettings {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Check if the user can use a capability.
   * @param {string} name The capability name
   * @returns {boolean}
   */
  canIUse(name) {
    let result = false;
    const configPath = `passbolt.plugins.${name}`;
    const pluginSettings = getPropValue(this.settings, configPath) || null;

    /*
     * For now each capability is represented by a plugin.
     * A capability is then considered as enabled when:
     * - The plugin settings exist but the enabled flag is missing (old API version);
     * - The plugin setting exist and the flag is set to true
     * In any other case the capability is considered as disabled.
     */
    if (pluginSettings && typeof pluginSettings === "object") {
      const pluginEnabled = getPropValue(pluginSettings, "enabled");
      if (typeof pluginEnabled === "undefined" || pluginEnabled === true) {
        result = true;
      }
    }

    return result;
  }

  /**
   * Retrieve the settings of a plugin.
   * @param {string} name The plugin name
   * @returns {object|null}
   */
  getPluginSettings(name) {
    const configPath = `passbolt.plugins.${name}`;
    return getPropValue(this.settings, configPath);
  }

  /**
   * Retrieve the remember me options
   * @returns {object}
   */
  getRememberMeOptions() {
    const pluginSettings = this.getPluginSettings('rememberMe') || {};
    return pluginSettings.options || {};
  }


  /**
   * Check if the remember options include the "until I logout" options
   * @return {boolean}
   */
  get hasRememberMeUntilILogoutOption() {
    const options = this.getRememberMeOptions() || {};
    return typeof options[-1] !== "undefined";
  }

  /**
   * Get the server timezone
   * @returns {string|null}
   */
  getServerTimezone() {
    return getPropValue(this.settings, "passbolt.app.server_timezone");
  }

  /**
   * Get terms and condition links if any
   * @returns {string|boolean}
   */
  get termsLink() {
    const termsLink = getPropValue(this.settings, "passbolt.legal.terms.url");
    if (termsLink) {
      return sanitizeUrl(termsLink);
    }
    return false;
  }

  /**
   * Get privacy link if any
   * @returns {string|boolean}
   */
  get privacyLink() {
    const privacyLink = getPropValue(this.settings, "passbolt.legal.privacy_policy.url");
    if (privacyLink) {
      return sanitizeUrl(privacyLink);
    }
    return false;
  }

  /**
   * Get registration public
   * @returns {boolean}
   */
  get registrationPublic() {
    const registrationPublic = getPropValue(this.settings, "passbolt.registration.public");
    return registrationPublic === true;
  }

  /**
   * Get debug mode
   * @returns {boolean}
   */
  get debug() {
    const debug = getPropValue(this.settings, "app.debug");
    return debug === true;
  }

  /**
   * Get app url
   * @returns {boolean}
   */
  get url() {
    return getPropValue(this.settings, "app.url") || "";
  }

  /**
   * Get app version
   * @returns {string}
   */
  get version() {
    return getPropValue(this.settings, "app.version.number");
  }

  /**
   * Get application locale
   * @returns {object}
   */
  get locale() {
    const organizationLocale = getPropValue(this.settings, "app.locale");
    return organizationLocale || SiteSettings.DEFAULT_LOCALE.locale;
  }

  /**
   * Set the application locale
   * @param locale
   */
  async setLocale(locale) {
    this.settings.app.locale = locale;
  }

  /**
   * Get supported languages
   * @returns {object}
   */
  get supportedLocales() {
    const supportedLocales = getPropValue(this.settings, "passbolt.plugins.locale.options");
    return supportedLocales || SiteSettings.DEFAULT_SUPPORTED_LOCALES;
  }

  /**
   * Get the generator configuration
   * @return {*}
   */
  get generatorConfiguration() {
    return getPropValue(this.settings, "passbolt.plugins.generator.configuration");
  }

  /**
   * Get the default supported locales.
   * @type {array<object>}
   */
  static get DEFAULT_SUPPORTED_LOCALES() {
    return [SiteSettings.DEFAULT_LOCALE];
  }

  /**
   * Get the default locale.
   * @type {object}
   */
  static get DEFAULT_LOCALE() {
    return {
      "locale": "en-UK",
      "label": "English"
    };
  }
}
