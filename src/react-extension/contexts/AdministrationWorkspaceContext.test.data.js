/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import mockPort from "../../../demo/ext-app/mock/mockPort";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: mockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 */
export function defaultProps() {
  return {};
}
