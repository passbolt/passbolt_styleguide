/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesListDetails from "./DisplayResourcesListDetails";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";

/**
 * The DisplayResourceDetails component represented as a page
 */
export default class DisplayResourcesListDetailsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ResourceWorkspaceContext.Provider value={props.resourceWorkspaceContext}>
          <DisplayResourcesListDetails {...props}/>
        </ResourceWorkspaceContext.Provider>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.resourceSidebar !== null;
  }

  resource(index) {
    return this._page.container.querySelectorAll('.sidebar .sidebar-header')[index];
  }

  resourceName(index) {
    return this.resource(index).querySelector(".name").textContent;
  }

  resourceType(index) {
    return this.resource(index).querySelectorAll(".subtitle")[0].textContent;
  }

  resourcePermission(index) {
    return this.resource(index).querySelectorAll(".subtitle")[1].textContent;
  }

  resourceUnselectButton(index) {
    return this.resource(index).querySelector("button");
  }

  /** Click on the component */
  async clickOn(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
