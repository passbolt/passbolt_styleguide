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

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultResourceFormDto } from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import { resourceTypeV5DefaultDto } from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { defaultResourceMetadataDto } from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import { defaultIconDto } from "../../../../shared/models/entity/resource/metadata/iconEntity.test.data";

/**
 * Default props
 * @returns {*}
 */
export const defaultProps = (data = {}) => ({
  context: defaultAppContext(),
  onChange: jest.fn(),
  onConvertToNote: jest.fn(),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  resourceType: new ResourceTypeEntity(resourceTypeV5DefaultDto()),
  resource: defaultResourceFormDto(),
  ...data,
});

/**
 * Props set with resource having an icon
 * @returns {*}
 */
export const resourceWithAppearance = (data = {}) => ({
  context: defaultAppContext(),
  onChange: jest.fn(),
  onConvertToNote: jest.fn(),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  resourceType: new ResourceTypeEntity(resourceTypeV5DefaultDto()),
  resource: defaultResourceFormDto({
    metadata: defaultResourceMetadataDto({
      icon: defaultIconDto(),
    }),
  }),
  ...data,
});
