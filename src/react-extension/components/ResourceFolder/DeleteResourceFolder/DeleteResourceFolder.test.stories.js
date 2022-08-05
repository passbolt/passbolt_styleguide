import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DeleteResourceFolder from "./DeleteResourceFolder";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourceFolder/DeleteResourceFolder',
  component: DeleteResourceFolder
};

const defaultContext = {
  folders: [
    {id: 1, name: "My folder"}
  ],
  folder: {id: 1},
  port: new MockPort(),
  setContext: () => {}
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteResourceFolder {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
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
