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
 * @since         2.13.0
 */

import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import { defaultAdministratorRbacContext } from "../../../../shared/context/Rbac/RbacContext.test.data";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import SiteSettingsEntity from "../../../../shared/models/entity/siteSettings/siteSettingsEntity";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import {
  defaultResourceDto,
  resourceExpiredDto,
  resourceStandaloneTotpDto,
  resourceWithFavoriteDto,
  resourceWithReadPermissionDto,
  resourceWithTotpDto,
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultPasswordExpirySettingsContext } from "../../../contexts/PasswordExpirySettingsContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultWorkflowContext } from "../../../contexts/WorkflowContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import { defaultClipboardContext } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import { TEST_RESOURCE_TYPE_V5_DEFAULT } from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import SecretRevisionsSettingsEntity from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity";
import { defaultSecretRevisionsSettingsDto } from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";
import OfflineSettingsEntity from "../../../../shared/models/entity/offline/offlineSettingsEntity";
import { defaultOfflineSettingsDto } from "../../../../shared/models/entity/offline/offlineSettingsEntity.test.data";
import { defaultOfflineItemDto } from "../../../../shared/models/entity/offline/offlineItemEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettingsEntity, port: MockPort} & {})}
 */
export const defaultAppContext = (appContext = {}) => {
  const siteSettings = new SiteSettingsEntity(siteSettingsFixture);
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    setContext: () => jest.fn(),
  };
  return Object.assign(defaultAppContext, appContext);
};

/**
 * Returns the default props for the current component.
 * @param {object} [data = {}]
 * @returns {object}
 */
const defaultProps = (data = {}) => ({
  context: defaultAppContext(),
  rbacContext: defaultAdministratorRbacContext(),
  offlineSettings: new OfflineSettingsEntity(defaultOfflineSettingsDto()),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  dialogContext: defaultDialogContext(),
  workflowContext: defaultWorkflowContext(),
  clipboardContext: defaultClipboardContext(),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  secretRevisionsSettings: new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto()),
  ...data,
});

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsOneResourceOwned = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[0]],
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props one selected resource private
 * @returns {object}
 */
export const defaultPropsOneResourceV5Private = (data = {}) => {
  const resource = defaultResourceDto({ personal: true, resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT });
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resource],
      lockDisplayDetail: true,
    }),
    ...data,
  });
};

/**
 * Default props one selected resource v5 shared
 * @returns {object}
 */
export const defaultPropsOneResourceV5Shared = (data = {}) => {
  const resource = defaultResourceDto({ resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT });
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resource],
      lockDisplayDetail: true,
    }),
    ...data,
  });
};

/**
 * Default props one selected totp resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsOneTotpResourceOwned = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[3]],
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props one selected resource already available offline
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsOneResourceOfflineAvailable = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [defaultResourceDto({ name: "offline-resource", offline: defaultOfflineItemDto() })],
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props one selected totp resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsOneStandaloneTotpResourceOwned = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[4]],
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsOneResourceNotOwned = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[2]],
      lockDisplayDetail: false,
    }),
    ...data,
  });

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsNoResource = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props multiple selected resource
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsMultipleResource = (data = {}) =>
  defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: resourcesMock,
      lockDisplayDetail: true,
    }),
    ...data,
  });

/**
 * Default props multiple selected resource can update
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsMultipleResourceUpdateRights = (data = {}) => {
  const selectedResources = [resourcesMock[0], resourcesMock[1]];
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources,
      lockDisplayDetail: true,
    }),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({ policy_override: true }),
    ...data,
  });
};

/**
 * Default props multiple selected resources where all are expired
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsMultipleResourceAllExpired = (data = {}) => {
  const selectedResources = [resourceExpiredDto({ name: "expired-1" }), resourceExpiredDto({ name: "expired-2" })];
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources,
      lockDisplayDetail: true,
    }),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({ policy_override: true }),
    ...data,
  });
};

/**
 * Default props multiple selected resources where only some are expired
 * @returns {{resourceWorkspaceContext}}
 */
export const defaultPropsMultipleResourceSomeExpired = (data = {}) => {
  const selectedResources = [resourcesMock[0], resourceExpiredDto({ name: "expired" })];
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources,
      lockDisplayDetail: true,
    }),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({ policy_override: true }),
    ...data,
  });
};

/**
 * Mocked list of resources
 */
export const resourcesMock = [
  resourceWithFavoriteDto({ name: "apache" }),
  defaultResourceDto({ name: "bower" }),
  resourceWithReadPermissionDto({ name: "test" }),
  resourceWithTotpDto({ name: "totp" }),
  resourceStandaloneTotpDto({ name: "standalone totp" }),
];
