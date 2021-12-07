import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DeleteResourceTag from "./DeleteResourceTag";


export default {
  title: 'Passbolt/ResourceTag/DeleteResourceTag',
  component: DeleteResourceTag
};

const defaultContext = {
  tagToDelete: {
    id: 1,
    slug: "apache"
  }
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteResourceTag {...args} {...routerProps}/>}></Route>
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
