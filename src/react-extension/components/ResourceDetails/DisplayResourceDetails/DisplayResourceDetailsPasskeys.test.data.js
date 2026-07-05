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
 * @since         5.14.0
 */

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";

export function passkeysDto() {
  return [
    {
      credential_id: "cred-1",
      user_name: "brf@webauthn.io",
      rp_id: "webauthn.io",
      created: "2026-07-04T00:00:00+00:00",
    },
  ];
}

export function defaultProps(props = {}) {
  const context = defaultAppContext();
  jest.spyOn(context.port, "request").mockImplementation(() => Promise.resolve(props.passkeys ?? []));
  return {
    context,
    resourceWorkspaceContext: { details: { resource: { id: "resource-1" } } },
    actionFeedbackContext: { displayError: jest.fn(), displaySuccess: jest.fn() },
  };
}
