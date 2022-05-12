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
} from "./FilterResourcesByFoldersItemContextualMenu.test.data";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import RenameResourceFolder from "../../ResourceFolder/RenameResourceFolder/RenameResourceFolder";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import DeleteResourceFolder from "../../ResourceFolder/DeleteResourceFolder/DeleteResourceFolder";
import FilterResourcesByFoldersItemContextualMenuPage from "./FilterResourcesByFoldersItemContextualMenu.test.page";

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
      page = new FilterResourcesByFoldersItemContextualMenuPage(context, props);
    });

    it('As LU I should see all menu name', () => {
      expect(page.filterResourcesByFoldersItemContextualMenu.name(1)).toBe("Create folder");
      expect(page.filterResourcesByFoldersItemContextualMenu.name(2)).toBe("Rename");
      expect(page.filterResourcesByFoldersItemContextualMenu.name(3)).toBe("Share");
      expect(page.filterResourcesByFoldersItemContextualMenu.name(4)).toBe("Export");
      expect(page.filterResourcesByFoldersItemContextualMenu.name(5)).toBe("Delete");
    });

    it('As LU I can start to create a folder', async() => {
      await page.filterResourcesByFoldersItemContextualMenu.createFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to rename a folder', async() => {
      await page.filterResourcesByFoldersItemContextualMenu.renameFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(RenameResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to share a folder', async() => {
      await page.filterResourcesByFoldersItemContextualMenu.shareFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to export a folder', async() => {
      await page.filterResourcesByFoldersItemContextualMenu.exportFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResources);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to delete a folder', async() => {
      await page.filterResourcesByFoldersItemContextualMenu.deleteFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteResourceFolder);
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
      page = new FilterResourcesByFoldersItemContextualMenuPage(context, props);
    });

    it('As LU I should see all menu disabled', async() => {
      expect(page.filterResourcesByFoldersItemContextualMenu.menuItem(1).className).toBe("disabled");
      expect(page.filterResourcesByFoldersItemContextualMenu.menuItem(2).className).toBe("disabled");
      expect(page.filterResourcesByFoldersItemContextualMenu.menuItem(3).className).toBe("disabled");
      expect(page.filterResourcesByFoldersItemContextualMenu.menuItem(4).className).toBe("");
      expect(page.filterResourcesByFoldersItemContextualMenu.menuItem(5).className).toBe("disabled");
    });
  });
});
