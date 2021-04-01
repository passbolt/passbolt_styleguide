import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import CreateResource from "./CreateResource";


export default {
  title: 'Passbolt/Resource/CreateResource',
  component: CreateResource
};

const context = {
  userSettings: {
    getSecurityTokenBackgroundColor: () => '#FFFF',
    getSecurityTokenTextColor: () => '#080808',
    getSecurityTokenCode: () => 'ABC'
  },
  resourceTypesSettings: {
    areResourceTypesEnabled: () => true,
    isEncryptedDescriptionEnabled: () => true
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
