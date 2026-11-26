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
 * @since         5.18.0
 */
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { resourcePasskeyDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * A passkey sign-in a page of the tab waits for, as the background gives it.
 * @param {object} data Fields to override.
 * @returns {object}
 */
export const defaultTabPendingPasskeyRequestDto = (data = {}) => ({
  id: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  rp_id: "example.com",
  passkey_ids: [],
  ...data,
});

/**
 * Default props.
 * @param {object} data Props to override.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext({ openerTabId: 1 }),
    resource: resourcePasskeyDto(),
    ...data,
  };
}

/**
 * Make the background give the tab url and the passkey sign-ins its pages wait for.
 * @param {object} context The app context.
 * @param {string} tabUrl The url of the tab.
 * @param {Array<object>} pendingRequests The passkey sign-ins.
 */
export function mockTab(context, tabUrl, pendingRequests = []) {
  context.port.addRequestListener("passbolt.active-tab.get-url", () => tabUrl);
  context.port.addRequestListener("passbolt.passkey.get-tab-pending-requests", () => pendingRequests);
}
