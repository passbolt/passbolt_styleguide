import "../../../../shared/components/Icons/ResourceIcon.test.init";
import DisplayResourcesList from "./DisplayResourcesList";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import { propsWithFilteredResources, propsWithStressFilteredResources } from "./DisplayResourcesList.test.data";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";

export default {
  title: "Components/Resource/DisplayResourcesList",
  component: DisplayResourcesList,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <MemoryRouter initialEntries={["/"]}>
          <div className="page" style={{ height: "600px" }}>
            <div className="panel" style={{ height: "100%" }}>
              <Route component={(routerProps) => <DisplayResourcesList {...args} {...routerProps} />} />
            </div>
          </div>
        </MemoryRouter>
      </AppContext.Provider>
    ),
  ],
};

export const Empty = {
  args: {
    context: defaultAppContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
  },
};

export const Populated = {
  args: propsWithFilteredResources(),
};

export const StressWithLargeResourcesList = {
  args: propsWithStressFilteredResources(),
};
