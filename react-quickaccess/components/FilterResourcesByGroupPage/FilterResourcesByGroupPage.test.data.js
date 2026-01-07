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

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { createMemoryHistory } from "history";
import { defaultGroupDto } from "../../../shared/models/entity/group/groupEntity.test.data";
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
export function defaultProps(props = {}) {
  const port = new MockPort();
  port.addRequestListener(
    "passbolt.resources.find-all-ids-by-is-shared-with-group",
    () => new Promise((resolve) => setTimeout(() => resolve(props.groups ?? []), 4000)),
  );
  port.addRequestListener(
    "passbolt.groups.find-my-groups",
    () => new Promise((resolve) => setTimeout(() => resolve(props.resources ?? []), 4000)),
  );
  const defaultContext = { port };
  const defaultProps = {
    context: defaultAppContext({
      ...defaultContext,
      ...props?.context,
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  };

  delete props.context; // Treated in the default

  return Object.assign(defaultProps, props);
}

/**
 * No groups props.
 * @param props
 * @return {Object}
 */
export function noGroupsProps(props) {
  const port = new MockPort();
  port.addRequestListener("passbolt.resources.find-all-ids-by-is-shared-with-group", () => []);
  port.addRequestListener("passbolt.groups.find-my-groups", () => []);
  const defaultContext = { port };
  const context = {
    ...defaultContext,
    ...props?.context,
  };
  return defaultProps({ context });
}

/**
 * With groups props.
 * @param props
 * @return {Object}
 */
export function withGroupsProps(props) {
  const port = new MockPort();
  const groups = props?.groups || [
    defaultGroupDto({
      name: "group1",
    }),
    defaultGroupDto({
      name: "group2",
    }),
    defaultGroupDto({
      name: "group3",
    }),
    defaultGroupDto({
      name: "group4",
    }),
  ];
  port.addRequestListener("passbolt.groups.find-my-groups", () => groups);
  const defaultContext = { port };
  const context = {
    ...defaultContext,
    ...props?.context,
  };
  return defaultProps({ context });
}

/**
 * No groups props.
 * @param props
 * @return {Object}
 */
export function withSelectedGroupProps(props) {
  const propsWithGroup = defaultProps(props);
  propsWithGroup.history = createMemoryHistory();
  propsWithGroup.location = propsWithGroup.history.location;

  propsWithGroup.location.state = {
    selectedGroup: defaultGroupDto().id,
  };

  return propsWithGroup;
}

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export function withFilteredResourcesProps(props) {
  const port = new MockPort();

  const resources = props?.resources ?? [
    defaultResourceDto(
      {
        metadata: {
          name: "apache",
          username: "www-data",
          uris: ["http://www.apache.org/", "http://www.apache.org/projects"],
          description: "Apache is the world\u0027s most used web server software.",
        },
      },
      { withTags: true },
    ),
    defaultResourceDto(
      {
        metadata: {
          name: "passbolt",
          username: "passbolt",
          uris: ["http://www.passbolt.local/"],
          description: "passbolt.",
        },
      },
      { withTags: true },
    ),
  ];

  port.addRequestListener("passbolt.groups.find-my-groups", () => [
    defaultGroupDto({ name: "group1" }),
    defaultGroupDto({ name: "group2" }),
  ]);
  port.addRequestListener("passbolt.resources.find-all-ids-by-is-shared-with-group", () => [
    resources[0]?.id,
    resources[1]?.id,
  ]);
  const defaultContext = { port };
  const context = Object.assign(defaultContext, props?.context);

  return withSelectedGroupProps({ context, resources: resources });
}
