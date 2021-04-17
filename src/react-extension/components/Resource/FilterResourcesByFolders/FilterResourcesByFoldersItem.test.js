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
  defaultAppContext,
  defaultProps,
  defaultPropsCloseFolders,
  foldersMock,
} from "./FilterResourcesByFoldersItem.test.data";
import FilterResourcesByFoldersItemPage from "./FilterResourcesByFoldersItem.test.page";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see each folders", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I should see and identify each folders open', () => {
    const props = defaultProps(); // The props to pass
    /**
     * Given an organization with 4 Folders
     * Then I should see the 4 Folders
     * And I should see the Folders sorted alphabetically
     * And I should be able to see each folder name
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersItemPage(context, props);
    });

    it('As LU I should see all folders name', () => {
      expect(page.filterResourcesByFoldersItem.exists()).toBeTruthy();
      expect(page.filterResourcesByFoldersItem.count).toBe(4);
      expect(page.filterResourcesByFoldersItem.name(1)).toBe("ParentCertificates");
      expect(page.filterResourcesByFoldersItem.name(2)).toBe("Certificates");
      expect(page.filterResourcesByFoldersItem.name(3)).toBe("ChildCertificates1");
      expect(page.filterResourcesByFoldersItem.name(4)).toBe("ChildCertificates2");
    });

    it('As LU I should filter by folder', async() => {
      await page.filterResourcesByFoldersItem.filter(2);
      expect(props.onSelect).toHaveBeenCalled();
    });

    it('As LU I should be able to open a contextual menu for a folder with the more button', async() => {
      await page.filterResourcesByFoldersItem.openContextualMenuWithButton(1);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {folder: foldersMock[1]});
    });

    it('As LU I should be able to open a contextual menu for a folder with right click on parent folder', async() => {
      await page.filterResourcesByFoldersItem.openContextualMenuWithRightClick(1);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {folder: foldersMock[1]});
    });

    it('As LU I should be able to open a contextual menu for a folder with right click on a child folder', async() => {
      await page.filterResourcesByFoldersItem.openContextualMenuWithRightClick(3);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {folder: foldersMock[1]});
    });

    it('As LU I should be able to drag and drop a folder on another folder', async() => {
      await page.filterResourcesByFoldersItem.dragStartOnFolder(3);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(3);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(1);
      await page.filterResourcesByFoldersItem.dragLeaveOnFolder(1);
      await page.filterResourcesByFoldersItem.onDropFolder(1);
      expect(props.onDragStart).toHaveBeenCalled();
      expect(props.onDragEnd).toHaveBeenCalled();
      expect(props.onDrop).toHaveBeenCalled();
    });

    it('As LU I should be able to close folder to hide the child folders', async() => {
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2);
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should see and identify each folders close', () => {
    const props = defaultPropsCloseFolders(); // The props to pass
    /**
     * Given an organization with 4 folders closed
     * Then I should see the 1 Folders
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersItemPage(context, props);
    });

    it('As LU I should be able to open folder to see or not the child folders', async() => {
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1);
      expect(props.onOpen).toHaveBeenCalled();
    });
  });
});
