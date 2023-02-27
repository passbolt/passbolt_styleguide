/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import ApiErrorPage from "./ApiError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("ApiError", () => {
  it('Should display the given error log message from the content of the page', async() => {
    expect.assertions(6);
    const props = {
      message: "This is an error message to be displayed in the log details"
    };
    const page = new ApiErrorPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.logToggle).toBeTruthy();
    expect(page.logDetails).toBeFalsy();

    await page.clickOnLogToggle();

    expect(page.logDetails).toBeTruthy();
    expect(page.logDetails.value).toStrictEqual(props.message);

    await page.clickOnLogToggle();

    expect(page.logDetails).toBeFalsy();
  });
});
