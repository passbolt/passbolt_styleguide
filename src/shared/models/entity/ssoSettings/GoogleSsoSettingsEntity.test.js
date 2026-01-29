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
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import { defaultGoogleSsoSettingsDto } from "./SsoSettingsEntity.test.data";

describe("GoogleSsoSettingsEntity", () => {
  describe("schema must validate", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(GoogleSsoSettingsEntity.ENTITY_NAME, GoogleSsoSettingsEntity.getSchema());
    });

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

  it("should throw an exception if required fields are not present", () => {
    const requiredFieldNames = GoogleSsoSettingsEntity.getSchema().required;
    const requiredFieldCount = 2;
    expect.assertions(requiredFieldCount * 2 + 1);

    expect(requiredFieldNames.length).toStrictEqual(requiredFieldCount);

    for (let i = 0; i < requiredFieldNames.length; i++) {
      const fieldName = requiredFieldNames[i];
      const dto = defaultGoogleSsoSettingsDto();
      delete dto[fieldName];
      try {
        new GoogleSsoSettingsEntity(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, "required")).toStrictEqual(true);
      }
    }
  });

  each([
    { dto: { client_id: "" }, errorType: "minLength" },
    { dto: { client_secret: "" }, errorType: "minLength" },
    { dto: { client_id: -1 }, errorType: "type" },
    { dto: { client_secret: -1 }, errorType: "type" },
  ]).describe("should throw an exception if DTO contains invalid values", (scenario) => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(2);
      const fieldName = Object.keys(scenario.dto)[0];
      const erroneousDto = defaultGoogleSsoSettingsDto(scenario.dto);
      try {
        new GoogleSsoSettingsEntity(erroneousDto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, scenario.errorType)).toStrictEqual(true);
      }
    });
  });
});
