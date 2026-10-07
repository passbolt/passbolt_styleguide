import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import ResourceViewPage from "./ResourceViewPage";
import {
  defaultProps,
  deniedRbacProps,
  disabledApiFlagsProps,
  multipleUrisResourceProps,
  standaloneTotpResourceProps,
  totpResourceProps,
} from "./ResourceViewPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/ResourceView",
  component: ResourceViewPage,
};

const Template = ({ context, initialEntries, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={[initialEntries]}>
      <Route
        path="/:id"
        component={(routerProps) => (
          <div className="container quickaccess">
            <ResourceViewPage {...args} {...routerProps} />
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

export const ResourceView = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const AllApiFlagDisabled = {
  render: Template,
  args: disabledApiFlagsProps(),
  parameters: parameters,
};

export const AllRbacsDenied = {
  render: Template,
  args: deniedRbacProps(),
  parameters: parameters,
};

export const TotpResourceView = {
  render: Template,
  args: totpResourceProps(),
  parameters: parameters,
};

export const StandaloneTotpResourceView = {
  render: Template,
  args: standaloneTotpResourceProps(),
  parameters: parameters,
};

export const ResourceMultipleUrisView = {
  render: Template,
  args: multipleUrisResourceProps(),
  parameters: parameters,
};
