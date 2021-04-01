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
import {fireEvent, render} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterResourcesByText from "./FilterResourcesByText";

/**
 * The FilterResourcesByText component represented as a page
 */
export default class FilterResourcesByTextPage {
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
            <FilterResourcesByText.WrappedComponent {...props}/>
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
    this._displaySearchBar = new DisplaySearchBarPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displaySearchBar() {
    return this._displaySearchBar;
  }
}

class DisplaySearchBarPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the resource searchBar
   */
  get searchBar() {
    return this._container.querySelector('.search');
  }

  /**
   * Returns the label element
   */
  get label() {
    return this._container.querySelector('label');
  }

  /**
   * Returns the input text element
   */
  get inputText() {
    return this._container.querySelector('input');
  }

  /**
   * Returns the button element
   */
  get button() {
    return this._container.querySelector('button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.searchBar !== null;
  }

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the search bar with the text */
  searchText(text) {
    this.fillInput(this.inputText, text);
  }
}





