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
 * @since         4.3.0
 */

import {
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordStringDto,
  resourceTypeTotpDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5PasswordStringDto,
  resourceTypeV5DefaultTotpDto, resourceTypeV5TotpDto, resourceTypeV5CustomFieldsDto,
  resourceTypeV5StandaloneNoteDto
} from "./resourceTypeEntity.test.data";
import {v4 as uuidv4} from "uuid";

/**
 * Resource types collection dto.
 * @returns {object}
 */
export const resourceTypesCollectionDto = () => [
  resourceTypePasswordStringDto(),
  resourceTypePasswordAndDescriptionDto(),
  resourceTypePasswordDescriptionTotpDto(),
  resourceTypeTotpDto(),
  resourceTypeV5DefaultDto(),
  resourceTypeV5PasswordStringDto(),
  resourceTypeV5DefaultTotpDto(),
  resourceTypeV5TotpDto(),
  resourceTypeV5CustomFieldsDto(),
  resourceTypeV5StandaloneNoteDto()
];

/**
 * Resource types collection dto.
 * @returns {object}
 */
export const resourceTypesCollectionWithoutNoteDto = () => [
  resourceTypePasswordStringDto(),
  resourceTypePasswordAndDescriptionDto(),
  resourceTypePasswordDescriptionTotpDto(),
  resourceTypeTotpDto(),
  resourceTypeV5DefaultDto(),
  resourceTypeV5PasswordStringDto(),
  resourceTypeV5DefaultTotpDto(),
  resourceTypeV5TotpDto(),
  resourceTypeV5CustomFieldsDto(),
];

/**
 * Resource types collection v4 dto.
 * @returns {object}
 */
export const resourceTypesV4CollectionDto = () => [
  resourceTypePasswordStringDto(),
  resourceTypePasswordAndDescriptionDto(),
  resourceTypePasswordDescriptionTotpDto(),
  resourceTypeTotpDto()
];

/**
 * Resource types collection v5 dto.
 * @returns {object}
 */
export const resourceTypesV5CollectionDto = () => [
  resourceTypeV5DefaultDto(),
  resourceTypeV5PasswordStringDto(),
  resourceTypeV5DefaultTotpDto(),
  resourceTypeV5TotpDto(),
  resourceTypeV5CustomFieldsDto(),
  resourceTypeV5StandaloneNoteDto()
];

/**
 * Build dtos.
 * @param {number} [count=10] The number of dtos.
 * @returns {object}
 */
export const buildDefineNumberOfResourceTypesDtos = (count = 10) => {
  const resourceTypesDto = resourceTypesCollectionDto();
  const dtos = resourceTypesDto;
  for (let i = 0; i < count; i++) {
    const dto = {...resourceTypesDto[i % resourceTypesDto.length]};
    dto.id = uuidv4();
    dto.slug = `${dto.slug} ${i + 1}`;
    dtos.push(dto);
  }
  return dtos;
};

/**
 * Resource types collection v5 and v4 dto without Password field.
 * @returns {object}
 */
export const resourceTypesCollectionWithoutPassword = () => [
  resourceTypeTotpDto(),
  resourceTypeV5TotpDto(),
  resourceTypeV5StandaloneNoteDto()
];

/**
 * Resource types collection v5 and v4 dto without Totp field.
 * @returns {object}
 */
export const resourceTypesCollectionWithoutTOTP = () => [
  resourceTypePasswordStringDto(),
  resourceTypePasswordAndDescriptionDto(),
  resourceTypeV5DefaultDto(),
  resourceTypeV5PasswordStringDto(),
  resourceTypeV5CustomFieldsDto(),
  resourceTypeV5StandaloneNoteDto()
];
