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
 * @since         5.13.0
 */

import PermissionSnapshotDriftError from "./PermissionSnapshotDriftError";

describe("PermissionSnapshotDriftError", () => {
  it("is an Error subclass that preserves the constructor message and a stable name", () => {
    expect.assertions(3);
    const error = new PermissionSnapshotDriftError("Permissions changed mid-flow");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("PermissionSnapshotDriftError");
    expect(error.message).toBe("Permissions changed mid-flow");
  });
});
