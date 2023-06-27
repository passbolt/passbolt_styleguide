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
 * @since         3.8.3
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";

const SELF_REGISTRATION_SETTINGS_RESOURCE_NAME = "self-registration";

/**
 * Model related to the Self registration settings API
 */
class SelfRegistrationService {
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
   * Find the self registration settings using Passbolt API
   *
   * @return {Promise<SelfRegistrationDto>}
   */
  async find() {
    this.initClient();
    const selfRegistrationSettings = await this.apiClient.findAll();
    const settings = selfRegistrationSettings?.body;
    return settings;
  }

  /**
   * save a the self registration settings using Passbolt API
   * @param  {SelfRegistrationDto} dto
   * @return {Promise<SelfRegistrationDto>}
   */
  async save(dto) {
    this.initClient();
    await this.apiClient.create(dto);
  }

  /**
   * remove settings for self registration using Passbolt API
   * @param  {String} id
   */
  async delete(id) {
    this.initClient();
    await this.apiClient.delete(id);
  }

  /**
   * checks if a domain is allowed for self registration.
   * @param {string} domain - The domain to check.
   * @returns {Promise} - A promise that resolves when the domain has been checked.
   */
  async checkDomainAllowed(payload) {
    this.initClient("dry-run");
    await this.apiClient.create(payload);
  }

  /**
   * Initializes the API client with the specified resource name.
   * @param {string} [path='settings'] - The resource name to use for the API client.
   * @returns {void}
   */
  initClient(path = "settings") {
    this.apiClientOptions.setResourceName(`${SELF_REGISTRATION_SETTINGS_RESOURCE_NAME}/${path}`);
    this.apiClient = new ApiClient(this.apiClientOptions);
  }
}

export default SelfRegistrationService;

