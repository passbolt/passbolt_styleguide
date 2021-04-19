import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    folders: [],
    resources: [],
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
