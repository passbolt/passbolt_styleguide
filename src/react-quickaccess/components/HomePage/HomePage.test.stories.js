import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from "./HomePage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockNoResource, mockResources} from "./HomePage.test.data";


export default {
  title: 'Components/QuickAccess/Home',
  component: HomePage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><HomePage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext()
};
Initial.parameters = parameters;

const contextNoResource = {
  storage: {
    onChanged: {
      addListener: () => {}
    },
    local: {
      get: () => mockNoResource
    }
  },
};
export const NoResource = Template.bind({});
NoResource.args = {
  context: defaultAppContext(contextNoResource)
};
NoResource.parameters = parameters;

const contextSearchNotFoundResource = {
  storage: {
    onChanged: {
      addListener: () => {}
    },
    local: {
      get: () => mockNoResource
    }
  },
  search: "apache",
};
export const NoFoundResource = Template.bind({});
NoFoundResource.args = {
  context: defaultAppContext(contextSearchNotFoundResource)
};
NoFoundResource.parameters = parameters;

const contextSearchResources = {
  storage: {
    onChanged: {
      addListener: () => {}
    },
    local: {
      get: () => mockResources
    }
  },
  search: "apache",
};
export const SearchResources = Template.bind({});
SearchResources.args = {
  context: defaultAppContext(contextSearchResources)
};
SearchResources.parameters = parameters;

const contextResources = {
  storage: {
    onChanged: {
      addListener: () => {}
    },
    local: {
      get: () => mockResources
    }
  }
};
export const SuggestedResources = Template.bind({});
SuggestedResources.args = {
  context: defaultAppContext(contextResources)
};
SuggestedResources.parameters = parameters;
