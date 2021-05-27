
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
 * Page object for the AddResourceComment component
 */
export default class AddResourceCommentPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the form element
   */
  get form() {
    return this._container.querySelector('form.comment');
  }

  /**
   * Returns the textarea element
   */
  get textarea() {
    return this.form.querySelector('textarea');
  }

  /**
   * Returns the button to save
   */
  get saveButton() {
    return this.form.querySelector('.button.comment-submit');
  }

  /**
   * Returns the button to cancel
   */
  get cancelButton() {
    return this.form.querySelector('.button.cancel');
  }

  /**
   * Returns the error message element
   */
  get errorMessage() {
    return this.form.querySelector('.error-message');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.form !== null;
  }

  /**
   * Returns true if the focus is on the textarea
   */
  hasFocus() {
    return this.textarea === document.activeElement;
  }

  /**
   * Returns true if the Too Long Comment message is displayed
   */
  isTooLong() {
    return this.errorMessage.textContent === 'A comment must be less than 256 characters';
  }

  /**
   * Returns true if the Is Empty Comment message is displayed
   */
  isEmpty() {
    return this.errorMessage.textContent === 'A comment is required.';
  }

  /**
   * Returns true if the Technical Error message is displayed
   * @param message The technical error message
   */
  hasTechnicalError(message) {
    return this.errorMessage.textContent === message;
  }

  /**
   * Returns true if the the component is in a disable state
   */
  isDisabled() {
    return this.exists() &&
            this.textarea.hasAttribute('disabled') &&
            this.saveButton.hasAttribute('disabled') &&
            this.cancelButton.hasAttribute('disabled');
  }
  /**
   * Write a text in the comment area
   * @param {string} content
   */
  async write(text) {
    this.textarea.focus();
    fireEvent.change(this.textarea, {target: {textContent: text}});
    await waitFor(() => {});
  }

  /**
   * Save the new comment
   * @param inProgressFn Function to call while saving
   * @returns {Promise<void>}
   */

  async save(inProgressFn) {
    const leftClick = {button: 0};
    fireEvent.click(this.saveButton, leftClick);
    await waitFor(inProgressFn || (() => {}));
  }

  /**
   * Cancels the add operation
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Press the escape key
   */
  async escape() {
    const escapeKeyPressed = {keyCode: 27};
    this.textarea.focus();
    fireEvent.keyDown(this.textarea, escapeKeyPressed);
    await waitFor(() => {});
  }
}
