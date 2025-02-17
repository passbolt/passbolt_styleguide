import {MemoryRouter} from "react-router-dom";
import React from "react";
import CreateResource from "./CreateResource";
import MockPort from "../../../test/mock/MockPort";
import {defaultAppContext, defaultProps} from "./CreateResource.test.data";

export default {
  title: 'Components/Resource/CreateResource',
  component: CreateResource,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/passwords']}>
      <div style={{margin: "-1rem"}}>
        <Story {...args}/>
      </div>
    </MemoryRouter>
  ],
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.resources.create", data => data);

export const PasswordInDictionary = {
  args: {
    context: defaultAppContext({port: mockedPort}),
    ...defaultProps()
  }
};
