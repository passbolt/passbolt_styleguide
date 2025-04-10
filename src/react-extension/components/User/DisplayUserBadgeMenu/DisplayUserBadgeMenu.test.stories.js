import React from "react";
import DisplayUserBadgeMenu from "./DisplayUserBadgeMenu";
import {defaultProps} from "./DisplayUserBadgeMenu.test.data";


export default {
  title: 'Components/User/DisplayUserBadgeMenu',
  decorators: [
    Story => (
      <div className="page">
        <div className="app">
          <div className="panel main">
            <div className="panel middle">
              <div className="header">
                <div className="header-right">
                  <Story/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ],
  component: DisplayUserBadgeMenu
};

export const DefaultUserBadgeMenu = {
  args: defaultProps()
};

const propsAttentionRequired = {
  accountRecoveryContext: {
    isAccountRecoveryChoiceRequired: () => true
  }
};

export const AttentionRequired = {
  args: defaultProps(propsAttentionRequired)
};

const propsWithUserAvatar = {
  user: {
    "username": "user@passbolt.com",
    profile: {
      "first_name": "User",
      "last_name": "Passbolt",
      avatar: {url: {medium: "img/logo/icon-64.png", small: "img/logo/icon-32.png"}}
    }
  }
};

export const UserAvatarBadgeMenu = {
  args: defaultProps(propsWithUserAvatar)
};
