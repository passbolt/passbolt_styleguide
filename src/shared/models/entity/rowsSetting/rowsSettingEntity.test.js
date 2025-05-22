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
 * @since         5.2.0
 */

import EntitySchema from "../abstract/entitySchema";
import RowsSettingEntity from "./rowsSettingEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("RowsSettingEntity", () => {
  describe(":constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(RowsSettingEntity.ENTITY_NAME, RowsSettingEntity.getSchema());
    });

    it("validates height property", () => {
      assertEntityProperty.notRequired(RowsSettingEntity, "height");
      assertEntityProperty.enumeration(RowsSettingEntity, "height", ["compact", "comfortable"], ["squished", "large"]);
    });

    it("should define height with a default value if none provided", () => {
      expect.assertions(1);

      const entity = new RowsSettingEntity({});
      expect(entity.height).toStrictEqual("compact");
    });
  });

  describe("getter::height", () => {
    it("should return the defined height", () => {
      expect.assertions(1);

      const dto = {height: "comfortable"};

      const entity = new RowsSettingEntity(dto);
      expect(entity.height).toStrictEqual(dto.height);
    });
  });
});
