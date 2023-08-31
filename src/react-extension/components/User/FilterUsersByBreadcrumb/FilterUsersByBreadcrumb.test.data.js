import MockPort from "../../../test/mock/MockPort";
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Props with a given user search filter
 * @param filter An user search filter
 */
export function propsWithFilter(type) {
  return {
    userWorkspaceContext: {
      filter: {
        type
      },
      filteredUsers: [{}, {}, {}]
    }
  };
}

/**
 * Props with a text filter
 */
export function propsWithTextFilter() {
  return {
    userWorkspaceContext: {
      filter: {
        type: UserWorkspaceFilterTypes.TEXT,
        payload: "Ada"
      },
      filteredUsers: [{}]
    }
  };
}

/**
 * Props with a text filter
 */
export function propsWithEmptyTextFilter() {
  return {
    userWorkspaceContext: {
      filter: {
        type: UserWorkspaceFilterTypes.TEXT,
        payload: ""
      },
      filteredUsers: []
    }
  };
}

/**
 * Props with a group filter
 */
export function propsWithGroupFilter() {
  return {
    userWorkspaceContext: {
      filter: {
        type: UserWorkspaceFilterTypes.GROUP,
        payload: {
          group: {
            name: "My super group"
          }
        }
      },
      filteredUsers: [{}, {}, {}, {}, {}, {}]
    }
  };
}

/**
 * Props with a group filter
 */
export function propsWithEmptyGroupNameFilter() {
  return {
    userWorkspaceContext: {
      filter: {
        type: UserWorkspaceFilterTypes.GROUP,
        payload: {
          group: {
          }
        }
      },
      filteredUsers: []
    }
  };
}
