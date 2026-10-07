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

import { defaultSecretRowState } from "./secretRowState.test.data";
import { defaultTotpViewModelDto } from "../../../shared/models/entity/totp/totpDto.test.data";

/**
 * Default component props: a masked TOTP.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    totp: defaultSecretRowState(),
    canCopy: true,
    canPreview: true,
    ...props,
  };
}

/**
 * Props with a revealed TOTP.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function revealedTotpProps(props = {}) {
  return defaultProps({ totp: defaultSecretRowState({ revealed: true, value: defaultTotpViewModelDto() }), ...props });
}
