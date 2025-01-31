/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import "../../../../../test/mocks/mockPortal.js";
import {enableFetchMocks} from 'jest-fetch-mock';
import {waitFor} from '@testing-library/react';
import {
  defaultProps,
  propsWithDisabledFlags,
  propsWithPopulatedRbacContext, propsWithUpdatedRbacs
} from "./DisplayRbacAdministration.test.data";
import DisplayRbacAdministrationPage from "./DisplayRbacAdministration.test.page";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";

/**
 * Unit tests on DisplayRbacAdministration in regard of specifications
 */

describe("DisplayRbacAdministration", () => {
  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });

  describe("As a logged in administrator I can see the Rbac administration", () => {
    it('I can see the Rbac administration settings page', async() => {
      const page = new DisplayRbacAdministrationPage(defaultProps());
      expect.assertions(1);
      expect(page.exists()).toBeTruthy();
    });

    it('As a logged in administrator I can see the help box', async() => {
      const page = new DisplayRbacAdministrationPage(defaultProps());
      expect.assertions(5);
      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxButton).toBeDefined();
      expect(page.helpBoxButton.textContent).toEqual("Read RBAC doc");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://passbolt.com/docs/admin/role-based-access-control/');
      expect(page.helpBoxButton.getAttribute('rel')).toEqual('noopener noreferrer');
    });

    it('As a logged in administrator I can see all rbac settings relative to the administrator role', async() => {
      const props = propsWithPopulatedRbacContext();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(25);

      expect(page.getAllSelectsByRole('admin').length).toEqual(13);
      expect(page.select('admin', uiActions.RESOURCES_IMPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.RESOURCES_IMPORT).className).toContain('disabled');
      expect(page.select('admin', uiActions.RESOURCES_EXPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.RESOURCES_EXPORT).className).toContain('disabled');
      expect(page.select('admin', uiActions.SECRETS_PREVIEW).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.SECRETS_PREVIEW).className).toContain('disabled');
      expect(page.select('admin', uiActions.SECRETS_COPY).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.SECRETS_COPY).className).toContain('disabled');
      expect(page.select('admin', uiActions.RESOURCES_SEE_ACTIVITIES).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.RESOURCES_SEE_ACTIVITIES).className).toContain('disabled');
      expect(page.select('admin', uiActions.RESOURCES_SEE_COMMENTS).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.RESOURCES_SEE_COMMENTS).className).toContain('disabled');
      expect(page.select('admin', uiActions.FOLDERS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.FOLDERS_USE).className).toContain('disabled');
      expect(page.select('admin', uiActions.TAGS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.TAGS_USE).className).toContain('disabled');
      expect(page.select('admin', uiActions.SHARE_VIEW_LIST).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.SHARE_VIEW_LIST).className).toContain('disabled');
      expect(page.select('admin', uiActions.USERS_VIEW_WORKSPACE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.USERS_VIEW_WORKSPACE).className).toContain('disabled');
      expect(page.select('admin', uiActions.MOBILE_TRANSFER).className).toContain('disabled');
      expect(page.select('admin', uiActions.DESKTOP_TRANSFER).className).toContain('disabled');
      expect(page.select('admin', uiActions.SHARE_FOLDER).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('admin', uiActions.SHARE_FOLDER).className).toContain('disabled');
    });

    it('As a logged in administrator I can see all rbac settings relative to the user role', async() => {
      const props = propsWithPopulatedRbacContext();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(14);

      expect(page.getAllSelectsByRole('user').length).toEqual(13);
      expect(page.select('user', uiActions.RESOURCES_IMPORT).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select('user', uiActions.RESOURCES_EXPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.SECRETS_PREVIEW).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select('user', uiActions.SECRETS_COPY).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.RESOURCES_SEE_ACTIVITIES).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.RESOURCES_SEE_COMMENTS).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.FOLDERS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.TAGS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.SHARE_VIEW_LIST).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.USERS_VIEW_WORKSPACE).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select('user', uiActions.MOBILE_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.DESKTOP_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select('user', uiActions.SHARE_FOLDER).textContent).toContain(controlFunctions.ALLOW);
    });

    it('As a logged in administrator I should not see the rbac settings relative to import if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['import']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.RESOURCES_IMPORT)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to export if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['export']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.RESOURCES_EXPORT)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to preview password if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['previewPassword']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.SECRETS_PREVIEW)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to tags if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['tags']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.TAGS_USE)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to folders if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['folders']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.FOLDERS_USE)).toBeUndefined();
    });
  });

  describe("As a logged in administrator I can update the rbac settings", () => {
    it('As a logged in administrator I can modify and save the rbacs settings', async() => {
      const props = propsWithPopulatedRbacContext();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(1);

      await page.click(page.select('user', uiActions.RESOURCES_EXPORT));
      await page.click(page.selectFirstItem('user', uiActions.RESOURCES_EXPORT));

      expect(props.adminRbacContext.setRbacsUpdated).toHaveBeenCalled();
    });

    it('As a logged in administrator I should see the updated rbacs highlighted', async() => {
      const props = propsWithUpdatedRbacs();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      const updatedRbacUiActionName1 = props.adminRbacContext.rbacsUpdated.items[0].uiAction.name;
      expect(page.row(updatedRbacUiActionName1).className).toContain('highlighted');
      const updatedRbacUiActionName2 = props.adminRbacContext.rbacsUpdated.items[0].uiAction.name;
      expect(page.row(updatedRbacUiActionName2).className).toContain('highlighted');
    });

    it('As a logged in administrator I should not see the rbac for mobile if plugin is disabled', async() => {
      const props = propsWithDisabledFlags(['mobile']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);


      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.MOBILE_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac for desktop if plugin is disabled', async() => {
      const props = propsWithDisabledFlags(['desktop']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);


      expect(page.getAllSelectsByRole('user').length).toEqual(12);
      expect(page.select('user', uiActions.DESKTOP_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac user setting if mobile and desktop are not enabled', async() => {
      const props = propsWithDisabledFlags(['desktop', 'mobile']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(3);


      expect(page.getAllSelectsByRole('user').length).toEqual(11);
      expect(page.select('user', uiActions.DESKTOP_TRANSFER)).toBeUndefined();
      expect(page.select('user', uiActions.MOBILE_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the selected rbac function into the list of choices from the select', async() => {
      expect.assertions(3);
      const props = propsWithUpdatedRbacs();
      jest.spyOn(props.adminRbacContext.rbacsUpdated, "remove");
      jest.spyOn(props.adminRbacContext.rbacs, "findRbacByRoleAndUiActionName").mockImplementation(() => ({controlFunction: controlFunctions.DENY}));

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      //Click to open the select
      await page.click(page.select('user', uiActions.FOLDERS_USE));
      //Expect have the unselected value
      expect(page.selectItems('user', uiActions.FOLDERS_USE).children.length).toEqual(1);
      expect(page.selectItems('user', uiActions.FOLDERS_USE).textContent).toEqual(controlFunctions.DENY);

      //Change the value and expect Deny to not be present anymore
      await page.clickToSelectFirstItem('user', uiActions.FOLDERS_USE);

      expect(props.adminRbacContext.rbacsUpdated.remove).toHaveBeenCalledWith({"controlFunction": "Deny"});
    });
  });
});
