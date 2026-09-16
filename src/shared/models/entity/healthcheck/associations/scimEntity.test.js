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
 * @since         5.16.0
 */

import EntitySchema from "../../abstract/entitySchema";
import EntityValidationError from "../../abstract/entityValidationError";
import * as assertEntityProperty from "../../../../../../test/assert/assertEntityProperty";
import ScimEntity from "./scimEntity";
import { defaultScimData } from "./scimEntity.data";

describe("ScimEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ScimEntity.ENTITY_NAME, ScimEntity.getSchema());
    });

    it("validates isSecretTokenNotExpired property", () => {
      assertEntityProperty.boolean(ScimEntity, "isSecretTokenNotExpired");
      assertEntityProperty.required(ScimEntity, "isSecretTokenNotExpired");
    });

    it("validates isSecretTokenNotNearExpiry property", () => {
      assertEntityProperty.boolean(ScimEntity, "isSecretTokenNotNearExpiry");
      assertEntityProperty.required(ScimEntity, "isSecretTokenNotNearExpiry");
    });
  });

  describe("::constructor", () => {
    it("works if valid DTO is provided", () => {
      expect.assertions(3);
      const dto = defaultScimData();
      const entity = new ScimEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.isSecretTokenNotExpired).toBe(true);
      expect(entity.isSecretTokenNotNearExpiry).toBe(true);
    });

    it("exposes the flags returned by the backend", () => {
      expect.assertions(2);
      const dto = defaultScimData({
        isSecretTokenNotExpired: false,
        isSecretTokenNotNearExpiry: false,
      });
      const entity = new ScimEntity(dto);

      expect(entity.isSecretTokenNotExpired).toBe(false);
      expect(entity.isSecretTokenNotNearExpiry).toBe(false);
    });

    it("throws if a required property is missing", () => {
      expect.assertions(1);
      expect(() => new ScimEntity({ isSecretTokenNotExpired: true })).toThrow(EntityValidationError);
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the correct entity name", () => {
      expect.assertions(1);
      expect(ScimEntity.ENTITY_NAME).toBe("Scim");
    });
  });
});
