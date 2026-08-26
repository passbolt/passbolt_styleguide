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

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayGroupContextualMenu from "./DisplayGroupContextualMenu";

/**
 * The DisplayGroupContextualMenu component represented as a page
 */
export default class DisplayGroupContextualMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayGroupContextualMenu {...props} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayGroupContextualMenu = new DisplayGroupsContextualMenuPageObject(this._page.container);
  }

  /**
   * Returns the page object of the group contextual menu
   */
  get displayGroupContextualMenu() {
    return this._displayGroupContextualMenu;
  }
}

/**
 * The DisplayGroupContextualMenu component represented as a page object
 */
export class DisplayGroupsContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * @returns the delete group menu element
   */
  get deleteGroupContextualMenu() {
    return this._container.querySelector("#delete-group");
  }

  /**
   * @returns {any} the edit group menu element
   */
  get editGroupContextualMenu() {
    return this._container.querySelector("#edit-group");
  }

  /**
   * Click on the delete group menu element
   */
  async clickDelete() {
    fireEvent.click(this.deleteGroupContextualMenu, { button: 0 });
    await waitFor(() => {});
  }
}
