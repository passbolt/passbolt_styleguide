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

import {
  defaultProps, formatDateTimeAgo, oneUserAccountRequestsApproved, oneUserAccountRequestsPending,
  userAccountRequestsApproved, userAccountRequestsRejectedWithPending
} from "./DisplayUserDetailsAccountRecovery.test.data";
import DisplayUserDetailsAccountRecoveryPage from "./DisplayUserDetailsAccountRecovery.test.page";
import HandleReviewAccountRecoveryRequestWorkflow from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";

/**
 * Unit tests on DisplayUserDetailsAccountRecovery in regard of specifications
 */
beforeEach(() => {
  jest.resetModules();
});

describe("See account recovery", () => {
  let page; // The page to test against

  describe(' As LU I can see user account recovery requests during pending', () => {
    const userWithPending = {
      userWorkspaceContext: {
        details: {
          user: {
            id: "54c6278e-f824-5fda-91ff-3e946b18d994",
            pending_account_recovery_request: {"status": "pending"}
          }
        }
      }
    };
    const props = defaultProps(userWithPending); // The props to pass

    const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
    it('I should see the user account recovery request during pending status', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve(oneUserAccountRequestsPending));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.title).toBe('Account recovery');
      expect(page.currentStatus).toBe('Current status');
      expect(page.currentStatusButton.textContent).toBe('Review');
      expect(page.previousRecoveryRequest).toBe('Never');
      expect(page.numberOfRecovery).toBe('1');
    });

    it('I should see the user account recovery previous request during pending status', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve(userAccountRequestsRejectedWithPending));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.currentStatus).toBe('Current status');
      expect(page.currentStatusButton.textContent).toBe('Review');
      expect(page.previousRecoveryRequest).toBe(`Rejected ${formatDateTimeAgo(userAccountRequestsRejectedWithPending[1].created)}`);
      expect(page.numberOfRecovery).toBe('2');
    });

    it('I should review the user account recovery request during pending status', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve(oneUserAccountRequestsPending));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.currentStatusButton.textContent).toBe('Review');
      await page.reviewAccountRecovery();
      const accountRecoveryRequestId = props.userWorkspaceContext.details.user.pending_account_recovery_request.id;
      expect(props.workflowContext.start).toHaveBeenLastCalledWith(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequestId});
    });
  });

  describe(' As LU I can see user account recovery requests', () => {
    const props = defaultProps(); // The props to pass

    const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);

    it('I should see the user account recovery request', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve(oneUserAccountRequestsApproved));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.currentStatusButton).toBeNull();
      expect(page.previousRecoveryRequest).toBe(`Approved ${formatDateTimeAgo(oneUserAccountRequestsApproved[0].created)}`);
      expect(page.numberOfRecovery).toBe('1');
    });

    it('I should see the user account recovery previous request', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve(userAccountRequestsApproved));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.title).toBe('Account recovery');
      expect(page.currentStatusButton).toBeNull();
      expect(page.previousRecoveryRequest).toBe(`Approved ${formatDateTimeAgo(userAccountRequestsApproved[1].created)}`);
      expect(page.numberOfRecovery).toBe('2');
    });

    it('I should see user account recovery request with 0 request', async() => {
      const userAccountRecoveryRequestMockImpl = jest.fn(() => Promise.resolve([]));
      mockContextRequest(userAccountRecoveryRequestMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
      await page.toggleCollapse();

      expect(page.title).toBe('Account recovery');
      expect(page.currentStatusButton).toBeNull();
      expect(page.previousRecoveryRequest).toBe('Never');
      expect(page.numberOfRecovery).toBe('0');
    });
  });

  describe(' As LU I see a loading state when the activity are not loaded', () => {
    let findResolve;
    const loadingFindMockImpl = jest.fn(() => new Promise(resolve => {
      findResolve = resolve;
    }));
    const props = defaultProps(); // The props to pass

    const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);

    beforeEach(() => {
      mockContextRequest(loadingFindMockImpl);
      page = new DisplayUserDetailsAccountRecoveryPage(props);
    });

    it('I should see the loading message “Retrieving account recovery”', async() => {
      await page.toggleCollapse();

      const inProgressFn = () => {
        expect(page.isLoading()).toBeTruthy();
        findResolve([]);
      };
      await page.waitForLoading(inProgressFn);
      expect(page.isLoading()).toBeFalsy();
    });
  });
});
