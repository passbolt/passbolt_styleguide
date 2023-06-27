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
 * Unit tests on DisplayComments in regard of specifications
 */

import {commentsMock, defaultAppContext, defaultProps} from "./DisplayResourceCommentList.test.data";
import DisplayResourceCommentListPage from "../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetailsComment.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See comments", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const commentsFoundRequestMockImpl = jest.fn(() => Promise.resolve(commentsMock));

  describe(' As LU I can see the comments of a resource with at least one comment', () => {
    /**
     * Given a selected resource having 3 comments
     * When I open the “Comments” section of the secondary sidebar
     * Then I should see the 3 comments made on the resource
     * And I should see the comments sorted from the most recent to the oldest
     * And I should be able to identify each comments authors
     * And I should be able to see each comments timestamps
     */

    beforeEach(() => {
      page = new DisplayResourceCommentListPage(context, props);
      mockContextRequest(commentsFoundRequestMockImpl);
    });

    it('I should see the 3 comments made on the resource', async() => {
      await page.title.click();

      expect(page.displayCommentList.exists()).toBeTruthy();
      expect(page.displayCommentList.count()).toBe(3);
    });

    it('I should see the comments sorted from the most recent to the oldest', async() => {
      await page.title.click();

      expect(page.displayCommentList.author(1)).toBe('Carol Shaw');
      expect(page.displayCommentList.author(2)).toBe('Betty Holberton');
      expect(page.displayCommentList.author(3)).toBe('Ada Lovelace');
    });

    it('I should be able to identify each comments authors', async() => {
      await page.title.click();

      expect(page.displayCommentList.author(1)).toBe('Carol Shaw');
      expect(page.displayCommentList.author(2)).toBe('Betty Holberton');
      expect(page.displayCommentList.author(3)).toBe('Ada Lovelace');
    });

    it('I should be able to see each comments timestamps', async() => {
      await page.title.click();

      expect(page.displayCommentList.creationTime(1)).toBeDefined();
      expect(page.displayCommentList.creationTime(2)).toBeDefined();
      expect(page.displayCommentList.creationTime(3)).toBeDefined();
    });
  });

  describe(' As LU I see a loading state when the comments are not loaded\n', () => {
    /**
     * Given a selected resource having 3 comments
     * When I open the “Comments” section of the secondary sidebar
     * And the comment are not loaded yet
     * Then I should see the loading message “Retrieving comments”
     */

    let findResolve;
    const loadingFindMockImpl = jest.fn(() => new Promise(resolve => { findResolve = resolve; }));

    beforeEach(() => {
      page = new DisplayResourceCommentListPage(context, props);
      mockContextRequest(loadingFindMockImpl);
    });

    it('I should see the loading message “Retrieving comments”', async() => {
      await page.title.click();

      const inProgressFn = () => {
        expect(page.displayCommentList.isLoading()).toBeTruthy();
        findResolve([]);
      };
      await page.displayCommentList.waitForLoading(inProgressFn);
      expect(page.displayCommentList.isLoading()).toBeFalsy();
    });
  });
});
