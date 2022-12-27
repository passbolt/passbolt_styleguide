
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
 * @since         3.8.3
 */

/**
 * This util is used to generalise map method
 */
class MapObject {
  /**
   * clone a map object
   * @param {any} object
   * @returns clone of object
   */
  static clone(object) {
    return new Map(JSON.parse(JSON.stringify(Array.from(object))));
  }

  /**
   * return map iteration
   * @param {any} object
   * @returns iterations
   */
  static iterators(object) {
    return [...object.keys()];
  }

  /**
   * return values array
   * @param {any} object
   * @returns iterations
   */
  static listValues(object) {
    return [...object.values()];
  }
}

export default MapObject;
