import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import EditResourceTag from "./EditResourceTag";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourceTag/EditResourceTag',
  component: EditResourceTag
};

const defaultContext = {
  tagToEdit: {
    id: 1,
    slug: "apache"
  },
  setContext: () => {},
  port: new MockPort()
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <EditResourceTag {...args} {...routerProps}/>}></Route>
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
