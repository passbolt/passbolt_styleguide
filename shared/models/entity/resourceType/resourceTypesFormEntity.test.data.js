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
 * @since         4.12.0
 */
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto,
  resourceTypeTotpDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5PasswordStringDto,
  resourceTypeV5TotpDto
} from "./resourceTypeEntity.test.data";
import {resourceTypesCollectionDto} from "./resourceTypesCollection.test.data";

export const defaultResourceTypesFormDto = (data = {}) => ({
  password_v4: true,
  password_v5: true,
  totp_v4: true,
  totp_v5: true,
  password_v4_count: 10,
  password_v5_count: 14,
  totp_v4_count: 2,
  totp_v5_count: 4,
  has_v4_resource_types: true,
  has_v5_resource_types: true,
  resource_types: resourceTypesCollectionDto(),
  ...data,
});

export const withDeletedResourceTypesHavingResources = (data = {}) => defaultResourceTypesFormDto({
  password_v4: false,
  password_v5: false,
  totp_v4: false,
  totp_v5: false,
  ...data,
});

export const withDeletedResourceTypes = (data = {}) => withDeletedResourceTypesHavingResources({
  password_v4_count: 0,
  password_v5_count: 0,
  totp_v4_count: 0,
  totp_v5_count: 0,
  ...data,
});

export const resourceTypesCollectionWithCountDto = () => ([
  resourceTypePasswordStringDto({resources_count: 5}),
  resourceTypePasswordAndDescriptionDto({resources_count: 6}),
  resourceTypePasswordDescriptionTotpDto({resources_count: 7}),
  resourceTypeTotpDto({resources_count: 8}),
  resourceTypeV5DefaultDto({resources_count: 9}),
  resourceTypeV5PasswordStringDto({resources_count: 3}),
  resourceTypeV5DefaultTotpDto({resources_count: 2}),
  resourceTypeV5TotpDto({resources_count: 1})
]);
