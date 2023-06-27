import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import MoreFiltersPage from "./MoreFiltersPage";

export default {
  title: 'Components/QuickAccess/MoreFilters',
  component: MoreFiltersPage
};

const Template = () =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <div className="container quickaccess"><MoreFiltersPage {...routerProps}/></div>}/>
  </MemoryRouter>;


export const Initial = Template.bind({});
Initial.args = {
};
Initial.parameters = {
  css: "ext_quickaccess"
};
