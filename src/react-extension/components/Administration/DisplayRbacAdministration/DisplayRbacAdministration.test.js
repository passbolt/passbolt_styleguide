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
import CreateRole from "../CreateRole/CreateRole.js";
import {RoleApiServiceWithTooManyRoles} from "../../../../shared/services/api/role/roleApiService.test.data.js";
import {defaultApiClientOptions} from "../../../../shared/lib/apiClient/apiClientOptions.test.data.js";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection.js";
import {RbacApiServiceWithCustomRolesSet} from "../../../../shared/services/api/rbac/rbacApiService.test.data.js";
import DeleteRole from "../DeleteRole/DeleteRole.js";
import RoleEntity from "../../../../shared/models/entity/role/roleEntity.js";
import EditRole from "../EditRole/EditRole.js";
import {actions} from "../../../../shared/services/rbacs/actionEnumeration";
import {UserApiServiceWithUsersHavingCustomRoles} from "../../../../shared/services/api/user/userService.test.data";
import DeleteRoleNotAllowed from "../DeleteRole/DeleteRoleNotAllowed";
import PassboltApiFetchError from "../../../../shared/error/passboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {customRoleDto} from "../../../../shared/models/entity/role/roleEntity.test.data.js";

/**
 * Unit tests on DisplayRbacAdministration in regard of specifications
 */

describe("DisplayRbacAdministration", () => {
  const adminRoleIndex = 2;
  const userRoleIndex = 3;
  const customRoleIndex = 4;

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
      expect.assertions(31);

      expect(page.getAllSelectsByRole(adminRoleIndex).length).toEqual(16);
      expect(page.select(adminRoleIndex, actions.GROUPS_ADD).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, actions.GROUPS_ADD).className).toContain('disabled');
      expect(page.select(adminRoleIndex, actions.ACCOUNT_RECOVERY_REQUEST_VIEW).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, actions.ACCOUNT_RECOVERY_REQUEST_VIEW).className).toContain('disabled');
      expect(page.select(adminRoleIndex, actions.ACCOUNT_RECOVERY_RESPONSE_CREATE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, actions.ACCOUNT_RECOVERY_RESPONSE_CREATE).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_IMPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_IMPORT).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_EXPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_EXPORT).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.SECRETS_PREVIEW).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.SECRETS_PREVIEW).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.SECRETS_COPY).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.SECRETS_COPY).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_SEE_ACTIVITIES).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_SEE_ACTIVITIES).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_SEE_COMMENTS).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.RESOURCES_SEE_COMMENTS).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.FOLDERS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.FOLDERS_USE).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.TAGS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.TAGS_USE).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.SHARE_VIEW_LIST).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.SHARE_VIEW_LIST).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.USERS_VIEW_WORKSPACE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.USERS_VIEW_WORKSPACE).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.MOBILE_TRANSFER).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.DESKTOP_TRANSFER).className).toContain('disabled');
      expect(page.select(adminRoleIndex, uiActions.SHARE_FOLDER).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(adminRoleIndex, uiActions.SHARE_FOLDER).className).toContain('disabled');
    });

    it('As a logged in administrator I can see all rbac settings relative to the user role', async() => {
      const props = propsWithPopulatedRbacContext();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(17);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(16);
      expect(page.select(userRoleIndex, actions.GROUPS_ADD).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, actions.ACCOUNT_RECOVERY_REQUEST_VIEW).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, actions.ACCOUNT_RECOVERY_RESPONSE_CREATE).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_IMPORT).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_EXPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.SECRETS_PREVIEW).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, uiActions.SECRETS_COPY).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_SEE_ACTIVITIES).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_SEE_COMMENTS).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.FOLDERS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.TAGS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.SHARE_VIEW_LIST).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.USERS_VIEW_WORKSPACE).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(userRoleIndex, uiActions.MOBILE_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.DESKTOP_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select(userRoleIndex, uiActions.SHARE_FOLDER).textContent).toContain(controlFunctions.ALLOW);
    });

    it('As a logged in administrator I should not see the rbac settings relative to import if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['import']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_IMPORT)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to export if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['export']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.RESOURCES_EXPORT)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to preview password if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['previewPassword']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.SECRETS_PREVIEW)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to tags if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['tags']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.TAGS_USE)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac settings relative to folders if disabled by feature flag', async() => {
      const props = propsWithDisabledFlags(['folders']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);

      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.FOLDERS_USE)).toBeUndefined();
    });
  });

  describe("As a logged in administrator I can update the rbac settings", () => {
    it('As a logged in administrator I can modify and save the rbacs settings', async() => {
      const props = propsWithPopulatedRbacContext();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(1);

      await page.click(page.select(userRoleIndex, uiActions.RESOURCES_EXPORT));
      await page.click(page.selectFirstItem(userRoleIndex, uiActions.RESOURCES_EXPORT));

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


      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.MOBILE_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac for desktop if plugin is disabled', async() => {
      const props = propsWithDisabledFlags(['desktop']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(2);


      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(15);
      expect(page.select(userRoleIndex, uiActions.DESKTOP_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the rbac user setting if mobile and desktop are not enabled', async() => {
      const props = propsWithDisabledFlags(['desktop', 'mobile']);
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(3);


      expect(page.getAllSelectsByRole(userRoleIndex).length).toEqual(14);
      expect(page.select(userRoleIndex, uiActions.DESKTOP_TRANSFER)).toBeUndefined();
      expect(page.select(userRoleIndex, uiActions.MOBILE_TRANSFER)).toBeUndefined();
    });

    it('As a logged in administrator I should not see the selected rbac function into the list of choices from the select', async() => {
      expect.assertions(3);
      const props = propsWithUpdatedRbacs();
      jest.spyOn(props.adminRbacContext.rbacsUpdated, "remove");
      jest.spyOn(props.adminRbacContext.rbacs, "findRbacByRoleAndActionName").mockImplementation(() => ({controlFunction: controlFunctions.DENY}));

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      //Click to open the select
      await page.click(page.select(userRoleIndex, uiActions.FOLDERS_USE));
      //Expect have the unselected value
      expect(page.selectItems(userRoleIndex, uiActions.FOLDERS_USE).children.length).toEqual(1);
      expect(page.selectItems(userRoleIndex, uiActions.FOLDERS_USE).textContent).toEqual(controlFunctions.DENY);

      //Change the value and expect Deny to not be present anymore
      await page.clickToSelectFirstItem(userRoleIndex, uiActions.FOLDERS_USE);

      expect(props.adminRbacContext.rbacsUpdated.remove).toHaveBeenCalledWith({"controlFunction": "Deny"});
    });

    it('As a logged in administrator I can open the role creation dialog', async() => {
      expect.assertions(3);

      const props = defaultProps();
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      expect(page.createRoleButton).toBeDefined();
      await page.click(page.createRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateRole, {onSubmit: expect.any(Function)});
    });

    it('As a logged in administrator I cannot open the role creation dialog if there are too many roles', async() => {
      expect.assertions(1);

      const props = defaultProps({RoleApiService: RoleApiServiceWithTooManyRoles});
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      await page.click(page.createRoleButton);

      expect(props.dialogContext.open).not.toHaveBeenCalled();
    });

    it('As a logged in administrator I should see all customisable roles', async() => {
      expect.assertions(1);

      const roleApiService = RoleApiServiceWithTooManyRoles;
      const roles = (new roleApiService(defaultApiClientOptions())).findAll();
      const customisableRoles = new RolesCollection(roles.body);
      customisableRoles.filterOutGuestRole();

      const props = defaultProps({RoleApiService: roleApiService});
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      expect(page.displayedRoleCount).toStrictEqual(customisableRoles.length);
    });

    it('As a logged in administrator I can see all rbac settings relative to a custom user role', async() => {
      expect.assertions(14);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet
      });
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      expect(page.getAllSelectsByRole(customRoleIndex).length).toEqual(16);
      expect(page.select(customRoleIndex, uiActions.RESOURCES_IMPORT).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(customRoleIndex, uiActions.RESOURCES_EXPORT).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.SECRETS_PREVIEW).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(customRoleIndex, uiActions.SECRETS_COPY).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.RESOURCES_SEE_ACTIVITIES).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.RESOURCES_SEE_COMMENTS).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.FOLDERS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.TAGS_USE).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.SHARE_VIEW_LIST).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.USERS_VIEW_WORKSPACE).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(customRoleIndex, uiActions.MOBILE_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.DESKTOP_TRANSFER).textContent).toContain(controlFunctions.ALLOW);
      expect(page.select(customRoleIndex, uiActions.SHARE_FOLDER).textContent).toContain(controlFunctions.ALLOW);
    });

    it('As a logged in administrator I should see the more button for customisable roles', async() => {
      expect.assertions(3);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet
      });
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      expect(page.getMoreButton(customRoleIndex)).toBeDefined();
      expect(page.getMoreButton(adminRoleIndex)).toBeNull();
      expect(page.getMoreButton(userRoleIndex)).toBeNull();
    });

    it('As a logged in administrator I should be able to delete a custom role', async() => {
      expect.assertions(2);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet
      });
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const deleteRoleButton = page.getDeleteRoleButton(customRoleIndex);
      await page.click(deleteRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteRole, {role: expect.any(RoleEntity), onSubmit: expect.any(Function)});
    });

    it('As a logged in administrator I should be see unexpected error on deletion of a custom role', async() => {
      expect.assertions(3);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet
      });
      const apiFetchError = new PassboltApiFetchError("ERROR");
      jest.spyOn(props.dialogContext, "open").mockImplementationOnce((component, props) => props.onSubmit(props.role));
      jest.spyOn(props.RoleApiService.prototype, "delete").mockImplementationOnce(() => { throw apiFetchError; });

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const deleteRoleButton = page.getDeleteRoleButton(customRoleIndex);
      await page.click(deleteRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteRole, {role: expect.any(RoleEntity), onSubmit: expect.any(Function)});
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: apiFetchError});
    });

    it('As a logged in administrator I should not be able to delete a custom role if some users have this role', async() => {
      expect.assertions(2);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet,
        UserApiService: UserApiServiceWithUsersHavingCustomRoles
      });
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const deleteRoleButton = page.getDeleteRoleButton(customRoleIndex);
      await page.click(deleteRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteRoleNotAllowed, {role: expect.any(RoleEntity), usersCount: 1});
    });

    it('As a logged in administrator I should be able to rename a custom role', async() => {
      expect.assertions(2);

      const props = propsWithPopulatedRbacContext({
        RbacApiService: RbacApiServiceWithCustomRolesSet
      });
      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const renameRoleButton = page.getRenameRoleButton(customRoleIndex);
      await page.click(renameRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditRole, {role: expect.any(RoleEntity), onSubmit: expect.any(Function)});
    });

    it('As a logged in administrator I should see an unexpected error dialog if role deletion goes wrong', async() => {
      expect.assertions(2);

      const props = propsWithPopulatedRbacContext({RbacApiService: RbacApiServiceWithCustomRolesSet});
      const apiResponse = (new props.RoleApiService).findAll();
      const rolesCollection = new RolesCollection(apiResponse.body);
      const roleToDelete = rolesCollection.items[customRoleIndex - 1];

      const error = new Error("wrong");
      jest.spyOn(props.RoleApiService.prototype, "delete").mockImplementation(() => { throw error; });
      jest.spyOn(props.dialogContext, "open").mockImplementation((_, props) => {
        if (props.onSubmit) {  //It's the first dialog we force the submit to observe the callback
          props.onSubmit(roleToDelete);
        }
      });

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const deleteRoleButton = page.getDeleteRoleButton(customRoleIndex);
      await page.click(deleteRoleButton);

      await waitFor(() => {});

      expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });

    it('As a logged in administrator I should see an unexpected error dialog if role renaming goes wrong', async() => {
      expect.assertions(2);

      const props = propsWithPopulatedRbacContext({RbacApiService: RbacApiServiceWithCustomRolesSet});
      const apiResponse = (new props.RoleApiService).findAll();
      const rolesCollection = new RolesCollection(apiResponse.body);
      const roleToRename = rolesCollection.items[customRoleIndex - 1];

      const error = new Error("wrong");
      jest.spyOn(props.RoleApiService.prototype, "update").mockImplementation(() => { throw error; });
      jest.spyOn(props.dialogContext, "open").mockImplementation((_, props) => {
        if (props.onSubmit) {  //It's the first dialog we force the submit to observe the callback
          props.onSubmit(roleToRename);
        }
      });

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      const moreButton = page.getMoreButton(customRoleIndex);
      await page.click(moreButton); //open the menu of the custom role

      const renameRoleButton = page.getRenameRoleButton(customRoleIndex);
      await page.click(renameRoleButton);

      expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });

    it('As a logged in administrator I should see an unexpected error dialog if role creation goes wrong', async() => {
      expect.assertions(2);

      const props = defaultProps({RbacApiService: RbacApiServiceWithCustomRolesSet});
      const newRoleEntity = new RoleEntity(customRoleDto());

      const error = new Error("wrong");
      jest.spyOn(props.RoleApiService.prototype, "create").mockImplementation(() => { throw error; });
      jest.spyOn(props.dialogContext, "open").mockImplementation((_, props) => {
        if (props.onSubmit) {  //It's the first dialog we force the submit to observe the callback
          props.onSubmit(newRoleEntity);
        }
      });

      const page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});

      await page.click(page.createRoleButton); //open the menu of the custom role

      expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });
  });
});
