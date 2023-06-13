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
 * Unit tests on DeleteComment in regard of specifications
 */

import {administratorAppContext, commentsMock, defaultAppContext, defaultProps} from "./DeleteComment.test.data";
import DisplayResourceDetailsPage from "../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetailsComment.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  jest.resetModules();
});

describe("Delete comments", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const administratorContext = administratorAppContext(); // The applicative context as administrator
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const noneCommentFoundRequestMockImpl = jest.fn(() => Promise.resolve([]));
  const commentsFoundRequestMockImpl = jest.fn(() => Promise.resolve(commentsMock));

  describe("As AD I should be able to delete comments I don’t own", () => {
    describe('As AD I can delete a comment I don’t own', () => {
      /**
       * Given I am deleting a comment I don’t own
       * When I confirm the deletion
       * Then The comment should be removed from the comments list
       * And I should be notified that the comment has been deleted
       */

      beforeEach(() => {
        page = new DisplayResourceDetailsPage(administratorContext, props);
        mockContextRequest(administratorContext, commentsFoundRequestMockImpl);
      });

      it('I should not be able to delete the comment', async() => {
        /*
         * @todo the API doesn't yet support this scenario.
         * await page.title.click();
         * expect(page.displayCommentList.canDelete(2)).toBeTruthy();
         */
      });
    });
  });
  describe('As LU I should be able to delete my comment', () => {
    describe('Remove comment from the list', () => {
      /**
       * Given I am deleting a comment
       * When I confirm the deletion
       * Then the comment should be removed from the comments list
       */

      let requestMock;

      beforeEach(() => {
        page = new DisplayResourceDetailsPage(context, props);
        requestMock = mockContextRequest(context, commentsFoundRequestMockImpl).mockClear();
      });

      it('the comment should be removed from the comments list', async() => {
        await page.title.click();
        await page.displayCommentList.delete(1);
        expect(page.confirmDeleteComment.exists()).toBeTruthy();

        await page.confirmDeleteComment.confirm();

        const requestName = requestMock.mock.calls[requestMock.mock.calls.length - 2][0];
        const deletedCommentId = requestMock.mock.calls[requestMock.mock.calls.length - 2][1];
        expect(requestName).toBe('passbolt.comments.delete');
        expect(deletedCommentId).toBe(context.resourceCommentId);
      });
    });

    describe('Remove the only one comment of a resource', () => {
      /**
       * Given a resource with only one comment
       * And I don’t own the comment
       * When I ask for the deletion of the comment
       * Then it should ask me for confirmation
       * When I confirm the deletion
       * Then the comment should be removed from the comments list
       * And I should prompt to insert a new comment
       */

      beforeEach(() => {
        page = new DisplayResourceDetailsPage(context, props);
        mockContextRequest(context, commentsFoundRequestMockImpl);
      });

      it('I should prompt to insert a new comment', async() => {
        await page.title.click();
        await page.displayCommentList.delete(1);

        // Simulate an empty list after deletion
        mockContextRequest(context, noneCommentFoundRequestMockImpl);

        await page.confirmDeleteComment.confirm();
        expect(page.addComment.exists()).toBeTruthy();
      });
    });

    describe('See notification after removing a comment', () => {
      /**
       * Given I am deleting a comment
       * When I confirm the deletion
       * Then I should be notified about the success of the operation
       */

      beforeEach(() => {
        page = new DisplayResourceDetailsPage(context, props);
        mockContextRequest(context, commentsFoundRequestMockImpl);
      });

      it('I should be notified about the success of the operation', async() => {
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
        await page.title.click();
        await page.displayCommentList.delete(1);
        await page.confirmDeleteComment.confirm();
        expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      });
    });

    describe('Cannot delete a comment I don’t own', () => {
      /**
       * Given a selected resource which has comments I don’t own
       * When I intends to remove a comment I don’t own
       * Then I should not be able to delete the comment
       */

      beforeEach(() => {
        page = new DisplayResourceDetailsPage(context, props);
        mockContextRequest(context, commentsFoundRequestMockImpl);
      });

      it('I should not be able to delete the comment', async() => {
        await page.title.click();
        expect(page.displayCommentList.canDelete(2)).toBeFalsy();
      });
    });
  });
});
