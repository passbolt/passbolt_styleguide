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
 * @since         4.5.0
 */

import { defaultLoggedInUser } from "../../../context/Rbac/RbacContext.test.data";
import { groupsWithoutOwnership } from "../../../models/entity/groupUser/groupUserEntity.test.data";
import AllowIfGroupManagerInOneGroupFunction from "./allowIfGroupManagerInOneGroupFunction";

describe("AllowIfGroupManagerInOneGroupFunction", () => {
  it("should validate if user is owner of a group", () => {
    expect.assertions(1);

    expect(AllowIfGroupManagerInOneGroupFunction.execute(defaultLoggedInUser())).toBeTruthy();
  });

  it("should not validate if user is not a owner of a group", () => {
    expect.assertions(1);

    const userWithOwnership = defaultLoggedInUser({
      groups_users: groupsWithoutOwnership(),
    });
    expect(AllowIfGroupManagerInOneGroupFunction.execute(userWithOwnership)).toBeFalsy();
  });
});
