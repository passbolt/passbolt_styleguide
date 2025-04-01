
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
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import AddResourceTotp from "./AddResourceTotp";
/**
 * The Add resource totp component represented as a page
 */
export default class AddResourceTotpPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <ResourceTypesLocalStorageContext.Provider value={{get: () => props.resourceTypes, resourceTypes: props.resourceTypes}}>
            <ResourceWorkspaceContext.Provider value={props.resourceWorkspaceContext}>
              <ResourcePasswordGeneratorContext.Provider value={props.resourcePasswordGeneratorContext}>
                <AddResourceTotp {...props} />
              </ResourcePasswordGeneratorContext.Provider>
            </ResourceWorkspaceContext.Provider>
          </ResourceTypesLocalStorageContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }


  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._page.container.querySelector('#resource-uri');
  }
  /**
   * Returns the resource totp key input element
   */
  get resourceTotpKey() {
    return this._page.container.querySelector('#resource-totp-key');
  }

  /**
   * Return the advanced settings button element
   * @return {Element}
   */
  get advancedSettings() {
    return this._page.container.querySelector('.additional-information button');
  }
  /**
   * Return the period input element
   * @return {Element}
   */
  get period() {
    return this._page.container.querySelector('#resource-totp-period');
  }
  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get algorithm() {
    return this._page.container.querySelector('#resource-totp-algorithm .selected-value');
  }

  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get firstItemOption() {
    return this._page.container.querySelector('#resource-totp-algorithm .select-items .option');
  }

  /**
   * Return the digits input element
   * @return {Element}
   */
  get digits() {
    return this._page.container.querySelector('#resource-totp-digits');
  }

  /**
   * Returns the import Qr code button element
   */
  get uploadQrCode() {
    return this._page.container.querySelector('#import-qr-code');
  }

  /**
   * Returns the input file element
   */
  get inputFile() {
    return this._page.container.querySelector('input[type=\"file\"]');
  }

  /**
   * Return the warning import message
   * @returns {Element}
   */
  get warningImportMessage() {
    return this._page.container.querySelector('.totp-form .message.warning');
  }

  /**
   * Returns the resource totp code element
   */
  get resourceTotpCode() {
    return this._page.container.querySelector('.totp-wrapper .secret-totp button');
  }

  /**
   * Returns the resource totp code element
   */
  get copyTotpButton() {
    return this._page.container.querySelector('#copy-totp');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => { });
  }

  /**
   * Fill the input element with data and trigger the change event.
   * @param {HTMLElement} element - The input element to fill with data.
   * @param {string} data - The data to fill the input element with.
   */
  async fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => { element.value === data; });
  }

  /** Click to import file */
  async selectImportFile(file) {
    await this.click(this.uploadQrCode);
    const data = {target: {files: [file]}};
    fireEvent.change(this.inputFile, data);
    await waitFor(() => {});
  }
}
