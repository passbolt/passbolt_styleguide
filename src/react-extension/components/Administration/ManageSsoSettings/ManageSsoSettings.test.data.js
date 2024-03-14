/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn(),
      must: {
        save: jest.fn()
      }
    },
    dialogContext: {
      open: jest.fn()
    },
  };
  delete data.context; // Treated in the default
  return Object.assign(defaultProps, data);
}

export function disabledSso(data = {}) {
  const defaultData = {
    provider: null,
    providers: ["azure", "google"]
  };
  return Object.assign(defaultData, data);
}

export function azureConfiguredSso(data = {}) {
  const defaultData = {
    provider: "azure",
    providers: ["azure", "google"],
    data: {
      url: "https://login.microsoftonline.com",
      tenant_id: "5n6p8r9s-m5n6-6p7q-3k5n-8r9s3k4m5n7q",
      client_id: "f2j3m5n6-c3k4-m5p7-x2j4-y2k4m5n7q8r9",
      client_secret: "u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E..",
      client_secret_expiry: "2022-11-02",
      email_claim: "email",
      prompt: "login",
    }
  };
  return disabledSso(Object.assign(defaultData, data));
}
