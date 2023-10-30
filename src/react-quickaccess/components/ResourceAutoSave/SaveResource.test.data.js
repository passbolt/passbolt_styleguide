/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultUserAppContext} from "../../../react-extension/contexts/ExtAppContext.test.data";

export function defaultAppContext(appContext) {
  const defaultAppContext = defaultUserAppContext();
  return Object.assign(defaultAppContext, appContext || {});
}

export function mockExtensionCall(context) {
  context.port.addRequestListener("passbolt.resources.create", () => {});

  context.port.addRequestListener("passbolt.quickaccess.prepare-autosave", () => ({
    name: "",
    uri: "",
    username: "",
    secret_clear: ""
  }));

  context.port.addRequestListener("passbolt.secrets.powned-password", value => {
    if (value === "hello-world") {
      return 3;
    } else if (value === "unavailable") {
      throw new Error("Service is unavailable");
    }
    return 0;
  });
}

export function mockExtensionCallWithTabInfo(context) {
  mockExtensionCall(context);
  context.port.addRequestListener("passbolt.quickaccess.prepare-autosave", () => ({
    name: "test",
    uri: "www.test.com",
    username: "test@passbolt.com",
    secret_clear: "test@passbolt.com"
  }));
}
