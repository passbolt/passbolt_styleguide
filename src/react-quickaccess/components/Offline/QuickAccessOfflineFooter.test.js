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
import {
  offlineSessionLoggedOutServerReachableProps,
  offlineSessionServerReachableProps,
  offlineSessionServerUnreachableProps,
  offlineSessionServerUnreachableWithoutLastSyncProps,
  onlineSessionServerReachableProps,
  onlineSessionServerUnreachableProps,
} from "./QuickAccessOfflineFooter.test.data";
import QuickAccessOfflineFooterPage from "./QuickAccessOfflineFooter.test.page";
import { act } from "react";
import { formatDateTimeAgo } from "../../../shared/utils/dateUtils";
import { createMemoryHistory } from "history";

beforeEach(() => {
  jest.resetModules();
});

describe("QuickAccessOfflineFooter", () => {
  it("does not render on the server-unavailable screen (online session, server unreachable)", async () => {
    expect.assertions(1);
    const props = onlineSessionServerUnreachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeFalsy();
  });

  it("does not render for an online session while the server is reachable", async () => {
    expect.assertions(1);
    const props = onlineSessionServerReachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeFalsy();
  });

  it("does not render for a logged-out offline session with a reachable server (after going back online)", async () => {
    expect.assertions(1);
    const props = offlineSessionLoggedOutServerReachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeFalsy();
  });

  it("render when the user is offline and authenticated", async () => {
    expect.assertions(1);
    const props = offlineSessionServerUnreachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeTruthy();
  });

  it("render when the location is offline login page", async () => {
    expect.assertions(1);
    const props = offlineSessionLoggedOutServerReachableProps({
      history: createMemoryHistory({ initialEntries: ["/webAccessibleResources/quickaccess/login-offline"] }),
    });
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeTruthy();
  });

  it("renders 'service available' and the go back online link in an offline session with a reachable server", async () => {
    expect.assertions(5);
    const props = offlineSessionServerReachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.exists()).toBeTruthy();
    expect(page.isServerAvailable).toBeTruthy();
    expect(page.serverStatus.textContent).toStrictEqual("service available");
    expect(page.goOnlineLink).toBeTruthy();
    expect(page.lastSyncLabel).toBeNull();
  });

  it("renders 'service unavailable' and the last sync value in an offline session while the server is unreachable", async () => {
    expect.assertions(5);
    const props = offlineSessionServerUnreachableProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    const expectedLastSync = formatDateTimeAgo(props.activeSession.lastSeenOnline, (key) => key, props.context.locale);
    expect(page.exists()).toBeTruthy();
    expect(page.isServerUnavailable).toBeTruthy();
    expect(page.serverStatus.textContent).toStrictEqual("service unavailable");
    expect(page.lastSyncLabel.textContent).toStrictEqual(`Last sync: ${expectedLastSync}`);
    expect(page.goOnlineLink).toBeNull();
  });

  it("renders 'Last sync: Not available' when no last-seen-online date is available", async () => {
    expect.assertions(1);
    const props = offlineSessionServerUnreachableWithoutLastSyncProps();
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    expect(page.lastSyncLabel.textContent).toStrictEqual("Last sync: Not available");
  });

  it("when I click go back online it triggers a local logout and routes to the online login page", async () => {
    expect.assertions(2);
    const props = offlineSessionServerReachableProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.resolve());
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new QuickAccessOfflineFooterPage(props)));

    await page.clickGoOnline();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.auth.local-logout");
    expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login");
  });
});
