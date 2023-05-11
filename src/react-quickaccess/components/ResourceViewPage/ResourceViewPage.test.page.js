/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ResourceViewPage from "./ResourceViewPage";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayResourcesWorkspaceMainMenuPage component represented as a page
 */
export default class ResourceViewPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <MemoryRouter initialEntries={[`/${props.context.storage.local.get().resources[0].id}`]}>
          <Route path="/:id" component={routerProps => <ResourceViewPage {...props} {...routerProps}/>}/>
        </MemoryRouter>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the list section title
   */
  get password() {
    return this._page.container.querySelector(".password-wrapper .secret button");
  }

  get passwordText() {
    return this._page.container.querySelector(".password-wrapper .secret button span").textContent;
  }

  /**
   * Returns the list section filter entries
   */
  get previewButton() {
    return this._page.container.querySelector(".password-wrapper .password-view");
  }

  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
