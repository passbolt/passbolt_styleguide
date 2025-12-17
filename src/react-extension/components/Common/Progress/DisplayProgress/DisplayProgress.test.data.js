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

import {
  infiniteProgressBarProgressContext,
  progressiveProgressBarProgressContext,
} from "../../../../contexts/ProgressContext.test.data";

/**
 * Returns the default props for the unit test
 * @param {object} props Props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    progressContext: infiniteProgressBarProgressContext(),
    ...props,
  };
}

/**
 * Returns the props with a progressive progress bar.
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithProgressiveProgressBar(props = {}) {
  return defaultProps({
    progressContext: progressiveProgressBarProgressContext(),
    ...props,
  });
}
