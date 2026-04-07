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
 * @since         5.11.0
 */

import React from "react";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export const defaultProps = (data = {}) => ({
  title: "Test title",
  subtitle: "Test subtitle",
  description: "Test description",
  icon: <span className="test-icon" />,
  processing: false,
  disabled: false,
  onClick: jest.fn(),
  showTimer: false,
  ...data,
});
