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
  defaultAppContext,
  defaultProps,
  propsFolderOnlyRead
} from "./FoldersTreeItemContextualMenu.test.data";
import FoldersTreeItemContextualMenuPage from "./FoldersTreeItemContextualMenu.test.page";
import FolderCreateDialog from "../../Folder/FolderCreateDialog/FolderCreateDialog";
import FolderRenameDialog from "../../Folder/FolderRenameDialog/FolderRenameDialog";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import FolderDeleteDialog from "../../Folder/FolderDeleteDialog/FolderDeleteDialog";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see each menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I should see and identify each menu for a folder', () => {
    const props = defaultProps(); // The props to pass
    /**
     * Given an organization with 1 folder
     * Then I should see the 5 menu
     */

    beforeEach(() => {
      page = new FoldersTreeItemContextualMenuPage(context, props);
    });

    it('As LU I should see all menu name', () => {
      expect(page.foldersTreeItemContextualMenu.name(1)).toBe("Create folder");
      expect(page.foldersTreeItemContextualMenu.name(2)).toBe("Rename");
      expect(page.foldersTreeItemContextualMenu.name(3)).toBe("Share");
      expect(page.foldersTreeItemContextualMenu.name(4)).toBe("Export");
      expect(page.foldersTreeItemContextualMenu.name(5)).toBe("Delete");
    });

    it('As LU I can start to create a folder', async() => {
      await page.foldersTreeItemContextualMenu.createFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(FolderCreateDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to rename a folder', async() => {
      await page.foldersTreeItemContextualMenu.renameFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(FolderRenameDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to share a folder', async() => {
      await page.foldersTreeItemContextualMenu.shareFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to export a folder', async() => {
      await page.foldersTreeItemContextualMenu.exportFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResources);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to delete a folder', async() => {
      await page.foldersTreeItemContextualMenu.deleteFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(FolderDeleteDialog);
      expect(props.hide).toHaveBeenCalled();
    });
  });

  describe('As LU I should see and identify each menu disable', () => {
    const props = propsFolderOnlyRead(); // The props to pass
    /**
     * Given an organization with 5 menu
     * Then I should see 4 menu disabled
     */

    beforeEach(() => {
      page = new FoldersTreeItemContextualMenuPage(context, props);
    });

    it('As LU I should see all menu disabled', async() => {
      expect(page.foldersTreeItemContextualMenu.menu(1).className).toBe("ready closed disabled");
      expect(page.foldersTreeItemContextualMenu.menu(2).className).toBe("separator-after ready closed disabled");
      expect(page.foldersTreeItemContextualMenu.menu(3).className).toBe("ready closed disabled");
      expect(page.foldersTreeItemContextualMenu.menu(4).className).toBe("ready closed ");
      expect(page.foldersTreeItemContextualMenu.menu(5).className).toBe("ready closed disabled");
    });
  });
});
