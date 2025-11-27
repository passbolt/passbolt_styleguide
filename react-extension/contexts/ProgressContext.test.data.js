/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import {defaultDialogContext} from "./DialogContext.test.data";

/**
 * Returns the default progress context props
 * @param {object} props Props to override
 * @returns {object}
 */
export function defaultProps(context = {}) {
  return {
    dialogContext: defaultDialogContext(),
    ...context
  };
}

/**
 * Returns the default progress context for the unit test
 * @param {object} context Context to override
 * @returns {object}
 */
export function defaultProgressContext(context = {}) {
  return {
    progressDialogProps: null,
    dialogIndex: null,
    open: jest.fn(),
    updateMessage: jest.fn(),
    updateGoals: jest.fn(),
    close: jest.fn(),
    ...context
  };
}

/**
 * Returns the infinite progress bar progress context for the unit test
 * @param {object} context Context to override
 * @returns {object}
 */
export function infiniteProgressBarProgressContext(context = {}) {
  return defaultProgressContext({
    progressDialogProps: {
      title: "Progress dialog test title",
    },
    ...context
  });
}

/**
 * Returns the progressive progress bar progress context for the unit test
 * @param {object} context Context to override
 * @returns {object}
 */
export function progressiveProgressBarProgressContext(context = {}) {
  return defaultProgressContext({
    progressDialogProps: {
      title: "Progress dialog &#x2F; test title",
      goals: 2,
      message: "Step &#x2F; 0",
      completed: 0
    },
    ...context
  });
}
