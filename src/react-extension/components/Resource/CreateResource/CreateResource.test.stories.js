import {MemoryRouter} from "react-router-dom";
import React from "react";
import {defaultProps, defaultTotpProps} from "./CreateResource.test.data";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import CreateResource from "./CreateResource";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto, resourceTypePasswordStringDto, resourceTypeTotpDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import DialogContextProvider from "../../../contexts/DialogContext";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";

export default {
  title: 'Components/Resource/CreateResource',
  component: CreateResource,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/passwords']}>
      <div style={{margin: "-1rem"}}>
        <AppContext.Provider value={args.context}>
          <DialogContextProvider>
            <ActionFeedbackContext.Provider value={args.actionFeedbackContext}>
              <ResourceTypesLocalStorageContext.Provider value={{get: () => args.resourceTypes, resourceTypes: args.resourceTypes}}>
                <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
                  <ResourcePasswordGeneratorContext.Provider value={args.resourcePasswordGeneratorContext}>
                    <ManageDialogs/>
                    <Story {...args}/>
                  </ResourcePasswordGeneratorContext.Provider>
                </ResourceWorkspaceContext.Provider>
              </ResourceTypesLocalStorageContext.Provider>
            </ActionFeedbackContext.Provider>
          </DialogContextProvider>
        </AppContext.Provider>
      </div>
    </MemoryRouter>
  ],
};

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
