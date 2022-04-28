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
import each from "jest-each";
import {defaultProps} from "./AskForAuthenticationHelpCredentialLost.test.data";
import AskForAuthenticationHelpCredentialLostTestPage from "./AskForAuthenticationHelpCredentialLost.test.page";
import {AskForAuthenticationHelpCredentialLostVariations} from "./AskForAuthenticationHelpCredentialLost";

beforeEach(() => {
  jest.resetModules();
});

describe("AskForAuthenticationHelpCredentialLost", () => {
  each([
    {displayAs: AskForAuthenticationHelpCredentialLostVariations.SETUP}, // Login
    {displayAs: AskForAuthenticationHelpCredentialLostVariations.RECOVER}, // recover account
  ]).describe("Common behavior to all context", _props => {
    let page, props;

    beforeEach(() => {
      props = defaultProps(_props); // The props to pass
      page = new AskForAuthenticationHelpCredentialLostTestPage(props);
    });

    it('As AN I should be able to request a new account', async() => {
      expect.assertions(1);
      await page.requestHelp();
      expect(props.onPrimaryActionClick).toHaveBeenCalled();
    });

    it('As AN I should be able to try again', async() => {
      expect.assertions(1);
      await page.tryAgain();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });
  });
});

