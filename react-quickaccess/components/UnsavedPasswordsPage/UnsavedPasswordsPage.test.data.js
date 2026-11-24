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
 * @since         5.19.0
 */

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";
import { defaultPasswordDraftDto } from "../HomePage/HomePage.test.data";

/**
 * Default component props.
 * @param {Array<object>} passwordDrafts The password drafts returned by the background page.
 * @returns {object}
 */
export function defaultProps(passwordDrafts = defaultPasswordDrafts()) {
  const port = new MockPort();
  port.addRequestListener(
    "passbolt.quickaccess.get-password-drafts",
    jest.fn(() => passwordDrafts),
  );
  return {
    context: defaultAppContext({ port }),
  };
}

/**
 * Default password drafts, the most recent first.
 * @returns {Array<object>}
 */
export function defaultPasswordDrafts() {
  return [
    defaultPasswordDraftDto(),
    defaultPasswordDraftDto({
      id: "8d2c7d0e-1f4b-4e57-a1d3-6b5f0c9e2a74",
      name: "Github",
      uri: "https://github.com/signup",
      username: "ada@passbolt.com",
    }),
  ];
}
