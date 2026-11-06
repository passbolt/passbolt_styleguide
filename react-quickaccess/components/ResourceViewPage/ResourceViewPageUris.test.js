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

import ResourceViewPageUrisPage from "./ResourceViewPageUris.test.page";
import { defaultProps, multipleUrisProps, noUriProps, unsafeUriProps } from "./ResourceViewPageUris.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPageUris", () => {
  it("As LU, I should see a safe URI as a link and open it with the action", async () => {
    expect.assertions(7);
    const props = defaultProps();
    const page = new ResourceViewPageUrisPage(props);

    expect(page.rows.length).toStrictEqual(1);
    expect(page.uriLabel.textContent).toStrictEqual("URI");
    expect(page.uriLink.textContent).toStrictEqual("https://passbolt.com");
    expect(page.uriLink.getAttribute("href")).toStrictEqual("https://passbolt.com/");
    expect(page.uriAction.classList.contains("disabled")).toBeFalsy();

    await page.click(page.uriAction);
    expect(props.onGoToUrl).toHaveBeenCalledTimes(1);
    expect(props.onGoToUrl.mock.calls[0][0].isDefaultPrevented()).toBeFalsy();
  });

  it("As LU, I should see an unsafe URI as text and its action disabled and prevented", async () => {
    expect.assertions(5);
    const props = unsafeUriProps();
    const page = new ResourceViewPageUrisPage(props);

    expect(page.uriLink).toBeNull();
    expect(page.uriText.textContent).toStrictEqual("javascript:alert(1)");
    expect(page.uriAction.getAttribute("href")).toStrictEqual("#");
    expect(page.uriAction.classList.contains("disabled")).toBeTruthy();

    await page.click(page.uriAction);
    expect(props.onGoToUrl.mock.calls[0][0].isDefaultPrevented()).toBeTruthy();
  });

  it("As LU, I should be told when the resource has no URI", () => {
    expect.assertions(3);
    const page = new ResourceViewPageUrisPage(noUriProps());

    expect(page.uriLink).toBeNull();
    expect(page.uriText.textContent).toStrictEqual("no url provided");
    expect(page.uriAction.classList.contains("disabled")).toBeTruthy();
  });

  it("As LU, I should see no additional URIs section with a single URI", () => {
    expect.assertions(1);
    const page = new ResourceViewPageUrisPage(defaultProps());

    expect(page.accordion).toBeNull();
  });

  it("As LU, I should open and close the additional URIs, safe ones as links and unsafe ones as text", async () => {
    expect.assertions(9);
    const page = new ResourceViewPageUrisPage(multipleUrisProps());

    expect(page.rows.length).toStrictEqual(2);
    expect(page.caret).toStrictEqual("right");
    expect(page.listUris.length).toStrictEqual(0);

    await page.click(page.additionalUrisButton);
    expect(page.caret).toStrictEqual("down");
    expect(page.listUris.length).toStrictEqual(3);
    expect(page.listUris[0].tagName).toStrictEqual("A");
    expect(page.listUris[0].querySelector(".ellipsis").textContent).toStrictEqual("https://community.passbolt.com");
    expect(page.listUris[2].tagName).toStrictEqual("SPAN");

    await page.click(page.additionalUrisButton);
    expect(page.listUris.length).toStrictEqual(0);
  });
});
