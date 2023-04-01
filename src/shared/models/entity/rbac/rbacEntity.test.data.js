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
 * @since         4.0.0
 */

import {v4 as uuidv4} from "uuid";
import RbacEntity from "./rbacEntity";
import {defaultActionData} from "./actionEntity.test.data";
import {defaultUiActionData} from "./uiActionEntity.test.data";

export const defaultRbacData = (data = {}) => {
  const defaultData = {
    "id": uuidv4(),
    "role_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_ACTION,
    "foreign_id": uuidv4(),
    "control_function": "Model.operation"
  };

  return Object.assign(defaultData, data);
};

export const defaultRbacWithActionData = (data = {}) => {
  const defaultData = {
    "id": uuidv4(),
    "role_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_ACTION,
    "foreign_id": uuidv4(),
    "control_function": "Model.operation",
    "action": defaultActionData()
  };

  return Object.assign(defaultData, data);
};

export const defaultRbacWithUiActionData = (data = {}) => {
  const defaultData = {
    "id": uuidv4(),
    "role_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "foreign_id": uuidv4(),
    "control_function": "Model.operation",
    "ui_action": defaultUiActionData()
  };

  return Object.assign(defaultData, data);
};

export const defaultRbacWithAllAssociationData = (data = {}) => {
  const defaultData = {
    "id": uuidv4(),
    "role_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "foreign_id": uuidv4(),
    "control_function": "Model.operation",
    "action": defaultActionData(),
    "ui_action": defaultUiActionData()
  };

  return Object.assign(defaultData, data);
};