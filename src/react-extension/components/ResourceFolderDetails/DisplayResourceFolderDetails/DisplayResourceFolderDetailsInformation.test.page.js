
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
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceFolderDetailsInformation from "./DisplayResourceFolderDetailsInformation";

/**
 * The DisplayResourceFolderDetailsInformation component represented as a page
 */
export default class DisplayResourceFolderDetailsInformationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <Router>
            <DisplayResourceFolderDetailsInformation {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._displayInformationList = new DisplayInformationPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display comments
   */
  get displayInformationList() {
    return this._displayInformationList;
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddInformation Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get hyperlink() {
    return this._container.querySelector(".accordion-header h4 button");
  }

  /** Click on the title */
  async click()  {
    const leftClick = {button: 0};
    fireEvent.click(this.hyperlink, leftClick);
    await waitFor(() => {});
  }
}

class DisplayInformationPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the list elements of information
   */
  get list() {
    return this._container.querySelector('.information-label');
  }

  /**
   * Returns the username label elements of information
   */
  get usernameLabel() {
    return this._container.querySelector('.username.label').textContent;
  }

  /**
   * Returns the username elements of information
   */
  get username() {
    return this._container.querySelector('.username.value');
  }

  /**
   * Returns the modified elements of information
   */
  modified() {
    return this._container.querySelector('.modified.value');
  }

  /**
   * Returns the modified label elements of information
   */
  modifiedLabel() {
    return this._container.querySelector('.modified.label').textContent;
  }

  /**
   * Returns the modified by elements of information
   */
  modifiedBy() {
    return this._container.querySelector('.modified-by.value');
  }

  /**
   * Returns the modified by label elements of information
   */
  modifiedByLabel() {
    return this._container.querySelector('.modified-by.label').textContent;
  }

  /**
   * Returns the created elements of information
   */
  created() {
    return this._container.querySelector('.created.value');
  }

  /**
   * Returns the created label elements of information
   */
  createdLabel() {
    return this._container.querySelector('.created.label').textContent;
  }

  /**
   * Returns the created by elements of information
   */
  createdBy() {
    return this._container.querySelector('.created-by.value');
  }

  /**
   * Returns the created by label elements of information
   */
  createdByLabel() {
    return this._container.querySelector('.created-by.label').textContent;
  }

  /**
   * Returns the location elements of information
   */
  get location() {
    return this._container.querySelector('.location.value button');
  }

  /**
   * Returns the location label elements of information
   */
  get locationLabel() {
    return this._container.querySelector('.location.label').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.list !== null;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
