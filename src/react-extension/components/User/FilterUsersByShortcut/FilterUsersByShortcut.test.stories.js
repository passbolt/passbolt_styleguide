import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import FilterUsersByShortcut from "./FilterUsersByShortcut";


export default {
  title: 'Components/User/FilterUsersByShortcut',
  component: FilterUsersByShortcut
};

const context = {};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel">
        <Route component={routerProps => <FilterUsersByShortcut {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
