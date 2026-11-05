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

import InsertAppIframePage from "./InsertAppIframe.test.page";
import { defaultProps } from "./InsertAppIframe.test.data";
import { waitForTrue } from "../../../test/utils/waitFor";

const APP_IFRAME_URL = "chrome-extension://extension-id/webAccessibleResources/passbolt-iframe-app.html";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("InsertAppIframe", () => {
  let props;

  beforeEach(() => {
    props = defaultProps();
    props.port.addRequestListener("passbolt.port.generate-id", jest.fn().mockReturnValue("port-id"));
  });

  it("should render the app iframe", async () => {
    expect.assertions(2);

    const page = new InsertAppIframePage(props, "/");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.exists()).toBe(true);
    expect(page.iframe.getAttribute("allow")).toBe(`clipboard-write ${APP_IFRAME_URL}`);
  });

  it("should request a port id for the app", async () => {
    expect.assertions(1);

    const requestMock = jest.fn().mockReturnValue("port-id");
    props.port.addRequestListener("passbolt.port.generate-id", requestMock);

    const page = new InsertAppIframePage(props, "/");
    await waitForTrue(() => page.isIframeLoaded);

    expect(requestMock).toHaveBeenCalledWith("App", undefined);
  });

  it("should load the app iframe with the port id only on the root location", async () => {
    expect.assertions(1);

    const page = new InsertAppIframePage(props, "/");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.iframeUrl.toString()).toBe(`${APP_IFRAME_URL}?passbolt=port-id`);
  });

  it("should forward a valid pathname to the app iframe", async () => {
    expect.assertions(1);

    const page = new InsertAppIframePage(props, "/app/users");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.iframeUrl.searchParams.get("pathname")).toBe("/app/users");
  });

  it("should not forward an invalid pathname to the app iframe", async () => {
    expect.assertions(1);

    const page = new InsertAppIframePage(props, "/app/users_list");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.iframeUrl.searchParams.has("pathname")).toBe(false);
  });

  it("should forward a valid error code to the app iframe", async () => {
    expect.assertions(1);

    const page = new InsertAppIframePage(props, "/?error=code");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.iframeUrl.searchParams.get("error")).toBe("code");
  });

  it("should forward both the pathname and the error code to the app iframe", async () => {
    expect.assertions(1);

    const page = new InsertAppIframePage(props, "/app/users?error=code");
    await waitForTrue(() => page.isIframeLoaded);

    expect(page.iframeUrl.toString()).toBe(`${APP_IFRAME_URL}?passbolt=port-id&pathname=%2Fapp%2Fusers&error=code`);
  });

  it.each([{ search: "?error=abc123" }, { search: "?error=abc%3Cscript%3E" }, { search: "?error=" }])(
    "should not forward the invalid error code $search to the app iframe",
    async (testCase) => {
      expect.assertions(1);

      const page = new InsertAppIframePage(props, `/${testCase.search}`);
      await waitForTrue(() => page.isIframeLoaded);

      expect(page.iframeUrl.searchParams.has("error")).toBe(false);
    },
  );
});
