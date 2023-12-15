import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DeleteResource from "./DeleteResource";
import {
  defaultPropsMultipleResource,
  defaultPropsOneResource,
  defaultPropsOneResourceLongPassword
} from "./DeleteResource.test.data";


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

export const SinglePassword = Template().bind({});
SinglePassword.args = defaultPropsOneResource();

export const MultiplePassword = Template().bind({});
MultiplePassword.args = defaultPropsMultipleResource();



export const WithLongPassword = Template().bind({});
WithLongPassword.args = defaultPropsOneResourceLongPassword();
