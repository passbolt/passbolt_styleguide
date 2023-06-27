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
 * @since        3.6.0
 */
import React from "react";
import {render} from "@testing-library/react";
import {Router} from 'react-router-dom';
import HandleAccountRecoveryUserSettingsRoute from "./HandleAccountRecoveryUserSettingsRoute";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {createMemoryHistory} from "history";

export default class HandleAccountRecoveryUserSettingsRoutePage {
  /**
   * Default constructor
   * @param props Props to attach
   * @param history
   */
  constructor(props, history) {
    history = history || createMemoryHistory();
    this._page = render(
      <MockTranslationProvider>
        <Router history={history}>
          <HandleAccountRecoveryUserSettingsRoute {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }
}
