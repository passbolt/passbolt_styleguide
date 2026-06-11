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
import SiteSettingsEntity from "./siteSettingsEntity";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import * as assertEntityProperty from "passbolt-styleguide/test/assert/assertEntityProperty";
import { defaultCeSiteSettings, defaultProSiteSettings } from "./siteSettingsEntity.test.data";

describe("SiteSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SiteSettingsEntity.ENTITY_NAME, SiteSettingsEntity.getSchema());
    });

    it("validates status property", () => {
      const successValues = ["enabled", "disabled", "not found"];
      const failValues = ["invalid"];
      assertEntityProperty.enumeration(SiteSettingsEntity, "status", successValues, failValues);
      assertEntityProperty.notRequired(SiteSettingsEntity, "status");
    });

    it("validates app property", () => {
      assertEntityProperty.assert(SiteSettingsEntity, "app", [assertEntityProperty.SCENARIO_OBJECT], [], "type");
      assertEntityProperty.notRequired(SiteSettingsEntity, "app");
    });

    it("validates passbolt property", () => {
      assertEntityProperty.assert(SiteSettingsEntity, "passbolt", [assertEntityProperty.SCENARIO_OBJECT], [], "type");
      assertEntityProperty.notRequired(SiteSettingsEntity, "passbolt");
    });

    it("validates serverTimeDiff property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_INTEGER, assertEntityProperty.SCENARIO_NULL];
      const failingScenarios = [
        assertEntityProperty.SCENARIO_STRING,
        assertEntityProperty.SCENARIO_FLOAT,
        assertEntityProperty.SCENARIO_OBJECT,
      ];
      assertEntityProperty.assert(SiteSettingsEntity, "serverTimeDiff", successScenarios, failingScenarios, "type");
      assertEntityProperty.notRequired(SiteSettingsEntity, "serverTimeDiff");
    });
  });

  describe("::constructor", () => {
    it("instantiates with a minimal DTO and applies defaults", () => {
      expect.assertions(2);
      expect(() => new SiteSettingsEntity({})).not.toThrow();
      expect(new SiteSettingsEntity({}).toDto()).toStrictEqual({ status: "enabled" });
    });

    it("instantiates with a full CE DTO", () => {
      expect.assertions(1);
      const dto = defaultCeSiteSettings();
      expect(() => new SiteSettingsEntity(dto)).not.toThrow();
    });

    it("instantiates with a full Pro DTO", () => {
      expect.assertions(1);
      const dto = defaultProSiteSettings();
      expect(() => new SiteSettingsEntity(dto)).not.toThrow();
    });

    it("throws when status is not in the enum", () => {
      expect.assertions(1);
      expect(() => new SiteSettingsEntity({ status: "bogus" })).toThrow(EntityValidationError);
    });
  });

  describe("::marshall", () => {
    it("strips leading and trailing slashes from the email validate regex", () => {
      expect.assertions(1);
      const dto = defaultProSiteSettings();
      dto.passbolt.email = { validate: { regex: "/.*@passbolt.(c|com)$/" } };
      const entity = new SiteSettingsEntity(dto);
      expect(entity.emailValidateRegex).toEqual(".*@passbolt.(c|com)$");
    });

    it("leaves the regex untouched when not present", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(entity.emailValidateRegex).toBeNull();
    });
  });

  describe("::canIUse / ::isPluginEnabled", () => {
    it("returns true when the plugin has no explicit enabled flag", () => {
      expect.assertions(2);
      const dto = defaultProSiteSettings();
      delete dto.passbolt.plugins.tags.enabled;
      const entity = new SiteSettingsEntity(dto);
      expect(entity.canIUse("tags")).toBe(true);
      expect(entity.isPluginEnabled("tags")).toBe(true);
    });

    it("returns true when the plugin is explicitly enabled", () => {
      expect.assertions(2);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(entity.canIUse("tags")).toBe(true);
      expect(entity.isPluginEnabled("tags")).toBe(true);
    });

    it("returns false when the plugin is explicitly disabled", () => {
      expect.assertions(2);
      const dto = defaultProSiteSettings();
      dto.passbolt.plugins.tags.enabled = false;
      const entity = new SiteSettingsEntity(dto);
      expect(entity.canIUse("tags")).toBe(false);
      expect(entity.isPluginEnabled("tags")).toBe(false);
    });

    it("returns false when the plugin is missing", () => {
      expect.assertions(2);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(entity.canIUse("does-not-exist")).toBe(false);
      expect(entity.isPluginEnabled("does-not-exist")).toBe(false);
    });
  });

  describe("::isFeatureBeta", () => {
    it("returns true when the plugin is flagged beta", () => {
      expect.assertions(1);
      const dto = defaultProSiteSettings();
      dto.passbolt.plugins.metadata = { ...dto.passbolt.plugins.metadata, isInBeta: true };
      const entity = new SiteSettingsEntity(dto);
      expect(entity.isFeatureBeta("metadata")).toBe(true);
    });

    it("returns false when the flag is absent", () => {
      expect.assertions(1);
      const dto = defaultProSiteSettings();
      delete dto.passbolt.plugins.metadata.isInBeta;
      const entity = new SiteSettingsEntity(dto);
      expect(entity.isFeatureBeta("metadata")).toBe(false);
    });

    it("throws if the parameter is not a string", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(() => entity.isFeatureBeta(42)).toThrow();
    });
  });

  describe("::getPluginSettings", () => {
    it("returns the raw plugin config including disabled plugins", () => {
      expect.assertions(2);
      const dto = defaultProSiteSettings();
      dto.passbolt.plugins.tags = { enabled: false, version: "9.9.9" };
      const entity = new SiteSettingsEntity(dto);
      expect(entity.canIUse("tags")).toBe(false);
      expect(entity.getPluginSettings("tags")).toEqual({ enabled: false, version: "9.9.9" });
    });

    it("returns undefined for missing plugins", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(entity.getPluginSettings("nope")).toBeUndefined();
    });
  });

  describe("::getRememberMeOptions / ::hasRememberMeUntilILogoutOption", () => {
    it("returns the rememberMe options when present", () => {
      expect.assertions(2);
      const dto = defaultProSiteSettings();
      dto.passbolt.plugins.rememberMe = { options: { 300: "5 minutes", "-1": "until I log out" } };
      const entity = new SiteSettingsEntity(dto);
      expect(entity.getRememberMeOptions()).toEqual({ 300: "5 minutes", "-1": "until I log out" });
      expect(entity.hasRememberMeUntilILogoutOption).toBe(true);
    });

    it("returns an empty object when the plugin is absent", () => {
      expect.assertions(2);
      const dto = defaultProSiteSettings();
      delete dto.passbolt.plugins.rememberMe;
      const entity = new SiteSettingsEntity(dto);
      expect(entity.getRememberMeOptions()).toEqual({});
      expect(entity.hasRememberMeUntilILogoutOption).toBe(false);
    });
  });

  describe("::locale / ::setLocale / ::supportedLocales", () => {
    it("returns the configured locale", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultCeSiteSettings());
      expect(entity.locale).toBe("en-UK");
    });

    it("falls back to DEFAULT_LOCALE when no locale is set", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity({});
      expect(entity.locale).toBe(SiteSettingsEntity.DEFAULT_LOCALE.locale);
    });

    it("setLocale mutates the locale", async () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultCeSiteSettings());
      await entity.setLocale("fr-FR");
      expect(entity.locale).toBe("fr-FR");
    });

    it("setLocale works on an entity built from an empty dto", async () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity({});
      await entity.setLocale("fr-FR");
      expect(entity.locale).toBe("fr-FR");
    });

    it("returns the configured supportedLocales", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultCeSiteSettings());
      expect(Array.isArray(entity.supportedLocales)).toBe(true);
    });

    it("falls back to DEFAULT_SUPPORTED_LOCALES when missing", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity({});
      expect(entity.supportedLocales).toEqual(SiteSettingsEntity.DEFAULT_SUPPORTED_LOCALES);
    });
  });

  describe("app-level getters", () => {
    it("exposes url, version, debug, termsLink, privacyLink, registrationPublic, isCommunityEdition", () => {
      expect.assertions(7);
      const dto = defaultCeSiteSettings();
      dto.app.debug = true;
      dto.passbolt.registration = { public: true };
      const entity = new SiteSettingsEntity(dto);
      expect(entity.url).toBe("http://127.0.0.1:3001");
      expect(entity.version).toBe("3.11.0");
      expect(entity.debug).toBe(true);
      expect(entity.termsLink).toBe("https://www.passbolt.com/terms");
      expect(entity.privacyLink).toBe(false);
      expect(entity.registrationPublic).toBe(true);
      expect(entity.isCommunityEdition).toBe(true);
    });

    it("isCommunityEdition is false for Pro", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultProSiteSettings());
      expect(entity.isCommunityEdition).toBe(false);
    });

    it("url defaults to an empty string when not set", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity({});
      expect(entity.url).toBe("");
    });
  });

  describe("::serverTime / ::isServerInPast", () => {
    it("returns the current client time when no serverTimeDiff is set", () => {
      expect.assertions(2);
      const entity = new SiteSettingsEntity(defaultCeSiteSettings());
      const before = Date.now();
      const serverTime = entity.serverTime;
      const after = Date.now();
      expect(serverTime).toBeGreaterThanOrEqual(before);
      expect(serverTime).toBeLessThanOrEqual(after);
    });

    it("applies a positive serverTimeDiff", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity({ serverTimeDiff: 60_000 });
      expect(entity.serverTime).toBeGreaterThan(Date.now());
    });

    it("isServerInPast is true when serverTimeDiff is negative", () => {
      expect.assertions(2);
      const past = new SiteSettingsEntity({ serverTimeDiff: -60_000 });
      const future = new SiteSettingsEntity({ serverTimeDiff: 60_000 });
      expect(past.isServerInPast()).toBe(true);
      expect(future.isServerInPast()).toBe(false);
    });
  });

  describe("::disabledSiteSettings", () => {
    it("returns a dto with status disabled", () => {
      expect.assertions(1);
      expect(SiteSettingsEntity.disabledSiteSettings).toEqual({ status: "disabled" });
    });
  });

  describe("::toDto / ::toJSON", () => {
    it("toDto and toJSON return identical content", () => {
      expect.assertions(1);
      const entity = new SiteSettingsEntity(defaultCeSiteSettings());
      expect(JSON.stringify(entity)).toEqual(JSON.stringify(entity.toDto()));
    });
  });
});
