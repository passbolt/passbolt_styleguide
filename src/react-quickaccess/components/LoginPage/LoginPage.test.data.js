/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import { defaultAppContext } from "../../contexts/AppContext.test.data";

export function defaultSsoContext(ssoContext) {
  const defaultSsoContext = {
    loadSsoConfiguration: () => "azure",
    getProvider: () => "azure",
    runSignInProcess: jest.fn(() => Promise.resolve()),
  };
  return Object.assign(defaultSsoContext, ssoContext || {});
}

export function defaultPropsWithSsoEnabled(data = {}) {
  const context = defaultAppContext(data.context);
  const ssoContext = defaultSsoContext(data.ssoContext);

  delete data.context;
  delete data.ssoContext;

  return Object.assign({}, { context, ssoContext }, data);
}

export function disabledSsoContext(ssoContext) {
  return defaultSsoContext(Object.assign({ loadSsoConfiguration: () => null, getProvider: () => null }, ssoContext));
}

export function defaultPropsWithSsoDisabled(data = {}) {
  const context = defaultAppContext(data.context);
  const ssoContext = disabledSsoContext(data.ssoContext);

  delete data.context;
  delete data.ssoContext;

  return Object.assign({}, { context, ssoContext }, data);
}
