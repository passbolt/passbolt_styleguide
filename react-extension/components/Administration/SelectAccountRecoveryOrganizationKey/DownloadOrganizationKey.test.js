/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

/**
 * Unit tests on ConfirmSaveAccountRecoverySettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import DownloadOrganizationKeyPage from "./DownloadOrganizationKey.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Confirm Organization Recovery Key download", () => {
  let page; // The page to test against

  it('As AD I can see a dialog to ensure that the private key has been downloaded', async() => {
    expect.assertions(6);
    page = new DownloadOrganizationKeyPage();
    await waitFor(() => { });
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    expect(page.title.textContent).toBe("Confirm Organization Recovery Key download");

    // Close button exists
    expect(page.closeButton).not.toBeNull();

    // Ok button exists
    expect(page.okButton).not.toBeNull();

    // Download again button exists
    expect(page.downloadAgainButton).not.toBeNull();

    // Description text exists
    expect(page.description.textContent.trim()).not.toBe("");
  });
});
