import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import ChangeUserSecurityToken from "./ChangeUserSecurityToken";


export default {
  title: 'Components/UserSetting/ChangeUserSecurityToken',
  component: ChangeUserSecurityToken
};

const context = {
  userSettings: {
    getSecurityToken: () => (
      {
        code: "ABC",
        backgroundColor: '#8bc34a'
      }
    )
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="page settings">
        <div className="profile-choose-security-token">
          <Route component={routerProps => <ChangeUserSecurityToken {...args} {...routerProps}/>}></Route>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
