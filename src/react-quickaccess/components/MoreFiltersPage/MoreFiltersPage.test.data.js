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
 * @since         4.10.0
 */

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV4Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const defaultProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});
