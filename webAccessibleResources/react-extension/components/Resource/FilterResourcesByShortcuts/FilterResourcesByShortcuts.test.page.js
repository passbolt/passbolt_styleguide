
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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import FilterResourcesByShortcuts from "./FilterResourcesByShortcuts";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The FilterResourcesByShortcuts component represented as a page
 */
export default class FilterResourcesByShortcutsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <Router>
        <AppContext.Provider value={appContext}>
          <MockTranslationProvider>
            <FilterResourcesByShortcuts.WrappedComponent {...props}/>
          </MockTranslationProvider>
        </AppContext.Provider>
      </Router>
    );
  }

  /**
   * Returns the filter resources by shortcuts
   */
  get filterResourcesByShortcuts() {
    return this._page.container.querySelector('.navigation-secondary.navigation-shortcuts');
  }

  /**
   * Returns the item selected element
   */
  get itemSelected() {
    return this._page.container.querySelector('.row.selected .main-cell-wrapper .main-cell button span').textContent;
  }

  /**
   * Returns the item element
   */
  async selectItem(index) {
    const element = this._page.container.querySelectorAll('.row .main-cell-wrapper .main-cell button')[index - 1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.filterResourcesByShortcuts !== null;
  }
}





