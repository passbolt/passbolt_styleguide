import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import EditResourceDescription from "./EditResourceDescription";
import MockPort from "../../../test/mock/MockPort";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {TEST_RESOURCE_TYPE_PASSWORD_STRING} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";


export default {
  title: 'Components/ResourceDescription/EditResourceDescription',
  component: EditResourceDescription
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: (new URL(window.location.href)).origin
      }
    }
  },
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
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    metadata: {
      description: "This is an amazing resource!",
      resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
      uris: ["https://passbolt.com"],
    }
  },
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  onClose: () => {}
};
