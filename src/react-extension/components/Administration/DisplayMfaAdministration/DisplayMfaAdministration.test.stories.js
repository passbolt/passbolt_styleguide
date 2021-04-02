import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DisplayMfaAdministration from "./DisplayMfaAdministration";


export default {
  title: 'Passbolt/Administration/DisplayMfaAdministration',
  component: DisplayMfaAdministration
};

const context = {};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayMfaAdministration {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  administrationWorkspaceContext: {
    onGetMfaRequested: () => ({
      body: {
        providers: []
      }
    })
  }
};

