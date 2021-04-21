/**
 * Default props
 */
import MockPort from "../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @returns {port: MockPort()}
 */
export function defaultAppContext() {
  const defaultAppContext = {
    onRefreshLocaleRequested: jest.fn()
  };
  return defaultAppContext;
}

/**
 * Default props
 */
export function defaultProps() {
  return {
    value: {
      port: new MockPort(),
    }
  };
}
