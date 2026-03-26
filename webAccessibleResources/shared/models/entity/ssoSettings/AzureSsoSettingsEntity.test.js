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
 * @since         4.5.0
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";
import { defaultAzureSsoSettingsDto } from "./SsoSettingsEntity.test.data";

describe("AzureSsoSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(AzureSsoSettingsEntity.ENTITY_NAME, AzureSsoSettingsEntity.getSchema());
    });

    it("validates url property", () => {
      assertEntityProperty.string(AzureSsoSettingsEntity, "url");
      assertEntityProperty.required(AzureSsoSettingsEntity, "url");
      assertEntityProperty.enumeration(AzureSsoSettingsEntity, "url", AzureSsoSettingsEntity.SUPPORTED_URLS, [
        "https://invalid.com",
        "http://login.microsoftonline.com",
        "https://login.microsoftonline.com/",
      ]);
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(AzureSsoSettingsEntity, "client_id");
      assertEntityProperty.required(AzureSsoSettingsEntity, "client_id");
      assertEntityProperty.uuid(AzureSsoSettingsEntity, "client_id");
    });

    it("validates tenant_id property", () => {
      assertEntityProperty.string(AzureSsoSettingsEntity, "tenant_id");
      assertEntityProperty.required(AzureSsoSettingsEntity, "tenant_id");
      assertEntityProperty.uuid(AzureSsoSettingsEntity, "tenant_id");
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(AzureSsoSettingsEntity, "client_secret");
      assertEntityProperty.required(AzureSsoSettingsEntity, "client_secret");
      assertEntityProperty.minLength(AzureSsoSettingsEntity, "client_secret", 1);
    });

    it("validates client_secret_expiry property", () => {
      assertEntityProperty.string(AzureSsoSettingsEntity, "client_secret_expiry");
      assertEntityProperty.required(AzureSsoSettingsEntity, "client_secret_expiry");
      assertEntityProperty.dateTime(AzureSsoSettingsEntity, "client_secret_expiry");
    });

    it("validates email_claim property", () => {
      assertEntityProperty.enumeration(
        AzureSsoSettingsEntity,
        "email_claim",
        ["email", "preferred_username", "upn"],
        ["invalid"],
      );
    });

    it("validates prompt property", () => {
      assertEntityProperty.enumeration(AzureSsoSettingsEntity, "prompt", ["login", "none"], ["invalid"]);
    });

    it("validates login_hint property", () => {
      assertEntityProperty.boolean(AzureSsoSettingsEntity, "login_hint");
    });
  });

  describe("::constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(2);
      const dto = defaultAzureSsoSettingsDto();
      const entity = new AzureSsoSettingsEntity(dto);

      expect(entity).toBeInstanceOf(AzureSsoSettingsEntity);
      expect(entity.toJSON()).toEqual(dto);
    });
  });

  it("it should give the right provider ID", () => {
    expect.assertions(1);
    expect(AzureSsoSettingsEntity.PROVIDER_ID).toStrictEqual("azure");
  });
});
