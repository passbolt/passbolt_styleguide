
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


import {fireEvent, waitFor} from "@testing-library/react";

/**
 * The FilterUsersByGroupContextualMenu component represented as a page
 */
export default class FilterUsersByGroupContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the all group menu
   */
  get allGroupMenu() {
    return this._container.querySelector('#all-groups');
  }

  /**
   * Returns the group manage
   */
  get groupManageMenu() {
    return this._container.querySelector('#groups-manage');
  }

  /**
   * Returns the group manage
   */
  get groupMemberMenu() {
    return this._container.querySelector('#groups-member');
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
