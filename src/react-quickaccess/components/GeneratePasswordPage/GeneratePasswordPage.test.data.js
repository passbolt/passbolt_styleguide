/**
 * Default props
 * @returns {*}
 */

import {defaultAppContext} from "../../contexts/AppContext.test.data";

export function defaultProps() {
  return {
    context: defaultAppContext(),
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
                "active": true
              },
              {
                "name": "special_char1",
                "label": "# $ % & @ ^ ~",
                "characters": "#$%&@^~",
                "active": true
              },
              {
                "name": "parenthesis",
                "label": "{ [ ( | ) ] ] }",
                "characters": "([|])",
                "active": true
              },
              {
                "name": "special_char2",
                "label": ". , : ;",
                "characters": ".,:;",
                "active": true
              },
              {
                "name": "special_char3",
                "label": "' \" `",
                "characters": "'\"`",
                "active": true
              },
              {
                "name": "special_char4",
                "label": "/ \\ _ -",
                "characters": "/\\_-",
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
            "default_options": {
              "word_count": 8,
              "word_case": "lowercase",
              "min_word": 4,
              "max_word": 40,
              "separator": " "
            },
          }
        ]
      },
      onPasswordGenerated: jest.fn()
    },
    history: {
      push: jest.fn(),
      goBack: jest.fn()
    }
  };
}
