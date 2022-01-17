import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: {
      getTrustedDomain: () => (new URL(window.location.href)).origin
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Props with user details
 */
export function propsWithUserDetails() {
  return {
    userWorkspaceContext: {
      details: {
        user: 'some user',
        locked: true
      }
    }
  };
}

/**
 * Props with user group details
 */
export function propsWithGroupDetails() {
  return {
    userWorkspaceContext: {
      details: {
        group: 'some group',
        locked: true
      }
    }
  };
}


/**
 * Props with user details locked to false
 */
export function propsWithoutLock() {
  return {
    userWorkspaceContext: {
      details: {
        locked: false
      }
    }
  };
}

