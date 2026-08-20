import { MemoryRouter, Route } from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import FilterUsersByBreadcrumb from "./FilterUsersByBreadcrumb";
import { UserWorkspaceFilterTypes } from "../../../contexts/UserWorkspaceContext";

export default {
  title: "Components/User/FilterUsersByBreadcrumb",
  component: FilterUsersByBreadcrumb,
};

const context = {};

const Template = (args) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route component={(routerProps) => <FilterUsersByBreadcrumb {...args} {...routerProps} />}></Route>
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

export const AllFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.ALL },
      filteredUsers: [{}, {}, {}],
    },
  },
};

export const RecentlyModifiedFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.RECENTLY_MODIFIED },
      filteredUsers: [{}, {}],
    },
  },
};

export const TextFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.TEXT, payload: "Ada" },
      filteredUsers: [{}],
    },
  },
};

export const GroupFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.GROUP, payload: { group: { name: "My super group" } } },
      filteredUsers: [],
    },
  },
};

export const AttentionRequiredRequestsFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST },
      filteredUsers: [{}, {}],
    },
  },
};

export const MissingMetadataKeyFilter = {
  render: Template,

  args: {
    userWorkspaceContext: {
      filter: { type: UserWorkspaceFilterTypes.MISSING_METADATA_KEY },
      filteredUsers: [{}, {}, {}],
    },
  },
};
