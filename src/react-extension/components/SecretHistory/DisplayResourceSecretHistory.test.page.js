
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
 * @since         5.7.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../shared/context/AppContext/AppContext";
import DisplayResourceSecretHistory from "./DisplayResourceSecretHistory";
import ManageDialogs from "../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../contexts/DialogContext";
/**
 * The Display Resource Secret History component represented as a page
 */
export default class DisplayResourceSecretHistoryPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DialogContextProvider>
            <ManageDialogs/>
            <DisplayResourceSecretHistory {...props}/>
          </DialogContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.resource-secret-history');
  }
  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the clickable area of the header
   */
  get header() {
    return this._page.container.querySelector(".dialog-header-title");
  }

  /**
   * Returns the clickable area of the header subtitle
   */
  get subtitle() {
    return this._page.container.querySelector(".dialog-header-subtitle");
  }

  /**
   * Returns the submit button element
   */
  get submitButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the secret revision creator item
   * @param index the secret revision creator index
   * @returns {{readonly element: *, readonly name: string|string|*, readonly username: string|string|*, readonly status: string|string|*}|*|string|string}
   */
  getSecretRevisionCreatorItem(index) {
    const element = this._page.container.querySelector('.left-sidebar .sidebar-content-sections').querySelectorAll('.section-content')[index - 1].querySelector("button.no-border");
    return {
      get element() {
        return element;
      },
      get name() {
        return element.querySelector('.creator .profile .name')?.textContent;
      },
      get username() {
        return element.querySelector('.creator .username')?.textContent;
      },
      get status() {
        return element.querySelector('.additional-information .status')?.textContent;
      }
    };
  }

  /**
   * Returns the number of secret revision
   * @returns {Element}
   */
  get secretRevisionLength() {
    return this._page.container.querySelectorAll('.left-sidebar .sidebar-content-sections .section-content').length;
  }

  /**
   * Returns the secret revision creator selected
   * @returns {{readonly name: string|string|*, readonly username: string|string|*, readonly status: string|string|*}|*|string|string}
   */
  get secretRevisionCreatorItemSelected() {
    const element = this._page.container.querySelector('.left-sidebar .sidebar-content-sections .section-content.selected');

    return {
      get name() {
        return element.querySelector('.creator .profile .name')?.textContent;
      },
      get username() {
        return element.querySelector('.creator .username')?.textContent;
      },
      get status() {
        return element.querySelector('.additional-information .status')?.textContent;
      }
    };
  }

  /**
   * Returns the secret revision content title
   * @returns {Element}
   */
  get secretRevisionContentTitle() {
    return this._page.container.querySelector('.resource-secret-history-workspace .title');
  }

  /**
   * Returns the secret revision content title
   * @returns {Element}
   */
  get secretRevisionContent() {
    return this._page.container.querySelector('.resource-secret-history-workspace .content .secret-history-fields .json-object');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }
}
