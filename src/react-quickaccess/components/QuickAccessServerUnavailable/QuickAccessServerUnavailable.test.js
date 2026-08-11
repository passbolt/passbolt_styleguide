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
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import CanUse from "../../../shared/services/rbacs/canUseService";
import { actions } from "../../../shared/services/rbacs/actionEnumeration";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("QuickAccessServerUnavailable", () => {
  it("As a user I see the only server unavailable message if offline plugin is disabled", async () => {
    expect.assertions(3);
    const props = defaultProps();
    jest.spyOn(props.context.siteSettings, "canIUse").mockImplementationOnce(() => false);
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });

  it("As a user I see the only server unavailable message if site settings is null", async () => {
    expect.assertions(3);
    const props = defaultProps({ context: defaultAppContext({ siteSettings: null }) });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });

  it("As a user I see the only server unavailable message if logged in user is empty", async () => {
    expect.assertions(3);
    const props = defaultProps({ context: defaultAppContext({ loggedInUser: null }) });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });

  it("As a user I see the only server unavailable message if RBAC offline permission is denied", async () => {
    expect.assertions(4);
    const props = defaultProps();
    jest.spyOn(CanUse, "canRoleUseAction").mockImplementationOnce(() => false);
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(CanUse.canRoleUseAction).toHaveBeenNthCalledWith(
      1,
      props.context.loggedInUser,
      props.context.rbacs,
      actions.OFFLINE_ITEMS_VIEW,
    );
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });

  it("As a user I see the only server unavailable message if offlineSettings is null", async () => {
    expect.assertions(3);
    const props = defaultProps({ offlineSettings: null });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });

  it("As a signed-in user who can use the offline mode I see the use offline mode primary button", async () => {
    expect.assertions(2);
    const props = defaultProps();
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.primaryButton).toBeTruthy();
    expect(page.primaryButton.textContent).toStrictEqual("Use offline mode");
  });

  it("As a signed-in user who can use the offline mode when I click use offline mode I am routed to the offline login page", async () => {
    expect.assertions(1);
    const props = defaultProps();
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    await page.clickPrimaryButton();

    expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login-offline");
  });

  it("As a signed-out user I do not see any action", async () => {
    expect.assertions(2);
    const props = unauthenticatedProps({ offlineSettings: null });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.primaryButton).toBeNull();
  });

  it("As a signed-out user I still see the server unavailable message", async () => {
    expect.assertions(2);
    const props = unauthenticatedProps({ offlineSettings: null });
    let page;
    await act(async () => (page = new QuickAccessServerUnavailablePage(props)));

    expect(page.message.textContent).toStrictEqual("Unable to reach the server, you are not connected to the network.");
    expect(page.primaryButton).toBeNull();
  });
});
