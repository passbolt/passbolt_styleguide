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
 * @since         5.2.0
 */

/**
 * Unit tests on DisplayResourceUrisBadge in regard of specifications
 */

import { defaultProps, propsWithLargeAmountOfUris } from "./DisplayResourceUrisBadge.test.data";
import DisplayResourceUrisBadgePage from "./DisplayResourceUrisBadge.test.page";
import "../../../../../test/mocks/mockPortal";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourceUrisBadge", () => {
  let page; // The page to test against

  describe("As LU I can see the resource uris badge.", () => {
    it("As LU I can see the resource uris badge counter.", () => {
      expect.assertions(2);

      const props = defaultProps();
      page = new DisplayResourceUrisBadgePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.count.textContent).toEqual("+3");
    });

    it("As LU I can see the resource uris badge counter 99+.", () => {
      expect.assertions(2);

      const props = propsWithLargeAmountOfUris();
      page = new DisplayResourceUrisBadgePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.count.textContent).toEqual("99+");
    });
  });

  describe("As LU I can see the additional resource uris", () => {
    it("As LU I can see the additional resource uris on the tooltip.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      page = new DisplayResourceUrisBadgePage(props);
      jest
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({ x: 0, y: 0, widths: 100, height: 500, top: 0, right: 400, bottom: 500, left: 0 }));

      await page.hover(page.tooltip);

      expect(page.listUris).toBeDefined();
      expect(page.listUris.textContent).toEqual(props.additionalUris.join(""));
    });
  });
});
