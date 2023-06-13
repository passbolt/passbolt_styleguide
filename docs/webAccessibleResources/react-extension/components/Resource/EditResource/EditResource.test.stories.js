import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import {defaultProps} from "./EditResource.test.data";
import EditResource from "./EditResource";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";

/**
 * EditResource stories
 */
export default {
  title: 'Components/Resource/EditResource',
  component: EditResource
};

const props = defaultProps();
props.context.setContext = () => {};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <EditResource {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object
};

export const Initial = Template.bind({});
Initial.args = {...props};
