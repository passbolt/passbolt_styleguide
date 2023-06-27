/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import MockPort from "../../../react-extension/test/mock/MockPort";
import DisplayInFormMenu from "./DisplayInFormMenu";

export default {
  title: 'Components/WebIntegration/InFormMenu',
  component: DisplayInFormMenu
};

const suggestedResources = [
  {
    name: "Twitter (company account)",
    username: "companyaccount@pasbolt.com",
    key: 0
  },
  {
    name: "Matching Credentials",
    username: "john@pasbolt.com",
    key: 1
  },
  {
    name: "Matching Credentials 2",
    username: "john2@pasbolt.com",
    key: 2
  }
];

const passwordGeneratorConfiguration = {
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
          "label": "([|])",
          "characters": "([|])",
        },
        {
          "name": "TBD",
          "label": "TBD",
          "characters": ""
        },
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
      }
    }
  ]
};

const getResponse = (inputType, inputValue = "", suggestion = suggestedResources) => ({
  inputType,
  inputValue,
  suggestedResources: suggestion,
  secretGeneratorConfiguration: passwordGeneratorConfiguration
});

const mockPortUsernameEmpty = new MockPort();
mockPortUsernameEmpty.addRequestListener('passbolt.in-form-menu.init', () => getResponse("username"));

const mockPortUsernameFilled = new MockPort();
mockPortUsernameFilled.addRequestListener('passbolt.in-form-menu.init', () => getResponse("username", "john@passbolt.com"));

const mockPortPasswordNoSuggestion = new MockPort();
mockPortPasswordNoSuggestion.addRequestListener('passbolt.in-form-menu.init', () => getResponse("password", "", null));

const mockPortPasswordEmpty = new MockPort();
mockPortPasswordEmpty.addRequestListener('passbolt.in-form-menu.init', () => getResponse("password", ""));

const mockPortPasswordFilled = new MockPort();
mockPortPasswordFilled.addRequestListener('passbolt.in-form-menu.init', () => getResponse("password", "test",));

const Template = args =>
  <div className="web-integration">
    <DisplayInFormMenu {...args}/>
  </div>;

export const OnUsernameFieldWithEmptyValue = Template.bind({});
export const OnUsernameFieldWithValue = Template.bind({});
export const OnPasswordFieldWithoutSuggestion = Template.bind({});
export const OnPasswordFieldWithEmptyValue = Template.bind({});
export const OnPasswordFieldWithValue = Template.bind({});

OnUsernameFieldWithEmptyValue.args = {
  context: {
    port: mockPortUsernameEmpty
  }
};
OnUsernameFieldWithValue.args = {
  context: {
    port: mockPortUsernameFilled
  }
};
OnPasswordFieldWithoutSuggestion.args = {
  context: {
    port: mockPortPasswordNoSuggestion
  }
};
OnPasswordFieldWithEmptyValue.args = {
  context: {
    port: mockPortPasswordEmpty
  }
};
OnPasswordFieldWithValue.args = {
  context: {
    port: mockPortPasswordFilled
  }
};

const inFormMenuCss = {css: "ext_in_form_menu"};
OnUsernameFieldWithEmptyValue.parameters = inFormMenuCss;
OnUsernameFieldWithValue.parameters = inFormMenuCss;
OnPasswordFieldWithoutSuggestion.parameters = inFormMenuCss;
OnPasswordFieldWithEmptyValue.parameters = inFormMenuCss;
OnPasswordFieldWithValue.parameters = inFormMenuCss;
