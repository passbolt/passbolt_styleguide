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

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import GeneratePasswordPage from "./GeneratePasswordPage";


export default {
  title: 'Components/QuickAccess/GeneratePasswordPage',
  component: GeneratePasswordPage
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <div className="container quickaccess"><GeneratePasswordPage {...args} {...routerProps}/></div>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = {
  prepareResourceContext: {
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
  t: text => text
};

Initial.parameters = {
  css: "ext_quickaccess"
};
