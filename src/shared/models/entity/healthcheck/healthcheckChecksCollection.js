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

import EntityV2Collection from "../abstract/entityV2Collection";
import HealthcheckCheckEntity from "./healthcheckCheckEntity";

/**
 * Every check of the healthcheck response, in the order the API sent them.
 * No build rule asserts the key unique: two checks sharing one should not throw and blank the page.
 */
class HealthcheckChecksCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return HealthcheckCheckEntity;
  }

  /**
   * Get healthcheck checks collection schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "array",
      items: HealthcheckCheckEntity.getSchema(),
    };
  }

  /**
   * Group the checks by domain, for display.
   *
   * The checks of one domain are not necessarily next to each other in the response: a plugin
   * registering a check into an existing domain brings that domain back in a later run. Nothing
   * is sorted, a domain takes the position of its first check.
   *
   * @returns {array<{key: string, title: string, checks: array<HealthcheckCheckEntity>}>}
   */
  groupByDomain() {
    const groups = [];
    const groupsByKey = new Map();

    this.items.forEach((check) => {
      let group = groupsByKey.get(check.domainKey);
      if (!group) {
        group = { key: check.domainKey, title: check.domainTitle, checks: [] };
        groupsByKey.set(check.domainKey, group);
        groups.push(group);
      }
      group.checks.push(check);
    });

    return groups;
  }
}

export default HealthcheckChecksCollection;
