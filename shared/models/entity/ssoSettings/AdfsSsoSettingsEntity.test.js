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
import { defaultAdfsSsoSettingsDto } from "./SsoSettingsEntity.test.data";
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";
import { defaultAdfsSsoSettingsViewModelDto } from "../../ssoSettings/SsoSettingsViewModel.test.data";

describe("AdfsSsoSettingsEntity", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(AdfsSsoSettingsEntity.ENTITY_NAME, AdfsSsoSettingsEntity.getSchema());
  });

  it("it should instantiate the entity with a minimal dto", () => {
    expect.assertions(2);
    const dto = defaultAdfsSsoSettingsDto();
    const entity = new AdfsSsoSettingsEntity(dto);

    expect(entity).toBeInstanceOf(AdfsSsoSettingsEntity);
    expect(entity.toJSON()).toEqual(dto);
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(AdfsSsoSettingsEntity.PROVIDER_ID).toStrictEqual("adfs");
  });

  it("should throw an exception if required fields are not present", () => {
    const requiredFieldNames = AdfsSsoSettingsEntity.getSchema().required;
    const requiredFieldCount = 5;
    expect.assertions(requiredFieldCount * 2 + 1);

    expect(requiredFieldNames.length).toStrictEqual(requiredFieldCount);

    for (let i = 0; i < requiredFieldNames.length; i++) {
      const fieldName = requiredFieldNames[i];
      const dto = defaultAdfsSsoSettingsDto();
      delete dto[fieldName];
      try {
        new AdfsSsoSettingsEntity(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, "required")).toStrictEqual(true);
      }
    }
  });

  each([
    { dto: { url: -1 }, errorType: "type" },
    { dto: { url: "test" }, errorType: "pattern" },

    { dto: { openid_configuration_path: -1 }, errorType: "type" },
    { dto: { openid_configuration_path: "" }, errorType: "minLength" },

    { dto: { client_id: -1 }, errorType: "type" },
    { dto: { client_id: "" }, errorType: "minLength" },

    { dto: { client_secret: -1 }, errorType: "type" },
    { dto: { client_secret: "" }, errorType: "minLength" },
  ]).describe("should throw an exception if DTO contains invalid values", (scenario) => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(2);
      const fieldName = Object.keys(scenario.dto)[0];
      const erroneousDto = defaultAdfsSsoSettingsDto(scenario.dto);
      try {
        new AdfsSsoSettingsEntity(erroneousDto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, scenario.errorType)).toStrictEqual(true);
      }
    });
  });

  describe("Should validate only the supported URL of OAuth2", () => {
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
      //ending with trailing slashes
      "https://login.adfs.com/",
      "https://login.adfs.us/",
      "https://login.partner.adfs.lu/",
      "https://localhost/",
      "https://192.168.1.1/",

      //with a prefix
      "hack+https://login.adfs.com/",
      "hack+https://login.adfs.us/",
      "hack+https://login.partner.adfs.lu/",
      "hack+https://localhost/",
      "hack+https://192.168.1.1./",

      //not secure HTTP protocol
      "http://login.adfs.com/",
      "http://login.adfs.us/",
      "http://login.partner.adfs.lu/",
      "http://localhost/",
      "http://192.168.1.1/",

      //other protocol
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
