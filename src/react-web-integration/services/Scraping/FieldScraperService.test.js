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

import FieldScraperService from "./FieldScraperService";
import LabelScraperService from "./LabelScraperService";
import ScrapingCacheService from "./ScrapingCacheService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import { MAX_SCRAPED_STRING_LENGTH } from "../../lib/InForm/ScrapingDictionary";

/**
 * Create an input carrying the given attributes and append it to the document (connected).
 * @param {Object<string, string>} [attributes] The attributes to set.
 * @param {string} [tagName] The control tag to create.
 * @returns {HTMLElement} The connected element.
 */
function field(attributes = {}, tagName = "input") {
  const element = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  document.body.appendChild(element);
  return element;
}

describe("FieldScraperService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    // enrich()'s ancestor tier pierces shadow roots through the cache; keep it isolated and observer-free.
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();
    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    ScrapingCacheService._payloadByElement = new WeakMap();
    ScrapingCacheService._keywordsByElement = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("FieldScraperService::build", () => {
    it("should assemble the structural core, inheriting the formId and issuing a fieldId", () => {
      expect.assertions(4);

      const element = field({ id: "email", name: "email", class: "form-control", role: "textbox" });

      const record = FieldScraperService.build(element, "form_0");

      expect(record.fieldId).toEqual("field_0");
      expect(record.formId).toEqual("form_0");
      expect(record.tagName).toEqual("INPUT");
      expect(record.attributes).toMatchObject({ id: "email", name: "email", class: "form-control", role: "textbox" });
    });

    it("should default an untyped input to text and lowercase an explicit type", () => {
      expect.assertions(3);

      expect(FieldScraperService.build(field(), "form_0").type).toEqual("text");
      expect(FieldScraperService.build(field({ type: "EMAIL" }), "form_0").type).toEqual("email");
      // A non-input control (e.g. contenteditable) carries no type at all.
      expect(FieldScraperService.build(field({}, "div"), "form_0").type).toEqual("");
    });

    it("should capture native booleans and normalise maxLength to null when unset", () => {
      expect.assertions(4);

      const required = FieldScraperService.build(field({ required: "", maxlength: "12" }), "form_0");
      expect(required.attributes.required).toBe(true);
      expect(required.attributes.maxLength).toEqual(12);

      const bare = FieldScraperService.build(field(), "form_0");
      expect(bare.attributes.required).toBe(false);
      expect(bare.attributes.maxLength).toBeNull();
    });

    it("should elect a normalised autoComplete from the legacy variants, trimmed and lowercased", () => {
      expect.assertions(2);

      // `autocomplete` itself absent — the value must be picked from a legacy variant and normalised,
      // which also proves it is distinct from the raw `attributes.autocomplete`.
      const record = FieldScraperService.build(field({ autocompletetype: "  Username " }), "form_0");

      expect(record.autoComplete).toEqual("username");
      expect(record.attributes.autocomplete).toEqual("");
    });

    it("should flag a vendor opt-out marker", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({ "data-1p-ignore": "" }), "form_0").optOut).toBe(true);
      expect(FieldScraperService.build(field(), "form_0").optOut).toBe(false);
    });

    it("should clip an overlong attribute to MAX_SCRAPED_STRING_LENGTH", () => {
      expect.assertions(1);

      const record = FieldScraperService.build(field({ name: "a".repeat(MAX_SCRAPED_STRING_LENGTH + 500) }), "form_0");

      expect(record.attributes.name).toHaveLength(MAX_SCRAPED_STRING_LENGTH);
    });

    it("should delegate label election to LabelScraperService, passing the element on the payload", () => {
      expect.assertions(3);

      let elementAtEnrich;
      jest.spyOn(LabelScraperService, "enrich").mockImplementation((payload) => {
        elementAtEnrich = payload.element;
        payload.label = { text: "Email", source: "_placeholder" };
        payload.ariaState = {};
        return payload;
      });
      const element = field();

      const record = FieldScraperService.build(element, "form_0");

      expect(LabelScraperService.enrich).toHaveBeenCalledTimes(1);
      expect(elementAtEnrich).toBe(element); // element attached transiently for enrich
      expect(record.label).toEqual({ text: "Email", source: "_placeholder" });
    });

    it("should end-to-end elect the placeholder as label and capture the ARIA state", () => {
      expect.assertions(2);

      const record = FieldScraperService.build(field({ placeholder: "Email" }), "form_0");

      expect(record.label).toEqual({ text: "Email", source: "_placeholder" });
      expect(record.ariaState).toMatchObject({ describedBy: "", hidden: false, disabled: false });
    });

    it("should never carry the live element reference on the returned record (cache GC safety)", () => {
      expect.assertions(1);

      const record = FieldScraperService.build(field(), "form_0");

      expect(record).not.toHaveProperty("element");
    });

    it("should never read nor expose the field value (value-free security guarantee)", () => {
      expect.assertions(3);

      const element = field({ value: "s3cr3t-attr" });
      element.value = "s3cr3t-prop";

      const record = FieldScraperService.build(element, "form_0");

      expect(record).not.toHaveProperty("value");
      expect(record).not.toHaveProperty("hasValue");
      expect(JSON.stringify(record)).not.toContain("s3cr3t");
    });

    it("should capture the remaining structural attributes verbatim", () => {
      expect.assertions(5);

      const element = field({ pattern: "[0-9]+", inputmode: "numeric", readonly: "", tabindex: "3", class: "a b" });
      const record = FieldScraperService.build(element, "form_0");

      expect(record.attributes.pattern).toEqual("[0-9]+");
      expect(record.attributes.inputMode).toEqual("numeric");
      expect(record.attributes.readonly).toBe(true);
      expect(record.attributes.tabIndex).toEqual(3);
      expect(record.attributes.class).toEqual("a b");
    });

    it("should capture the disabled state from the attribute and default it to false", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({ disabled: "" }), "form_0").attributes.disabled).toBe(true);
      expect(FieldScraperService.build(field(), "form_0").attributes.disabled).toBe(false);
    });

    it("should capture every inputDescription descriptor from its attribute", () => {
      expect.assertions(2);

      const element = field({
        placeholder: "Email",
        "aria-label": "E-mail",
        "aria-labelledby": "lbl",
        "aria-describedby": "desc",
        "aria-details": "det",
        title: "Your email",
        alt: "alt text",
      });
      const record = FieldScraperService.build(element, "form_0");

      expect(record.inputDescription).toMatchObject({
        placeholder: "Email",
        ariaLabel: "E-mail",
        ariaLabelledby: "lbl",
        ariaDescribedby: "desc",
        ariaDetails: "det",
        title: "Your email",
        alt: "alt text",
      });
      expect(record.inputDescription.innerText).toEqual(""); // an <input> has no text content to echo
    });

    it("should elect autoComplete by AUTOCOMPLETE_ATTRS precedence, distinct from the raw attribute", () => {
      expect.assertions(2);

      // `autocomplete` wins over the legacy variants and is lowercased...
      const element = field({ autocomplete: "Username", autocompletetype: "email" });

      expect(FieldScraperService.build(element, "form_0").autoComplete).toEqual("username");
      // ...while the raw `attributes.autocomplete` keeps its original casing.
      expect(FieldScraperService.build(element, "form_0").attributes.autocomplete).toEqual("Username");
    });

    it("should fall through to a later autocomplete variant when earlier ones are empty or absent", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({ "x-autocompletetype": "tel" }), "form_0").autoComplete).toEqual("tel");
      // present-but-empty `autocomplete=""` is skipped (find(Boolean)) → the next present variant is elected.
      expect(
        FieldScraperService.build(field({ autocomplete: "", autocompletetype: "email" }), "form_0").autoComplete,
      ).toEqual("email");
    });

    it("should lowercase dataFormType and default it to empty", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({ "data-form-type": "LOGIN" }), "form_0").dataFormType).toEqual("login");
      expect(FieldScraperService.build(field(), "form_0").dataFormType).toEqual("");
    });

    it("should flag opt-out for each vendor marker", () => {
      expect.assertions(3);

      expect(FieldScraperService.build(field({ "data-lpignore": "true" }), "form_0").optOut).toBe(true);
      expect(FieldScraperService.build(field({ "data-1p-ignore": "" }), "form_0").optOut).toBe(true);
      expect(FieldScraperService.build(field({ "data-bwignore": "" }), "form_0").optOut).toBe(true);
    });

    it("should map maxLength to null for maxlength=0 and for a non-input control", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({ maxlength: "0" }), "form_0").attributes.maxLength).toBeNull();
      expect(FieldScraperService.build(field({}, "div"), "form_0").attributes.maxLength).toBeNull();
    });

    it("should carry no type for non-input controls (textarea / select)", () => {
      expect.assertions(2);

      expect(FieldScraperService.build(field({}, "textarea"), "form_0").type).toEqual("");
      expect(FieldScraperService.build(field({}, "select"), "form_0").type).toEqual("");
    });

    it("should keep a value exactly at the length cap and coerce an absent attribute to empty", () => {
      expect.assertions(2);

      const exact = FieldScraperService.build(field({ name: "a".repeat(MAX_SCRAPED_STRING_LENGTH) }), "form_0");

      expect(exact.attributes.name).toHaveLength(MAX_SCRAPED_STRING_LENGTH);
      expect(FieldScraperService.build(field(), "form_0").attributes.name).toEqual("");
    });

    it("should issue a stable fieldId for the same element and distinct ids for different elements", () => {
      expect.assertions(3);

      const element = field();
      const first = FieldScraperService.build(element, "form_0").fieldId;
      const again = FieldScraperService.build(element, "form_0").fieldId;
      const other = FieldScraperService.build(field(), "form_0").fieldId;

      expect(first).toEqual("field_0");
      expect(again).toEqual(first);
      expect(other).not.toEqual(first);
    });
  });

  describe("FieldScraperService::scrape", () => {
    it("should build then cache the payload on a cache miss", () => {
      expect.assertions(2);

      const element = field({ placeholder: "Email" });

      const record = FieldScraperService.scrape(element, "form_0");

      expect(record.formId).toEqual("form_0");
      expect(ScrapingCacheService.getField(element)).toBe(record);
    });

    it("should return the cached payload, without rebuilding, when still bound to the same form", () => {
      expect.assertions(2);

      const element = field();
      const cached = { formId: "form_0", marker: true };
      ScrapingCacheService.setField(element, cached);
      jest.spyOn(FieldScraperService, "build");

      const record = FieldScraperService.scrape(element, "form_0");

      expect(record).toBe(cached);
      expect(FieldScraperService.build).not.toHaveBeenCalled();
    });

    it("should re-scrape when the field is now attributed to a different form", () => {
      expect.assertions(3);

      const element = field();
      ScrapingCacheService.setField(element, { formId: "form_0", marker: true });

      const record = FieldScraperService.scrape(element, "form_1");

      expect(record.marker).toBeUndefined();
      expect(record.formId).toEqual("form_1");
      expect(ScrapingCacheService.getField(element)).toBe(record);
    });

    it("should overwrite the cache on re-scrape so the next lookup returns the new payload", () => {
      expect.assertions(2);

      const element = field();
      ScrapingCacheService.setField(element, { formId: "form_0", marker: true });

      const rescraped = FieldScraperService.scrape(element, "form_1");

      expect(ScrapingCacheService.getField(element)).toBe(rescraped);
      expect(ScrapingCacheService.getField(element).marker).toBeUndefined();
    });

    it("should cache two distinct elements independently", () => {
      expect.assertions(2);

      const a = field();
      const b = field();
      const recordA = FieldScraperService.scrape(a, "form_0");
      const recordB = FieldScraperService.scrape(b, "form_0");

      expect(ScrapingCacheService.getField(a)).toBe(recordA);
      expect(ScrapingCacheService.getField(b)).toBe(recordB);
    });

    it("should produce a complete, element-free, label-enriched payload end-to-end via the real enrich", () => {
      expect.assertions(3);

      const record = FieldScraperService.scrape(field({ placeholder: "Email" }), "form_0");

      expect(record.label).toEqual({ text: "Email", source: "_placeholder" });
      expect(record.ariaState).toMatchObject({ hidden: false, disabled: false });
      expect(record).not.toHaveProperty("element");
    });
  });
});
