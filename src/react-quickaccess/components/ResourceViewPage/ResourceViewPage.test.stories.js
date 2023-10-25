import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import ResourceViewPage from "./ResourceViewPage";
import {
  defaultProps,
  deniedRbacProps,
  disabledApiFlagsProps,
  standaloneTotpResourceProps,
  totpResourceProps
} from "./ResourceViewPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/ResourceView',
  component: ResourceViewPage
};

const Template = ({context, initialEntries, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={[initialEntries]}>
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
ResourceView.args = defaultProps();
ResourceView.parameters = parameters;

export const AllApiFlagDisabled = Template.bind({});
AllApiFlagDisabled.args = disabledApiFlagsProps();
AllApiFlagDisabled.parameters = parameters;

export const AllRbacsDenied = Template.bind({});
AllRbacsDenied.args = deniedRbacProps();
AllRbacsDenied.parameters = parameters;

export const TotpResourceView = Template.bind({});
TotpResourceView.args = totpResourceProps();
TotpResourceView.parameters = parameters;

export const StandaloneTotpResourceView = Template.bind({});
StandaloneTotpResourceView.args = standaloneTotpResourceProps();
StandaloneTotpResourceView.parameters = parameters;
