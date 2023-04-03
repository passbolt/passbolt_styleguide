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
 * Mock settings result from server
 * @returns {object}
 */
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";

export const FormConfig = [
  {
    "type": "header",
    "level": 1,
    "label": "Resources workspace",
    "items": [
      {
        "type": "header",
        "level": 2,
        "label": "Import / Export",
        "items": [
          {
            "type": "ui_action",
            "name": uiActions.RESOURCES_IMPORT,
            "label": "Can import passwords",
            "options": [
              {
                "value": controlFunctions.ALLOW,
                "label": "Allow"
              },
              {
                "value": controlFunctions.DENY,
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
          {
            "type": "ui_action",
            "name": uiActions.RESOURCES_EXPORT,
            "label": "Can export passwords",
            "options": [
              {
                "value": controlFunctions.ALLOW,
                "label": "Allow"
              },
              {
                "value": controlFunctions.DENY,
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
        ]
      },
      {
        "type": "header",
        "level": 2,
        "label": "Passwords",
        "items": [
          {
            "type": "ui_action",
            "name": uiActions.SECRETS_PREVIEW,
            "label": "Can preview a password",
            "options": [
              {
                "value": controlFunctions.ALLOW,
                "label": "Allow"
              },
              {
                "value": controlFunctions.DENY,
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
          {
            "type": "ui_action",
            "name": uiActions.SECRETS_COPY,
            "label": "Can copy a password to clipboard",
            "options": [
              {
                "value": controlFunctions.ALLOW,
                "label": "Allow"
              },
              {
                "value": controlFunctions.DENY,
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
        ]
      }
    ],
  }
];
