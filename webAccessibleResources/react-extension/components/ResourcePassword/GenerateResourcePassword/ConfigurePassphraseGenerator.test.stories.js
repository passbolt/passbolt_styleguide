import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";


export default {
  title: 'Components/ResourcePassword/ConfigurePassphraseGenerator',
  component: ConfigurePassphraseGenerator
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ConfigurePassphraseGenerator {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = {
  configuration: {
    name: "Passphrase",
    type: "passphrase",
    default_options: {
      word_count: 8,
      word_case: "lowercase",
      min_word: 4,
      max_word: 40,
      separator: " "
    },
  },
  onChanged: () => {}
};
