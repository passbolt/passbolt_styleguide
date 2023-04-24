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
import SsoPopupHandlerService from "./SsoPopupHandlerService";
import IdentifyViaSsoService from "./IdentifyViaSsoService";
import {v4 as uuid} from 'uuid';
import {defaultAppContext} from "./IdentifyViaSsoService.test.data";
import each from "jest-each";

beforeEach(() => {
  jest.clearAllMocks();
});

const scenarios = [
  {providerId: 'azure', ssoLoginUrl: "https://login.microsoft.com"},
  {providerId: 'google', ssoLoginUrl: "https://accounts.google.com/o/oauth2/v2/auth"}
];

each(scenarios).describe("IdentifyWithSsoService", scenario => {
  describe(`IdentifyWithSsoService::exec (with provider '${scenario.providerId}')`, () => {
    it('Should run the SSO login process and get back an URL for the user to proceed', () => {
      expect.assertions(5);
      const expectedSsoProvider = scenario.providerId;
      const thirdPartyToken = uuid();
      const recoverUrl = `/sso/${scenario.providerId}/recover.json`;

      const successCallback = jest.fn(url => {
        expect(url).toStrictEqual(recoverUrl);
      });

      const service = new IdentifyViaSsoService(scenario.providerId, defaultAppContext(), successCallback);

      jest.spyOn(GetUrlForSsoIdentificationService.prototype, 'getUrl').mockImplementation(async providerId => {
        expect(providerId).toStrictEqual(expectedSsoProvider);
        return scenario.ssoLoginUrl;
      });

      jest.spyOn(SsoPopupHandlerService.prototype, 'getSsoTokenFromThirdParty').mockImplementation(async url => {
        expect(url).toStrictEqual(scenario.ssoLoginUrl);
        return {
          token: thirdPartyToken,
          case: "default"
        };
      });

      jest.spyOn(GetRecoverUrlService.prototype, 'getRecoverUrl').mockImplementation(async token => {
        expect(token).toStrictEqual(thirdPartyToken);
        return recoverUrl;
      });

      return expect(service.exec()).resolves.toStrictEqual(undefined);
    });
  });

  it(`Should run the self_registration process if the user can self-register (with provider '${scenario.providerId}')`, () => {
    expect.assertions(4);
    const expectedSsoProvider = scenario.providerId;
    const userEmail = "user@registered-domain.com";

    const registrationRequiredCallback = jest.fn(email => {
      expect(email).toStrictEqual(userEmail);
    });

    const service = new IdentifyViaSsoService(scenario.providerId, defaultAppContext(), null, registrationRequiredCallback);

    jest.spyOn(GetUrlForSsoIdentificationService.prototype, 'getUrl').mockImplementation(async providerId => {
      expect(providerId).toStrictEqual(expectedSsoProvider);
      return scenario.ssoLoginUrl;
    });

    jest.spyOn(SsoPopupHandlerService.prototype, 'getSsoTokenFromThirdParty').mockImplementation(async url => {
      expect(url).toStrictEqual(scenario.ssoLoginUrl);
      return {
        email: userEmail,
        case: "registration_required"
      };
    });

    return expect(service.exec()).resolves.toStrictEqual(undefined);
  });

  describe(`IdentifyWithSsoService::stop (with provider '${scenario.providerId}')`, () => {
    it('should stop the process', async() => {
      expect.assertions(1);
      const service = new IdentifyViaSsoService(scenario.providerId, defaultAppContext());

      const spy = jest.spyOn(SsoPopupHandlerService.prototype, 'close');

      service.stopProcess();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
