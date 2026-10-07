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

import PageScraperService from "./PageScraperService";
import FormScraperService from "../DomExtraction/FormScraperService";
import FieldScraperService from "./FieldScraperService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
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
    // Reset the id registry so form/field id sequences are deterministic and never leak across cases.
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    document.body.innerHTML = "";
  });

  describe("PageScraperService::scrape", () => {
    it("orchestrates the payload by delegating to FormScraperService and FieldScraperService", () => {
      expect.assertions(5);

      document.body.innerHTML = `
        <form id="login">
          <input type="email" name="email"/>
          <input type="password" name="password"/>
        </form>`;
      const form = document.querySelector("form");
      const formSpy = jest.spyOn(FormScraperService, "scrape");
      const fieldSpy = jest.spyOn(FieldScraperService, "scrape");

      const payload = PageScraperService.scrape([realForm(form)]);

      expect(formSpy).toHaveBeenCalledTimes(1);
      expect(fieldSpy).toHaveBeenCalledTimes(2);
      expect(Object.keys(payload.forms)).toHaveLength(1);
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
      expect(Object.values(payload.forms)[0].fieldTypes).toEqual({ email: 1, password: 2, text: 1 });
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

      const forms = Object.values(payload.forms);
      expect(forms[0].fieldTypes).toEqual({ password: 1 });
      expect(forms[1].fieldTypes).toEqual({ password: 1 });
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
      expect(Object.values(payload.forms)[0].fieldTypes).toEqual({});
    });

    it("scrapes real `{element}` and pseudo `{fieldElement}` field shapes identically", () => {
      expect.assertions(3);

      document.body.innerHTML = `
        <form id="real"><input type="text" name="u"/></form>
        <div id="pseudo"><input type="password" name="p"/></div>`;
      const real = document.querySelector("#real");
      const pseudo = document.querySelector("#pseudo");

      const payload = PageScraperService.scrape([realForm(real), pseudoForm(pseudo)]);

      expect(Object.keys(payload.forms)).toHaveLength(2);
      expect(payload.fields).toHaveLength(2);
      expect(Object.values(payload.forms)[1].fieldTypes).toEqual({ password: 1 });
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

      expect(Object.keys(payload.forms)).toHaveLength(1);
      expect(payload.fields).toHaveLength(1);
    });

    it("does not mutate the host DOM (zero-pollution constraint)", () => {
      expect.assertions(1);

      document.body.innerHTML = `<form><input type="password"/></form>`;
      const before = document.body.innerHTML;

      PageScraperService.scrape([realForm(document.querySelector("form"))]);

      expect(document.body.innerHTML).toEqual(before);
    });

    it("scrapes a container whose skeleton entry has no `fields` key", () => {
      expect.assertions(2);

      document.body.innerHTML = `<form><input type="email"/></form>`;
      // A malformed/partial skeleton entry with no `fields` key exercises the `skeleton.fields ?? []` branch.
      const payload = PageScraperService.scrape([{ containerElement: document.querySelector("form") }]);

      expect(Object.keys(payload.forms)).toHaveLength(1);
      expect(payload.fields).toHaveLength(0);
    });

    it("returns an empty but well-formed payload for an empty skeleton", () => {
      expect.assertions(2);

      const payload = PageScraperService.scrape([]);

      expect(payload).toMatchObject({ url: location.href, documentUrl: document.URL, title: document.title });
      expect(payload).toMatchObject({ forms: {}, fields: [] });
    });

    it("returns an empty payload for an undefined skeleton", () => {
      expect.assertions(2);

      const payload = PageScraperService.scrape();

      expect(Object.keys(payload.forms)).toHaveLength(0);
      expect(payload.fields).toHaveLength(0);
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

      const formIds = new Set(Object.keys(payload.forms));
      expect(payload.fields.every((field) => formIds.has(field.formId))).toBe(true);
    });
  });

  describe("PageScraperService observer attributeFilter contract", () => {
    it("keeps the shared observer's attributeFilter a superset of SCRAPED_ATTRS", () => {
      expect.assertions(1);

      // A scraped attribute missing from the filter could change without a record, so InFormManager would not re-scan.
      const watched = new Set(ShadowMutationObserverService._observeOptions.attributeFilter);
      const missing = SCRAPED_ATTRS.filter((attr) => !watched.has(attr));

      expect(missing).toEqual([]);
    });
  });
});
