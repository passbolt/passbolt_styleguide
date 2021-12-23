/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
import DisplayAdministrationWorkspaceActions
  from "./DisplayAdministrationWorkspaceActions/DisplayAdministrationWorkspaceActions";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Props with user group details
 */
export function defaultProps(selectedAdministration) {
  return {
    context: {
      trustedDomain: "",
      userSettings: {
        getTrustedDomain: jest.fn()
      }
    },
    administrationWorkspaceContext: {
      selectedAdministration,
      administrationWorkspaceAction: DisplayAdministrationWorkspaceActions
    }
  };
}

