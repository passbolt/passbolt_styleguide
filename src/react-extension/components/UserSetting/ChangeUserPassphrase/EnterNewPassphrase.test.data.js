/**
 * Default props
 * @returns {object}
 */
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";

export function defaultProps() {
  const props = {
    context: {
      userSettings: new UserSettings(userSettingsFixture),
      siteSettings: {
        canIUse: () => true,
      },
      port: {
        request: async() => 0
      }
    },
    userSettingsContext: {
      onUpdatePassphraseRequested: jest.fn(),
      onGoToIntroductionPassphraseRequested: jest.fn(),
    },
    dialogContext: {
      open: jest.fn()
    },
  };

  return props;
}
