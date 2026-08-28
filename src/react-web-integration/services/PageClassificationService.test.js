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

import PageClassificationService from "./PageClassificationService";
import ElementVisibilityService from "./DomExtraction/ElementVisibilityService";
import ScrapingIdentityService from "./Scraping/ScrapingIdentityService";
import ScrapingCacheService from "./Scraping/ScrapingCacheService";
import DomUtils from "../lib/Dom/DomUtils";
import { FieldRole, FormRole } from "./classification/Taxonomy";

describe("PageClassificationService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = "";
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    ScrapingCacheService._payloadByElement = new WeakMap();
    ScrapingCacheService._keywordsByElement = new WeakMap();
    // jsdom has no layout, so drive viewability explicitly (mirrors the DomExtraction test setup).
    jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
  });

  describe("PageClassificationService::classifyPage", () => {
    it("should classify a real login form end-to-end and resolve roles back to live elements", () => {
      expect.assertions(4);

      document.body.innerHTML = `
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>`;
      const usernameElement = document.querySelector("input[name='username']");
      const passwordElement = document.querySelector("input[name='password']");

      const result = PageClassificationService.classifyPage();

      const username = result.fields.find((field) => field.element === usernameElement);
      const password = result.fields.find((field) => field.element === passwordElement);

      expect(username.role).toBe(FieldRole.USERNAME);
      expect(password.role).toBe(FieldRole.CURRENT_PASSWORD);
      expect(username.formId).toBe(password.formId);
      expect(result.forms[username.formId].role).toBe(FormRole.LOGIN);
    });

    it("should return empty results for a page with no form fields", () => {
      expect.assertions(2);

      document.body.innerHTML = `<div><p>no fields here</p></div>`;

      const result = PageClassificationService.classifyPage();

      expect(result.fields).toStrictEqual([]);
      expect(result.forms).toStrictEqual({});
    });

    it("should also classify a login form served inside a same-origin iframe", () => {
      expect.assertions(3);
      // The helper gates iframes on same-origin; force it so the jsdom iframe is treated as accessible.
      jest.spyOn(DomUtils, "isRequestInitiatedFromSameOrigin").mockReturnValue(true);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      iframe.contentDocument.body.innerHTML = `
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>`;
      const usernameElement = iframe.contentDocument.querySelector("input[name='username']");
      const passwordElement = iframe.contentDocument.querySelector("input[name='password']");

      const result = PageClassificationService.classifyPage();

      const username = result.fields.find((field) => field.element === usernameElement);
      const password = result.fields.find((field) => field.element === passwordElement);

      expect(username.role).toBe(FieldRole.USERNAME);
      expect(password.role).toBe(FieldRole.CURRENT_PASSWORD);
      expect(result.forms[username.formId].role).toBe(FormRole.LOGIN);
    });
  });
});
