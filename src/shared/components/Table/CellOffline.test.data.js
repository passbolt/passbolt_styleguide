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
 * @since         5.13.0
 */

import { defaultOfflineItemDto } from "../../models/entity/offline/offlineItemEntity.test.data";

/**
 * Returns the default component props with no offline item (not available offline).
 * @param {object} props Props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    value: {},
    isSupported: () => true,
    ...props,
  };
}

/**
 * Returns props with an offline item (available offline).
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithOfflineAvailable(props = {}) {
  return defaultProps({
    value: {
      offline: defaultOfflineItemDto(),
    },
    isSupported: () => true,
    ...props,
  });
}

/**
 * Returns props with a null offline item (not available offline).
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithOfflineNotAvailable(props = {}) {
  return defaultProps({
    value: {
      offline: null,
    },
    isSupported: () => true,
    ...props,
  });
}

/**
 * Returns props with no value (undefined).
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithNoValue(props = {}) {
  return {
    value: {
      offline: undefined,
    },
    isSupported: () => true,
    ...props,
  };
}

/**
 * Returns props with offline not supported.
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithNotSupported(props = {}) {
  return {
    value: {
      offline: undefined,
    },
    isSupported: () => false,
    ...props,
  };
}
