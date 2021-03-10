import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import SidebarTagFilterSection from "./SidebarTagFilterSection";
import PropTypes from "prop-types";


export default {
  title: 'Passbolt/Tag/SidebarTagFilterSection',
  component: SidebarTagFilterSection,
};

const defaultContext = {
  resources: [
    {
      tags: [
        {id: 1, slug: 'Apache'}
      ]
    },
    {
      tags: [
        {id: 2, slug: 'Charlie'},
        {id: 3, slug: 'Network'}
      ]
    }
  ]
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <SidebarTagFilterSection {...args} {...routerProps}/>}></Route>
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
