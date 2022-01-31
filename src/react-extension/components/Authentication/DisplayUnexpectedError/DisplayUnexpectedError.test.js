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
import {defaultProps} from "./DisplayUnexpectedError.test.data";
import DisplayUnexpectedErrorTestPage from "./DisplayUnexpectedError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayUnexpectedError", () => {
  let page, props;

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new DisplayUnexpectedErrorTestPage(props);
  });

  it('As AN I should be able to try again', async() => {
    expect.assertions(1);
    Object.defineProperty(window, "location", {
      value: {reload: jest.fn()},
    });
    await page.tryAgain();
    expect(window.location.reload).toHaveBeenCalled();
  });
});

