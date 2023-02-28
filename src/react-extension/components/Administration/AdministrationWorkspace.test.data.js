/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */

import DisplayAdministrationEmailNotificationActions from "./DisplayAdministrationWorkspaceActions/DisplayAdministrationEmailNotificationActions/DisplayAdministrationEmailNotificationActions";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    siteSettings: {
      canIUse: () => true
    },
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
    mfaContext: {
      checkMfaChoiceRequired: jest.fn()
    },
    administrationWorkspaceContext: {
      selectedAdministration,
      administrationWorkspaceAction: DisplayAdministrationEmailNotificationActions
    }
  };
}

