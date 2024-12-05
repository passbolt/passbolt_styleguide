import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import DisplayUserBadgeMenu from "./DisplayUserBadgeMenu";
import {defaultProps} from "./DisplayUserBadgeMenu.test.data";


export default {
  title: 'Components/User/DisplayUserBadgeMenu',
  component: DisplayUserBadgeMenu
};

const Template = args =>
  <div id="container" className="page password">
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayUserBadgeMenu {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
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
    "username": "ada@passbolt.com",
    profile: {
      "first_name": "ada",
      "last_name": "lovelace",
      avatar: {url: {medium: "img/avatar/ada.png", small: "img/avatar/ada.png"}}
    }
  }
};

export const UserAvatarBadgeMenu = {
  args: defaultProps(propsWithUserAvatar)
};
