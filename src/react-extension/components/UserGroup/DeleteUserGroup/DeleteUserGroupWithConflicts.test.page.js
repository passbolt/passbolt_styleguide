
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
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/DialogContext";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DeleteUserGroupWithConflicts from "./DeleteUserGroupWithConflicts";

/**
 * The DeleteUserGroupWithConflicts component represented as a page
 */
export default class DeleteUserGroupWithConflictsPage {
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
            <DeleteUserGroupWithConflicts {...props}/>
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
    this._displayDeleteGroupWithConflictsDialog = new DeleteGroupWithConflictsDialogPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displayDeleteGroupWithConflictsDialog() {
    return this._displayDeleteGroupWithConflictsDialog;
  }
}

/**
 * Page object for the TitleHeader element
 */
class DeleteGroupWithConflictsDialogPageObject {
  /**
   * Default constructor
   * @param container The container which includes the delete user dialog Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu elements
   */
  get dialogTitle() {
    return this._container.querySelector('.dialog-header h2 span');
  }

  /**
   * Returns the close button elements
   */
  get closeButton() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the save button elements
   */
  get saveButton() {
    return this._container.querySelector('.submit-wrapper [type=\"submit\"]');
  }

  /**
   * Returns the save button processing elements
   */
  get saveButtonProcessing() {
    return this._container.querySelector('.submit-wrapper [type=\"submit\"].processing');
  }

  /**
   * Returns the cancel button elements
   */
  get cancelButton() {
    return this._container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns the cancel button disabled elements
   */
  hasCancelButtonDisabled() {
    return this._container.querySelector('.submit-wrapper .cancel').hasAttribute('disabled');
  }

  /**
   * Returns the error dialog
   */
  get errorDialog() {
    return this._container.querySelector('.error-dialog');
  }

  /**
   * Returns the error dialog message
   */
  get errorDialogMessage() {
    return this._container.querySelector('.error-dialog .dialog .dialog-content .form-content');
  }

  /**
   * Returns the user first name, last name
   */
  get groupName() {
    return this._container.querySelector('.form-content.intro p strong');
  }

  /**
   * Returns the tag name input element
   */
  get tagName() {
    return this._container.querySelector('.form-content p strong');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialogTitle !== null;
  }

  /**
   * Click on the element
   * @param element
   */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the element without wait for
   * @param element
   */
  clickWithoutWaitFor(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }
}
