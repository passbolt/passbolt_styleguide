/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        5.13.0
 */
import { defaultProps, unauthenticatedProps } from "./QuickAccessServerUnavailable.test.data";
import QuickAccessServerUnavailablePage from "./QuickAccessServerUnavailable.test.page";
import { act } from "react";

beforeEach(() => {
  jest.resetModules();
});

describe("QuickAccessServerUnavailable", () => {
  it("As a user I see the server unavailable message", async () => {
    expect.assertions(2);
    const props = defaultProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
  });

  it("As a signed-in user I see the sign out locally primary button", async () => {
    expect.assertions(3);
    const props = defaultProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.signOutLocallyButton).toBeTruthy();
    expect(page.signOutLocallyButton.textContent).toStrictEqual("Sign out locally");
    expect(page.signOutLocallyButton.getAttribute("class")).toStrictEqual("button primary big full-width");
  });

  it("As a signed-in user when I click sign out locally I trigger a local logout", async () => {
    expect.assertions(3);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.resolve());
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    await page.clickSignOutLocally();

    expect(props.context.port.request).toHaveBeenCalledTimes(1);
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.auth.local-logout");
    expect(props.logoutSuccessCallback).toHaveBeenCalledTimes(1);
  });

  it("As a signed-out user I do not see the sign out locally button", async () => {
    expect.assertions(2);
    const props = unauthenticatedProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.signOutLocallyButton).toBeNull();
  });

  it("As a signed-out user I still see the server unavailable message", async () => {
    expect.assertions(1);
    const props = unauthenticatedProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
  });
});
