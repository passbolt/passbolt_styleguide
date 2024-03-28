import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import CreateResource from "./CreateResource";
import MockPort from "../../../test/mock/MockPort";
import {defaultAppContext, defaultProps} from "./CreateResource.test.data";

export default {
  title: 'Components/Resource/CreateResource',
  component: CreateResource,
  argTypes: {
    language: {
      control: {
        type: 'select',
        options: ['en-US', 'fr']
      }
    }
  }
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.resources.create", data => data);

const Template = ({context, ...args})  =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object
};

export const PasswordInDictionary = Template.bind({});
PasswordInDictionary.args = {
  context: defaultAppContext({port: mockedPort}),
  ...defaultProps()
};
