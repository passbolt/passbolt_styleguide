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
 * @since         5.17.0
 */
import { defaultAppContext as defaultExtAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultNavigationContext } from "../../../contexts/NavigationContext.test.data";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";

export function defaultAppContext(appContext = {}) {
  return defaultExtAppContext({ loggedInUser: defaultUserDto({}, { withRole: true }), ...appContext });
}

export function defaultProps(props = {}) {
  return {
    navigationContext: defaultNavigationContext(props.navigationContext),
  };
}
