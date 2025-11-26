/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on DisplayResourceDetailsActivity in regard of specifications
 */

import {
  activitiesMock,
  defaultAppContext,
  defaultProps,
  lastActivityMock
} from "./DisplayResourceDetailsActivity.test.data";
import DisplayResourceDetailsActivityPage from "./DisplayResourceDetailsActivity.test.page";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import {act} from "react";

beforeEach(() => {
  jest.resetModules();
});

describe("See activities", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const activitiesFoundRequestMockImpl = jest.fn(() => Promise.resolve(activitiesMock));

  const activitiesMoreFoundRequestMockImpl = jest.fn(() => Promise.resolve(lastActivityMock));


  describe(' As LU I can see activities of a resource with at least one activity', () => {
    /**
     * Given a selected resource having 4 activities
     * When I open the “Activity” section of the secondary sidebar
     * Then I should see the 4 activities made on the resource
     * And I should see the comments sorted from the most recent to the oldest
     * And I should be able to identify each activities creator
     * And I should be able to see each activities timestamps
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsActivityPage(context, props);
      mockContextRequest(activitiesFoundRequestMockImpl);
    });

    it('I should see the 4 activities made on the resource', async() => {
      expect.assertions(2);
      const page = new DisplayResourceDetailsActivityPage(context, props);
      mockContextRequest(activitiesFoundRequestMockImpl);

      await waitForTrue(() => Boolean(page.displayActivityList.creator(1)));

      expect(page.displayActivityList.exists()).toBeTruthy();
      expect(page.displayActivityList.count()).toBe(4);
    });

    it('I should be able to identify each activity creators', async() => {
      expect.assertions(4);

      expect(page.displayActivityList.creator(1)).toBe('Admin User');
      expect(page.displayActivityList.creator(2)).toBe('Ada User');
      expect(page.displayActivityList.creator(3)).toBe('Admin Ada');
      expect(page.displayActivityList.creator(4)).toBe('Admin User4');
    });

    it('I should be able to see each activity timestamps', async() => {
      expect.assertions(4);

      expect(page.displayActivityList.creationTime(1)).toBeDefined();
      expect(page.displayActivityList.creationTime(2)).toBeDefined();
      expect(page.displayActivityList.creationTime(3)).toBeDefined();
      expect(page.displayActivityList.creationTime(4)).toBeDefined();
    });

    it('I should be able to see each other activities with more button ', async() => {
      expect.assertions(4);
      mockContextRequest(activitiesMoreFoundRequestMockImpl);

      expect(page.displayActivityList.moreButtonExists()).toBeTruthy();

      await page.displayActivityList.moreButtonClick();
      expect(page.displayActivityList.count()).toBe(5);
      expect(page.displayActivityList.creator(5)).toBe('Admin User');
      expect(!page.displayActivityList.moreButtonExists()).toBeTruthy();
    });
  });

  describe(' As LU I see a loading state when the activity are not loaded', () => {
    /**
     * Given a selected resource having 4 activities
     * When I open the “Activity” section of the secondary sidebar
     * And the activity are not loaded yet
     * Then I should see the loading message “Retrieving activities”
     */

    let findResolve;
    const loadingFindMockImpl = jest.fn(() => new Promise(resolve => {
      findResolve = resolve;
    }));

    beforeEach(() => {
      mockContextRequest(loadingFindMockImpl);
      page = new DisplayResourceDetailsActivityPage(context, props);
    });

    it('I should see the loading message “Retrieving activities”', async() => {
      expect.assertions(2);

      const inProgressFn = () => {
        expect(page.displayActivityList.isLoading()).toBeTruthy();
        findResolve([]);
      };
      await page.displayActivityList.waitForLoading(inProgressFn);
      expect(page.displayActivityList.isLoading()).toBeFalsy();
    });
  });

  describe('As a logged in user, I should see an error displayed when there is an unexpected error', () => {
    /**
     * When I open the “Activity” section of the secondary sidebar
     * And the activities are not loaded due to an unexpected error
     * Then I should see an appropriate error message.
     * I should still be able to see the more button
     * Clicking on more button should retry the fetch with activities Page value 1
     */
    it('I should see an error toaster if the activities do not load due to an unexpected error', async() => {
      expect.assertions(6);

      const error = {message: "Unable to reach the server, an unexpected error occurred"};
      const mockRequest = jest.fn(() => Promise.reject(error));
      mockContextRequest(mockRequest);
      await act(
        async() => page = new DisplayResourceDetailsActivityPage(context, props)
      );

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(error.message);
      expect(page.displayActivityList.moreButtonExists()).toBeTruthy();

      await page.displayActivityList.moreButtonClick();
      expect(mockRequest).toHaveBeenCalledTimes(2);
      // Get the arguments for the first and second calls
      const firstCallArgs = mockRequest.mock.calls[0];
      const secondCallArgs = mockRequest.mock.calls[1];

      expect(secondCallArgs).toEqual(firstCallArgs);

      expect(firstCallArgs).toEqual([
        "passbolt.actionlogs.find-all-for",
        "Resource",
        props.resourceWorkspaceContext.details.resource.id,
        {limit: 5, page: 1}
      ]);
    });

    /**
     * When I click on 'more' of the 'Activity' section of the secondary sidebar
     * The fetch should be called with activitiesPage value 2
     * And the activities are not loaded due to an unexpected error
     * Then I should see an appropriate error message.
     * Clicking on 'more' button again should call fetch activitiesPage value 2
     */
    it('When I click on more button and activities are not loaded due to unexpected error ', async() => {
      expect.assertions(6);
      mockContextRequest(activitiesFoundRequestMockImpl);
      page = new DisplayResourceDetailsActivityPage(context, props);
      await waitForTrue(() => page.displayActivityList.moreButtonExists());

      const error = {message: "Unable to reach the server, an unexpected error occurred"};
      const mockRequest = jest.fn(() => Promise.reject(error));
      mockContextRequest(mockRequest);

      // click on more button - here the activities page value should be 2 and they are not loaded
      await page.displayActivityList.moreButtonClick();

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalled();
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(error.message);
      expect(page.displayActivityList.moreButtonExists()).toBeTruthy();

      // click on more button again after error display
      await page.displayActivityList.moreButtonClick();

      expect(mockRequest).toHaveBeenCalledTimes(2);
      const firstCallArgs = mockRequest.mock.calls[0];
      const secondCallArgs = mockRequest.mock.calls[1];

      expect(secondCallArgs).toEqual(firstCallArgs);

      // the page is still 2 as it did not load with page : 2 initially
      expect(firstCallArgs).toEqual([
        "passbolt.actionlogs.find-all-for",
        "Resource",
        props.resourceWorkspaceContext.details.resource.id,
        {limit: 5, page: 2}
      ]);
    });
  });
});
