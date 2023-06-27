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
import {defaultProps} from "./DisplaySsoProviderMismatchError.test.data";
import DisplaySsoProviderMismatchErrorPage from "./DisplaySsoProviderMismatchError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySsoDisabledError", () => {
  it('As a registered user I am informed that the SSO provider has changed', async() => {
    expect.assertions(5);
    const props = defaultProps();
    const page = new DisplaySsoProviderMismatchErrorPage(props);

    expect(page.title).toBeTruthy();
    expect(page.title.textContent).toStrictEqual("Sorry, the SSO provider has changed.");
    expect(page.message.textContent).toStrictEqual(`For security reasons please check with your administrator that this is a change that they initiated.The new SSO provider: ${props.newProvider.name}`);
    await page.clickOnAcceptNewProviderButton();

    expect(props.onAcceptNewProvider).not.toHaveBeenCalled();

    await page.clickOnConfirmationCheckbox();
    await page.clickOnAcceptNewProviderButton();

    expect(props.onAcceptNewProvider).toHaveBeenCalledTimes(1);
  });
});

