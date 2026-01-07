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
 * @since         5.7.0
 */

import { defaultAppContext } from "../../contexts/ExtAppContext.test.data";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultSecretRevisionDto } from "../../../shared/models/entity/secretRevision/secretRevisionEntity.test.data";
import {
  TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE,
  TEST_RESOURCE_TYPE_V5_TOTP,
} from "../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { defaultSecretDataV5DefaultDto } from "../../../shared/models/entity/secretData/secretDataV5DefaultEntity.test.data";
import { defaultSecretDataV5DefaultTotpEntityDto } from "../../../shared/models/entity/secretData/secretDataV5DefaultTotpEntity.test.data";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import { defaultSecretDataV5StandaloneTotpDto } from "../../../shared/models/entity/secretData/secretDataV5StandaloneTotpEntity.test.data";
import { defaultSecretDataV5StandaloneNoteDto } from "../../../shared/models/entity/secretData/secretDataV5StandaloneNoteEntity.test.data";
import { defaultSecretDataV5StandaloneCustomFieldsCollectionDtos } from "../../../shared/models/entity/secretData/secretDataV5StandaloneCustomFieldsCollection.test.data";
import { readSecret } from "../../../shared/models/entity/secret/secretEntity.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    resource: defaultResourceDto(),
    onClose: jest.fn(),
  };

  return Object.assign(defaultData, data);
}

export function secretRevisionsDtos(resourceId) {
  return [
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        modified: "2025-11-03T10:59:11+00:00",
        secrets: [readSecret({ data: defaultSecretDataV5DefaultDto() })],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto({
      resource_id: resourceId,
      resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
      modified: "2025-10-05T18:59:11+00:00",
      secrets: [readSecret({ data: defaultSecretDataV5DefaultTotpEntityDto() })],
      creator: defaultUserDto({
        username: "betty@passbolt.com",
        profile: defaultProfileDto({
          first_name: "Betty",
          last_name: "Holberton",
        }),
        disabled: "2025-10-10T18:59:11+00:00",
      }),
    }),
    defaultSecretRevisionDto({
      resource_id: resourceId,
      resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
      modified: "2025-09-04T18:59:11+00:00",
      secrets: [readSecret({ data: defaultSecretDataV5DefaultDto() })],
      creator: defaultUserDto({
        username: "user@passbolt.com",
        profile: defaultProfileDto({
          first_name: "firstname",
          last_name: "Lastname",
        }),
        deleted: true,
      }),
    }),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP,
        modified: "2025-08-05T18:59:11+00:00",
        secrets: [readSecret({ data: defaultSecretDataV5StandaloneTotpDto() })],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE,
        modified: "2025-07-04T18:59:11+00:00",
        secrets: [readSecret({ data: defaultSecretDataV5StandaloneNoteDto() })],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
        modified: "2025-07-04T18:59:11+00:00",
        secrets: [readSecret({ data: defaultSecretDataV5StandaloneCustomFieldsCollectionDtos() })],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        modified: "2025-06-04T18:59:11+00:00",
        secrets: [readSecret({ data: defaultSecretDataV5DefaultDto() })],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE,
        modified: "2025-05-04T18:59:11+00:00",
        secrets: [],
      },
      {
        withCreator: true,
      },
    ),
    defaultSecretRevisionDto(
      {
        resource_id: resourceId,
        resource_type_id: TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE,
        modified: "2025-04-04T18:59:11+00:00",
        secrets: [],
      },
      {
        withCreator: true,
      },
    ),
  ];
}
