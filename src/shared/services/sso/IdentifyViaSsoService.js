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
import AzurePopupHandlerService from "./AzurePopupHandlerService";

/**
 * Handles the SSO login for the recover process.
 */
class IdentifyViaSsoService {
  /**
   * IdentifyViaSsoService constructor
   * @param {AppContext} context
   */
  constructor(context) {
    this.apiClientOptions = context.getApiClientOptions();
    const siteDomain = new URL(context.trustedDomain);
    this.getUrlForSsoIdentificationService = new GetUrlForSsoIdentificationService(context.getApiClientOptions());
    this.getRecoverUrlService = new GetRecoverUrlService(siteDomain, context.getApiClientOptions());
    this.azurePopupHandler = new AzurePopupHandlerService(siteDomain);
  }

  /**
   * Starts the SSO identification process
   * @param {string} providerId the id of the SSO provider
   * @returns {Promise<string>} the URL to redirect the user to
   * @public
   */
  async exec(providerId) {
    const popupUrl = await this.getUrlForSsoIdentificationService.getUrl(providerId);
    const ssoToken = await this.azurePopupHandler.getSsoTokenFromThirdParty(popupUrl);
    const recoverUrl = await this.getRecoverUrlService.getRecoverUrl(ssoToken);
    return recoverUrl.toString();
  }

  /**
   * Stops the identification process SSO process.
   */
  stopProcess() {
    this.azurePopupHandler.close();
  }
}

export default IdentifyViaSsoService;

