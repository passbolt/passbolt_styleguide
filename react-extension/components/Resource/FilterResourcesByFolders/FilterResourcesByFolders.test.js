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
import { defaultProps, foldersMock } from "./FilterResourcesByFolders.test.data";
import { ResourceWorkspaceFilterTypes } from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByRootFolderContextualMenu from "./FilterResourcesByRootFolderContextualMenu";
import FilterResourcesByFoldersPage from "./FilterResourcesByFolders.test.page";
import { defaultResourcesDtos } from "../../../../shared/models/entity/resource/resourcesCollection.test.data";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { TEST_RESOURCE_TYPE_V5_DEFAULT } from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ActionAbortedMissingMetadataKeys from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";
import { v4 as uuidv4 } from "uuid";
import { defaultResourceDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultFolderDto } from "../../../../shared/models/entity/folder/folderEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Folders", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const requestMockImpl = jest.fn((message, data) => data);
  const mockContextRequest = (context, implementation) =>
    jest.spyOn(props.context.port, "request").mockImplementation(implementation);
  mockContextRequest(props.context, requestMockImpl);

  describe("As LU I see the folders", () => {
    /**
     * Given an organization with 5 Folders
     * Then I should see the 5 Folders on the left sidebar
     * And I should see the Folders sorted alphabetically
     * And I should be able to see each Folder name
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(props);
    });

    it("As LU I should collapse the folder tree area", async () => {
      expect.assertions(5);
      expect(page.filterResourcesByFolders.exists()).toBeTruthy();
      expect(page.filterResourcesByFolders.displayFolderList).toBeTruthy();
      await page.filterResourcesByFolders.toggleExpanded();
      expect(page.filterResourcesByFolders.displayFolderList).toBeFalsy();
      await page.filterResourcesByFolders.toggleExpanded();
      expect(page.filterResourcesByFolders.displayFolderList).toBeTruthy();
      expect(page.filterResourcesByFolders.rootFolderName).toBe("My workspace");
    });

    it("As LU I should see all folders name", async () => {
      expect.assertions(12);
      expect(page.filterResourcesByFolders.exists()).toBeTruthy();
      expect(page.filterResourcesByFoldersItem.exists()).toBeTruthy();
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      expect(page.filterResourcesByFoldersItem.count).toBe(8);
      expect(page.filterResourcesByFoldersItem.name(1)).toBe("1. Test");
      expect(page.filterResourcesByFoldersItem.name(2)).toBe("2. Test");
      expect(page.filterResourcesByFoldersItem.name(3)).toBe("10. Test");
      expect(page.filterResourcesByFoldersItem.name(4)).toBe("Accounting");
      expect(page.filterResourcesByFoldersItem.name(5)).toBe("ParentCertificates");
      expect(page.filterResourcesByFoldersItem.name(6)).toBe("Certificates");
      expect(page.filterResourcesByFoldersItem.name(7)).toBe("ChildCertificates1");
      expect(page.filterResourcesByFoldersItem.name(8)).toBe("ChildCertificates2");
      expect(page.filterResourcesByFoldersItem.selectedFolderName).toBe("Accounting");
    });

    it("As LU I should be able to close folder to hide the child folders", async () => {
      expect.assertions(2);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      expect(page.filterResourcesByFoldersItem.count).toBe(8);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      expect(page.filterResourcesByFoldersItem.count).toBe(5);
    });

    it("As LU I should be able to filter by root folder", async () => {
      expect.assertions(1);
      await page.title.click();
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords`, {
        filter: { type: ResourceWorkspaceFilterTypes.ROOT_FOLDER },
      });
    });

    it("As LU I should be able to open a contextual menu for root folder with the more button", async () => {
      expect.assertions(1);
      await page.filterResourcesByFolders.openContextualMenuWithButton;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByRootFolderContextualMenu, {
        className: "right",
        left: 0,
        top: 19,
        onBeforeHide: expect.any(Function),
      });
    });

    it("As LU I should be able to open a contextual menu for root folder with right click", async () => {
      expect.assertions(1);
      await page.filterResourcesByFolders.openContextualMenuWithRightClick;
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByRootFolderContextualMenu, {
        left: 0,
        top: 0,
      });
    });

    it("As LU I should be able to open a contextual menu for a folder with right click on a child folder", async () => {
      expect.assertions(1);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.openContextualMenuWithRightClick(6);
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(FilterResourcesByFoldersItemContextualMenu, {
        folder: foldersMock[2],
        left: 0,
        top: 0,
      });
    });

    it("As LU I should be able to drag and drop a folder on the root folder", async () => {
      expect.assertions(3);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(1);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(1);
      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDragLeave;
      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDrop;
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.folders.move-by-id",
        "3ed65efd-7c41-5906-9c02-71e2d95951db",
        null,
      );
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
    });

    it("As LU I should be able to drag and drop a folder on another folder", async () => {
      expect.assertions(2);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(5);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(5);
      await page.filterResourcesByFoldersItem.onDropFolder(4);
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.folders.move-by-id",
        "3ed65efd-7c41-5906-9c02-71e2d95951db",
        foldersMock[0].id,
      );
    });

    it("As LU I should throw an error dialog if somethings went wrong when a folder is dropped", async () => {
      expect.assertions(2);

      const error = new Error("ERROR");
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => {
        throw error;
      });

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(5);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(5);
      await page.filterResourcesByFoldersItem.onDropFolder(4);

      // Throw dialog general error message
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.folders.move-by-id",
        "3ed65efd-7c41-5906-9c02-71e2d95951db",
        foldersMock[0].id,
      );
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: error });
    });

    it("As LU I should be able to open and close folder to see or not the child folders", async () => {
      expect.assertions(3);

      expect(page.filterResourcesByFoldersItem.count).toBe(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      expect(page.filterResourcesByFoldersItem.count).toBe(6);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      expect(page.filterResourcesByFoldersItem.count).toBe(5);
    });
  });

  describe("As LU I should be able to drag and drop resources on folders", () => {
    it("As LU I should be able to drag and drop resources on the root folder", async () => {
      expect.assertions(2);
      const resources = defaultResourcesDtos();
      const props = defaultProps({
        dragContext: {
          dragging: true,
          draggedItems: {
            folders: [],
            resources: resources,
          },
          onDragStart: jest.fn(),
          onDragEnd: jest.fn(),
        },
      });

      props.context.port.addRequestListener(
        "passbolt.resources.move-by-ids",
        async (resourcesIds, destinationFolder) => {
          expect(destinationFolder).toBeNull();
          expect(resourcesIds).toStrictEqual(resources.map((r) => r.id));
        },
      );

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDragLeave;
      await page.filterResourcesByFolders.onDragOver;
      await page.filterResourcesByFolders.onDrop;
    });

    it("As LU I should be able to drag and drop resources on another folder", async () => {
      expect.assertions(4);
      const resources = defaultResourcesDtos();
      const props = defaultProps({
        dragContext: {
          dragging: true,
          draggedItems: {
            folders: [],
            resources: resources,
          },
          onDragStart: jest.fn(),
          onDragEnd: jest.fn(),
        },
      });

      props.context.port.addRequestListener(
        "passbolt.resources.move-by-ids",
        async (resourcesIds, destinationFolder) => {
          expect(destinationFolder).toStrictEqual(foldersMock[4].id);
          expect(resourcesIds).toStrictEqual(resources.map((r) => r.id));
        },
      );

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(7);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.dragLeaveOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.onDropFolder(7);
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
    });

    it("As LU I should not be able to drag and drop personal resources v5 on a shared folder if I have missing keys", async () => {
      expect.assertions(3);
      const resources = [
        defaultResourceDto(),
        defaultResourceDto({ personal: true, resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT }),
      ];
      const props = defaultProps({
        dragContext: {
          dragging: true,
          draggedItems: {
            folders: [],
            resources: resources,
          },
          onDragStart: jest.fn(),
          onDragEnd: jest.fn(),
        },
      });
      props.context.loggedInUser = defaultUserDto({ missing_metadata_key_ids: [uuidv4()] }, { withRole: true });

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(7);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.dragLeaveOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.onDropFolder(7);
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
      expect(props.dialogContext.open).toHaveBeenNthCalledWith(1, ActionAbortedMissingMetadataKeys);
    });

    it("As LU I should not be able to drag and drop a folder on a shared folder if I have missing keys", async () => {
      expect.assertions(3);
      const props = defaultProps();
      props.context.loggedInUser = defaultUserDto({ missing_metadata_key_ids: [uuidv4()] }, { withRole: true });

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(7);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.dragLeaveOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.onDropFolder(7);
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
      expect(props.dialogContext.open).toHaveBeenNthCalledWith(1, ActionAbortedMissingMetadataKeys);
    });

    it("As LU I should throw an error dialog if somethings went wrong when a resource is dropped", async () => {
      expect.assertions(2);
      const resources = defaultResourcesDtos();
      const props = defaultProps({
        dragContext: {
          dragging: true,
          draggedItems: {
            folders: [],
            resources: resources,
          },
          onDragStart: jest.fn(),
          onDragEnd: jest.fn(),
        },
      });

      const error = new Error("ERROR");
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => {
        throw error;
      });

      const page = new FilterResourcesByFoldersPage(props);

      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(5);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(6);
      await page.filterResourcesByFoldersItem.dragStartOnFolder(7);
      await page.filterResourcesByFoldersItem.dragEndOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.dragLeaveOnFolder(7);
      await page.filterResourcesByFoldersItem.dragOverOnFolder(7);
      await page.filterResourcesByFoldersItem.onDropFolder(7);

      // Throw dialog general error message
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.move-by-ids",
        resources.map((resource) => resource.id),
        foldersMock[4].id,
      );
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: error });
    });
  });

  describe("As LU I should see the Folder section open to the selected folder with parent open", () => {
    const props = defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        filter: {
          type: ResourceWorkspaceFilterTypes.FOLDER,
          payload: {
            folder: foldersMock[5],
          },
        },
      }),
      match: {
        params: {
          filterByFolderId: foldersMock[5].id,
        },
      },
    });
    /**
     * Given an organization with 5 Folders with a child folder selected
     * Then I should see the Folder selected with parent folder open
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(props);
    });

    it("As LU I should see selected folder name with parents open", () => {
      expect.assertions(7);
      expect(page.filterResourcesByFoldersItem.count).toBe(5);
      expect(page.filterResourcesByFoldersItem.name(1)).toBe("1. Test");
      expect(page.filterResourcesByFoldersItem.name(2)).toBe("2. Test");
      expect(page.filterResourcesByFoldersItem.name(3)).toBe("10. Test");
      expect(page.filterResourcesByFoldersItem.name(4)).toBe("Accounting");
      expect(page.filterResourcesByFoldersItem.name(5)).toBe("ParentCertificates");
      expect(page.filterResourcesByFoldersItem.selectedFolderName).toBe("1. Test");
    });
  });

  describe("As LU I should see the Folder section empty", () => {
    const props = defaultProps();
    props.context.folders = [];
    /**
     * Given an organization with 0 Folders
     * Then I should see the Folder section empty
     */

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(props);
    });

    it("I should see the Folders section empty", () => {
      expect(page.filterResourcesByFolders.isEmpty()).toBeTruthy();
    });
  });

  describe("As LU I see a loading feedback in the section when the folders are not yet fetched", () => {
    const props = defaultProps();
    props.context.folders = null;

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(props);
    });

    it("I should see the loading message “Retrieving folders", async () => {
      expect(page.filterResourcesByFolders.isLoading()).toBeTruthy();
    });
  });

  describe("As LU I collapse a folder containing a branch several levels deep", () => {
    const rootFolder = defaultFolderDto({ id: uuidv4(), name: "A root", folder_parent_id: null });
    const level1Folder = defaultFolderDto({ id: uuidv4(), name: "B level 1", folder_parent_id: rootFolder.id });
    const level2Folder = defaultFolderDto({ id: uuidv4(), name: "C level 2", folder_parent_id: level1Folder.id });
    const level3Folder = defaultFolderDto({ id: uuidv4(), name: "D level 3", folder_parent_id: level2Folder.id });
    // The deepest folders are deliberately listed before their parents.
    const folders = [rootFolder, level3Folder, level2Folder, level1Folder];

    /**
     * Mimic the hierarchy cache of the app context: the list of the ancestors of a folder, root first.
     * @param {array<object>} folders The folders
     * @returns {function(string): array<object>}
     */
    const hierarchyFolderCache = (folders) => (folderId) => {
      const hierarchy = [];
      let folder = folders.find((folder) => folder.id === folderId);
      while (folder?.folder_parent_id) {
        const parentFolder = folders.find((candidate) => candidate.id === folder.folder_parent_id);
        if (!parentFolder) {
          break;
        }
        hierarchy.unshift(parentFolder);
        folder = parentFolder;
      }
      return hierarchy;
    };

    const propsWithFolders = (folders) =>
      defaultProps({
        context: defaultAppContext({
          folders,
          foldersMapById: folders.reduce((result, folder) => {
            result[folder.id] = folder;
            return result;
          }, {}),
          getHierarchyFolderCache: hierarchyFolderCache(folders),
        }),
        match: { params: {} },
        dragContext: {
          dragging: false,
          draggedItems: { folders: [], resources: [] },
          onDragStart: jest.fn(),
          onDragEnd: jest.fn(),
        },
      });

    beforeEach(() => {
      page = new FilterResourcesByFoldersPage(propsWithFolders(folders));
    });

    it("As LU I should not see the deepest folders at the top of the tree after closing the top folder", async () => {
      expect.assertions(5);
      expect(page.filterResourcesByFoldersItem.count).toBe(1);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // open A root
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2); // open B level 1
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(3); // open C level 2
      expect(page.filterResourcesByFoldersItem.count).toBe(4);
      expect(page.filterResourcesByFoldersItem.name(4)).toBe("D level 3");
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // close A root
      expect(page.filterResourcesByFoldersItem.count).toBe(1);
      expect(page.filterResourcesByFoldersItem.name(1)).toBe("A root");
    });

    it("As LU I should see the branch fully collapsed when I open the top folder again", async () => {
      expect.assertions(4);
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // open A root
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2); // open B level 1
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(3); // open C level 2
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // close A root
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // open A root again
      expect(page.filterResourcesByFoldersItem.count).toBe(2);
      expect(page.filterResourcesByFoldersItem.name(2)).toBe("B level 1");
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2); // open B level 1 again
      // C level 2 was closed with its parent: its own child must not be displayed yet.
      expect(page.filterResourcesByFoldersItem.count).toBe(3);
      expect(page.filterResourcesByFoldersItem.name(3)).toBe("C level 2");
    });

    it("As LU I should not see the children of a folder moved under a closed folder at the top of the tree", async () => {
      expect.assertions(4);
      const otherRootFolder = defaultFolderDto({ id: uuidv4(), name: "Z root", folder_parent_id: null });
      const foldersBeforeMove = [rootFolder, otherRootFolder, level1Folder, level2Folder];
      page = new FilterResourcesByFoldersPage(propsWithFolders(foldersBeforeMove));
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(1); // open A root
      await page.filterResourcesByFoldersItem.toggleDisplayChildFolders(2); // open B level 1
      expect(page.filterResourcesByFoldersItem.count).toBe(4);
      // B level 1 is moved under the closed Z root while it is still opened.
      const movedLevel1Folder = { ...level1Folder, folder_parent_id: otherRootFolder.id };
      const foldersAfterMove = [rootFolder, otherRootFolder, movedLevel1Folder, level2Folder];
      page.rerender(propsWithFolders(foldersAfterMove));
      expect(page.filterResourcesByFoldersItem.count).toBe(2);
      expect(page.filterResourcesByFoldersItem.name(1)).toBe("A root");
      expect(page.filterResourcesByFoldersItem.name(2)).toBe("Z root");
    });
  });
});
