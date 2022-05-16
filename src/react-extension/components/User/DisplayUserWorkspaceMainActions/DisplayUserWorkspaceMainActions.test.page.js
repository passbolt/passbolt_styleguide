
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
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/DialogContext";
import DisplayUserWorkspaceMainActions from "./DisplayUserWorkspaceMainActions";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The PasswordSidebarCommentSection component represented as a page
 */
export default class DisplayUserWorkspaceMainActionsTestPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DialogContextProvider>
            <ManageDialogs/>
            <DisplayUserWorkspaceMainActions {...props}/>
          </DialogContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayUserWorkspaceMainActions = new DisplayUserWorkspaceMainActionsPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displayUserWorkspaceMainActions() {
    return this._displayUserWorkspaceMainActions;
  }
}

/**
 * Page object for the main menu element
 */
class DisplayUserWorkspaceMainActionsPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu elements
   */
  get menu() {
    return this._container.querySelector('.dropdown');
  }

  /**
   * Returns the create menu elements
   */
  get createMenu() {
    return this._container.querySelector('.dropdown .button.create.primary');
  }

  /**
   * Returns the new user menu elements
   */
  get newUserMenu() {
    return this._container.querySelector('#user_action');
  }

  /**
   * Returns the new group menu elements
   */
  get newGroupMenu() {
    return this._container.querySelector('#group_action');
  }


  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.menu !== null;
  }

  /** Click on the action menu */
  async clickOnMenu(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
