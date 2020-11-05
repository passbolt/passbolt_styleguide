export default class UserSettings {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Returns the current user theme
   * @returns {*}
   */
  getTheme() {
    return this.settings["user.settings.theme"];
  }

  getTrustedDomain() {
    return this.settings["user.settings.trustedDomain"];
  }

  getSecurityTokenBackgroundColor() {
    return this.settings["user.settings.securityToken.color"];
  }

  getSecurityTokenTextColor() {
    return this.settings["user.settings.securityToken.textColor"];
  }

  getSecurityTokenCode() {
    return this.settings["user.settings.securityToken.code"];
  }
}
