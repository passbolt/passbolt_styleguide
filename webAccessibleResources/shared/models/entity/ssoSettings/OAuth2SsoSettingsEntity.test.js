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

import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";
import { defaultOAuth2SsoSettingsDto } from "./SsoSettingsEntity.test.data";
import { defaultOAuth2SsoSettingsFormEntityDto } from "../../ssoSettings/SsoSettingsViewModel.test.data";

describe("OAuth2SsoSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(OAuth2SsoSettingsEntity.ENTITY_NAME, OAuth2SsoSettingsEntity.getSchema());
    });

    it("validates url property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsEntity, "url");
      assertEntityProperty.required(OAuth2SsoSettingsEntity, "url");
    });

    it("validates openid_configuration_path property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsEntity, "openid_configuration_path");
      assertEntityProperty.required(OAuth2SsoSettingsEntity, "openid_configuration_path");
      assertEntityProperty.minLength(OAuth2SsoSettingsEntity, "openid_configuration_path", 1);
    });

    it("validates scope property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsEntity, "scope");
      assertEntityProperty.required(OAuth2SsoSettingsEntity, "scope");
      assertEntityProperty.minLength(OAuth2SsoSettingsEntity, "scope", 1);
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsEntity, "client_id");
      assertEntityProperty.required(OAuth2SsoSettingsEntity, "client_id");
      assertEntityProperty.minLength(OAuth2SsoSettingsEntity, "client_id", 1);
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsEntity, "client_secret");
      assertEntityProperty.required(OAuth2SsoSettingsEntity, "client_secret");
      assertEntityProperty.minLength(OAuth2SsoSettingsEntity, "client_secret", 1);
    });
  });

  describe("::constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(2);
      const dto = defaultOAuth2SsoSettingsDto();
      const entity = new OAuth2SsoSettingsEntity(dto);

      expect(entity).toBeInstanceOf(OAuth2SsoSettingsEntity);
      expect(entity.toJSON()).toEqual(dto);
    });
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(OAuth2SsoSettingsEntity.PROVIDER_ID).toStrictEqual("oauth2");
  });

  describe("Should validate only the supported URL of OAuth2", () => {
    describe.each([
      "https://login.oauth2.com",
      "https://login.oauth2.us",
      "https://login.partner.oauth2.lu",
      "https://localhost",
      "https://192.168.1.1",
    ])("Should validate the supported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultOAuth2SsoSettingsFormEntityDto({ url });
        expect(() => new OAuth2SsoSettingsEntity(dto)).not.toThrow();
      });
    });

    describe.each([
      "https://login.oauth2.com/",
      "https://login.oauth2.us/",
      "https://login.partner.oauth2.lu/",
      "https://localhost/",
      "https://192.168.1.1/",
      "http://login.oauth2.com/",
      "http://login.oauth2.us/",
      "http://login.partner.oauth2.lu/",
      "http://localhost/",
      "http://192.168.1.1/",
      "ftp://login.oauth2.com/",
      "ftp://login.oauth2.us/",
      "ftp://login.partner.oauth2.lu/",
      "ftp://localhost/",
      "ftp://192.168.1.1/",
    ])("Should not validate an unsupported URL", (url) => {
      it(`${url}`, () => {
        const dto = defaultOAuth2SsoSettingsFormEntityDto({ url });
        expect(() => new OAuth2SsoSettingsEntity(dto)).toThrow(EntityValidationError);
      });
    });
  });
});
