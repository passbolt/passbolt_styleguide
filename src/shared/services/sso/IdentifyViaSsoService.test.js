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
import GetRecoverUrlService from "../api/sso/GetRecoverUrlService";
import GetUrlForSsoIdentificationService from "../api/sso/GetUrlForSsoIdentificationService";
import AzurePopupHandlerService from "./AzurePopupHandlerService";
import IdentifyViaSsoService from "./IdentifyViaSsoService";
import {v4 as uuid} from 'uuid';
import {defaultAppContext} from "./IdentifyViaSsoService.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("IdentifyWithSsoService", () => {
  describe('IdentifyWithSsoService::exec', () => {
    it('Should run the SSO login process and get back an URL for the user to proceed', () => {
      expect.assertions(4);
      const service = new IdentifyViaSsoService(defaultAppContext());

      const expectedSsoProvider = "azure";
      const ssoLoginUrl = "https://login.microsoft.com";
      const thirdPartyToken = uuid();
      const recoverUrl = "/sso/azure/recover.json";

      jest.spyOn(GetUrlForSsoIdentificationService.prototype, 'getUrl').mockImplementation(async providerId => {
        expect(providerId).toStrictEqual(expectedSsoProvider);
        return ssoLoginUrl;
      });

      jest.spyOn(AzurePopupHandlerService.prototype, 'getSsoTokenFromThirdParty').mockImplementation(async url => {
        expect(url).toStrictEqual(ssoLoginUrl);
        return thirdPartyToken;
      });

      jest.spyOn(GetRecoverUrlService.prototype, 'getRecoverUrl').mockImplementation(async token => {
        expect(token).toStrictEqual(thirdPartyToken);
        return recoverUrl;
      });

      return expect(service.exec(expectedSsoProvider)).resolves.toStrictEqual(recoverUrl);
    });
  });

  describe('IdentifyWithSsoService::stop', () => {
    it('should stop the process', async() => {
      expect.assertions(1);
      const service = new IdentifyViaSsoService(defaultAppContext());

      const spy = jest.spyOn(AzurePopupHandlerService.prototype, 'close');

      service.stopProcess();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
