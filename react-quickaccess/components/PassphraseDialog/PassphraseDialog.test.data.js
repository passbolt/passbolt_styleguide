/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";
import SiteSettingsEntity from "../../../shared/models/entity/siteSettings/siteSettingsEntity";
import siteSettingsFixture from "../../../react-extension/test/fixture/Settings/siteSettings";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettingsEntity(siteSettingsFixture),
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Returns the props of a passkey prompt
 * @param {object} passkeyPrompt The passkey prompt to merge
 * @returns {object}
 */
export const passkeyPromptProps = (passkeyPrompt = {}) => ({
  requestId: "8e3874ae-4b40-590b-968a-418f704b9d9a",
  passkeyPrompt: { rpId: "github.com", purpose: "verify", ceremony: "get", ...passkeyPrompt },
  onComplete: jest.fn(),
});
