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
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";
import { defaultOAuth2SsoSettingsDto } from "./SsoSettingsEntity.test.data";
import { defaultOAuth2SsoSettingsViewModelDto } from "../../ssoSettings/SsoSettingsViewModel.test.data";

describe("OAuth2SsoSettingsEntity", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(OAuth2SsoSettingsEntity.ENTITY_NAME, OAuth2SsoSettingsEntity.getSchema());
  });

  it("it should instantiate the entity with a minimal dto", () => {
    expect.assertions(2);
    const dto = defaultOAuth2SsoSettingsDto();
    const entity = new OAuth2SsoSettingsEntity(dto);

    expect(entity).toBeInstanceOf(OAuth2SsoSettingsEntity);
    expect(entity.toJSON()).toEqual(dto);
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(OAuth2SsoSettingsEntity.PROVIDER_ID).toStrictEqual("oauth2");
  });

  it("should throw an exception if required fields are not present", () => {
    const requiredFieldNames = OAuth2SsoSettingsEntity.getSchema().required;
    const requiredFieldCount = 5;
    expect.assertions(requiredFieldCount * 2 + 1);

    expect(requiredFieldNames.length).toStrictEqual(requiredFieldCount);

    for (let i = 0; i < requiredFieldNames.length; i++) {
      const fieldName = requiredFieldNames[i];
      const dto = defaultOAuth2SsoSettingsDto();
      delete dto[fieldName];
      try {
        new OAuth2SsoSettingsEntity(dto);
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
      const erroneousDto = defaultOAuth2SsoSettingsDto(scenario.dto);
      try {
        new OAuth2SsoSettingsEntity(erroneousDto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, scenario.errorType)).toStrictEqual(true);
      }
    });
  });

  describe("Should validate only the supported URL of OAuth2", () => {
    each([
      "https://login.oauth2.com",
      "https://login.oauth2.us",
      "https://login.partner.oauth2.lu",
      "https://localhost",
      "https://192.168.1.1",
    ]).describe("Should validate the supported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultOAuth2SsoSettingsViewModelDto({ url });
        expect(() => new OAuth2SsoSettingsEntity(dto)).not.toThrow();
      });
    });

    each([
      //ending with trailing slashes
      "https://login.oauth2.com/",
      "https://login.oauth2.us/",
      "https://login.partner.oauth2.lu/",
      "https://localhost/",
      "https://192.168.1.1/",

      //with a prefix
      "hack+https://login.oauth2.com/",
      "hack+https://login.oauth2.us/",
      "hack+https://login.partner.oauth2.lu/",
      "hack+https://localhost/",
      "hack+https://192.168.1.1./",

      //not secure HTTP protocol
      "http://login.oauth2.com/",
      "http://login.oauth2.us/",
      "http://login.partner.oauth2.lu/",
      "http://localhost/",
      "http://192.168.1.1/",

      //other protocol
      "ftp://login.oauth2.com/",
      "ftp://login.oauth2.us/",
      "ftp://login.partner.oauth2.lu/",
      "ftp://localhost/",
      "ftp://192.168.1.1/",
    ]).describe("Should not validate an unsupported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultOAuth2SsoSettingsViewModelDto({ url });
        expect(() => new OAuth2SsoSettingsEntity(dto)).toThrow(EntityValidationError);
      });
    });
  });
});
