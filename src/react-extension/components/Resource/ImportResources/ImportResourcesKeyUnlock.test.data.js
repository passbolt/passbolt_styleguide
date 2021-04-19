import MockPort from "../../../test/mock/MockPort";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
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
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn()
    },
    resourceWorkspaceContext: {
      onResourceFileToImport: jest.fn(),
      onResourceFileImportResult: jest.fn(),
      resourceFileToImport: {
        b64FileContent: "dGVzdA==",
        fileType: "kdbx"
      }
    }
  };
}
