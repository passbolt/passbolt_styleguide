
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
 * The FilterResourcesByTagsContextualMenu component represented as a page
 */
export default class FilterResourcesByTagsContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the SidebarTagFilterSectionContextualMenu Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the all tag menu
   */
  get allTagMenu() {
    return this._container.querySelector('#all-tag');
  }

  /**
   * Returns the personal tag menu
   */
  get personalTagMenu() {
    return this._container.querySelector('#personal-tag');
  }

  /**
   * Returns the shared tag menu
   */
  get sharedTagMenu() {
    return this._container.querySelector('#shared-tag');
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
