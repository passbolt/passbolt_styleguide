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
 * @since         5.17.0
 */
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserSettingsWorkspaceBreadcrumb from "./DisplayUserSettingsWorkspaceBreadcrumb";

/**
 * The DisplayUserSettingsWorkspaceBreadcrumb component represented as a page
 */
export default class DisplayUserSettingsWorkspaceBreadcrumbPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   * @param {string} pathname The current location pathname
   */
  constructor(appContext, props, pathname) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <MemoryRouter initialEntries={[pathname]}>
            <Route render={(routerProps) => <DisplayUserSettingsWorkspaceBreadcrumb {...props} {...routerProps} />} />
          </MemoryRouter>
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the breadcrumb element
   */
  get breadcrumb() {
    return this._page.container.querySelector(".breadcrumbs");
  }

  /**
   * Returns the number of items
   */
  get count() {
    return this._page.container.querySelectorAll("li").length;
  }

  /**
   * Returns the text of the item at the index (1-based)
   * @param {number} index
   */
  item(index) {
    return this._page.container.querySelectorAll("li")[index - 1].textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.breadcrumb !== null;
  }
}
