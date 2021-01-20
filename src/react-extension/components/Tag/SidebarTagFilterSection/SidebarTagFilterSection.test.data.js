import MockPort from "../../../test/mock/MockPort";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

export function defaultResourceWorkspaceContext(context) {
  const defaultResourceWorkspaceContext = {
    filter: {
      type: ResourceWorkspaceFilterTypes.TAG,
      payload: {
        tag: {
          id: "1"
        }
      }
    }
  };
  return Object.assign(defaultResourceWorkspaceContext, context || {});
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    history: {
      push: jest.fn()
    },
  };
}

/**
 * Mocked list of tags
 */
export const tagsMock = [
  {
    id: "1",
    slug: "test",
    is_shared: false
  },
  {
    id: "2",
    slug: "slug",
    is_shared: false
  },
  {
    id: "3",
    slug: "#git",
    is_shared: true
  },
  {
    id: "4",
    slug: "gpg",
    is_shared: false
  },
  {
    id: "5",
    slug: "there’s always something to look at if you open your eyes!",
    is_shared: false
  }
];
