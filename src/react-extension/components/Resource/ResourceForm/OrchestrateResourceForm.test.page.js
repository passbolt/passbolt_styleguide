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

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import OrchestrateResourceForm from "./OrchestrateResourceForm";

/**
 * The OrchestrateResourceFormPage component represented as a page
 */
export default class OrchestrateResourceFormPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <OrchestrateResourceForm {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the password form
   * @returns {boolean}
   */
  get hasPasswordForm() {
    return Boolean(this._page.container.querySelector(".password"));
  }

  /**
   * Returns the totp form
   * @returns {boolean}
   */
  get hasTotpForm() {
    return Boolean(this._page.container.querySelector(".totp"));
  }

  /**
   * Returns the custom fields form
   * @returns {boolean}
   */
  get hasCustomFieldsForm() {
    return Boolean(this._page.container.querySelector(".custom-fields"));
  }

  /**
   * Returns the note form
   * @returns {boolean}
   */
  get hasNoteForm() {
    return Boolean(this._page.container.querySelector(".note"));
  }

  /**
   * Returns the description form
   * @returns {boolean}
   */
  get hasDescriptionForm() {
    return Boolean(this._page.container.querySelector(".description"));
  }

  /**
   * Returns the appearance form
   * @returns {boolean}
   */
  get hasAppearanceForm() {
    return Boolean(this._page.container.querySelector(".appearance-workspace"));
  }
}
