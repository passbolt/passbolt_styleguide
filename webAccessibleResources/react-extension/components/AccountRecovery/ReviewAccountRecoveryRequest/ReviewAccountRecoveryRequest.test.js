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
 * Unit tests on ReviewAccountRecoveryRequest in regard of specifications
 */
import ReviewAccountRecoveryRequestPage from "./ReviewAccountRecoveryRequest.test.page";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./ReviewAccountRecoveryRequest.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ReviewAccountRecoveryRequest", () => {
  const props = defaultProps();

  it('As AD I can approve an account recovery', async() => {
    const page = new ReviewAccountRecoveryRequestPage(props);
    await waitFor(() => { });

    await page.selectReview(page.acceptCheckbox);
    expect(page.acceptCheckbox.checked).toBeTruthy();
    expect(page.rejectCheckbox.checked).toBeFalsy();
    await page.submit();
    const status = 'approved';

    expect(props.onSubmit).toHaveBeenCalledWith(status);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('As AD I can reject an account recovery', async() => {
    const page = new ReviewAccountRecoveryRequestPage(props);
    await waitFor(() => { });

    expect(page.rejectCheckbox.checked).toBeTruthy();
    expect(page.acceptCheckbox.checked).toBeFalsy();
    await page.submit();
    const status = 'rejected';

    expect(props.onSubmit).toHaveBeenCalledWith(status);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('As AD I can cancel a review of an account recovery', async() => {
    const page = new ReviewAccountRecoveryRequestPage(props);
    await waitFor(() => { });

    expect(page.rejectCheckbox.checked).toBeTruthy();
    expect(page.acceptCheckbox.checked).toBeFalsy();
    await page.cancel();
    expect(props.onCancel).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('As AD I can close a review of an account recovery', async() => {
    const page = new ReviewAccountRecoveryRequestPage(props);
    await waitFor(() => { });

    expect(page.rejectCheckbox.checked).toBeTruthy();
    expect(page.acceptCheckbox.checked).toBeFalsy();
    await page.close();
    expect(props.onCancel).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
