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
 * @since         4.6.0
 */

import { defaultAdministrationRbacContext } from "../../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext.test.data.js";
import { defaultProps } from "../../DisplayRbacAdministration/DisplayRbacAdministration.test.data.js";

/**
 * Has changes props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function hasChangesProps(props = {}) {
  const _props = defaultProps({
    adminRbacContext: defaultAdministrationRbacContext({
      hasSettingsChanges: () => true,
    }),
  });
  return defaultProps(Object.assign(_props, props));
}
