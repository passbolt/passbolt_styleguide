import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import resourceTypesFixture from "../../../test/fixture/ResourceTypes/resourceTypes";

/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  const port = new MockPort();
  port.addRequestListener("passbolt.secret.decrypt", () => "secret-decrypted");
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesFixture);
  const resources = [mockResource];

  return {
    context: {
      userSettings,
      siteSettings,
      resourceTypesSettings,
      port,
      setContext: function(newContext) {
        // In this scope this reference the object context.
        Object.assign(this, newContext);
      },
      resources,
      passwordEditDialogProps: {
        id: mockResource.id
      }
    },
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
      open: () => {}
    }
  };
}

/**
 * Mocked a resource
 */
export const mockResource = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http://www.apache.org/",
  "description": "Apache is the world's most used web server software.",
  "deleted": false,
  "created": "2019-12-05T13:38:43+00:00",
  "modified": "2019-12-06T13:38:43+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450"
};
