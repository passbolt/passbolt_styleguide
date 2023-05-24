
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
 * The EditResourceTags component represented as a page
 */
export default class EditResourceTagsPageObject {
  /**
   * Default constructor
   * @param container The container which includes the TagEditor Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the tag editor element
   */
  get component() {
    return this._container.querySelector('.tag-editor-input');
  }

  /**
   * Returns the notice message element
   */
  get noticeMessage() {
    return this._container.querySelector('.message.notice');
  }

  /**
   * Returns the error message content
   */
  get errorMessage() {
    return this._container.querySelector('.error-message').textContent;
  }

  /**
   * Returns the delete icon tag element
   */
  get deleteTag() {
    return this._container.querySelector('.tag-delete');
  }

  /**
   * Returns the autocomplete content element
   */
  get autocompleteContent() {
    return this._container.querySelector('.autocomplete-content');
  }

  /**
   * Returns the autocomplete tag element for the 'index' one
   */
  autocompleteItem(index) {
    return this._container.querySelectorAll('.autocomplete-item')[index - 1];
  }

  /**
   * Returns the autocomplete tag name element for the 'index' one
   */
  autocompleteItemName(index) {
    return this._container.querySelectorAll('.autocomplete-item')[index - 1].querySelector('.name');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._container.querySelector('.tag-editor-submit');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._container.querySelector('.tag-editor-cancel');
  }

  /**
   * Returns the number of displayed tags
   */
  count() {
    return this._container.querySelectorAll('.tag-content').length;
  }

  /**
   * Returns the displayed tag name for the 'index' one
   * @param index The display rank of name's tag
   */
  name(index) {
    return this._container.querySelectorAll('.tag-content')[index - 1].textContent;
  }
}
