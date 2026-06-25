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
 * @since         6.0.0
 */
import assertString from "validator/es/lib/util/assertString";
import EntityV2 from "../abstract/entityV2";
import getPropValue from "../../../../react-extension/lib/Object/getPropValue";
import sanitizeUrl from "../../../../react-extension/lib/Sanitize/sanitizeUrl";

const ORGANIZATION_ENABLED = "enabled";
const ORGANIZATION_DISABLED = "disabled";
const ORGANIZATION_NOT_FOUND = "not found";

/**
 * Unified SiteSettings entity.
 *
 * To replace:
 *   - passbolt-browser-extension/.../model/entity/siteSettings/siteSettingsEntity.js (v1 Entity)
 *   - passbolt-styleguide/src/shared/lib/Settings/SiteSettings.js (plain class)
 */
class SiteSettingsEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        status: {
          type: "string",
          enum: [ORGANIZATION_ENABLED, ORGANIZATION_DISABLED, ORGANIZATION_NOT_FOUND],
        },
        app: {
          type: "object",
        },
        passbolt: {
          type: "object",
        },
        serverTimeDiff: {
          type: "integer",
          nullable: true,
        },
      },
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    if (typeof this._props.status === "undefined") {
      this._props.status = ORGANIZATION_ENABLED;
    }
    SiteSettingsEntity.sanitizeEmailValidateRegex(this._props);
  }

  /**
   * Sanitize email validate regex by stripping leading and trailing slashes.
   * @param {object} dto The dto to sanitize in place.
   * @returns {void}
   */
  static sanitizeEmailValidateRegex(dto) {
    const emailValidateRegex = dto?.passbolt?.email?.validate?.regex;

    if (!emailValidateRegex || typeof emailValidateRegex !== "string" || !emailValidateRegex.trim().length) {
      return;
    }

    dto.passbolt.email.validate.regex = emailValidateRegex.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  }

  /**
   * Return a disabled site settings dto.
   * @returns {object}
   */
  static get disabledSiteSettings() {
    return {
      status: ORGANIZATION_DISABLED,
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  toDto() {
    return { ...this._props };
  }

  toJSON() {
    return this.toDto();
  }

  /*
   * ==================================================
   * Plugin / capability accessors
   * ==================================================
   */
  /**
   * Check if a plugin / capability is enabled.
   * A plugin entry without an explicit `enabled` flag is treated as enabled.
   * @param {string} name The plugin name.
   * @returns {boolean}
   */
  canIUse(name) {
    const plugin = this._props?.passbolt?.plugins?.[name];
    if (!plugin || typeof plugin !== "object") {
      return false;
    }
    return plugin.enabled !== false;
  }

  /**
   * Alias of {@link canIUse} kept for compatibility with the browser-extension API.
   * @param {string} name The plugin name.
   * @returns {boolean}
   */
  isPluginEnabled(name) {
    return this.canIUse(name);
  }

  /**
   * Returns true if the given plugin is flagged as beta.
   * @param {string} name The plugin name.
   * @returns {boolean}
   */
  isFeatureBeta(name) {
    assertString(name);
    return getPropValue(this._props, `passbolt.plugins.${name}.isInBeta`) || false;
  }

  /**
   * Get the configuration of a plugin if present.
   * Returns the raw plugin entry regardless of its `enabled` flag — callers
   * that need enablement gating should combine this with {@link canIUse}.
   * @param {string} name The plugin name.
   * @returns {object|undefined}
   */
  getPluginSettings(name) {
    return getPropValue(this._props, `passbolt.plugins.${name}`);
  }

  /**
   * Get the remember me options.
   * @returns {object}
   */
  getRememberMeOptions() {
    const pluginSettings = this.getPluginSettings("rememberMe") || {};
    return pluginSettings.options || {};
  }

  /**
   * Whether the remember me options include the "until I log out" entry.
   * @returns {boolean}
   */
  get hasRememberMeUntilILogoutOption() {
    const options = this.getRememberMeOptions() || {};
    return typeof options[-1] !== "undefined";
  }

  /**
   * Get the generator plugin configuration.
   * @returns {object|undefined}
   */
  get generatorConfiguration() {
    return getPropValue(this._props, "passbolt.plugins.generator.configuration");
  }

  /*
   * ==================================================
   * App / org accessors
   * ==================================================
   */
  /**
   * Get the organization locale, defaulting to the static DEFAULT_LOCALE.
   * @returns {string}
   */
  get locale() {
    return getPropValue(this._props, "app.locale") || SiteSettingsEntity.DEFAULT_LOCALE.locale;
  }

  /**
   * Set the application locale.
   * @param {string} locale The locale code.
   */
  async setLocale(locale) {
    if (!this._props.app) {
      this._props.app = {};
    }
    this._props.app.locale = locale;
  }

  /**
   * Get the supported locales, defaulting to DEFAULT_SUPPORTED_LOCALES.
   * @returns {Array<object>}
   */
  get supportedLocales() {
    return getPropValue(this._props, "passbolt.plugins.locale.options") || SiteSettingsEntity.DEFAULT_SUPPORTED_LOCALES;
  }

  /**
   * Get the server timezone.
   * Note: preserved historical lookup path (`passbolt.app.server_timezone`) used
   * by the styleguide implementation — the actual timezone in served settings
   * typically lives under `app.server_timezone`.
   * @returns {string|undefined}
   */
  getServerTimezone() {
    return getPropValue(this._props, "passbolt.app.server_timezone");
  }

  /**
   * Get terms link if any.
   * @returns {string|false}
   */
  get termsLink() {
    const termsLink = getPropValue(this._props, "passbolt.legal.terms.url");
    return termsLink ? sanitizeUrl(termsLink) : false;
  }

  /**
   * Get privacy link if any.
   * @returns {string|false}
   */
  get privacyLink() {
    const privacyLink = getPropValue(this._props, "passbolt.legal.privacy_policy.url");
    return privacyLink ? sanitizeUrl(privacyLink) : false;
  }

  /**
   * Whether public registration is enabled.
   * @returns {boolean}
   */
  get registrationPublic() {
    return getPropValue(this._props, "passbolt.registration.public") === true;
  }

  /**
   * Whether the app is running in debug mode.
   * @returns {boolean}
   */
  get debug() {
    return getPropValue(this._props, "app.debug") === true;
  }

  /**
   * Get the app url.
   * @returns {string}
   */
  get url() {
    return getPropValue(this._props, "app.url") || "";
  }

  /**
   * Get the app version number.
   * @returns {string|undefined}
   */
  get version() {
    return getPropValue(this._props, "app.version.number");
  }

  /**
   * Whether the running edition is the Community Edition.
   * @returns {boolean}
   */
  get isCommunityEdition() {
    return getPropValue(this._props, "passbolt.edition") === "ce";
  }

  /**
   * Get the custom email validation regex.
   * @returns {string|null}
   */
  get emailValidateRegex() {
    return getPropValue(this._props, "passbolt.email.validate.regex") || null;
  }

  /*
   * ==================================================
   * Server time
   * ==================================================
   */
  /**
   * Returns true if the predicted server time is in the past.
   * @returns {boolean}
   */
  isServerInPast() {
    const serverTimeDiff = this._props.serverTimeDiff || 0;
    return serverTimeDiff < 0;
  }

  /**
   * Returns the predicted server time (ms) based on the last settings download.
   * @returns {number}
   */
  get serverTime() {
    const serverTimeDiff = this._props.serverTimeDiff || 0;
    return new Date().getTime() + serverTimeDiff;
  }

  /*
   * ==================================================
   * Static accessors
   * ==================================================
   */
  static get ENTITY_NAME() {
    return "SiteSettings";
  }

  static get ORGANIZATION_ENABLED() {
    return ORGANIZATION_ENABLED;
  }

  static get ORGANIZATION_DISABLED() {
    return ORGANIZATION_DISABLED;
  }

  static get ORGANIZATION_NOT_FOUND() {
    return ORGANIZATION_NOT_FOUND;
  }

  static get DEFAULT_LOCALE() {
    return {
      locale: "en-UK",
      label: "English",
    };
  }

  static get DEFAULT_SUPPORTED_LOCALES() {
    return [SiteSettingsEntity.DEFAULT_LOCALE];
  }
}

export default SiteSettingsEntity;
