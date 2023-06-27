
/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default ResourceWorkspaceContext
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(selectedAdministration) {
  return {
    administrationWorkspaceContext: {
      selectedAdministration,
    }
  };
}
