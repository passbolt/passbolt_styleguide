
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
 * Page object for the ConfirmResourceCommentDeletion component
 */
export default class ConfirmResourceCommentDeletionPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the dialog wrapper element
   */
  get dialog() {
    return this._container.querySelector('.comment-delete-dialog');
  }

  /**
   * Returns the confirm button
   */
  get confirmButton() {
    return this._container.querySelector('.button.primary');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /**
   * Confirm the deletion of the comment
   */
  async confirm() {
    const leftClick = {button: 0};
    fireEvent.click(this.confirmButton, leftClick);
    await waitFor(() => {});
  }
}
