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

    it("should strip the text typed in a nested textarea and the options of a nested select", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<label>Message<textarea>my private note</textarea><select><option>FR</option></select></label>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("label"))).toEqual("Message");
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

    it("should strip the whole subtree of a nested button", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label>Email<button><span>Show</span><b>more</b></button></label>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("label"))).toEqual("Email");
    });

    it("should strip controls nested in an already stripped control only once", () => {
      expect.assertions(1);

      // Built with the DOM API: the HTML parser would close the outer button on the nested one.
      document.body.innerHTML = "<div>Before <button>Outer <span></span></button> middle <input/> after</div>";
      const innerButton = document.createElement("button");
      innerButton.textContent = "Inner";
      document.querySelector("span").appendChild(innerButton);
      const select = document.createElement("select");
      select.appendChild(document.createElement("option")).textContent = "X";
      document.querySelector("button").appendChild(select);

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("div"))).toEqual("Before  middle  after");
    });

    it("should keep the text located after the last stripped control, including in nested elements", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><span>Code <input/> hint</span><em> (6 digits)</em></div>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("div"))).toEqual("Code  hint (6 digits)");
    });

    it("should not change the page selection", () => {
      expect.assertions(1);

      document.body.innerHTML = "<p id='p'>Selected text</p><label>Email<input/></label>";
      const selection = document.getSelection();
      selection.selectAllChildren(document.getElementById("p"));
      const selectedBefore = selection.toString();

      PageScraperHelpers.textWithoutFields(document.querySelector("label"));

      expect(document.getSelection().toString()).toEqual(selectedBefore);
    });

    it("should keep the text of the element itself even when it matches a stripped control", () => {
      expect.assertions(1);

      document.body.innerHTML = "<button>Sign <span>in</span></button>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("button"))).toEqual("Sign in");
    });

    it("should ignore comments and keep nested script and style text like textContent", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div>Email<!-- hidden --><style>.a{}</style><script>var a;</script></div>";

      expect(PageScraperHelpers.textWithoutFields(document.querySelector("div"))).toEqual("Email.a{}var a;");
    });

    it("should not clone the element, so its images are not requested again (e.g. a CAPTCHA)", () => {
      expect.assertions(3);

      document.body.innerHTML =
        "<div>Enter the code <img src='/login/captcha/key?123' alt='captcha'/><input name='captcha'/></div>";
      const cloneNodeSpy = jest.spyOn(Node.prototype, "cloneNode");
      const importNodeSpy = jest.spyOn(Document.prototype, "importNode");

      const text = PageScraperHelpers.textWithoutFields(document.querySelector("div"));

      expect(text).toEqual("Enter the code ");
      expect(cloneNodeSpy).not.toHaveBeenCalled();
      expect(importNodeSpy).not.toHaveBeenCalled();

      cloneNodeSpy.mockRestore();
      importNodeSpy.mockRestore();
    });

    it("should extract the text of an element living in a same-origin iframe", () => {
      expect.assertions(1);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      const iframeDocument = iframe.contentDocument;
      iframeDocument.body.innerHTML = "<label>Password<input type='password'/><button>Show</button></label>";

      expect(PageScraperHelpers.textWithoutFields(iframeDocument.querySelector("label"))).toEqual("Password");
    });

    it("should return the same text as the former clone-based implementation", () => {
      const legacyTextWithoutFields = (element) => {
        const clone = element.cloneNode(true);
        clone.querySelectorAll("input, textarea, select, button").forEach((field) => field.remove());
        return clone.textContent;
      };
      const fixtures = [
        "<label>Email</label>",
        "<label>Email<input value='user@passbolt.com'/></label>",
        "<label>Message<textarea>my private note</textarea><select><option>FR</option></select></label>",
        "<div>First name <input/> <span>required</span></div>",
        "<div><span>User<em>name</em></span><button><span>Go</span></button> <i>(email)</i></div>",
        "<table><tbody><tr><td>Code <img src='captcha.jpg'/><input/><a href='#'>Reload</a></td></tr></tbody></table>",
        "<li>A<div>B<div>C<input/>D</div>E</div>F</li>",
        "<div>Email<!-- note --><style>.a{}</style></div>",
        "<button>Sign <span>in</span></button>",
      ];
      expect.assertions(fixtures.length);

      for (const fixture of fixtures) {
        // eslint-disable-next-line no-unsanitized/property
        document.body.innerHTML = fixture;
        const element = document.body.firstElementChild;
        expect(PageScraperHelpers.textWithoutFields(element)).toEqual(legacyTextWithoutFields(element));
      }
    });
  });
});
