/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */

import {defaultAppContext} from "../../contexts/ExtAppContext.test.data";
import DisplayAdministrationEmailNotificationActions from "./DisplayAdministrationWorkspaceActions/DisplayAdministrationEmailNotificationActions/DisplayAdministrationEmailNotificationActions";

/**
 * Props with user group details
 */
export function defaultProps(selectedAdministration, isCeEdition = false) {
  return {
    context: defaultAppContext({}, isCeEdition),
    mfaContext: {
      checkMfaChoiceRequired: jest.fn()
    },
    administrationWorkspaceContext: {
      selectedAdministration,
      administrationWorkspaceAction: DisplayAdministrationEmailNotificationActions
    }
  };
}

