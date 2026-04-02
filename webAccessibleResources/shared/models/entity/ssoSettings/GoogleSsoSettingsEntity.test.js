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
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import { defaultGoogleSsoSettingsDto } from "./SsoSettingsEntity.test.data";

describe("GoogleSsoSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(GoogleSsoSettingsEntity.ENTITY_NAME, GoogleSsoSettingsEntity.getSchema());
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(GoogleSsoSettingsEntity, "client_id");
      assertEntityProperty.required(GoogleSsoSettingsEntity, "client_id");
      assertEntityProperty.minLength(GoogleSsoSettingsEntity, "client_id", 1);
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(GoogleSsoSettingsEntity, "client_secret");
      assertEntityProperty.required(GoogleSsoSettingsEntity, "client_secret");
      assertEntityProperty.minLength(GoogleSsoSettingsEntity, "client_secret", 1);
    });
  });

  describe("::constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(2);
      const dto = defaultGoogleSsoSettingsDto();
      const entity = new GoogleSsoSettingsEntity(dto);

      expect(entity).toBeInstanceOf(GoogleSsoSettingsEntity);
      expect(entity.toJSON()).toEqual(dto);
    });
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(GoogleSsoSettingsEntity.PROVIDER_ID).toStrictEqual("google");
  });
});
