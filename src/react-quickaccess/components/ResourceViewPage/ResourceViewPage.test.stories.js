import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import ResourceViewPage from "./ResourceViewPage";
import {
  defaultProps,
  deniedRbacProps,
  disabledApiFlagsProps,
  multipleUrisResourceProps,
  standaloneCustomFieldsResourceProps,
  standaloneNoteResourceProps,
  standalonePinCodeResourceProps,
  standaloneTotpResourceProps,
  totpResourceProps,
  v5DefaultResourceProps,
  v5DefaultTotpResourceProps,
} from "./ResourceViewPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/ResourceView",
  component: ResourceViewPage,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <MemoryRouter initialEntries={[args.initialEntries]}>
          <Route
            path="/:id"
            component={(routerProps) => (
              <div className="container quickaccess">
                <Story {...args} {...routerProps} />
              </div>
            )}
          />
        </MemoryRouter>
      </AppContext.Provider>
    ),
  ],
  parameters: {
    css: "ext_quickaccess",
  },
};

export const ResourceView = {
  args: defaultProps(),
};

export const AllApiFlagDisabled = {
  args: disabledApiFlagsProps(),
};

export const AllRbacsDenied = {
  args: deniedRbacProps(),
};

export const TotpResourceView = {
  args: totpResourceProps(),
};

export const StandaloneTotpResourceView = {
  args: standaloneTotpResourceProps(),
};

export const ResourceMultipleUrisView = {
  args: multipleUrisResourceProps(),
};

export const StandalonePinCode = {
  args: standalonePinCodeResourceProps(),
};

export const StandaloneNote = {
  args: standaloneNoteResourceProps(),
};

export const StandaloneCustomFields = {
  args: standaloneCustomFieldsResourceProps(),
};

export const V5DefaultResourceView = {
  args: v5DefaultResourceProps(),
};

export const V5DefaultTotpResourceView = {
  args: v5DefaultTotpResourceProps(),
};
