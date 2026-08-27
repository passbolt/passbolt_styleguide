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
 * @since         5.13.0
 */

import ColumnOfflineModel from "./ColumnOfflineModel";
import { ColumnModelTypes, ColumnFields } from "./ColumnModel";

describe("ColumnOfflineModel", () => {
  describe("ColumnOfflineModel:constructor", () => {
    it("should instantiate with default values", () => {
      expect.assertions(8);
      const model = new ColumnOfflineModel();

      expect(model.id).toBe(ColumnModelTypes.OFFLINE_MODE);
      expect(model.field).toBe(ColumnFields.OFFLINE);
      expect(model.width).toBe(210);
      expect(model.defaultWidth).toBe(210);
      expect(model.minWidth).toBe(160);
      expect(model.resizable).toBe(true);
      expect(model.draggable).toBe(true);
      expect(model.sortable).toBe(false);
    });

    it("should accept custom width", () => {
      expect.assertions(2);
      const model = new ColumnOfflineModel({ width: 200 });

      expect(model.width).toBe(200);
      expect(model.defaultWidth).toBe(210);
    });

    it("should use default width when width is not provided", () => {
      expect.assertions(1);
      const model = new ColumnOfflineModel({});

      expect(model.width).toBe(210);
    });

    it("should override id and field regardless of input", () => {
      expect.assertions(2);
      const model = new ColumnOfflineModel({
        id: "custom-id",
        field: "custom-field",
      });

      expect(model.id).toBe(ColumnModelTypes.OFFLINE_MODE);
      expect(model.field).toBe(ColumnFields.OFFLINE);
    });

    it("should be sortable", () => {
      expect.assertions(1);
      const model = new ColumnOfflineModel({ sortable: true });

      expect(model.sortable).toBe(false);
    });

    it("should be resizable", () => {
      expect.assertions(1);
      const model = new ColumnOfflineModel({ resizable: false });

      expect(model.resizable).toBe(true);
    });

    it("should be draggable", () => {
      expect.assertions(1);
      const model = new ColumnOfflineModel({ draggable: false });

      expect(model.draggable).toBe(true);
    });
  });
});
