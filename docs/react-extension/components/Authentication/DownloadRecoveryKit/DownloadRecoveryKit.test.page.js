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
 * @since         3.0.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DownloadRecoveryKit from "./DownloadRecoveryKit";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DownloadRecoveryKitPage component represented as a page
 */
export default class DownloadRecoveryKitPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DownloadRecoveryKit {...props} />
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the download link element
   */
  get downloadLink() {
    return this._page.container.querySelector('#download-kit');
  }

  /**
   * Downloads the recovery kit
   */
  async download() {
    const leftClick = {button: 0};
    fireEvent.click(this.downloadLink, leftClick);
    await waitFor(() => {});
  }

  /**
   * Continue the process
   */
  async next() {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(() => {});
  }
}
