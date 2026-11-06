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

import { defaultSecretState } from "./secretState.test.data";

/**
 * Default component props: a hidden note, the page secret state idle.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    note: null,
    ...defaultSecretState(),
    onCopy: jest.fn(),
    onPreview: jest.fn(),
    canCopy: true,
    canPreview: true,
    ...props,
  };
}

/**
 * Props with a revealed note.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function revealedNoteProps(props = {}) {
  return defaultProps({ note: "Wifi: office-5G\nThe password is at the reception.", ...props });
}
