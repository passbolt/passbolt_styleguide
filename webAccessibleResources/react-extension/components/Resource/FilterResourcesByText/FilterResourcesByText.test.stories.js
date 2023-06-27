import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import FilterResourcesByText from "./FilterResourcesByText";


export default {
  title: 'Components/Resource/FilterResourcesByText',
  component: FilterResourcesByText
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FilterResourcesByText {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;


export const Initial = Template.bind({});
