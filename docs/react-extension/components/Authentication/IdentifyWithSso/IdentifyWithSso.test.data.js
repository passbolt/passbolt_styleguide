/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import {ApiClientOptions} from "../../../../shared/lib/apiClient/apiClientOptions";
import SsoProviders from "../../Administration/ManageSsoSettings/SsoProviders.data";

export function defaultAppContext(context) {
  const baseUrl = "http://localhost:6006";
  const apiClientOptions = new ApiClientOptions()
    .setBaseUrl(baseUrl);

  const defaultAppContext = {
    getApiClientOptions: () => apiClientOptions,
    trustedDomain: `${baseUrl}/subfolder`
  };
  return Object.assign(defaultAppContext, context || {});
}

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: defaultAppContext(),
    ssoProvider: SsoProviders.find(provider => provider.id === "azure"),
    history: {push: jest.fn()}
  };
  return Object.assign(defaultProps, props || {});
}
