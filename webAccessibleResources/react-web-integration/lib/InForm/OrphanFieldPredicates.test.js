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
 * @since         5.15.0
 */

import { BUTTON_LIKE_INPUT_TYPES } from "./OrphanDictionary";
import OrphanFieldPredicates from "./OrphanFieldPredicates";

describe("OrphanFieldPredicates", () => {
  describe("OrphanFieldPredicates::isButtonLike", () => {
    it("should return true for a button element", () => {
      expect.assertions(1);

      expect(OrphanFieldPredicates.isButtonLike(document.createElement("button"))).toBe(true);
    });

    it("should return true for an element with a button role", () => {
      expect.assertions(1);

      const element = document.createElement("div");
      element.setAttribute("role", "button");

      expect(OrphanFieldPredicates.isButtonLike(element)).toBe(true);
    });

    it("should return true for a input with 'button' type", () => {
      expect.assertions(4);

      for (const type of BUTTON_LIKE_INPUT_TYPES) {
        const input = document.createElement("input");
        input.setAttribute("type", type);

        expect(OrphanFieldPredicates.isButtonLike(input)).toBe(true);
      }
    });

    it("should return false for a input text", () => {
      expect.assertions(1);

      const input = document.createElement("input");
      input.setAttribute("type", "text");

      expect(OrphanFieldPredicates.isButtonLike(input)).toBe(false);
    });

    it("should return false for a plain element", () => {
      expect.assertions(1);

      expect(OrphanFieldPredicates.isButtonLike(document.createElement("div"))).toBe(false);
    });

    it("should return false for a non HTML element", () => {
      expect.assertions(3);

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      expect(OrphanFieldPredicates.isButtonLike(svg)).toBe(false);
      expect(OrphanFieldPredicates.isButtonLike(document.createTextNode("hello"))).toBe(false);
      expect(OrphanFieldPredicates.isButtonLike(null)).toBe(false);
    });
  });
});
