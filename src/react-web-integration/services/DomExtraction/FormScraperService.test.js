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

import FormScraperService from "./FormScraperService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import { MAX_FORM_ATTR_LENGTH, MAX_HEADING_ANCESTOR_HOPS } from "../../lib/InForm/ScrapingDictionary";

describe("FormScraperService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // _buttonText pierces shadow roots via the cache; keep it isolated and observer-free.
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();
    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("FormScraperService::scrape", () => {
    it("should assemble the full FormScraping skeleton for a real form", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form id="login-form" name="login" class="auth" action="/session" method="POST" data-form-type="Login">
          <input type="text" name="user"/>
          <button type="submit">Sign in</button>
        </form>`;

      const record = FormScraperService.scrape(document.querySelector("form"), "form-1");

      expect(record).toEqual({
        formId: "form-1",
        type: "FORM",
        attributes: {
          id: "login-form",
          name: "login",
          class: "auth",
          action: "http://localhost/session",
          method: "post",
        },
        dataFormType: "login",
        ancestorHeadings: [],
        fieldTypes: {},
        buttonText: "sign in",
      });
    });

    it("should gracefully default every missing attribute", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div></div>";

      const record = FormScraperService.scrape(document.querySelector("div"), "pseudo-1");

      expect(record).toEqual({
        formId: "pseudo-1",
        type: "DIV",
        attributes: { id: "", name: "", class: "", action: "", method: "" },
        dataFormType: "",
        ancestorHeadings: [],
        fieldTypes: {},
        buttonText: "",
      });
    });

    it("should carry the container node name (pseudo-form) uppercased as the type", () => {
      expect.assertions(1);

      document.body.innerHTML = "<section></section>";

      expect(FormScraperService.scrape(document.querySelector("section"), "id").type).toEqual("SECTION");
    });

    it("should clamp every scraped string attribute to MAX_FORM_ATTR_LENGTH", () => {
      expect.assertions(3);

      const long = "a".repeat(MAX_FORM_ATTR_LENGTH + 100);
      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      form.setAttribute("id", long);
      form.setAttribute("name", long);
      form.setAttribute("class", long);

      const { attributes } = FormScraperService.scrape(form, "id");

      expect(attributes.id.length).toEqual(MAX_FORM_ATTR_LENGTH);
      expect(attributes.name.length).toEqual(MAX_FORM_ATTR_LENGTH);
      expect(attributes.class.length).toEqual(MAX_FORM_ATTR_LENGTH);
    });

    it("should clamp on code points so an astral character is never split at the boundary", () => {
      expect.assertions(2);

      // An emoji straddling the limit: a code-point slice keeps it whole, a code-unit slice would not.
      const straddling = `${"a".repeat(MAX_FORM_ATTR_LENGTH - 1)}😀tail`;
      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      form.setAttribute("id", straddling);

      const { id } = FormScraperService.scrape(form, "id").attributes;

      expect(Array.from(id)).toHaveLength(MAX_FORM_ATTR_LENGTH);
      expect(id.endsWith("😀")).toBe(true);
    });

    it("should clamp the data-form-type attribute to MAX_FORM_ATTR_LENGTH", () => {
      expect.assertions(1);

      const long = "a".repeat(MAX_FORM_ATTR_LENGTH + 100);
      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      form.setAttribute("data-form-type", long);

      expect(FormScraperService.scrape(form, "id").dataFormType.length).toEqual(MAX_FORM_ATTR_LENGTH);
    });

    it("should lower-case the data-form-type attribute", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form data-form-type='Login'></form>";

      expect(FormScraperService.scrape(document.querySelector("form"), "id").dataFormType).toEqual("login");
    });

    it("should lower-case a mixed-case method attribute", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form method='GeT'></form>";

      expect(FormScraperService.scrape(document.querySelector("form"), "id").attributes.method).toEqual("get");
    });

    it("should preserve the query string when resolving a relative action", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form action='/session?next=/home'></form>";

      expect(FormScraperService.scrape(document.querySelector("form"), "id").attributes.action).toEqual(
        "http://localhost/session?next=/home",
      );
    });

    it("should resolve a protocol-relative action against the current scheme", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form action='//accounts.example.com/login'></form>";

      expect(FormScraperService.scrape(document.querySelector("form"), "id").attributes.action).toEqual(
        "http://accounts.example.com/login",
      );
    });

    it("should leave fieldTypes as an empty map for the PageScraperService to populate", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";

      expect(FormScraperService.scrape(document.querySelector("form"), "id").fieldTypes).toEqual({});
    });

    it("should not mutate the scraped DOM", () => {
      expect.assertions(2);

      document.body.innerHTML = "<form action='/x'><input name='user'/><button>Go</button></form>";
      const form = document.querySelector("form");

      FormScraperService.scrape(form, "id");

      expect(form.querySelector("input")).not.toBeNull();
      expect(form.querySelector("button")).not.toBeNull();
    });
  });

  describe("FormScraperService::_actionUrl", () => {
    it("should resolve a relative action against location.href", () => {
      expect.assertions(1);

      expect(FormScraperService._actionUrl("/session/login")).toEqual("http://localhost/session/login");
    });

    it("should keep an already absolute (cross-origin) action", () => {
      expect.assertions(1);

      expect(FormScraperService._actionUrl("https://accounts.example.com/login")).toEqual(
        "https://accounts.example.com/login",
      );
    });

    it("should return an empty string for a missing action", () => {
      expect.assertions(2);

      expect(FormScraperService._actionUrl(null)).toEqual("");
      expect(FormScraperService._actionUrl("")).toEqual("");
    });

    it("should degrade gracefully to an empty string on an invalid action", () => {
      expect.assertions(1);

      expect(FormScraperService._actionUrl("http://")).toEqual("");
    });
  });

  describe("FormScraperService::_ancestorHeadings", () => {
    it("should return no headings when no sectioning ancestor exists", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><form></form></div>";

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual([]);
    });

    it("should extract a fieldset's own legend", () => {
      expect.assertions(1);

      document.body.innerHTML = "<fieldset><legend>Billing address</legend><form></form></fieldset>";

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual(["Billing address"]);
    });

    it("should extract a heading residing inside a structural section", () => {
      expect.assertions(1);

      document.body.innerHTML = "<section><h2>Create your account</h2><form></form></section>";

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual(["Create your account"]);
    });

    it("should push the section titles closest ancestor first", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <section>
          <h1>Account</h1>
          <fieldset>
            <legend>Sign in</legend>
            <form></form>
          </fieldset>
        </section>`;

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual(["Sign in", "Account"]);
    });

    it("should ignore an empty legend", () => {
      expect.assertions(1);

      document.body.innerHTML = "<fieldset><legend>   </legend><form></form></fieldset>";

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual([]);
    });

    it("should collect a heading from each distinct sectioning ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <article>
          <h1>Account center</h1>
          <section>
            <h2>Security</h2>
            <form></form>
          </section>
        </article>`;

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual(["Security", "Account center"]);
    });

    it("should skip a plain div ancestor sitting between two sections", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <section>
          <h1>Outer</h1>
          <div>
            <section>
              <h2>Inner</h2>
              <form></form>
            </section>
          </div>
        </section>`;

      expect(FormScraperService._ancestorHeadings(document.querySelector("form"))).toEqual(["Inner", "Outer"]);
    });

    it("should not capture a section heading beyond MAX_HEADING_ANCESTOR_HOPS", () => {
      expect.assertions(1);

      // Push the section one hop past the budget: section > div * MAX_HEADING_ANCESTOR_HOPS > form.
      const section = document.createElement("section");
      const heading = document.createElement("h2");
      heading.textContent = "Too far";
      section.appendChild(heading);

      let parent = section;
      for (let i = 0; i < MAX_HEADING_ANCESTOR_HOPS; i++) {
        const div = document.createElement("div");
        parent.appendChild(div);
        parent = div;
      }
      const form = document.createElement("form");
      parent.appendChild(form);
      document.body.appendChild(section);

      expect(FormScraperService._ancestorHeadings(form)).toEqual([]);
    });

    it("should pierce a shadow boundary while climbing", () => {
      expect.assertions(1);

      document.body.innerHTML = "<section><h2>Sign in</h2><div id='host'></div></section>";
      const shadowRoot = document.getElementById("host").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<form></form>";

      expect(FormScraperService._ancestorHeadings(shadowRoot.querySelector("form"))).toEqual(["Sign in"]);
    });
  });

  describe("FormScraperService::_buttonText", () => {
    it("should return an empty string when the container holds no action button", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input name='user'/></form>";

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("");
    });

    it("should aggregate and tokenize a button's value attribute and text content", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form>
          <input type="submit" value="Sign in"/>
          <button>Register now</button>
        </form>`;

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("sign in register now");
    });

    it("should collect a role=button action surface", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><span role='button'>Log in</span></form>";

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("log in");
    });

    it("should aggregate multiple buttons in document order", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form>
          <button>Sign in</button>
          <button>Create account</button>
        </form>`;

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("sign in create account");
    });

    it("should skip a button with an empty value and text content", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <form>
          <input type="submit" value=""/>
          <button></button>
          <button>Continue</button>
        </form>`;

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("continue");
    });

    it("should pierce shadow boundaries to find action buttons", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><div id='host'></div></form>";
      const shadowRoot = document.getElementById("host").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<button>Continue</button>";

      expect(FormScraperService._buttonText(document.querySelector("form"))).toEqual("continue");
    });
  });
});
