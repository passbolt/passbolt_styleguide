import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import NavigateIntoUserSettingsWorkspace from "./NavigateIntoUserSettingsWorkspace";


export default {
  title: 'Components/UserSetting/NavigateIntoUserSettingsWorkspace',
  component: NavigateIntoUserSettingsWorkspace
};

const context = {
  siteSettings: {
    canIUse: () => true
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <div className="panel">
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <NavigateIntoUserSettingsWorkspace {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </div>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});

export const PendingAccountRecovery = Template.bind({});
PendingAccountRecovery.args = {
  hasPendingAccountRecoveryChoice: true
};
