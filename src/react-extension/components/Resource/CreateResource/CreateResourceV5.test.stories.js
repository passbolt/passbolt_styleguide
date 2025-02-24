import {MemoryRouter} from "react-router-dom";
import React from "react";
import MockPort from "../../../test/mock/MockPort";
import {defaultAppContext, defaultProps} from "./CreateResource.test.data";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import CreateResourceV5 from "./CreateResourceV5";

export default {
  title: 'Components/Resource/CreateResourceV5',
  component: CreateResourceV5,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/passwords']}>
      <div style={{margin: "-1rem"}}>
        <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
          <Story {...args}/>
        </ResourceWorkspaceContext.Provider>
      </div>
    </MemoryRouter>
  ],
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.resources.create", data => data);

export const Default = {
  args: {
    context: defaultAppContext({port: mockedPort}),
    ...defaultProps()
  }
};
