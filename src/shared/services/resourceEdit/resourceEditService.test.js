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
 * @since         5.18.0
 */
import ResourceEditService from "./resourceEditService";
import { SECRET_FIND_BY_RESOURCE_ID } from "../serviceWorker/secret/secretServiceWorkerService";
import { RESOURCES_UPDATE } from "../serviceWorker/permission/permissionServiceWorkerService";
import { personalResourcePermissionsDtos, sharedResourcePermissionsDtos } from "./resourceEditService.test.data";
import PermissionSnapshotService from "../permission/permissionSnapshotService";
import { defaultCustomFieldsCollection } from "../../models/entity/customField/customFieldsCollection.test.data";
import CustomFieldsCollection from "../../models/entity/customField/customFieldsCollection";
import ResourceTypesCollection from "../../models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../models/entity/resourceType/resourceTypesCollection.test.data";
import {
  defaultResourceDto,
  resourceWithReadPermissionDto,
  resourceWithUpdatePermissionDto,
} from "../../models/entity/resource/resourceEntity.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
} from "../../models/entity/resourceType/resourceTypeEntity.test.data";
import { defaultSecretDataV5DefaultDto } from "../../models/entity/secretData/secretDataV5DefaultEntity.test.data";
import { defaultSecretDataV5DefaultTotpEntityDto } from "../../models/entity/secretData/secretDataV5DefaultTotpEntity.test.data";
import { defaultResourceMetadataDto } from "../../models/entity/resource/metadata/resourceMetadataEntity.test.data";

describe("ResourceEditService", () => {
  let port, resourceTypes, service;

  beforeEach(() => {
    port = { request: jest.fn() };
    resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
    service = new ResourceEditService(port, resourceTypes);
  });

  describe("::canUpdate", () => {
    it("allows owners and users with update permission", () => {
      expect(ResourceEditService.canUpdate(defaultResourceDto())).toBe(true);
      expect(ResourceEditService.canUpdate(resourceWithUpdatePermissionDto())).toBe(true);
    });

    it("denies read-only users and resources without permission", () => {
      expect(ResourceEditService.canUpdate(resourceWithReadPermissionDto())).toBe(false);
      expect(ResourceEditService.canUpdate({})).toBe(false);
      expect(ResourceEditService.canUpdate(null)).toBe(false);
    });
  });

  describe("::getExpirationDateOnPasswordChange", () => {
    it("does not touch the expiration date if the automatic update is disabled", () => {
      expect(ResourceEditService.getExpirationDateOnPasswordChange(null)).toBeUndefined();
      expect(ResourceEditService.getExpirationDateOnPasswordChange({ automatic_update: false })).toBeUndefined();
    });

    it("unsets the expiration date if there is no default expiry period", () => {
      expect(
        ResourceEditService.getExpirationDateOnPasswordChange({ automatic_update: true, default_expiry_period: null }),
      ).toBeNull();
    });

    it("sets the expiration date in the future according to the default expiry period", () => {
      const date = ResourceEditService.getExpirationDateOnPasswordChange({
        automatic_update: true,
        default_expiry_period: 30,
      });
      expect(new Date(date).getTime()).toBeGreaterThan(Date.now() + 29 * 24 * 3600 * 1000);
    });
  });

  describe("::load and ::save", () => {
    const v5Resource = (data = {}) =>
      defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        metadata: defaultResourceMetadataDto({
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
          uris: ["https://passbolt.com", "https://other.passbolt.com"],
        }),
        ...data,
      });

    /**
     * Mock the service worker answers.
     * @param {object|string} secret The decrypted secret
     * @param {function} permissions The permissions dtos factory
     */
    const mockPort = (secret, permissions = personalResourcePermissionsDtos) => {
      port.request.mockImplementation((name, id) => {
        if (name === SECRET_FIND_BY_RESOURCE_ID) {
          return structuredClone(secret);
        }
        if (name === "passbolt.permissions.find-aco-permissions-for-display") {
          return permissions(id);
        }
        return {};
      });
    };

    const updateCall = () => port.request.mock.calls.find(([name]) => name === RESOURCES_UPDATE);

    it("only re-encrypts the secret when it changed", async () => {
      const resource = v5Resource();
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }));

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      expect(port.request).toHaveBeenCalledWith(SECRET_FIND_BY_RESOURCE_ID, resource.id);

      const dto = resourceFormEntity.toDto();
      dto.metadata.name = "New name";
      const result = await service.save(service.sanitize(dto), originalSecret);

      expect(result.saved).toBe(true);
      const [, resourceDto, secretDto] = updateCall();
      expect(secretDto).toBeNull();
      expect(resourceDto.metadata.name).toBe("New name");
      // The additional URIs are kept.
      expect(resourceDto.metadata.uris).toEqual(["https://passbolt.com", "https://other.passbolt.com"]);
    });

    it("does not re-encrypt the secret of a resource with custom fields when only the name changed", async () => {
      const customFields = new CustomFieldsCollection(defaultCustomFieldsCollection());
      const resource = v5Resource();
      resource.metadata.custom_fields = customFields.toMetadataDto();
      mockPort(defaultSecretDataV5DefaultDto({ password: "old", custom_fields: customFields.toSecretDto() }));

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.metadata.name = "New name";
      await service.save(service.sanitize(dto), originalSecret);

      const [, resourceDto, secretDto] = updateCall();
      expect(secretDto).toBeNull();
      expect(resourceDto.metadata.custom_fields).toHaveLength(customFields.length);
    });

    it("synchronises the keyring and fetches the permissions before saving, and marks a personal resource", async () => {
      const resource = v5Resource({ personal: false });
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }));

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      await service.save(service.sanitize(dto), originalSecret);

      const names = port.request.mock.calls.map(([name]) => name);
      expect(names.indexOf("passbolt.keyring.sync")).toBeGreaterThan(-1);
      expect(names.indexOf("passbolt.keyring.sync")).toBeLessThan(names.indexOf(RESOURCES_UPDATE));
      expect(updateCall()[1].personal).toBe(true);
    });

    it("asks to confirm the recipients before re-encrypting the secret of a shared resource", async () => {
      const resource = v5Resource({ personal: true });
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }), sharedResourcePermissionsDtos);

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      const firstResult = await service.save(service.sanitize(dto), originalSecret);

      expect(firstResult.saved).toBe(false);
      expect(firstResult.snapshot.permissions).toHaveLength(2);
      expect(updateCall()).toBeUndefined();

      // The same permissions are fetched again on confirmation.
      const permissions = sharedResourcePermissionsDtos(resource.id);
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }), () => structuredClone(permissions));
      const snapshot = await new PermissionSnapshotService(port).buildSnapshotForResourceEdition(resource.id);
      const result = await service.save(service.sanitize(dto), originalSecret, { confirmedSnapshot: snapshot });

      expect(result.saved).toBe(true);
      expect(updateCall()[1].personal).toBe(false);
      expect(updateCall()[2].password).toBe("new-password");
    });

    it("refuses to save if the recipients changed since the user confirmed them", async () => {
      const resource = v5Resource();
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }), sharedResourcePermissionsDtos);

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      const { snapshot } = await service.save(service.sanitize(dto), originalSecret);

      // Fresh permission ids: someone changed the permissions in between.
      await expect(
        service.save(service.sanitize(dto), originalSecret, { confirmedSnapshot: snapshot }),
      ).rejects.toThrow("The resource permissions changed during your review.");
      expect(updateCall()).toBeUndefined();
    });

    it("does not ask to confirm the recipients of a shared resource if the secret did not change", async () => {
      const resource = v5Resource();
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }), sharedResourcePermissionsDtos);

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.metadata.name = "New name";
      const result = await service.save(service.sanitize(dto), originalSecret);

      expect(result.saved).toBe(true);
      expect(updateCall()[1].personal).toBe(false);
    });

    it("keeps the other secrets (TOTP, note) when changing the password", async () => {
      const resource = v5Resource({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
        metadata: defaultResourceMetadataDto({ resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP }),
      });
      const secret = defaultSecretDataV5DefaultTotpEntityDto({ password: "old", description: "a note" });
      mockPort(secret);

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      await service.save(service.sanitize(dto), originalSecret);

      const secretDto = updateCall()[2];
      expect(secretDto.password).toBe("new-password");
      expect(secretDto.description).toBe("a note");
      expect(secretDto.totp).toEqual(secret.totp);
    });

    it("updates the expiration date when the password changes and the automatic update is enabled", async () => {
      const resource = v5Resource();
      mockPort(defaultSecretDataV5DefaultDto({ password: "old" }));

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      await service.save(service.sanitize(dto), originalSecret, {
        passwordExpirySettings: { automatic_update: true, default_expiry_period: null },
      });

      expect(updateCall()[1].expired).toBeNull();
    });

    it("sends the password as a string for the legacy password string resource type", async () => {
      const resource = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        metadata: defaultResourceMetadataDto({ resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING }),
      });
      mockPort({ password: "old" });

      const { resourceFormEntity, originalSecret } = await service.load(resource);
      const dto = resourceFormEntity.toDto();
      dto.secret.password = "new-password";
      await service.save(service.sanitize(dto), originalSecret);

      expect(updateCall()[2]).toBe("new-password");
    });
  });
});
