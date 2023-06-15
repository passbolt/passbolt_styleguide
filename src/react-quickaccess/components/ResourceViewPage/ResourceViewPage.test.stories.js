import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import ResourceViewPage from "./ResourceViewPage";
import {defaultProps, deniedRbacProps, disabledApiFlagsProps} from "./ResourceViewPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/ResourceView',
  component: ResourceViewPage
};

const Template = ({context, initialEntries, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={initialEntries}>
      <Route path="/:id" component={routerProps => <div className="container quickaccess"><ResourceViewPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
  initialEntries: PropTypes.array
};

const parameters = {
  css: "ext_quickaccess"
};

export const ResourceView = Template.bind({});
ResourceView.args = defaultProps({
  initialEntries: ['/8e3874ae-4b40-590b-968a-418f704b9d9a']
});
ResourceView.parameters = parameters;

export const AllApiFlagDisabled = Template.bind({});
AllApiFlagDisabled.args = disabledApiFlagsProps({
  initialEntries: ['/8e3874ae-4b40-590b-968a-418f704b9d9a']
});
AllApiFlagDisabled.parameters = parameters;

export const AllRbacsDenied = Template.bind({});
AllRbacsDenied.args = deniedRbacProps({
  initialEntries: ['/8e3874ae-4b40-590b-968a-418f704b9d9a']
});
AllRbacsDenied.parameters = parameters;
