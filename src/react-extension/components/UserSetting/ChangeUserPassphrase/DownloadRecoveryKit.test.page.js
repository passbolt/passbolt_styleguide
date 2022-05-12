
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
 * @since         3.1.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DownloadRecoveryKit from "./DownloadRecoveryKit";

/**
 * The DownloadRecoveryKit component represented as a page
 */
export default class DownloadRecoveryKitPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DownloadRecoveryKit {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the user confirm passphrase element
   */
  get downloadRecoveryKit() {
    return this._page.container.querySelector('.profile-passphrase');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.profile-passphrase h3').textContent;
  }

  /**
   * Returns the download backup button element
   */
  get downloadBackupButton() {
    return this._page.container.querySelector('.additional-information button.button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.downloadRecoveryKit !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** click download backup */
  async downloadBackup() {
    await this.click(this.downloadBackupButton);
  }
}





