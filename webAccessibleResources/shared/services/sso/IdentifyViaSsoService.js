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
 * @since         3.11.0
 */

import GetRecoverUrlService from "../api/sso/GetRecoverUrlService";
import GetUrlForSsoIdentificationService from "../api/sso/GetUrlForSsoIdentificationService";
import SsoPopupHandlerService, {AUTHENTICATION_SUCCESS_CASES} from "./SsoPopupHandlerService";

/**
 * Handles the SSO login for the recover process.
 */
class IdentifyViaSsoService {
  /**
   * IdentifyViaSsoService constructor
   * @param {string} providerId the SSO provider identifier
   * @param {AppContext} context
   * @param {function} successCallback the callback to be used after a successful SSO login
   * @param {function} registrationRequiredCallback the callback when the user needs to self register
   */
  constructor(providerId, context, successCallback, registrationRequiredCallback) {
    this.providerId = providerId;
    this.apiClientOptions = context.getApiClientOptions();

    const siteDomain = context.trustedDomain.replace(/\/$/, '');
    this.getUrlForSsoIdentificationService = new GetUrlForSsoIdentificationService(context.getApiClientOptions());
    this.getRecoverUrlService = new GetRecoverUrlService(siteDomain, context.getApiClientOptions());
    this.ssoPopupHandler = new SsoPopupHandlerService(siteDomain, providerId);
    this.successCallback = successCallback;
    this.registrationRequiredCallback = registrationRequiredCallback;
  }

  /**
   * Starts the SSO identification process
   * @returns {Promise<string>} the URL to redirect the user to
   * @public
   */
  async exec() {
    const popupUrl = await this.getUrlForSsoIdentificationService.getUrl(this.providerId);
    const ssoAuthResult = await this.ssoPopupHandler.getSsoTokenFromThirdParty(popupUrl);

    if (ssoAuthResult.case === AUTHENTICATION_SUCCESS_CASES.DEFAULT) {
      const recoverUrl = await this.getRecoverUrlService.getRecoverUrl(ssoAuthResult.token);
      this.successCallback(recoverUrl.toString());
    } else if (ssoAuthResult.case === AUTHENTICATION_SUCCESS_CASES.REGISTRATION_REQUIRED) {
      this.registrationRequiredCallback(ssoAuthResult.email);
    }
  }

  /**
   * Stops the identification process SSO process.
   */
  stopProcess() {
    this.ssoPopupHandler.close();
  }
}

export default IdentifyViaSsoService;

