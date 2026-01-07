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
 * @since         4.4.0
 */

import DisplayMfaProviderConfigurationPage from "./DisplayMfaProviderConfiguration.test.page";
import { mockVerifiedDate, propsMfaWithProvider } from "./DisplayMfaProviderConfiguration.test.data";
import MfaProviders from "../DisplayProviderList/MfaProviders.data";
import { Providers } from "../../../contexts/MFAContext";

/**
 * Unit tests on DisplayMfaProviderConfiguration in regard of specifications
 */

describe("DisplayMfaProviderConfiguration", () => {
  describe("As a logged user I can see the details of a configured mfa provider", () => {
    let page, props, provider;

    beforeEach(() => {
      props = propsMfaWithProvider(Providers.TOTP);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.resolve(mockVerifiedDate));
      page = new DisplayMfaProviderConfigurationPage(props);
      provider = MfaProviders.find((mfaProvider) => mfaProvider.id === Providers.TOTP);
    });
    it("I can see the mfa provider configuration page", () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      expect(page.successIcon).not.toBeNull();
    });

    it("I can see a dedicated title for the selected provider", () => {
      expect.assertions(1);
      expect(page.title.textContent).toEqual(provider.configuration.title);
    });

    it("I can see a dedicated description for the selected provider", () => {
      expect.assertions(1);
      expect(page.description.textContent).toEqual(provider.configuration.description);
    });

    it("I can see a the verified date", () => {
      expect.assertions(1);
      expect(page.verifiedDate.textContent).toContain("27 September 2023");
    });

    it("I can go back to the provider list", async () => {
      expect.assertions(1);

      await page.clickOnManageProviderButton();

      expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
    });

    it("I can remove the existing provider", async () => {
      expect.assertions(2);

      await page.clickOnTurnOffButton();

      expect(props.mfaContext.removeProvider).toHaveBeenCalled();
      expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
    });
  });
});
