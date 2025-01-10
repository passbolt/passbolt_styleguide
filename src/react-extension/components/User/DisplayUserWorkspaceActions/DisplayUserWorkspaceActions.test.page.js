
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
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserWorkspaceActions {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if one can copy a user
   */
  get canCopy() {
    const element = this._page.container.querySelector('#copy-action');
    return Boolean(element);
  }

  /**
   * Returns true if one can edit a user
   */
  get canEdit() {
    const element = this._page.container.querySelector('#edit-user');
    return Boolean(element);
  }

  /**
   * Returns true if one can delete a user
   */
  get canDelete() {
    const element = this._page.container.querySelector('#delete-user');
    return Boolean(element);
  }

  /**
   * Returns true if one can copy permalink of a user
   */
  get canCopyPermalink() {
    const element = this._page.container.querySelector('#copy-user-permalink');
    return Boolean(element);
  }

  /**
   * Returns true if one can copy email of a user
   */
  get canCopyUserEmail() {
    const element = this._page.container.querySelector('#copy-user-email');
    return Boolean(element);
  }

  /**
   * Returns true if one can copy public key of a user
   */
  get canCopyUserPublicKey() {
    const element = this._page.container.querySelector('#copy-user-public-key');
    return Boolean(element);
  }

  /**
   * Returns true if one can resend an invite to a user
   */
  get canResendInvite() {
    const element = this._page.container.querySelector('#resend-invite-user');
    return Boolean(element);
  }

  /**
   * Returns true if one can disable user MFA
   */
  get canDisableMFA() {
    const element = this._page.container.querySelector('#disable-mfa-action');
    return Boolean(element);
  }

  /**
   * Returns true if one can review account recovery of a user
   */
  get canReviewAccountRecovery() {
    const element = this._page.container.querySelector('#review-recovery');
    return Boolean(element);
  }

  /**
   * Asks for copy actions through the dropdown
   */
  async copyActions() {
    const element = this._page.container.querySelector('#copy-action .dropdown button');
    await this.click(element);
  }

  /**
   * Copy permalink
   */
  async copyPermalink() {
    const element = this._page.container.querySelector('#copy-user-permalink');
    await this.click(element);
  }

  /**
   * Copy email address
   */
  async copyEmailAddress() {
    const element = this._page.container.querySelector('#copy-user-email');
    await this.click(element);
  }

  /**
   * Copy public key
   */
  async copyPublicKey() {
    const element = this._page.container.querySelector('#copy-user-public-key');
    await this.click(element);
  }

  /**
   * Resend invite
   */
  async resendInvite() {
    const element = this._page.container.querySelector('#resend-invite-user');
    await this.click(element);
  }

  /**
   * disable MFA
   */
  async disableMfa() {
    const element = this._page.container.querySelector('#disable-mfa-action');
    await this.click(element);
  }

  /**
   * Review account recovery
   */
  async reviewAccountRecovery() {
    const element = this._page.container.querySelector('#review-recovery');
    await this.click(element);
  }

  /**
   * click on element
   * @param element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}

