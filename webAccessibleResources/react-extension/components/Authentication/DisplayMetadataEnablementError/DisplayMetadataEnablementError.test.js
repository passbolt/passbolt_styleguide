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
import DisplayMetadataEnablementErrorPage from "./DisplayMetadataEnablementError.test.page";
import {defaultProps} from "./DisplayMetadataEnablementError.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMetadataEnablementError", () => {
  it('should display the given error', async() => {
    expect.assertions(5);

    const error = new Error("Something went wrong");
    error.details = "It really went wrong";
    const props = defaultProps({error});
    jest.spyOn(props.context.port, "request").mockImplementation(() => {});
    const page = new DisplayMetadataEnablementErrorPage(props);

    expect(page.errorDetails).toBeNull();
    expect(page.moreDetailsCta).not.toBeNull();
    await page.clickOn(page.moreDetailsCta);

    expect(page.errorDetails).not.toBeNull();
    expect(page.errorDetails.textContent).toStrictEqual(JSON.stringify(error.details));

    await page.clickOn(page.redirectButton);
    expect(props.onClickContinue).toHaveBeenCalledTimes(1);
  });

  it('should not display the error details if there are none', async() => {
    expect.assertions(2);
    const props = defaultProps();
    const page = new DisplayMetadataEnablementErrorPage(props);

    expect(page.errorDetails).toBeNull();
    expect(page.moreDetailsCta).toBeNull();
  });
});
