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

import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import { defaultClipboardContext } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";
import { resourcePasskeyDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * Default component props with a passkey resource.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        resource: resourcePasskeyDto(),
      },
    }),
    clipboardContext: defaultClipboardContext(),
    ...data,
  };
}
