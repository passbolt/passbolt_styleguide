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
 * Unit tests on ActionAbortedMissingMetadataKeys in regard of specifications
 */
import ActionAbortedMissingMetadataKeysPage from "./ActionAbortedMissingMetadataKeys.test.page";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./ActionAbortedMissingMetadataKeys.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ActionAbortedMissingMetadataKeys", () => {
  it("As a signed in user I can close the dialog with the submit button", async() => {
    expect.assertions(4);
    const props = defaultProps();
    const page = new ActionAbortedMissingMetadataKeysPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.submitButton.textContent).toStrictEqual("Ok");
    expect(page.submitButton.getAttribute("class")).toStrictEqual("button primary form");

    await page.submit();

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('As a signed in user I can close a confirm metadata key', async() => {
    expect.assertions(2);
    const props = defaultProps();
    const page = new ActionAbortedMissingMetadataKeysPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    await page.close();

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
