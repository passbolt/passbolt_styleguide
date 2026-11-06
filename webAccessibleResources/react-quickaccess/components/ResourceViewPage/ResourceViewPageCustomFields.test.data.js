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

import { copiedSecretState, defaultSecretState } from "./secretState.test.data";

/**
 * The ids of the custom fields of the default props.
 * @type {Array<string>}
 */
export const CUSTOM_FIELD_IDS = [
  "3f7a4b1e-8c2d-4e5f-9a6b-1c2d3e4f5a60",
  "4a8b5c2f-9d3e-4f60-8b7c-2d3e4f5a6b71",
  "5b9c6d30-ae4f-4071-9c8d-3e4f5a6b7c82",
  "6cad7e41-bf50-4182-8d9e-4f5a6b7c8d93",
];

/**
 * Default component props: four masked custom fields, the third one without key, the page secret state idle.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    customFields: [
      { id: CUSTOM_FIELD_IDS[0], metadata_key: "License key", value: null },
      { id: CUSTOM_FIELD_IDS[1], metadata_key: "Port", value: null },
      { id: CUSTOM_FIELD_IDS[2], metadata_key: "", value: null },
      { id: CUSTOM_FIELD_IDS[3], metadata_key: "Empty", value: null },
    ],
    ...defaultSecretState(),
    onCopy: jest.fn(),
    onPreview: jest.fn(),
    canCopy: true,
    canPreview: true,
    ...props,
  };
}

/**
 * Props with the four custom fields in different states: revealed, decrypting, copied, the last one revealed empty.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function mixedStatesProps(props = {}) {
  return defaultProps({
    customFields: [
      { id: CUSTOM_FIELD_IDS[0], metadata_key: "License key", value: "XYZ-123" },
      { id: CUSTOM_FIELD_IDS[1], metadata_key: "Port", value: null },
      { id: CUSTOM_FIELD_IDS[2], metadata_key: "", value: null },
      { id: CUSTOM_FIELD_IDS[3], metadata_key: "Empty", value: "" },
    ],
    ...copiedSecretState(CUSTOM_FIELD_IDS[2]),
    decryptingSecret: CUSTOM_FIELD_IDS[1],
    ...props,
  });
}

/**
 * Props without any custom field.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function emptyCustomFieldsProps(props = {}) {
  return defaultProps({ customFields: [], ...props });
}
