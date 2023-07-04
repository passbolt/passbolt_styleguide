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

import AppContext from "../../../../shared/context/AppContext/AppContext";
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import GenerateResourcePassword from "./GenerateResourcePassword";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourcePassword/GenerateResourcePassword',
  component: GenerateResourcePassword
};


const Template = args =>
  <AppContext.Provider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <GenerateResourcePassword {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  resourcePasswordGeneratorContext: {
    settings: {
      default_generator: "passphrase",
      generators: [
        {
          "name": "Password",
          "type": "password",
          "default_options": {
            "length": 18,
            "look_alike": true,
            "min_length": 8,
            "max_length": 128,
          },
          "masks": [
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
              "label": "{ [ ( | ) ] ] }",
              "characters": "([|])",
            },
            {
              "name": "special_char1",
              "label": "# $ % & @ ^ ~",
              "characters": "#$%&@^~"
            },
            {
              "name": "special_char2",
              "label": ". , : ;",
              "characters": ".,:;"
            },
            {
              "name": "special_char5",
              "label": "< * + ! ? =",
              "characters": "<*+!?="
            },
            {
              "name": "emoji",
              "label": "😘",
              "characters": "😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
            }
          ],
        },
        {
          "name": "Passphrase",
          "type": "passphrase",
          "default_options": {
            "word_count": 8,
            "word_case": "lowercase",
            "min_word": 4,
            "max_word": 40,
            "separator": " "
          },
        }
      ]
    }
  },
  onClose: () => {},
  context: {
    port: new MockPort()
  }
};
