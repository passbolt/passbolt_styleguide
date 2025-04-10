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

import {denyRbacContext} from '../../../../shared/context/Rbac/RbacContext.test.data';
import {MfaSettingsWorkflowStates, Providers} from '../../../contexts/MFAContext';
import {noMfaDefined} from '../../../contexts/MFAContext.test.data';
import {defaultProps, propsWithMfaProviders, propsWithoutMfaProviders} from './DisplayProviderList.test.data';
import DisplayProviderListPage from './DisplayProviderList.test.page';
import MfaProviders from './MfaProviders.data';

/**
 * Unit tests on DisplayProviderList in regard of specifications
 */

describe("DisplayProviderList", () => {
  describe("As a logged user I should be able to manage the MFA providers", () => {
    let page,
      props;

    beforeEach(() => {
      props = propsWithMfaProviders();
      page = new DisplayProviderListPage(props);
    });
    it('As a logged user I should be able to see the MFA providers list ', () => {
      expect.assertions(5);

      expect(page.exists()).toBeTruthy();
      expect(page.yubikeyCard).not.toBeNull();
      expect(page.duoCard).not.toBeNull();
      expect(page.totpCard).not.toBeNull();
      expect(page.title.textContent).toEqual("Multi factor authentication");
      //expect(page.description.textContent).toEqual("Multi-factor authentication (MFA) is a method of confirming a user's identity that requires presenting two or more pieces of evidence (or factor).");
    });

    it('As a logged user I should be able to see the yubikey card', () => {
      expect.assertions(4);

      const yubikey = MfaProviders.find(mfaProvider => mfaProvider.id === Providers.YUBIKEY);

      expect(page.yubikeyCard).not.toBeNull();
      expect(page.yubikeyCardTitle.textContent).toEqual(yubikey.name);
      expect(page.yubikeyCardImage.innerHTML).not.toBeNull();
      expect(page.yubikeyCardStatus.textContent).toEqual("Disabled");
    });

    it('As a logged user I should be able to see the duo card', () => {
      expect.assertions(4);

      const duo = MfaProviders.find(mfaProvider => mfaProvider.id === Providers.DUO);

      expect(page.duoCard).not.toBeNull();
      expect(page.duoCardTitle.textContent).toEqual(duo.name);
      expect(page.duoCardImage).not.toBeNull();
      expect(page.duoCardStatus.textContent).toEqual("Disabled");
    });

    it('As a logged user I should be able to see the totp card', () => {
      expect.assertions(4);

      const totp = MfaProviders.find(mfaProvider => mfaProvider.id === Providers.TOTP);

      expect(page.totpCard).not.toBeNull();
      expect(page.totpCardTitle.textContent).toEqual(totp.name);
      expect(page.totpCardImage.textContent).not.toBeNull();
      expect(page.totpCardStatus.textContent).toEqual("Enabled");
    });

    it('As a logged user I should be able setup a provider not configured', async() => {
      expect.assertions(2);

      await page.clickOnTotpProvider();

      expect(props.mfaContext.setProvider).toHaveBeenCalledWith(Providers.TOTP);
      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
    });

    it('As a logged user I should be able check the provider configuration', async() => {
      expect.assertions(2);
      jest.spyOn(props.mfaContext, "getMfaUserSettings").mockImplementation(() => noMfaDefined);
      await page.clickOnTotpProvider();

      expect(props.mfaContext.setProvider).toHaveBeenCalledWith(Providers.TOTP);
      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.TOTPOVERVIEW);
    });
  });

  describe("As a logged user I should not be able to configure any MFA provider if the minimum requirements are not satisfied", () => {
    it('As a logged-in user I should not be able to configure any MFA provider if the application is not running on HTTPS', () => {
      expect.assertions(2);

      const page = new DisplayProviderListPage(defaultProps());

      expect(page.title.textContent).toEqual("Multi factor authentication");
      expect(page.description.textContent).toEqual("Sorry the multi factor authentication feature is only available in a secure context (HTTPS).");
    });

    it('As a logged-in user I should not be able to configure any MFA provider if the organization does not permit it', () => {
      expect.assertions(3);

      const page = new DisplayProviderListPage(propsWithoutMfaProviders());

      expect(page.title.textContent).toEqual("Multi factor authentication");
      expect(page.subtitle.textContent).toEqual("Sorry no multi factor authentication is enabled for this organization.");
      expect(page.description.textContent).toEqual("Please contact your administrator to enable multi-factor authentication.");
    });

    it('As a desktop application I should not see the duo card', () => {
      expect.assertions(1);

      window.chrome = {webview: {}};

      const page = new DisplayProviderListPage(defaultProps({
        rbacContext: denyRbacContext()
      }));

      expect(page.duoCard).toBeNull();
    });
  });
});
