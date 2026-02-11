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
 * @since         5.10.0
 */

/**
 * Unit tests on DisplayResourceTagsBadge in regard of specifications
 */

import { defaultProps, propsWithLargeAmountOfTags, propsWithNoTags } from "./DisplayResourceTagsBadge.test.data";
import DisplayResourceTagsBadgePage from "./DisplayResourceTagsBadge.test.page";
import "../../../../../test/mocks/mockPortal";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourceTagsBadge", () => {
  describe("As LU I can see the resource tags badge", () => {
    it("should display the badge with correct count", () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new DisplayResourceTagsBadgePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.count.textContent).toEqual("+3");
    });

    it("should display 99+ when more than 99 tags are hidden", () => {
      expect.assertions(2);

      const props = propsWithLargeAmountOfTags();
      const page = new DisplayResourceTagsBadgePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.count.textContent).toEqual("99+");
    });

    it("should not render when there are no hidden tags", () => {
      expect.assertions(1);

      const props = propsWithNoTags();
      const page = new DisplayResourceTagsBadgePage(props);

      expect(page.exists).toBeFalsy();
    });
  });

  describe("As LU I can see the hidden tags in the tooltip", () => {
    it("should display all hidden tags in the tooltip on hover", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new DisplayResourceTagsBadgePage(props);
      jest
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({ x: 0, y: 0, width: 100, height: 500, top: 0, right: 400, bottom: 500, left: 0 }));

      await page.hover(page.tooltip);

      expect(page.tagsList).toBeDefined();
      expect(page.tagItems.length).toEqual(3);
    });

    it("should display tag slugs in the tooltip", async () => {
      expect.assertions(4);

      const props = defaultProps();
      const page = new DisplayResourceTagsBadgePage(props);
      jest
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({ x: 0, y: 0, width: 100, height: 500, top: 0, right: 400, bottom: 500, left: 0 }));

      await page.hover(page.tooltip);

      expect(page.tagsList).toBeDefined();
      expect(page.tagsList.textContent).toContain("alpha");
      expect(page.tagsList.textContent).toContain("beta");
      expect(page.tagsList.textContent).toContain("gamma");
    });
  });

  describe("As LU I can click on a tag in the tooltip", () => {
    it("should call onTagClick when clicking a tag in the tooltip", async () => {
      expect.assertions(2);

      const onTagClick = jest.fn();
      const props = defaultProps({ onTagClick });
      const page = new DisplayResourceTagsBadgePage(props);
      jest
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({ x: 0, y: 0, width: 100, height: 500, top: 0, right: 400, bottom: 500, left: 0 }));

      await page.hover(page.tooltip);
      page.clickTag(0);

      expect(onTagClick).toHaveBeenCalledTimes(1);
      expect(onTagClick).toHaveBeenCalledWith(props.hiddenTags[0]);
    });
  });
});
