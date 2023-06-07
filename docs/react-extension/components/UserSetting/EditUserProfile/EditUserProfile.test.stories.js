import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import EditUserProfile from "./EditUserProfile";


export default {
  title: 'Components/UserSetting/EditUserProfile',
  component: EditUserProfile
};

const context = {
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
  },
  locale: "en-UK",
  siteSettings: {
    canIUse: () => true,
    supportedLocales: [
      {
        locale: "fr-FR",
        label: "French"
      },
      {
        locale: "en-UK",
        label: "English"
      }
    ]
  },
  loggedInUser:  {
    "id": "f848277c-5398-58f8-a82a-72397af2d450",
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
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
  },
  setContext: () => {},
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <EditUserProfile {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  onClose: () => {}
};
