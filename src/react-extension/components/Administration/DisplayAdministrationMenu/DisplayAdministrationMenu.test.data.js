/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    trustedDomain: "http://localhost:3000",
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(selectedAdministration) {
  return {
    context: {
      siteSettings: {
        canIUse: () => true
      }
    },
    administrationWorkspaceContext: {
      selectedAdministration
    },
    navigationContext: {
      onGoToAdministrationSubscriptionRequested: jest.fn(),
      onGoToAdministrationEmailNotificationsRequested: jest.fn(),
      onGoToAdministrationUsersDirectoryRequested: jest.fn(),
      onGoToAdministrationMfaRequested: jest.fn(),
      onGoToAdministrationInternationalizationRequested: jest.fn(),
      onGoToAdministrationAccountRecoveryRequested: jest.fn()
    }
  };
}
