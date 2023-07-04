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

export const Initial = Template.bind({});
Initial.args = defaultProps();

const propsAttentionRequired = {
  accountRecoveryContext: {
    isAccountRecoveryChoiceRequired: () => true
  }
};
export const AttentionRequired = Template.bind({});
AttentionRequired.args = defaultProps(propsAttentionRequired);
