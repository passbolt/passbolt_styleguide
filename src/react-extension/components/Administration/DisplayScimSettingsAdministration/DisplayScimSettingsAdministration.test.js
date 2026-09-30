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
 * @since         5.5.0
 */

import {
  defaultProps,
  defaultScimSettingsConfiguredProps,
  defaultScimSettingsDisabledProps,
  defaultScimSettingsExpiredTokenProps,
  defaultScimSettingsExpiringTokenProps,
  defaultScimSettingsHealthyTokenProps,
} from "./DisplayScimSettingsAdministration.test.data";
import DisplayScimSettingsAdministrationPage from "./DisplayScimSettingsAdministration.test.page";
import { defaultScimSettingsDto } from "../../../../shared/services/serviceWorker/scim/scimSettingsServiceWorkerService.test.data";
import { waitFor } from "@testing-library/dom";
import { act } from "react";
import { DateTime } from "luxon";

describe("DisplayScimSettingsAdministration", () => {
  let page, props;
  beforeEach(async () => {
    props = defaultProps();
    await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));
  });

  it("should display the title and description", async () => {
    expect.assertions(2);
    expect(page.title).toBe("SCIM");
    expect(page.description).toBe(
      "SCIM is a standard protocol that automates user provisioning and deprovisioning with identity providers.",
    );
  });

  it("should allow disabling SCIM settings", async () => {
    expect.assertions(4);

    jest.spyOn(props.context.port, "request");
    expect(page.scimSettingsToggle.checked).toEqual(true);

    await page.toggleScimSettings();

    expect(page.scimSettingsToggle.checked).toEqual(false);
    expect(page.warning.textContent).toEqual("Please save the settings to disable the feature.");

    await page.clickSaveButton();

    expect(props.scimSettingsServiceWorkerService.disableSettings).toHaveBeenCalled();
  });

  it("should allow enabling SCIM settings", async () => {
    expect.assertions(4);

    props = defaultScimSettingsDisabledProps();
    await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));
    expect(page.exists()).toBeTruthy();

    await page.toggleScimSettings();

    expect(page.scimSettingsToggle.checked).toEqual(true);
    expect(page.warning.textContent).toEqual("Please save the settings to enable the feature.");

    await page.clickSaveButton();

    expect(props.scimSettingsServiceWorkerService.createSettings).toHaveBeenCalled();
  });

  it("scim url should be disabled by default", async () => {
    expect.assertions(1);

    expect(page.isScimUrlInputDisabled).toBeTruthy();
  });

  it("should not be able to copy secret token if not exist", async () => {
    expect.assertions(3);

    props = defaultScimSettingsConfiguredProps();
    await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));
    await waitFor(() => page.copySecretTokenButton !== null);
    expect(page.exists()).toBeTruthy();
    expect(page.isScimSecretTokenInputDisabled).toBeTruthy();
    expect(page.isCopySecretTokenButtonDisabled).toBeTruthy();
  });

  it("should allow copying SCIM URL", async () => {
    expect.assertions(1);

    await page.clickCopyScimUrlButton();

    expect(props.clipboardContext.copy).toHaveBeenCalledWith(
      page.scimUrlInput.value,
      "The SCIM URL has been copied to the clipboard.",
    );
  });

  it("should allow copying secret token", async () => {
    expect.assertions(1);

    await page.clickCopySecretTokenButton();

    expect(props.clipboardContext.copy).toHaveBeenCalledWith(
      page.scimSecretTokenInput.value,
      "The SCIM secret token has been copied to the clipboard.",
    );
  });

  it("should allow regenerating secret token", async () => {
    expect.assertions(3);

    const oldToken = page.scimSecretTokenInput.value;
    await page.clickRegenerateSecretTokenButton();

    expect(page.scimSecretTokenInput.value).not.toEqual(oldToken);
    expect(page.scimSecretTokenInput.value).toMatch(/^pb_[A-Za-z0-9]{43}$/);

    await page.clickSaveButton();
    expect(props.scimSettingsServiceWorkerService.updateSettings).toHaveBeenCalled();
  });

  it("should display the secret token expiry date field when SCIM is enabled", async () => {
    expect.assertions(1);

    expect(page.scimSecretTokenExpiryInput).not.toBeNull();
  });

  describe("Secret token expiry lifecycle", () => {
    it("should not show any expiry state when the token expiry is beyond the warning window", async () => {
      expect.assertions(5);

      props = defaultScimSettingsHealthyTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

      expect(page.errorBanner).toBeNull();
      expect(page.warning.textContent).toBe("");
      expect(page.isExpiryFieldInError).toBeFalsy();
      expect(page.isExpiryFieldInWarning).toBeFalsy();
      expect(page.expiryFieldWarningMessage).toBeNull();
    });

    it("should show the warning state when the token is expiring within the warning window", async () => {
      expect.assertions(4);

      props = defaultScimSettingsExpiringTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

      const formattedDate = DateTime.now().plus({ days: 14 }).toLocaleString(DateTime.DATE_FULL);
      expect(page.warning.textContent).toContain(
        `The SCIM secret token expires on ${formattedDate}. To avoid service disruption, generate a new token and save it in your identity provider settings before the expiration date.`,
      );
      expect(page.isExpiryFieldInWarning).toBeTruthy();
      expect(page.expiryFieldWarningMessage.textContent).toBe("This token is about to expire.");
      expect(page.errorBanner).toBeNull();
    });

    it("should show the error state when the token has expired", async () => {
      expect.assertions(3);

      props = defaultScimSettingsExpiredTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

      expect(page.errorBanner.textContent).toContain(
        "The SCIM secret token expired and user provisioning has stopped. To resume service, generate a new token and save it in your identity provider settings.",
      );
      expect(page.isExpiryFieldInError).toBeTruthy();
      // No field error message for the expired state (the banner conveys it).
      expect(page.expiryFieldErrorMessage).toBeNull();
    });
  });

  describe("Save SCIM settings", () => {
    it("should not save and show an error when the secret token has expired", async () => {
      expect.assertions(3);

      props = defaultScimSettingsExpiredTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

      await act(() => page.clickSaveButton());

      expect(props.scimSettingsServiceWorkerService.updateSettings).not.toHaveBeenCalled();
      expect(page.isExpiryFieldInError).toBeTruthy();
      expect(page.expiryFieldErrorMessage.textContent).toBe("This token has expired.");
    });

    it("should not save and show an error when the expiry is empty and the token has not been regenerated", async () => {
      expect.assertions(3);

      const updateSettings = jest.fn();
      props = defaultProps({
        scimSettingsServiceWorkerService: {
          // Legacy settings without an expiry date.
          findSettings: () => ({ ...defaultScimSettingsDto(), expired: null }),
          updateSettings,
        },
      });
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

      await act(() => page.clickSaveButton());

      expect(updateSettings).not.toHaveBeenCalled();
      expect(page.isExpiryFieldInError).toBeTruthy();
      expect(page.expiryFieldErrorMessage.textContent).toBe("Enter an expiry date, or regenerate the secret token.");
    });
  });

  describe("Regenerate secret token", () => {
    it("should set the expiry one year into the future when regenerating", async () => {
      expect.assertions(2);

      const oldToken = page.scimSecretTokenInput.value;
      await act(() => page.clickRegenerateSecretTokenButton());

      const expectedExpiry = DateTime.now().plus({ years: 1 }).toISODate();
      expect(page.scimSecretTokenInput.value).not.toEqual(oldToken);
      expect(page.scimSecretTokenExpiryInput.value).toBe(expectedExpiry);
    });

    it("should clear the warning state when regenerating an expiring token", async () => {
      expect.assertions(4);

      props = defaultScimSettingsExpiringTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));
      expect(page.isExpiryFieldInWarning).toBeTruthy();

      await act(() => page.clickRegenerateSecretTokenButton());

      expect(page.isExpiryFieldInWarning).toBeFalsy();
      expect(page.expiryFieldWarningMessage).toBeNull();
      expect(page.warning.textContent).not.toContain("The SCIM secret token expires on");
    });

    it("should clear the error state when regenerating an expired token", async () => {
      expect.assertions(4);

      props = defaultScimSettingsExpiredTokenProps();
      await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));
      expect(page.errorBanner).not.toBeNull();

      await act(() => page.clickRegenerateSecretTokenButton());

      expect(page.isExpiryFieldInError).toBeFalsy();
      expect(page.expiryFieldErrorMessage).toBeNull();
      expect(page.errorBanner).toBeNull();
    });
  });
});
