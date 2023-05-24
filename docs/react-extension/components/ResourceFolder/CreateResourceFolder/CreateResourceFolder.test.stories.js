import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import MockPort from "../../../test/mock/MockPort";
import CreateResourceFolder from "./CreateResourceFolder";


export default {
  title: 'Components/ResourceFolder/CreateResourceFolder',
  component: CreateResourceFolder
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <CreateResourceFolder {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.folders.create", data => data);

export const Initial = Template.bind({});
Initial.args = {
  onClose: () => {},
  context: {
    folderCreateDialogProps: {
      folderParentId: "test"
    },
    port: mockedPort
  }
};
