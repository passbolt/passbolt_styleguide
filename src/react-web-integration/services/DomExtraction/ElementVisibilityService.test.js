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

import ElementVisibilityService, {
  MIN_VIEWABLE_DIMENSION_PX,
  OPACITY_VISIBILITY_THRESHOLD,
} from "./ElementVisibilityService";

/**
 * Build an element wired to be viewable by default, so each test only overrides the layer it exercises.
 * jsdom does not implement layout nor `checkVisibility`, so both are stubbed explicitly.
 * @param {object} [overrides]
 * @param {string} [overrides.opacity] The computed opacity value.
 * @param {string} [overrides.display] The computed display value.
 * @param {string} [overrides.visibility] The computed visibility value.
 * @param {boolean|"absent"} [overrides.checkVisibility] Return value of `checkVisibility`, or `"absent"` to omit the API.
 * @param {{width: number, height: number}} [overrides.rect] The bounding rectangle.
 * @returns {HTMLElement}
 */
function buildElement({
  opacity = "1",
  display = "block",
  visibility = "visible",
  checkVisibility = true,
  rect = { width: 100, height: 20 },
} = {}) {
  const element = document.createElement("input");

  jest.spyOn(window, "getComputedStyle").mockReturnValue({ opacity, display, visibility });

  // Define an own property so `typeof` resolves against our value rather than jsdom's prototype
  // implementation. `"absent"` forces the legacy fallback branch by removing the API.
  Object.defineProperty(element, "checkVisibility", {
    configurable: true,
    value: checkVisibility === "absent" ? undefined : jest.fn().mockReturnValue(checkVisibility),
  });

  jest.spyOn(element, "getBoundingClientRect").mockReturnValue(rect);

  return element;
}

describe("ElementVisibilityService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });


  describe("ElementVisibilityService::isElementViewable", () => {
    it("should return true for a fully visible element", () => {
      expect.assertions(1);

      expect(ElementVisibilityService.isElementViewable(buildElement())).toBe(true);
    });

    it.each([
      { label: "null", node: null },
      { label: "undefined", node: undefined },
      { label: "a text node", node: document.createTextNode("hello") },
      { label: "a document", node: document },
    ])("should return false and not throw for $label", ({ node }) => {
      expect.assertions(1);

      expect(ElementVisibilityService.isElementViewable(node)).toBe(false);
    });

    it("should return false when the opacity is below the threshold", () => {
      expect.assertions(1);

      const element = buildElement({ opacity: "0.01" });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
    });

    it("should return false when the opacity sits just below the threshold", () => {
      expect.assertions(1);

      const element = buildElement({ opacity: "0.39" });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
    });

    it("should return true when the opacity is exactly at the threshold", () => {
      expect.assertions(1);

      const element = buildElement({ opacity: String(OPACITY_VISIBILITY_THRESHOLD) });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(true);
    });

    it.each(["", "auto"])("should not reject on opacity when the computed value is not finite (%p)", (opacity) => {
      expect.assertions(1);

      const element = buildElement({ opacity });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(true);
    });

    it("should skip the layout check when the opacity check fails (early exit)", () => {
      expect.assertions(1);

      const element = buildElement({ opacity: "0" });
      ElementVisibilityService.isElementViewable(element);

      expect(element.getBoundingClientRect).not.toHaveBeenCalled();
    });

    it("should use the native checkVisibility API with strict flags when available", () => {
      expect.assertions(2);

      const element = buildElement({ checkVisibility: true });
      ElementVisibilityService.isElementViewable(element);

      expect(element.checkVisibility).toHaveBeenCalledTimes(1);
      expect(element.checkVisibility).toHaveBeenCalledWith({
        checkOpacity: true,
        checkVisibilityCSS: true,
        opacityProperty: true,
        visibilityProperty: true,
        contentVisibilityAuto: true,
      });
    });

    it("should return false when the native checkVisibility API reports the element as hidden", () => {
      expect.assertions(1);

      const element = buildElement({ checkVisibility: false });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
    });

    it("should not resolve computed style nor layout when checkVisibility rejects the element", () => {
      expect.assertions(2);

      const element = buildElement({ checkVisibility: false });
      ElementVisibilityService.isElementViewable(element);

      expect(window.getComputedStyle).not.toHaveBeenCalled();
      expect(element.getBoundingClientRect).not.toHaveBeenCalled();
    });

    it("should not apply the legacy display check when checkVisibility is available", () => {
      expect.assertions(1);

      // Contradictory stub on purpose: the native check is authoritative on the modern path, so the
      // legacy display/visibility branch must not run. Pins the `!hasNativeCheck` guard.
      const element = buildElement({ checkVisibility: true, display: "none" });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(true);
    });

    it("should fall back to computed styles when checkVisibility is unavailable", () => {
      expect.assertions(1);

      const element = buildElement({ checkVisibility: "absent" });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(true);
    });

    it("should return false via the legacy fallback when display is none", () => {
      expect.assertions(1);

      const element = buildElement({ checkVisibility: "absent", display: "none" });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
    });

    it.each(["hidden", "collapse"])(
      "should return false via the legacy fallback when visibility is %s",
      (visibility) => {
        expect.assertions(1);

        const element = buildElement({ checkVisibility: "absent", visibility });

        expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
      },
    );

    it.each([
      { width: 0, height: 20 },
      { width: 100, height: 0 },
      { width: 0, height: 0 },
      { width: 0.5, height: 20 },
      { width: 100, height: 0.5 },
    ])("should return false for a zero-sized or sub-pixel element (%o)", (rect) => {
      expect.assertions(1);

      const element = buildElement({ rect });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(false);
    });

    it.each([
      { width: MIN_VIEWABLE_DIMENSION_PX, height: MIN_VIEWABLE_DIMENSION_PX },
      { width: 100, height: 20 },
    ])("should return true for an element at or above the minimum dimension (%o)", (rect) => {
      expect.assertions(1);

      const element = buildElement({ rect });

      expect(ElementVisibilityService.isElementViewable(element)).toBe(true);
    });
  });
});
