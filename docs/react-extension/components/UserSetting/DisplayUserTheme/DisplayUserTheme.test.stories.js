import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
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
  },
  {
    id:  'solarized_dark',
    name: 'solarized_dark',
    preview: 'img/themes/solarized_dark.png'
  },
  {
    id:  'solarized_light',
    name: 'solarized_light',
    preview: 'img/themes/solarized_light.png'
  },
];

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.themes.find-all", () => themes);

const context = {
  userSettings: {
    getTheme: () => ({name: 'midgar'})
  },
  port: mockedPort
};


const Template = args =>
  <AppContext.Provider value={context}>
    <DisplayUserTheme {...args}/>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
