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

/**
 * The create request the background gives QuickAccess.
 * @param {object} data Fields to override.
 * @returns {object}
 */
export const defaultPasskeyCreateRequestDto = (data = {}) => ({
  rp_id: "example.com",
  name: "Example",
  user_name: "ada@example.com",
  user_display_name: "Ada Lovelace",
  ...data,
});

/**
 * Default props.
 * @param {object} data Props to override.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext({ setWindowBlurBehaviour: jest.fn(), shouldCloseAtWindowBlur: true }),
    requestId: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    ...data,
  };
}

/**
 * Make the background give the create request.
 * @param {object} context The app context.
 * @param {object} request The request.
 */
export function mockCreateRequest(context, request = defaultPasskeyCreateRequestDto()) {
  context.port.addRequestListener("passbolt.passkey.get-create-request", () => request);
}
