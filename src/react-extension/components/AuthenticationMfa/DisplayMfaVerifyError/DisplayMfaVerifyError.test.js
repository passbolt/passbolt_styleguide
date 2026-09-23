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
 * @since         5.17.0
 */

/**
 * Unit tests on DisplayMfaVerifyError in regard of specifications
 */
import DisplayMfaVerifyErrorPage from "./DisplayMfaVerifyError.test.page";
import { apiErrorProps, browserErrorProps } from "./DisplayMfaVerifyError.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMfaVerifyError", () => {
  it("As a user I should see the error screen", () => {
    expect.assertions(2);
    const page = new DisplayMfaVerifyErrorPage(apiErrorProps());

    expect(page.title.textContent).toStrictEqual("Something went wrong!");
    expect(page.message.textContent).toStrictEqual("Please try again later or check the logs for more information.");
  });

  it("As a user I can see the logs of an API error", () => {
    expect.assertions(3);
    const page = new DisplayMfaVerifyErrorPage(apiErrorProps());
    expect(page.logs).toBeNull();

    page.toggleLogs();
    expect(JSON.parse(page.logs.value)).toStrictEqual({
      name: "PassboltApiFetchError",
      message: "The credential could not be verified.",
      data: { code: 401, body: null },
    });

    page.toggleLogs();
    expect(page.logs).toBeNull();
  });

  it("As a user I can see the logs of a browser error", () => {
    expect.assertions(1);
    const page = new DisplayMfaVerifyErrorPage(browserErrorProps());

    page.toggleLogs();

    expect(JSON.parse(page.logs.value)).toStrictEqual({
      name: "NotAllowedError",
      message: "The operation either timed out or was not allowed.",
    });
  });

  it("As a user I can try again", () => {
    expect.assertions(1);
    const props = apiErrorProps();
    const page = new DisplayMfaVerifyErrorPage(props);

    page.tryAgain();

    expect(props.apiMfaVerifyContext.onRetryRequested).toHaveBeenCalled();
  });

  it("As a user I should see the link to another provider inside the form actions", () => {
    expect.assertions(1);
    const page = new DisplayMfaVerifyErrorPage(apiErrorProps());

    expect(page.anotherProviderLink.getAttribute("href")).toStrictEqual(
      "https://localhost:6006/mfa/verify/totp?redirect=%2Fapp%2Fpasswords",
    );
  });
});
