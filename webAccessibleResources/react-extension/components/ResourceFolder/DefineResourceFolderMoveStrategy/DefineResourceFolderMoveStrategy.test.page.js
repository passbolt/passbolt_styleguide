
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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DefineResourceFolderMoveStrategy from "./DefineResourceFolderMoveStrategy";

/**
 * The DefineResourceFolderMoveStrategyPage component represented as a page
 */
export default class DefineResourceFolderMoveStrategyPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider  value={appContext}>
          <DefineResourceFolderMoveStrategy {...props}></DefineResourceFolderMoveStrategy>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Set the move option
   * @param value The option value
   */
  set option(value) {
    let element;
    if (value === 'change') {
      element = this._page.container.querySelector('#moveOptionChange');
    } else if (value === 'keep') {
      element = this._page.container.querySelector('#moveOptionKeep');
    }

    if (element) {
      const leftClick = {button: 0};
      fireEvent.click(element, leftClick);
    }
  }

  /**
   * Returns true it one can cancel the operation
   */
  get canCancel() {
    return !this._page.container.querySelector('.cancel').hasAttribute('disabled');
  }

  /**
   * Returns true it one can close the dialog
   */
  get canClose() {
    return !this._page.container.querySelector('.dialog-close').hasAttribute('disabled');
  }

  /**
   * Returns true it one can submit the create operation
   */
  get canSubmit() {
    return !this._page.container.querySelector('button[type="submit"]').hasAttribute('disabled');
  }

  /**
   * Returns true it one can change the data
   */
  get canChangeData() {
    const changeOption = this._page.container.querySelector('#moveOptionChange').hasAttribute('disabled');
    const keepOption = this._page.container.querySelector('#moveOptionKeep').hasAttribute('disabled');
    return Boolean(changeOption).valueOf() || Boolean(keepOption).valueOf();
  }

  /**
   * Returns the move button element
   */
  get moveButton() {
    return this._page.container.querySelector('button[type=\"submit\"]');
  }


  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the close button element
   */
  get closeButton() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Moves the folder
   * @param option Move options (change or keep permissions)
   * @param inProgressFn Function called during the move operation
   */
  async move(option, inProgressFn = () => {}) {
    this.option = option;
    await waitFor(() => {});
    const leftClick = {button: 0};
    fireEvent.click(this.moveButton, leftClick);
    await waitFor(inProgressFn);
  }


  /**
   * Cancels the create operation
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }


  /**
   * Close the create operation
   */
  async close() {
    const leftClick = {button: 0};
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }
}
