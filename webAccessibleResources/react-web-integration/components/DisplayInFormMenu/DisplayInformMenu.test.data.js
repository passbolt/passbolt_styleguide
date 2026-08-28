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
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV6Dto,
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import { defaultPasswordPoliciesContext } from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import { defaultAppContext } from "../../../react-extension/contexts/ExtAppContext.test.data";
import { defaultMetadataKeysDtos } from "../../../shared/models/entity/metadata/metadataKeysCollection.test.data";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
    passwordPoliciesContext: defaultPasswordPoliciesContext(),
    ...data,
  };
}

/**
 * Default component props with missing metadata key.
 * @param {Object} data
 * @returns props with missing metadata key
 */
export function defaultPropsWithMissingMetadataKey(data = {}) {
  const metadataKeys = defaultMetadataKeysDtos();
  const missingMetadataKeys = metadataKeys.map((metadata) => metadata.id);
  const metadataTypeSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
  const metadataKeysSettings = new MetadataKeysSettingsEntity(
    defaultMetadataKeysSettingsDto({ allow_usage_of_personal_keys: false }),
  );
  const context = defaultAppContext({
    loggedInUser: defaultUserDto({ missing_metadata_key_ids: missingMetadataKeys }),
  });
  return defaultProps({ context, metadataTypeSettings, metadataKeysSettings, ...data });
}
