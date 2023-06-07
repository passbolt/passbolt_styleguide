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

import AppContext from "../../../contexts/AppContext";
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";


export default {
  title: 'Components/ResourcePassword/ConfigurePasswordGenerator',
  component: ConfigurePasswordGenerator
};


const Template = args =>
  <AppContext.Provider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ConfigurePasswordGenerator {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  configuration:  {
    default_options: {
      length: 18,
      look_alike: true,
      min_length: 2,
      max_length: 24,
    },
    masks: [
      {
        "name": "upper",
        "label": "A-Z",
        "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      {
        "name": "lower",
        "label": "a-z",
        "characters": "abcdefghijklmnopqrstuvwxyz"
      },
      {
        "name": "digit",
        "label": "0-9",
        "characters": "0123456789"
      },
      {
        "name": "parenthesis",
        "label": "([|])",
        "characters": "([|])",
      },
      {
        "name": "TBD",
        "label": "TBD",
        "characters": ""
      },
    ]
  },
  onChanged: () => {}
};
