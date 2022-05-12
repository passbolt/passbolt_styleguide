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
 * Unit tests on FoldersTreeRootFolderContextualMenuContextualMenu in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./FilterResourcesByRootFolderContextualMenu.test.data";
import FilterResourcesByRootFolderContextualMenuPage from "./FilterResourcesByRootFolderContextualMenu.test.page";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import ExportResources from "../ExportResources/ExportResources";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see each menu", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As LU I should see and identify each menu for a folder', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given an organization with a root folder folder
     * Then I should see the 2 menu
     */

    beforeEach(() => {
      page = new FilterResourcesByRootFolderContextualMenuPage(context, props);
    });

    it('As LU I should see all menu name', () => {
      expect(page.foldersTreeRootFolderContextualMenu.name(1)).toBe("Create folder");
      expect(page.foldersTreeRootFolderContextualMenu.name(2)).toBe("Export all");
    });

    it('As LU I can start to create a folder', async() => {
      await page.foldersTreeRootFolderContextualMenu.createFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to export a folder', async() => {
      await page.foldersTreeRootFolderContextualMenu.exportFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResources);
      expect(props.hide).toHaveBeenCalled();
    });
  });

  describe('As LU I should see and identify each menu disable', () => {
    const appContext = {
      siteSettings: {
        canIUse: () => false
      }
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 5 menu
     * Then I should see 4 menu disabled
     */

    beforeEach(() => {
      page = new FilterResourcesByRootFolderContextualMenuPage(context, props);
    });

    it('As LU I should see all menu disabled', async() => {
      expect(page.foldersTreeRootFolderContextualMenu.menuRootFolder(1).className).toBe("");
      expect(page.foldersTreeRootFolderContextualMenu.menuRootFolder(2).className).toBe("disabled");
    });
  });
});
