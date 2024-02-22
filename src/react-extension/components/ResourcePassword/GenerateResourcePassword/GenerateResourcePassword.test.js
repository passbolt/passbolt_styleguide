/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

/**
 * Unit tests on GenerateResourcePasswordPage in regard of specifications
 */
import "../../../../../test/mocks/mockClipboard";
import {defaultProps} from "./GenerateResourcePassword.test.data";
import GenerateResourcePasswordPage from "./GenerateResourcePassword.test.page";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import {defaultPasswordPoliciesDto} from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {waitFor} from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllTimers();
  jest.useFakeTimers();
});

describe("Generate password", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new GenerateResourcePasswordPage(props);
  });

  describe('As LU I should generate a password', () => {
    it('As LU I should generate a new password', async() => {
      expect.assertions(1);

      const expectedPassword = "generated password";
      jest.spyOn(SecretGenerator, "generate").mockImplementation(() => expectedPassword);

      await page.generatePassword();
      // TODO random value return always the same value
      const password = page.password;

      expect(password).toStrictEqual(expectedPassword);
    });

    it('As LU I should copy a password', async() => {
      expect.assertions(1);
      await page.copyPassword();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(page.password);
    });

    it('As LU I can change the password generator configuration', async() => {
      expect.assertions(4);

      const currentExcludeLookAlikeCharsState = props.passwordPoliciesContext.policies.password_generator_settings.exclude_look_alike_chars;
      const expectedPasswordGeneratorSettings = {
        length: 10,
        mask_upper: false,
        mask_emoji: true,
      };

      await page.usePasswordGenerator();

      await page.setPasswordLength(expectedPasswordGeneratorSettings.length);
      await page.setMasks({
        maskUpper: expectedPasswordGeneratorSettings.mask_upper,
        maskEmoji: expectedPasswordGeneratorSettings.mask_emoji,
      });
      await page.clickOnExcludeLookAlikeChars();

      expect(page.maskUpper.classList.contains('selected')).toStrictEqual(expectedPasswordGeneratorSettings.mask_upper);
      expect(page.maskEmoji.classList.contains('selected')).toStrictEqual(expectedPasswordGeneratorSettings.mask_emoji);
      expect(page.passwordLengthInput.value).toStrictEqual(expectedPasswordGeneratorSettings.length.toString());
      expect(page.excludeLookAlikeChars.checked).not.toBe(currentExcludeLookAlikeCharsState);
    });

    it('As LU I can change the password generator configuration', async() => {
      expect.assertions(3);

      const props = defaultProps({
        resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext({
          getSettings: jest.fn(() => defaultPasswordPoliciesDto({
            default_generator: "passphrase",
          })),
        })
      });

      const page = new GenerateResourcePasswordPage(props);
      await waitFor(() => {});

      const expectedPassphraseGeneratorSettings = {
        words_count: 12,
        words_separator: " separator ",
        word_case: "Camel case",
      };

      await page.usePassphraseGenerator();
      await waitForTrue(() => Boolean(page.passphraseLengthInput));

      await page.setPassphraseLength(expectedPassphraseGeneratorSettings.words_count);
      await page.setWordSeparator(expectedPassphraseGeneratorSettings.words_separator);
      await page.setWordCase(expectedPassphraseGeneratorSettings.word_case);

      expect(page.passphraseWordsSeparatorInput.value).toStrictEqual(expectedPassphraseGeneratorSettings.words_separator);
      expect(page.passphraseLengthInput.value).toStrictEqual(expectedPassphraseGeneratorSettings.words_count.toString());
      expect(page.wordCaseSelectInput.textContent).toStrictEqual(expectedPassphraseGeneratorSettings.word_case);
    });
  });

  describe('As LU I should choose to use password configuration', () => {
    it('AS LU I should be able to use password configuration', async() => {
      expect.assertions(1);
      await page.usePasswordGenerator();
      expect(page.activeTab).toBe('password');
    });
  });

  describe('AS LU I should not perform actions during the apply password', () => {
    it('AS LU I should not re-submit during the apply password', async() => {
      expect.assertions(1);
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.applyGeneratePassword(inProgressFn);
    });
  });
});
