
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

import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesWorkspace from "./DisplayResourcesWorkspace";

/**
 * The DisplayResourcesWorkspacePage component represented as a page
 */
export default class DisplayResourcesWorkspacePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayResourcesWorkspace {...props}/>
        </Router>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayResourceWorkspacePageObject = new DisplayResourceWorkspacePageObject(this._page.container);
  }

  /**
   * Returns the page object of display PasswordWorkspace
   */
  get displayResourceWorkspacePageObject() {
    return this._displayResourceWorkspacePageObject;
  }
}

/**
 * Page object for the Password Workspace element
 */
class DisplayResourceWorkspacePageObject {
  /**
   * Default constructor
   * @param container The container which includes the PasswordWorkspace Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the header second element of password workspace
   */
  get headerSecond() {
    return this._container.querySelector('.header.second');
  }

  /**
   * Returns the header third element of password workspace
   */
  get headerThird() {
    return this._container.querySelector('.header.third');
  }

  /**
   * Returns the panel main element of password workspace
   */
  get panelMain() {
    return this._container.querySelector('.panel.main');
  }

  /**
   * Returns the panel left element of password workspace
   */
  get panelLeft() {
    return this._container.querySelector('.panel.left');
  }

  /**
   * Returns the panel middle element of password workspace
   */
  get panelMiddle() {
    return this._container.querySelector('.panel.middle');
  }

  /**
   * Returns the sidebar resource elements of password workspace
   */
  get sidebarResource() {
    return Boolean(this._container.querySelector('.sidebar.resource'));
  }

  /**
   * Returns the sidebar folder elements of password workspace
   */
  get sidebarFolder() {
    return Boolean(this._container.querySelector('.sidebar.folder'));
  }

  /**
   * Returns the folder tree elements of password workspace
   */
  get folderTree() {
    return Boolean(this._container.querySelector('.folder_tree'));
  }

  /**
   * Returns the tag elements of password workspace
   */
  get tag() {
    return Boolean(this._container.querySelector('.tag'));
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.headerSecond !== null && this.headerThird !== null && this.panelMain !== null
      && this.panelLeft !== null && this.panelMiddle !== null;
  }
}
