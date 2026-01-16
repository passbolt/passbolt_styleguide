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
 * @since         5.8.0
 */

import React from "react";
import { render } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DisplayDragUser from "./DisplayDragUser";
import { defaultContext, defaultUserWorkspaceContext } from "./DisplayDragUser.test.data";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * Mock UserAvatar component
 */
jest.mock("../../Common/Avatar/UserAvatar", () => ({
  __esModule: true,
  default: ({ user, baseUrl, className }) => (
    <div data-testid="user-avatar" data-username={user?.username} data-baseurl={baseUrl} className={className} />
  ),
}));

/**
 * The DisplayDragUser component represented as a page
 */
export default class DisplayDragUserPage {
  /**
   * Default constructor
   * @param {Object} props Props to attach
   */
  constructor(props = {}) {
    this._props = props;
    this._context = props.context || defaultContext;
    this._userWorkspaceContext = {
      ...defaultUserWorkspaceContext,
      ...props.userWorkspaceContext,
    };

    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={this._context}>
          <DisplayDragUser context={this._context} userWorkspaceContext={this._userWorkspaceContext} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the drag and drop container element
   */
  get dragAndDropContainer() {
    return this._page.container.querySelector(".drag-and-drop");
  }

  /**
   * Returns the count badge element
   */
  get countBadge() {
    return this._page.container.querySelector(".count");
  }

  /**
   * Returns the count badge text content
   */
  get countText() {
    return this.countBadge?.textContent;
  }

  /**
   * Returns the message span element
   */
  get messageElement() {
    return this._page.container.querySelector(".message");
  }

  /**
   * Returns the message text content
   */
  get messageText() {
    return this.messageElement?.textContent;
  }

  /**
   * Returns the user avatar element
   */
  get userAvatar() {
    return this._page.container.querySelector('[data-testid="user-avatar"]');
  }

  /**
   * Returns true if the component has a count badge
   */
  get hasCountBadge() {
    return Boolean(this.countBadge);
  }

  /**
   * Returns true if the drag container has the specified class
   * @param {string} className The class name to check
   * @returns {boolean}
   */
  hasClass(className) {
    return this.dragAndDropContainer?.classList.contains(className) || false;
  }

  /**
   * Returns the avatar's data-username attribute
   */
  get avatarUsername() {
    return this.userAvatar?.getAttribute("data-username");
  }

  /**
   * Returns the avatar's data-baseurl attribute
   */
  get avatarBaseUrl() {
    return this.userAvatar?.getAttribute("data-baseurl");
  }

  /**
   * Returns true if the avatar has the specified class
   * @param {string} className The class name to check
   * @returns {boolean}
   */
  avatarHasClass(className) {
    return this.userAvatar?.classList.contains(className) || false;
  }

  /**
   * Returns the underlying container for advanced queries
   */
  get container() {
    return this._page.container;
  }

  /**
   * Allows rerendering with new props
   * @param {Object} props New props
   */
  rerender(props) {
    const context = props.context || defaultContext;
    const userWorkspaceContext = {
      ...defaultUserWorkspaceContext,
      ...props.userWorkspaceContext,
    };

    this._page.rerender(
      <MockTranslationProvider>
        <AppContext.Provider value={context}>
          <DisplayDragUser context={context} userWorkspaceContext={userWorkspaceContext} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }
}
