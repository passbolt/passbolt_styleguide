import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DisplayUserTheme from "./DisplayUserTheme";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/UserSetting/DisplayUserTheme',
  component: DisplayUserTheme
};

const themes = [
  {
    id:  'default',
    name: 'default',
    preview: 'img/themes/default.png'
  },
  {
    id:  'midgar',
    name: 'midgar',
    preview: 'img/themes/midgar.png'
  }
];

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.themes.find-all", () => themes);

const context = {
  userSettings: {
    getTheme: () => ({name: 'toto', preview: 'ttoo'})
  },
  port: mockedPort
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
