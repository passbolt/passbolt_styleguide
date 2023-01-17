/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    focusSearch: () => {},
    updateSearch: () => {},
    searchHistory: {},
    search: "",
    userSettings: new UserSettings(userSettingsFixture)
  };
  return Object.assign(defaultAppContext, appContext || {});
}

export function defaultSsoContext(ssoContext) {
  const defaultSsoContext = {
    loadSsoConfiguration: () => Promise.resolve(),
    hasUserAnSsoKit: () => true,
    getProvider: () => "azure",
    runSignInProcess: () => Promise.resolve()
  };
  return Object.assign(defaultSsoContext, ssoContext || {});
}
