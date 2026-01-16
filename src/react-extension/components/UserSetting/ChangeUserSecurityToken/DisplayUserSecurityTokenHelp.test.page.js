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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserSecurityTokenHelp from "./DisplayUserSecurityTokenHelp";

/**
 * The DisplayUserSecurityTokenHelp component represented as a page
 */
export default class DisplayUserSecurityTokenHelpPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserSecurityTokenHelp {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the phishing definition link
   */
  get phishingDefinitionLink() {
    return this._page.container.querySelector("a[data-testid=phishingLink]");
  }

  /**
   * Returns the security token documentation link
   */
  get tokenDocumentationLink() {
    return this._page.container.querySelector("a.button");
  }
}
