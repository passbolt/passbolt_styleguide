import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import resourceTypesFixture from "../../../test/fixture/ResourceTypes/resourceTypes";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const port = new MockPort();
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesFixture);

  const defaultAppContext = {
    userSettings,
    siteSettings,
    resourceTypesSettings,
    port,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
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
    onClose: () => {},
    dialogContext: {
      open: () => {},
    }
  };
}
