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
 * @since         5.4.0
 */
import { defaultGroupDto } from "../../models/entity/group/groupEntity.test.data";
import { defaultUserDto } from "../../models/entity/user/userEntity.test.data";

export const defaultUserProps = (data) => ({
  displayAs: "User",
  user: defaultUserDto(),
  ...data,
});

export const defaultGroupProps = (data) => ({
  displayAs: "Group",
  group: defaultGroupDto(),
  ...data,
});
