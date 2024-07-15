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
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesList from "./DisplayResourcesList";

/**
 * The DisplayResourcesListPage component represented as a page
 */
export default class DisplayResourcesListPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayResourcesList {...props}/>
        </Router>
      </MockTranslationProvider>
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
   * Returns the number of displayed columns
   */
  get columnsCount() {
    return this._page.container.querySelectorAll('table thead tr th').length;
  }

  /**
   * Returns the index-th columns header with useful accessors
   * @index The column index
   */
  columns(index) {
    const element = this._page.container.querySelector('table thead tr').querySelectorAll('th')[index - 1];
    const resizer = element.querySelector('.resizer');
    return {
      get width() {
        return getComputedStyle(element).width;
      },
      get name() {
        return element.textContent;
      },
      // Move of the column in px
      async resize(moveInPx) {
        fireEvent.mouseDown(resizer);
        await waitFor(() => {});
        fireEvent.mouseMove(resizer, {clientX: moveInPx});
        await waitFor(() => {});
        fireEvent.mouseUp(resizer);
      },
      async resizeDefault() {
        fireEvent.doubleClick(resizer);
        await waitFor(() => {});
      },
      // Reorder the column with move in px
      async reorder(moveInPx) {
        fireEvent.mouseDown(element);
        await waitFor(() => {});
        fireEvent.mouseMove(element, {clientX: moveInPx});
        await waitFor(() => {});
        fireEvent.mouseUp(element);
      }
    };
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
        return element.querySelector('.cell-name div').textContent;
      },
      get password() {
        return element.querySelector('.cell-password .secret button span').textContent;
      },
      get isViewPasswordExist() {
        return Boolean(element.querySelector('.cell-password .password-view'));
      },
      get copyPasswordLink() {
        return element.querySelector('.cell-password .secret-copy button');
      },
      get totp() {
        return element.querySelector('.cell-totp .secret button span').textContent;
      },
      get isViewTotpExist() {
        return Boolean(element.querySelector('.cell-totp .totp-view'));
      },
      get copyTotpLink() {
        return element.querySelector('.cell-totp .secret-copy button');
      },
      get locationLink() {
        return element.querySelector('.cell-location button').textContent;
      },
      async selectFavorite() {
        const favorite = element.querySelector('.cell-favorite button');
        fireEvent.click(favorite, leftClick);
        await waitFor(() => {});
      },
      async selectUsername() {
        const username = element.querySelector('.cell-username div button');
        fireEvent.click(username, leftClick);
        await waitFor(() => {});
      },
      async selectPassword() {
        const password = element.querySelector('.cell-password .secret button');
        fireEvent.click(password, leftClick);
        await waitFor(() => {});
      },
      async selectViewPassword() {
        const viewPassword = element.querySelector('.cell-password .password-view');
        fireEvent.click(viewPassword, leftClick);
        await waitFor(() => {});
      },
      async selectTotp() {
        const password = element.querySelector('.cell-totp .secret button');
        fireEvent.click(password, leftClick);
        await waitFor(() => {});
      },
      async selectViewTotp() {
        const viewPassword = element.querySelector('.cell-totp .totp-view');
        fireEvent.click(viewPassword, leftClick);
        await waitFor(() => {});
      },
      async selectUri() {
        const uri = element.querySelector('.cell-uri div button');
        fireEvent.click(uri, leftClick);
        await waitFor(() => {});
      },
      async selectLocation() {
        const location = element.querySelector('.cell-location button');
        fireEvent.click(location, leftClick);
        await waitFor(() => {});
      },
      async select() {
        fireEvent.click(element, leftClick);
        await waitFor(() => {});
      },
      async selectWithCheckbox() {
        const checkbox = element.querySelector('td.cell-checkbox input');
        fireEvent.click(checkbox, leftClick);
        await waitFor(() => {});
      },
      async selectRangeCheckbox() {
        const checkbox = element.querySelector('td.cell-checkbox input');
        fireEvent.click(checkbox, {button: 0, shiftKey: true});
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
    const element = this._page.container.querySelector('thead tr th.cell-checkbox div input');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by favorite
   */
  async sortByResourceFavorite() {
    const element = this._page.container.querySelectorAll('thead th button')[0];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their uri
   */
  async sortByAttentionRequired() {
    const element = this._page.container.querySelectorAll('thead th button')[1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their name
   */
  async sortByResourceName() {
    const element = this._page.container.querySelectorAll('thead th button')[2];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their last date of modification
   */
  async sortByExpiry() {
    const element = this._page.container.querySelectorAll('thead th button')[3];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their username
   */
  async sortByUsername() {
    const element = this._page.container.querySelectorAll('thead th button')[4];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their uri
   */
  async sortByUri() {
    const element = this._page.container.querySelectorAll('thead th button')[5];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the resources by their last date of modification
   */
  async sortByModified() {
    const element = this._page.container.querySelectorAll('thead th button')[6];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
