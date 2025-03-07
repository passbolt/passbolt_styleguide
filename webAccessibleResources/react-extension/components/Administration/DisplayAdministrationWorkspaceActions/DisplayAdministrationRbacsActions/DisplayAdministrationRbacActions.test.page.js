/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.6.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationRbacActions from "./DisplayAdministrationRbacActions";

/**
 * The DisplayAdministrationRbacActions component represented as a page
 */
export default class  DisplayAdministrationRbacActionsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayAdministrationRbacActions {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the workspace action
   */
  get workspaceAction() {
    return this._page.container.querySelector('.actions-wrapper');
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector('button');
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
}


