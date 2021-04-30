import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_app.css";
import FilterResourcesByText from "./FilterResourcesByText";


export default {
  title: 'Passbolt/Resource/FilterResourcesByText',
  component: FilterResourcesByText
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FilterResourcesByText {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;



export const Initial = Template.bind({});
