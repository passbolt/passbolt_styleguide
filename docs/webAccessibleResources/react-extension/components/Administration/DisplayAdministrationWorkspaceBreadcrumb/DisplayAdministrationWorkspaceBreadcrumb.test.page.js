
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
import {render} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayAdministrationWorkspaceBreadcrumb from "./DisplayAdministrationWorkspaceBreadcrumb";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayAdministrationWorkspaceBreadcrumb component represented as a page
 */
export default class DisplayAdministrationWorkspaceBreadcrumbPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={appContext}>
            <DisplayAdministrationWorkspaceBreadcrumb {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the resource breadcrumb
   */
  get breadcrumb() {
    return this._page.container.querySelector('.breadcrumbs');
  }

  /**
   * Returns the number of items element
   */
  get count() {
    return this._page.container.querySelectorAll('li').length;
  }

  /**
   * Returns the item element for the index one
   */
  item(index) {
    return this._page.container.querySelectorAll('li')[index - 1].textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.breadcrumb !== null;
  }
}





