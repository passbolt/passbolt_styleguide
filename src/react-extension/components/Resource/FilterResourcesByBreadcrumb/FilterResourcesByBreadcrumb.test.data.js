
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
export function defaultResourceWorkspaceContext(type, payload, numberOfResources = 0) {
  const resources = [];
  for (let i = 0; i < numberOfResources; i++) {
    const resource = {};
    resources.push(resource);
  }
  return {
    filter: {
      type,
      payload
    },
    filteredResources: resources
  };
}
