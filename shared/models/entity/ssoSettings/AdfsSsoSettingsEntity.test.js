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
 * @since         4.6.0
 */
import each from "jest-each";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";
import { defaultAdfsSsoSettingsDto } from "./SsoSettingsEntity.test.data";
import { defaultAdfsSsoSettingsViewModelDto } from "../../ssoSettings/SsoSettingsViewModel.test.data";

describe("AdfsSsoSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(AdfsSsoSettingsEntity.ENTITY_NAME, AdfsSsoSettingsEntity.getSchema());
    });

    it("validates url property", () => {
      assertEntityProperty.string(AdfsSsoSettingsEntity, "url");
      assertEntityProperty.required(AdfsSsoSettingsEntity, "url");
    });

    it("validates openid_configuration_path property", () => {
      assertEntityProperty.string(AdfsSsoSettingsEntity, "openid_configuration_path");
      assertEntityProperty.required(AdfsSsoSettingsEntity, "openid_configuration_path");
      assertEntityProperty.minLength(AdfsSsoSettingsEntity, "openid_configuration_path", 1);
    });

    it("validates scope property", () => {
      assertEntityProperty.string(AdfsSsoSettingsEntity, "scope");
      assertEntityProperty.required(AdfsSsoSettingsEntity, "scope");
      assertEntityProperty.minLength(AdfsSsoSettingsEntity, "scope", 1);
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(AdfsSsoSettingsEntity, "client_id");
      assertEntityProperty.required(AdfsSsoSettingsEntity, "client_id");
      assertEntityProperty.minLength(AdfsSsoSettingsEntity, "client_id", 1);
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(AdfsSsoSettingsEntity, "client_secret");
      assertEntityProperty.required(AdfsSsoSettingsEntity, "client_secret");
      assertEntityProperty.minLength(AdfsSsoSettingsEntity, "client_secret", 1);
    });
  });

  describe("::constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(2);
      const dto = defaultAdfsSsoSettingsDto();
      const entity = new AdfsSsoSettingsEntity(dto);

      expect(entity).toBeInstanceOf(AdfsSsoSettingsEntity);
      expect(entity.toJSON()).toEqual(dto);
    });
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(AdfsSsoSettingsEntity.PROVIDER_ID).toStrictEqual("adfs");
  });

  describe("Should validate only the supported URL of ADFS", () => {
    each([
      "https://login.adfs.com",
      "https://login.adfs.us",
      "https://login.partner.adfs.lu",
      "https://localhost",
      "https://192.168.1.1",
    ]).describe("Should validate the supported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultAdfsSsoSettingsViewModelDto({ url });
        expect(() => new AdfsSsoSettingsEntity(dto)).not.toThrow();
      });
    });

    each([
      "https://login.adfs.com/",
      "https://login.adfs.us/",
      "https://login.partner.adfs.lu/",
      "https://localhost/",
      "https://192.168.1.1/",
      "http://login.adfs.com/",
      "http://login.adfs.us/",
      "http://login.partner.adfs.lu/",
      "http://localhost/",
      "http://192.168.1.1/",
      "ftp://login.adfs.com/",
      "ftp://login.adfs.us/",
      "ftp://login.partner.adfs.lu/",
      "ftp://localhost/",
      "ftp://192.168.1.1/",
    ]).describe("Should not validate an unsupported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultAdfsSsoSettingsViewModelDto({ url });
        expect(() => new AdfsSsoSettingsEntity(dto)).toThrow(EntityValidationError);
      });
    });
  });
});
