/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on PasswordSidebar in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import "../../../../shared/components/Icons/ResourceIcon.test.init";
import React from 'react';
import {defaultProps} from "./DisplayResourceDetails.test.data";
import DisplayResourceDetailsPage from "./DisplayResourceDetails.test.page";
import {
  defaultResourceDto,
  resourceLegacyDto,
  resourceStandaloneTotpDto, resourceWithReadPermissionDto, resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50FreshDto,
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {
  defaultResourceWorkspaceContext,
} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {TEST_RESOURCE_TYPE_V5_DEFAULT} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {waitFor} from "@testing-library/react";
import ResourceMetadataEntity from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity";
import {SECRET_DATA_OBJECT_TYPE} from "../../../../shared/models/entity/secretData/secretDataEntity";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";
import {resourceWithCustomFields} from "./DisplayResourceDetailsCustomFields.test.data";
import {resourceWithMultipleUris, resourceWithOneUris} from "./DisplayResourceDetailsURIs.test.data";
import ActionAbortedMissingMetadataKeys
  from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import {v4 as uuidv4} from "uuid";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import {
  defaultMetadataKeysSettingsDto
} from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";

jest.mock("./DisplayResourceDetailsInformation", () => () => <></>);
jest.mock("./DisplayResourceDetailsPassword", () => () => <div className="password"></div>);
jest.mock("./DisplayResourceDetailsTotp", () => () => <div className="totp"></div>);
jest.mock("./DisplayResourceDetailsCustomFields", () => () => <div className="custom-fields"></div>);
jest.mock("./DisplayResourceDetailsActivity", () => () => <></>);
jest.mock("./DisplayResourceDetailsPermission", () => () => <></>);
jest.mock("./DisplayResourceDetailsDescription", () => () => <div className="description"></div>);
jest.mock("./DisplayResourceDetailsTag", () => () => <></>);
jest.mock("./DisplayResourceDetailsComment", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourceDetails", () => {
  describe('As LU I can see the resource sidebar common part', () => {
    let props, page;

    beforeEach(() => {
      props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsPage(props);
    });

    it('I should see a resource details sidebar', () => {
      expect(page.exists()).toBeTruthy();
    });

    it('I can see the name of the selected resource', async() => {
      expect.assertions(2);
      expect(page.name).toBe(props.resourceWorkspaceContext.details.resource.metadata.name);
      expect(page.subtitle).toBe('Password and Note');
    });

    it('I can copy the resource permalink', async() => {
      expect.assertions(1);

      const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
      const copyClipboardMockImpl = jest.fn((_, data) => data);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);

      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementation(() => {});

      await page.selectPermalink();
      expect(props.clipboardContext.copy).toHaveBeenCalledWith(`${props.context.userSettings.getTrustedDomain()}/app/passwords/view/${props.resourceWorkspaceContext.details.resource.id}`, "The permalink has been copied to clipboard.");
    });
  });

  describe('As LU I can use tabs in the resource sidebar', () => {
    let props, page;

    beforeEach(() => {
      props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsPage(props);
    });

    it('I should see tabs a in the resource sidebar', () => {
      expect.assertions(3);
      expect(page.tabs()).toBeTruthy();
      expect(page.tab(0).textContent).toStrictEqual("Details");
      expect(page.tab(1).textContent).toStrictEqual("Activity");
    });

    it('I should not see tabs a in the resource sidebar if RBAC denies it', () => {
      expect.assertions(1);

      const props = defaultProps({
        rbacContext: denyRbacContext()
      });
      page = new DisplayResourceDetailsPage(props);

      expect(page.tabs()).toBeFalsy();
    });

    it('I can see activity tab context', async() => {
      expect.assertions(2);

      page = new DisplayResourceDetailsPage(props);

      expect(page.activeTab.textContent).toStrictEqual("Details");
      await page.click(page.tab(1));
      expect(page.activeTab.textContent).toStrictEqual("Activity");
    });
  });

  describe('As LU I can see the details section', () => {
    it.todo('As LU I can see the details section');
  });

  describe('As LU I can see the password section', () => {
    it('As LU I can see the password section', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.password).toBeDefined();
    });

    it('As LU I cannot see the password section if resource type has no password', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceStandaloneTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.password).toBeNull();
    });
  });

  describe('As LU I can see the totp section', () => {
    it('As LU I can see the totp section for a resource with password description and totp', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeDefined();
    });

    it('As LU I can see the totp section for a standalone totp', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceStandaloneTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeDefined();
    });

    it('As LU I cannot see the totp section if resource type has no totp', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeNull();
    });
  });

  describe('As LU I can see the description section', () => {
    it('As LU I can see the description section', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceLegacyDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.description).toBeDefined();
    });

    it('As LU I cannot see the description section if resource type has no description', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.description).toBeNull();
    });
  });

  describe('As LU I can see the card section', () => {
    it('As LU I can see the card section', () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DisplayResourceDetailsPage(props);
      expect(page.upgradeCard).toBeDefined();
    });

    it('As LU I cannot see the card section if there is no resource v5 corresponding', () => {
      expect.assertions(1);
      const props = defaultProps({resourceTypes: new ResourceTypesCollection(resourceTypesV4CollectionDto())});
      const page = new DisplayResourceDetailsPage(props);
      expect(page.upgradeCard).toBeNull();
    });

    it('As LU I cannot see the card section if user is not allowed to upgrade', () => {
      expect.assertions(1);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto())});
      const page = new DisplayResourceDetailsPage(props);
      expect(page.upgradeCard).toBeNull();
    });

    it('As LU I cannot see the card section if resource is v5', () => {
      expect.assertions(1);
      const resourceWorkspaceContext = defaultResourceWorkspaceContext({
        details: {
          resource: defaultResourceDto({
            resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT
          }),
        }
      });
      const props = defaultProps({resourceWorkspaceContext});
      const page = new DisplayResourceDetailsPage(props);
      expect(page.upgradeCard).toBeNull();
    });
  });

  describe('As LU I can upgrade a resource', () => {
    it('As LU I can upgrade a resource v4 to v5', async() => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: "RN9n8XuECN3", description: "description"}));
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(jest.fn());

      await page.click(page.upgradeButton);

      const resourceDtoExpected = {
        id: props.resourceWorkspaceContext.details.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: props.resourceWorkspaceContext.details.resource.metadata.name,
          username: props.resourceWorkspaceContext.details.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
          uris: props.resourceWorkspaceContext.details.resource.metadata.uris,
          description: props.resourceWorkspaceContext.details.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN3",
        description: "description"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
    });

    it('As LU I cannot upgrade a v4 to V5 if an unexpected error happens', async() => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: "RN9n8XuECN3", description: "description"}));
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => { throw new Error("Error"); });

      await page.click(page.upgradeButton);

      const resourceDtoExpected = {
        id: props.resourceWorkspaceContext.details.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: props.resourceWorkspaceContext.details.resource.metadata.name,
          username: props.resourceWorkspaceContext.details.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
          uris: props.resourceWorkspaceContext.details.resource.metadata.uris,
          description: props.resourceWorkspaceContext.details.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN3",
        description: "description"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith("Error");
    });

    it('As LU I cannot upgrade a v4 to v5 if resource permission is read', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceWithReadPermissionDto(),
        }
      })});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: "RN9n8XuECN3", description: "description"}));
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      // expectations
      expect(page.upgradeButton).toBeNull();
    });

    it('As LU I cannot upgrade a v4 to V5 if user aborts operation', async() => {
      expect.assertions(3);
      const props = defaultProps();
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => { throw new UserAbortsOperationError("Error"); });
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      await page.click(page.upgradeButton);

      // expectations
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith("passbolt.resources.update");
      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
    });

    it('As LU I cannot upgrade a v4 to v5 if resource is shared and user has missing metadata keys', async() => {
      expect.assertions(1);
      const props = defaultProps({context: defaultUserAppContext({
        loggedInUser: defaultUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})
      })});
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      await page.click(page.upgradeButton);

      // expectations
      expect(props.dialogContext.open).toHaveBeenCalledWith(ActionAbortedMissingMetadataKeys);
    });

    it('As LU I cannot upgrade a v4 to v5 resource if share metadata key is enforced and user has missing metadata keys', async() => {
      expect.assertions(1);
      const props = defaultProps({
        context: defaultUserAppContext({loggedInUser: defaultUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})}),
        metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto({allow_usage_of_personal_keys: false})),
      });
      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      await page.click(page.upgradeButton);

      // expectations
      expect(props.dialogContext.open).toHaveBeenCalledWith(ActionAbortedMissingMetadataKeys);
    });
  });

  describe('As LU I can see the share section', () => {
    it.todo('As LU I can see the share section');
    it.todo('As LU I cannot see the share section if denied by RBAC');
  });

  describe('As LU I can see the tags section', () => {
    it.todo('As LU I can see the tags section');
    it.todo('As LU I cannot see the tags section if denied by RBAC');
  });

  describe('As LU I can see the comments section', () => {
    it.todo('As LU I can see the comments section');
    it.todo('As LU I cannot see the comments section if denied by RBAC');
  });

  describe('As LU I can see the activity section', () => {
    it.todo('As LU I can see the activity section');
    it.todo('As LU I cannot see the activity section if denied by RBAC');
  });
  describe('As LU I can see the custom fields section', () => {
    let page;

    beforeEach(() => {
      const props = defaultProps(
        {resourceWorkspaceContext: defaultResourceWorkspaceContext({
          details: {
            resource: resourceWithCustomFields,
          }
        })});

      page = new DisplayResourceDetailsPage(props);
    });
    it('As LU I can see the custom field section', async() => {
      expect.assertions(1);

      expect(page.customField).toBeDefined();
    });
    it('As LU I cannot see the section if resource does not contain custom fields', async() => {
      expect.assertions(1);

      const props = defaultProps(
        {resourceWorkspaceContext: defaultResourceWorkspaceContext({
          details: {
            resource: resourceWithReadPermissionDto(),
          }
        })});

      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      expect(page.customField).toBeNull();
    });
  });

  describe('As LU I can see the URIs section', () => {
    let page;

    beforeEach(() => {
      const props = defaultProps(
        {resourceWorkspaceContext: defaultResourceWorkspaceContext({
          details: {
            resource: resourceWithMultipleUris,
          }
        })});

      page = new DisplayResourceDetailsPage(props);
    });
    it('As LU I can see the multiple uris section', async() => {
      expect.assertions(1);

      expect(page.urisTab).toBeDefined();
    });
    it('As LU I cannot see the section if resource does not contain more than 1 uri', async() => {
      expect.assertions(1);

      const props = defaultProps(
        {resourceWorkspaceContext: defaultResourceWorkspaceContext({
          details: {
            resource: resourceWithOneUris,
          }
        })});

      const page = new DisplayResourceDetailsPage(props);
      await waitFor(() => {});

      expect(page.customField).toBeNull();
    });
  });
});
