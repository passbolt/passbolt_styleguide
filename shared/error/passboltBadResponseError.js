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
 * @since         2.9.0
 */

class PassboltBadResponseError extends Error {
  constructor(error, response) {
    super('An internal error occurred. The server response could not be parsed. Please contact your administrator.');
    this.name = 'PassboltBadResponseError';
    this.srcError = error;
    this.srcResponse = response;
  }
}

export default PassboltBadResponseError;
