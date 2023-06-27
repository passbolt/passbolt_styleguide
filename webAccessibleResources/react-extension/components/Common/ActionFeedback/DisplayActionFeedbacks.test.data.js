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
 *  Props with one successful feedback
 */
export const propsWithOneSuccessMessage = {
  actionFeedbackContext: {
    feedbacks: [{type: 'success', message: "The comment has been added successfully"}],
    remove: () => {}
  }
};

/**
 *  Props with one error feedback
 */
export const propsWithOneErrorMessage = {
  actionFeedbackContext: {
    feedbacks: [{type: 'error', message: "An error occurred during the operation"}],
    remove: () => {}
  }
};

/**
 * Props for checking the 5 seconds display
 */
export const propsForDisplayTime = {
  actionFeedbackContext: {
    feedbacks: [{type: 'success', message: "The comment has been added successfully"}],
    remove: () => {}
  }
};

/**
 * Props with multiple action feedback
 */
export const propsWithMultipleFeedbacks = {
  actionFeedbackContext: {
    feedbacks: [
      {type: 'success', message: "The comment has been added successfully"},
      {type: 'error', message: "An error occurred during the operation"}
    ]
  }
};
