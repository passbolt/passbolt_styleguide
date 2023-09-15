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
 * @since         3.0.0
 */

import {CreateGpgKeyVariation} from "./CreateGpgKey";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {defaultUserPassphrasePoliciesEntityDto} from "../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: defaultAppContext({
      siteSettings: {
        canIUse: () => true,
      }},
    ),
    userPassphrasePolicies: defaultUserPassphrasePoliciesEntityDto(),
    displayAs: CreateGpgKeyVariation.SETUP,
    onComplete: jest.fn(() => Promise.resolve()),
    onSecondaryActionClick: jest.fn(() => Promise.resolve()),
  };
  return Object.assign(defaultProps, props || {});
}
