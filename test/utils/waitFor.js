/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import {waitFor} from "@testing-library/dom";
import {tracePromise} from "./tracePromise";

/**
 * Shortcut to use a waitFor when waiting for a state to change.
 * The state is consider to be reached when the given callback returns `true`.
 * @param {function<boolean>} callback a callback that should return true when the desired state is reached
 * @returns {Promise<void>}
 */
export const waitForTrue = callback => tracePromise(waitFor(() => {
  if (!callback()) {
    throw new Error("The changes are not ready yet");
  }
}));
