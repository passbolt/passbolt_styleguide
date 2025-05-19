
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
import EditResource from "./EditResource";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import {MemoryRouter} from "react-router-dom";
import DialogContextProvider from "../../../contexts/DialogContext";
/**
 * The Edit Resource component represented as a page
 */
export default class EditResourcePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <MemoryRouter initialEntries={[
          "/app/folders/view/:filterByFolderId",
          "/app/passwords/view/:selectedResourceId",
          "/app/passwords",
        ]}>
          <AppContext.Provider value={props.context}>
            <DialogContextProvider>
              <ActionFeedbackContext.Provider value={props.actionFeedbackContext}>
                <ResourceTypesLocalStorageContext.Provider value={{get: () => props.resourceTypes, resourceTypes: props.resourceTypes}}>
                  <ResourceWorkspaceContext.Provider value={props.resourceWorkspaceContext}>
                    <ResourcePasswordGeneratorContext.Provider value={props.resourcePasswordGeneratorContext}>
                      <ManageDialogs/>
                      <EditResource {...props}/>
                    </ResourcePasswordGeneratorContext.Provider>
                  </ResourceWorkspaceContext.Provider>
                </ResourceTypesLocalStorageContext.Provider>
              </ActionFeedbackContext.Provider>
            </DialogContextProvider>
          </AppContext.Provider>
        </MemoryRouter>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.edit-resource');
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
   * Returns the resource info skeleton input element
   */
  get resourceInfoSkeleton() {
    return this._page.container.querySelector('.resource-info.skeleton');
  }

  /**
   * Returns the edit workspace skeleton input element
   */
  get editWorkspaceSkeleton() {
    return this._page.container.querySelector('.edit-workspace.skeleton');
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._page.container.querySelector('#resource-name');
  }

  /**
   * Returns the name error mesage input element
   */
  get nameErrorMessage() {
    return this._page.container.querySelector('.name.error-message');
  }

  /**
   * Returns the name warning mesage input element
   */
  get nameWarningMessage() {
    return this._page.container.querySelector('.name.warning-message');
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._page.container.querySelector('#resource-uri');
  }

  /**
   * Returns the uri error message input element
   */
  get uriErrorMessage() {
    return this._page.container.querySelector('.uri.error-message');
  }

  /**
   * Returns the uri warning message input element
   */
  get uriWarningMessage() {
    return this._page.container.querySelector('.uri.warning-message');
  }

  /**
   * Returns the username / email input element
   */
  get username() {
    return this._page.container.querySelector('#resource-username');
  }

  /**
   * Returns the username warning mesage input element
   */
  get usernameErrorMessage() {
    return this._page.container.querySelector('.username.error-message');
  }

  /**
   * Returns the username warning mesage input element
   */
  get usernameWarningMessage() {
    return this._page.container.querySelector('.username.warning-message');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#resource-password');
  }

  /**
   * Returns the password error mesage input element
   */
  get passwordErrorMessage() {
    return this._page.container.querySelector('.password.error-message');
  }

  /**
   * Returns the password warning mesage input element
   */
  get passwordWarningMessage() {
    return this._page.container.querySelector('.password.warning-message');
  }

  /**
   * Returns the description input element
   */
  get description() {
    return this._page.container.querySelector('#resource-description');
  }

  /**
   * Returns the description error message input element
   */
  get descriptionErrorMessage() {
    return this._page.container.querySelector('.description.error-message');
  }

  /**
   * Returns the description warning message input element
   */
  get descriptionWarningMessage() {
    return this._page.container.querySelector('.description.warning-message');
  }

  /**
   * Returns the left sidebar description input element
   */
  get menuDescription() {
    return this._page.container.querySelector('#menu-description');
  }

  /**
   * Returns the left sidebar uris input element
   */
  get menuUris() {
    return this._page.container.querySelector('#menu-uris');
  }

  /**
   * Returns the main uri input element
   */
  get mainUri() {
    return this._page.container.querySelector('#resource-main-uri');
  }

  /**
   * Returns the uri error message input element
   */
  get mainUriErrorMessage() {
    return this._page.container.querySelector('.main-uri.error-message');
  }

  /**
   * Returns the uri warning message input element
   */
  get mainUriWarningMessage() {
    return this._page.container.querySelector('.main-uri.warning-message');
  }

  /**
   * Returns the add uri button element
   */
  get addUri() {
    return this._page.container.querySelector('.uri-add button');
  }

  /**
   * Returns the additional uri input element
   * @param {number} index
   */
  getAdditionalUri(index) {
    return this._page.container.querySelector(`#resource-additional-uri-${index}`);
  }

  /**
   * Returns the additional uri error message element
   * @param {number} index
   */
  getAdditionalUriErrorMessage(index) {
    return this._page.container.querySelector(`.additional-uri-${index}.error-message`);
  }

  /**
   * Returns the additional uri warning message element
   * @param {number} index
   */
  getAdditionalUriWarningMessage(index) {
    return this._page.container.querySelector(`.additional-uri-${index}.warning-message`);
  }

  /**
   * Returns the delete additional uri button element
   */
  getDeleteAdditionalUri(index) {
    return this._page.container.querySelector(`#resource-delete-additional-uri-${index}`);
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
   * Returns the note error message input element
   */
  get noteErrorMessage() {
    return this._page.container.querySelector('.note.error-message');
  }

  /**
   * Returns the note warning message input element
   */
  get noteWarningMessage() {
    return this._page.container.querySelector('.note.warning-message');
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
   * Returns the resource totp key input element
   */
  get resourceTotpKey() {
    return this._page.container.querySelector('#resource-totp-key');
  }

  /**
   * Returns the resource totp key error message input element
   */
  get resourceTotpKeyErrorMessage() {
    return this._page.container.querySelector('.totp-key.error-message');
  }

  /**
   * Returns the resource totp period error message input element
   */
  get resourceTotpPeriodErrorMessage() {
    return this._page.container.querySelector('.period.error-message');
  }

  /**
   * Returns the resource totp digits error message input element
   */
  get resourceTotpDigitsErrorMessage() {
    return this._page.container.querySelector('.digits.error-message');
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
   * Return the digits input element
   * @return {Element}
   */
  get digits() {
    return this._page.container.querySelector('#resource-totp-digits');
  }

  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get algorithm() {
    return this._page.container.querySelector('#resource-totp-algorithm .selected-value .value');
  }

  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get firstItemOption() {
    return this._page.container.querySelector('#resource-totp-algorithm .select-items .option');
  }

  /**
   * Returns the resource totp code element
   */
  get resourceTotpCode() {
    return this._page.container.querySelector('.totp-workspace .totp-wrapper .secret-totp button');
  }

  /**
   * Returns the resource totp code element
   */
  get copyTotpButton() {
    return this._page.container.querySelector('.totp-workspace #copy-totp');
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
    return this._page.container.querySelector('.left-sidebar .sidebar-content-sections').querySelectorAll('.section-content')[index - 1].querySelector("button.no-border");
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
   * Returns the delete secret password
   * @returns {Element}
   */
  get deleteSecretPassword() {
    return this._page.container.querySelector(".left-sidebar #delete-password");
  }

  /**
   * Returns the add secret totp
   * @returns {Element}
   */
  get addSecretTotp() {
    return this._page.container.querySelector(".left-sidebar #totp_action");
  }

  /**
   * Returns the delete secret totp
   * @returns {Element}
   */
  get deleteSecretTotp() {
    return this._page.container.querySelector(".left-sidebar #delete-totp");
  }

  /**
   * Returns the add secret note
   * @returns {Element}
   */
  get addSecretNote() {
    return this._page.container.querySelector(".left-sidebar #note_action");
  }

  /**
   * Returns the delete secret note
   * @returns {Element}
   */
  get deleteSecretNote() {
    return this._page.container.querySelector(".left-sidebar #delete-note");
  }

  /**
   * Returns the section selected
   * @returns {Element}
   */
  get sectionItemSelected() {
    return this._page.container.querySelector('.left-sidebar .sidebar-content-sections .section-content.selected');
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
   * Returns the convert to description button element
   */
  get convertToDescription() {
    return this._page.container.querySelector('#convert-to-description');
  }

  /**
   * Returns the convert to note button element
   */
  get convertToNote() {
    return this._page.container.querySelector('#convert-to-note');
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
