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
 * Unit tests on FilterResourcesByFolders in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./FilterResourcesByFolders.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByRootFolderContextualMenu from "./FilterResourcesByRootFolderContextualMenu";
import FilterResourcesByFoldersPage from "./FilterResourcesByFolders.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See Folders", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const requestMockImpl = jest.fn((message, data) => data);
  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  mockContextRequest(context, requestMockImpl);

  describe('As LU I see the folders', () => {
    /**
     * Given an organization with 5 Folders
     * Then I should see the 5 Folders on the left sidebar
     * And I should see the Folders sorted alphabetically
     * And I should be able to see each Folder name
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(context, props);
    });

    it('As LU I should collapse the folder tree area', async() => {
      expect(page.filterResourcesByFolders.exists()).toBeTruthy();
      expect(page.filterResourcesByFolders.displayFolderList).toBeTruthy();
      await page.filterResourcesByFolders.toggleExpanded();
      expect(page.filterResourcesByFolders.displayFolderList).toBeFalsy();
      await page.filterResourcesByFolders.toggleExpanded();
      expect(page.filterResourcesByFolders.displayFolderList).toBeTruthy();
      expect(page.filterResourcesByFolders.rootFolderName).toBe('Folders');
    });

    it('As LU I should be able to filter by root folder', async() => {
      await page.title.click();
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords`, {filter: {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER}});
    });

    it('As LU I should be able to open a contextual menu for root folder with the more button', async() => {
      await page.filterResourcesByFolders.openContextualMenuWithButton;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByRootFolderContextualMenu, {className: "right", left: 0, top: 18, onBeforeHide: expect.any(Function)});
    });

    it('As LU I should be able to open a contextual menu for root folder with right click', async() => {
      await page.filterResourcesByFolders.openContextualMenuWithRightClick;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByRootFolderContextualMenu, {});
    });

    it('As LU I should be able to drag and drop a folder on the root folder', async() => {
      await page.filterResourcesByFoldersItem.dragStartOnFolder(1);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(1);
      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDragLeave;
      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDrop;
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(context.port.request).toHaveBeenCalledWith("passbolt.folders.open-move-confirmation-dialog", {folders: ["3ed65efd-7c41-5906-9c02-71e2d95951db"], resources: [], folderParentId: null});
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
    });

    it('As LU I should be able to drag and drop a folder on another folder', async() => {
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(3);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(3);
      await page.filterResourcesByFoldersItem.onDropFolder(1);
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(context.port.request).toHaveBeenCalledWith("passbolt.folders.open-move-confirmation-dialog", {folders: ["3ed65efd-7c41-5906-9c02-71e2d95951db"], resources: [], folderParentId: null});
    });

    it('As LU I should be able to open and close folder to see or not the child folders', async() => {
      expect(page.filterResourcesByFoldersItem.count).toBe(2);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2);
      expect(page.filterResourcesByFoldersItem.count).toBe(3);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2);
      expect(page.filterResourcesByFoldersItem.count).toBe(2);
    });
  });

  describe('As LU I should see the Folder section empty', () => {
    const context = defaultAppContext(); // The applicative context
    const props = defaultProps();
    context.folders = [];
    /**
     * Given an organization with 0 Folders
     * Then I should see the Folder section empty
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(context, props);
    });

    it('I should see the Folders section empty', () => {
      expect(page.filterResourcesByFolders.isEmpty()).toBeTruthy();
    });
  });
});
