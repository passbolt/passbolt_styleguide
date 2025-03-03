/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

import {waitFor} from "@testing-library/react";
import {v4 as uuidv4} from "uuid";
import {defaultProps} from "./HandleTotpWorkflow.test.data";
import HandleTotpWorkflowTestPage from "./HandleTotpWorkflow.test.page";
import CreateStandaloneTotp from "../CreateStandaloneTotp/CreateStandaloneTotp";
import StandaloneTotpViewModel from "../../../../shared/models/standaloneTotp/StandaloneTotpViewModel";
import {defaultStandaloneTotpViewModelDto} from "../../../../shared/models/standaloneTotp/StandaloneTotpDto.test.data";
import UploadQrCode from "../UploadQrCode/UploadQrCode";
import {TotpWorkflowMode} from "./HandleTotpWorkflowMode";
import AddTotp from "../AddTotp/AddTotp";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";
import EditTotp from "../EditTotp/EditTotp";
import EditStandaloneTotp from "../EditStandaloneTotp/EditStandaloneTotp";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {resourceTypeV5TotpDto} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {defaultMetadataTypesSettingsV6Dto} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("HandleReviewAccountRecoveryRequestWorkflow", () => {
  describe('As a signed-in user I should create a standalone totp', () => {
    it('As a signed-in user I should start to create a standalone totp', async() => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const standaloneTotpProps = {
        onCancel: page._instance.handleCancelDialog,
        onOpenUploadQrCode: expect.any(Function),
        onSubmit: page._instance.handleSave
      };

      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateStandaloneTotp, standaloneTotpProps);
    });

    it('As a signed-in user I can save a standalone totp', async() => {
      const props = defaultProps();
      const resourceId = uuidv4();
      jest.spyOn(props.context.port, 'request').mockImplementation(() => ({id: resourceId}));
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleSave(totp);

      const resourceDto = {
        folder_parent_id: props.folderParentId,
        resource_type_id: props.resourceType.id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = props.resourceType.id;

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, totp.toSecretDto());
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The TOTP has been added successfully");
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords/view/${resourceId}`);
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I can save a v5 standalone totp', async() => {
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto())});
      const resourceId = uuidv4();
      jest.spyOn(props.context.port, 'request').mockImplementation(() => ({id: resourceId}));
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleSave(totp);

      const resourceDto = {
        folder_parent_id: props.folderParentId,
        resource_type_id: props.resourceType.id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = props.resourceType.id;
      resourceDto.metadata.object_type = "PASSBOLT_RESOURCE_METADATA";

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, totp.toSecretDto());
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The TOTP has been added successfully");
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords/view/${resourceId}`);
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I can not save a standalone totp if there is an error', async() => {
      const props = defaultProps();
      const error = new Error("error");
      jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleSave(totp);

      const resourceType = props.resourceTypes.getFirstBySlug("totp");
      const resourceDto = {
        folder_parent_id: props.folderParentId,
        resource_type_id: resourceType.id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = resourceType.id;

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, totp.toSecretDto());
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I should start to upload a QR code', async() => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const uploadQrCodeProps = {
        title: "Create standalone TOTP",
        action: "Save",
        onSubmit: page._instance.handleSave
      };

      await page._instance.displayUploadQrCodeDialog(uploadQrCodeProps);

      expect(props.dialogContext.open).toHaveBeenCalledWith(UploadQrCode, uploadQrCodeProps);
    });
  });

  describe('As a signed-in user I should add a totp', () => {
    it('As a signed-in user I should start to add a totp', async() => {
      expect.assertions(1);
      const props = defaultProps({mode: TotpWorkflowMode.ADD_TOTP});
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const addTotpProps = {
        onCancel: page._instance.handleCancelDialog,
        onOpenUploadQrCode: expect.any(Function),
        onSubmit: page._instance.handleApply
      };

      expect(props.dialogContext.open).toHaveBeenCalledWith(AddTotp, addTotpProps);
    });

    it('As a signed-in user I can apply a totp ', async() => {
      const props = defaultProps({mode: TotpWorkflowMode.ADD_TOTP});
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new TotpViewModel(defaultTotpViewModelDto());
      await page._instance.handleApply(totp);

      expect(props.onApply).toHaveBeenCalledWith(totp);
    });

    it('As a signed-in user I can not apply a totp if there is an error', async() => {
      const props = defaultProps();
      const error = new Error("error");
      jest.spyOn(props, 'onApply').mockImplementation(() => { throw error; });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleApply(totp);

      expect(props.onApply).toHaveBeenCalledWith(totp);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe('As a signed-in user I should edit a totp', () => {
    it('As a signed-in user I should start to edit a totp', async() => {
      expect.assertions(1);
      const totp = new TotpViewModel(defaultTotpViewModelDto());
      const props = defaultProps({mode: TotpWorkflowMode.EDIT_TOTP, totp: totp});
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const editTotpProps = {
        onCancel: page._instance.handleCancelDialog,
        onOpenUploadQrCode: expect.any(Function),
        totp: totp,
        onSubmit: page._instance.handleApply
      };

      expect(props.dialogContext.open).toHaveBeenCalledWith(EditTotp, editTotpProps);
    });
  });

  describe('As a signed-in user I should edit a standalone totp', () => {
    it('As a signed-in user I should start to edit a standalone totp', async() => {
      expect.assertions(1);
      const props = defaultProps({mode: TotpWorkflowMode.EDIT_STANDALONE_TOTP});
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const standaloneTotpProps = {
        resource: props.resourceWorkspaceContext.selectedResources[0],
        onCancel: page._instance.handleCancelDialog,
        onOpenUploadQrCode: expect.any(Function),
        onSubmit: page._instance.handleUpdate
      };

      expect(props.dialogContext.open).toHaveBeenCalledWith(EditStandaloneTotp, standaloneTotpProps);
    });

    it('As a signed-in user I can update a standalone totp', async() => {
      const props = defaultProps();
      jest.spyOn(props.context.port, 'request');
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleUpdate(totp.toResourceDto(), totp.toSecretDto());

      const resourceDto = {
        id: props.resourceWorkspaceContext.selectedResources[0].id,
        resource_type_id: props.resourceTypes.getFirstBySlug("totp").id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = props.resourceTypes.getFirstBySlug("totp").id;

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDto, totp.toSecretDto());
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The TOTP has been updated successfully");
      expect(props.resourceWorkspaceContext.onResourceEdited).toHaveBeenCalled();
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I can not save a standalone totp if there is an error', async() => {
      const props = defaultProps();
      const error = new Error("error");
      jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleUpdate(totp.toResourceDto(), totp.toSecretDto());

      const resourceDto = {
        id: props.resourceWorkspaceContext.selectedResources[0].id,
        resource_type_id: props.resourceTypes.getFirstBySlug("totp").id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = props.resourceTypes.getFirstBySlug("totp").id;

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDto, totp.toSecretDto());
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I should start to upload a QR code', async() => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const uploadQrCodeProps = {
        title: "Edit standalone TOTP",
        action: "Save",
        onSubmit: page._instance.handleUpdate
      };

      await page._instance.displayUploadQrCodeDialog(uploadQrCodeProps);

      expect(props.dialogContext.open).toHaveBeenCalledWith(UploadQrCode, uploadQrCodeProps);
    });
  });

  describe('As a signed-in user I should edit a standalone totp v5', () => {
    it('As a signed-in user I should start to edit a standalone totp v5', async() => {
      expect.assertions(1);
      const props = defaultProps({
        mode: TotpWorkflowMode.EDIT_STANDALONE_TOTP,
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto())
      });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const standaloneTotpProps = {
        resource: props.resourceWorkspaceContext.selectedResources[0],
        onCancel: page._instance.handleCancelDialog,
        onOpenUploadQrCode: expect.any(Function),
        onSubmit: page._instance.handleUpdate
      };

      expect(props.dialogContext.open).toHaveBeenCalledWith(EditStandaloneTotp, standaloneTotpProps);
    });

    it('As a signed-in user I can update a standalone totp', async() => {
      const props = defaultProps({
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto())
      });
      jest.spyOn(props.context.port, 'request');
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleUpdate(totp.toResourceDto(), totp.toSecretDto());

      const expectedResourceType = props.resourceTypes.getFirstBySlug("v5-totp-standalone");
      const resourceDto = {
        id: props.resourceWorkspaceContext.selectedResources[0].id,
        resource_type_id: expectedResourceType.id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = expectedResourceType.id;
      resourceDto.metadata.object_type = "PASSBOLT_RESOURCE_METADATA";

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDto, totp.toSecretDto());
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The TOTP has been updated successfully");
      expect(props.resourceWorkspaceContext.onResourceEdited).toHaveBeenCalled();
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I can not save a standalone totp if there is an error', async() => {
      const props = defaultProps({
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto())
      });
      const error = new Error("error");
      jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const totp = new StandaloneTotpViewModel(defaultStandaloneTotpViewModelDto());
      await page._instance.handleUpdate(totp.toResourceDto(), totp.toSecretDto());

      const expectedResourceType = props.resourceTypes.getFirstBySlug("v5-totp-standalone");
      const resourceDto = {
        id: props.resourceWorkspaceContext.selectedResources[0].id,
        resource_type_id: expectedResourceType.id,
        ...totp.toResourceDto()
      };
      resourceDto.metadata.resource_type_id = expectedResourceType.id;
      resourceDto.metadata.object_type = "PASSBOLT_RESOURCE_METADATA";

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDto, totp.toSecretDto());
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      expect(props.dialogContext.close).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As a signed-in user I should start to upload a QR code', async() => {
      expect.assertions(1);
      const props = defaultProps({
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto())
      });
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});

      const uploadQrCodeProps = {
        title: "Edit standalone TOTP",
        action: "Save",
        onSubmit: page._instance.handleUpdate
      };

      await page._instance.displayUploadQrCodeDialog(uploadQrCodeProps);

      expect(props.dialogContext.open).toHaveBeenCalledWith(UploadQrCode, uploadQrCodeProps);
    });
  });

  describe('As a signed-in user I can stop the workflow', () => {
    it('As a signed-in user I can cancel the workflow', async() => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new HandleTotpWorkflowTestPage(props);
      await waitFor(() => {});
      await page._instance.handleCancelDialog();
      expect(props.onStop).toHaveBeenCalled();
    });
  });
});
