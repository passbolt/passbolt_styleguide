import getPropValue from "../../../react/lib/Common/Object/getPropValue";
import plugin from "../../../react-appjs/legacy/util/plugin";

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
}
