import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    context: {
      userSettings: new UserSettings(userSettingsFixture)
    },
    userSettingsContext: {
      onCheckProvidePassphraseRequested: jest.fn(),
      onGoToIntroductionPassphraseRequested: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };

  return props;
}
