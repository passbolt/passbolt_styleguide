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
 * @since         3.9.0
 */

/**
 * Call browser extention to check if password is powned
 */
class PownedService {
  /**
   * Constructor
   *
   * @param {port} port for browser extension
   * @public
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Evaluates a given secret for security.
   *
   * @param {string} secret - The secret to evaluate.
   * @returns {Object} An object containing the evaluation results.
   * @returns {boolean} notInDictionaryHint - Indicates whether the secret is not present in a dictionary.
   * @returns {boolean} isPwnedServiceAvailable - Indicates whether the pwned password service is available.
   */
  async evaluateSecret(secret) {
    let inDictionary = true;
    let isPwnedServiceAvailable = true;
    if (secret.length >= 8) {
      try {
        inDictionary = await this.checkIfPasswordPowned(secret);
      } catch (error) {
        inDictionary = false;
        isPwnedServiceAvailable = false;
      }
    }

    return {inDictionary, isPwnedServiceAvailable};
  }

  /**
   * Call the browser extension to check if password is part of a dictionaty
   * @param {string} password to check
   * @return {Promise<SelfRegistrationDto>}
   */
  async checkIfPasswordPowned(password) {
    const response =  await this.port.request("passbolt.secrets.powned-password", password);
    return response > 0;
  }
}

export default PownedService;

