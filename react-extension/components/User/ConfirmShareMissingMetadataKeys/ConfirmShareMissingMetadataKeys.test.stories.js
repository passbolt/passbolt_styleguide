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
 * @since         5.2.0
 */

import {
  defaultProps,
  notOwnedAllMisingMetadataKeysProps,
  ownedPartiallyMisingMetadataKeysProps,
} from "./ConfirmShareMissingMetadataKeys.test.data";
import ConfirmShareMissingMetadataKeys from "./ConfirmShareMissingMetadataKeys";

export default {
  title: "Components/User/ConfirmShareMissingMetadataKeys",
  component: ConfirmShareMissingMetadataKeys,
};

export const Initial = {
  args: {
    ...defaultProps(),
  },
};

export const PartiallySharing = {
  args: {
    ...ownedPartiallyMisingMetadataKeysProps(),
  },
};

export const CannotShare = {
  args: {
    ...notOwnedAllMisingMetadataKeysProps(),
  },
};
