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

import LabelScraper from "./LabelScraper";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import { MAX_SCRAPED_STRING_LENGTH } from "../../lib/InForm/ScrapingDictionary";

/**
 * Build a minimal FieldScraping payload around a field element.
 * @param {Element} element The field element.
 * @param {{placeholder?: string}} [inputDescription] The Phase 1 attributes.
 * @returns {{element: Element, inputDescription: object}}
 */
function fieldScraping(element, inputDescription = {}) {
  return { element, inputDescription };
}

describe("LabelScraper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // fieldCount() (ancestor tier) pierces shadow roots via the cache; keep it isolated and observer-free.
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();
    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("LabelScraper::enrich", () => {
    it("should be a no-op returning the payload when it carries no element", () => {
      expect.assertions(2);

      const payload = { element: null };

      expect(LabelScraper.enrich(payload)).toBe(payload);
      expect(payload.label).toBeUndefined();
    });

    it("should tolerate a nullish payload", () => {
      expect.assertions(1);

      expect(LabelScraper.enrich(undefined)).toBeUndefined();
    });

    it("should attach both the elected label and the aria state to the payload", () => {
      expect.assertions(3);

      document.body.innerHTML = "<label>Email<input id='a'/></label>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_explicit" });
      expect(payload.ariaState).toBeDefined();
      expect(payload.ariaState.hidden).toBe(false);
    });

    it("should record an empty label with a null source when no tier matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });
  });

  describe("LabelScraper::_electLabel cascade order", () => {
    it("should prefer the explicit label over every lower tier", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label>Explicit<input id='a' aria-label='Aria' placeholder='Placeholder'/></label>";
      const payload = fieldScraping(document.querySelector("input"), { placeholder: "Placeholder" });

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Explicit", source: "_explicit" });
    });

    it("should fall back to the placeholder when explicit, sibling and — no earlier — sources are empty", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input id='a' aria-label='Aria'/></div>";
      const payload = fieldScraping(document.querySelector("input"), { placeholder: "Placeholder" });

      // Sibling is empty (no preceding node), so placeholder (tier 3) wins over aria (tier 4).
      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Placeholder", source: "_placeholder" });
    });
  });

  describe("LabelScraper::_explicit", () => {
    it("should read the label associated through the native `.labels` API", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label for='a'>Email</label><input id='a'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_explicit" });
    });

    it("should strip the field value out of a wrapping label", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label>Email<input id='a' value='user@passbolt.com'/></label>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_explicit" });
    });

    it("should resolve a `for` association by name when the native `.labels` API is empty", () => {
      expect.assertions(1);

      // `for="uname"` matches the field name, not its id, so `.labels` stays empty and the root lookup wins.
      document.body.innerHTML = "<label for='uname'>Username</label><input id='x' name='uname'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Username", source: "_explicit" });
    });

    it("should escape special characters when resolving a `for` association", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label for='a.b[0]'>Email</label><input id='x' name='a.b[0]'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_explicit" });
    });
  });

  describe("LabelScraper::_sibling", () => {
    it("should read a preceding text node", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>Username <input id='a'/></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Username", source: "_sibling" });
    });

    it("should stop at the previous form control boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>Name <input id='p'/> Surname <input id='a'/></div>";
      const payload = fieldScraping(document.querySelector("#a"));

      // Walking back hits the text " Surname " then the boundary input `#p`, so "Name" is never collected.
      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Surname", source: "_sibling" });
    });

    it("should skip irrelevant tags while collecting sibling text", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><a href='#'>help</a> Email <input id='a'/></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_sibling" });
    });

    it("should treat a sibling wrapping a control as a boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><span>previous field<input id='p'/></span> Email <input id='a'/></div>";
      const payload = fieldScraping(document.querySelector("#a"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Email", source: "_sibling" });
    });
  });

  describe("LabelScraper::_placeholder", () => {
    it("should reuse the placeholder captured in the input description", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input id='a'/></div>";
      const payload = fieldScraping(document.querySelector("input"), { placeholder: "Your email" });

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Your email", source: "_placeholder" });
    });

    it("should not read the placeholder from the DOM when the input description omits it", () => {
      expect.assertions(1);

      // A live placeholder attribute is deliberately ignored: the tier only recycles the pre-scraped value.
      document.body.innerHTML = "<div><input id='a' placeholder='From DOM'/></div>";
      const payload = fieldScraping(document.querySelector("input"), {});

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });
  });

  describe("LabelScraper::_aria", () => {
    it("should read the direct aria-label", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input id='a' aria-label='Search'/></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Search", source: "_aria" });
    });

    it("should resolve aria-labelledby references within the root", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<span id='lbl'>Full name</span><section><input id='a' aria-labelledby='lbl'/></section>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Full name", source: "_aria" });
    });

    it("should concatenate several aria-labelledby references in order", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<span id='one'>Billing</span><span id='two'>address</span>" +
        "<section><input id='a' aria-labelledby='one two'/></section>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Billing address", source: "_aria" });
    });
  });

  describe("LabelScraper::_ancestor", () => {
    it("should read the label text from a wrapping container", () => {
      expect.assertions(1);

      // The field is nested in an inner span so no direct sibling/text tier can match first.
      document.body.innerHTML = "<div>Country<span><input id='a'/></span></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Country", source: "_ancestor" });
    });

    it("should reject an ancestor wrapping more than one field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>Credentials<span><input id='a'/><input id='b'/></span></div>";
      const payload = fieldScraping(document.querySelector("#a"));

      // The only ancestor holding text (the div) wraps two fields, so it is too broad to name one.
      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });

    it("should strip the nested field values from the ancestor text", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>City<span><input id='a' value='Paris'/></span></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "City", source: "_ancestor" });
    });
  });

  describe("LabelScraper::_ariaState", () => {
    it("should capture the described-by text and the state flags", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<span id='hint'>Min 8 chars</span>" +
        "<input id='a' aria-describedby='hint' aria-hidden='true' aria-disabled='true' aria-haspopup='listbox'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState).toEqual({
        describedBy: "Min 8 chars",
        hidden: true,
        disabled: true,
        hasPopup: "listbox",
      });
    });

    it("should default every flag when no aria state is present", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState).toEqual({
        describedBy: "",
        hidden: false,
        disabled: false,
        hasPopup: false,
      });
    });

    it("should normalise aria-haspopup='true' to a boolean", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a' aria-haspopup='true'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState.hasPopup).toBe(true);
    });

    it("should treat a non-'true' aria-hidden as not hidden", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a' aria-hidden='false'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState.hidden).toBe(false);
    });
  });

  describe("LabelScraper shadow DOM", () => {
    it("should resolve a `for` association within the field's shadow root", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div></div>";
      const host = document.querySelector("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<label for='uname'>Shadow user</label><input id='x' name='uname'/>";
      const payload = fieldScraping(shadowRoot.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Shadow user", source: "_explicit" });
    });

    it("should climb a wrapping label across the shadow boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div></div>";
      const host = document.querySelector("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<label>Shadow email<span><input id='a'/></span></label>";
      const payload = fieldScraping(shadowRoot.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Shadow email", source: "_explicit" });
    });
  });

  describe("LabelScraper read-only guarantees", () => {
    it("should not mutate the host DOM while scraping", () => {
      expect.assertions(3);

      document.body.innerHTML = "<label>Email<input id='a'/><button>Go</button></label>";
      const label = document.querySelector("label");
      const payload = fieldScraping(label.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(label.querySelector("input")).not.toBeNull();
      expect(label.querySelector("button")).not.toBeNull();
      expect(payload.element.attributes.length).toBe(1); // only the original id.
    });

    it("should cap an overly long scraped label at the dictionary limit", () => {
      expect.assertions(1);

      const long = "a".repeat(MAX_SCRAPED_STRING_LENGTH + 50);
      const input = document.createElement("input");
      input.setAttribute("aria-label", long);
      document.body.appendChild(input);
      const payload = fieldScraping(input);

      LabelScraper.enrich(payload);

      expect(payload.label.text.length).toBe(MAX_SCRAPED_STRING_LENGTH);
    });
  });
});
