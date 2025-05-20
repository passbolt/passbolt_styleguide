/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https=//www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information; please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */
/**
 * Enum corresponding to the entity resource form entity
 *
 * Warning: If the value do not have a "." the mechanism of addSecret in the resource form entity need update
 * @type {{PASSWORD: string, TOTP: string, NOTE: string, DESCRIPTION: string}}
 */
export const ResourceEditCreateFormEnumerationTypes = {
  PASSWORD: "secret.password",
  TOTP: "secret.totp",
  NOTE: "secret.description",
  DESCRIPTION: "metadata.description",
  URIS: "metadata.uris",
};
