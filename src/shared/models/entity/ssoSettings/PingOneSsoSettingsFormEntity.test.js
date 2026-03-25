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
import { v4 as uuid } from "uuid";
import { pingOneSsoSettingsEntityDto } from "./PingOneSsoSettingsEntity.test.data";
import PingOneSsoSettingsFormEntity from "./PingOneSsoSettingsFormEntity";
import PingOneSsoSettingsEntity from "./PingOneSsoSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";
import { defaultPingOneSsoSettingsDto } from "./SsoSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("PingOneSsoSettingsFormEntity", () => {
  describe("::constructor", () => {
    it("should create a new PingOneSsoSettingsFormEntity with valid data", () => {
      expect.assertions(5);

      const dto = defaultPingOneSsoSettingsDto();
      const formEntity = new PingOneSsoSettingsFormEntity(dto);

      expect(formEntity.url).toStrictEqual(dto.url);
      expect(formEntity.environment_id).toStrictEqual(dto.environment_id);
      expect(formEntity.client_id).toStrictEqual(dto.client_id);
      expect(formEntity.client_secret).toStrictEqual(dto.client_secret);
      expect(formEntity.email_claim).toStrictEqual(dto.email_claim);
    });

    it("should throw if required fields are missing", () => {
      expect.assertions(1);

      expect(() => new PingOneSsoSettingsFormEntity({})).toThrow(EntityValidationError);
    });

    it("should create a new PingOneSsoSettingsFormEntity with an id", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultPingOneSsoSettingsDto({ id });
      const formEntity = new PingOneSsoSettingsFormEntity(dto);

      expect(formEntity.id).toStrictEqual(id);
    });

    it("should not throw without validation", () => {
      expect.assertions(1);

      expect(() => new PingOneSsoSettingsFormEntity({}, { validate: false })).not.toThrow();
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the entity name", () => {
      expect.assertions(1);

      expect(PingOneSsoSettingsFormEntity.ENTITY_NAME).toStrictEqual("PingOneSsoSettingsForm");
    });
  });

  describe("::provider", () => {
    it("should return the PingOne provider id", () => {
      expect.assertions(1);

      const formEntity = new PingOneSsoSettingsFormEntity(defaultPingOneSsoSettingsDto());
      expect(formEntity.provider).toStrictEqual(PingOneSsoSettingsEntity.PROVIDER_ID);
    });
  });

  describe("::toFormDto", () => {
    it("should return a flat DTO with id and all data fields", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultPingOneSsoSettingsDto({ id });
      const formEntity = new PingOneSsoSettingsFormEntity(dto);

      expect(formEntity.toFormDto()).toStrictEqual({
        id,
        url: dto.url,
        environment_id: dto.environment_id,
        client_id: dto.client_id,
        client_secret: dto.client_secret,
        email_claim: dto.email_claim,
      });
    });
  });

  describe("::toEntityDto", () => {
    it("should return a DTO with the entity format", () => {
      expect.assertions(1);

      const dto = defaultPingOneSsoSettingsDto();
      const formEntity = new PingOneSsoSettingsFormEntity(dto);

      expect(formEntity.toEntityDto()).toStrictEqual({
        provider: PingOneSsoSettingsEntity.PROVIDER_ID,
        data: {
          url: dto.url,
          environment_id: dto.environment_id,
          client_id: dto.client_id,
          client_secret: dto.client_secret,
          email_claim: dto.email_claim,
        },
      });
    });
  });

  describe("::fromEntityDto", () => {
    it("should create a PingOneSsoSettingsFormEntity from an entity DTO", () => {
      expect.assertions(6);

      const apiDto = pingOneSsoSettingsEntityDto();
      const formEntity = PingOneSsoSettingsFormEntity.fromEntityDto(apiDto);

      expect(formEntity.id).toStrictEqual(apiDto.id);
      expect(formEntity.url).toStrictEqual(apiDto.data.url);
      expect(formEntity.environment_id).toStrictEqual(apiDto.data.environment_id);
      expect(formEntity.client_id).toStrictEqual(apiDto.data.client_id);
      expect(formEntity.client_secret).toStrictEqual(apiDto.data.client_secret);
      expect(formEntity.email_claim).toStrictEqual(apiDto.data.email_claim);
    });
  });

  describe("::createDefault", () => {
    it("should create a PingOneSsoSettingsFormEntity without validation", () => {
      expect.assertions(1);

      expect(() => PingOneSsoSettingsFormEntity.createDefault()).not.toThrow();
    });

    it("should accept default config values", () => {
      expect.assertions(2);

      const formEntity = PingOneSsoSettingsFormEntity.createDefault({
        url: "https://auth.pingone.eu",
        email_claim: "email",
      });

      expect(formEntity.url).toStrictEqual("https://auth.pingone.eu");
      expect(formEntity.email_claim).toStrictEqual("email");
    });
  });

  describe("::getSchema", () => {
    it("validates environment_id property", () => {
      assertEntityProperty.string(PingOneSsoSettingsFormEntity, "environment_id");
      assertEntityProperty.minLength(PingOneSsoSettingsFormEntity, "environment_id", 1);
      assertEntityProperty.required(PingOneSsoSettingsFormEntity, "environment_id");
    });

    it("validates url property", () => {
      assertEntityProperty.string(PingOneSsoSettingsFormEntity, "url");
      assertEntityProperty.enumeration(PingOneSsoSettingsFormEntity, "url", PingOneSsoSettingsEntity.SUPPORTED_URLS, [
        "https://auth.pingone.de",
        "https://login.microsoftonline.com",
        "https://accounts.google.com",
        "http://auth.pingone.com",
        "not a url",
        "",
      ]);
      assertEntityProperty.required(PingOneSsoSettingsFormEntity, "url");
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(PingOneSsoSettingsFormEntity, "client_id");
      assertEntityProperty.minLength(PingOneSsoSettingsFormEntity, "client_id", 1);
      assertEntityProperty.required(PingOneSsoSettingsFormEntity, "client_id");
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(PingOneSsoSettingsFormEntity, "client_secret");
      assertEntityProperty.minLength(PingOneSsoSettingsFormEntity, "client_secret", 1);
      assertEntityProperty.required(PingOneSsoSettingsFormEntity, "client_secret");
    });

    it("validates email_claim property", () => {
      assertEntityProperty.string(PingOneSsoSettingsFormEntity, "email_claim");
      assertEntityProperty.minLength(PingOneSsoSettingsFormEntity, "email_claim", 1);
      assertEntityProperty.required(PingOneSsoSettingsFormEntity, "email_claim");
    });
  });

  describe("::validate", () => {
    it("should return an empty EntityValidationError when data is valid", () => {
      expect.assertions(2);

      const dto = defaultPingOneSsoSettingsDto();
      const formEntity = new PingOneSsoSettingsFormEntity(dto);
      const result = formEntity.validate();

      expect(result).toBeInstanceOf(EntityValidationError);
      expect(result.hasErrors()).toStrictEqual(false);
    });
  });
});
