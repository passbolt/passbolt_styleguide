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
import {defaultRbacWithUiActionData, denyRbacWithUiActionData} from "./rbacEntity.test.data";
import {defaultUiActionData} from "./uiActionEntity.test.data";
import {uiActions} from "../../../services/rbacs/uiActionEnumeration";
import {TEST_ROLE_USER_ID} from "../role/role.test.data";

export const defaultSettingsRbacsCollectionData = [
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_EXPORT})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_IMPORT})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.TAGS_USE})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.FOLDERS_USE})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_SEE_ACTIVITIES})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_SEE_COMMENTS})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SECRETS_PREVIEW})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SECRETS_COPY})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SHARE_VIEW_LIST})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})}),
];

export const userSettingsRbacsCollectionData = () => defaultSettingsRbacsCollectionData.filter(rbac => rbac.role_id === TEST_ROLE_USER_ID);

export const settingsRbacsCollectionData = () => [
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_EXPORT})}),
  denyRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_IMPORT})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.TAGS_USE})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.FOLDERS_USE})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_SEE_ACTIVITIES})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.RESOURCES_SEE_COMMENTS})}),
  denyRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SECRETS_PREVIEW})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SECRETS_COPY})}),
  defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.SHARE_VIEW_LIST})}),
  denyRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})}),
];
