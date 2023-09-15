/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";
import {defaultPrepareResourceContext} from "../../contexts/PrepareResourceContext.test.data";
import {defaultPasswordPoliciesContext} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPasswordPoliciesDto} from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: {
      canIUse: () => true
    },
    isAuthenticated: true,
    getOpenerTabId: () => null,
    getBootstrapFeature: () => null,
    getDetached: () => false,
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  prepareResourceContext: defaultPrepareResourceContext(),
  passwordPoliciesContext: defaultPasswordPoliciesContext({
    getPolicies: jest.fn(() => defaultPasswordPoliciesDto())
  }),
  ...props
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
