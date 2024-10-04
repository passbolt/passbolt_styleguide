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
import {defaultAdministratorRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import ColumnsResourceSettingCollection
  from "../../../../shared/models/entity/resource/columnsResourceSettingCollection";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import {
  defaultResourceDto, resourceStandaloneTotpDto,
  resourceWithFavoriteDto, resourceWithReadPermissionDto, resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext = {}) {
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    setContext: () => jest.fn()
  };
  return Object.assign(defaultAppContext, appContext);
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsOneResourceOwned() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[0]],
      columnsResourceSetting: new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "name", label: "Name", position: 2, show: true},
        {id: "username", label: "Username", position: 3, show: true},
        {id: "password", label: "Password", position: 4, show: true},
        {id: "totp", label: "TOTP", position: 5, show: true},
        {id: "uri", label: "URI", position: 6, show: false},
        {id: "modified", label: "Modified", position: 7, show: true}]),
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn(),
      onChangeColumnView:  jest.fn()
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    dialogContext: defaultDialogContext(),
  };
}

/**
 * Default props one selected totp resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsOneTotpResourceOwned() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[3]],
      columnsResourceSetting: new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "name", label: "Name", position: 2, show: true},
        {id: "username", label: "Username", position: 3, show: true},
        {id: "password", label: "Password", position: 4, show: true},
        {id: "totp", label: "TOTP", position: 5, show: true},
        {id: "uri", label: "URI", position: 6, show: false},
        {id: "modified", label: "Modified", position: 7, show: true}]),
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn(),
      onChangeColumnView:  jest.fn()
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  };
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsOneResourceNotOwned() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: [resourcesMock[2]],
      lockDisplayDetail: false
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  };
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsNoResource() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      columnsResourceSetting: new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: false},
        {id: "name", label: "Name", position: 2, show: true},
        {id: "username", label: "Username", position: 3, show: false},
        {id: "password", label: "Password", position: 4, show: false},
        {id: "uri", label: "URI", position: 5, show: false},
        {id: "modified", label: "Modified", position: 6, show: true}]),
      lockDisplayDetail: true
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  };
}

/**
 * Default props multiple selected resource
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsMultipleResource() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources: resourcesMock,
      lockDisplayDetail: true
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  };
}

/**
 * Default props multiple selected resource can update
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsMultipleResourceUpdateRights() {
  const selectedResources = [resourcesMock[0], resourcesMock[1]];
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      selectedResources,
      lockDisplayDetail: true
    }),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({policy_override: true}),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    dialogContext: defaultDialogContext(),
  };
}

/**
 * Mocked list of resources
 */
export const resourcesMock = [
  resourceWithFavoriteDto({name: 'apache'}),
  defaultResourceDto({name: 'bower'}),
  resourceWithReadPermissionDto({name: 'test'}),
  resourceWithTotpDto({name: 'totp'}),
  resourceStandaloneTotpDto({name: 'standalone totp'}),
];
