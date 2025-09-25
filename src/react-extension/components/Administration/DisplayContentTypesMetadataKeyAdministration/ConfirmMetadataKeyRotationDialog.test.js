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
 * @since         5.6.0
 */

/**
 * Unit tests on ConfirmMetadataKeyRotationDialog in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./ConfirmMetadataKeyRotationDialog.test.data";
import ConfirmMetadataKeyRotationDialogPage from "./ConfirmMetadataKeyRotationDialog.test.page";

describe("ConfirmMetadataKeyRotationDialog", () => {
  it('should display the dialog', async() => {
    expect.assertions(1);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMetadataKeyRotationDialogPage(props);

    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
  });

  it('should confirm the rotation', async() => {
    expect.assertions(2);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMetadataKeyRotationDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.confirmButton);
    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should cancel the rotation', async() => {
    expect.assertions(1);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMetadataKeyRotationDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.cancelButton);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog', async() => {
    expect.assertions(1);
    const props = defaultProps(); // The props to pass
    const page = new ConfirmMetadataKeyRotationDialogPage(props);

    await waitFor(() => {});

    await page.clickOn(page.closeButton);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
