
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
import PropTypes from "prop-types";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/DialogContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";

/**
 * The DisplayResourcesWorkspaceMenuPage component represented as a page
 */
export default class DisplayResourcesWorkspaceMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContextProvider context={appContext}>
          <DialogContextProvider>
            <ManageDialogs/>
            <DisplayResourcesWorkspaceMenu {...props}/>
          </DialogContextProvider>
        </AppContextProvider>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayMenu = new DisplayMenuPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displayMenu() {
    return this._displayMenu;
  }
}

/**
 * Page object for the TitleHeader element
 */
class DisplayMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu elements of password workspace menu
   */
  get actionMenu() {
    return this._container.querySelector('.actions');
  }

  /**
   * Returns the edit menu elements of password workspace menu
   */
  get editMenu() {
    return this._container.querySelector('#edit_action button');
  }

  /**
   * Returns true if the edit menu elements of password workspace menu is disabled
   */
  hasEditMenuDisabled() {
    return this.editMenu.hasAttribute("disabled");
  }

  /**
   * Returns the share menu elements of password workspace menu
   */
  get shareMenu() {
    return this._container.querySelector('#share_action button');
  }

  /**
   * Returns true if the share menu elements of password workspace menu is disabled
   */
  hasShareMenuDisabled() {
    return this.shareMenu.hasAttribute("disabled");
  }

  /**
   * Returns the share menu elements of password workspace menu
   */
  get copyMenu() {
    return this._container.querySelector('#password_action button');
  }

  /**
   * Returns true if the copy menu elements of password workspace menu is disabled
   */
  hasCopyMenuDisabled() {
    return this.copyMenu.hasAttribute("disabled");
  }

  /**
   * Returns the more menu elements of password workspace menu
   */
  get moreMenu() {
    return this._container.querySelector('.dropdown button');
  }

  /**
   * Returns true if the more menu elements of password workspace menu is disabled
   */
  hasMoreMenuDisabled() {
    return this._container.querySelector('.dropdown .button.disabled');
  }

  /**
   * Returns the delete menu elements of password workspace menu
   */
  get dropdownMenuDelete() {
    return this._container.querySelector('#delete_action .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns true if the delete menu elements of password workspace menu is disabled
   */
  hasDropdownMenuDeleteDisabled() {
    return this.dropdownMenuDelete.hasAttribute("disabled");
  }

  /**
   * Returns the permalink menu elements of password workspace menu
   */
  get dropdownMenuPermalink() {
    return this._container.querySelector('#permalink_action .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns true if the permalink menu elements of password workspace menu is disabled
   */
  hasDropdownMenuPermalinkDisabled() {
    return this.dropdownMenuPermalink.hasAttribute("disabled");
  }

  /**
   * Returns the username menu elements of password workspace menu
   */
  get dropdownMenuUsername() {
    return this._container.querySelector('#username_action .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns true if the username menu elements of password workspace menu is disabled
   */
  hasDropdownMenuUsernameDisabled() {
    return this.dropdownMenuUsername.hasAttribute("disabled");
  }

  /**
   * Returns the username menu elements of password workspace menu
   */
  get dropdownMenuSecret() {
    return this._container.querySelector('#secret_action .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns true if the username menu elements of password workspace menu is disabled
   */
  hasDropdownMenuSecretDisabled() {
    return this.dropdownMenuSecret.hasAttribute("disabled");
  }

  /**
   * Returns the detail information button menu elements of password workspace menu
   */
  get menuDetailInformation() {
    return this._container.querySelector('.actions.secondary button.button-toggle');
  }

  /**
   * Returns the detail information button menu elements of password workspace menu
   */
  get menuDetailInformationSelected() {
    return this._container.querySelector('.actions.secondary button.button-toggle.selected');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.actionMenu !== null;
  }

  /** Click on the more menu */
  clickOnMoreMenu()  {
    const leftClick = {button: 0};
    fireEvent.click(this.moreMenu, leftClick);
  }

  /** Click on the action menu */
  async clickOnMenu(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}

/**
 * Custom application provider (used to force the re-rendering when context changes )
 */
class AppContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props Props component
   */
  constructor(props) {
    super(props);
    this.state = props.context;
  }

  componentDidMount() {
    this.setState({setContext: this.setState.bind(this)});
  }

  /**
   * Render the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppContextProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.any
};
