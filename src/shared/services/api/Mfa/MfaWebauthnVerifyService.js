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
 * @since         5.17.0
 */

import { ApiClient } from "../../../lib/apiClient/apiClient";

const MFA_RESOURCE_NAME = "mfa";

/**
 * Service related to the WebAuthn MFA verification
 */
class MfaWebauthnVerifyService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
  }

  /**
   * Find the verification settings: the providers enabled for the user and the remember-me policy.
   * @returns {Promise<{providers: Array<string>, isRememberMeForAMonthEnabled: boolean}>}
   */
  async findSettings() {
    this.initClient("verify/webauthn");
    return (await this.apiClient.findAll()).body;
  }

  /**
   * Begin the verification: returns the ceremony handle and the credential request options.
   * @returns {Promise<{handle: string, credentialRequestOptions: object}>}
   */
  async begin() {
    this.initClient("verify/webauthn/begin");
    return (await this.apiClient.create({})).body;
  }

  /**
   * Finish the verification with the assertion returned by the authenticator.
   * @param {{handle: string, credential: object, remember: boolean}} verifyDto
   * @returns {Promise<*>}
   */
  async finish(verifyDto) {
    this.initClient("verify/webauthn/finish");
    return (await this.apiClient.create(verifyDto)).body;
  }

  /**
   * Initializes the API client with the specified resource name.
   * @param {string} path The resource path under mfa/
   * @returns {void}
   */
  initClient(path) {
    this.apiClientOptions.setResourceName(`${MFA_RESOURCE_NAME}/${path}`);
    this.apiClient = new ApiClient(this.apiClientOptions);
  }
}

export default MfaWebauthnVerifyService;
