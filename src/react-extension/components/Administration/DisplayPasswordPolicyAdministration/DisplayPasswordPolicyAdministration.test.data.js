/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}, userId) {
  const defaultProps = {
    resourcePasswordGeneratorContext: {
      settings: {
        "default_generator": "passphrase",
        "generators": [
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
                "characters": "abcdefghijklmnopqrstuvwxyz",
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
              },
              {
                "name": "ascii",
                "label": "ascii",
                "characters": "%&¡¢£¤¥¦§¨©ª«¬®¯°±²³µ¶·¸¹º»¼½¾¿ÀÁ ÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒ—„†‡•…‰€™"
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
    context: defaultAppContext(data?.context, userId),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
      displayError: jest.fn()
    },
    t: text => text
  };
  return Object.assign(defaultProps, data);
}

export const settingDto = {
  external_services: true,
  generator_passwords_length: 18,
  generator_passphrase_words: 9,
  generator_passwords_mask_upper: true,
  generator_passwords_mask_lower: true,
  generator_passwords_mask_digit: true,
  generator_passwords_mask_char1: true,
  generator_passwords_mask_parenthesis: true,
  generator_passwords_mask_char2: true,
  generator_passwords_mask_char3: true,
  generator_passwords_mask_char4: true,
  generator_passwords_mask_char5: true,
  generator_passwords_mask_emoji: false,
  generator_passwords_look_alike_chars: true,
  generator_passphrase_words_separator: " ",
  generator_passphrase_words_case: "lowercase",
  generator_default_password_type: "password",
};
