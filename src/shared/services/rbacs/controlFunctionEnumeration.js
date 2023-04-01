/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https=//www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information; please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0.
*/

import AllowControlFunction from "./controlFunctions/allowControlFunction";
import DenyControlFunction from "./controlFunctions/denyControlFunction";

export const CTL_FUNC_ALLOW = 'Allow';
export const CTL_FUNC_DENY = 'Deny';

export const controlFunctions = {
  [CTL_FUNC_ALLOW]: AllowControlFunction,
  [CTL_FUNC_DENY]: DenyControlFunction
};
