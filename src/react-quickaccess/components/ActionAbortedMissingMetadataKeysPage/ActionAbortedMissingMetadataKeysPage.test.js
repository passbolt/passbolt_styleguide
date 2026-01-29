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
 * @since         5.4.0
 */

/**
 * Unit tests on ActionAbortedMissingMetadataKeysPage in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import { defaultProps } from "./ActionAbortedMissingMetadataKeysPage.test.data";
import ActionAbortedMissingMetadataKeysPagePage from "./ActionAbortedMissingMetadataKeysPage.test.page";
import expect from "expect";

beforeEach(() => {
  jest.resetModules();
});

describe("ActionAbortedMissingMetadataKeysPage", () => {
  it("As a signed in user I can close the page with the submit button", async () => {
    expect.assertions(5);
    const props = defaultProps();
    jest.spyOn(props.history, "goBack");
    const page = new ActionAbortedMissingMetadataKeysPagePage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.submitButton.textContent).toStrictEqual("Ok");
    expect(page.submitButton.getAttribute("class")).toStrictEqual("button primary full-width");

    await page.submit();

    expect(props.history.goBack).toHaveBeenCalledTimes(1);
    expect(props.history.location.pathname).toStrictEqual("/home");
  });

  it("As a signed in user I can close an action aborted missing metadata keys page", async () => {
    expect.assertions(3);
    const props = defaultProps();
    jest.spyOn(props.history, "goBack");
    const page = new ActionAbortedMissingMetadataKeysPagePage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    await page.close();

    expect(props.history.goBack).toHaveBeenCalledTimes(1);
    expect(props.history.location.pathname).toStrictEqual("/home");
  });

  it("As a signed in user I can cancel with the keyboard (escape)", async () => {
    expect.assertions(3);
    const props = defaultProps();
    jest.spyOn(props.history, "goBack");
    const page = new ActionAbortedMissingMetadataKeysPagePage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    await page.escapeKey();

    expect(props.history.goBack).toHaveBeenCalledTimes(1);
    expect(props.history.location.pathname).toStrictEqual("/home");
  });
});
