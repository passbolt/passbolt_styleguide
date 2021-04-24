import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import RenameResourceFolder from "./RenameResourceFolder";


export default {
  title: 'Passbolt/ResourceFolder/RenameResourceFolder',
  component: RenameResourceFolder
};

const defaultContext = {
  folders: [
    {id: 1, name: "My folder"}
  ],
  folder: {id: 1}
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <RenameResourceFolder {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};



export const Initial = Template.bind({});
Initial.args = {
  context: defaultContext
};

Initial.argTypes = {
  context: {
    control: {
      type: 'object'
    }
  }
};





