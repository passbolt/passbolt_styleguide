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

import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";
import { defaultMetadataKeysDtos } from "../../../../shared/models/entity/metadata/metadataKeysCollection.test.data";
import { defaultProfileDto } from "../../../../shared/models/entity/profile/ProfileEntity.test.data";
import { TEST_ROLE_ADMIN_ID } from "../../../../shared/models/entity/role/roleEntity.test.data";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { v4 as uuidv4 } from "uuid";

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(props = {}) {
  const metadataKeys = props.metadataKeys || defaultMetadataKeysDtos();
  const missingMetadataKeys = props.missingMetadataKeys || metadataKeys.map((metadata) => metadata.id);
  const missingAdminMetadataKeys = props.missingAdminMetadataKeys || [];

  return {
    context: defaultAppContext({
      loggedInUser: {
        id: uuidv4(),
        role: {
          id: TEST_ROLE_ADMIN_ID,
          name: "admin",
        },
        missing_metadata_key_ids: missingAdminMetadataKeys,
      },
    }),
    onClose: jest.fn(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    metadataKeys: new MetadataKeysCollection(metadataKeys),
    user: defaultUserDto({
      id: "f848277c-5398-58f8-a82a-72397af2d450",
      username: "ada@passbolt.com",
      profile: defaultProfileDto({
        first_name: "Ada",
        last_name: "Lovelace",
      }),
      missing_metadata_key_ids: missingMetadataKeys,
    }),
    dialogContext: {
      open: () => {},
    },
  };
}

export function ownedPartiallyMisingMetadataKeysProps(props = {}) {
  const metadataKeys = props.metadataKeys || defaultMetadataKeysDtos();
  const missingMetadataKeys = props.missingMetadataKeys || metadataKeys.map((metadata) => metadata.id);

  return defaultProps({
    missingAdminMetadataKeys: [metadataKeys[0].id],
    missingMetadataKeys: missingMetadataKeys,
  });
}

export function notOwnedAllMisingMetadataKeysProps(props = {}) {
  const metadataKeys = props.metadataKeys || defaultMetadataKeysDtos();
  const missingMetadataKeys = props.missingMetadataKeys || metadataKeys.map((metadata) => metadata.id);

  return defaultProps({
    missingAdminMetadataKeys: missingMetadataKeys,
    missingMetadataKeys: missingMetadataKeys,
  });
}
