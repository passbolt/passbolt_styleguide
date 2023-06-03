import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import RenameResourceFolder from "./RenameResourceFolder";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourceFolder/RenameResourceFolder',
  component: RenameResourceFolder
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.folders.update", data => data);

const defaultContext = {
  folders: [
    {id: 1, name: "My folder"}
  ],
  folder: {id: 1},
  setContext: () => {},
  port: mockedPort
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <RenameResourceFolder {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
  onClose: () => {}
};


export const Initial = Template.bind({});
Initial.args = {
  context: defaultContext,
  onClose: () => {}
};

Initial.argTypes = {
  context: {
    control: {
      type: 'object'
    }
  }
};
