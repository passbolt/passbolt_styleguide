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

import PageScraperService, { RESCRAPE_MIN_DELAY, RESCRAPE_MAX_DELAY } from "./PageScraperService";
import FormScraper from "../DomExtraction/FormScraper";
import FieldScraperService from "./FieldScraperService";
import ScrapingCacheService from "./ScrapingCacheService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import { OBSERVE_OPTIONS } from "../ShadowDom/ShadowDomDictionary";
import { SCRAPED_ATTRS } from "../../lib/InForm/ScrapingDictionary";

/**
 * Build a real-form skeleton entry (`{ element }` field shape, à la FormExtractionService).
 * @param {Element} containerElement The form container.
 * @returns {object} The skeleton record.
 */
const realForm = (containerElement) => ({
  containerElement,
  fields: Array.from(containerElement.querySelectorAll("input")).map((element) => ({ element, isViewable: true })),
  isPseudoForm: false,
});

/**
 * Build a pseudo-form skeleton entry (`{ fieldElement }` field shape, à la OrphanFieldsExtractionService).
 * @param {Element} containerElement The pseudo-form container.
 * @returns {object} The skeleton record.
 */
const pseudoForm = (containerElement) => ({
  containerElement,
  fields: Array.from(containerElement.querySelectorAll("input")).map((element) => ({ fieldElement: element })),
  isPseudoForm: true,
});

describe("PageScraperService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    // The scrapers pierce shadow roots via the cache; keep the suite observer-free and cache-clean.
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();
    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    ScrapingCacheService._payloadByElement = new WeakMap();
    ScrapingCacheService._keywordsByElement = new WeakMap();
    // Reset the id registry so form/field id sequences are deterministic and never leak across cases.
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    document.body.innerHTML = "";
    PageScraperService.stop();
  });

  afterEach(() => {
    PageScraperService.stop();
    jest.useRealTimers();
  });

  describe("PageScraperService::scrape", () => {
    it("orchestrates the payload by delegating to FormScraper and FieldScraperService", () => {
      expect.assertions(5);

      document.body.innerHTML = `
        <form id="login">
          <input type="email" name="email"/>
          <input type="password" name="password"/>
        </form>`;
      const form = document.querySelector("form");
      const formSpy = jest.spyOn(FormScraper, "scrape");
      const fieldSpy = jest.spyOn(FieldScraperService, "scrape");

      const payload = PageScraperService.scrape([realForm(form)]);

      expect(formSpy).toHaveBeenCalledTimes(1);
      expect(fieldSpy).toHaveBeenCalledTimes(2);
      expect(payload.forms).toHaveLength(1);
      expect(payload.fields).toHaveLength(2);
      expect(payload).toMatchObject({ url: location.href, documentUrl: document.URL, title: document.title });
    });

    it("aggregates a per-form fieldTypes histogram, counting an untyped input as text", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form>
          <input type="email"/>
          <input type="password"/>
          <input type="password"/>
          <input name="untyped"/>
        </form>`;
      const form = document.querySelector("form");

      const payload = PageScraperService.scrape([realForm(form)]);

      // The untyped input defaults to "text" (per FieldScraperService), so it buckets under `text`.
      expect(payload.forms[0].fieldTypes).toEqual({ email: 1, password: 2, text: 1 });
    });

    it("counts the same type independently per form (no cross-form bleed)", () => {
      expect.assertions(2);

      document.body.innerHTML = `
        <form id="a"><input type="password"/></form>
        <form id="b"><input type="password"/></form>`;

      const payload = PageScraperService.scrape([
        realForm(document.querySelector("#a")),
        realForm(document.querySelector("#b")),
      ]);

      expect(payload.forms[0].fieldTypes).toEqual({ password: 1 });
      expect(payload.forms[1].fieldTypes).toEqual({ password: 1 });
    });

    it("adds no histogram bucket for a non-input control (empty type)", () => {
      expect.assertions(3);

      document.body.innerHTML = `<div id="host"><div contenteditable="true">x</div></div>`;
      const host = document.querySelector("#host");
      const editable = document.querySelector("[contenteditable]");
      const skeleton = [{ containerElement: host, fields: [{ element: editable }], isPseudoForm: true }];

      const payload = PageScraperService.scrape(skeleton);

      expect(payload.fields).toHaveLength(1);
      expect(payload.fields[0].type).toEqual("");
      expect(payload.forms[0].fieldTypes).toEqual({});
    });

    it("scrapes real `{element}` and pseudo `{fieldElement}` field shapes identically", () => {
      expect.assertions(3);

      document.body.innerHTML = `
        <form id="real"><input type="text" name="u"/></form>
        <div id="pseudo"><input type="password" name="p"/></div>`;
      const real = document.querySelector("#real");
      const pseudo = document.querySelector("#pseudo");

      const payload = PageScraperService.scrape([realForm(real), pseudoForm(pseudo)]);

      expect(payload.forms).toHaveLength(2);
      expect(payload.fields).toHaveLength(2);
      expect(payload.forms[1].fieldTypes).toEqual({ password: 1 });
    });

    it("skips non-element containers and non-element fields without throwing", () => {
      expect.assertions(2);

      document.body.innerHTML = `<form><input type="text"/></form>`;
      const form = document.querySelector("form");
      const skeleton = [
        { containerElement: null, fields: [] },
        { containerElement: form, fields: [{ element: null }, { element: form.querySelector("input") }] },
      ];

      const payload = PageScraperService.scrape(skeleton);

      expect(payload.forms).toHaveLength(1);
      expect(payload.fields).toHaveLength(1);
    });

    it("does not mutate the host DOM (zero-pollution constraint)", () => {
      expect.assertions(1);

      document.body.innerHTML = `<form><input type="password"/></form>`;
      const before = document.body.innerHTML;

      PageScraperService.scrape([realForm(document.querySelector("form"))]);

      expect(document.body.innerHTML).toEqual(before);
    });

    it("falls back to the last known skeleton when called with no argument", () => {
      expect.assertions(1);

      document.body.innerHTML = `<form><input type="email"/></form>`;
      PageScraperService._lastSkeleton = [realForm(document.querySelector("form"))];

      const payload = PageScraperService.scrape();

      expect(payload.fields).toHaveLength(1);
    });

    it("scrapes a container whose skeleton entry has no `fields` key", () => {
      expect.assertions(2);

      document.body.innerHTML = `<form><input type="email"/></form>`;
      // A malformed/partial skeleton entry with no `fields` key exercises the `skeleton.fields ?? []` branch.
      const payload = PageScraperService.scrape([{ containerElement: document.querySelector("form") }]);

      expect(payload.forms).toHaveLength(1);
      expect(payload.fields).toHaveLength(0);
    });

    it("returns an empty but well-formed payload for an empty skeleton", () => {
      expect.assertions(2);

      const payload = PageScraperService.scrape([]);

      expect(payload).toMatchObject({ url: location.href, documentUrl: document.URL, title: document.title });
      expect(payload).toMatchObject({ forms: [], fields: [] });
    });

    it("returns an empty payload with no argument when there is no last skeleton", () => {
      expect.assertions(2);
      // stop() in beforeEach nulls _lastSkeleton, exercising the `?? []` null branch.

      const payload = PageScraperService.scrape();

      expect(payload.forms).toHaveLength(0);
      expect(payload.fields).toHaveLength(0);
    });

    it("returns the cached FieldScraping when the same element is scraped again", () => {
      expect.assertions(2);

      document.body.innerHTML = `<form><input type="password"/></form>`;
      const skeleton = [realForm(document.querySelector("form"))];
      const buildSpy = jest.spyOn(FieldScraperService, "build");

      const first = PageScraperService.scrape(skeleton);
      const second = PageScraperService.scrape(skeleton);

      // Cache-assisted: built once, and the very same record object flows through both payloads.
      expect(buildSpy).toHaveBeenCalledTimes(1);
      expect(second.fields[0]).toBe(first.fields[0]);
    });

    it("re-scrapes a field when it is attributed to a different form (SPA re-parent)", () => {
      expect.assertions(2);

      document.body.innerHTML = `
        <form id="a"></form>
        <form id="b"></form>
        <input type="password"/>`;
      const input = document.querySelector("input");
      const buildSpy = jest.spyOn(FieldScraperService, "build");

      const underA = PageScraperService.scrape([
        { containerElement: document.querySelector("#a"), fields: [{ element: input }] },
      ]);
      const underB = PageScraperService.scrape([
        { containerElement: document.querySelector("#b"), fields: [{ element: input }] },
      ]);

      expect(buildSpy).toHaveBeenCalledTimes(2);
      expect(underB.fields[0].formId).not.toEqual(underA.fields[0].formId);
    });

    it("prefers fieldElement over element when a field carries both", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <div id="host">
          <input name="light"/>
          <input name="winner"/>
        </div>`;
      const host = document.querySelector("#host");
      const [light, winner] = host.querySelectorAll("input");
      const skeleton = [{ containerElement: host, fields: [{ element: light, fieldElement: winner }] }];

      const payload = PageScraperService.scrape(skeleton);

      expect(payload.fields[0].attributes.name).toEqual("winner");
    });

    it("scrapes a field that lives inside a shadow root", () => {
      expect.assertions(2);

      document.body.innerHTML = `<div id="host"></div>`;
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      shadow.innerHTML = `<input type="password" name="secret"/>`;
      const input = shadow.querySelector("input");
      const skeleton = [{ containerElement: host, fields: [{ fieldElement: input }], isPseudoForm: true }];

      const payload = PageScraperService.scrape(skeleton);

      expect(payload.fields).toHaveLength(1);
      expect(payload.fields[0].type).toEqual("password");
    });

    it("attributes every scraped field to an existing form record", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form id="a"><input type="email"/></form>
        <form id="b"><input type="password"/></form>`;

      const payload = PageScraperService.scrape([
        realForm(document.querySelector("#a")),
        realForm(document.querySelector("#b")),
      ]);

      const formIds = new Set(payload.forms.map((form) => form.formId));
      expect(payload.fields.every((field) => formIds.has(field.formId))).toBe(true);
    });
  });

  describe("PageScraperService::startIncremental", () => {
    it("subscribes to ShadowMutationObserverService and emits an initial snapshot to the onScrape callback", () => {
      expect.assertions(3);

      const unsubscribe = jest.fn();
      const subscribeSpy = jest
        .spyOn(ShadowMutationObserverService, "subscribeToShadowMutations")
        .mockReturnValue(unsubscribe);
      document.body.innerHTML = `<form><input type="password"/></form>`;
      const onScrape = jest.fn();

      PageScraperService.startIncremental([realForm(document.querySelector("form"))], onScrape);

      expect(subscribeSpy).toHaveBeenCalledWith(PageScraperService._onMutation);
      expect(onScrape).toHaveBeenCalledTimes(1);
      expect(onScrape.mock.calls[0][0].fields).toHaveLength(1);
    });

    it("routes a subsequent relevant mutation to the onScrape callback as a fresh payload", () => {
      expect.assertions(2);
      jest.useFakeTimers();

      let captured;
      jest.spyOn(ShadowMutationObserverService, "subscribeToShadowMutations").mockImplementation((callback) => {
        captured = callback;
        return jest.fn();
      });
      document.body.innerHTML = `<form><input type="password"/></form>`;
      const onScrape = jest.fn();
      PageScraperService.startIncremental([realForm(document.querySelector("form"))], onScrape);

      captured(
        document,
        [{ type: "childList", addedNodes: [document.createElement("input")], removedNodes: [], target: document.body }],
        false,
      );
      jest.advanceTimersByTime(RESCRAPE_MAX_DELAY); // drain the debounce (burst-count independent)
      jest.runOnlyPendingTimers(); // drain the requestIdleCallback fallback (setTimeout 0)

      expect(onScrape).toHaveBeenCalledTimes(2);
      expect(onScrape.mock.calls[1][0]).toHaveProperty("forms");
    });

    it("recomputes a fresh payload reflecting a mutated attribute (invalidate → re-scrape)", () => {
      expect.assertions(2);
      jest.useFakeTimers();

      let captured;
      jest.spyOn(ShadowMutationObserverService, "subscribeToShadowMutations").mockImplementation((callback) => {
        captured = callback;
        return jest.fn();
      });
      document.body.innerHTML = `<form><input type="password" name="before"/></form>`;
      const input = document.querySelector("input");
      const onScrape = jest.fn();
      PageScraperService.startIncremental([realForm(document.querySelector("form"))], onScrape);
      expect(onScrape.mock.calls[0][0].fields[0].attributes.name).toEqual("before");

      // Mutate the live DOM, then feed the matching attribute record; the cache must be dropped and the
      // field re-scraped rather than returning the stale "before" payload.
      input.setAttribute("name", "after");
      captured(
        document,
        [{ type: "attributes", attributeName: "name", target: input, addedNodes: [], removedNodes: [] }],
        false,
      );
      jest.advanceTimersByTime(RESCRAPE_MAX_DELAY);
      jest.runOnlyPendingTimers();

      expect(onScrape.mock.calls[1][0].fields[0].attributes.name).toEqual("after");
    });

    it("tears down a prior session when started again (no subscription leak)", () => {
      expect.assertions(2);

      const unsubscribeA = jest.fn();
      const unsubscribeB = jest.fn();
      jest
        .spyOn(ShadowMutationObserverService, "subscribeToShadowMutations")
        .mockReturnValueOnce(unsubscribeA)
        .mockReturnValueOnce(unsubscribeB);
      document.body.innerHTML = `<form><input type="password"/></form>`;
      const skeleton = [realForm(document.querySelector("form"))];

      PageScraperService.startIncremental(skeleton, jest.fn());
      PageScraperService.startIncremental(skeleton, jest.fn());

      expect(unsubscribeA).toHaveBeenCalledTimes(1);
      expect(unsubscribeB).not.toHaveBeenCalled();
    });
  });

  describe("PageScraperService::_onMutation", () => {
    beforeEach(() => {
      // Put _onMutation in "incremental active" mode without a real subscription.
      PageScraperService._onScrape = jest.fn();
    });

    it("schedules a re-scrape on a topology (childList) change", () => {
      expect.assertions(1);
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();

      PageScraperService._onMutation(
        document,
        [{ type: "childList", addedNodes: [document.createElement("div")], removedNodes: [], target: document.body }],
        false,
      );

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("schedules a re-scrape when a SCRAPED_ATTRS attribute changes", () => {
      expect.assertions(1);
      document.body.innerHTML = `<input type="text"/>`;
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();

      PageScraperService._onMutation(
        document,
        [
          {
            type: "attributes",
            attributeName: "name",
            target: document.querySelector("input"),
            addedNodes: [],
            removedNodes: [],
          },
        ],
        false,
      );

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("ignores an attribute change outside SCRAPED_ATTRS (e.g. style)", () => {
      expect.assertions(1);
      document.body.innerHTML = `<input type="text"/>`;
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();

      PageScraperService._onMutation(
        document,
        [
          {
            type: "attributes",
            attributeName: "style",
            target: document.querySelector("input"),
            addedNodes: [],
            removedNodes: [],
          },
        ],
        false,
      );

      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("schedules a re-scrape when shadow roots changed even with no qualifying mutation", () => {
      expect.assertions(1);
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();

      PageScraperService._onMutation(document, [], true);

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
    });

    it("does nothing when no onScrape callback is registered (not in incremental mode)", () => {
      expect.assertions(1);
      PageScraperService._onScrape = null;
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();

      PageScraperService._onMutation(
        document,
        [{ type: "childList", addedNodes: [document.createElement("div")], removedNodes: [], target: document.body }],
        true,
      );

      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("invalidates the target, added and removed subtrees on a childList change", () => {
      expect.assertions(3);
      jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();
      const target = document.createElement("div");
      const added = document.createElement("input");
      const removed = document.createElement("input");

      PageScraperService._onMutation(
        document,
        [{ type: "childList", addedNodes: [added], removedNodes: [removed], target }],
        false,
      );

      expect(subtreeSpy).toHaveBeenCalledWith(target);
      expect(subtreeSpy).toHaveBeenCalledWith(added);
      expect(subtreeSpy).toHaveBeenCalledWith(removed);
    });

    it("handles a childList carrying only removed nodes", () => {
      expect.assertions(3);
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();
      const target = document.createElement("div");
      const removed = document.createElement("input");

      PageScraperService._onMutation(
        document,
        [{ type: "childList", addedNodes: [], removedNodes: [removed], target }],
        false,
      );

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      expect(subtreeSpy).toHaveBeenCalledWith(target);
      expect(subtreeSpy).toHaveBeenCalledWith(removed);
    });

    it("re-scrapes and invalidates the enclosing form on a characterData (label text) change", () => {
      expect.assertions(2);
      document.body.innerHTML = `<form><label>Old<input type="text"/></label></form>`;
      const form = document.querySelector("form");
      PageScraperService._lastSkeleton = [realForm(form)];
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();
      const labelText = document.querySelector("label").firstChild; // the "Old" text node

      PageScraperService._onMutation(
        document,
        [{ type: "characterData", target: labelText, addedNodes: [], removedNodes: [] }],
        false,
      );

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      // The field itself is untouched, but its elected label changed — drop the whole form's field caches.
      expect(subtreeSpy).toHaveBeenCalledWith(form);
    });

    it("ignores a characterData change that belongs to no scraped form", () => {
      expect.assertions(2);
      // _lastSkeleton is null (reset in beforeEach): unrelated page text must not trigger a re-scrape.
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();

      PageScraperService._onMutation(
        document,
        [{ type: "characterData", target: document.createTextNode("x"), addedNodes: [], removedNodes: [] }],
        false,
      );

      expect(scheduleSpy).not.toHaveBeenCalled();
      expect(subtreeSpy).not.toHaveBeenCalled();
    });

    it("schedules once for a mixed batch of irrelevant and relevant mutations", () => {
      expect.assertions(2);
      document.body.innerHTML = `<input type="text"/>`;
      const input = document.querySelector("input");
      const scheduleSpy = jest.spyOn(PageScraperService, "_scheduleRescrape").mockImplementation();
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();
      const added = document.createElement("input");

      PageScraperService._onMutation(
        document,
        [
          { type: "attributes", attributeName: "style", target: input, addedNodes: [], removedNodes: [] },
          { type: "childList", addedNodes: [added], removedNodes: [], target: document.body },
        ],
        false,
      );

      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      // Only the childList record invalidates; the ignored `style` record's target is never touched.
      expect(subtreeSpy).not.toHaveBeenCalledWith(input);
    });
  });

  describe("PageScraperService::_invalidateSubtree", () => {
    it("purges the mutated node and its TEXT_FIELDS descendants", () => {
      expect.assertions(3);
      document.body.innerHTML = `
        <div id="host">
          <input id="a" type="text"/>
          <input id="b" type="password"/>
        </div>`;
      const host = document.querySelector("#host");
      const invalidateSpy = jest.spyOn(ScrapingCacheService, "invalidate");

      PageScraperService._invalidateSubtree(host);

      expect(invalidateSpy).toHaveBeenCalledWith(host);
      expect(invalidateSpy).toHaveBeenCalledWith(document.querySelector("#a"));
      expect(invalidateSpy).toHaveBeenCalledWith(document.querySelector("#b"));
    });

    it("ignores non-element nodes", () => {
      expect.assertions(1);
      const invalidateSpy = jest.spyOn(ScrapingCacheService, "invalidate");

      PageScraperService._invalidateSubtree(document.createTextNode("noise"));

      expect(invalidateSpy).not.toHaveBeenCalled();
    });
  });

  describe("PageScraperService::_invalidateFieldsAround", () => {
    it("invalidates the form enclosing a mutated in-form label text node", () => {
      expect.assertions(2);
      document.body.innerHTML = `<form><label>Old<input type="text"/></label></form>`;
      const form = document.querySelector("form");
      PageScraperService._lastSkeleton = [realForm(form)];
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();

      const invalidated = PageScraperService._invalidateFieldsAround(document.querySelector("label").firstChild);

      expect(invalidated).toBe(true);
      expect(subtreeSpy).toHaveBeenCalledWith(form);
    });

    it("invalidates the form wrapped by a mutated ancestor-heading text node", () => {
      expect.assertions(2);
      document.body.innerHTML = `<section><h2>Old</h2><form><input type="text"/></form></section>`;
      const form = document.querySelector("form");
      PageScraperService._lastSkeleton = [realForm(form)];
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();

      // The section wraps the form; its heading text is an ancestor-heading signal for the form's fields.
      const invalidated = PageScraperService._invalidateFieldsAround(document.querySelector("section"));

      expect(invalidated).toBe(true);
      expect(subtreeSpy).toHaveBeenCalledWith(form);
    });

    it("invalidates nothing for a text node unrelated to any scraped form", () => {
      expect.assertions(2);
      document.body.innerHTML = `<form><input type="text"/></form><p>elsewhere</p>`;
      PageScraperService._lastSkeleton = [realForm(document.querySelector("form"))];
      const subtreeSpy = jest.spyOn(PageScraperService, "_invalidateSubtree").mockImplementation();

      const invalidated = PageScraperService._invalidateFieldsAround(document.querySelector("p").firstChild);

      expect(invalidated).toBe(false);
      expect(subtreeSpy).not.toHaveBeenCalled();
    });

    it("ignores a node with no resolvable element", () => {
      expect.assertions(1);

      expect(PageScraperService._invalidateFieldsAround(document.createTextNode("orphan"))).toBe(false);
    });
  });

  describe("PageScraperService::_scheduleRescrape (adaptive debounce)", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("fires a lone mutation's re-scrape only after RESCRAPE_MIN_DELAY", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape").mockImplementation(() => {});

      PageScraperService._scheduleRescrape(); // burst 1 → 1000ms
      jest.advanceTimersByTime(RESCRAPE_MIN_DELAY - 1);
      expect(runSpy).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(runSpy).toHaveBeenCalledTimes(1);
    });

    it("lengthens the delay as the burst grows", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape").mockImplementation(() => {});

      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape(); // burst 3 → 3000ms, so MIN_DELAY is not enough
      jest.advanceTimersByTime(3 * RESCRAPE_MIN_DELAY - 1);
      expect(runSpy).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(runSpy).toHaveBeenCalledTimes(1);
    });

    it("caps the delay at RESCRAPE_MAX_DELAY under sustained churn", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape").mockImplementation(() => {});

      for (let i = 0; i < 10; i++) {
        PageScraperService._scheduleRescrape(); // burst 10 would be 10000ms, but is clamped to 5000ms
      }
      jest.advanceTimersByTime(RESCRAPE_MAX_DELAY - 1);
      expect(runSpy).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(runSpy).toHaveBeenCalledTimes(1);
    });

    it("coalesces a burst into a single trailing re-scrape and resets the burst counter", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape");

      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape();
      jest.advanceTimersByTime(RESCRAPE_MAX_DELAY);

      expect(runSpy).toHaveBeenCalledTimes(1);
      expect(PageScraperService._burstCount).toEqual(0);
    });

    it("re-baselines to RESCRAPE_MIN_DELAY on the next burst after a fire", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape"); // call through so the burst counter resets
      PageScraperService._onScrape = jest.fn();
      PageScraperService._lastSkeleton = [];

      // First burst of 3 fires at 3000ms and resets _burstCount to 0.
      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape();
      PageScraperService._scheduleRescrape();
      jest.advanceTimersByTime(RESCRAPE_MAX_DELAY);
      expect(runSpy).toHaveBeenCalledTimes(1);

      // A fresh lone mutation must fire at MIN again, not at the previous burst's inflated delay.
      PageScraperService._scheduleRescrape();
      jest.advanceTimersByTime(RESCRAPE_MIN_DELAY);
      expect(runSpy).toHaveBeenCalledTimes(2);
    });

    it("cancels the previously armed timer when rescheduled (single fire)", () => {
      expect.assertions(2);
      const runSpy = jest.spyOn(PageScraperService, "_runRescrape").mockImplementation(() => {});

      PageScraperService._scheduleRescrape(); // armed at 1000ms
      jest.advanceTimersByTime(500); // partway — not yet fired
      PageScraperService._scheduleRescrape(); // reschedules (burst 2 → 2000ms); the first timer must be cleared
      // Advance past the ORIGINAL 1000ms deadline: if it were not cleared it would have fired by now.
      jest.advanceTimersByTime(RESCRAPE_MIN_DELAY);
      expect(runSpy).not.toHaveBeenCalled();
      // Advance to the rescheduled deadline (500 + 2000 = 2500ms total).
      jest.advanceTimersByTime(RESCRAPE_MIN_DELAY);
      expect(runSpy).toHaveBeenCalledTimes(1); // exactly one fire — the cleared first timer never ran
    });
  });

  describe("PageScraperService::_runRescrape", () => {
    it("uses requestIdleCallback when available", () => {
      expect.assertions(2);
      const ric = jest.fn();
      window.requestIdleCallback = ric;
      PageScraperService._onScrape = jest.fn();

      PageScraperService._runRescrape();

      expect(ric).toHaveBeenCalledTimes(1);
      expect(ric).toHaveBeenCalledWith(expect.any(Function), { timeout: RESCRAPE_MAX_DELAY });

      delete window.requestIdleCallback;
    });

    it("delivers the payload and clears the idle handle through the requestIdleCallback path", () => {
      expect.assertions(3);
      let idleCallback;
      window.requestIdleCallback = jest.fn((callback) => {
        idleCallback = callback;
        return 42;
      });
      document.body.innerHTML = `<form><input type="password"/></form>`;
      PageScraperService._lastSkeleton = [realForm(document.querySelector("form"))];
      const onScrape = jest.fn();
      PageScraperService._onScrape = onScrape;

      PageScraperService._runRescrape();
      expect(onScrape).not.toHaveBeenCalled(); // nothing until the idle callback actually runs
      idleCallback();

      expect(onScrape).toHaveBeenCalledTimes(1);
      expect(PageScraperService._idleHandle).toBeNull();

      delete window.requestIdleCallback;
    });

    it("falls back to setTimeout when requestIdleCallback is unavailable and delivers the payload", () => {
      expect.assertions(2);
      jest.useFakeTimers();
      delete window.requestIdleCallback;
      expect(window.requestIdleCallback).toBeUndefined(); // precondition: fallback path is taken
      document.body.innerHTML = `<form><input type="password"/></form>`;
      PageScraperService._lastSkeleton = [realForm(document.querySelector("form"))];
      const onScrape = jest.fn();
      PageScraperService._onScrape = onScrape;

      PageScraperService._runRescrape();
      jest.runOnlyPendingTimers();

      expect(onScrape).toHaveBeenCalledTimes(1);
    });

    it("does not throw when the idle callback fires after the onScrape callback was cleared", () => {
      expect.assertions(2);
      let idleCallback;
      window.requestIdleCallback = jest.fn((callback) => {
        idleCallback = callback;
        return 7;
      });
      PageScraperService._onScrape = jest.fn();

      PageScraperService._runRescrape(); // schedules the idle callback while an onScrape callback is present
      PageScraperService._onScrape = null; // e.g. stop() raced in before the idle callback ran

      expect(() => idleCallback()).not.toThrow(); // the `_onScrape?.(payload)` optional chaining guards this
      expect(PageScraperService._idleHandle).toBeNull();

      delete window.requestIdleCallback;
    });
  });

  describe("PageScraperService::stop", () => {
    it("stops timers, unsubscribes and clears burst / skeleton / onScrape state", () => {
      expect.assertions(6);
      jest.useFakeTimers();
      const unsubscribe = jest.fn();
      jest.spyOn(ShadowMutationObserverService, "subscribeToShadowMutations").mockReturnValue(unsubscribe);
      document.body.innerHTML = `<form><input type="password"/></form>`;
      PageScraperService.startIncremental([realForm(document.querySelector("form"))], jest.fn());
      PageScraperService._scheduleRescrape();

      PageScraperService.stop();

      expect(unsubscribe).toHaveBeenCalledTimes(1);
      expect(PageScraperService._unsubscribe).toBeNull();
      expect(PageScraperService._onScrape).toBeNull();
      expect(PageScraperService._lastSkeleton).toBeNull();
      expect(PageScraperService._debounceHandle).toBeNull();
      expect(PageScraperService._burstCount).toEqual(0);
    });

    it("cancels a pending requestIdleCallback via cancelIdleCallback", () => {
      expect.assertions(2);
      window.requestIdleCallback = jest.fn(() => 99);
      window.cancelIdleCallback = jest.fn();
      PageScraperService._onScrape = jest.fn();
      PageScraperService._runRescrape(); // schedules the RIC and stores _idleHandle = 99

      PageScraperService.stop();

      expect(window.cancelIdleCallback).toHaveBeenCalledWith(99);
      expect(PageScraperService._idleHandle).toBeNull();

      delete window.requestIdleCallback;
      delete window.cancelIdleCallback;
    });

    it("is idempotent when nothing was started", () => {
      expect.assertions(2);

      expect(() => PageScraperService.stop()).not.toThrow();
      expect(PageScraperService._onScrape).toBeNull();
    });
  });

  describe("PageScraperService observer attributeFilter contract", () => {
    it("keeps the shared observer's attributeFilter a superset of SCRAPED_ATTRS", () => {
      expect.assertions(1);
      // If this fails, some scraped attribute can mutate without emitting a record, leaving a stale
      // cache (Concern A). Widen FIELD_ATTRIBUTES_TO_WATCH in ShadowDomDictionary to restore coverage.
      const watched = new Set(OBSERVE_OPTIONS.attributeFilter);
      const missing = SCRAPED_ATTRS.filter((attr) => !watched.has(attr));

      expect(missing).toEqual([]);
    });
  });
});
