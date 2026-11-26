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
import PasskeyVerificationPreferencePagePage from "./PasskeyVerificationPreferencePage.test.page";
import { defaultProps } from "./PasskeyVerificationPreferencePage.test.data";

describe("PasskeyVerificationPreferencePage", () => {
  it("shows the site and preselects strict verification", () => {
    expect.assertions(5);
    const page = new PasskeyVerificationPreferencePagePage(defaultProps());

    expect(page.title.textContent).toStrictEqual("Choose how to verify passkeys");
    expect(page.rpId.textContent).toStrictEqual("github.com");
    expect(page.strictOption.checked).toBe(true);
    expect(page.nonStrictOption.checked).toBe(false);
    expect(page.submitButton.textContent).toStrictEqual("Save and continue");
  });

  it("focuses the selected option, so that Escape reaches the page", () => {
    expect.assertions(1);
    const page = new PasskeyVerificationPreferencePagePage(defaultProps());
    expect(page.strictOption).toBe(document.activeElement);
  });

  it("answers only once when the user submits twice", async () => {
    expect.assertions(2);
    const props = defaultProps();
    jest.spyOn(props.context.port, "emit");
    const page = new PasskeyVerificationPreferencePagePage(props);

    await page.submit();
    await page.submit();

    expect(props.context.port.emit).toHaveBeenCalledTimes(1);
    expect(page.submitButton.disabled).toBe(true);
  });

  it.each([
    ["the preselected strict", false, "strict"],
    ["the non strict", true, "non_strict"],
  ])("answers %s preference", async (_, selectNonStrict, expected) => {
    expect.assertions(2);
    const props = defaultProps();
    jest.spyOn(props.context.port, "emit");
    const page = new PasskeyVerificationPreferencePagePage(props);

    if (selectNonStrict) {
      await page.selectNonStrict();
    }
    await page.submit();

    expect(props.context.port.emit).toHaveBeenCalledWith(props.requestId, "SUCCESS", expected);
    expect(props.onComplete).toHaveBeenCalled();
  });

  it.each([
    ["the close button", "close"],
    ["the escape key", "pressEscape"],
  ])("aborts the request when the user closes the page with %s", async (_, action) => {
    expect.assertions(2);
    const props = defaultProps();
    jest.spyOn(props.context.port, "emit");
    const page = new PasskeyVerificationPreferencePagePage(props);

    await page[action]();

    expect(props.context.port.emit).toHaveBeenCalledWith(props.requestId, "ERROR", {
      name: "UserAbortsOperationError",
      message: "The dialog has been closed.",
    });
    expect(props.onComplete).toHaveBeenCalled();
  });
});
