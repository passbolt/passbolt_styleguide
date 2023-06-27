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
import SsoProviders from "../Administration/ManageSsoSettings/SsoProviders.data";

/**
 * Default props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    newProvider: SsoProviders.find(provider => provider.id === "google"),
    onAcceptNewProvider: jest.fn()
  };
  return Object.assign(defaultProps, props);
}
