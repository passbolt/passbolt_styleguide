
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
import DialogContextProvider from "../../../contexts/DialogContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DeleteResource from "./DeleteResource";

/**
 * The DeleteResource component represented as a page
 */
export default class DeleteResourceTestPage {
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
            <DeleteResource {...props}/>
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
    this._deleteResourcePageObject = new DeleteResourcePageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get deleteResourcePageObject() {
    return this._deleteResourcePageObject;
  }
}

/**
 * Page object for the TitleHeader element
 */
class DeleteResourcePageObject {
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
  get dialogTitle() {
    return this._container.querySelector('.dialog-header h2 span');
  }

  /**
   * Returns the more menu elements of password workspace menu
   */
  get closeButton() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the more menu elements of password workspace menu
   */
  get saveButton() {
    return this._container.querySelector('.submit-wrapper [type=\"submit\"]');
  }

  /**
   * Returns the delete menu elements of password workspace menu
   */
  get cancelButton() {
    return this._container.querySelector('.submit-wrapper .cancel');
  }

  get resourceName() {
    return this._container.querySelector('.form-content p strong');
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
    return this.dialogTitle !== null;
  }

  /**
   * Click on the element
   * @param element
   */
  async click(element)  {
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
