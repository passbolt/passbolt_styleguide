import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import FolderMoveStrategyDialog from "./FolderMoveStrategyDialog";
import PropTypes from "prop-types";


export default {
  title: 'Passbolt/Folder/FolderMoveStrategyDialog',
  component: FolderMoveStrategyDialog
};

const defaultContext = {
  folders: [
    {id: 1, name: "My folder"}
  ],
  folderMoveStrategyProps: {
    folders: [
      {id: 1}
    ]
  },
  setContext: () => {}
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <FolderMoveStrategyDialog {...args} {...routerProps}/>}></Route>
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





