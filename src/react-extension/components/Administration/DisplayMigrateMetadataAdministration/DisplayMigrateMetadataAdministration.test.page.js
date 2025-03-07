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
 * @since         4.12.0
 */

import React from "react";
import {render} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayMigrateMetadataAdministration from "./DisplayMigrateMetadataAdministration";

export default class DisplayMigrateMetadataAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayMigrateMetadataAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the page title element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select("#migrate-metadata-settings h3");
  }

  /**
   * Returns the page migration status value element
   * @returns {HTMLElement}
   */
  get migrationState() {
    return this.select(".migration-status-information .migration-status .value");
  }

  /**
   * Returns the page resources migration status value element
   * @returns {HTMLElement}
   */
  get resourcesMigrationState() {
    return this.select(".migration-status-information .migration-resources-count .value");
  }

  /**
   * Returns the page folders migration status value element
   * @returns {HTMLElement}
   */
  get foldersMigrationState() {
    return this.select(".migration-status-information .migration-folders-count .value");
  }

  /**
   * Returns the page tags migration status value element
   * @returns {HTMLElement}
   */
  get tagsMigrationState() {
    return this.select(".migration-status-information .migration-tags-count .value");
  }

  /**
   * Returns the page comments migration status value element
   * @returns {HTMLElement}
   */
  get commentsMigrationState() {
    return this.select(".migration-status-information .migration-comments-count .value");
  }

  /**
   * Returns the page resources migration checkbox element
   * @returns {HTMLElement}
   */
  get resourcesMigrationCheckbox() {
    return this.select("#migrateResourcesInput");
  }

  /**
   * Returns the page folders migration checkbox element
   * @returns {HTMLElement}
   */
  get foldersMigrationCheckbox() {
    return this.select("#migrateFoldersInput");
  }

  /**
   * Returns the page tags migration checkbox element
   * @returns {HTMLElement}
   */
  get tagsMigrationCheckbox() {
    return this.select("#migrateTagsInput");
  }

  /**
   * Returns the page comments migration checkbox element
   * @returns {HTMLElement}
   */
  get commentsMigrationCheckbox() {
    return this.select("#migrateCommentsInput");
  }

  /**
   * Returns the form banner element
   * @returns {HTMLElement}
   */
  get formBanner() {
    return this.select(".form-banner");
  }
}
