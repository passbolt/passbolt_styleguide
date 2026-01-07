/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on DisplayResourceDetailsDescription in regard of specifications
 */
import {
  defaultProps,
  resourceOnlyReadWithNoDescriptionMock,
  resourceOwnedWithNoDescriptionMock,
  resourceWithDescriptionMock,
} from "./DisplayResourceDetailsDescription.test.data";
import DisplayResourceDetailsDescriptionPage from "./DisplayResourceDetailsDescription.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See description", () => {
  let page; // The page to test against

  describe("As LU I see the description of my resources", () => {
    const props = defaultProps({ resourceWorkspaceContext: { details: { resource: resourceWithDescriptionMock } } });

    /**
     * Given a resource with description
     * Then I should see the description
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(props);
    });

    it("I should see the description of the resource", async () => {
      expect.assertions(3);
      await page.title.click();

      expect(page.passwordSidebarDescriptionSection.exists()).toBeTruthy();
      expect(page.passwordSidebarDescriptionSection.description.textContent).toBe(
        resourceWithDescriptionMock.metadata.description,
      );
      expect(page.passwordSidebarDescriptionSection.emptyMessage).toBeNull();
    });
  });

  describe("As LU I should see the description section empty", () => {
    const props = defaultProps({
      resourceWorkspaceContext: { details: { resource: resourceOwnedWithNoDescriptionMock } },
    });
    /**
     * Given a resource owned with 0 description
     * Then I should see the description section empty
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(props);
    });

    it("See an empty message if the resource has no description", async () => {
      expect.assertions(1);
      await page.title.click();
      expect(page.passwordSidebarDescriptionSection.emptyMessage.textContent).toBe("There is no description.");
    });
  });

  describe("As LU with a resource only readable I should see the description", () => {
    const props = defaultProps({
      resourceWorkspaceContext: { details: { resource: resourceOnlyReadWithNoDescriptionMock } },
    });
    /**
     * Given a resource owned with a description
     * Then I should see the description section
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(props);
    });

    it("See a description if the resource has description", async () => {
      expect.assertions(2);
      await page.title.click();
      expect(page.passwordSidebarDescriptionSection.description.textContent).toBe(
        resourceOnlyReadWithNoDescriptionMock.metadata.description,
      );
      expect(page.passwordSidebarDescriptionSection.emptyMessage).toBeNull();
    });
  });
});
