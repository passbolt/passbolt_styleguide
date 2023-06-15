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
 * Unit tests on FoldersTreeItemContextualMenuContextualMenu in regard of specifications
 */
import {
  defaultProps, propsWithDenyUiAction,
  propsWithFolderPermissionRead,
  propsWithFolderPermissionUpdate
} from "./FilterResourcesByFoldersItemContextualMenu.test.data";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import RenameResourceFolder from "../../ResourceFolder/RenameResourceFolder/RenameResourceFolder";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import DeleteResourceFolder from "../../ResourceFolder/DeleteResourceFolder/DeleteResourceFolder";
import FilterResourcesByFoldersItemContextualMenuPage from "./FilterResourcesByFoldersItemContextualMenu.test.page";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("FilterResourcesByFoldersItemContextualMenu", () => {
  describe('As LU I can create a folder in a folder.', () => {
    it('As LU I can create a folder in a folder I have at least an update permission on.', async() => {
      const props = defaultProps(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.createFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot create a folder in a folder I have read only access.', async() => {
      const props = propsWithFolderPermissionRead(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.createItem.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can rename a folder.', () => {
    it('As LU I can rename a folder I have at least an update permission on.', async() => {
      const props = defaultProps(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.renameFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(RenameResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot rename a folder in a folder I have read only access.', async() => {
      const props = propsWithFolderPermissionRead(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.renameItem.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can share a folder.', () => {
    it('As LU I can share a folder I have owner permission on.', async() => {
      const props = defaultProps(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.shareFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot share a folder I have read only access.', async() => {
      const props = propsWithFolderPermissionRead(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.shareItem.hasAttribute("disabled")).toBeTruthy();
    });

    it('As LU I cannot share a folder I have update permission on.', async() => {
      const props = propsWithFolderPermissionUpdate(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.shareItem.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can export a folder.', () => {
    it('As LU I can export a folder.', async() => {
      const props = defaultProps(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.exportFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResources);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot export a folder if disabled by API flag.', async() => {
      const appContext = {
        siteSettings: {
          canIUse: () => false
        }
      };
      const context = defaultUserAppContext(appContext); // The applicative context
      const props = defaultProps({context});
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.exportItem).toBeNull();
    });

    it('As LU I cannot export a folder if denied by RBAC.', async() => {
      const props = propsWithDenyUiAction();
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.exportItem).toBeNull();
    });
  });

  describe('As LU I can delete a folder.', () => {
    it('As LU I can delete a folder I have owner permission on.', async() => {
      const props = defaultProps(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.deleteFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can delete a folder I have update permission on.', async() => {
      const props = propsWithFolderPermissionUpdate(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      await page.filterResourcesByFoldersItemContextualMenu.deleteFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot delete a folder I have read only access.', async() => {
      const props = propsWithFolderPermissionRead(); // The props to pass
      const page = new FilterResourcesByFoldersItemContextualMenuPage(props);
      expect(page.filterResourcesByFoldersItemContextualMenu.deleteItem.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
