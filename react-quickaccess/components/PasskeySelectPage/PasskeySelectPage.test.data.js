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
 * The get request the background gives QuickAccess.
 * @param {object} data Fields to override.
 * @returns {object}
 */
export const defaultPasskeyGetRequestDto = (data = {}) => ({
  rp_id: "example.com",
  passkeys: [
    { id: "8e3874ae-4b40-590b-968a-418f704b9d9a", name: "Example", username: "ada@example.com" },
    { id: "f848277c-5398-58f8-a82a-72397af2d450", name: "Example work", username: "ada@work.example.com" },
  ],
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
 * Make the background give the get request.
 * @param {object} context The app context.
 * @param {object} request The request.
 */
export function mockGetRequest(context, request = defaultPasskeyGetRequestDto()) {
  context.port.addRequestListener("passbolt.passkey.get-pending-request", () => request);
}
