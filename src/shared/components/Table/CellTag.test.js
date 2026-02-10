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

import CellTagTestPage from "./CellTag.test.page";
import {
  defaultProps,
  propsWithOneTag,
  propsWithTwoTags,
  propsWithThreeTags,
  propsWithManyTags,
  propsWithOver99Tags,
} from "./CellTag.test.data";
import { waitFor } from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
  // Mock offsetWidth for container width calculation
  // Use a large value to ensure all visible tags fit
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: 1000,
  });
});

describe("CellTag", () => {
  describe("As a user I can see tags in a table cell", () => {
    it("should render an empty container when no tags are provided", () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new CellTagTestPage(props);

      expect(page.container).not.toBeNull();
      expect(page.hasTags).toBe(false);
      expect(page.hasBadge).toBe(false);
    });

    it("should render a single tag", () => {
      expect.assertions(2);
      const props = propsWithOneTag();
      const page = new CellTagTestPage(props);

      expect(page.allTagElements.length).toBe(1);
      expect(page.allTagSlugs).toContain("alpha-tag");
    });

    it("should render two tags", () => {
      expect.assertions(2);
      const props = propsWithTwoTags();
      const page = new CellTagTestPage(props);

      expect(page.allTagElements.length).toBe(2);
      expect(page.allTagSlugs).toEqual(["alpha-tag", "beta-tag"]);
    });

    it("should render three tags", () => {
      expect.assertions(2);
      const props = propsWithThreeTags();
      const page = new CellTagTestPage(props);

      expect(page.allTagElements.length).toBe(3);
      expect(page.allTagSlugs).toEqual(["alpha-tag", "beta-tag", "gamma-tag"]);
    });

    it("should render maximum three tags when more are provided", () => {
      expect.assertions(2);
      const props = propsWithManyTags();
      const page = new CellTagTestPage(props);

      expect(page.allTagElements.length).toBe(3);
      expect(page.allTagSlugs).toEqual(["alpha-tag", "beta-tag", "delta-tag"]);
    });
  });

  describe("As a user I can see a badge when there are hidden tags", () => {
    it("should render only three tags when more are provided", async () => {
      expect.assertions(2);
      const props = propsWithManyTags();
      const page = new CellTagTestPage(props);

      await waitFor(() => expect(page.hasBadge).toBe(true));
      expect(page.allTagElements.length).toBe(3);
    });

    it("should render only three tags when over 99 tags are provided", async () => {
      expect.assertions(2);
      const props = propsWithOver99Tags();
      const page = new CellTagTestPage(props);

      await waitFor(() => expect(page.hasBadge).toBe(true));
      expect(page.allTagElements.length).toBe(3);
    });
  });

  describe("As a user I can see tags update when props change", () => {
    it("should update when value prop changes", () => {
      expect.assertions(4);
      const props = propsWithOneTag();
      const page = new CellTagTestPage(props);

      expect(page.allTagElements.length).toBe(1);
      expect(page.allTagSlugs).toContain("alpha-tag");

      const newProps = propsWithTwoTags();
      page.rerender(newProps);

      expect(page.allTagElements.length).toBe(2);
      expect(page.allTagSlugs).toEqual(["alpha-tag", "beta-tag"]);
    });

    it("should handle changing from tags to no tags", () => {
      expect.assertions(2);
      const props = propsWithOneTag();
      const page = new CellTagTestPage(props);

      expect(page.hasTags).toBe(true);

      page.rerender(defaultProps());

      expect(page.hasTags).toBe(false);
    });

    it("should handle changing from no tags to tags", () => {
      expect.assertions(2);
      const props = defaultProps();
      const page = new CellTagTestPage(props);

      expect(page.hasTags).toBe(false);

      page.rerender(propsWithOneTag());

      expect(page.hasTags).toBe(true);
    });
  });

  describe("As a user I can click on a tag", () => {
    it("should call onTagClick when clicking a visible tag", () => {
      expect.assertions(2);
      const onTagClick = jest.fn();
      const props = propsWithOneTag({ onTagClick });
      const page = new CellTagTestPage(props);

      page.clickTag(0);

      expect(onTagClick).toHaveBeenCalledTimes(1);
      expect(onTagClick).toHaveBeenCalledWith(props.value[0]);
    });
  });
});
