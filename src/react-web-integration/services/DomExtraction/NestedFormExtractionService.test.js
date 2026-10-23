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

import NestedFormExtractionService from "./NestedFormExtractionService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";

describe("NestedFormExtractionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("NestedFormExtractionService::captureNestedForms", () => {
    it("should return the form-like containers nested inside the container", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><form></form><div role='form'></div></div>";
      const container = document.getElementById("container");
      const form = document.querySelector("form");
      const customForm = document.querySelector("[role='form']");

      expect(NestedFormExtractionService.captureNestedForms(container)).toEqual([form, customForm]);
    });

    it("should return an empty array when the container has no form", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><input type='text'/></div>";
      const container = document.getElementById("container");

      expect(NestedFormExtractionService.captureNestedForms(container)).toEqual([]);
    });

    it("should not return the container itself", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'><div role='form'></div></form>";
      const container = document.getElementById("container");
      const customForm = document.querySelector("[role='form']");

      expect(NestedFormExtractionService.captureNestedForms(container)).toEqual([customForm]);
    });

    it("should return form-like containers nested inside a shadow root", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'></div>";
      const container = document.getElementById("container");
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const form = document.createElement("form");
      shadowRoot.appendChild(form);
      container.appendChild(host);

      expect(NestedFormExtractionService.captureNestedForms(container)).toEqual([form]);
    });

    it("should return nested form-like containers at every depth", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><form><div role='form'></div></form></div>";
      const container = document.getElementById("container");
      const form = document.querySelector("form");
      const customForm = document.querySelector("[role='form']");

      expect(NestedFormExtractionService.captureNestedForms(container)).toEqual([form, customForm]);
    });
  });

  describe("NestedFormExtractionService::isDeepestFormContainer", () => {
    it("should return true when there is no nested form", () => {
      expect.assertions(1);

      const field = document.createElement("input");

      expect(NestedFormExtractionService.isDeepestFormContainer(field, [])).toBe(true);
    });

    it("should return true when no nested form contains the field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><form></form><input type='text'/></div>";
      const container = document.getElementById("container");
      const field = document.querySelector("input");
      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(true);
    });

    it("should return true when the nested form containing the field is masked by a custom form ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div role='form' id='container'><form><input type='text'/></form></div>";
      const container = document.getElementById("container");
      const field = document.querySelector("input");
      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(true);
    });

    it("should return true when several nested forms exist but none contains the field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><form></form><div role='form'></div><input type='text'/></div>";
      const container = document.getElementById("container");
      const field = document.querySelector("input");
      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(true);
    });

    it("should return false when an unmasked nested form contains the field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'><div role='form'><input type='text'/></div></form>";
      const container = document.getElementById("container");
      const field = document.querySelector("input");
      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(false);
    });

    it("should return false when an unmasked nested form contains the field through a shadow boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'></div>";
      const container = document.getElementById("container");
      const form = document.createElement("form");
      container.appendChild(form);
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const field = document.createElement("input");
      shadowRoot.appendChild(field);
      form.appendChild(host);

      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(false);
    });

    it("should return false when a masked and an unmasked nested form both contain the field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><div role='form'><form><input type='text'/></form></div></div>";
      const container = document.getElementById("container");
      const field = document.querySelector("input");
      const nestedForms = NestedFormExtractionService.captureNestedForms(container);

      expect(NestedFormExtractionService.isDeepestFormContainer(field, nestedForms)).toBe(false);
    });
  });
});
