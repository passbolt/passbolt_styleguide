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
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
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

/**
 * Append to document.body a chain of `depth` nested <div>s whose OUTERMOST div carries `labelText` as
 * leading text and whose innermost holds a fresh <input>. The labelled outer div is the input's
 * `depth`-th ancestor (immediate parent = hop 0), so `depth` sets the hop distance to the label.
 * @param {number} depth The number of nested divs.
 * @param {string} labelText The text carried by the outermost div.
 * @returns {HTMLInputElement} The nested input.
 */
function nestedAncestorLabel(depth, labelText) {
  const outer = document.createElement("div");
  outer.append(labelText);

  let current = outer;
  for (let i = 1; i < depth; i++) {
    const div = document.createElement("div");
    current.appendChild(div);
    current = div;
  }

  const input = document.createElement("input");
  current.appendChild(input);
  document.body.appendChild(outer);

  return input;
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

    it("should escape a `for` value via the polyfill when CSS.escape is unavailable", () => {
      expect.assertions(1);

      // jsdom always ships CSS.escape; drop it to exercise the backslash-escaping polyfill branch.
      const originalCss = globalThis.CSS;
      globalThis.CSS = undefined;

      try {
        document.body.innerHTML = "<label for='a.b[0]'>Email</label><input id='x' name='a.b[0]'/>";
        const payload = fieldScraping(document.querySelector("input"));

        LabelScraper.enrich(payload);

        expect(payload.label).toEqual({ text: "Email", source: "_explicit" });
      } finally {
        globalThis.CSS = originalCss;
      }
    });

    it("should read a wrapping label found by climbing when native `.labels` is unavailable", () => {
      expect.assertions(2);

      // A hidden field exposes no usable `.labels` and has no `for=`, so the wrapping label is only
      // reachable through the shadow-piercing closestDeep climb.
      document.body.innerHTML = "<label>Hidden email<input id='a' type='hidden'/></label>";
      const closestSpy = jest.spyOn(ShadowDomQueryService, "closestDeep");
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Hidden email", source: "_explicit" });
      expect(closestSpy).toHaveBeenCalledWith(payload.element, "label");
    });

    it("should fall through to the wrapping label when the `for` association resolves to blank text", () => {
      expect.assertions(1);

      // The `for=` target holds only whitespace; it must not short-circuit the tier — the wrapping
      // label is the real name.
      document.body.innerHTML =
        "<label for='uname'>   </label><label>Username<input id='x' name='uname' type='hidden'/></label>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Username", source: "_explicit" });
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

  describe("LabelScraper review regressions", () => {
    it("should collapse an empty aria-haspopup to boolean false", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a' aria-haspopup=''/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState.hasPopup).toBe(false);
    });

    it("should collapse aria-haspopup='false' to boolean false", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input id='a' aria-haspopup='false'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.ariaState.hasPopup).toBe(false);
    });

    it("should not resolve a detached field's aria-labelledby against the live document", () => {
      expect.assertions(2);

      // The id lives in the live document but the field is detached: getRootNode() keeps the lookup
      // scoped to the field's own (empty) subtree, so the stray id must not leak in.
      document.body.innerHTML = "<span id='stray'>Leaked</span>";
      const input = document.createElement("input");
      input.setAttribute("aria-labelledby", "stray");
      input.setAttribute("aria-describedby", "stray");
      const payload = fieldScraping(input);

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
      expect(payload.ariaState.describedBy).toBe("");
    });

    it("should not resolve a detached field's `for` association against the live document", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label for='stray'>Leaked</label>";
      const input = document.createElement("input");
      input.setAttribute("name", "stray");
      const payload = fieldScraping(input);

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });
  });

  describe("LabelScraper shadow-boundary isolation", () => {
    it("should not resolve a `for` association across a shadow boundary", () => {
      expect.assertions(1);

      // A light-DOM `<label for>` must never name a field living in a shadow root.
      document.body.innerHTML = "<label for='uname'>Light label</label><div></div>";
      const shadowRoot = document.querySelector("div").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<input id='x' name='uname'/>";
      const payload = fieldScraping(shadowRoot.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });

    it("should not resolve aria-labelledby / aria-describedby across a shadow boundary", () => {
      expect.assertions(2);

      document.body.innerHTML = "<span id='lbl'>Light</span><div></div>";
      const shadowRoot = document.querySelector("div").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<input id='a' aria-labelledby='lbl' aria-describedby='lbl'/>";
      const payload = fieldScraping(shadowRoot.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
      expect(payload.ariaState.describedBy).toBe("");
    });

    it("should elect an ancestor label reached through a slot (assignedSlot climb)", () => {
      expect.assertions(1);

      // A light-DOM field projected into a web component: the ancestor climb must pierce the slot into
      // the shadow container that names it.
      document.body.innerHTML = "<div id='host'><input id='a'/></div>";
      const shadowRoot = document.querySelector("#host").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<div>Country<slot></slot></div>";
      const payload = fieldScraping(document.querySelector("#a"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Country", source: "_ancestor" });
    });
  });

  describe("LabelScraper high-value coverage", () => {
    it("should join several native labels bound to the same field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label for='a'>First</label><label for='a'>Second</label><input id='a'/>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "First Second", source: "_explicit" });
    });

    it("should prefer aria-label over aria-labelledby", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<span id='lbl'>Labelledby</span><section><input id='a' aria-label='Direct' aria-labelledby='lbl'/></section>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Direct", source: "_aria" });
    });

    it("should fall through the cascade when aria-labelledby only references missing ids", () => {
      expect.assertions(1);

      // The dangling ref must yield "" and let the ancestor tier win, not halt the cascade on an empty label.
      document.body.innerHTML = "<div>Fallback<span><input id='a' aria-labelledby='missing'/></span></div>";
      const payload = fieldScraping(document.querySelector("input"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Fallback", source: "_ancestor" });
    });

    it("should tolerate a payload with no input description at the placeholder tier", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input id='a'/></div>";
      // No `inputDescription` property at all — the placeholder tier must optional-chain, not throw.
      const payload = { element: document.querySelector("input") };

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });

    it("should elect a qualifying ancestor sitting at the last examined hop", () => {
      expect.assertions(1);

      // The labelled div is the 20th ancestor (examined at hops=19); everything between is empty.
      const payload = fieldScraping(nestedAncestorLabel(20, "Deep"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "Deep", source: "_ancestor" });
    });

    it("should not elect a qualifying ancestor one hop past the cap", () => {
      expect.assertions(1);

      // The labelled div is the 21st ancestor (would need hops=20) and must never be reached.
      const payload = fieldScraping(nestedAncestorLabel(21, "TooDeep"));

      LabelScraper.enrich(payload);

      expect(payload.label).toEqual({ text: "", source: null });
    });
  });
});
