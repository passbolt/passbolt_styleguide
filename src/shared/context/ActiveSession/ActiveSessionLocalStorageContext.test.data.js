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
 * @since         6.0.0
 */
import MockPort from "../../../react-extension/test/mock/MockPort";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import AccountEntity from "../../models/entity/account/accountEntity";
import { defaultAccountDto } from "../../models/entity/account/accountEntity.test.data";

export const defaultProps = (data = {}) => ({
  port: new MockPort(),
  storage: new MockStorage(),
  account: new AccountEntity(defaultAccountDto()),
  ...data,
});

export const defaultActiveSessionStorageContext = (data = {}) => ({
  get: jest.fn(),
  activeSession: null,
  updateLocalStorage: jest.fn(),
  ...data,
});
