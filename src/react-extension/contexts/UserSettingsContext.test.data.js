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
    port: new MockPort(),
  };
  return defaultAppContext;
}

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
  };

  return props;
}
