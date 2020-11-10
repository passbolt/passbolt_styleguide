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
import AppContext from "../../../contexts/AppContext";
import React from "react";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";

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
      <AppContext.Provider value={appContext}>
        <DisplayUserDirectoryAdministration {...props}/>
      </AppContext.Provider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayUserDirectoryAdministration = new DisplayUserDirectoryAdministrationPageObject(this._page.container);
  }

  /**
   * Returns the page object of create user
   */
  get displayUserDirectoryAdministration() {
    return this._displayUserDirectoryAdministration;
  }
}

class DisplayUserDirectoryAdministrationPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the user directory element
   */
  get userDirectorySettings() {
    return this._container.querySelector('.ldap-settings');
  }

  /**
   * Returns the credential title element
   */
  get credentialTitle() {
    return this._container.querySelector('.accordion.section-general .accordion-header a');
  }

  /**
   * Returns the directory configuration title element
   */
  get directoryConfigurationTitle() {
    return this._container.querySelector('.accordion.section-directory-configuration .accordion-header a');
  }

  /**
   * Returns the synchronization options title element
   */
  get synchronizationOptionsTitle() {
    return this._container.querySelector('.accordion.section-sync-options .accordion-header a');
  }

  /**
   * Returns the totp input element
   */
  get userDirectory() {
    return this._container.querySelector('#userDirectoryToggle');
  }

  /**
   * Returns the active directory input element
   */
  get activeDirectory() {
    return this._container.querySelector('#directoryTypeAd');
  }

  /**
   * Returns the open ldap input element
   */
  get openLdap() {
    return this._container.querySelector('#directoryTypeOpenLdap');
  }

  /**
   * Returns the connection type input element
   */
  get connectionType() {
    return this._container.querySelector('#connection-type-input');
  }

  /**
   * Returns the server input element
   */
  get serverHost() {
    return this._container.querySelector('#server-input');
  }

  /**
   * Returns the port input element
   */
  get port() {
    return this._container.querySelector('#port-input');
  }

  /**
   * Returns the username input element
   */
  get username() {
    return this._container.querySelector('#username-input');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._container.querySelector('#password-input');
  }

  /**
   * Returns the domain name input element
   */
  get domainName() {
    return this._container.querySelector('#domain-name-input');
  }

  /**
   * Returns the base dn input element
   */
  get baseDn() {
    return this._container.querySelector('#base-dn-input');
  }

  /**
   * Returns the group path input element
   */
  get groupPath() {
    return this._container.querySelector('#group-path-input');
  }

  /**
   * Returns the user path input element
   */
  get userPath() {
    return this._container.querySelector('#user-path-input');
  }

  /**
   * Returns the group object class input element
   */
  get groupObjectClass() {
    return this._container.querySelector('#group-object-class-input');
  }

  /**
   * Returns the user object class input element
   */
  get userObjectClass() {
    return this._container.querySelector('#user-object-class-input');
  }

  /**
   * Returns the use email prefix input element
   */
  get useEmailPrefix() {
    return this._container.querySelector('#use-email-prefix-suffix-toggle-button');
  }

  /**
   * Returns the email prefix input element
   */
  get emailPrefix() {
    return this._container.querySelector('#email-prefix-input');
  }

  /**
   * Returns the email suffix input element
   */
  get emailSuffix() {
    return this._container.querySelector('#email-suffix-input');
  }

  /**
   * Returns the default user input element
   */
  get defaultUser() {
    return this._container.querySelector('#default-user-select');
  }

  /**
   * Returns the default group admin user input element
   */
  get defaultGroupAdminUser() {
    return this._container.querySelector('#default-group-admin-user-select');
  }

  /**
   * Returns the groups parent group input element
   */
  get groupsParentGroup() {
    return this._container.querySelector('#groups-parent-group-input');
  }

  /**
   * Returns the users parent group input element
   */
  get usersParentGroup() {
    return this._container.querySelector('#users-parent-group-input');
  }

  /**
   * Returns the enabled users only input element
   */
  get enabledUsersOnly() {
    return this._container.querySelector('#enabled-users-only-toggle-button');
  }

  /**
   * Returns the create users input element
   */
  get createUsers() {
    return this._container.querySelector('#sync-users-create-toggle-button');
  }

  /**
   * Returns the delete users input element
   */
  get deleteUsers() {
    return this._container.querySelector('#sync-users-delete-toggle-button');
  }

  /**
   * Returns the create groups input element
   */
  get createGroups() {
    return this._container.querySelector('#sync-groups-create-toggle-button');
  }

  /**
   * Returns the delete groups input element
   */
  get deleteGroups() {
    return this._container.querySelector('#sync-groups-delete-toggle-button');
  }

  /**
   * Returns the update groups input element
   */
  get updateGroups() {
    return this._container.querySelector('#sync-groups-update-toggle-button');
  }

  /**
   * Returns the server host error mesage input element
   */
  get serverHostErrorMessage() {
    return this._container.querySelector('#server-input-feedback');
  }

  /**
   * Returns the port error mesage input element
   */
  get portErrorMessage() {
    return this._container.querySelector('#port-input-feedback');
  }

  /**
   * Returns the domain name error mesage input element
   */
  get domainErrorMessage() {
    return this._container.querySelector('#domain-name-input-feedback');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.userDirectorySettings !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** Click without wait for on the element */
  clickWithoutWaitFor(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /** fill the input element with data */
  fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }
}
