/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultPasswordGeneratorSettingsDto} from "../../shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data";

export const defaultResourcePasswordGeneratorcontext = (data = {}) => ({
  lastGeneratedPassword: "This is the last generated password",
  getSettings: jest.fn(() => defaultPasswordGeneratorSettingsDto()),
  onPasswordGenerated: jest.fn(),
  resetSecretGeneratorSettings: jest.fn(),
  consumeLastGeneratedPassword: () => "This is the last generated password",
  ...data
});
