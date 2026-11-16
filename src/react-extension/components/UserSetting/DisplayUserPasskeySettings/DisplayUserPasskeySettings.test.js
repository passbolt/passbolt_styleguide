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
 * @since         5.18.0
 */
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import DisplayUserPasskeySettingsPage from "./DisplayUserPasskeySettings.test.page";
import { defaultProps } from "./DisplayUserPasskeySettings.test.data";

describe("DisplayUserPasskeySettings", () => {
  it.each([
    ["the saved strict preference", { value: "strict" }, true],
    ["the saved non strict preference", { value: "non_strict" }, false],
    ["strict when the user has not chosen yet", null, true],
  ])("selects %s", async (_, preferenceDto, isStrict) => {
    expect.assertions(1);
    const props = defaultProps();
    props.context.port.addRequestListener("passbolt.passkey.get-verification-preference", () => preferenceDto);
    const page = new DisplayUserPasskeySettingsPage(props);

    await page.waitForLoaded();
    expect(page.strictOption.checked).toBe(isStrict);
  });

  it("shows the error and lets the user save when loading the preference fails", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const error = new Error("Could not load the preference.");
    props.context.port.addRequestListener("passbolt.passkey.get-verification-preference", () => {
      throw error;
    });
    const page = new DisplayUserPasskeySettingsPage(props);

    await page.waitForLoaded();

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error });
    expect(page.strictOption.checked).toBe(true);
    expect(page.strictOption.disabled).toBe(false);
  });

  it("saves the selected preference", async () => {
    expect.assertions(2);
    const props = defaultProps();
    props.context.port.addRequestListener("passbolt.passkey.get-verification-preference", () => ({ value: "strict" }));
    props.context.port.addRequestListener("passbolt.passkey.update-verification-preference", (dto) => dto);
    jest.spyOn(props.context.port, "request");
    const page = new DisplayUserPasskeySettingsPage(props);
    await page.waitForLoaded();

    await page.selectNonStrict();
    await page.save();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.passkey.update-verification-preference", {
      value: "non_strict",
    });
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
      "The passkey setting has been updated successfully",
    );
  });

  it("shows the error when saving fails", async () => {
    expect.assertions(1);
    const props = defaultProps();
    const error = new PassboltApiFetchError("This is not a valid passkey verification.");
    props.context.port.addRequestListener("passbolt.passkey.get-verification-preference", () => null);
    props.context.port.addRequestListener("passbolt.passkey.update-verification-preference", () => {
      throw error;
    });
    const page = new DisplayUserPasskeySettingsPage(props);
    await page.waitForLoaded();

    await page.save();

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error });
  });
});
