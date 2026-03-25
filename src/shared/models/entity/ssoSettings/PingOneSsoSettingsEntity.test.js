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
 * @since         5.11.0
 */
import PingOneSsoSettingsEntity from "./PingOneSsoSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPingOneSsoSettingsDto } from "./SsoSettingsEntity.test.data";

describe("PingOneSsoSettingsEntity", () => {
  describe("::constructor", () => {
    it("should construct with valid data", () => {
      expect.assertions(4);

      const dto = defaultPingOneSsoSettingsDto();
      const entity = new PingOneSsoSettingsEntity(dto);

      expect(entity._props.url).toStrictEqual(dto.url);
      expect(entity._props.environment_id).toStrictEqual(dto.environment_id);
      expect(entity._props.client_id).toStrictEqual(dto.client_id);
      expect(entity._props.client_secret).toStrictEqual(dto.client_secret);
    });

    it("should throw if required fields are missing", () => {
      expect.assertions(1);

      expect(() => new PingOneSsoSettingsEntity({})).toThrow(EntityValidationError);
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the entity name", () => {
      expect.assertions(1);

      expect(PingOneSsoSettingsEntity.ENTITY_NAME).toStrictEqual("PingOneSsoSettings");
    });
  });

  describe("::PROVIDER_ID", () => {
    it("should return the provider id", () => {
      expect.assertions(1);

      expect(PingOneSsoSettingsEntity.PROVIDER_ID).toStrictEqual("pingone");
    });
  });

  describe("::SUPPORTED_URLS", () => {
    it("should return the list of supported PingOne regional URLs", () => {
      expect.assertions(1);

      expect(PingOneSsoSettingsEntity.SUPPORTED_URLS).toStrictEqual([
        "https://auth.pingone.com",
        "https://auth.pingone.eu",
        "https://auth.pingone.ca",
        "https://auth.pingone.asia",
        "https://auth.pingone.com.au",
        "https://auth.pingone.sg",
      ]);
    });
  });

  describe("::getSchema", () => {
    it("validates url property", () => {
      assertEntityProperty.string(PingOneSsoSettingsEntity, "url");
      assertEntityProperty.enumeration(PingOneSsoSettingsEntity, "url", PingOneSsoSettingsEntity.SUPPORTED_URLS, [
        "https://auth.pingone.de",
        "https://login.microsoftonline.com",
        "https://accounts.google.com",
        "http://auth.pingone.com",
        "not a url",
        "",
      ]);
      assertEntityProperty.required(PingOneSsoSettingsEntity, "url");
    });

    it("validates environment_id property", () => {
      assertEntityProperty.string(PingOneSsoSettingsEntity, "environment_id");
      assertEntityProperty.minLength(PingOneSsoSettingsEntity, "environment_id", 1);
      assertEntityProperty.required(PingOneSsoSettingsEntity, "environment_id");
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(PingOneSsoSettingsEntity, "client_id");
      assertEntityProperty.minLength(PingOneSsoSettingsEntity, "client_id", 1);
      assertEntityProperty.required(PingOneSsoSettingsEntity, "client_id");
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(PingOneSsoSettingsEntity, "client_secret");
      assertEntityProperty.minLength(PingOneSsoSettingsEntity, "client_secret", 1);
      assertEntityProperty.required(PingOneSsoSettingsEntity, "client_secret");
    });

    it("validates email_claim property", () => {
      assertEntityProperty.string(PingOneSsoSettingsEntity, "email_claim");
      assertEntityProperty.minLength(PingOneSsoSettingsEntity, "email_claim", 1);
      assertEntityProperty.required(PingOneSsoSettingsEntity, "email_claim");
    });
  });
});
