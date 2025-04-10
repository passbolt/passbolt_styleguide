import "../../../../shared/components/Icons/ResourceIcon.test.init";
import DisplayResourcesList from "./DisplayResourcesList";
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {propsWithFilteredResources} from "./DisplayResourcesList.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

export default {
  title: 'Components/Resource/DisplayResourcesList',
  component: DisplayResourcesList,
  decorators: [
    (Story, {args}) =>
      <AppContext.Provider value={args.context}>
        <MemoryRouter initialEntries={['/']}>
          <div className="page">
            <div className="panel">
              <Route component={routerProps =>
                <DisplayResourcesList {...args} {...routerProps}/>}>
              </Route>
            </div>
          </div>
        </MemoryRouter>
      </AppContext.Provider>,
  ]
};

export const Empty = {
  args: {
    context: defaultAppContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext()
  },
};

export const Populated = {
  args: propsWithFilteredResources(),
};
