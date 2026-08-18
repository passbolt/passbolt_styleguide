import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByGroupPage from "./FilterResourcesByGroupPage";
import { defaultProps, noGroupsProps, withFilteredResourcesProps } from "./FilterResourcesByGroupPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/FilterResourcesByGroup",
  component: FilterResourcesByGroupPage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        path={["/", "/:id"]}
        component={(routerProps) => (
          <div className="container quickaccess">
            <FilterResourcesByGroupPage {...args} {...routerProps} />
          </div>
        )}
      />
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
  initialEntries: PropTypes.array,
};

const parameters = {
  css: "ext_quickaccess",
};

export const InitialLoad = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const NoGroups = {
  render: Template,
  args: noGroupsProps(),
  parameters: parameters,
};

export const GroupsResourcesMatched = {
  render: Template,
  args: withFilteredResourcesProps(),
  parameters: parameters,
};
