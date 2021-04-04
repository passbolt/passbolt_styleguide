
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
import DisplayUserWorkspaceActions from "./DisplayAdministrationWorkspaceActions";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserWorkspaceActions component represented as a page
 */
export default class DisplayUserWorkspaceActionsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayUserWorkspaceActions {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the workspace action
   */
  get workspaceAction() {
    return this._page.container.querySelector('.actions');
  }

  /**
   * Returns the number of actions
   */
  get count() {
    return this._page.container.querySelectorAll('li').length;
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelectorAll('li a')[0];
  }

  /**
   * Returns the test button
   */
  get testButton() {
    return this._page.container.querySelectorAll('li a')[1];
  }

  /**
   * Returns the save button
   */
  get simulateSynchronizeButton() {
    return this._page.container.querySelectorAll('li a')[2];
  }

  /**
   * Returns the save button
   */
  get synchronizeButton() {
    return this._page.container.querySelectorAll('li a')[3];
  }

  /**
   * Returns the edit subscription key button
   */
  get editSubscriptionKeyButton() {
    return this._page.container.querySelector('li a');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.workspaceAction !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** Click on the save element */
  async save() {
    await this.click(this.saveButton);
  }

  /** Click on the test element */
  async test() {
    await this.click(this.testButton);
  }

  /** Click on the simulate synchronize element */
  async simulateSynchronize() {
    await this.click(this.simulateSynchronizeButton);
  }

  /** Click on the synchronize element */
  async synchronize() {
    await this.click(this.synchronizeButton);
  }

  /** Click on the edit subscription key element */
  async editSubscriptionKey() {
    await this.click(this.editSubscriptionKeyButton);
  }
}





