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
 * @since         3.0.0
 */

import MockPort from "../../../src/react-extension/test/mock/MockPort";
import mockRequestAuthCheckStatus from "./request/mockRequestAuthCheckStatus";
import mockRequestInformOpen from "./request/mockRequestInformOpen";

export default (storage) => {
  const mockPort = new MockPort(storage);
  mockPort.addRequestListener("passbolt.auth.check-status", mockRequestAuthCheckStatus);
  mockPort.addRequestListener("passbolt.inform.open", mockRequestInformOpen);
  return mockPort;
};

