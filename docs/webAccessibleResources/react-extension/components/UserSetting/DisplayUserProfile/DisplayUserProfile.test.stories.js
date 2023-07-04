import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DisplayUserProfile from "./DisplayUserProfile";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";


export default {
  title: 'Components/UserSetting/DisplayUserProfile',
  component: DisplayUserProfile
};

const context = {
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
  },
  siteSettings: {
    canIUse: () => true
  },
  loggedInUser:  {
    "id": "f848277c-5398-58f8-a82a-72397af2d450",
    "role_id": TEST_ROLE_USER_ID,
    "role": {
      "name": "admin"
    },
    "username": "ada@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2020-08-13T10:10:02+00:00",
    "modified": "2020-09-13T10:10:02+00:00",
    "profile": {
      "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "first_name": "Ada",
      "last_name": "Lovelace",
      "created": "2020-10-13T10:10:02+00:00",
      "modified": "2020-10-13T10:10:02+00:00",
      "avatar": {
        "url": {
          "medium": "img/avatar/user_medium.png",
          "small": "img/avatar/user.png"
        }
      }
    },
    "is_mfa_enabled": false,
    "last_logged_in": null
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <div id="container" className="page settings">
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <DisplayUserProfile {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </div>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
