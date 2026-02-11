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
 * Unit tests on TagItem in regard of specifications
 */

import { defaultProps, defaultTagData } from "./TagItem.test.data";
import TagItemTestPage from "./TagItem.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("TagItem", () => {
  describe("As LU I can see a tag item", () => {
    it("should display the tag slug in the button", () => {
      expect.assertions(1);

      const tag = defaultTagData({ slug: "my-custom-tag" });
      const props = defaultProps({ tag });
      const page = new TagItemTestPage(props);

      expect(page.tagContent).toEqual("my-custom-tag");
    });

    it("should have the tag slug as button title attribute", () => {
      expect.assertions(1);

      const tag = defaultTagData({ slug: "my-custom-tag" });
      const props = defaultProps({ tag });
      const page = new TagItemTestPage(props);

      expect(page.title).toEqual("my-custom-tag");
    });
  });

  describe("As LU I can click on a tag item", () => {
    it("should call onClick prop with tag object when clicked", () => {
      expect.assertions(2);

      const tag = defaultTagData({ slug: "clickable-tag" });
      const onClick = jest.fn();
      const props = defaultProps({ tag, onClick });
      const page = new TagItemTestPage(props);

      page.click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(tag);
    });

    it("should stop event propagation on click", () => {
      expect.assertions(1);

      const tag = defaultTagData({ slug: "clickable-tag" });
      const onClick = jest.fn();
      const props = defaultProps({ tag, onClick });
      const page = new TagItemTestPage(props);

      const event = page.click();

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it("should not throw when onClick is not provided", () => {
      expect.assertions(1);

      const tag = defaultTagData({ slug: "clickable-tag" });
      const props = defaultProps({ tag, onClick: undefined });
      const page = new TagItemTestPage(props);

      expect(() => page.click()).not.toThrow();
    });
  });
});
