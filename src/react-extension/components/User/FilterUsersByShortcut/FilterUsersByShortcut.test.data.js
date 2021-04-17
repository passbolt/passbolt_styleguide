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
    history: {
      push: jest.fn(),
    }
  };
}
