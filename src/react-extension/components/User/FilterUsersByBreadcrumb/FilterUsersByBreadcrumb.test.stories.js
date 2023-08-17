import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import FilterUsersByBreadcrumb from "./FilterUsersByBreadcrumb";
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";


export default {
  title: 'Components/User/FilterUsersByBreadcrumb',
  component: FilterUsersByBreadcrumb
};

const context = {};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <FilterUsersByBreadcrumb {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};


export const AllFilter = Template.bind({});
AllFilter.args = {
  userWorkspaceContext: {
    filter: {type: UserWorkspaceFilterTypes.ALL},
    filteredUsers: [{}, {}, {}]
  }
};

export const RecentlyModifiedFilter = Template.bind({});
RecentlyModifiedFilter.args = {
  userWorkspaceContext: {
    filter: {type: UserWorkspaceFilterTypes.RECENTLY_MODIFIED},
    filteredUsers: [{}, {}]
  }
};

export const TextFilter = Template.bind({});
TextFilter.args = {
  userWorkspaceContext: {
    filter: {type: UserWorkspaceFilterTypes.TEXT, payload: 'Ada'},
    filteredUsers: [{}]
  }
};


export const GroupFilter = Template.bind({});
GroupFilter.args = {
  userWorkspaceContext: {
    filter: {type: UserWorkspaceFilterTypes.GROUP,  payload: {group: {name: "My super group"}}},
    filteredUsers: []
  }
};
