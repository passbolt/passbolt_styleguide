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

import {actions} from "./actionEnumeration";


describe('uiActions', () => {
  it('should have the expected UI action keys', () => {
    expect.assertions(5);


    expect(Object.keys(actions).length).toEqual(4);
    expect(actions['GROUPS_ADD']).toEqual("Groups.GroupsAdd");
    expect(actions['ACCOUNT_RECOVERY_REQUEST_INDEX']).toEqual("AccountRecoveryRequests.AccountRecoveryRequestsIndex");
    expect(actions['ACCOUNT_RECOVERY_REQUEST_VIEW']).toEqual("AccountRecoveryRequests.AccountRecoveryRequestsView");
    expect(actions['ACCOUNT_RECOVERY_RESPONSE_CREATE']).toEqual("AccountRecoveryResponses.AccountRecoveryResponsesCreate");
  });
});
