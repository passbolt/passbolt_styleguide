import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import MoreFiltersPage from "./MoreFiltersPage";

export default {
  title: 'Passbolt/QuickAccess/MoreFilters',
  component: MoreFiltersPage
};

const Template = () =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <div className="container quickaccess"><MoreFiltersPage {...routerProps}/></div>}/>
  </MemoryRouter>;


export const Initial = Template.bind({});
Initial.args = {
};
