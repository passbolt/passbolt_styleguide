/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

export default () => {
  return {
    "default_generator": "passphrase",
    "generators": [
      {
        "name": "Password",
        "type": "password",
        "default_options":{
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
            "active": true
          },
          {
            "name": "lower",
            "label": "a-z",
            "characters": "abcdefghijklmnopqrstuvwxyz",
            "active": true
          },
          {
            "name": "digit",
            "label": "0-9",
            "characters": "0123456789",
            "required": true,
          },
          {
            "name": "parenthesis",
            "label": "{ [ ( | ) ] ] }",
            "characters": "([|])",
            "active": true
          },
          {
            "name": "special_char1",
            "label": "# $ % & @ ^ ~",
            "characters": "#$%&@^~",
            "active": true
          },
          {
            "name": "special_char2",
            "label": ". , : ;",
            "characters": ".,:;",
            "active": true
          },
          {
            "name": "special_char5",
            "label": "< * + ! ? =",
            "characters": "<*+!?=",
            "active": true
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
        "default_options":{
          "word_count": 8,
          "word_case": "lowercase",
          "min_word": 4,
          "max_word": 40,
          "separator": " "
        },
      }
    ]
  }
};