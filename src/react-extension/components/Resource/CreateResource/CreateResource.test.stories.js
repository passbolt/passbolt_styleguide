import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import CreateResource from "./CreateResource";
import MockPort from "../../../test/mock/MockPort";
import {defaultProps} from "./CreateResource.test.data";
import {
  defaultPasswordPoliciesContext
} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";

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

const context = {
  userSettings: {
    getSecurityTokenBackgroundColor: () => '#FFFF',
    getSecurityTokenTextColor: () => '#080808',
    getSecurityTokenCode: () => 'ABC'
  },
  resourceTypesSettings: {
    areResourceTypesEnabled: () => true,
    isEncryptedDescriptionEnabled: () => true,
    findResourceTypeIdBySlug: () => "type id",
    DEFAULT_RESOURCE_TYPES_SLUGS: {
      PASSWORD_AND_DESCRIPTION: "password and description"
    },
    isLegacyResourceTypeEnabled: () => true
  },
  siteSettings: {
    canIUse: () => true,
  },
  passwordPoliciesContext: defaultPasswordPoliciesContext(),
  setContext: () => {},
  port: mockedPort
};

const Template = ({context, ...args})  =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object
};

export const Initial = Template.bind({});
Initial.args = {
  context: context,
  ...defaultProps()
};
