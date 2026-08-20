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
 * @since         5.15.0
 */

import { BrowserIntegrationBootstrap } from "./BrowserIntegrationBootstrap";
import InFormManager from "./lib/InForm/InFormManager";
import { QuickAccessEvent } from "./Events/Quickaccess/QuickAccessEvent";
import { AuthLogin } from "./AuthLogin/AuthLogin";
import { anonymousSiteSettings } from "../shared/models/entity/siteSettings/siteSettingsEntity.test.data";
import MockPort from "../react-extension/test/mock/MockPort";

describe("BrowserIntegrationBootstrap", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, "port", {
      writable: true,
      value: new MockPort(),
    });

    jest.spyOn(AuthLogin, "legacyAuthLogin").mockImplementation();
    jest.spyOn(QuickAccessEvent, "fillForm").mockImplementation();
    jest.spyOn(InFormManager, "initialize").mockImplementation();
  });

  describe("BrowserIntegrationBootstrap::init", () => {
    it("should bootstrap the legacy auth login and the quickaccess", async () => {
      expect.assertions(2);

      window.port.addRequestListener(
        "passbolt.site-settings.get-or-find",
        jest.fn(() => anonymousSiteSettings()),
      );

      await BrowserIntegrationBootstrap.init();

      expect(AuthLogin.legacyAuthLogin).toHaveBeenCalledTimes(1);
      expect(QuickAccessEvent.fillForm).toHaveBeenCalledTimes(1);
    });

    it("should initialize the InForm manager when the in-form integration is enabled", async () => {
      expect.assertions(1);

      window.port.addRequestListener(
        "passbolt.site-settings.get-or-find",
        jest.fn(() => anonymousSiteSettings()),
      );

      await BrowserIntegrationBootstrap.init();

      expect(InFormManager.initialize).toHaveBeenCalledTimes(1);
    });

    it("should not initialize the InForm manager when the in-form integration is disabled", async () => {
      expect.assertions(1);

      const siteSettingsDto = anonymousSiteSettings();
      siteSettingsDto.passbolt.plugins.inFormIntegration.enabled = false;
      window.port.addRequestListener(
        "passbolt.site-settings.get-or-find",
        jest.fn(() => siteSettingsDto),
      );

      await BrowserIntegrationBootstrap.init();

      expect(InFormManager.initialize).not.toHaveBeenCalled();
    });

    it("should not initialize the InForm manager when the site settings cannot be retrieved", async () => {
      expect.assertions(1);

      window.port.addRequestListener(
        "passbolt.site-settings.get-or-find",
        jest.fn(() => {
          throw new Error("Unable to reach the API");
        }),
      );

      await BrowserIntegrationBootstrap.init();

      expect(InFormManager.initialize).not.toHaveBeenCalled();
    });
  });
});
