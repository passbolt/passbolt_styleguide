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
 * @since         3.6.0
 */

/**
 * Default props
 * @returns {*}
 */
import {DateTime} from "luxon";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const _props = {
    context: defaultAppContext(props?.context),
    policy: "opt-in",
    keyInfo: null,
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    onError: jest.fn(),
  };
  delete props.context; // Treated in the default
  return Object.assign(_props, props);
}

/**
 * Has changed policy.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function hasChangedPolicyProps(props = {}) {
  const _props = {
    context: defaultAppContext(),
    policy: "mandatory",
    keyInfo: {
      user_ids: [{
        name: "ada",
        email: "ada@passbolt.com"
      }, {
        name: "betty",
        email: "betty@passbolt.com"
      }],
      fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
      algorithm: "RSA",
      length: "4096",
      created: "2020-09-01T13:11:08+00:00",
      expires: "Infinity"
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Format date in time ago
 * @param {string} date The date to format
 * @return {string}
 */
export function formatDateTimeAgo(date) {
  if (date === null) {
    return "n/a";
  }
  if (date === 'Infinity') {
    return "Never";
  }
  const dateTime = DateTime.fromISO(date);
  const duration = dateTime.diffNow().toMillis();
  return duration > -1000 && duration < 0 ? 'Just now' : dateTime.toRelative();
}

export function formatDate(date) {
  return DateTime.fromJSDate(new Date(date)).setLocale("en-UK").toLocaleString(DateTime.DATETIME_FULL);
}

/**
 * Disabled policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function disabledPolicyProps(props = {}) {
  const _props = {
    policy: "disabled",
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Mandatory policy props with organization key
 * @param {Object} props The props to override
 * @returns {object}
 */
export function mandatoryPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    policy: "mandatory",
    keyInfo: {
      fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
      algorithm: "RSA",
      length: "4096",
      created: "2020-09-01T13:11:08+00:00",
      expires: "Infinity"
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Opt-in policy props with organization key
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optInPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    policy: "opt-in",
    keyInfo: {
      fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
      algorithm: "RSA",
      length: "4096",
      created: "2020-09-01T13:11:08+00:00",
      expires: "Infinity"
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Opt-out policy props with organization key
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optOutPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    policy: "opt-out",
    keyInfo: {
      fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
      algorithm: "RSA",
      length: "4096",
      created: "2020-09-01T13:11:08+00:00",
      expires: "Infinity"
    }
  };
  return defaultProps(Object.assign(_props, props));
}
