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
import AppContext from "../../../contexts/AppContext";
import React from "react";
import DisplayEmailNotificationsAdministration from "./DisplayEmailNotificationsAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayEmailNotificationsAdministration component represented as a page
 */
export default class DisplayEmailNotificationsAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayEmailNotificationsAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  rerender(appContext, props) {
    this._page.rerender(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayEmailNotificationsAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the totp input element
   */
  get emailNotificationsSettings() {
    return this._page.container.querySelector('.email-notification-settings');
  }

  /**
   * Returns the password create input element
   */
  get passwordCreate() {
    return this._page.container.querySelector('#send-password-create-toggle-button');
  }

  /**
   * Returns the password update input element
   */
  get passwordUpdate() {
    return this._page.container.querySelector('#send-password-update-toggle-button');
  }

  /**
   * Returns the password delete input element
   */
  get passwordDelete() {
    return this._page.container.querySelector('#send-password-delete-toggle-button');
  }

  /**
   * Returns the password share input element
   */
  get passwordShare() {
    return this._page.container.querySelector('#send-password-share-toggle-button');
  }

  /**
   * Returns the folder create input element
   */
  get folderCreate() {
    return this._page.container.querySelector('#send-folder-create-toggle-button');
  }

  /**
   * Returns the folder create input element
   */
  get folderUpdate() {
    return this._page.container.querySelector('#send-folder-update-toggle-button');
  }

  /**
   * Returns the folder delete input element
   */
  get folderDelete() {
    return this._page.container.querySelector('#send-folder-delete-toggle-button');
  }

  /**
   * Returns the folder share input element
   */
  get folderShare() {
    return this._page.container.querySelector('#send-folder-share-toggle-button');
  }

  /**
   * Returns the comment add input element
   */
  get commentAdd() {
    return this._page.container.querySelector('#send-comment-add-toggle-button');
  }

  /**
   * Returns the group delete input element
   */
  get groupDelete() {
    return this._page.container.querySelector('#send-group-delete-toggle-button');
  }

  /**
   * Returns the group user add input element
   */
  get groupUserAdd() {
    return this._page.container.querySelector('#send-group-user-add-toggle-button');
  }

  /**
   * Returns the group user delete input element
   */
  get groupUserDelete() {
    return this._page.container.querySelector('#send-group-user-delete-toggle-button');
  }

  /**
   * Returns the group user update input element
   */
  get groupUserUpdate() {
    return this._page.container.querySelector('#send-group-user-update-toggle-button');
  }

  /**
   * Returns the group manager update input element
   */
  get groupManagerUpdate() {
    return this._page.container.querySelector('#send-group-manager-update-toggle-button');
  }

  /**
   * Returns the userCreate input element
   */
  get userCreate() {
    return this._page.container.querySelector('#send-user-create-toggle-button');
  }

  /**
   * Returns the userCreate input element
   */
  get userRecover() {
    return this._page.container.querySelector('#send-user-recover-toggle-button');
  }

  /**
   * Returns the show username input element
   */
  get showUsername() {
    return this._page.container.querySelector('#show-username-toggle-button');
  }

  /**
   * Returns the show uri input element
   */
  get showUri() {
    return this._page.container.querySelector('#show-uri-toggle-button');
  }

  /**
   * Returns the show secret input element
   */
  get showSecret() {
    return this._page.container.querySelector('#show-secret-toggle-button');
  }

  /**
   * Returns the show description input element
   */
  get showDescription() {
    return this._page.container.querySelector('#show-description-toggle-button');
  }

  /**
   * Returns the show description input element
   */
  get showComment() {
    return this._page.container.querySelector('#show-comment-toggle-button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.emailNotificationsSettings !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** Click on the comment add element */
  async checkCommentAdd() {
    await this.click(this.commentAdd);
  }
}
