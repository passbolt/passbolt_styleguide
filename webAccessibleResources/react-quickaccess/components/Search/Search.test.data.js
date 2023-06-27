/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    updateSearch: () => {},
    search: "",
  };
  return Object.assign(defaultAppContext, appContext || {});
}
