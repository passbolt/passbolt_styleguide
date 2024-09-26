/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultPrepareResourceContext} from "../../contexts/PrepareResourceContext.test.data";
import {defaultPasswordPoliciesContext} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPasswordPoliciesDto} from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import {defaultUserAppContext} from "../../../react-extension/contexts/ExtAppContext.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import {overridenPasswordExpirySettingsEntityDto} from "../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";

export function defaultAppContext(appContext) {
  const defaultAppContext = defaultUserAppContext({
    isAuthenticated: true,
    getOpenerTabId: () => null,
    getBootstrapFeature: () => null,
    getDetached: () => false,
  });
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  prepareResourceContext: defaultPrepareResourceContext(),
  passwordExpiryContext: defaultPasswordExpirySettingsContext({
    getSettings: () => overridenPasswordExpirySettingsEntityDto()
  }),
  passwordPoliciesContext: defaultPasswordPoliciesContext({
    getPolicies: jest.fn(() => defaultPasswordPoliciesDto())
  }),
  context: defaultAppContext(),
  ...props,
});

const mockTabInfo = {
  title: "test",
  uri: "www.test.com",
  name: "Tab test",
  username: "test@passbolt.com",
  secret_clear: "password test"
};

export const mockResults = {
  "passbolt.quickaccess.prepare-resource": mockTabInfo,
  "passbolt.resources.create": {}
};
