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
import {v4 as uuid} from "uuid";
import SsoProviders from "../ManageSsoSettings/SsoProviders.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.context),
    handleClose: jest.fn(),
    onSuccessfulSettingsActivation: jest.fn(),
    provider: SsoProviders.at(0),
    configurationId: uuid(),
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn(),
    }
  };
  delete props.context; // Treated in the default
  return Object.assign(defaultProps, props);
}
