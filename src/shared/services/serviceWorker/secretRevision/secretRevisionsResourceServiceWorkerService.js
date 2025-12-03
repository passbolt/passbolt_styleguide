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
 * @since         5.7.0
 */

import assertString from "validator/es/lib/util/assertString";
import ResourceSecretRevisionsCollection from "../../../models/entity/secretRevision/resourceSecretRevisionsCollection";

export const SECRET_REVISIONS_FIND_ALL_BY_RESOURCE_ID_FOR_DISPLAY = "passbolt.secret-revisions.find-all-by-resource-id-for-display";

export default class SecretRevisionsResourceServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the secret revisions of a resource given its resource id.
   * @@param {string} resourceId
   * @returns {Promise<ResourceSecretRevisionsCollection>}
   */
  async findAllByResourceIdForDisplay(resourceId) {
    assertString(resourceId);
    const secretRevisionsCollection = await this.port.request(SECRET_REVISIONS_FIND_ALL_BY_RESOURCE_ID_FOR_DISPLAY, resourceId);
    // TODO: remove validate false when the data in the Secret entity will be able to handle string and decrypted object
    return new ResourceSecretRevisionsCollection(secretRevisionsCollection, {validate: false});
  }
}
