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
 * @since         3.7.3
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const adminSsoContext = Object.assign({
    loadSsoConfiguration: () => {},
    getSsoConfiguration: () => {},
    save: () => console.log("Save from admin sso context")
  }, props.adminSsoContext);

  const defaultProps = {
    context: defaultAppContext(props?.context),
    adminSsoContext,
  };

  delete props.context; // Treated in the default
  delete props.adminSsoContext; // Treated in the default
  return Object.assign(defaultProps, props);
}

export function disabledSso(props = {}) {
  const defaultData = {
    adminSsoContext: {
      getSsoConfiguration: () => ({
        provider: null,
        data: {}
      })
    }
  };
  return defaultProps(Object.assign(defaultData, props));
}

export function azureConfiguredSso(props = {}) {
  const defaultData = {
    adminSsoContext: {
      getSsoConfiguration: () => ({
        provider: "azure",
        data: {
          url: "https://login.microsoftonline.com/passbolt-app",
          app_id: "f2j3m5n6-c3k4-m5p7-x2j4-y2k4m5n7q8r9",
          directory_id: "5n6p8r9s-m5n6-6p7q-3k5n-8r9s3k4m5n7q",
          secret: "u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn"
        }
      })
    }
  };
  return defaultProps(Object.assign(defaultData, props));
}
