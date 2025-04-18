
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
import DisplayResourceFolderDetails from "./DisplayResourceFolderDetails";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayResourceFolderDetails component represented as a page
 */
export default class DisplayResourceFolderDetailsPage {
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
            <DisplayResourceFolderDetails {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the resource sidebar
   */
  get resourceSidebar() {
    return this._page.container.querySelector('.sidebar.resource');
  }

  /**
   * Returns the name element
   */
  get name() {
    return this._page.container.querySelector('.name').textContent;
  }

  /**
   * Returns the subtitle element
   */
  get subtitle() {
    return this._page.container.querySelector('.subtitle').textContent;
  }

  /**
   * Returns the permalink
   */
  get permalink() {
    return this._page.container.querySelector('.title-link');
  }

  /**
   * Returns the share with button
   */
  get shareWith() {
    return this._page.container.querySelector('.sharedwith');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.resourceSidebar !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click on the permalink */
  async selectPermalink()  {
    await this.click(this.permalink);
  }
}





