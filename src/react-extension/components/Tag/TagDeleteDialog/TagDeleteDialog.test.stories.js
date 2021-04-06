import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import TagDeleteDialog from "./TagDeleteDialog";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";


export default {
  title: 'Passbolt/Tag/TagDeleteDialog',
  component: TagDeleteDialog
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
      <Route component={routerProps => <TagDeleteDialog {...args} {...routerProps}/>}></Route>
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

