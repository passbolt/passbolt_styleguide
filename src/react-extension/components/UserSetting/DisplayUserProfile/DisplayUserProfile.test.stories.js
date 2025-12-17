import React from "react";
import DisplayUserProfile from "./DisplayUserProfile";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/roleEntity.test.data";
import DisplayUserProfileHelp from "./DisplayUserProfileHelp";
import {defaultUserRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";


export default {
  title: 'Components/UserSetting/DisplayUserProfile',
  component: DisplayUserProfile,
  decorators: [(Story, {args}) =>
    <div id="container" className="page settings">
      <div id="app" className="app" tabIndex="1000" style={{margin: "-1rem"}}>
        <div className="panel main">
          <div className="panel left">
            <div className="sidebar-content">
            </div>
          </div>
          <div className="panel middle">
            <div className="header">
            </div>
            <div className="middle-right">
              <div className="breadcrumbs-and-grid">
                <div className="top-bar">
                </div>
                <div className="main-page">
                  <Story {...args}/>
                </div>
              </div>
              <div className="help-panel">
                <div className="sidebar-help">
                  <DisplayUserProfileHelp {...args}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ],
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

export const Initial = {
  args: {
    context: context,
    rbacContext: defaultUserRbacContext(),
  }
};
