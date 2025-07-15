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
import {waitFor} from "@testing-library/react";

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
     */
    it('I should see an error toaster if the activities do not load due to an unexpected error', async() => {
      expect.assertions(2);

      const error = {message: "Unable to reach the server, an unexpected error occurred"};
      mockContextRequest(() => Promise.reject(error));
      page = new DisplayResourceDetailsActivityPage(context, props);

      await waitFor(() => {});
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(error.message);
    });
  });
});
