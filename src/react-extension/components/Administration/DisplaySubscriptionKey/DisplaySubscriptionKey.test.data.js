/**
 * Default props
 * @returns {*}
 */
import MockPort from "../../../test/mock/MockPort";
import {DateTime} from "luxon";

export function defaultProps(props) {
  const defaultProps = {
    context: {
      port: new MockPort(),
      onGetSubscriptionKeyRequested: () => mockSubscription,
      setContext: jest.fn()
    },
    administrationWorkspaceContext: {
      must: {
        editSubscriptionKey: false,
        refreshSubscriptionKey: false
      }
    },
    dialogContext: {
      open: jest.fn()
    },
    navigationContext: {
      onGoToNewTab: jest.fn()
    }
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Format a date.
 * @string {string} date The date to format
 * @return {string}
 */
export function formatDate(date) {
  try {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
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
  "created": "2020-12-01",
  "expiry": expiredDate.toISOString(),
  "data": "data"
};

export const mockSubscriptionUsersExceeded = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 2,
  "email": "ada@passbolt.com",
  "created": "2020-12-01",
  "expiry": "2021-12-01",
  "data": "data"
};

export const mockSubscriptionGoingToExpire = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 5,
  "email": "ada@passbolt.com",
  "created": "2019-12-01",
  "expiry":  goingToExpireDate.toISOString(),
  "data": "data"
};

export const mockSubscriptionExpired = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 5,
  "email": "ada@passbolt.com",
  "created": "2019-12-01",
  "expiry": "2020-11-01",
  "data": "data"
};

export const mockSubscriptionUpdated = {
  "customer_id": "1n6BPvHRWfizhmARz",
  "subscription_id": "1n6BPvHRWfizhmARz",
  "users": 10,
  "email": "admin@passbolt.com",
  "created": "2020-12-16",
  "expiry": "2021-12-16",
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
