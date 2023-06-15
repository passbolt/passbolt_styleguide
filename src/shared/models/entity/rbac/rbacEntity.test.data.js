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

import {v4 as uuidv4} from "uuid";
import RbacEntity from "./rbacEntity";
import {defaultActionData} from "./actionEntity.test.data";
import {defaultUiActionData} from "./uiActionEntity.test.data";
import {controlFunctions} from "../../../services/rbacs/controlFunctionEnumeration";
import {TEST_ROLE_USER_ID} from "../role/role.test.data";

export const defaultRbacData = (data = {}) => {
  const defaultData = {
    "id": uuidv4(),
    "role_id": TEST_ROLE_USER_ID,
    "foreign_model": RbacEntity.FOREIGN_MODEL_ACTION,
    "foreign_id": uuidv4(),
    "control_function": controlFunctions.ALLOW,
    ...data,
  };

  return Object.assign(defaultData, data);
};

export const defaultRbacWithActionData = (data = {}) => {
  const foreignId = data?.foreign_id || data?.action?.id || uuidv4();
  const defaultData = {
    "foreign_model": RbacEntity.FOREIGN_MODEL_ACTION,
    "action": defaultActionData({id: foreignId}),
    ...data,
    "foreign_id": foreignId,
  };

  return defaultRbacData(defaultData);
};

export const defaultRbacWithUiActionData = (data = {}) => {
  const foreignId = data?.foreign_id || data?.ui_action?.id || uuidv4();
  const defaultData = {
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": defaultUiActionData({id: foreignId}),
    ...data,
    "foreign_id": foreignId,
  };

  return defaultRbacData(defaultData);
};

export const denyRbacWithUiActionData = (data = {}) => {
  const defaultData = {
    "control_function": controlFunctions.DENY,
    ...data
  };

  return defaultRbacWithUiActionData(defaultData);
};

export const defaultRbacWithAllAssociationData = (data = {}) => {
  const foreignId = data?.foreign_id || data?.action?.id || data?.ui_action?.id || uuidv4();
  const defaultData = {
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "action": defaultActionData({id: foreignId}),
    "ui_action": defaultUiActionData({id: foreignId}),
    ...data,
    "foreign_id": foreignId,
  };

  return defaultRbacData(defaultData);
};
