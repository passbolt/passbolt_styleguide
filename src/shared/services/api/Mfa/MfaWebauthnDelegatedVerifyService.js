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
 * Service related to the WebAuthn MFA verification delegated by the mobile applications
 */
class MfaWebauthnDelegatedVerifyService {
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
   * Begin the verification: returns the ceremony handle and the credential request options.
   * @param {string} delegatedState The delegated state issued to the mobile application
   * @returns {Promise<{handle: string, credentialRequestOptions: object}>}
   */
  async begin(delegatedState) {
    this.initClient("verify/webauthn/delegated/begin");
    return (await this.apiClient.create({ mfa_delegated_state: delegatedState })).body;
  }

  /**
   * Finish the verification with the assertion returned by the authenticator.
   * @param {{mfa_delegated_state: string, handle: string, credential: object}} finishDto
   * @returns {Promise<{mfa_delegated_token: string}>}
   */
  async finish(finishDto) {
    this.initClient("verify/webauthn/delegated/finish");
    return (await this.apiClient.create(finishDto)).body;
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

export default MfaWebauthnDelegatedVerifyService;
