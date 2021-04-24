import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import NavigateIntoUserSettingsWorkspace from "./NavigateIntoUserSettingsWorkspace";


export default {
  title: 'Passbolt/UserSetting/NavigateIntoUserSettingsWorkspace',
  component: NavigateIntoUserSettingsWorkspace
};

const context = {
  siteSettings: {
    canIUse: () => true
  }
};


const Template = args =>
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <div className="panel">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <NavigateIntoUserSettingsWorkspace {...args} {...routerProps}/>}></Route>
        </MemoryRouter>
      </div>
    </AppContext.Provider>
  </MockTranslationProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
