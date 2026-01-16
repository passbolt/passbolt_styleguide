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
 * @since         6.0.0
 */

import DOMUtils from "./DomUtils";
import each from "jest-each";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("DomUtils", () => {
  describe("DomUtils::generateUniquePointsInElement", () => {
    it("Generate unique point in element according to its size", () => {
      const element = document.createElement("div");
      jest
        .spyOn(element, "getBoundingClientRect")
        .mockImplementationOnce(() => ({ top: 200, left: 500, width: 50, height: 99 }));
      const points = DOMUtils.generateUniquePointsInElement(element);
      expect(points.length).toBe(221);
      expect(points.every((point) => point.x < 550 && point.x >= 500 && point.y < 299 && point.y >= 200)).toBeTruthy();
    });

    it("Generate unique point in InformMenu", () => {
      const element = document.createElement("div");
      jest
        .spyOn(element, "getBoundingClientRect")
        .mockImplementationOnce(() => ({ top: 200, left: 500, width: 370, height: 220 }));
      const points = DOMUtils.generateUniquePointsInElement(element);
      expect(points.length).toBe(814);
      expect(points.every((point) => point.x < 870 && point.x >= 500 && point.y < 420 && point.y >= 200)).toBeTruthy();
    });

    it("Generate unique point in InformCTA", () => {
      const element = document.createElement("div");
      jest
        .spyOn(element, "getBoundingClientRect")
        .mockImplementationOnce(() => ({ top: 200, left: 500, width: 18, height: 18 }));
      const points = DOMUtils.generateUniquePointsInElement(element);
      expect(points.length).toBe(81);
      expect(points.every((point) => point.x < 518 && point.x >= 500 && point.y < 218 && point.y >= 200)).toBeTruthy();
    });

    it("Do not generate unique point in element if size is zero", () => {
      const element = document.createElement("div");
      jest
        .spyOn(element, "getBoundingClientRect")
        .mockImplementationOnce(() => ({ top: 200, left: 500, width: 0, height: 220 }));
      const points = DOMUtils.generateUniquePointsInElement(element);
      expect(points.length).toBe(0);
    });
  });

  describe("DomUtils::_calculateCellSize", () => {
    each([
      { scenario: "1 for 0", value: 0, result: 1 },
      { scenario: "1 for 1", value: 1, result: 1 },
      { scenario: "2 for 18", value: 18, result: 2 },
      { scenario: "4 for 50", value: 50, result: 4 },
      { scenario: "6 for 99", value: 99, result: 6 },
      { scenario: "6 for 99.99", value: 99.99, result: 6 },
      { scenario: "10 for 100", value: 100, result: 10 },
      { scenario: "10 for 370", value: 370, result: 10 },
    ]).describe("Calculate the value from the function", (test) => {
      it(`Should return the value: ${test.scenario}`, async () => {
        expect(DOMUtils._calculateCellSize(test.value)).toEqual(test.result);
      });
    });
  });
});
