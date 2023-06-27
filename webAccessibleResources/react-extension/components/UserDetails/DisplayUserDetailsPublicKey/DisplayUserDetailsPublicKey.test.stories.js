import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DisplayUserDetailsPublicKey from "./DisplayUserDetailsPublicKey";
import {mockGpgKey, mockInvalidGpgKey} from "./DisplayUserDetailsPublicKey.test.data";

export default {
  title: 'Components/UserDetails/DisplayUserDetailsPublicKey',
  component: DisplayUserDetailsPublicKey
};

function defaultContext(data = {}) {
  const defaultData = {
    port: {
      request: () => mockGpgKey
    }
  };
  return Object.assign(defaultData, data);
}

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <div className="panel aside">
      <div className="detailed-information">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <DisplayUserDetailsPublicKey {...args} {...routerProps}/>}></Route>
        </MemoryRouter>
      </div>
    </div>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultContext(),
  userWorkspaceContext: {
    details: {
      user: {
        "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      }
    }
  }
};

export const InvalidKey = Template.bind({});
InvalidKey.args = {
  context: defaultContext({
    port: {
      request: () => mockInvalidGpgKey
    }
  }),
  userWorkspaceContext: {
    details: {
      user: {
        "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      }
    }
  }
};
