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

import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";
import { defaultPropsCE, defaultPropsPro } from "./DisplayAdministrationPasswordExpiry.test.data";
import DisplayAdministrationPasswordExpirySettingsPage from "./DisplayAdministrationPasswordExpiry.test.page";
import { waitForTrue } from "../../../../../test/utils/waitFor";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {
  defaultPasswordExpirySettingsEntityDto,
  defaultPasswordExpirySettingsViewModelDto,
  disabledPasswordExpirySettingsViewModelDto,
  passwordExpirySettingsEntityDtoFromApi,
} from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";

/**
 * Unit tests on DisplayAdministrationPasswordExpirySettingsPage in regard of specifications
 */
describe("DisplayAdministrationPasswordExpirySettingsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the password expiry settings", () => {
    it("The component loads properly", async () => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        defaultPasswordExpirySettingsEntityDto(),
      );

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      expect(page.saveSettingsButton).not.toBeNull();
      expect(page.title.textContent).toBe("Password Expiry");
    });

    it("As an administrator I can access the password expiry settings help page", async () => {
      expect.assertions(3);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        defaultPasswordExpirySettingsEntityDto(),
      );

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      const helpPageLink = page.helpPageLink;
      expect(helpPageLink).not.toBeNull();
      expect(helpPageLink.getAttribute("rel")).toStrictEqual("noopener noreferrer");
      expect(helpPageLink.getAttribute("href")).toStrictEqual(
        "https://passbolt.com/docs/admin/password-configuration/password-expiry",
      );
    });
  });

  describe("As a signed-in administrator I can manage the password expiry feature", () => {
    it("As an administrator I can enable the password expiry feature", async () => {
      expect.assertions(1);
      const context = defaultAppContext();
      const props = defaultPropsCE();

      const expectedPasswordExpirySettingsDto = defaultPasswordExpirySettingsViewModelDto();

      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        disabledPasswordExpirySettingsViewModelDto(),
      );
      props.context.port.addRequestListener("passbolt.password-expiry.save", async (passwordExpirySettingsDto) => {
        expect(passwordExpirySettingsDto).toStrictEqual(expectedPasswordExpirySettingsDto);
        return passwordExpirySettingsDto;
      });

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnFeatureToggle();
      await page.clickOnSave();
    });

    it("As an administrator I can delete the password expiry settings", async () => {
      expect.assertions(1);
      const context = defaultAppContext();
      const props = defaultPropsCE();

      const currentSettings = passwordExpirySettingsEntityDtoFromApi();
      const expectedPasswordExpirySettingsId = currentSettings.id;

      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => currentSettings);
      props.context.port.addRequestListener("passbolt.password-expiry.delete", async (passwordExpirySettingsId) => {
        expect(passwordExpirySettingsId).toStrictEqual(expectedPasswordExpirySettingsId);
      });

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnFeatureToggle();
      await page.clickOnSave();
    });

    it("As an administrator when I modify a field, I can see a changes warning message", async () => {
      expect.assertions(1);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        disabledPasswordExpirySettingsViewModelDto(),
      );

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnFeatureToggle();

      expect(page.saveWarningBanner).not.toBeNull();
    });

    it("As an administrator when I save the policy, I can see a success feedback", async () => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        disabledPasswordExpirySettingsViewModelDto(),
      );

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnFeatureToggle();
      await page.clickOnSave();

      //changes are not pending anymore, saved happened
      expect(page.saveWarningBanner).toBeNull();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    });

    it("As an administrator when I save the policy, I cannot trigger an action on settings page", async () => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () =>
        disabledPasswordExpirySettingsViewModelDto(),
      );

      let savePromise;
      props.context.port.addRequestListener(
        "passbolt.password-expiry.save",
        () =>
          new Promise((resolve) => {
            savePromise = resolve;
          }),
      );

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnFeatureToggle();

      page.clickOn(page.saveSettingsButton);

      await waitForTrue(() => page.saveSettingsButton.hasAttribute("disabled"));
      expect(page.saveSettingsButton.hasAttribute("disabled")).toStrictEqual(true);

      await savePromise(defaultPasswordExpirySettingsViewModelDto());

      await waitForTrue(() => !page.saveSettingsButton.hasAttribute("disabled"));
      expect(page.saveSettingsButton.hasAttribute("disabled")).toStrictEqual(false);
    });

    it("As an administrator when an unexpected error happened while saving the policy, I should see the error dialog", async () => {
      expect.assertions(3);
      const context = defaultAppContext();
      const props = defaultPropsCE();
      const entityDto = defaultPasswordExpirySettingsViewModelDto();
      const expectedError = new Error("Something went wrong!");
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => entityDto);
      props.context.port.addRequestListener("passbolt.password-expiry.save", () => {
        throw expectedError;
      });

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());
      await page.clickOnFeatureToggle();
      await page.clickOnSave();

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expectedError });
    });

    it("As an administrator when the plugin for advanced settings is enabled I should see the advanced form", async () => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultPropsPro();
      const entityDto = defaultPasswordExpirySettingsViewModelDto();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => entityDto);

      const page = new DisplayAdministrationPasswordExpirySettingsPage(context, props);
      await waitForTrue(() => page.exists());
      await page.clickOnFeatureToggle();

      expect(page.passwordExpirySettingsForm).toBeNull();
      expect(page.passwordExpiryFormAdvanced).not.toBeNull();
    });
  });
});
