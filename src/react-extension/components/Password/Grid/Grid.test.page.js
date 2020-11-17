
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
import React from "react";
import AppContext from "../../../contexts/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import Grid from "./Grid";

/**
 * The Grid component represented as a page
 */
export default class GridPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <Router>
          <Grid {...props}/>
        </Router>
      </AppContext.Provider>
    );
  }

  /**
   * Returns true if the content is empty
   */
  get hasEmptyContent() {
    return Boolean(this._page.container.querySelector('.empty-content'));
  }

  /**
   * Returns the number of displayed resources
   */
  get resourcesCount() {
    return this._page.container.querySelectorAll('table tbody tr').length;
  }

  /**
   * Returns the index-th resource with useful accessors
   * @index The resource index
   */
  resource(index) {
    const element = this._page.container.querySelectorAll('table tbody tr')[index - 1];
    const leftClick = {button: 0};
    return {
      get name() {
        return element.querySelector('.uri div').textContent;
      },
      async selectFavorite() {
        const favorite = element.querySelector('.cell_favorite div a');
        fireEvent.click(favorite, leftClick);
        await waitFor(() => {});
      },
      async selectUsername() {
        const username = element.querySelector('.username div a');
        fireEvent.click(username, leftClick);
        await waitFor(() => {});
      },
      async selectPassword() {
        const password = element.querySelector('.password div a');
        fireEvent.click(password, leftClick);
        await waitFor(() => {});
      },
      async selectUri() {
        const uri = element.querySelector('.cell_uri div a');
        fireEvent.click(uri, leftClick);
        await waitFor(() => {});
      },
      async select() {
        fireEvent.click(element, leftClick);
        await waitFor(() => {});
      },
      async selectWithCheckbox() {
        const checkbox = element.querySelector('td.cell_multipleSelect.selections.s-cell');
        fireEvent.click(checkbox, leftClick);
        await waitFor(() => {});
      },
      async openContextualMenu() {
        fireEvent.contextMenu(element, leftClick);
        await waitFor(() => {});
      }
    };
  }

  /**
   * select the all resources
   */
  async selectAll() {
    const element = this._page.container.querySelector('thead tr th.cell_multipleSelect.selections.s-cell div input');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their name
   */
  async sortByResourceName() {
    const element = this._page.container.querySelectorAll('thead th a')[1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their username
   */
  async sortByUsername() {
    const element = this._page.container.querySelectorAll('thead th a')[2];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their uri
   */
  async sortByUri() {
    const element = this._page.container.querySelectorAll('thead th a')[3];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their last date of modification
   */
  async sortByModified() {
    const element = this._page.container.querySelectorAll('thead th a')[4];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
