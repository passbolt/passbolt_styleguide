import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import EditResourceDescription from "./EditResourceDescription";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import MockPort from "../../../test/mock/MockPort";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";


export default {
  title: 'Components/ResourceDescription/EditResourceDescription',
  component: EditResourceDescription
};

const siteSettings = new SiteSettings(siteSettingsFixture);
const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesCollectionDto());

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: (new URL(window.location.href)).origin
      }
    }
  },
  resourceTypesSettings,
  port: new MockPort()
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <div className="accordion sidebar-section">
          <div className="accordion-content">
            <Route component={routerProps => <EditResourceDescription {...args} {...routerProps}/>}></Route>
          </div>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  resource: {
    "resource_type_id": "669f8c64-242a-59fb-92fc-81f660975fd3"
  },
  onClose: () => {}
};
