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
 * Unit tests on IdentifyWithSsoSerivce in regard of specifications
 */
import AzurePopupHandlerService from "./AzurePopupHandlerService";
import {v4 as uuid} from 'uuid';

const mockWindowOpen = () => {
  window.originalOpen = window.open;
  delete window.open;

  window.open = (url, target, param) => ({
    opener: "non null opener",
    closed: false,
    location: {
      href: url
    },
    target: target,
    param: param,
    close: jest.fn()
  });
};

const unmockWindowOpen = () => {
  window.open = window.originalOpen;
  delete window.originalOpen;
};

beforeAll(() => {
  mockWindowOpen();
});

beforeEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterAll(() => {
  unmockWindowOpen();
});

describe("AzurePopupHandlerService", () => {
  describe('AzurePopupHandlerService::exec', () => {
    it('Should create a popup window', () => {
      expect.assertions(4);
      const expectedPopupUrl = "http://passbolt.test";
      const siteDomain = "http://localhost:6006";

      const service = new AzurePopupHandlerService(siteDomain);
      service.getSsoTokenFromThirdParty(expectedPopupUrl);

      const popup = service.popup;

      expect(popup.location.href).toStrictEqual(expectedPopupUrl);
      expect(popup.opener).toBeNull();
      expect(popup.param).toMatch(/popup/);
      expect(popup.closed).toBeFalsy();
    });

    it('Should return the token when the popup is on the expected url', async() => {
      expect.assertions(4);
      const expectedPopupUrl = "http://passbolt.test";
      const siteDomain = "http://localhost:6006/";
      const expectedToken = uuid();
      const wrongToken = uuid();

      const service = new AzurePopupHandlerService(siteDomain);
      const closeSpy = jest.spyOn(service, "close");
      const promise = service.getSsoTokenFromThirdParty(expectedPopupUrl);

      const popup = service.popup;
      popup.location.href = `${siteDomain}sso/recover?token=${wrongToken}`;
      jest.advanceTimersByTime(200);
      popup.location.href = `${siteDomain}sso/recover/azure/success?token=${expectedToken}`;
      jest.advanceTimersByTime(200);

      const returnedToken = await promise;
      expect(returnedToken).toStrictEqual(expectedToken);
      expect(popup.close).toHaveBeenCalledTimes(1);
      expect(service.popup).toBeNull();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('Should stop the process if the popup is closed', async() => {
      expect.assertions(2);
      const expectedPopupUrl = "http://passbolt.test";
      const siteDomain = "http://localhost:6006/";

      const service = new AzurePopupHandlerService(siteDomain);
      const closeSpy = jest.spyOn(service, "close");
      const promise = service.getSsoTokenFromThirdParty(expectedPopupUrl);

      const popup = service.popup;
      popup.closed = true;

      jest.advanceTimersByTime(200);

      const expectedError = new Error("The user navigated away from the tab where the SSO sign-in initiated");
      try {
        await promise;
      } catch (e) {
        expect(e).toStrictEqual(expectedError);
      }
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
