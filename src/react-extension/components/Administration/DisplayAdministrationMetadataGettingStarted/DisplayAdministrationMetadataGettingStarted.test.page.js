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

import React from "react";
import {fireEvent, render} from '@testing-library/react';
import DisplayAdministrationMetadataGettingStarted from './DisplayAdministrationMetadataGettingStarted';
import AppContext from '../../../../shared/context/AppContext/AppContext';
import MockTranslationProvider from '../../../test/mock/components/Internationalisation/MockTranslationProvider';
import {BrowserRouter as Router} from "react-router-dom";

class DisplayAdministrationMetadataGettingStartedPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={props.context}>
            <DisplayAdministrationMetadataGettingStarted {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the page title element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select("h3.title").textContent;
  }

  /**
   * Returns the page description element
   * @returns {HTMLElement}
   */
  get description() {
    return this.select("p.description").textContent;
  }

  /**
   * Returns the enable encrypted metadata radio button element
   * @returns {HTMLElement}
   */
  get enableEncryptedMetadataRadio() {
    return this.select("input#enable-encrypted-metadata");
  }

  /**
   * Returns the keep legacy cleartext metadata radio button element
   * @returns {HTMLElement}
   */
  get keepLegacyCleartextMetadataRadio() {
    return this.select("input#keep-legacy-cleartext-metadata");
  }

  /**
   * Returns the save button element
   * @returns {HTMLElement}
   */
  get saveButton() {
    return this.select("#save-settings");
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this.select('.sidebar-help-section');
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this.helpBox.querySelector('h3');
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this.helpBox.querySelector('p');
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this.helpBox.querySelector('.button');
  }

  /** Click on the element */
  click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /**
   * Selects the enable encrypted metadata radio button
   */
  selectEnableEncryptedMetadata() {
    this.click(this.enableEncryptedMetadataRadio);
  }

  /**
   * Selects the keep legacy cleartext metadata radio button
   */
  selectKeepLegacyCleartextMetadata() {
    this.click(this.keepLegacyCleartextMetadataRadio);
  }

  /**
   * Clicks the save button
   * @returns {Promise<void>}
   */
  clickSaveButton() {
    this.click(this.saveButton);
  }
}

export default DisplayAdministrationMetadataGettingStartedPage;
