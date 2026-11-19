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
import { DateTime } from "luxon";
import ResourceFormEntity from "../../models/entity/resource/resourceFormEntity";
import CustomFieldsCollection from "../../models/entity/customField/customFieldsCollection";
import PermissionEntity from "../../models/entity/permission/permissionEntity";
import { SECRET_FIND_BY_RESOURCE_ID } from "../serviceWorker/secret/secretServiceWorkerService";
import PermissionServiceWorkerService from "../serviceWorker/permission/permissionServiceWorkerService";
import PermissionSnapshotService from "../permission/permissionSnapshotService";

/**
 * Errors meaning the user cancelled the operation (closed the passphrase dialog, refused a metadata key...).
 * @type {Array<string>}
 */
export const USER_CANCELLATION_ERRORS = ["UserAbortsOperationError", "UntrustedMetadataKeyError"];

/**
 * Service that loads a resource in an editable form and saves it back.
 *
 * It is a lightweight version of the web vault edit workflow, designed for the QuickAccess: it only lets the user
 * change the name, the main URI, the username and the password, but keeps every other property of the resource
 * (description, note, TOTP, custom fields, additional URIs, icon, ...) untouched.
 */
export default class ResourceEditService {
  /**
   * @param {Port} port The service worker port
   * @param {ResourceTypesCollection} resourceTypes The resource types collection
   */
  constructor(port, resourceTypes) {
    this.port = port;
    this.resourceTypes = resourceTypes;
    this.permissionServiceWorkerService = new PermissionServiceWorkerService(port);
    this.permissionSnapshotService = new PermissionSnapshotService(port);
  }

  /**
   * Returns true if the given resource can be updated by the current user.
   * @param {object} resource The resource dto (as found in the local storage)
   * @returns {boolean}
   */
  static canUpdate(resource) {
    return (resource?.permission?.type ?? 0) >= PermissionEntity.PERMISSION_UPDATE;
  }

  /**
   * Returns true if the resource of the given permission snapshot is accessible by other users than the current one.
   * Unlike the vault workflow, the current user id is not needed: the current user has access to the resource, so a
   * sole user permission is necessarily theirs (and an owner one, as a resource always has an owner).
   * @param {PermissionSnapshotEntity} snapshot
   * @returns {boolean}
   */
  static isShared(snapshot) {
    const permissions = snapshot.permissions.items;
    return permissions.length > 1 || permissions.some((permission) => permission.aro === PermissionEntity.ARO_GROUP);
  }

  /**
   * Decrypt the secret of the given resource and build an editable form entity out of it.
   * @param {object} resource The resource dto (as found in the local storage)
   * @returns {Promise<{resourceFormEntity: ResourceFormEntity, originalSecret: object}>}
   */
  async load(resource) {
    // Deep clone the resource to not modify the object in reference.
    const resourceDto = structuredClone(resource);
    const secret = await this.port.request(SECRET_FIND_BY_RESOURCE_ID, resource.id);
    ResourceEditService.mergeCustomFieldsMetadataAndSecret(resourceDto, secret);
    // The original secret must be cloned after the merge, otherwise the custom fields would always look changed.
    const originalSecret = structuredClone(secret);
    resourceDto.secret = secret;
    const resourceFormEntity = new ResourceFormEntity(resourceDto, {
      validate: false,
      resourceTypes: this.resourceTypes,
    });
    return { resourceFormEntity, originalSecret };
  }

  /**
   * Merge the custom fields metadata into the secret.
   * The custom fields are removed from the metadata to not have inconsistency if the user removes the custom fields
   * secret.
   * @param {object} resourceDto The resource dto, modified in place
   * @param {object} secret The decrypted secret, modified in place
   */
  static mergeCustomFieldsMetadataAndSecret(resourceDto, secret) {
    if (secret?.custom_fields?.length > 0) {
      const customFieldsMetadataCollection = new CustomFieldsCollection(resourceDto.metadata.custom_fields);
      const customFieldsSecretCollection = new CustomFieldsCollection(secret.custom_fields);
      secret.custom_fields = CustomFieldsCollection.mergeCollectionsMetadataAndSecret(
        customFieldsMetadataCollection,
        customFieldsSecretCollection,
      ).toDto();
      delete resourceDto.metadata.custom_fields;
    }
  }

  /**
   * Returns a sanitized copy of the form entity, ready to be validated and saved.
   * @param {object} resourceFormDto The form dto
   * @returns {ResourceFormEntity}
   */
  sanitize(resourceFormDto) {
    const resourceFormEntity = new ResourceFormEntity(resourceFormDto, {
      validate: false,
      resourceTypes: this.resourceTypes,
    });
    resourceFormEntity.removeEmptySecret({ validate: false });
    resourceFormEntity.addRequiredSecret({ validate: false });

    const resourceType = this.resourceTypes.getFirstById(resourceFormEntity.resourceTypeId);
    if (!resourceFormEntity.metadata.username) {
      const usernameResetValue = resourceType.isStandaloneTotp() ? null : "";
      resourceFormEntity.set("metadata.username", usernameResetValue, { validate: false });
    }
    return resourceFormEntity;
  }

  /**
   * Compute the expiration date to apply when the password changes, according to the password expiry settings.
   * @param {object|null} passwordExpirySettings
   * @returns {string|null|undefined} undefined if the expiration date should not be touched.
   */
  static getExpirationDateOnPasswordChange(passwordExpirySettings) {
    if (!passwordExpirySettings?.automatic_update) {
      return undefined;
    }
    if (passwordExpirySettings.default_expiry_period == null) {
      return null;
    }
    return DateTime.utc().plus({ days: passwordExpirySettings.default_expiry_period }).toISO();
  }

  /**
   * Save the resource, following the same rules as the vault edit workflow:
   * - the keyring is synchronised and the permissions of the resource are fetched (permission snapshot) right before
   *   saving, so the secret is encrypted for the current recipients and the resource "personal" flag is accurate;
   * - the secret is only re-encrypted if it changed;
   * - if the secret changed and the resource is shared, the user has to confirm the recipients first: the save is not
   *   performed and the snapshot is returned so it can be displayed. Save again with this snapshot as
   *   `confirmedSnapshot` once the user confirmed. If the permissions changed in between, an error is thrown.
   * @param {ResourceFormEntity} resourceFormEntity The sanitized and validated form entity
   * @param {object} originalSecret The original decrypted secret
   * @param {object} [options]
   * @param {object|null} [options.passwordExpirySettings] The password expiry settings
   * @param {PermissionSnapshotEntity|null} [options.confirmedSnapshot] The recipients the user confirmed
   * @returns {Promise<{saved: boolean, snapshot: PermissionSnapshotEntity}>}
   * @throws {Error} If the permissions of the resource changed since the user confirmed the recipients
   */
  async save(resourceFormEntity, originalSecret, { passwordExpirySettings = null, confirmedSnapshot = null } = {}) {
    const isSecretChanged = resourceFormEntity.secret.areSecretsDifferent(originalSecret);
    const snapshot = await this.permissionSnapshotService.buildSnapshotForResourceEdition(resourceFormEntity.get("id"));
    const isShared = ResourceEditService.isShared(snapshot);

    if (isSecretChanged && isShared) {
      if (!confirmedSnapshot) {
        return { saved: false, snapshot };
      }
      if (!confirmedSnapshot.equals(snapshot)) {
        throw new Error(
          "The resource permissions changed during your review. Please retry the operation and verify the permissions again.",
        );
      }
    }

    if (resourceFormEntity.secret?.password !== originalSecret?.password) {
      const expired = ResourceEditService.getExpirationDateOnPasswordChange(passwordExpirySettings);
      if (typeof expired !== "undefined") {
        resourceFormEntity.set("expired", expired);
      }
    }

    let secretDto = null;
    if (isSecretChanged) {
      const resourceType = this.resourceTypes.getFirstById(resourceFormEntity.resourceTypeId);
      secretDto = resourceType.isPasswordString()
        ? resourceFormEntity.toSecretDto().password
        : resourceFormEntity.toSecretDto();
    }

    const resourceDto = resourceFormEntity.toResourceDto();
    resourceDto.personal = !isShared;
    await this.permissionServiceWorkerService.updateResource(resourceDto, secretDto);
    return { saved: true, snapshot };
  }
}
