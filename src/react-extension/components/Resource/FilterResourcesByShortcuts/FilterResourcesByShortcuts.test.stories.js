import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import "../../../../css/themes/midgar/ext_app.css";
import FilterResourcesByShortcuts from "./FilterResourcesByShortcuts";


export default {
  title: 'Passbolt/Password/FilterResourcesByShortcuts',
  component: FilterResourcesByShortcuts
};

const context = {};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <FilterResourcesByShortcuts {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
