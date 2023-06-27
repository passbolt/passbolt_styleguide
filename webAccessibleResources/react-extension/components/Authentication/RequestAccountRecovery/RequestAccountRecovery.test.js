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

import RequestAccountRecoveryPage from "./RequestAccountRecovery.test.page";
import {defaultProps} from "./RequestAccountRecovery.test.data";
import each from "jest-each";
import {RequestAccountRecoveryVariations} from "./RequestAccountRecovery";

beforeEach(() => {
  jest.resetModules();
});

describe("RequestAccountRecoveryPage", () => {
  each([
    {displayAs: RequestAccountRecoveryVariations.SETUP}, // Login
    {displayAs: RequestAccountRecoveryVariations.RECOVER}, // recover account
    {displayAs: RequestAccountRecoveryVariations.ACCOUNT_RECOVERY}, // account recovery
  ]).describe("Common behavior to all context", _props => {
    let page, props;

    beforeEach(() => {
      props = defaultProps(_props); // The props to pass
      page = new RequestAccountRecoveryPage(props);
    });

    it('As AN I should be able to request an account recovery', async() => {
      expect.assertions(1);
      await page.requestAccountRecovery();
      expect(props.onPrimaryActionClick).toHaveBeenCalled();
    });

    it('As AN I should be able to try again', async() => {
      expect.assertions(1);
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });
  });
});
