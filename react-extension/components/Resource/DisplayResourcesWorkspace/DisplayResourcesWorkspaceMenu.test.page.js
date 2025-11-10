
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
          <ManageDialogs/>
          <DisplayResourcesWorkspaceMenu {...props}/>
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
   * @returns {HTMLElement}
   */
  get actionMenu() {
    return this._container.querySelector('.actions');
  }

  /**
   * Returns the edit menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get editMenu() {
    return this._container.querySelector('#edit_action button');
  }

  /**
   * Returns the share menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get shareMenu() {
    return this._container.querySelector('#share_action button');
  }

  /**
   * Returns the share menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get copyMenuDropdown() {
    return this._container.querySelector('#copy_action button');
  }

  /**
   * Returns the more menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get moreMenu() {
    return this._container.querySelector('button.more');
  }

  /**
   * Returns the delete menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get deleteMenu() {
    return this._container.querySelector('#delete_action button');
  }

  /**
   * Returns the mark as expired menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get dropdownMenuMarkAsExpired() {
    return this._container.querySelector('#mark_as_expired_action');
  }

  /**
   * Returns the "set expiry date" menu element of the password workspace menu
   * @returns {HTMLElement}
   */
  get dropdownMenuSetExpiryDate() {
    return this._container.querySelector('#set_expiry_date_action');
  }

  /**
   * Returns the "secret history" menu element of the password workspace menu
   * @returns {HTMLElement}
   */
  get dropdownMenuSecretHistory() {
    return this._container.querySelector('#secret_history_action');
  }

  /**
   * Returns the permalink menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get permalinkMenu() {
    return this._container.querySelector('#permalink_action');
  }

  /**
   * Returns the username menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get usernameMenu() {
    return this._container.querySelector('#username_action');
  }

  /**
   * Returns true if the username menu elements of password workspace menu is disabled
   * @returns {boolean}
   */
  hasDropdownMenuUsernameDisabled() {
    return this.usernameMenu.hasAttribute("disabled");
  }

  /**
   * Returns the uriMenu menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get uriMenu() {
    return this._container.querySelector('#uri_action');
  }

  /**
   * Returns true if the uriMenu menu elements of password workspace menu is disabled
   * @returns {boolean}
   */
  hasDropdownMenuUriDisabled() {
    return this.uriMenu.hasAttribute("disabled");
  }

  /**
   * Returns the password menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get dropdownMenuSecret() {
    return this._container.querySelector('#secret_action');
  }

  /**
   * Returns the totp menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get dropdownMenuTotp() {
    return this._container.querySelector('#totp_action');
  }

  /**
   * Returns the clear current selection button from the action bar
   * @returns {HTMLElement}
   */
  get clearSelectionButton() {
    return this._container.querySelector('.actions .actions-wrapper > button.button-transparent.inline');
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.actionMenu !== null;
  }

  /** Click on the more menu */
  clickOnMoreMenu()  {
    const leftClick = {button: 0};
    fireEvent.click(this.moreMenu, leftClick);
  }

  /** Click on the more menu */
  clickOnCopyMenu()  {
    const leftClick = {button: 0};
    fireEvent.click(this.copyMenuDropdown, leftClick);
  }

  /** Click on the more menu */
  clickOnClearSelection()  {
    const leftClick = {button: 0};
    fireEvent.click(this.clearSelectionButton, leftClick);
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
