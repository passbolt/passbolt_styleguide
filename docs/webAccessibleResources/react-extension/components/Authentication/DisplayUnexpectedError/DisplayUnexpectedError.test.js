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
import {defaultProps, passboltApiFetchErrorProps} from "./DisplayUnexpectedError.test.data";
import DisplayUnexpectedErrorTestPage from "./DisplayUnexpectedError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayUnexpectedError", () => {
  it('As AN I should be able to try again', async() => {
    const props = defaultProps();
    const page = new DisplayUnexpectedErrorTestPage(props);

    expect.assertions(2);
    Object.defineProperty(window, "location", {
      value: {reload: jest.fn()},
    });
    expect(page.moreDetailsCta).toBeNull();
    await page.tryAgain();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('As a user I should see error details if the error carry some', async() => {
    const props = passboltApiFetchErrorProps();
    const page = new DisplayUnexpectedErrorTestPage(props);

    expect.assertions(3);
    expect(page.moreDetailsCta).toBeTruthy();
    await page.showErrorDetails();
    expect(page.moreDetailsCta).toBeTruthy();
    expect(page.errorDetails.value).toEqual(JSON.stringify(props.error.data, null, 4));
  });
});

