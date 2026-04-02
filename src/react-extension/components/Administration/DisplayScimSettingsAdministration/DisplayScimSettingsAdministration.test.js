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
} from "./DisplayScimSettingsAdministration.test.data";
import DisplayScimSettingsAdministrationPage from "./DisplayScimSettingsAdministration.test.page";
import { waitFor } from "@testing-library/dom";
import { act } from "react";

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

  it("should display a warning when the secret token is expired", async () => {
    expect.assertions(1);

    props = defaultScimSettingsExpiredTokenProps();
    await act(() => (page = new DisplayScimSettingsAdministrationPage(props)));

    expect(page.warning.textContent).toContain("The secret token is expired, you are requested to rotate it.");
  });

  it("should not display expiry warnings when the expiry date is in the future", async () => {
    expect.assertions(1);

    expect(page.warning.textContent).not.toContain("The secret token is expired");
  });
});
