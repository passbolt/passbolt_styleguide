import getPropValue from "../../../react/lib/Common/Object/getPropValue";

export default class SiteSettings {

  constructor(settings) {
    this.settings = settings;
  }

  isPluginEnabled(name) {
    const configPath = `passbolt.plugins.${name}`;
    const pluginSettings = getPropValue(this.settings, configPath);

    return pluginSettings !== null;
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
