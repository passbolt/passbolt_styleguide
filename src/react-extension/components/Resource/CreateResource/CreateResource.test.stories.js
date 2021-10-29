import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import CreateResource from "./CreateResource";
import "../../../../css/themes/default/ext_app.css";


export default {
  title: 'Passbolt/Resource/CreateResource',
  component: CreateResource,
  argTypes: {
    language: {
      control: {
        type: 'select',
        options: ['en-US', 'fr']
      }
    }
  }
};

const context = {
  userSettings: {
    getSecurityTokenBackgroundColor: () => '#FFFF',
    getSecurityTokenTextColor: () => '#080808',
    getSecurityTokenCode: () => 'ABC'
  },
  resourceTypesSettings: {
    areResourceTypesEnabled: () => true,
    isEncryptedDescriptionEnabled: () => true
  },
  siteSettings: {
    generatorConfiguration: {
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
    }
  }
};


const Template =  ({context, ...args})  =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object
};

export const Initial = Template.bind({});
Initial.args = {
  context: context,
};
