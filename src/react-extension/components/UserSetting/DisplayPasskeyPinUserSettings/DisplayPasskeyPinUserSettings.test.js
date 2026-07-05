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
 * @since         5.14.0
 */

import { waitFor } from "@testing-library/react";
import { defaultProps } from "./DisplayPasskeyPinUserSettings.test.data";
import DisplayPasskeyPinUserSettingsPage from "./DisplayPasskeyPinUserSettings.test.page";

const waitUntil = (predicate) =>
  waitFor(() => {
    if (!predicate()) {
      throw new Error("condition not met yet");
    }
  });

describe("DisplayPasskeyPinUserSettings", () => {
  it("As a user I can see the passkey PIN screen", () => {
    expect.assertions(1);
    const page = new DisplayPasskeyPinUserSettingsPage(defaultProps());

    expect(page.title.textContent).toEqual("Passkey PIN");
  });

  it("As a user I am warned when the PIN is not 4 to 12 digits", async () => {
    expect.assertions(1);
    const page = new DisplayPasskeyPinUserSettingsPage(defaultProps());
    await waitUntil(() => !page.saveButton.disabled);

    await page.fill("pin", "12");
    await page.clickSave();

    expect(page.errorMessage.textContent).toEqual("The PIN must be 4 to 12 digits.");
  });

  it("As a user I am warned when the two PINs do not match", async () => {
    expect.assertions(1);
    const page = new DisplayPasskeyPinUserSettingsPage(defaultProps());
    await waitUntil(() => !page.saveButton.disabled);

    await page.fill("pin", "123456");
    await page.fill("confirm", "654321");
    await page.clickSave();

    expect(page.errorMessage.textContent).toEqual("The two PINs do not match.");
  });

  it("As a user I can save a valid matching PIN", async () => {
    expect.assertions(2);
    const props = defaultProps();
    const page = new DisplayPasskeyPinUserSettingsPage(props);
    await waitUntil(() => !page.saveButton.disabled);

    await page.fill("pin", "123456");
    await page.fill("confirm", "123456");
    await page.clickSave();
    await waitUntil(() => page.successMessage !== null);

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.fido2-pin.set", "123456");
    expect(page.successMessage).not.toBeNull();
  });

  it("As a user with a PIN set I can remove it", async () => {
    expect.assertions(1);
    const props = defaultProps({ pinSet: true });
    const page = new DisplayPasskeyPinUserSettingsPage(props);
    await waitUntil(() => page.removeButton !== undefined);

    await page.clickRemove();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.fido2-pin.clear");
  });
});
