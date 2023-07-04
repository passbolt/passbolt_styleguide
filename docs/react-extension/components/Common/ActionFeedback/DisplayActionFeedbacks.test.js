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
 * Unit tests on AddComponent in regard of specifications
 */

import DisplayActionFeedbacksPage from "./DisplayActionFeedbacks.test.page";
import {
  propsForDisplayTime,
  propsWithOneErrorMessage,
  propsWithOneSuccessMessage
} from "./DisplayActionFeedbacks.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

describe("Share Action Feedbacks", () => {
  let page; // The page to test against

  describe('As a LU I should see the feedback messages', () => {
    describe("As a LU I should see a success message", () => {
      /**
       * Given a success feedback message “The comment has been added successfully”
       * When the feedback message is displayed
       * Then I should see “Success: The comment has been added successfully”
       */

      beforeEach(() => {
        page = new DisplayActionFeedbacksPage(propsWithOneSuccessMessage);
      });

      it('I should see “Success: The comment has been added successfully"', () => {
        expect.assertions(1);
        expect(page.message(1)).toBe('Success: The comment has been added successfully');
      });
    });

    describe("As a LU I should see an error message", () => {
      /**
       * Given an error feedback message “An error occurred during the operation”
       * When the feedback message is displayed
       * Then I should see “Error: An error occurred during the operation”
       */

      beforeEach(() => {
        page = new DisplayActionFeedbacksPage(propsWithOneErrorMessage);
      });

      it('I should see “Error: An error occurred during the operation”', () => {
        expect.assertions(1);
        expect(page.message(1)).toBe('Error: An error occurred during the operation');
      });
    });

    describe("As a LU I should see the feedback message during 5 seconds", () => {
      /**
       * Given an error feedback message “The comment has been added successfully”
       * When the feedback message is displayed
       * Then I should not see the feedback message after 5 seconds
       */

      beforeEach(() => {
        page = new DisplayActionFeedbacksPage(propsForDisplayTime);
      });

      it('I should not see the feedback message after 5 seconds', () => {
        jest.spyOn(propsForDisplayTime.actionFeedbackContext, 'remove').mockImplementation(() => {});
        const sixSecondAfterExpectedRemoval = 6000;
        expect.assertions(1);
        setTimeout(() => {
          expect(propsForDisplayTime.actionFeedbackContext.remove).toHaveBeenCalled();
        }, sixSecondAfterExpectedRemoval);
        jest.runAllTimers();
      });
    });
  });
  describe('As a LU I should persist the feedback message display', () => {
    describe(' As a LU I should close the persisted feedback message', () => {
      /**
       * Given a feedback message “The comment has been added successfully”
       * When I mouse over the feedback message area
       * Then I should see the feedback message “The comment has been added successfully” after 5 seconds
       */
      beforeEach(() => {
        page = new DisplayActionFeedbacksPage(propsForDisplayTime);
      });

      it('I should see the feedback message “The comment has been added successfully” after 5 seconds', async() => {
        jest.spyOn(propsForDisplayTime.actionFeedbackContext, 'remove').mockImplementation(() => {}).mockClear();

        await page.persist(1);

        const oneSecondAfterExpectedRemoval = 1000;
        expect.assertions(2);
        setTimeout(() => {
          expect(propsForDisplayTime.actionFeedbackContext.remove).not.toHaveBeenCalled();
          expect(page.message(1)).toBe('Success: The comment has been added successfully');
        }, oneSecondAfterExpectedRemoval);
        jest.runAllTimers();
      });
    });
  });
  describe('As a LU I should close the persisted feedback message', () => {
    describe('As a LU I should close the persisted feedback message', () => {
      /**
       * Given a persisted feedback message “The comment has been added successfully”
       * When I close the feedback message
       * Then I should not see the feedback message anymore
       */

      beforeEach(() => {
        page = new DisplayActionFeedbacksPage(propsForDisplayTime);
      });

      it('I should not see the feedback message anymore', async() => {
        jest.spyOn(propsForDisplayTime.actionFeedbackContext, 'remove').mockImplementation(() => {}).mockClear();

        const twoSecondsAfterExpectedRemoval = 2000;
        expect.assertions(1);
        setTimeout(() => {
          const firstFeedback = propsWithOneSuccessMessage.actionFeedbackContext.feedbacks[0];
          expect(propsForDisplayTime.actionFeedbackContext.remove).toHaveBeenCalledWith(firstFeedback);
        }, twoSecondsAfterExpectedRemoval);

        await page.persist(1);
        await page.close(1);
        jest.runAllTimers();
      });
    });
  });
});
