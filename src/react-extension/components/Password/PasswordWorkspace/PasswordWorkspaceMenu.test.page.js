
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
import PropTypes from "prop-types";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/Common/DialogContext";
import PasswordWorkspaceMenu from "./PasswordWorkspaceMenu";

/**
 * The PasswordSidebarCommentSection component represented as a page
 */
export default class PasswordWorkspaceMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContextProvider context={appContext}>
        <DialogContextProvider>
          <ManageDialogs/>
          <PasswordWorkspaceMenu {...props}/>
        </DialogContextProvider>
      </AppContextProvider>
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
    return this._container.querySelector('#edit_action .button.ready');
  }

  /**
   * Returns the edit menu disabled elements of password workspace menu
   */
  get editMenuDisabled() {
    return this._container.querySelector('#edit_action .button.ready.disabled');
  }

  /**
   * Returns the more menu elements of password workspace menu
   */
  get moreMenu() {
    return this._container.querySelector('.dropdown .button.ready');
  }

  /**
   * Returns the more menu elements of password workspace menu
   */
  get moreMenuDisabled() {
    return this._container.querySelector('.dropdown .button.ready.disabled');
  }

  /**
   * Returns the delete menu elements of password workspace menu
   */
  get dropdownMenuDelete() {
    return this._container.querySelector('#delete_action .row .main-cell-wrapper .main-cell a');
  }

  /**
   * Returns the delete menu elements of password workspace menu
   */
  get dropdownMenuDeleteDisabled() {
    return this._container.querySelector('#delete_action .row .main-cell-wrapper .main-cell a.disabled');
  }

  /**
   * Returns the permalink menu elements of password workspace menu
   */
  get dropdownMenuPermalink() {
    return this._container.querySelector('#permalink_action .row .main-cell-wrapper .main-cell a');
  }

  /**
   * Returns the permalink menu elements of password workspace menu
   */
  get dropdownMenuPermalinkDisabled() {
    return this._container.querySelector('#permalink_action .row .main-cell-wrapper .main-cell a.disabled');
  }

  /**
   * Returns the username menu elements of password workspace menu
   */
  get dropdownMenuUsername() {
    return this._container.querySelector('#username_action .row .main-cell-wrapper .main-cell a');
  }

  /**
   * Returns the username menu elements of password workspace menu
   */
  get dropdownMenuUsernameDisabled() {
    return this._container.querySelector('#username_action .row .main-cell-wrapper .main-cell a.disabled');
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
