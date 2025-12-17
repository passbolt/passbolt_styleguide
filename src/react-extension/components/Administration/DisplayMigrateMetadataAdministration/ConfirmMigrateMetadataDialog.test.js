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
 * @since         4.12.0
 */

/**
 * Unit tests on ConfirmMigrateMetadataDialog in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import { defaultProps } from "./ConfirmMigrateMetadataDialog.test.data";
import ConfirmMigrateMetadataDialogPage from "./ConfirmMigrateMetadataDialog.test.page";

describe("ConfirmMigrateMetadataDialog", () => {
  it("should display the dialog", async () => {
    expect.assertions(1);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMigrateMetadataDialogPage(props);

    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
  });

  it("should confirm the migration", async () => {
    expect.assertions(2);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMigrateMetadataDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.confirmButton);
    expect(props.confirm).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should cancel the migration", async () => {
    expect.assertions(2);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMigrateMetadataDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.cancelButton);
    expect(props.cancel).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should close the dialog", async () => {
    expect.assertions(2);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMigrateMetadataDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.closeButton);
    expect(props.cancel).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
