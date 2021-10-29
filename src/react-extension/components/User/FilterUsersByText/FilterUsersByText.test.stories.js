import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_app.css";
import FilterUsersByText from "./FilterUsersByText";


export default {
  title: 'Passbolt/User/FilterUsersByText',
  component: FilterUsersByText
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FilterUsersByText {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;


export const Initial = Template.bind({});
