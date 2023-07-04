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
import DialogContextProvider from "../../../contexts/DialogContext";
import {MemoryRouter} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import EditResource from "./EditResource";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";


/**
 * Page template for the EditResource component
 */
export const EditResourcePageTemplate = props =>
  <MockTranslationProvider>
    <DialogContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <ManageDialogs/>
        <EditResource {...props}/>
      </MemoryRouter>
      <ManageDialogs/>
    </DialogContextProvider>
  </MockTranslationProvider>;

/**
 * The PasswordEditDialog component represented as a page
 */
export default class EditResourcePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(EditResourcePageTemplate(props));
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._passwordEdit = new PasswordEditPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of create password
   */
  get passwordEdit() {
    return this._passwordEdit;
  }

  /**
   * REturns the password generator dialog element
   */
  get passwordGeneratorDialog() {
    return this._page.container.querySelector('.password-generator-dialog');
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddActivity Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get header() {
    return this._container.querySelector(".dialog-header-title");
  }

  /**
   * Returns the clickable area of the header
   */
  get subtitle() {
    return this._container.querySelector(".dialog-header-subtitle");
  }
}

class PasswordEditPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._container.querySelector('.edit-password-dialog');
  }
  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the pwned warning message
   */
  get pwnedWarningMessage() {
    return this._container.querySelector('.pwned-password.warning-message');
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._container.querySelector('#edit-password-form-name');
  }

  /**
   * Returns the name error mesage input element
   */
  get nameErrorMessage() {
    return this._container.querySelector('.name.error-message');
  }

  /**
   * Returns the name warning mesage input element
   */
  get nameWarningMessage() {
    return this._container.querySelector('.name.warning-message');
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._container.querySelector('#edit-password-form-uri');
  }

  /**
   * Returns the uri warning mesage input element
   */
  get uriWarningMessage() {
    return this._container.querySelector('.uri.warning-message');
  }

  /**
   * Returns the username / email input element
   */
  get username() {
    return this._container.querySelector('#edit-password-form-username');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._container.querySelector('#edit-password-form-password');
  }

  /**
   * Returns the username warning mesage input element
   */
  get usernameWarningMessage() {
    return this._container.querySelector('.username.warning-message');
  }

  /**
   * Returns the password error mesage input element
   */
  get passwordErrorMessage() {
    return this._container.querySelector('.password.error-message');
  }

  /**
   * Returns the password warning mesage input element
   */
  get passwordWarningMessage() {
    return this._container.querySelector('.password.warning-message');
  }


  /**
   * Returns the complexity text input element
   */
  get complexityText() {
    return this._container.querySelector('.complexity-text');
  }

  /**
   * Returns the description input element
   */
  get description() {
    return this._container.querySelector('#edit-password-form-description');
  }

  /**
   * Returns the description encrypted lock input element
   */
  get descriptionEncryptedLock() {
    return this._container.querySelector('.lock-toggle');
  }

  /**
   * Returns the description warning mesage input element
   */
  get descriptionWarningMessage() {
    return this._container.querySelector('.description.warning-message');
  }


  /**
   * Returns the progress bar element
   */
  get progressBar() {
    return this._container.querySelector('.progress-bar');
  }

  /**
   * Returns the password view button element
   */
  get passwordViewButton() {
    return this._container.querySelector('.password-view .svg-icon');
  }

  /**
   * Returns the password generate button element
   */
  get passwordGenerateButton() {
    return this._container.querySelector('.password-generate');
  }

  /**
   * Returns the password generator button element
   */
  get passwordGeneratorButton() {
    return this._container.querySelector('.password-generator');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._container.querySelector('.submit-wrapper .cancel');
  }

  get errorDialog() {
    return this._container.querySelector('.error-dialog');
  }

  get errorDialogMessage() {
    return this._container.querySelector('.error-dialog .dialog .dialog-content .form-content');
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
  clickWithoutWaitFor(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
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

  /** fill the input password with data */
  async fillInputPassword(data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.password, dataInputEvent);
    jest.runAllTimers();
    await waitFor(() => {});
  }

  /** focus the input element with data */
  focusInput(element)  {
    fireEvent.focus(element);
  }

  /** blur the input element with data */
  blurInput(element)  {
    fireEvent.blur(element);
  }

  /** on keypup element */
  async keyUpInput(component)  {
    fireEvent.keyUp(component, {keyCode: 38});
    await waitFor(() => {});
  }

  /** Open the password generator*/
  async openPasswordGenerator() {
    await this.clickWithoutWaitFor(this.passwordGeneratorButton);
  }
}
