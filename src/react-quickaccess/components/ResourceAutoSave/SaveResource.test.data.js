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
    userSettings: new UserSettings(userSettingsFixture)
  };
  return Object.assign(defaultAppContext, appContext || {});
}

const mockTabInfo = {
  name: "test",
  uri: "www.test.com",
  username: "test@passbolt.com",
  secret_clear: "test@passbolt.com"
};

export const mockResults = {
  "passbolt.quickaccess.prepare-autosave": mockTabInfo,
  "passbolt.resources.create": {}
};

export function mockExtensionCall(context) {
  context.port = {
    request: function(event, value) {
      return new Promise((resolve, reject) => {
        if (event === "passbolt.quickaccess.prepare-autosave") {
          resolve({
            name: "Passbolt Browser Extension Test",
            uri: "https://passbolt-browser-extension/test",
            username: "passbolt.com",
            secret_clear: "p@ssw0rd00"
          });
        } else if (event === "passbolt.secrets.powned-password") {
          if (value === "hello-world") {
            resolve(3);
          } else if (value === "unavailable") {
            reject();
          } else {
            resolve(0);
          }
        }
      });
    }
  };
}
