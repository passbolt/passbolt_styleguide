import DisplayResourcesList from "./DisplayResourcesList";
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockPort from "../../../test/mock/MockPort";
import {propsWithFilteredResources} from "./DisplayResourcesList.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";

export default {
  title: 'Components/Resource/DisplayResourcesList',
  component: DisplayResourcesList
};

const defaultContext = {
  siteSettings: {
    getServerTimezone: () => new Date().toLocaleString(),
    canIUse: () => true,
  },
  port: new MockPort()
};


const Template = args =>
  <AppContext.Provider value={defaultContext}>
    <MemoryRouter initialEntries={['/']}>
      <div className="page">
        <div className="panel">
          <Route component={routerProps => <DisplayResourcesList {...args} {...routerProps}/>}></Route>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Empty = Template.bind();
Empty.args = {
  resourceWorkspaceContext: defaultResourceWorkspaceContext()
};

export const Populated = Template.bind({});
Populated.args = propsWithFilteredResources();
