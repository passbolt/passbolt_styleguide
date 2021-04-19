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
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    },
    resourceWorkspaceContext: {
      resourceFileImportResult: {
        created: {
          foldersCount: 5,
          resourcesCount: 10,
        },
        references: {
          folder: {
            id: "1"
          }
        },
        errors: {
          resources: [{
            name: "resource1"
          },
          {
            name: "resource2"
          }],
          folders: [{
            name: "folder1"
          }]
        }
      }
    }
  };
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultPropsWithNoError() {
  return {
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    },
    resourceWorkspaceContext: {
      resourceFileImportResult: {
        created: {
          foldersCount: 5,
          resourcesCount: 10,
        },
        references: {
          tag: {
            slug: "tag"
          },
        }
      }
    }
  };
}
