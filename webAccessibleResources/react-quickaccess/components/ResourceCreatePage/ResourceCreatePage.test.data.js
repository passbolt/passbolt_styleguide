/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: {
      canIUse: () => true
    }
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    prepareResourceContext: {
      getSettings: () => settingsPasswordGenerator,
      settings: settingsPasswordGenerator,
      getPreparedResource: jest.fn(),
      getLastGeneratedPassword: jest.fn(() => "AAAAAAAAAAAAAAAAAA")
    }
  };
}

const settingsPasswordGenerator = {
  default_generator: "password",
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
};

const mockTabInfo = {
  title: "test",
  uri: "www.test.com",
  name: "Tab test",
  username: "test@passbolt.com",
  secret_clear: "password test"
};

export const mockResults = {
  "passbolt.quickaccess.prepare-resource": mockTabInfo,
  "passbolt.resources.create": {}
};
