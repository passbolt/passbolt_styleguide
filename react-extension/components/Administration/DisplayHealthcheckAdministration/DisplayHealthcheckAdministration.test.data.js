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
 * @since         4.6.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {
  defaultAdministrationHealthcheckContext
} from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext.test.data";

export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    adminHealthcheckContext: defaultAdministrationHealthcheckContext(),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn(),
    },
  };
  return Object.assign(defaultProps, data);
}
