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


import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayUserWorkspaceActions from "./DisplayUserWorkspaceActions";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserWorkspaceActionsPage component represented as a page
 */
export default class DisplayUserWorkspaceActionsPage {
  /**
   * Creates an instance of DisplayUserWorkspaceActionsPage.
   * @param {Object} props - The properties to attach to the component
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserWorkspaceActions {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Checks if user can be copied
   * @returns {boolean} True if copy action is available
   */
  get canCopy() {
    const element = this._page.container.querySelector('#copy-action');
    return Boolean(element);
  }

  /**
   * Helper method to find the more actions dropdown
   * @returns {HTMLElement|null} The dropdown element or null if not found
   */
  get _getMoreActionsDropdown() {
    return this._page.container.querySelector('.more.button-action-contextual');
  }

  /**
   * Helper method to check if an action is available in the more actions dropdown
   * @param {string} selector - The selector for the action button
   * @returns {Promise<boolean>} True if the action is available
   */
  async _canPerformAction(selector) {
  // First check if the more actions dropdown exists
    if (!this.hasMoreActionsDropdown) {
      return false;
    }
    // Open the dropdown
    await this.openMoreActionsDropdown();
    // Now check for the action button
    const element = this._page.container.querySelector(selector);
    return Boolean(element);
  }

  /**
   * Checks if more actions dropdown exists
   * @returns {boolean} True if dropdown exists
   */
  get hasMoreActionsDropdown() {
    return Boolean(this._getMoreActionsDropdown);
  }

  /**
   * Opens the more actions dropdown
   * @returns {Promise<void>}
   */
  async openMoreActionsDropdown() {
    const dropdown = this._getMoreActionsDropdown;
    if (dropdown) {
      const leftClick = {button: 0};
      fireEvent.click(dropdown, leftClick);
      await waitFor(() => {});
    }
  }

  /**
   * Checks if user can be edited
   * @returns {boolean} True if edit action is available
   */
  get canEdit() {
    const element = this._page.container.querySelector('#edit-user');
    return Boolean(element);
  }

  /**
   * Checks if user can be deleted
   * @returns {Promise<boolean>} True if delete action is available
   */
  async canDelete() {
    return this._canPerformAction('#delete-user');
  }

  /**
   * Checks if user permalink can be copied
   * @returns {boolean} True if copy permalink action is available
   */
  get canCopyPermalink() {
    const element = this._page.container.querySelector('#copy-user-permalink');
    return Boolean(element);
  }

  /**
   * Checks if user email can be copied
   * @returns {boolean} True if copy email action is available
   */
  get canCopyUserEmail() {
    const element = this._page.container.querySelector('#copy-user-email');
    return Boolean(element);
  }

  /**
   * Checks if user public key can be copied
   * @returns {boolean} True if copy public key action is available
   */
  get canCopyUserPublicKey() {
    const element = this._page.container.querySelector('#copy-user-public-key');
    return Boolean(element);
  }

  /**
   * Checks if invite can be resent
   * @returns {boolean} True if resend invite action is available
   */
  get canResendInvite() {
    const element = this._page.container.querySelector('#resend-invite-user');
    return Boolean(element);
  }

  /**
   * Determines whether the option to disable MFA is present in the more actions dropdown
   * @returns {Promise<boolean>} True if disable MFA action is available
   */
  async canDisableMFA() {
    return this._canPerformAction('#disable-mfa-action');
  }

  /**
   * Checks if account recovery can be reviewed
   * @returns {boolean} True if review recovery action is available
   */
  get canReviewAccountRecovery() {
    const element = this._page.container.querySelector('#review-recovery');
    return Boolean(element);
  }

  /**
   * Checks if metadata keys can be shared
   * @returns {boolean} True if share metadata keys action is available
   */
  get canShareMissingMetadataKeys() {
    const element = this._page.container.querySelector('#share-metadata-keys');
    return Boolean(element);
  }

  /**
   * Checks if user can be removed from group
   * @returns {boolean} True if remove from group action is available
   */
  get canRemoveFromGroup() {
    const element = this._page.container.querySelector('#remove-user-from-group');
    return Boolean(element);
  }

  /**
   * Gets the remove from group button
   * @returns {HTMLElement|null} The button element or null if not found
   */
  get removeFromGroupButton() {
    return this._page.container.querySelector('#remove-user-from-group');
  }

  /**
   * Removes user from group
   * @returns {Promise<void>}
   */
  async removeFromGroup() {
    const button = this.removeFromGroupButton;
    const leftClick = {button: 0};
    fireEvent.click(button, leftClick);
    await waitFor(() => {});
  }

  /**
   * Opens copy actions dropdown
   * @returns {Promise<void>}
   */
  async copyActions() {
    const element = this._page.container.querySelector('#copy-action .dropdown button');
    await this.click(element);
  }

  /**
   * Copies user permalink
   * @returns {Promise<void>}
   */
  async copyPermalink() {
    const element = this._page.container.querySelector('#copy-user-permalink');
    await this.click(element);
  }

  /**
   * Copies user email address
   * @returns {Promise<void>}
   */
  async copyEmailAddress() {
    const element = this._page.container.querySelector('#copy-user-email');
    await this.click(element);
  }

  /**
   * Copies user public key
   * @returns {Promise<void>}
   */
  async copyPublicKey() {
    const element = this._page.container.querySelector('#copy-user-public-key');
    await this.click(element);
  }

  /**
   * Resends invite to user
   * @returns {Promise<void>}
   */
  async resendInvite() {
    const element = this._page.container.querySelector('#resend-invite-user');
    await this.click(element);
  }

  /**
   * Disables MFA for user
   * @returns {Promise<void>}
   */
  async disableMfa() {
    await this.openMoreActionsDropdown();
    const element = this._page.container.querySelector('#disable-mfa-action');
    await this.click(element);
  }

  /**
   * Reviews account recovery for user
   * @returns {Promise<void>}
   */
  async reviewAccountRecovery() {
    const element = this._page.container.querySelector('#review-recovery');
    await this.click(element);
  }

  /**
   * Shares metadata keys with user
   * @returns {Promise<void>}
   */
  async shareMetadataKeys() {
    const element = this._page.container.querySelector('#share-metadata-keys');
    await this.click(element);
  }


  /**
   * Clicks on an element
   * @param {HTMLElement} element - The element to click
   * @returns {Promise<void>}
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
