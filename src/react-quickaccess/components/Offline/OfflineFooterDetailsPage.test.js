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
import { act } from "react";
import {
  offlineModeDetailsExpiredProps,
  offlineModeDetailsProps,
  offlineModeDetailsServerReachableProps,
  offlineModeDetailsWithoutDataProps,
} from "./OfflineFooterDetailsPage.test.data";
import OfflineFooterDetailsPageTestPage from "./OfflineFooterDetailsPage.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("OfflineFooterDetailsPage", () => {
  it("renders the offline mode header with a back button", async () => {
    expect.assertions(2);
    const props = offlineModeDetailsProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.title.textContent).toStrictEqual("Offline mode");
    expect(page.backButton).not.toBeNull();
  });

  it("when I click the back button it goes back to the previous screen", async () => {
    expect.assertions(1);
    const props = offlineModeDetailsProps();
    jest.spyOn(props.history, "goBack");
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    await page.clickBack();

    expect(props.history.goBack).toHaveBeenCalled();
  });

  it("renders the last sync, the session duration and the data retention left", async () => {
    expect.assertions(6);
    const props = offlineModeDetailsProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.propertyName("last-sync").textContent).toStrictEqual("Last sync");
    expect(page.propertyValue("last-sync").textContent).toStrictEqual("1 hour ago");
    expect(page.propertyName("session-duration").textContent).toStrictEqual("Session duration");
    // The session was signed in a minute ago and the organisation session duration is 1 hour.
    expect(page.propertyValue("session-duration").textContent).toStrictEqual("58 minutes remaining");
    expect(page.propertyName("data-retention").textContent).toStrictEqual("Data retention");
    // The data was last synchronised an hour ago and the organisation retention period is 1 day.
    expect(page.propertyValue("data-retention").textContent).toStrictEqual("22 hours remaining");
  });

  it("renders the durations as expired once the session duration and the retention period ran out", async () => {
    expect.assertions(2);
    const props = offlineModeDetailsExpiredProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.propertyValue("session-duration").textContent).toStrictEqual("Expired");
    expect(page.propertyValue("data-retention").textContent).toStrictEqual("Expired");
  });

  it("renders the durations as not available without dates nor offline settings to count them from", async () => {
    expect.assertions(3);
    const props = offlineModeDetailsWithoutDataProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.propertyValue("last-sync").textContent).toStrictEqual("Not available");
    expect(page.propertyValue("session-duration").textContent).toStrictEqual("Not available");
    expect(page.propertyValue("data-retention").textContent).toStrictEqual("Not available");
  });

  it("does not offer to switch to online mode while the server is unreachable", async () => {
    expect.assertions(1);
    const props = offlineModeDetailsProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.goOnlineButton).toBeNull();
  });

  it("offers to switch to online mode once the server is reachable again", async () => {
    expect.assertions(1);
    const props = offlineModeDetailsServerReachableProps();
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    expect(page.goOnlineButton.textContent).toStrictEqual("Switch to online mode");
  });

  it("when I click switch to online mode it triggers a local logout and routes to the online login page", async () => {
    expect.assertions(2);
    const props = offlineModeDetailsServerReachableProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.resolve());
    jest.spyOn(props.history, "push");
    let page;
    await act(async () => (page = new OfflineFooterDetailsPageTestPage(props)));

    await page.clickGoOnline();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.auth.offline-logout");
    expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login");
  });
});
