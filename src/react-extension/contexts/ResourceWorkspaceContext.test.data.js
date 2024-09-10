/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {v4 as uuidv4} from "uuid";
import {ResourceWorkspaceFilterTypes} from "./ResourceWorkspaceContext";
import {defaultFolderDto, folderWithReadPermissionDto} from "../../shared/models/entity/folder/folderEntity.test.data";
import {
  defaultResourceDto,
  resourceStandaloneTotpDto,
  resourceWithTotpDto
} from "../../shared/models/entity/resource/resourceEntity.test.data";
import ColumnsResourceSettingCollection from "../../shared/models/entity/resource/columnsResourceSettingCollection";
import {defaultUserAppContext} from "./ExtAppContext.test.data";
import {defaultPasswordExpirySettingsContext} from "./PasswordExpirySettingsContext.test.data";
import {defaultUserRbacContext} from "../../shared/context/Rbac/RbacContext.test.data";
import {readPermissionDto, updatePermissionDto} from "../../shared/models/entity/permission/permissionEntity.test.data";
import {defaultResourceMetadataDto} from "../../shared/models/entity/resourceMetadata/resourceMetadataEntity.test.data";
import {defaultTagDto} from "../../shared/models/entity/tag/tagEntity.test.data";

export function defaultAppContext(appContext) {
  const folders = [
    defaultFolderDto({name: "Folder searchable"})
  ];
  const resourceWithEncryptedDescriptionToUpdateId = uuidv4();
  const resourceWithTotpToUpdateId = uuidv4();
  const resourceTotpToUpdateId = uuidv4();
  const resourceWithEncryptedDescriptionToReadId = uuidv4();
  const resourceWithTotpToReadId = uuidv4();
  const resourceTotpToReadId = uuidv4();
  const resources = [
    defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Resource owned"})}, {withFavorite: true}),
    resourceWithTotpDto({metadata: defaultResourceMetadataDto({name: "Resource in folder"}), folder_parent_id: folders[0].id}),
    resourceStandaloneTotpDto({tags: [defaultTagDto()]}),
    defaultResourceDto({permission: updatePermissionDto({aco_foreign_key: resourceWithEncryptedDescriptionToUpdateId})}),
    resourceWithTotpDto({permission: updatePermissionDto({aco_foreign_key: resourceWithTotpToUpdateId})}),
    resourceStandaloneTotpDto({permission: updatePermissionDto({aco_foreign_key: resourceTotpToUpdateId})}),
    defaultResourceDto({permission: readPermissionDto({aco_foreign_key: resourceWithEncryptedDescriptionToReadId})}),
    resourceWithTotpDto({permission: readPermissionDto({aco_foreign_key: resourceWithTotpToReadId})}),
    resourceStandaloneTotpDto({permission: readPermissionDto({aco_foreign_key: resourceTotpToReadId})}),
  ];

  const defaultAppContext = defaultUserAppContext({
    folders,
    resources,
  });
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 */
export function defaultProps() {
  return {
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    rbacContext: defaultUserRbacContext()
  };
}

/**
 * Returns the default resource workspace context data.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function defaultResourceWorkspaceContext(data = {}) {
  return {
    details: {
      folder: null,
      resource: null,
    },
    filteredResources: [],
    selectedResources: [],
    columnsResourceSetting: new ColumnsResourceSettingCollection([
      {id: "favorite", label: "Favorite", position: 1, show: true},
      {id: "attentionRequired", label: "Attention", position: 2, show: true},
      {id: "name", label: "Name", position: 3, show: true},
      {id: "expired", label: "Expiry", position: 4, show: true},
      {id: "username", label: "Username", position: 5, show: true},
      {id: "password", label: "Password", position: 6, show: true},
      {id: "totp", label: "TOTP", position: 7, show: true},
      {id: "uri", label: "URI", position: 8, show: true},
      {id: "modified", label: "Modified", position: 9, show: true},
      {id: "location", label: "Location", position: 10, show: true}]),
    filter: {
      type: ResourceWorkspaceFilterTypes.ALL
    },
    scrollTo: {
    },
    sorter: {
      propertyName: 'modified'
    },
    onGoToResourceUriRequested: jest.fn(),
    onResourceCopied: jest.fn(),
    onResourcePreviewed: jest.fn(),
    onResourceSelected: {
      all: jest.fn(),
      none: jest.fn(),
      multiple: jest.fn(),
      range: jest.fn(),
      single: jest.fn()
    },
    onResourceScrolled: jest.fn(),
    onResourceEdited: jest.fn(),
    onSorterChanged: jest.fn(),
    onResourcesToExport: jest.fn(),
    onResourceFileImportResult: jest.fn(),
    onResourceFileToImport: jest.fn(),
    onLockDetail: jest.fn(),
    onChangeColumnView:  jest.fn(),
    onChangeColumnsSettings:  jest.fn(),
    getHierarchyFolderCache: jest.fn(() => []),
    ...data
  };
}

/**
 * Returns the resource workspace context data with a folder I own selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedFolderIOwn(data = {}) {
  return defaultResourceWorkspaceContext({
    filter: {
      type: ResourceWorkspaceFilterTypes.FOLDER,
      payload: {
        folder: defaultFolderDto()
      }
    },
    ...data
  });
}

/**
 * Returns the resource workspace context data with a folder I can read only selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedFolderICanRead(data = {}) {
  return defaultResourceWorkspaceContext({
    filter: {
      type: ResourceWorkspaceFilterTypes.FOLDER,
      payload: {
        folder: folderWithReadPermissionDto()
      }
    },
    ...data
  });
}

/**
 * Returns the resource workspace context data with a resource I own selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedResourceIOwn(data = {}) {
  return defaultResourceWorkspaceContext({
    details: {
      resource: defaultResourceDto(),
    },
    ...data
  });
}
