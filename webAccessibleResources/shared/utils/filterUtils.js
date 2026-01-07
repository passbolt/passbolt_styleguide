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
 * @since         4.10.0
 */

/**
 * Escape a string that is to be treated as a literal string within a regular expression.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
 * @param {string} value The string to escape
 * @returns {string}
 */
export const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Filter resources by keywords.
 * Search on the name, the username, the primary uri and the description of the resources.
 * @param {array} resources The list of resources to filter.
 * @param {string} needle The needle to search.
 * @param {number} [limit = Number.MAX_SAFE_INTEGER] the count limit of results.
 * @returns {array} The filtered resources.
 */
export const filterResourcesBySearch = (resources, needle, limit = Number.MAX_SAFE_INTEGER) => {
  // Split the search by words
  const needles = needle.split(/\s+/);
  // Prepare the regexes for each word contained in the search.
  const regexes = needles.map((needle) => new RegExp(escapeRegExp(needle), "i"));

  let filterCount = 0;
  return resources.filter((resource) => {
    if (filterCount >= limit) {
      return false;
    }

    for (const i in regexes) {
      // To match a resource would have to match all the words of the search.
      const match =
        regexes[i].test(resource.metadata.name) ||
        regexes[i].test(resource.metadata.username) ||
        regexes[i].test(resource.metadata.uris?.[0]) ||
        regexes[i].test(resource.metadata.description);

      if (!match) {
        //early exit, there is no need to search for more matches in that case
        return false;
      }
    }

    filterCount++;
    return true;
  });
};
