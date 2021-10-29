import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import EditResourceTag from "./EditResourceTag";


export default {
  title: 'Passbolt/ResourceTag/EditResourceTag',
  component: EditResourceTag
};

const defaultContext = {
  tagToEdit: {
    id: 1,
    slug: "apache"
  }
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
  context: defaultContext
};

Initial.argTypes = {
  context: {
    control: {
      type: 'object'
    }
  }
};
