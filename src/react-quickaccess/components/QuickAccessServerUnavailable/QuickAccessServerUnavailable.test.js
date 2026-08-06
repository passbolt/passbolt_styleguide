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
import {
  defaultProps,
  offlineModeAvailableProps,
  unauthenticatedProps,
} from "./QuickAccessServerUnavailable.test.data";
import QuickAccessServerUnavailablePage from "./QuickAccessServerUnavailable.test.page";
import { act } from "react";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
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

  it("As a signed-in user who cannot use the offline mode I see the sign out locally primary button", async () => {
    expect.assertions(4);
    const props = defaultProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.primaryButton).toBeTruthy();
    expect(page.primaryButton.textContent).toStrictEqual("Sign out locally");
    expect(page.primaryButton.getAttribute("class")).toStrictEqual("button primary big full-width");
    expect(page.signOutLocallyLink).toBeNull();
  });

  it("As a signed-in user who cannot use the offline mode when I click sign out locally I trigger a local logout and the quickaccess closes", async () => {
    expect.assertions(2);
    const props = defaultProps();
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    await page.clickPrimaryButton();

    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it("As a signed-in user who can use the offline mode I see the use offline mode primary button and the sign out locally link", async () => {
    expect.assertions(4);
    const props = offlineModeAvailableProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.primaryButton).toBeTruthy();
    expect(page.primaryButton.textContent).toStrictEqual("Use offline mode");
    expect(page.signOutLocallyLink).toBeTruthy();
    expect(page.signOutLocallyLink.textContent).toStrictEqual("Sign out locally");
  });

  it("As a signed-in user who can use the offline mode when I click use offline mode I am routed to the offline login page", async () => {
    expect.assertions(1);
    const props = offlineModeAvailableProps();
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    await page.clickPrimaryButton();

    expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login-offline");
  });

  it("As a signed-in user who can use the offline mode when I click the sign out locally link I trigger a local logout and the quickaccess closes", async () => {
    expect.assertions(2);
    const props = offlineModeAvailableProps();
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    await page.clickSignOutLocallyLink();

    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it("As a signed-out user I do not see any action", async () => {
    expect.assertions(3);
    const props = unauthenticatedProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.primaryButton).toBeNull();
    expect(page.signOutLocallyLink).toBeNull();
  });

  it("As a signed-out user who can use the offline mode I do not see any action, the triage route takes me to the offline login page", async () => {
    expect.assertions(2);
    const props = unauthenticatedProps({ context: offlineModeAvailableProps().context });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.primaryButton).toBeNull();
    expect(page.signOutLocallyLink).toBeNull();
  });

  it("As a signed-out user I still see the server unavailable message", async () => {
    expect.assertions(1);
    const props = unauthenticatedProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
  });
});
