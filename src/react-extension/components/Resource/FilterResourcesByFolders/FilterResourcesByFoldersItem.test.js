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
 * Unit tests on FoldersTreeItem in regard of specifications
 */
import {
  defaultProps,
  foldersMock,
} from "./FilterResourcesByFoldersItem.test.data";
import FilterResourcesByFoldersItemPage from "./FilterResourcesByFoldersItem.test.page";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see each folders", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const requestMockImpl = jest.fn((message, data) => data);
  const mockContextRequest = (context, implementation) => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  mockContextRequest(props.context, requestMockImpl);

  describe('As LU I should see and identify each folders open', () => {
    /**
     * Given an organization with 4 Folders
     * Then I should see the 4 Folders
     * And I should see the Folders sorted alphabetically
     * And I should be able to see each folder name
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersItemPage(props);
    });

    it('As LU I should see the folders name and open it', async() => {
      expect.assertions(4);
      expect(page.filterResourcesByFoldersItem.exists()).toBeTruthy();
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1);
      expect(page.filterResourcesByFoldersItem.count).toBe(1);
      expect(props.toggleOpenFolder).toHaveBeenCalled();
      expect(props.toggleCloseFolder).not.toHaveBeenCalled();
    });

    it('As LU I should see the folders name and close it', async() => {
      expect.assertions(3);
      expect(page.filterResourcesByFoldersItem.exists()).toBeTruthy();
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1);
      expect(props.toggleOpenFolder).toHaveBeenCalled();
      expect(props.toggleCloseFolder).toHaveBeenCalled();
    });

    it('As LU I should filter by folder', async() => {
      await page.filterResourcesByFoldersItem.filter(1);
      expect(props.history.push).toHaveBeenCalledWith('/app/folders/view/3ed65efd-7c41-5906-9c02-71e2d95951da');
    });

    it('As LU I should be able to open a contextual menu for a folder with the more button', async() => {
      await page.filterResourcesByFoldersItem.openContextualMenuWithButton(1);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {folder: foldersMock[0], className: 'right', left: 0, top: 19, onBeforeHide: expect.any(Function)});
    });

    it('As LU I should be able to open a contextual menu for a folder with right click on parent folder', async() => {
      await page.filterResourcesByFoldersItem.openContextualMenuWithRightClick(1);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {folder: foldersMock[0]});
    });
  });
});
