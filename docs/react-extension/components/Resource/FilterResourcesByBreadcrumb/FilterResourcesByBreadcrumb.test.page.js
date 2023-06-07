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
import AppContext from "../../../contexts/AppContext";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterResourcesByBreadcrumb from "./FilterResourcesByBreadcrumb";

/**
 * The FilterResourcesByBreadcrumb component represented as a page
 */
export default class FilterResourcesByBreadcrumbPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, resourceWorkspaceContext) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={appContext}>
            <ResourceWorkspaceContext.Provider value={resourceWorkspaceContext}>
              <FilterResourcesByBreadcrumb/>
            </ResourceWorkspaceContext.Provider>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayBreadcrumb = new DisplayBreadcrumbPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displayBreadcrumb() {
    return this._displayBreadcrumb;
  }
}

class DisplayBreadcrumbPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the resource breadcrumb
   */
  get breadcrumb() {
    return this._container.querySelector('.breadcrumbs');
  }

  /**
   * Returns the number of items element
   */
  get count() {
    return this._container.querySelectorAll('li').length;
  }

  /**
   * Returns the item element for the index one
   */
  item(index) {
    return this._container.querySelectorAll('li')[index - 1].textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.breadcrumb !== null;
  }
}





