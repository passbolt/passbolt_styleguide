
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
import CreateResourceV5 from "./CreateResourceV5";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
/**
 * The Create Resource component represented as a page
 */
export default class CreateResourcePage {
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
                <CreateResourceV5 {...props}/>
              </ResourcePasswordGeneratorContext.Provider>
            </ResourceWorkspaceContext.Provider>
          </ResourceTypesLocalStorageContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.create-resource');
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
   * Returns the name input element
   */
  get name() {
    return this._page.container.querySelector('#resource-name');
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._page.container.querySelector('#resource-uri');
  }

  /**
   * Returns the username / email input element
   */
  get username() {
    return this._page.container.querySelector('#resource-username');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#resource-password');
  }

  /**
   * Returns the description input element
   */
  get description() {
    return this._page.container.querySelector('#resource-description');
  }

  /**
   * Returns the password input element
   */
  get totp() {
    return this._page.container.querySelector('#resource-totp');
  }

  /**
   * Returns the password input element
   */
  get note() {
    return this._page.container.querySelector('#resource-note');
  }
  /**
   * Returns the password view button element
   */
  get passwordViewButton() {
    return this._page.container.querySelector('.password-view .svg-icon');
  }

  /**
   * Returns the password generate button element
   */
  get passwordGenerateButton() {
    return this._page.container.querySelector('.password-generate');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns the section item
   * @param index the section section index
   * @returns {Element}
   */
  getSectionItem(index) {
    return this._page.container.querySelector('.left-sidebar .sidebar-content-sections').querySelectorAll('.section-content')[index - 1];
  }

  /**
   * Returns the section selected
   * @returns {Element}
   */
  get sectionItemSelected() {
    return this._page.container.querySelector('.left-sidebar .sidebar-content-sections .section-content.selected');
  }

  /**
   * Returns the add secret
   * @returns {Element}
   */
  get addSecret() {
    return this._page.container.querySelector(".left-sidebar button.add-secret");
  }

  /**
   * Returns the add secret password
   * @returns {Element}
   */
  get addSecretPassword() {
    return this._page.container.querySelector(".left-sidebar #password_action");
  }

  /**
   * Returns the add secret totp
   * @returns {Element}
   */
  get addSecretTotp() {
    return this._page.container.querySelector(".left-sidebar #totp_action");
  }

  /**
   * Returns the add secret note
   * @returns {Element}
   */
  get addSecretNote() {
    return this._page.container.querySelector(".left-sidebar #note_action");
  }

  /**
   * Returns the complexity text input element
   */
  get complexityText() {
    return this._page.container.querySelector('.complexity-text');
  }

  /**
   * Returns the progress bar element
   */
  get progressBar() {
    return this._page.container.querySelector('.progress-bar');
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

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }
}
