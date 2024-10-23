import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DisplayResourceFolderDetailsInformation from "./DisplayResourceFolderDetailsInformation";
import {defaultAppContext, defaultProps} from "./DisplayResourceFolderDetailsInformation.test.data";


export default {
  title: 'Components/ResourceFolderDetails/DisplayResourceFolderDetailsInformation',
  component: DisplayResourceFolderDetailsInformation
};

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  }
};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <Route component={routerProps => <DisplayResourceFolderDetailsInformation {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
  ...defaultProps()
};
