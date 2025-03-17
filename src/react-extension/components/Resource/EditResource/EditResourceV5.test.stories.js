import {MemoryRouter} from "react-router-dom";
import React from "react";
import MockPort from "../../../test/mock/MockPort";
import {defaultProps, defaultTotpProps} from "./EditResourceV5.test.data";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP, TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import DialogContextProvider from "../../../contexts/DialogContext";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import EditResourceV5 from "./EditResourceV5";
import {defaultTotpDto} from "../../../../shared/models/entity/totp/totpDto.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";

export default {
  title: 'Components/Resource/EditResourceV5',
  component: EditResourceV5,
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

const mockedDefaultPort = new MockPort();
mockedDefaultPort.addRequestListener("passbolt.secret.find-by-resource-id", () => ({password: "secret-decrypted", description: "description"}));

const mockedPortPasswordDescriptionTotp = new MockPort();
mockedPortPasswordDescriptionTotp.addRequestListener("passbolt.secret.find-by-resource-id", () => ({password: "secret-decrypted", description: "description", totp: defaultTotpDto()}));

const mockedPortTotp = new MockPort();
mockedPortTotp.addRequestListener("passbolt.secret.find-by-resource-id", () => ({totp: defaultTotpDto()}));

const mockedPasswordStringPort = new MockPort();
mockedPasswordStringPort.addRequestListener("passbolt.secret.find-by-resource-id", () => ({password: "secret-decrypted"}));

const defaultV5Props = defaultProps();
defaultV5Props.context.port = mockedDefaultPort;
export const Default = {
  args: defaultV5Props
};

const defaultV5DefaultTotpProps = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP})});
defaultV5DefaultTotpProps.context.port = mockedPortPasswordDescriptionTotp;
export const DefaultTotp = {
  args: defaultV5DefaultTotpProps
};

const defaultV5TotpProps = defaultTotpProps();
defaultV5TotpProps.context.port = mockedPortTotp;
export const Totp = {
  args: defaultV5TotpProps
};

const defaultV5StringProps = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING})});
defaultV5StringProps.context.port = mockedPasswordStringPort;
export const String = {
  args: defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING})})
};

const defaultLegacyProps = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION})});
defaultLegacyProps.context.port = mockedDefaultPort;
export const DefaultLegacy = {
  args: defaultLegacyProps
};

const defaultV4DefaultTotpProps = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP})});
defaultV4DefaultTotpProps.context.port = mockedPortPasswordDescriptionTotp;
export const DefaultTotpLegacy = {
  args: defaultV4DefaultTotpProps
};

const legacyTotpProps = defaultTotpProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP})});
legacyTotpProps.context.port = mockedPortTotp;
export const TotpLegacy = {
  args: legacyTotpProps
};

const legacyStringProps = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
legacyStringProps.context.port = mockedPasswordStringPort;
export const StringLegacy = {
  args: legacyStringProps
};


const mockedLoadingPort = new MockPort();

mockedLoadingPort.addRequestListener("passbolt.secret.find-by-resource-id", () => new Promise(resolve => resolve));
const loadingProps = defaultProps();
loadingProps.context.port = mockedLoadingPort;
export const Loading = {
  args: loadingProps
};
