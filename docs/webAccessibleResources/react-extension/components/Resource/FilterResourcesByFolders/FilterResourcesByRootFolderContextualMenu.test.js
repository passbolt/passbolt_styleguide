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

import {defaultProps, propsWithDenyUiAction} from "./FilterResourcesByRootFolderContextualMenu.test.data";
import FilterResourcesByRootFolderContextualMenuPage from "./FilterResourcesByRootFolderContextualMenu.test.page";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import ExportResources from "../ExportResources/ExportResources";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("FilterResourcesByRootFolderContextualMenu", () => {
  let page, // The page to test against
    props; // The props to pass to the component

  beforeEach(() => {
    props = defaultProps();
    page = new FilterResourcesByRootFolderContextualMenuPage(props);
  });

  describe('As LU I can create folder at the root', () => {
    it('As LU I can create folder at the root', async() => {
      await page.foldersTreeRootFolderContextualMenu.createFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder);
      expect(props.hide).toHaveBeenCalled();
    });
  });

  describe('As LU I can export folder at the root', () => {
    it('As LU I can start to export a folder', async() => {
      await page.foldersTreeRootFolderContextualMenu.exportFolder();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResources);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I cannot export folder if disabled by API flag', async() => {
      const appContext = {
        siteSettings: {
          canIUse: () => false
        }
      };
      const context = defaultUserAppContext(appContext); // The applicative context
      props = defaultProps({context});
      page = new FilterResourcesByRootFolderContextualMenuPage(props);
      expect(page.foldersTreeRootFolderContextualMenu.menuRootFolder(2)).toBeUndefined();
    });

    it('As LU I cannot export folder if denied by RBAC', async() => {
      const props = propsWithDenyUiAction(); // The props to pass
      page = new FilterResourcesByRootFolderContextualMenuPage(props);
      expect(page.foldersTreeRootFolderContextualMenu.menuRootFolder(2)).toBeUndefined();
    });
  });
});
