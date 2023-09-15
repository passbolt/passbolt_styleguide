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
 * @since         4.3.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import DisplayUserMfaPage from "./DisplayUserMfa.test.page";

describe("As a user I should see the MFA settings page", () => {
  it("As a user I should see the MFA settings page if my Passbolt instance is running under HTTPS", () => {
    expect.assertions(1);
    const props = defaultAppContext();
    const page = new DisplayUserMfaPage(props);

    expect(page.mfaIframe).not.toBeNull();
  });

  it("As a user I should see a message telling me I cannot configure my MFA as my Passbolt instance is not running under HTTPS", () => {
    expect.assertions(2);
    const props = defaultAppContext({
      trustedDomain: "http://localhost"
    });
    const page = new DisplayUserMfaPage(props);

    expect(page.mfaIframe).toBeNull();
    expect(page.subTitle.textContent).toStrictEqual("Sorry the multi factor authentication feature is only available in a secure context (HTTPS).");
  });
});
