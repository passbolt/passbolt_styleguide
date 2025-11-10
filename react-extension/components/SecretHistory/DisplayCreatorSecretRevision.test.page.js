
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
 * @since         5.7.0
 */

import {fireEvent, render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayCreatorSecretHistory from "./DisplayCreatorSecretRevision";
import {waitFor} from "@testing-library/dom";

/**
 * The SelectSecretHistoryPage component represented as a page
 */
export default class SelectSecretHistoryPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayCreatorSecretHistory {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the creator secret history
   * @returns {Element}
   */
  get creatorSecretHistory() {
    return this._page.container.querySelector('button.no-border');
  }


  /**
   * Returns the add secret custom fields
   * @returns {Element}
   */
  get name() {
    return this.creatorSecretHistory.querySelector(".creator .profile .name");
  }

  /**
   * Get the fingerprint
   * @return {Element}
   */
  get fingerprint() {
    return this.creatorSecretHistory.querySelector(".creator .profile .name .tooltip-portal");
  }

  /**
   * Returns the delete secret custom fields
   * @returns {Element}
   */
  get username() {
    return this.creatorSecretHistory.querySelector(".creator .username");
  }

  /**
   * Returns the add secret note
   * @returns {Element}
   */
  get status() {
    return this.creatorSecretHistory.querySelector(".additional-information .status");
  }

  /**
   * Returns the delete secret note
   * @returns {Element}
   */
  get editedDate() {
    return this._page.container.querySelector(".additional-information .updated-date");
  }

  /**
   * Returns the tooltip portal text
   * @returns {Element}
   */
  get tooltipText() {
    return document.querySelector("body .tooltip-portal-text").textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.creatorSecretHistory !== null;
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Mouse over on the fingerprint element */
  async mouseOverOnFingerprint()  {
    fireEvent.mouseOver(this.fingerprint);
    await waitFor(() => {});
  }
}
