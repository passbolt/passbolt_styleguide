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
 * @since         6.0.0
 */

/**
 * Unit tests on OfflineLoginPage in regard of specifications
 */
import { act } from "react";
import { defaultProps, propsWithMaxSessionDuration, propsWithoutOfflineSettings } from "./OfflineLoginPage.test.data";
import OfflineLoginPageTestPage from "./OfflineLoginPage.test.page";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("OfflineLoginPage", () => {
  it("As LU I see the offline login form with my username prefilled and read only", async () => {
    expect.assertions(3);
    const props = defaultProps();
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.usernameInput.value).toStrictEqual(props.context.userSettings.username);
    expect(page.usernameInput.disabled).toBeTruthy();
  });

  it("As LU the focus is set on the passphrase input", async () => {
    expect.assertions(1);
    const props = defaultProps();
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    expect(document.activeElement).toBe(page.passphraseInput);
  });

  it("As LU the session duration defaults to the shortest duration", async () => {
    expect.assertions(1);
    const props = defaultProps();
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    expect(page.selectedSessionDuration).toStrictEqual("5 minutes");
  });

  it("As LU I can only pick a session duration up to the maximum set by my administrator", async () => {
    expect.assertions(1);
    const props = propsWithMaxSessionDuration(3600);
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    // The selected duration (5 minutes) is not part of the remaining options, 1 day is above the maximum.
    expect(page.sessionDurationOptions).toEqual(["15 minutes", "1 hour"]);
  });

  it("As LU I can pick any session duration when my administrator allows the longest one", async () => {
    expect.assertions(1);
    const props = propsWithMaxSessionDuration(86400);
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    expect(page.sessionDurationOptions).toEqual(["15 minutes", "1 hour", "1 day"]);
  });

  it("As LU I can only pick the shortest session duration when the offline settings are not available", async () => {
    expect.assertions(2);
    const props = propsWithoutOfflineSettings();
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    expect(page.selectedSessionDuration).toStrictEqual("5 minutes");
    expect(page.sessionDurationOptions).toEqual([]);
  });

  it("As LU I can sign in offline with my passphrase and the default session duration", async () => {
    expect.assertions(4);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.resolve());
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    await page.fillPassphrase("ada@passbolt.com");
    await page.signIn();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.auth.login-offline", "ada@passbolt.com", 300);
    expect(props.context.loginOfflineSuccessCallBack).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/home");
    expect(page.passphraseInput.value).toStrictEqual("");
  });

  it("As LU I can sign in offline with the session duration I selected", async () => {
    expect.assertions(2);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.resolve());
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    await page.selectSessionDuration("1 hour");
    await page.fillPassphrase("ada@passbolt.com");
    await page.signIn();

    expect(page.selectedSessionDuration).toStrictEqual("1 hour");
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.auth.login-offline", "ada@passbolt.com", 3600);
  });

  it("As LU I see an error and stay on the page when my passphrase is invalid", async () => {
    expect.assertions(4);
    const props = defaultProps();
    const error = new Error("This is not a valid passphrase.");
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.reject(error));
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    await page.fillPassphrase("wrong-passphrase");
    await page.signIn();

    expect(page.errorMessage.textContent).toStrictEqual("This is not a valid passphrase.");
    expect(props.context.loginOfflineSuccessCallBack).not.toHaveBeenCalled();
    expect(props.history.push).not.toHaveBeenCalled();
    expect(page.signInButton.disabled).toBeFalsy();
  });

  it("As LU I can retry after a failed sign in", async () => {
    expect.assertions(2);
    const props = defaultProps();
    jest
      .spyOn(props.context.port, "request")
      .mockImplementationOnce(() => Promise.reject(new Error("This is not a valid passphrase.")))
      .mockImplementationOnce(() => Promise.resolve());
    let page;
    await act(async () => (page = new OfflineLoginPageTestPage(props)));

    await page.fillPassphrase("wrong-passphrase");
    await page.signIn();
    await page.fillPassphrase("ada@passbolt.com");
    await page.signIn();

    expect(page.errorMessage).toBeNull();
    expect(props.history.location.pathname).toStrictEqual("/webAccessibleResources/quickaccess/home");
  });
});
