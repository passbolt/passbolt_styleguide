import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PasswordDeleteDialog
  from "./PasswordDeleteDialog";


export default {
  title: 'Passbolt/Password/PasswordDeleteDialog',
  component: PasswordDeleteDialog
};

const Template = context => args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <PasswordDeleteDialog {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

const singleContext = {
  passwordDeleteDialogProps: {
    resources: [
      {name: "My Password"}
    ]
  },
};
export const SinglePassword = Template(singleContext).bind({});

const multipleContext = {
  passwordDeleteDialogProps: {
    resources: [
      {name: "My Password"},
      {name: "My Another Password"}
    ]
  },
};
export const MultiplePassword = Template(multipleContext).bind({});
