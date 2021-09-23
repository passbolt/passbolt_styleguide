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
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: {
      canIUse: () => true
    }
  };
  return Object.assign(defaultAppContext, appContext || {});
}

const mockTabInfo = {
  title: "test",
  url: "www.test.com"
};

export const mockResults = {
  "passbolt.resources.prepare-resource": mockTabInfo,
  "passbolt.resources.create": {}
};