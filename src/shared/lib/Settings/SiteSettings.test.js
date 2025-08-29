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
 * @since         5.4.0
 */
import {defaultCeSiteSettings, defaultProSiteSettings} from "../../../react-extension/test/fixture/Settings/siteSettings.test.data";
import SiteSettings from "./SiteSettings";

describe("SiteSettings", () => {
  describe("::isFeatureBeta", () => {
    it("should return true if it is mark beta in the settings", () => {
      expect.assertions(1);
      const settingsDto = defaultProSiteSettings();
      settingsDto.passbolt.plugins.metadata.isInBeta = true;
      const settings = new SiteSettings(settingsDto);
      expect(settings.isFeatureBeta("metadata")).toStrictEqual(true);
    });

    it("should return false if it is mark as not beta in the settings", () => {
      expect.assertions(1);
      const settingsDto = defaultProSiteSettings();
      settingsDto.passbolt.plugins.metadata.isInBeta = false;
      const settings = new SiteSettings(settingsDto);
      expect(settings.isFeatureBeta("metadata")).toStrictEqual(false);
    });

    it("should return false if there is no beta information in the settings", () => {
      expect.assertions(1);
      const settingsDto = defaultProSiteSettings();
      delete settingsDto.passbolt.plugins.metadata.isInBeta;
      const settings = new SiteSettings(settingsDto);
      expect(settings.isFeatureBeta("metadata")).toStrictEqual(false);
    });

    it("should return false if the feature does not exist in the settings", () => {
      expect.assertions(1);
      const settings = new SiteSettings(defaultProSiteSettings());
      expect(settings.isFeatureBeta("unknown-flag")).toStrictEqual(false);
    });

    it("should throw an error if the parameter is not a string", () => {
      expect.assertions(1);
      const settings = new SiteSettings(defaultProSiteSettings());
      expect(() => settings.isFeatureBeta(42)).toThrowError();
    });
  });

  describe("::isCeEdition", () => {
    it("should return true if app is Community Edition", () => {
      expect.assertions(1);
      const settingsDto = defaultCeSiteSettings();
      const settings = new SiteSettings(settingsDto);
      expect(settings.isCeEdition).toStrictEqual(true);
    });

    it("should return false if app is Pro Edition", () => {
      expect.assertions(1);
      const settingsDto = defaultProSiteSettings();
      const settings = new SiteSettings(settingsDto);
      expect(settings.isCeEdition).toStrictEqual(false);
    });
  });
});
