import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PasswordCreateDialog
  from "../../../react-extension/components/Password/PasswordCreateDialog/PasswordCreateDialog";
import AppContext from "../../../react-extension/contexts/AppContext";


export default {
  title: 'Passbolt/Password/PasswordCreateDialog',
  component: PasswordCreateDialog
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
  }
};


const Template = (args) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={(routerProps) => <PasswordCreateDialog {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;




export const Initial = Template.bind({});
