
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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";
import DisplayUserDetailsPublicKey from "./DisplayUserDetailsPublicKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsPublicKeyPage component represented as a page
 */
export default class DisplayUserDetailsPublicKeyPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <UserWorkspaceContext.Provider value={props.userWorkspaceContext}>
              <DisplayUserDetailsPublicKey {...props}/>
            </UserWorkspaceContext.Provider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the detailed user fingerprint
   */
  get fingerprint() {
    return this._page.container.querySelector('.fingerprint .value').innerHTML;
  }

  /**
   * Returns the detailed user key type
   */
  get type() {
    return this._page.container.querySelector('.type .value').innerHTML;
  }

  /**
   * Returns the detailed user creation date of the key
   */
  get created() {
    return this._page.container.querySelector('.created .value').innerHTML;
  }

  /**
   * Returns the detailed user expiration date of the kye
   */
  get expires() {
    return this._page.container.querySelector('.expires .value').innerHTML;
  }

  /**
   * Returns true if the component is in a collapsed mode
   */
  get isCollapsed() {
    return this._page.container.querySelector('.closed');
  }

  /**
   * Toggle the collapse / expand component hbehavior
   */
  async toggleCollapse() {
    const element = this._page.container.querySelector('button');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Copy the user public key
   */
  async copyPublicKey() {
    const element = this._page.container.querySelector('button.copy-public-key');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
