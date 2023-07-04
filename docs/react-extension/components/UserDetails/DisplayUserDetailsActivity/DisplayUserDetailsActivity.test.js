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

import {waitFor} from "@testing-library/dom";
import {
  activitiesMock,
  defaultAppContext,
  defaultProps,
  lastActivityMock
} from "./DisplayUserDetailsActivity.test.data";
import DisplayUserDetailsActivityPage from "./DisplayUserDetailsActivity.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See user activities", () => {
  const props = defaultProps();
  /**
   * Given a selected user having 4 activities
   * When I open the “Activity” section of the secondary sidebar
   * Then I should see the 4 activities made about the user
   * And I should be able to identify each activities creator
   * And I should be able to see each activities timestamps
   */
  it('As LU I can see activities of a user with at least one activity', async() => {
    const context = defaultAppContext();
    context.port.addRequestListener('passbolt.actionlogs.find-all-for', () => activitiesMock);
    const page = new DisplayUserDetailsActivityPage(context, props);
    await page.clickOnTitle();

    expect.assertions(10);
    expect(page.displayActivityList).not.toBeNull();
    expect(page.displayActivityList.length).toBe(4);

    expect(page.displayedActivityCreator(0)).toBe('Ada Lovelace');
    expect(page.displayedActivityCreator(1)).toBe('Admin admin');
    expect(page.displayedActivityCreator(2)).toBe('Ada Lovelace');
    expect(page.displayedActivityCreator(3)).toBe('Ada Lovelace');

    expect(page.displayedActivityCreationTime(0)).toBeDefined();
    expect(page.displayedActivityCreationTime(1)).toBeDefined();
    expect(page.displayedActivityCreationTime(2)).toBeDefined();
    expect(page.displayedActivityCreationTime(3)).toBeDefined();
  });

  it('I should be able to see other activities with more button', async() => {
    const dataSet = [activitiesMock, lastActivityMock];
    let currentDataSetIndex = 0;
    const context = defaultAppContext();
    context.port.addRequestListener('passbolt.actionlogs.find-all-for', () => dataSet[currentDataSetIndex++]);

    const page = new DisplayUserDetailsActivityPage(context, props);
    await page.clickOnTitle();

    expect.assertions(3);
    expect(page.moreButton).not.toBeNull();
    const expectedActivityCount = 5;
    await page.moreButtonClick(expectedActivityCount);

    expect(page.displayActivityList.length).toBe(expectedActivityCount);
    expect(page.displayedActivityCreator(4)).toBe('Admin admin');
  });

  /**
   * Given a selected user having 4 activities
   * When I open the “Activity” section of the secondary sidebar
   * And the activity are not loaded yet
   * Then I should see the loading message “Retrieving activities”
   */
  it('I should see the loading message “Retrieving activities”', async() => {
    const context = defaultAppContext();
    let resolveFindAllForRequest = null;

    context.port.addRequestListener('passbolt.actionlogs.find-all-for', () => new Promise(resolve => resolveFindAllForRequest = resolve));
    const page = new DisplayUserDetailsActivityPage(context, props);

    expect.assertions(3);
    page.clickOn(page.title);

    await waitFor(() => {});
    expect(page.progressionText.textContent).toBe("Retrieving activities");

    resolveFindAllForRequest(activitiesMock);

    await waitFor(() => {
      if (page.progressionText !== null) {
        throw new Error("Activities are still loading");
      }
    });

    expect(page.progressionText).toBeNull();
    expect(page.displayActivityList.length).toBe(4);
  });
});
