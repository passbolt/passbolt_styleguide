import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DisplayUserTheme from "./DisplayUserTheme";


export default {
  title: 'Passbolt/UserSetting/DisplayUserTheme',
  component: DisplayUserTheme
};

const context = {
  userSettings: {
    getTheme: () => ({name: 'toto', preview: 'ttoo'})
  },
  port: {
    request: () => ([
      {
        name: 'default',
        preview: 'ttoo'
      },
      {
        name: 'midgar',
        preview: 'ttoo'
      }
    ])
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayUserTheme {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
