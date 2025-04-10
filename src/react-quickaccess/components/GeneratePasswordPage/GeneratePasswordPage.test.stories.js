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
 * @since         3.2.0
 */

import {MemoryRouter} from "react-router-dom";
import React from "react";
import GeneratePasswordPage from "./GeneratePasswordPage";
import {defaultPrepareResourceContext} from "../../contexts/PrepareResourceContext.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/GeneratePasswordPage',
  component: GeneratePasswordPage,
  decorators: [
    (Story, {args}) =>
      <AppContext.Provider value={args.context}>
        <MemoryRouter initialEntries={['/']}>
          <div className="container quickaccess"> <Story {...args}/></div>
        </MemoryRouter>;
      </AppContext.Provider>
  ],
};

export const Initial = {
  args: {
    prepareResourceContext: defaultPrepareResourceContext(),
    onClose: () => {},
    t: text => text
  },
  parameters: {
    css: "ext_quickaccess"
  }
};
