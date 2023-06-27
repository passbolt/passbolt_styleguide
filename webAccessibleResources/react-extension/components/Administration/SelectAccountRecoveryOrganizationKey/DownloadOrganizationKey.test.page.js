/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import {render} from "@testing-library/react";
import DownloadOrganizationKey from "./DownloadOrganizationKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DownloadOrganizationKey component represented as a page
 */
export default class DownloadOrganizationKeyPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DownloadOrganizationKey {...props} />
      </MockTranslationProvider>
    );
  }

  get downloadOrganizationKeyDialog() {
    return this._page.container.querySelector(".organization-recover-key-download-dialog");
  }

  /**
   * Returns the dialog close element
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.organization-recover-key-download-dialog.dialog-wrapper .dialog-header-title');
  }

  /**
   * Get the description text in body of the dialog
   */
  get description() {
    return this._page.container.querySelector('.organization-recover-key-download-dialog.dialog-wrapper .dialog-body p');
  }

  /**
   * Get the "Ok" button
   */
  get okButton() {
    return this._page.container.querySelector('.organization-recover-key-download-dialog.dialog-wrapper .dialog-footer button.primary');
  }

  /**
   * Get the "Download again" button
   */
  get downloadAgainButton() {
    return this._page.container.querySelector('.organization-recover-key-download-dialog.dialog-wrapper .dialog-footer button.button-left');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.downloadOrganizationKeyDialog !== null;
  }
}
