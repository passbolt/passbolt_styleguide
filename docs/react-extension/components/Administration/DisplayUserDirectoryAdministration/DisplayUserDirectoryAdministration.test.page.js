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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationUserDirectoryActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserDirectoryActions/DisplayAdministrationUserDirectoryActions";
import {AdminUserDirectoryContextProvider} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";

/**
 * The DisplayUserDirectoryAdministration component represented as a page
 */
export default class DisplayUserDirectoryAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminUserDirectoryContextProvider {...props}>
            <DisplayAdministrationUserDirectoryActions />
            <DisplayUserDirectoryAdministration {...props}/>
          </AdminUserDirectoryContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the user directory element
   */
  get userDirectorySettings() {
    return this._page.container.querySelector('.ldap-settings');
  }

  /**
   * Returns the credential title element
   */
  get credentialTitle() {
    return this._page.container.querySelector('.accordion.section-general .accordion-header button');
  }

  /**
   * Returns the directory configuration title element
   */
  get directoryConfigurationTitle() {
    return this._page.container.querySelector('.accordion.section-directory-configuration .accordion-header button');
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Save Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSaveButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[0];
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Test Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsTestButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[1];
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Simulate Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSimulateButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[2];
  }


  /**
   * Returns the HTMLElement button of the toolbar that is the "Synchronize Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSynchronizeButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[3];
  }

  /**
   * Returns the synchronization options title element
   */
  get synchronizationOptionsTitle() {
    return this._page.container.querySelector('.accordion.section-sync-options .accordion-header button');
  }

  /**
   * Returns the totp input element
   */
  get userDirectory() {
    return this._page.container.querySelector('#userDirectoryToggle');
  }

  /**
   * Returns the active directory input element
   */
  get activeDirectory() {
    return this._page.container.querySelector('#directoryTypeAd');
  }

  /**
   * Returns the open ldap input element
   */
  get openLdap() {
    return this._page.container.querySelector('#directoryTypeOpenLdap');
  }

  /**
   * Returns the connection type element
   */
  get connectionType() {
    return this._page.container.querySelector('.select-container.inline .select .selected-value').textContent;
  }

  /**
   * Returns the connection type select element
   */
  get connectionTypeSelect() {
    return this._page.container.querySelector('.select-container.inline .select .selected-value');
  }

  /**
   * Returns the server input element
   */
  get serverHost() {
    return this._page.container.querySelector('#server-input');
  }

  /**
   * Returns the port input element
   */
  get port() {
    return this._page.container.querySelector('#port-input');
  }

  /**
   * Returns the username input element
   */
  get username() {
    return this._page.container.querySelector('#username-input');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#password-input');
  }

  /**
   * Returns the domain name input element
   */
  get domainName() {
    return this._page.container.querySelector('#domain-name-input');
  }

  /**
   * Returns the base dn input element
   */
  get baseDn() {
    return this._page.container.querySelector('#base-dn-input');
  }

  /**
   * Returns the group path input element
   */
  get groupPath() {
    return this._page.container.querySelector('#group-path-input');
  }

  /**
   * Returns the user path input element
   */
  get userPath() {
    return this._page.container.querySelector('#user-path-input');
  }

  /**
   * Returns the group custom filters input element
   */
  get groupCustomFilters() {
    return this._page.container.querySelector('#group-custom-filters-input');
  }

  /**
   * Returns the user custom filters input element
   */
  get userCustomFilters() {
    return this._page.container.querySelector('#user-custom-filters-input');
  }

  /**
   * Returns the group object class input element
   */
  get groupObjectClass() {
    return this._page.container.querySelector('#group-object-class-input');
  }

  /**
   * Returns the user object class input element
   */
  get userObjectClass() {
    return this._page.container.querySelector('#user-object-class-input');
  }

  /**
   * Returns the use email prefix input element
   */
  get useEmailPrefix() {
    return this._page.container.querySelector('#use-email-prefix-suffix-toggle-button');
  }

  /**
   * Returns the email prefix input element
   */
  get emailPrefix() {
    return this._page.container.querySelector('#email-prefix-input');
  }

  /**
   * Returns the email suffix input element
   */
  get emailSuffix() {
    return this._page.container.querySelector('#email-suffix-input');
  }

  /**
   * Returns the default user input element
   */
  get defaultUser() {
    return this._page.container.querySelector('#default-user-select .selected-value .value');
  }

  /**
   * Returns the default group admin user input element
   */
  get defaultGroupAdminUser() {
    return this._page.container.querySelector('#default-group-admin-user-select .selected-value .value');
  }

  /**
   * Returns the groups parent group input element
   */
  get groupsParentGroup() {
    return this._page.container.querySelector('#groups-parent-group-input');
  }

  /**
   * Returns the users parent group input element
   */
  get usersParentGroup() {
    return this._page.container.querySelector('#users-parent-group-input');
  }

  /**
   * Returns the enabled users only input element
   */
  get enabledUsersOnly() {
    return this._page.container.querySelector('#enabled-users-only-toggle-button');
  }

  /**
   * Returns the create users input element
   */
  get createUsers() {
    return this._page.container.querySelector('#sync-users-create-toggle-button');
  }

  /**
   * Returns the delete users input element
   */
  get deleteUsers() {
    return this._page.container.querySelector('#sync-users-delete-toggle-button');
  }

  /**
   * Returns the update groups input element
   */
  get updateUsers() {
    return this._page.container.querySelector('#sync-users-update-toggle-button');
  }

  /**
   * Returns the create groups input element
   */
  get createGroups() {
    return this._page.container.querySelector('#sync-groups-create-toggle-button');
  }

  /**
   * Returns the delete groups input element
   */
  get deleteGroups() {
    return this._page.container.querySelector('#sync-groups-delete-toggle-button');
  }

  /**
   * Returns the update groups input element
   */
  get updateGroups() {
    return this._page.container.querySelector('#sync-groups-update-toggle-button');
  }

  /**
   * Returns the server host error mesage input element
   */
  get serverHostErrorMessage() {
    return this._page.container.querySelector('#server-input-feedback').textContent;
  }

  /**
   * Returns the port error mesage input element
   */
  get portErrorMessage() {
    return this._page.container.querySelector('#port-input-feedback').textContent;
  }

  /**
   * Returns the domain name error mesage input element
   */
  get domainErrorMessage() {
    return this._page.container.querySelector('#domain-name-input-feedback').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.userDirectorySettings !== null;
  }

  /**
   * Returns true if the save button in the toolbar is enabled.
   * @returns {boolean}
   */
  isSaveButtonEnabled() {
    return !this.toolbarActionsSaveButton.hasAttribute("disabled");
  }

  /**
   * Returns true if the test button in the toolbar is enabled.
   * @returns {boolean}
   */
  isTestButtonEnabled() {
    return !this.toolbarActionsTestButton.hasAttribute("disabled");
  }

  /**
   * Returns true if the synchronize button in the toolbar is enabled.
   * @returns {boolean}
   */
  isSynchronizeButtonEnabled() {
    return !this.toolbarActionsSynchronizeButton.hasAttribute("disabled");
  }

  /**
   * Returns true if the simulate button in the toolbar is enabled.
   * @returns {boolean}
   */
  isSimulateButtonEnabled() {
    return !this.toolbarActionsSimulateButton.hasAttribute("disabled");
  }

  /**
   * Simulates a click on the "Save settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async saveSettings() {
    await this.click(this.toolbarActionsSaveButton);
  }

  /**
   * Simulates a click on the "Test settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async testSettings() {
    await this.click(this.toolbarActionsTestButton);
  }

  /**
   * Simulates a click on the "Simutate settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async simulateSettings() {
    await this.click(this.toolbarActionsSimulateButton);
  }

  /**
   * Simulates a click on the "Synchronize settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async synchronizeSettings() {
    await this.click(this.toolbarActionsSynchronizeButton);
  }


  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** fill the input element with data */
  fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the host element with data */
  fillHost(data) {
    this.fillInput(this.serverHost, data);
  }

  /** fill the port element with data */
  fillPort(data) {
    this.fillInput(this.port, data);
  }

  /** fill the domain element with data */
  fillDomain(data) {
    this.fillInput(this.domainName, data);
  }
}
