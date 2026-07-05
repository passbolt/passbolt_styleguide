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
 * @since         5.14.0
 */

import { defaultProps } from "./WebauthnSetup.test.data";
import WebauthnSetupPage from "./WebauthnSetup.test.page";

describe("WebauthnSetup", () => {
  it("As a user I can see the security key getting-started screen", () => {
    expect.assertions(2);
    const page = new WebauthnSetupPage(defaultProps());

    expect(page.exists()).toBeTruthy();
    expect(page.title.textContent).toEqual("Getting started with security keys");
  });

  it("As a user the get-started link points at the passbolt-served setup page", () => {
    expect.assertions(1);
    const page = new WebauthnSetupPage(defaultProps());

    // On a non-Safari browser the primary action is a link to the top-level passbolt setup page.
    expect(page.getStartedLink.getAttribute("href")).toEqual("https://localhost:6006/mfa/setup/webauthn");
  });

  it("As a user I can cancel the setup and return to the provider list", async () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new WebauthnSetupPage(props);

    await page.clickCancel();

    expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
  });
});
