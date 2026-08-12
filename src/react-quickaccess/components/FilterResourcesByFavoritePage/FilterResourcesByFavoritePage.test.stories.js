import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByFavoritePage from "./FilterResourcesByFavoritePage";
import { defaultProps, noResourcesProps, withFilteredResourcesProps } from "./FilterResourcesByFavoritePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/FilterResourcesByFavorite",
  component: FilterResourcesByFavoritePage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        component={(routerProps) => (
          <div className="container quickaccess">
            <FilterResourcesByFavoritePage {...args} {...routerProps} />
          </div>
        )}
      />
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess",
};

export const InitialLoad = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const NoFavoriteResource = {
  render: Template,
  args: noResourcesProps(),
  parameters: parameters,
};

export const FavoriteResources = {
  render: Template,
  args: withFilteredResourcesProps(),
  parameters: parameters,
};
