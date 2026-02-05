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
 * @since         5.10.0
 */

import ColumnTagsModel from "./ColumnTagsModel";
import { ColumnModelTypes, ColumnFields } from "./ColumnModel";

describe("ColumnTagsModel", () => {
  describe("ColumnTagsModel:constructor", () => {
    it("should instantiate with default values", () => {
      expect.assertions(7);
      const model = new ColumnTagsModel();

      expect(model.id).toBe(ColumnModelTypes.TAGS);
      expect(model.field).toBe(ColumnFields.TAGS);
      expect(model.width).toBe(145);
      expect(model.defaultWidth).toBe(145);
      expect(model.resizable).toBe(true);
      expect(model.draggable).toBe(true);
      expect(model.sortable).toBe(false);
    });

    it("should accept custom width", () => {
      expect.assertions(2);
      const model = new ColumnTagsModel({ width: 200 });

      expect(model.width).toBe(200);
      expect(model.defaultWidth).toBe(145);
    });

    it("should use default width when width is not provided", () => {
      expect.assertions(1);
      const model = new ColumnTagsModel({});

      expect(model.width).toBe(145);
    });

    it("should override id and field regardless of input", () => {
      expect.assertions(2);
      const model = new ColumnTagsModel({
        id: "custom-id",
        field: "custom-field",
      });

      expect(model.id).toBe(ColumnModelTypes.TAGS);
      expect(model.field).toBe(ColumnFields.TAGS);
    });

    it("should not be sortable", () => {
      expect.assertions(1);
      const model = new ColumnTagsModel({ sortable: true });

      expect(model.sortable).toBe(false);
    });

    it("should be resizable", () => {
      expect.assertions(1);
      const model = new ColumnTagsModel({ resizable: false });

      // resizable is hardcoded to true in constructor
      expect(model.resizable).toBe(true);
    });

    it("should be draggable", () => {
      expect.assertions(1);
      const model = new ColumnTagsModel({ draggable: false });
      expect(model.draggable).toBe(true);
    });
  });
});
