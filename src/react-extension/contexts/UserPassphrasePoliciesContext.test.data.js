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
 * @since         4.3.0
 */
import {defaultUserPassphrasePoliciesEntityDto} from '../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data';

export const defaultUserPassphrasePoliciesContext = (data = {}) => {
  const defaultData = {
    findSettings: jest.fn(),
    getSettings: jest.fn(() => defaultUserPassphrasePoliciesEntityDto()),
  };
  return Object.assign(defaultData, data);
};
