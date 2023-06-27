import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DefineResourceFolderMoveStrategy from "./DefineResourceFolderMoveStrategy";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourceFolder/DefineResourceFolderMoveStrategy',
  component: DefineResourceFolderMoveStrategy
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
  port: new MockPort(),
  setContext: () => {}
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DefineResourceFolderMoveStrategy {...args} {...routerProps}/>}></Route>
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
