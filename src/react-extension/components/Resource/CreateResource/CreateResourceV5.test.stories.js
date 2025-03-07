import {MemoryRouter} from "react-router-dom";
import React from "react";
import MockPort from "../../../test/mock/MockPort";
import {defaultProps, defaultTotpProps} from "./CreateResourceV5.test.data";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import CreateResourceV5 from "./CreateResourceV5";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto, resourceTypePasswordStringDto, resourceTypeTotpDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

export default {
  title: 'Components/Resource/CreateResourceV5',
  component: CreateResourceV5,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/passwords']}>
      <div style={{margin: "-1rem"}}>
        <AppContext.Provider value={args.context}>
          <ResourceTypesLocalStorageContext.Provider value={{get: () => args.resourceTypes, resourceTypes: args.resourceTypes}}>
            <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
              <ResourcePasswordGeneratorContext.Provider value={args.resourcePasswordGeneratorContext}>
                <Story {...args}/>
              </ResourcePasswordGeneratorContext.Provider>
            </ResourceWorkspaceContext.Provider>
          </ResourceTypesLocalStorageContext.Provider>
        </AppContext.Provider>
      </div>
    </MemoryRouter>
  ],
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.resources.create", data => data);

export const Default = {
  args: defaultProps()
};

export const Totp = {
  args: defaultTotpProps()
};

export const DefaultLegacy = {
  args: defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())})
};

export const TotpLegacy = {
  args: defaultTotpProps({resourceType: new ResourceTypeEntity(resourceTypeTotpDto())})
};

export const StringLegacy = {
  args: defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto())})
};
