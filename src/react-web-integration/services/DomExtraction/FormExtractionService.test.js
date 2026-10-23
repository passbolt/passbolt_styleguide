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

import FormExtractionService from "./FormExtractionService";
import ElementVisibilityService from "./ElementVisibilityService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";

describe("FormExtractionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("FormExtractionService::_toSkeleton", () => {
    it("should default the fields to an empty array", () => {
      expect.assertions(3);

      const container = document.createElement("form");
      const skeleton = FormExtractionService._toSkeleton(container);

      expect(skeleton.containerElement).toBe(container);
      expect(skeleton.fields).toEqual([]);
      expect(skeleton.isPseudoForm).toBe(false);
    });

    it("should assign the provided fields", () => {
      expect.assertions(1);

      const fields = [{ element: document.createElement("input"), isViewable: true }];

      expect(FormExtractionService._toSkeleton(document.createElement("form"), fields).fields).toBe(fields);
    });
  });

  describe("FormExtractionService::aggregateForms", () => {
    it("should return an empty array on a page with no form", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><span>no form here</span></div>";

      expect(FormExtractionService.aggregateForms()).toEqual([]);
    });

    it("should return a skeleton for a form with a viewable text field", () => {
      expect.assertions(4);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      document.body.innerHTML = "<form><input type='text'/></form>";
      const form = document.querySelector("form");

      const result = FormExtractionService.aggregateForms();

      expect(result.length).toEqual(1);
      expect(result[0].containerElement).toBe(form);
      expect(result[0].isPseudoForm).toBe(false);
      // aggregateForms emits a skeleton; fields[] is populated downstream by FieldAggregatorService.
      expect(result[0].fields).toEqual([]);
    });

    it("should keep the custom wrapper when a form is nested inside of it", () => {
      expect.assertions(2);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      document.body.innerHTML = "<div role='form'><form><input type='text'/></form></div>";
      const wrapper = document.querySelector("[role='form']");

      const result = FormExtractionService.aggregateForms();

      expect(result.length).toEqual(1);
      expect(result[0].containerElement).toBe(wrapper);
    });

    it("should keep both a native form and a custom wrapper nested inside it", () => {
      expect.assertions(3);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      document.body.innerHTML = "<form><div role='form'><input type='text'/></div></form>";
      const form = document.querySelector("form");
      const wrapper = document.querySelector("[role='form']");

      const containers = FormExtractionService.aggregateForms().map((record) => record.containerElement);

      expect(containers.length).toEqual(2);
      expect(containers).toContain(form);
      expect(containers).toContain(wrapper);
    });

    it("should ignore a container with 60 or more text fields", () => {
      expect.assertions(1);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      const inputs = Array.from({ length: 60 }, () => "<input type='text'/>").join("");
      // eslint-disable-next-line no-unsanitized/property
      document.body.innerHTML = `<form>${inputs}</form>`;

      expect(FormExtractionService.aggregateForms()).toEqual([]);
    });

    it("should ignore a container without any viewable field", () => {
      expect.assertions(1);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(false);
      document.body.innerHTML = "<form><input type='text'/></form>";

      expect(FormExtractionService.aggregateForms()).toEqual([]);
    });
  });
});
