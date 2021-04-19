import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings)}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    userSettingsContext: {
      onProvidePassphraseRequested: jest.fn(),
    },
  };

  return props;
}
