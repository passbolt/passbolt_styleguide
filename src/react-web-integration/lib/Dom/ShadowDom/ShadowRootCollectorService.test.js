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

import ShadowRootCollectorService from "./ShadowRootCollectorService";
import { appendShadowHost } from "./ShadowRootCollectorService.test.data";

describe("ShadowRootCollectorService", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    ShadowRootCollectorService.pageContainsShadowDom = false;

    // Need to reset the DOM between each test as we use `appendChild` in the tests
    document.body.innerHTML = "";
  });

  describe("ShadowRootCollectorService::markPageContainsShadowDom", () => {
    it("should raise the pageContainsShadowDom flag", () => {
      expect.assertions(2);

      expect(ShadowRootCollectorService.pageContainsShadowDom).toBe(false);

      ShadowRootCollectorService.markPageContainsShadowDom();

      expect(ShadowRootCollectorService.pageContainsShadowDom).toBe(true);
    });
  });

  describe("ShadowRootCollectorService::collectShadowRoots", () => {
    it("should return an empty array and leave the latch untouched on a shadow-less page", () => {
      expect.assertions(2);

      document.body.innerHTML = "<div><input type='text'/></div>";

      expect(ShadowRootCollectorService.collectShadowRoots(document)).toEqual([]);
      expect(ShadowRootCollectorService.pageContainsShadowDom).toBe(false);
    });

    it("should collect open shadow roots under the document and raise the latch", () => {
      expect.assertions(2);

      const { shadowRoot } = appendShadowHost();

      expect(ShadowRootCollectorService.collectShadowRoots(document)).toEqual([shadowRoot]);
      expect(ShadowRootCollectorService.pageContainsShadowDom).toBe(true);
    });

    it("should not descend into ignored subtrees", () => {
      expect.assertions(1);

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      appendShadowHost(svg);
      document.body.appendChild(svg);

      expect(ShadowRootCollectorService.collectShadowRoots(document)).toEqual([]);
    });

    it("should collect shadow roots from an element", () => {
      expect.assertions(1);

      const container = document.createElement("section");
      const { shadowRoot } = appendShadowHost(container);
      document.body.appendChild(container);

      expect(ShadowRootCollectorService.collectShadowRoots(container)).toEqual([shadowRoot]);
    });

    it("should resolve the shadow root of the node itself", () => {
      expect.assertions(1);

      const { host, shadowRoot } = appendShadowHost();

      expect(ShadowRootCollectorService.collectShadowRoots(host)).toEqual([shadowRoot]);
    });

    it("should not return shadow roots already present in the seen set", () => {
      expect.assertions(2);

      const { shadowRoot: firstRoot } = appendShadowHost();
      const { shadowRoot: secondRoot } = appendShadowHost();

      const seen = new Set([firstRoot]);
      const result = ShadowRootCollectorService.collectShadowRoots(document, seen);

      expect(result).toEqual([secondRoot]);
      expect(seen.has(secondRoot)).toBe(true);
    });

    it("should return an empty array for a non-element node or an ignored element", () => {
      expect.assertions(2);

      const textNode = document.createTextNode("hello");
      const script = document.createElement("script");

      expect(ShadowRootCollectorService.collectShadowRoots(textNode)).toEqual([]);
      expect(ShadowRootCollectorService.collectShadowRoots(script)).toEqual([]);
    });
  });
});
