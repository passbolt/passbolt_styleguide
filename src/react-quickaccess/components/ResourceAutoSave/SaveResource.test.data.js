/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {
  defaultPasswordExpirySettingsContext
} from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import {
  overridenPasswordExpirySettingsEntityDto
} from "../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {
  defaultPasswordPoliciesContext
} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPasswordPoliciesDto} from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";

export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.appContext),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({
      getSettings: () => overridenPasswordExpirySettingsEntityDto()
    }),
    passwordPoliciesContext: defaultPasswordPoliciesContext({
      getPolicies: jest.fn(() => defaultPasswordPoliciesDto())
    }),
  };
  return Object.assign(defaultProps, props);
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
