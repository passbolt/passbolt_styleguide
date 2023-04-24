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
 * @since         3.12.0
 */

/**
 * Unit tests on IdentifyWithSso in regard of specifications
 */
import IdentifyWithSsoPage from "./IdentifyWithSso.test.page";
import {defaultProps} from "./IdentifyWithSso.test.data";
import IdentifyViaSsoService from "../../../../shared/services/sso/IdentifyViaSsoService";
import {waitFor} from "@testing-library/dom";
import GetUrlForSsoIdentificationService from "../../../../shared/services/api/sso/GetUrlForSsoIdentificationService";
import SsoPopupHandlerService from "../../../../shared/services/sso/SsoPopupHandlerService";
import {v4 as uuid} from "uuid";
import GetRecoverUrlService from "../../../../shared/services/api/sso/GetRecoverUrlService";

beforeEach(() => {
  jest.resetModules();
});

describe("IdentifyWithSso", () => {
  describe('As AN I be able to SSO to identify myself instead of using the email process', () => {
    it('Component should mount', async() => {
      expect.assertions(4);
      const props = defaultProps();
      const page = new IdentifyWithSsoPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe('Welcome back!');
      expect(page.ssoButton).toBeTruthy();
      expect(page.secondaryActionButton).toBeTruthy();
    });

    it('As AN I want to be redirected to the setup or recover page after a successful login attempt', async() => {
      expect.assertions(3);
      const expectedUrl = "https://www.passbolt.test";
      const popupUrl = "https://third-party.auth.com";
      const expectedToken = uuid();
      const location = window.location;
      delete window.location;

      window.location = {
        href: "/"
      };

      jest.spyOn(GetUrlForSsoIdentificationService.prototype, "getUrl").mockImplementation(async() => popupUrl);
      jest.spyOn(SsoPopupHandlerService.prototype, "getSsoTokenFromThirdParty").mockImplementation(async url => {
        expect(url).toStrictEqual(popupUrl);
        return {
          case: 'default',
          token: expectedToken
        };
      });

      jest.spyOn(GetRecoverUrlService.prototype, "getRecoverUrl").mockImplementation(token => {
        expect(token).toStrictEqual(expectedToken);
        return expectedUrl;
      });

      const props = defaultProps();
      const page = new IdentifyWithSsoPage(props);
      await waitFor(() => {});

      // start the SSO process
      await page.clickOnSsoButton();
      await waitFor(() => {});
      expect(window.location.href).toStrictEqual(expectedUrl);

      window.location = location;
    });

    it('As AN I want to be redirected to the self_registration a successful login attempt and if I am not a registered user', async() => {
      expect.assertions(2);
      const popupUrl = "https://third-party.auth.com";
      const expectedEmail = "user@registered-domain.com";

      jest.spyOn(GetUrlForSsoIdentificationService.prototype, "getUrl").mockImplementation(async() => popupUrl);
      jest.spyOn(SsoPopupHandlerService.prototype, "getSsoTokenFromThirdParty").mockImplementation(async url => {
        expect(url).toStrictEqual(popupUrl);
        return {
          case: 'registration_required',
          token: expectedEmail
        };
      });

      const onUserRegistrationRequired = jest.fn(email => {
        expect(email).toStrictEqual(expectedEmail);
      });

      const props = defaultProps({onUserRegistrationRequired});
      const page = new IdentifyWithSsoPage(props);
      await waitFor(() => {});

      // start the SSO process
      await page.clickOnSsoButton();
      await waitFor(() => {});
    });

    it('As a user without the extension configured, I can cancel and retry the SSO process', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new IdentifyWithSsoPage(props);
      await waitFor(() => {});

      let rejectPromise = null;
      jest.spyOn(IdentifyViaSsoService.prototype, "exec").mockImplementation(() => new Promise((resolve, reject) => { rejectPromise = reject; }));

      // start the SSO process
      expect(page.isProcessing()).toBeFalsy();
      await page.clickOnSsoButton();
      expect(page.isProcessing()).toBeTruthy();
      rejectPromise(new Error("User closed the popup"));
      await waitFor(() => {});
      expect(page.isProcessing()).toBeFalsy();
    });

    it('As a user without the extension configured, I can still use the email procedure to identify myself', async() => {
      expect.assertions(1);
      const props = defaultProps({
        onSecondaryActionClick: jest.fn()
      });
      const page = new IdentifyWithSsoPage(props);
      await waitFor(() => {});

      await page.clickOnSecondaryAction();

      expect(props.onSecondaryActionClick).toHaveBeenCalledTimes(1);
    });
  });
});
