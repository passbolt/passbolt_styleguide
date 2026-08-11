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

import PageScraperHelpers from "./PageScraperHelpers";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";

describe("PageScraperHelpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("PageScraperHelpers::fieldCount", () => {
    it("should return 0 for an element with no form control", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><span>Email</span></div>";

      expect(PageScraperHelpers.fieldCount(document.querySelector("div"))).toEqual(0);
    });

    it("should count the form-control descendants regardless of nesting depth", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input/><section><input/><input/></section></div>";

      expect(PageScraperHelpers.fieldCount(document.querySelector("div"))).toEqual(3);
    });

    it("should not count the element itself", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input/>";

      expect(PageScraperHelpers.fieldCount(document.querySelector("input"))).toEqual(0);
    });

    it("should count form controls nested inside a shadow root", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input/></div>";
      const host = document.querySelector("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<input/><input/>";

      // One light-DOM input plus two piercing the shadow boundary.
      expect(PageScraperHelpers.fieldCount(host)).toEqual(3);
    });
  });

  describe("PageScraperHelpers::textWithoutFields", () => {
    it("should return the text untouched when the element holds no form control", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label>Email</label>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("label"))).toEqual("Email");
    });

    it("should strip the value carried by a nested form control", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label>Email<input value='user@passbolt.com'/></label>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("label"))).toEqual("Email");
    });

    it("should strip the text carried by a nested button", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>Search<button>Submit</button></div>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("div"))).toEqual("Search");
    });

    it("should keep only the surrounding label text of a wrapper holding several nodes", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>First name <input/> <span>required</span></div>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("div"))).toEqual("First name  required");
    });

    it("should not mutate the live DOM", () => {
      expect.assertions(2);

      document.body.innerHTML = "<label>Email<input/><button>Go</button></label>";
      const label = document.querySelector("label");

      PageScraperHelpers.textWithoutFields(label);

      expect(label.querySelector("input")).not.toBeNull();
      expect(label.querySelector("button")).not.toBeNull();
    });
  });
});
