import MockPort from "../../../test/mock/MockPort";

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
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
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
