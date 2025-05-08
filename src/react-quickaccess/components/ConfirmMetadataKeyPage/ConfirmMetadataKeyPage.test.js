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
 * @since         5.1.0
 */

/**
 * Unit tests on ConfirmMetadataKey in regard of specifications
 */
import ConfirmMetadataKeyPage from "./ConfirmMetadataKeyPage.test.page";
import {waitFor} from "@testing-library/react";
import {defaultProps, defaultPropsWithRollback} from "./ConfirmMetadataKeyPage.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ConfirmMetadataKey", () => {
  it('As a signed in user I can confirm a metadata key more recent', async() => {
    expect.assertions(6);
    const props = defaultProps();
    jest.spyOn(props.context.port, "emit");
    const page = new ConfirmMetadataKeyPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.submitButton.textContent).toStrictEqual("Trust the key");
    expect(page.submitButton.getAttribute("class")).toStrictEqual("button primary full-width  warning");

    await page.openMoreInformation();
    await page.submit();

    expect(page.fingerprint.textContent).toStrictEqual(props.metadataKey.fingerprint.replace(/.{4}/g, '$& '));
    expect(props.context.port.emit).toHaveBeenCalledWith(props.requestId, "SUCCESS", true);
    expect(props.onComplete).toHaveBeenCalled();
  });

  it('As a signed in user I can confirm a metadata key older', async() => {
    expect.assertions(6);
    const props = defaultPropsWithRollback();
    jest.spyOn(props.context.port, "emit");
    const page = new ConfirmMetadataKeyPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.submitButton.textContent).toStrictEqual("Trust the key");
    expect(page.submitButton.getAttribute("class")).toStrictEqual("button primary full-width  warning");

    await page.openMoreInformation();
    await page.submit();

    expect(page.fingerprint.textContent).toStrictEqual(props.metadataKey.fingerprint.replace(/.{4}/g, '$& '));
    expect(props.context.port.emit).toHaveBeenCalledWith(props.requestId, "SUCCESS", true);
    expect(props.onComplete).toHaveBeenCalled();
  });

  it('As a signed in user I can close a confirm metadata key', async() => {
    expect.assertions(3);
    const props = defaultProps();
    jest.spyOn(props.context.port, "emit");
    const page = new ConfirmMetadataKeyPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    await page.close();

    expect(props.context.port.emit).toHaveBeenCalledWith(props.requestId, "SUCCESS", false);
    expect(props.onComplete).toHaveBeenCalled();
  });
});
