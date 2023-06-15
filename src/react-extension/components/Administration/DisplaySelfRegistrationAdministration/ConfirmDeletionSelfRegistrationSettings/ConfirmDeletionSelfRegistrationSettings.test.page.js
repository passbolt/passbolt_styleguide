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
 * @since         3.8.3
 */

import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {AdminSelfRegistrationContextProvider} from "../../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import AppContext from "../../../../../shared/context/AppContext/AppContext";
import ConfirmDeletionSelfRegistrationSettings from "./ConfirmDeletionSelfRegistrationSettings";
/**
 * The ConfirmDeletionSelfRegistrationSettings component represented as a page
 */
export default class ConfirmDeletionSelfRegistrationSettingsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminSelfRegistrationContextProvider  {...props}>
            <ConfirmDeletionSelfRegistrationSettings {...props}/>
          </AdminSelfRegistrationContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.dialog-header-title').textContent;
  }

  /**
   * Returns the form content
   */
  get formContent() {
    return this._page.container.querySelector('.form-content');
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
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }
}

