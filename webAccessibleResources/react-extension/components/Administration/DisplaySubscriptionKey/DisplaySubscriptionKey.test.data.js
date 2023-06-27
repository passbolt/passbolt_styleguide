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
 * @since         3.7.4
 */

/**
 * Default props
 * @returns {*}
 */
import {DateTime} from "luxon";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultNavigationContext} from "../../../contexts/NavigationContext.test.data";
import MockPort from "../../../test/mock/MockPort";

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export function defaultProps(props = {}) {
  const port = new MockPort();
  port.addRequestListener('passbolt.users.get-all', () => mockUsers);
  const defaultContext = {
    onGetSubscriptionKeyRequested: () => mockSubscription,
    port: port,
  };

  const defaultProps = {
    context: defaultAppContext(Object.assign(defaultContext, props?.context)),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    dialogContext: defaultDialogContext(),
    navigationContext: defaultNavigationContext()
  };
  delete props.context; // Treated in the default

  return Object.assign(defaultProps, props);
}

/**
 * Going to expire props
 * @return {Object}
 */
export function goingToExpireProps() {
  const context = {
    onGetSubscriptionKeyRequested: () => mockSubscriptionGoingToExpire,
  };
  return defaultProps({context});
}

/**
 * Expired props
 * @return {Object}
 */
export function expiredProps() {
  const context = {
    onGetSubscriptionKeyRequested: () => mockSubscriptionExpired,
  };
  return defaultProps({context});
}

/**
 * Users exceeded props
 * @return {Object}
 */
export function usersExceededProps() {
  const context = {
    onGetSubscriptionKeyRequested: () => mockSubscriptionUsersExceeded,
  };
  return defaultProps({context});
}

/**
 * Not found props
 * @return {Object}
 */
export function notFoundProps() {
  const context = {
    onGetSubscriptionKeyRequested: () => {},
  };
  return defaultProps({context});
}

/**
 * Format a date.
 * @string {string} date The date to format
 * @return {string}
 */
export function formatDate(date) {
  try {
    return DateTime.fromISO(date).setLocale('en-UK').toLocaleString(DateTime.DATE_SHORT);
  } catch (error) {
    return "";
  }
}

const expiredDate = new Date();
expiredDate.setMonth(expiredDate.getMonth() + 3);

const goingToExpireDate = new Date();
goingToExpireDate.setDate(goingToExpireDate.getDate() + 3);

export const mockSubscription = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 5,
  "email": "ada@passbolt.com",
  "created": "2020-12-01T00:00:00.661Z",
  "expiry": expiredDate.toISOString(),
  "data": "data"
};

export const mockSubscriptionModel = {
  "created": "2020-12-01T00:00:00.661Z",
  "customerId": "1n6BPvHRWfizhmARz",
  "data": "data",
  "email": "ada@passbolt.com",
  "expiry": expiredDate.toISOString(),
  "subscriptionId": "1n6BPvHRWfizhmARz",
  "users": 5,
};

export const mockSubscriptionUsersExceeded = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 2,
  "email": "ada@passbolt.com",
  "created": "2020-12-01T00:00:00.661Z",
  "expiry": "2021-12-01T00:00:00.661Z",
  "data": "data"
};

export const mockSubscriptionGoingToExpire = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 5,
  "email": "ada@passbolt.com",
  "created": "2019-12-01T00:00:00.661Z",
  "expiry": goingToExpireDate.toISOString(),
  "data": "data"
};

export const mockSubscriptionExpired = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 5,
  "email": "ada@passbolt.com",
  "created": "2019-12-01T00:00:00.661Z",
  "expiry": "2020-11-01T00:00:00.661Z",
  "data": "data"
};

export const mockSubscriptionUpdated = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 10,
  "email": "admin@passbolt.com",
  "created": "2020-12-16T00:00:00.661Z",
  "expiry": "2021-12-16T00:00:00.661Z",
  "data": "data"
};

export const mockUsers = [
  {
    active: true,
    name: "1"
  },
  {
    active: true,
    name: "2"
  },
  {
    active: true,
    name: "3"
  },
  {
    active: true,
    name: "4"
  },
  {
    active: true,
    name: "5"
  },
];
