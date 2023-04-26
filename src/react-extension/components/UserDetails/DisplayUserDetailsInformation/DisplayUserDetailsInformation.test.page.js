
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
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";
import DisplayUserDetailsInformation from "./DisplayUserDetailsInformation";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsInformationPage component represented as a page
 */
export default class DisplayUserDetailsInformationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <UserWorkspaceContext.Provider value={props.userWorkspaceContext}>
          <DisplayUserDetailsInformation {...props}/>
        </UserWorkspaceContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the detailed user role
   */
  get role() {
    return this._page.container.querySelector('.role .value').innerHTML;
  }

  /**
   * Returns the detailed user status
   */
  get status() {
    return this._page.container.querySelector('.status .value').textContent;
  }

  /**
   * Returns the detailed account recovery status
   */
  get accountRecoveryStatus() {
    return this._page.container.querySelector('.account-recovery-status .value').textContent;
  }

  /**
   * Returns the detailed mfa status
   */
  get mfaStatus() {
    return this._page.container.querySelector('.mfa .value').textContent;
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
}
