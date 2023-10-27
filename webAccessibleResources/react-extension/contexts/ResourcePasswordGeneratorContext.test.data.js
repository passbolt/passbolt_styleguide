/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultPassphraseGeneratorSettingsDto} from "../../shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data";
import {defaultPasswordGeneratorSettingsDto} from "../../shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data";
import {defaultPasswordPoliciesDto} from "../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

export const defaultResourcePasswordGeneratorContext = (data = {}) => ({
  lastGeneratedPassword: "This is the last generated password",
  getSettings: jest.fn(() => defaultPasswordPoliciesDto({
    password_generator_settings: defaultPasswordGeneratorSettingsDto({
      min_length: 8,
      max_length: 128
    }),
    passphrase_generator_settings: defaultPassphraseGeneratorSettingsDto({
      min_words: 4,
      max_words: 40
    })
  })),
  onPasswordGenerated: jest.fn(),
  resetSecretGeneratorSettings: jest.fn(),
  consumeLastGeneratedPassword: () => "This is the last generated password",
  ...data
});
