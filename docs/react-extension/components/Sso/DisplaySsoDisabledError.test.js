/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */
import {defaultProps} from "./DisplaySsoDisabledError.test.data";
import DisplaySsoDisabledErrorPage from "./DisplaySsoDisabledError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySsoDisabledError", () => {
  it('As a registered user I am informed that the SSO feature has been disabled', async() => {
    expect.assertions(5);
    const props = defaultProps();
    const page = new DisplaySsoDisabledErrorPage(props);

    expect(page.title).toBeTruthy();
    expect(page.title.textContent).toStrictEqual("SSO feature has been disabled");
    expect(page.message.textContent).toStrictEqual("For security reasons please check with your administrator that this is a change that they initiated.");
    await page.clickOnSignInWithPassphrase();

    expect(props.onSignInWithPassphraseClick).not.toHaveBeenCalled();

    await page.clickOnConfirmationCheckbox();
    await page.clickOnSignInWithPassphrase();

    expect(props.onSignInWithPassphraseClick).toHaveBeenCalledTimes(1);
  });
});

