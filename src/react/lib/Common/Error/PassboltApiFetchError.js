/**
 * Application error
 *
 * @copyright (c) 2019 Passbolt SA
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

export default class PassboltApiFetchError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'PassboltApiFetchError';
    this.data = data || {};
  }
}