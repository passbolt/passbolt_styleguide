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

import MockPort from "../../../test/mock/MockPort";
import {DateTime} from "luxon";

/**
 * Default props
 * @returns {any}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: {
      port: new MockPort()
    },
    userWorkspaceContext: {
      details: {
        user: {
          id: "54c6278e-f824-5fda-91ff-3e946b18d994",
          pending_account_recovery_request: null
        }
      }
    },
    workflowContext: {
      start: jest.fn()
    }
  };
  return Object.assign(defaultProps, props);
}

/**
 * Format date in time ago
 * @param {string} date The date to format
 * @return {string}
 */
export function formatDateTimeAgo(date) {
  const dateTime = DateTime.fromISO(date);
  const duration = dateTime.diffNow().toMillis();
  return duration > -1000 && duration < 0 ? 'Just now' : dateTime.toRelative();
}

export const oneUserAccountRequestsPending = [{
  "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
  "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
  "status": "pending",
  "created": "2020-05-04T20:31:45+00:00",
}];

export const oneUserAccountRequestsApproved = [{
  "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
  "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
  "status": "approved",
  "created": "2020-05-04T20:31:45+00:00",
}];

export const userAccountRequestsRejectedWithPending = [
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "pending",
    "created": "2020-05-04T20:31:45+00:00",
  },
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d999",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "rejected",
    "created": "2020-05-04T20:31:45+00:00",
  }
];

export const userAccountRequestsApprovedWithPending = [
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "pending",
    "created": "2020-05-04T20:31:45+00:00",
  },
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d999",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "approved",
    "created": "2020-05-04T20:31:45+00:00",
  }
];

export const userAccountRequestsApproved = [
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "approved",
    "created": "2020-05-04T20:31:45+00:00",
  },
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d999",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "approved",
    "created": "2020-05-04T20:31:45+00:00",
  }
];

export const userAccountRequestsRejected = [
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "rejected",
    "created": "2020-05-04T20:31:45+00:00",
  },
  {
    "id": "54c6278e-f824-5fda-91ff-3e946b18d999",
    "user_id": "d4c0e643-3967-443b-93b3-102d902c4511",
    "status": "rejected",
    "created": "2020-05-04T20:31:45+00:00",
  }
];
