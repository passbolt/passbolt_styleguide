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
 * @since         5.0.0
 */

import EntitySchema from "../abstract/entitySchema";
import SecretDataEntity, { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultSecretDataDto } from "./secretDataEntity.test.data";

describe("SecretData", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataEntity.name, SecretDataEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataEntity, "object_type");
      assertEntityProperty.notRequired(SecretDataEntity, "object_type");
      assertEntityProperty.enumeration(
        SecretDataEntity,
        "object_type",
        [SECRET_DATA_OBJECT_TYPE],
        ["any other values"],
      );
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(1);
      const dto = defaultSecretDataDto();
      const entity = new SecretDataEntity(dto);

      expect(entity.objectType).toStrictEqual(SECRET_DATA_OBJECT_TYPE);
    });
  });
});
