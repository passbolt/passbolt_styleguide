import React from "react";
import DisplayUserTheme from "./DisplayUserTheme";
import {defaultAppContext, defaultProps, themes} from "./DisplayUserTheme.test.data";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/UserSetting/DisplayUserTheme',
  component: DisplayUserTheme
};


const Template = args =>
  <DisplayUserTheme {...args}/>;

const mockedPort = new MockPort();
mockedPort.addRequestListener('passbolt.themes.find-all', () => themes);

export const Initial = Template.bind({});
Initial.args = defaultProps({context: defaultAppContext({port: mockedPort})});
