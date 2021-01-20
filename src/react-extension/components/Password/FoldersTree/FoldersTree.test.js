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
 * Unit tests on FoldersTree in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./FoldersTree.test.data";
import FoldersTreePage from "./FoldersTree.test.page";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import FoldersTreeRootFolderContextualMenu from "./FoldersTreeRootFolderContextualMenu";

beforeEach(() => {
  jest.resetModules();
});

describe("See Folders", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);

  describe('As LU I see the folders', () => {
    /**
     * Given an organization with 5 Folders
     * Then I should see the 5 Folders on the left sidebar
     * And I should see the Folders sorted alphabetically
     * And I should be able to see each Folder name
     */

    beforeEach(() => {
      page = new FoldersTreePage(context, props);
    });

    it('As LU I should collapse the folder tree area', async() => {
      expect(page.foldersTree.exists()).toBeTruthy();
      expect(page.foldersTree.displayFolderList).toBeTruthy();
      await page.foldersTree.toggleExpanded();
      expect(page.foldersTree.displayFolderList).toBeFalsy();
      await page.foldersTree.toggleExpanded();
      expect(page.foldersTree.displayFolderList).toBeTruthy();
      expect(page.foldersTree.rootFolderName).toBe('Folders');
    });

    it('As LU I should be able to filter by root folder', async() => {
      await page.title.click();
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords`, {filter: {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER}});
    });

    it('As LU I should be able to open a contextual menu for root folder with the more button', async() => {
      await page.foldersTree.openContextualMenuWithButton;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FoldersTreeRootFolderContextualMenu, {});
    });

    it('As LU I should be able to open a contextual menu for root folder with right click', async() => {
      await page.foldersTree.openContextualMenuWithRightClick;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FoldersTreeRootFolderContextualMenu, {});
    });

    it('As LU I should be able to drag and drop a folder on the root folder', async() => {
      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      await page.foldersTreeItem.dragStartOnFolder(1);
      await page.foldersTreeItem.dragEndOnFolder(1);
      await page.foldersTree.onDragOver;
      await page.foldersTree.onDragLeave;
      await page.foldersTree.onDragOver;
      await page.foldersTree.onDrop;
      const data = {folders: [], resources: [], folderParentId: null};
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.folders.open-move-confirmation-dialog", data);
    });

    it('As LU I should be able to drag and drop a folder on another folder', async() => {
      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      await page.foldersTreeItem.toggleDisplayChildFolders(2);
      await page.foldersTreeItem.dragStartOnFolder(3);
      await page.foldersTreeItem.dragEndOnFolder(3);
      await page.foldersTreeItem.onDropFolder(1);
      const data = {folders: [], resources: [], folderParentId: '9e03fd73-04c0-5514-95fa-1a6cf2c7c093'};
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.folders.open-move-confirmation-dialog", data);
    });

    it('As LU I should be able to open and close folder to see or not the child folders', async() => {
      expect(page.foldersTreeItem.count).toBe(2);
      await page.foldersTreeItem.toggleDisplayChildFolders(2);
      expect(page.foldersTreeItem.count).toBe(3);
      await page.foldersTreeItem.toggleDisplayChildFolders(2);
      expect(page.foldersTreeItem.count).toBe(2);
    });
  });

  describe('As LU I should see the Folder section empty', () => {
    const context = defaultAppContext(); // The applicative context
    const props = defaultProps();
    props.context.folders = [];
    /**
     * Given an organization with 0 Folders
     * Then I should see the Folder section empty
     */

    beforeEach(() => {
      page = new FoldersTreePage(context, props);
    });

    it('I should see the Folders section empty', () => {
      expect(page.foldersTree.isEmpty()).toBeTruthy();
    });
  });
});
