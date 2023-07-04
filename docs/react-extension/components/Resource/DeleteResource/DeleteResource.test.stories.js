import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DeleteResource from "./DeleteResource";
import {defaultAppContext} from "./DeleteResource.test.data";


export default {
  title: 'Components/Resource/DeleteResource',
  component: DeleteResource
};

const Template = context => args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const SinglePassword = Template(defaultAppContext()).bind({});
SinglePassword.args = {
  onClose: () => {}
};

export const MultiplePassword = Template(defaultAppContext({passwordDeleteDialogProps: {
  resources: [
    {name: "My Password"},
    {name: "My Another Password"}
  ]
}})).bind({});
MultiplePassword.args = {
  onClose: () => {}
};



export const WithLongPassword = Template(defaultAppContext({passwordDeleteDialogProps: {
  resources: [
    {name: "MyPassword".repeat(10)},
  ]
}})).bind({});
MultiplePassword.args = {
  onClose: () => {}
};
