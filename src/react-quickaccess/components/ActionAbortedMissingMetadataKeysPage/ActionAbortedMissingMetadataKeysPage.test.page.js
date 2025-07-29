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
 * @since         5.4.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {Router} from "react-router-dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ActionAbortedMissingMetadataKeysPage from "./ActionAbortedMissingMetadataKeysPage";
import {createMemoryHistory} from "history";

/**
 * The ActionAbortedMissingMetadataKeysPage component represented as a page
 */
export default class ActionAbortedMissingMetadataKeysPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <ActionAbortedMissingMetadataKeysPage {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the page element
   * @returns {Element}
   */
  get actionAbortedMissingMetadataKey() {
    return this._page.container.querySelector(".action-aborted-missing-metadata-keys");
  }

  /**
   * Returns the back button element
   * @returns {Element}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link a.button");
  }

  /**
   * Returns the back button element
   * @returns {Element}
   */
  get submitButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.actionAbortedMissingMetadataKey !== null;
  }

  /**
   * Simulates a click on the submit button
   */
  async submit() {
    const leftClick = {button: 0};
    fireEvent.click(this.submitButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async close() {
    fireEvent.click(this.backButton, {button: 0});
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  async escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.actionAbortedMissingMetadataKey, escapeKeyDown);
    await waitFor(() => {});
  }
}
