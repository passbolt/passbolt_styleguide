/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */
import {
  defaultRbacWithActionData,
  defaultRbacWithUiActionData,
  denyRbacWithActionData,
  denyRbacWithUiActionData,
} from "./rbacEntity.test.data";
import { defaultUiActionData } from "./uiActionEntity.test.data";
import { uiActions } from "../../../services/rbacs/uiActionEnumeration";
import { TEST_ROLE_USER_ID } from "../role/roleEntity.test.data";
import { actions } from "../../../services/rbacs/actionEnumeration";
import { defaultActionData } from "./actionEntity.test.data";

export const defaultSettingsRbacsCollectionData = [
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_EXPORT }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_IMPORT }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.TAGS_USE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.FOLDERS_USE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_ACTIVITIES }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_COMMENTS }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SECRETS_PREVIEW }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SECRETS_COPY }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SHARE_VIEW_LIST }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.USERS_VIEW_WORKSPACE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.MOBILE_TRANSFER }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.DESKTOP_TRANSFER }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SHARE_FOLDER }) }),
  defaultRbacWithActionData({ action: defaultActionData({ name: actions.GROUPS_ADD }) }),
  defaultRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_VIEW }) }),
  defaultRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_INDEX }) }),
  defaultRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_RESPONSE_CREATE }) }),
];

export const userSettingsRbacsCollectionData = () =>
  defaultSettingsRbacsCollectionData.filter((rbac) => rbac.role_id === TEST_ROLE_USER_ID);

export const settingsRbacsCollectionData = () => [
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_EXPORT }) }),
  denyRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_IMPORT }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.TAGS_USE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.FOLDERS_USE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_ACTIVITIES }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_COMMENTS }) }),
  denyRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SECRETS_PREVIEW }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SECRETS_COPY }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SHARE_VIEW_LIST }) }),
  denyRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.USERS_VIEW_WORKSPACE }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.MOBILE_TRANSFER }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.DESKTOP_TRANSFER }) }),
  defaultRbacWithUiActionData({ ui_action: defaultUiActionData({ name: uiActions.SHARE_FOLDER }) }),
  denyRbacWithActionData({ action: defaultActionData({ name: actions.GROUPS_ADD }) }),
  denyRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_VIEW }) }),
  denyRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_INDEX }) }),
  denyRbacWithActionData({ action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_RESPONSE_CREATE }) }),
];

export const settingsRbacsCollectionFromRoleCollectionData = (rolesCollectionDto) => {
  let rbacsCollectionDto = [];

  const availableRoles = rolesCollectionDto.filter((r) => r.name !== "admin" && r.name !== "guest");

  for (let i = 0; i < availableRoles.length; i++) {
    const roleId = availableRoles[i].id;
    rbacsCollectionDto = rbacsCollectionDto.concat([
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.RESOURCES_EXPORT }),
      }),
      denyRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.RESOURCES_IMPORT }),
      }),
      defaultRbacWithUiActionData({ role_id: roleId, ui_action: defaultUiActionData({ name: uiActions.TAGS_USE }) }),
      defaultRbacWithUiActionData({ role_id: roleId, ui_action: defaultUiActionData({ name: uiActions.FOLDERS_USE }) }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_ACTIVITIES }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.RESOURCES_SEE_COMMENTS }),
      }),
      denyRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.SECRETS_PREVIEW }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.SECRETS_COPY }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.SHARE_VIEW_LIST }),
      }),
      denyRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.USERS_VIEW_WORKSPACE }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.MOBILE_TRANSFER }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.DESKTOP_TRANSFER }),
      }),
      defaultRbacWithUiActionData({
        role_id: roleId,
        ui_action: defaultUiActionData({ name: uiActions.SHARE_FOLDER }),
      }),
      denyRbacWithActionData({ role_id: roleId, action: defaultActionData({ name: actions.GROUPS_ADD }) }),
      denyRbacWithActionData({
        role_id: roleId,
        action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_VIEW }),
      }),
      denyRbacWithActionData({
        role_id: roleId,
        action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_REQUEST_INDEX }),
      }),
      denyRbacWithActionData({
        role_id: roleId,
        action: defaultActionData({ name: actions.ACCOUNT_RECOVERY_RESPONSE_CREATE }),
      }),
    ]);
  }

  return rbacsCollectionDto;
};
