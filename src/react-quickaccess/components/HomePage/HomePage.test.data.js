/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.4
 */

import {defaultAppContext} from "../../contexts/AppContext.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceLocalStorageContext} from "../../contexts/ResourceLocalStorageContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {resourceTypesCollectionDto} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV4Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourcesLocalStorageContext: defaultResourceLocalStorageContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    resources: null,
    getOpenerTabId: () => 1,
    ...data
  };
}

/**
 * Loading props.
 * @return {Object}
 */
export function loadingProps() {
  const context = defaultAppContext();
  return defaultProps({context});
}

/**
 * No resources props.
 * @return {Object}
 */
export function noResourcesProps() {
  const context = defaultAppContext();
  return defaultProps({context, resources: []});
}

/**
 * Search no result props.
 * @return {Object}
 */
export function searchNoResultProps() {
  const context = defaultAppContext({
    search: "apache",
  });
  return defaultProps({context, resources: []});
}

/**
 * Search with results props.
 * @return {Object}
 */
export function searchWithResultProps() {
  const context = defaultAppContext({
    search: "apache",
  });
  return defaultProps({context, resources: [defaultResourceDto({metadata: defaultResourceMetadataDto({name: "apache", uris: ["http://www.apache.org"]})}), defaultResourceDto()]});
}

/**
 * Suggested resources props.
 * @return {Object}
 */
export function suggestedResourcesProps() {
  const port = new MockPort();
  port.addRequestListener("passbolt.active-tab.get-url", () => "http:\/\/www.apache.org\/");
  const context = defaultAppContext({
    port: port,
  });
  return defaultProps({context, resources: [defaultResourceDto({metadata: defaultResourceMetadataDto({name: "apache", uris: ["http://www.apache.org"]})}), defaultResourceDto()]});
}

/**
 * Suggested resources props with deny ui action.
 * @return {Object}
 */
export function denyUiActionProps(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data,
  });
}
