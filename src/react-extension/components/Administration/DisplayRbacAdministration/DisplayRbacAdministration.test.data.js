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
 * @since         4.O.0
 */

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import RbacEntity from "../../../../shared/models/entity/rbac/rbacEntity";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";
import {v4 as uuidv4} from "uuid";

export function defaultProps() {
  return {
    context: defaultAppContext(),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: () => jest.fn(),
      displayError: jest.fn()
    }
  };
}


/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockRbacSettings = () => [
  {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.RESOURCES_EXPORT
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.RESOURCES_IMPORT
    },
    "control_function": controlFunctions.DENY,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.TAGS_USE
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.FOLDERS_USE
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.RESOURCES_SEE_ACTIVITIES
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.RESOURCES_SEE_COMMENTS
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.SECRETS_PREVIEW
    },
    "control_function": controlFunctions.DENY,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.SECRETS_COPY
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.SHARE_VIEW_LIST
    },
    "control_function": controlFunctions.ALLOW,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }, {
    "id": uuidv4(),
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "foreign_id": uuidv4(),
    "foreign_model": RbacEntity.FOREIGN_MODEL_UI_ACTION,
    "ui_action": {
      "id": uuidv4(),
      "name": uiActions.USERS_VIEW_WORKSPACE
    },
    "control_function": controlFunctions.DENY,
    "created": "2023-07-04T13:39:25+00:00",
    "modified": "2023-07-04T13:39:25+00:00"
  }
];

export const mockRoles = () => [
  {
    "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "name": "user",
    "description": "Logged in user",
    "created": "2012-07-04T13:39:25+00:00",
    "modified": "2012-07-04T13:39:25+00:00"
  }, {
    "id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
    "name": "admin",
    "description": "Logged in admin",
    "created": "2012-07-04T13:39:25+00:00",
    "modified": "2012-07-04T13:39:25+00:00"
  }
];
