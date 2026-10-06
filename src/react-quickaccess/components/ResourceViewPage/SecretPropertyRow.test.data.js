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
 * @since         5.17.0
 */

import { defaultTotpViewModelDto } from "../../../shared/models/entity/totp/totpDto.test.data";

/**
 * Default component props: a masked password row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    type: "password",
    label: "Password",
    revealed: false,
    value: null,
    decrypting: false,
    copyStatus: "default",
    showTimer: false,
    canCopy: true,
    canPreview: true,
    onCopy: jest.fn(),
    onPreview: jest.fn(),
    ...props,
  };
}

/**
 * A revealed password row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function revealedPasswordProps(props = {}) {
  return defaultProps({ revealed: true, value: "secret-decrypted", ...props });
}

/**
 * A masked TOTP row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function totpProps(props = {}) {
  return defaultProps({ type: "totp", label: "TOTP", ...props });
}

/**
 * A revealed TOTP row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function revealedTotpProps(props = {}) {
  return totpProps({ revealed: true, value: defaultTotpViewModelDto(), ...props });
}

/**
 * A masked PIN code row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function pinCodeProps(props = {}) {
  return defaultProps({ type: "pin_code", label: "Pin code", ...props });
}

/**
 * A masked note row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function noteProps(props = {}) {
  return defaultProps({ type: "note", label: "Notes", ...props });
}

/**
 * A revealed note row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function revealedNoteProps(props = {}) {
  return noteProps({ revealed: true, value: "Wifi: office-5G\nThe password is at the reception.", ...props });
}

/**
 * A masked custom field row.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function customFieldProps(props = {}) {
  return defaultProps({
    type: "custom_field",
    label: "License key",
    emptySecretSentence: "There is no value",
    ...props,
  });
}
