import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteResourceFolder from "./DeleteResourceFolder";
import {defaultAppContext} from "./DeleteResourceFolder.test.data";


export default {
  title: 'Components/ResourceFolder/DeleteResourceFolder',
  component: DeleteResourceFolder
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
  context: defaultAppContext(),
  onClose: () => {}
};

export const WithLongFolderName = Template.bind({});
WithLongFolderName.args = {
  context: defaultAppContext({
    folders: [
      {id: 1, name: "foldername".repeat(10)}
    ],
    folder: {id: 1}
  })
};

Initial.argTypes = {
  context: {
    control: {
      type: 'object'
    }
  }
};
