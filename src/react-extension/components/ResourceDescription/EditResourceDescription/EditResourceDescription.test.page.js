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
 * The EditResourceDescription component represented as a page
 */
export default class EditResourceDescriptionPageObject {
  /**
   * Default constructor
   * @param container The container which includes the DescriptionEditor Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the description editor element
   */
  get component() {
    return this._container.querySelector('.description-editor');
  }

  /**
   * Returns the textarea input element
   */
  get descriptionInput() {
    return this._container.querySelector('.input.textarea.required textarea');
  }

  /**
   * Returns the error message content
   */
  get errorMessage() {
    return this._container.querySelector('.feedbacks.error-message').textContent;
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._container.querySelector('.description-editor-submit');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._container.querySelector('.cancel.button');
  }
}
