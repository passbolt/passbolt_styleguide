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
import getPropValue from "../../../react/lib/Common/Object/getPropValue";
import sanitizeUrl from "../Common/Sanitize/sanitizeUrl";

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

  getPluginSettings(name) {
    const configPath = `passbolt.plugins.${name}`;
    return getPropValue(this.settings, configPath);
  }

  getRememberMeOptions() {
    const pluginSettings = this.getPluginSettings('rememberMe');

    return pluginSettings.options;
  }

  getServerTimezone() {
    return getPropValue(this.settings, "passbolt.app.server_timezone");
  }

  /**
   * Get terms and condition links if any
   * @returns {string|boolean}
   */
  get termsLink() {
    if (this.settings.app.legal && this.settings.app.legal.terms) {
      return sanitizeUrl(this.settings.app.legal.terms);
    }
    return false;
  }

  /**
   * Get privacy link if any
   * @returns {string|boolean}
   */
  get privacyLink() {
    if (this.settings.app.legal && this.settings.app.legal.privacy) {
      return sanitizeUrl(this.settings.app.legal.privacy);
    }
    return false;
  }
}
