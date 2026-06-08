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
 * @since         5.13.0
 */

import { waitFor } from "@testing-library/react";
import { defaultProps } from "./ConfirmDowngradeSubscriptionDialog.test.data";
import ConfirmDowngradeSubscriptionDialogPage from "./ConfirmDowngradeSubscriptionDialog.test.page";

describe("ConfirmDowngradeSubscriptionDialog", () => {
  let page, props;

  beforeEach(() => {
    props = defaultProps();
    page = new ConfirmDowngradeSubscriptionDialogPage(props);
  });

  it("As AD I should see the cancel and 'Downgrade and lose data' buttons", () => {
    expect.assertions(2);

    expect(page.cancelButton).toBeTruthy();
    expect(page.downgradeButton.textContent).toEqual("Downgrade and lose data");
  });

  it("As AD clicking Cancel should call onClose without calling onSubmit", async () => {
    expect.assertions(2);

    await page.clickCancel();

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it("As AD clicking Downgrade should call onSubmit", async () => {
    expect.assertions(2);

    await page.toggleConfirm();
    await page.clickDowngrade();

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("As AD while onSubmit is pending both buttons should be disabled", async () => {
    // We can't use expect.assertions(4) here as `waitFor` will retry an unknown number of times
    // `resolveSubmit` allows us to resolve the promise later
    let resolveSubmit;
    props.onSubmit = jest.fn().mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = resolve;
      }),
    );

    page = new ConfirmDowngradeSubscriptionDialogPage(props);
    await page.toggleConfirm();
    await page.clickDowngrade();
    await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(true));

    expect(page.cancelButton.hasAttribute("disabled")).toBe(true);
    expect(page.downgradeButton.hasAttribute("disabled")).toBe(true);

    resolveSubmit();

    await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(false));
  });

  it("As AD after onSubmit resolves the buttons should be re-enabled", async () => {
    expect.assertions(2);

    await page.toggleConfirm();
    await page.clickDowngrade();

    expect(page.cancelButton.hasAttribute("disabled")).toBe(false);
    expect(page.downgradeButton.hasAttribute("disabled")).toBe(false);
  });

  it("As AD the confirm checkbox should render unchecked with the acknowledgement label", () => {
    expect.assertions(2);

    expect(page.confirmCheckbox.checked).toBe(false);
    expect(page._page.container.textContent).toMatch(/I confirm I want to downgrade and accept the data loss\./);
  });

  it("As AD the downgrade button should be disabled while the checkbox is unchecked", () => {
    expect.assertions(2);

    expect(page.downgradeButton.hasAttribute("disabled")).toBe(true);
    expect(page.cancelButton.hasAttribute("disabled")).toBe(false);
  });

  it("As AD ticking the checkbox should enable the downgrade button", async () => {
    expect.assertions(1);

    await page.toggleConfirm();

    expect(page.downgradeButton.hasAttribute("disabled")).toBe(false);
  });
});
