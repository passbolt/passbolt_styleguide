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
    userSettings: new UserSettings(userSettingsFixture),
    setWindowBlurBehaviour: () => {},
    shouldCloseAtWindowBlur: true
  };
  return Object.assign(defaultAppContext, appContext || {});
}

export function defaultSsoContext(ssoContext) {
  const defaultSsoContext = {
    loadSsoConfiguration: jest.fn(() => Promise.resolve()),
    hasUserAnSsoKit: jest.fn(() => true),
    getProvider: jest.fn(() => "azure"),
    runSignInProcess: jest.fn(() => Promise.resolve())
  };
  return Object.assign(defaultSsoContext, ssoContext || {});
}

export function defaultPropsWithSsoEnabled(data = {}) {
  const context = defaultAppContext(data.context);
  const ssoContext = defaultSsoContext(data.ssoContext);

  delete data.context;
  delete data.ssoContext;

  return Object.assign({}, {context, ssoContext}, data);
}

export function defaultPropsWithSsoDisabled(data = {}) {
  const context = defaultAppContext(data.context);

  const ssoContext = Object.assign(defaultSsoContext(), {
    getProvider: jest.fn(() => null),
    hasUserAnSsoKit: jest.fn(() => false),
  }, data.ssoContext);

  delete data.context;
  delete data.ssoContext;

  return Object.assign({}, {context, ssoContext}, data);
}
