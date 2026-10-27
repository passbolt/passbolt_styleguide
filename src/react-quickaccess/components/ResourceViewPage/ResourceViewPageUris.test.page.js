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
 * @since         5.18.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ResourceViewPageUris from "./ResourceViewPageUris";

/**
 * The ResourceViewPageUris component represented as a page
 */
export default class ResourceViewPageUrisPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ul className="properties">
          <ResourceViewPageUris {...props} />
        </ul>
      </MockTranslationProvider>,
    );
  }

  /**
   * The rows.
   * @returns {NodeListOf<Element>}
   */
  get rows() {
    return this._page.container.querySelectorAll("li.property");
  }

  /**
   * The URI row label.
   * @returns {Element}
   */
  get uriLabel() {
    return this._page.container.querySelector(".property:first-child .property-name");
  }

  /**
   * The URI link, when the URI is safe.
   * @returns {Element}
   */
  get uriLink() {
    return this._page.container.querySelector(".property:first-child a.property-value");
  }

  /**
   * The URI text, when the URI is not safe.
   * @returns {Element}
   */
  get uriText() {
    return this._page.container.querySelector(".property:first-child span.property-value");
  }

  /**
   * The URI action.
   * @returns {Element}
   */
  get uriAction() {
    return this._page.container.querySelector(".property:first-child .property-action");
  }

  /**
   * The additional URIs accordion.
   * @returns {Element}
   */
  get accordion() {
    return this._page.container.querySelector(".accordion");
  }

  /**
   * The additional URIs accordion button.
   * @returns {Element}
   */
  get additionalUrisButton() {
    return this._page.container.querySelector(".accordion-header.additional-uris button");
  }

  /**
   * The accordion caret, right when closed, down when open.
   * @returns {string|null}
   */
  get caret() {
    if (this._page.container.querySelector(".caret-down")) {
      return "down";
    }
    return this._page.container.querySelector(".caret-right") ? "right" : null;
  }

  /**
   * The additional URIs listed.
   * @returns {Array<Element>}
   */
  get listUris() {
    return Array.from(this._page.container.querySelectorAll(".list-uris .property-value"));
  }

  /**
   * Click on the given element.
   * @param {Element} element The element to click on.
   * @returns {Promise<void>}
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
