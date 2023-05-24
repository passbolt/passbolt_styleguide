/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */

import IsEmailValidator from "../../lib/Validator/IsEmailValidator";
import AppEmailValidatorService from "./AppEmailValidatorService";
import IsRegexValidator from "../../lib/Validator/IsRegexValidator";
import SiteSettings from "../../lib/Settings/SiteSettings";
import {
  customEmailValidationSiteSettings,
  defaultCeSiteSettings
} from "../../../react-extension/test/fixture/Settings/siteSettings.test.data";

describe("AppEmailValidatorService", () => {
  describe("AppEmailValidatorService.getValidator", () => {
    it("should return IsEmailValidator as default email validator.", async() => {
      expect.assertions(1);
      expect(AppEmailValidatorService.getValidator()).toBe(IsEmailValidator);
    });

    it("should return IsRegexValidator if the application settings customize the email regex validation.", async() => {
      expect.assertions(1);
      const siteSettings = new SiteSettings(customEmailValidationSiteSettings());
      expect(AppEmailValidatorService.getValidator(siteSettings)).toBeInstanceOf(IsRegexValidator);
    });

    it("should fallback on IsEmailValidator if application settings did not customize the email regex validation.", async() => {
      expect.assertions(1);
      const siteSettings = new SiteSettings(defaultCeSiteSettings());
      expect(AppEmailValidatorService.getValidator(siteSettings)).toBe(IsEmailValidator);
    });

    it("should fallback on IsEmailValidator if application settings cannot be read.", async() => {
      expect.assertions(1);
      expect(AppEmailValidatorService.getValidator({passbolt: ""})).toBe(IsEmailValidator);
    });
  });

  describe("AppEmailValidatorService::validate", () => {
    it("should validate standard email if application settings did not customize the email regex validation.", async() => {
      expect.assertions(2);
      expect(AppEmailValidatorService.validate("ada@passbolt.com")).toBeTruthy();
      expect(AppEmailValidatorService.validate("ada@passbolt.c")).toBeFalsy();
    });

    it("should validate custom email if the application settings customize the email regex validation.", async() => {
      expect.assertions(2);
      const siteSettings = new SiteSettings(customEmailValidationSiteSettings());
      expect(AppEmailValidatorService.validate("ada@passbolt.c", siteSettings)).toBeTruthy();
      expect(AppEmailValidatorService.validate("ada@passbolt.lu", siteSettings)).toBeFalsy();
    });
  });
});
