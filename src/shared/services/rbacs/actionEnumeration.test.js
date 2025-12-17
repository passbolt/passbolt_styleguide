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

import { actions } from "./actionEnumeration";

describe("actions", () => {
  it("should have the expected action keys", () => {
    expect.assertions(4);

    expect(Object.keys(actions).length).toEqual(3);
    expect(actions["GROUPS_ADD"]).toEqual("GroupsAdd.addPost");
    expect(actions["ACCOUNT_RECOVERY_REQUEST_VIEW"]).toEqual("AccountRecoveryRequestsView.view");
    expect(actions["ACCOUNT_RECOVERY_RESPONSE_CREATE"]).toEqual("AccountRecoveryResponsesCreate.post");
  });
});
