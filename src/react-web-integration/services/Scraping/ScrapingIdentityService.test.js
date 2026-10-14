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

import ScrapingIdentityService, { FIELD_ID_PREFIX, FORM_ID_PREFIX } from "./ScrapingIdentityService";

/**
 * Append a freshly created element to the document so it reports `isConnected === true`.
 * @param {string} [tagName] The tag to create.
 * @returns {Element} The connected element.
 */
function connected(tagName = "input") {
  const element = document.createElement(tagName);
  document.body.appendChild(element);
  return element;
}

describe("ScrapingIdentityService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    document.body.innerHTML = "";
  });

  describe("ScrapingIdentityService::idFor", () => {
    it("should issue a prefixed, sequence-suffixed id on the first call", () => {
      expect.assertions(1);

      expect(ScrapingIdentityService.idFor(connected(), "el")).toEqual("el_0");
    });

    it("should return the cached id on subsequent calls for the same element", () => {
      expect.assertions(2);

      const element = connected();
      const first = ScrapingIdentityService.idFor(element, "el");
      const second = ScrapingIdentityService.idFor(element, "el");

      expect(second).toEqual(first);
      expect(ScrapingIdentityService._seq).toEqual(1);
    });

    it("should ignore the prefix once an element already has an id", () => {
      expect.assertions(1);

      const element = connected();
      ScrapingIdentityService.idFor(element, "el");

      expect(ScrapingIdentityService.idFor(element, "other")).toEqual("el_0");
    });

    it("should issue distinct ids from a shared counter across elements and prefixes", () => {
      expect.assertions(3);

      const a = connected();
      const b = connected();

      expect(ScrapingIdentityService.idFor(a, "field")).toEqual("field_0");
      expect(ScrapingIdentityService.idFor(b, "form")).toEqual("form_1");
      expect(ScrapingIdentityService._seq).toEqual(2);
    });

    it("should issue sequential ids for distinct elements sharing the same prefix", () => {
      expect.assertions(2);

      expect(ScrapingIdentityService.idFor(connected(), "field")).toEqual("field_0");
      expect(ScrapingIdentityService.idFor(connected(), "field")).toEqual("field_1");
    });

    it("should register the new id in the reverse lookup registry", () => {
      expect.assertions(1);

      const id = ScrapingIdentityService.idFor(connected(), "el");

      expect(ScrapingIdentityService._elementById.has(id)).toBe(true);
    });

    it.each([
      { scenario: "null", node: null },
      { scenario: "undefined", node: undefined },
      { scenario: "a text node", node: document.createTextNode("text") },
      { scenario: "the document", node: document },
    ])("should return null and register nothing for $scenario", ({ node }) => {
      expect.assertions(2);

      expect(ScrapingIdentityService.idFor(node, "el")).toBeNull();
      expect(ScrapingIdentityService._seq).toEqual(0);
    });

    it("should not mutate the element (zero DOM pollution)", () => {
      expect.assertions(2);

      const element = connected();
      const before = element.outerHTML;
      ScrapingIdentityService.idFor(element, "el");

      expect(element.getAttributeNames()).toEqual([]);
      expect(element.outerHTML).toEqual(before);
    });
  });

  describe("ScrapingIdentityService::elementFor", () => {
    it("should resolve the id back to its live, connected element", () => {
      expect.assertions(1);

      const element = connected();
      const id = ScrapingIdentityService.idFor(element, "el");

      expect(ScrapingIdentityService.elementFor(id)).toBe(element);
    });

    it("should return null for an unknown id", () => {
      expect.assertions(1);

      expect(ScrapingIdentityService.elementFor("unknown_42")).toBeNull();
    });

    it("should resolve each id to its own element without cross-talk", () => {
      expect.assertions(2);

      const a = connected();
      const b = connected();
      const idA = ScrapingIdentityService.idFor(a, "el");
      const idB = ScrapingIdentityService.idFor(b, "el");

      expect(ScrapingIdentityService.elementFor(idA)).toBe(a);
      expect(ScrapingIdentityService.elementFor(idB)).toBe(b);
    });

    it("should return null and purge the entry when the element has been detached", () => {
      expect.assertions(2);

      const element = connected();
      const id = ScrapingIdentityService.idFor(element, "el");
      element.remove();

      expect(ScrapingIdentityService.elementFor(id)).toBeNull();
      expect(ScrapingIdentityService._elementById.has(id)).toBe(false);
    });

    it("should return null and purge the entry when the element has been garbage collected", () => {
      expect.assertions(2);

      const id = ScrapingIdentityService.idFor(connected(), "el");
      // Simulate the WeakRef target being collected: deref() yields undefined.
      jest.spyOn(WeakRef.prototype, "deref").mockReturnValue(undefined);

      expect(ScrapingIdentityService.elementFor(id)).toBeNull();
      expect(ScrapingIdentityService._elementById.has(id)).toBe(false);
    });

    it("should resolve repeatedly while the element stays connected", () => {
      expect.assertions(2);

      const element = connected();
      const id = ScrapingIdentityService.idFor(element, "el");

      expect(ScrapingIdentityService.elementFor(id)).toBe(element);
      expect(ScrapingIdentityService.elementFor(id)).toBe(element);
    });
  });

  describe("ScrapingIdentityService::fieldId", () => {
    it("should issue an id prefixed with the field prefix", () => {
      expect.assertions(1);

      expect(ScrapingIdentityService.fieldId(connected())).toEqual(`${FIELD_ID_PREFIX}_0`);
    });

    it("should round-trip through elementFor", () => {
      expect.assertions(1);

      const element = connected();

      expect(ScrapingIdentityService.elementFor(ScrapingIdentityService.fieldId(element))).toBe(element);
    });

    it("should return null for a non-element node", () => {
      expect.assertions(1);

      expect(ScrapingIdentityService.fieldId(null)).toBeNull();
    });
  });

  describe("ScrapingIdentityService::formId", () => {
    it("should issue an id prefixed with the form prefix", () => {
      expect.assertions(1);

      expect(ScrapingIdentityService.formId(connected("form"))).toEqual(`${FORM_ID_PREFIX}_0`);
    });

    it("should round-trip through elementFor", () => {
      expect.assertions(1);

      const element = connected("form");

      expect(ScrapingIdentityService.elementFor(ScrapingIdentityService.formId(element))).toBe(element);
    });
  });
});
