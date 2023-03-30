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
 * @since         4.1.0
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";

const PASSWORD_POLICIES_RESOURCE_NAME = "password-policies";

/**
 * Model related to the mfa policy service settings
 */
class PasswordPolicyService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @param {Port} port
   * @public
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
  }

  /**
   * Find the Password policy setting using BEXT
   *
   * @return {Promise<Array<PasswordPoliciesDto>>|null>}
   */
  async find() {
    this.initClient();
    return (await this.apiClient.findAll()).body;
  }

  /**
   * save a the Password policy settings using BEXT
   * @param  {PasswordPolicies} dto
   * @returns {PasswordPolicyDto} the saved password policies
   */
  async save(dto) {
    this.initClient();
    const result = await this.apiClient.create(dto);
    return result.body;
  }

  /**
   * Initializes the API client with the specified resource name.
   * @param {string} [path='settings'] - The resource name to use for the API client.
   * @returns {void}
   */
  initClient(path = "settings") {
    this.apiClientOptions.setResourceName(`${PASSWORD_POLICIES_RESOURCE_NAME}/${path}`);
    this.apiClient = new ApiClient(this.apiClientOptions);
  }
}

export default PasswordPolicyService;
