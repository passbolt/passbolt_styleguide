import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import PropTypes from "prop-types";
import HomePage from "./HomePage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockNoResource, mockResources} from "./HomePage.test.data";


export default {
  title: 'Passbolt/QuickAccess/Home',
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

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext()
};

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
export const noResource = Template.bind({});
noResource.args = {
  context: defaultAppContext(contextNoResource)
};

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
export const noFoundResource = Template.bind({});
noFoundResource.args = {
  context: defaultAppContext(contextSearchNotFoundResource)
};

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




