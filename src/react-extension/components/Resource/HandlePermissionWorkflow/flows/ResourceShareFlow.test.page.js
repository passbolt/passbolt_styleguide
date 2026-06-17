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
 * @since         5.14.0
 */

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import { ResourceShareFlow } from "./ResourceShareFlow";

/**
 * The ResourceShareFlow component represented as a page
 */
export default class ResourceShareFlowTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ResourceShareFlow
          {...props}
          ref={(node) => {
            this._instance = node;
          }}
        />
      </MockTranslationProvider>,
    );
  }
}
