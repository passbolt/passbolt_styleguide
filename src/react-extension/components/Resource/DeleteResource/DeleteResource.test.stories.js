import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import DeleteResource from "./DeleteResource";
import MockPort from "../../../test/mock/MockPort";


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

const singleContext = {
  passwordDeleteDialogProps: {
    resources: [
      {name: "My Password"}
    ]
  },
  setContext: () => {},
  port: new MockPort(),
};
export const SinglePassword = Template(singleContext).bind({});
SinglePassword.args = {
  onClose: () => {}
};

const multipleContext = {
  passwordDeleteDialogProps: {
    resources: [
      {name: "My Password"},
      {name: "My Another Password"}
    ]
  },
  setContext: () => {},
  port: new MockPort(),
};
export const MultiplePassword = Template(multipleContext).bind({});
MultiplePassword.args = {
  onClose: () => {}
};

