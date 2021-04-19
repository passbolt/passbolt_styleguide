import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    siteSettings: new SiteSettings(siteSettingsFixture),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    folder: foldersMock[1],
    hide: jest.fn(),
    left: 0,
    top: 0,
    dialogContext: {
      open: jest.fn()
    },
    resourceWorkspaceContext: {
      onResourcesToExport: jest.fn()
    }
  };
}

/**
 * Default props
 * @returns {any}
 */
export function propsFolderOnlyRead() {
  return {
    folder: foldersMock[0],
    hide: jest.fn(),
    left: 0,
    top: 0,
    dialogContext: {
      open: jest.fn()
    },
    resourceWorkspaceContext: {
      onResourcesToExport: jest.fn()
    }
  };
}

/**
 * Mocked list of resources
 */
export const foldersMock = [
  {
    "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "name": "Accounting",
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permission": {
      "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
      "aco": "Folder",
      "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-05-11T10:11:13+00:00",
      "modified": "2020-05-11T10:11:13+00:00"
    },
    "folder_parent_id": null,
    "personal": false
  }, {
    "id": "299f613b-0706-570a-8636-956186384e0a",
    "name": "Certificates",
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permission": {
      "id": "3a2611ed-cbcb-523f-b095-a130187173ae",
      "aco": "Folder",
      "aco_foreign_key": "3ed65efd-7c41-5906-9c02-71e2d95951da",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 15,
      "created": "2020-05-11T10:11:13+00:00",
      "modified": "2020-05-11T10:11:13+00:00"
    },
    "folder_parent_id": null,
    "personal": false
  }
];
