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
 * @since         5.16.0
 */

import { act } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultProps, resourceDto } from "./ResourceMoveFlow.test.data";
import {
  dialogPropsFor,
  folderPermissionDto,
  mountUntilFlowStopped,
  mountUntilStatus,
  portRequestArgs,
  resourcePermissionDto,
} from "./moveFlow.test.data";
import ResourceMoveFlowTestPage from "./ResourceMoveFlow.test.page";
import { RESOURCE_MOVE_FLOW_STATUS } from "./ResourceMoveFlow";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import PermissionServiceWorkerService, {
  PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
  PERMISSIONS_FIND_BY_IDS_FOR_SHARE,
} from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { defaultUserDto } from "../../../../../shared/models/entity/user/userEntity.test.data";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { MOVE_RESOURCES_BY_IDS } from "../../../../../shared/services/serviceWorker/move/moveItemsServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Wire the snapshot port events.
 * `permissionsByAcoId` maps an item id to its permission DTOs. That can be the destination folder,
 * an owned resource's parent folder, or a moved resource.
 * Folders are read one at a time, the moved resources through the batched find event.
 */
function wireDestinationSnapshot(port, { permissionsByAcoId = {} } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, (acoId) => permissionsByAcoId[acoId] ?? []);
  port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) =>
    resourcesIds.map((id) => ({ id, permissions: permissionsByAcoId[id] ?? [] })),
  );
  port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
}

/**
 * Mount the flow and wait until the ShareDialog is open.
 */
const mountUntilShareOpen = (props) =>
  mountUntilStatus(ResourceMoveFlowTestPage, props, RESOURCE_MOVE_FLOW_STATUS.SHARE_DIALOG_OPEN);

/**
 * Mount the flow and wait until it has terminated (onStop called).
 */
const mountUntilStopped = (props) => mountUntilFlowStopped(ResourceMoveFlowTestPage, props);

describe("ResourceMoveFlow", () => {
  describe("As LU moving resources into a shared destination folder", () => {
    it("As LU I should review the destination folder permissions seeded into the dialog (controlled, editable)", async () => {
      expect.assertions(5);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [props.resources[0].id]: [resourcePermissionDto(operatorId, props.resources[0].id)],
        },
      });

      jest.spyOn(props.context.port, "request");
      await mountUntilShareOpen(props);

      // The snapshot is built from the destination folder (ACO_FOLDER).
      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        destinationFolderId,
        PermissionEntity.ACO_FOLDER,
      );
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.readOnly).toBeUndefined();
      expect(shareProps.initialResources).toHaveLength(1);
      // The dialog is seeded with the permissions the resource has today, just the operator here.
      expect(shareProps.initialResources[0].permissions.length).toBe(1);
      // What the resource ends up with, its own kept permissions merged with the destination, is
      // passed separately so the dialog can stage the added and modified badges.
      expect(shareProps.initialAppliedPermissions.get(props.resources[0].id).length).toBe(2);
    });

    it("As LU I should see the destination's direct recipients handed to the dialog so it can render them", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      const readerId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            // Granted directly on the destination, in no group, carrying their user data.
            {
              ...folderPermissionDto(readerId, destinationFolderId, PermissionEntity.PERMISSION_READ),
              user: defaultUserDto({ id: readerId, username: "reader@passbolt.com" }),
            },
          ],
          [props.resources[0].id]: [resourcePermissionDto(operatorId, props.resources[0].id)],
        },
      });

      await mountUntilShareOpen(props);

      // The seeded permissions are built by PermissionEntity::copyForAnotherAco, which drops the
      // embedded user, so the dialog can only look this recipient up through initialUsers.
      // Somebody who only exists on the destination shows up in the resulting set, not in the seed.
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.initialUsers.items.map((user) => user.id)).toContain(readerId);
      expect(
        shareProps.initialAppliedPermissions.get(props.resources[0].id).items.some((p) => p.aroForeignKey === readerId),
      ).toBe(true);
    });

    it("As LU confirming should move the resources with the operator-confirmed per-resource permission set", async () => {
      expect.assertions(6);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const existingRecipientId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(existingRecipientId, destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [movedResource.id]: [resourcePermissionDto(operatorId, movedResource.id)],
        },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");
      const newRecipientId = uuidv4();
      // ShareChanges emits its changes per item. `changes` is what the real dialog would emit on
      // confirm. ShareDialog staged existingRecipient as added on mount, since they are in the
      // resulting set but not in the resource's current permissions. The operator then added
      // newRecipient by hand through the mocked dialog.
      const changes = [
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: existingRecipientId,
          aco: "Resource",
          aco_foreign_key: movedResource.id,
          type: PermissionEntity.PERMISSION_READ,
        },
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: newRecipientId,
          aco: "Resource",
          aco_foreign_key: movedResource.id,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(changes));

      const [resourceIds, destId, permissionsDto] = portRequestArgs(props.context.port, MOVE_RESOURCES_BY_IDS);
      expect(resourceIds).toStrictEqual(props.resources.map((resource) => resource.id));
      expect(destId).toStrictEqual(destinationFolderId);
      // What each resource ends up with is sent: the operator as owner, the existing recipient and the new one.
      const targetTypeByAro = new Map(
        permissionsDto[movedResource.id].map((permission) => [permission.aro_foreign_key, permission.type]),
      );
      expect([...targetTypeByAro.keys()].sort()).toStrictEqual(
        [operatorId, existingRecipientId, newRecipientId].sort(),
      );
      // Each recipient's level is carried too, not just the list. The operator keeps ownership, never
      // lowered to what the destination proposes, and the added recipient gets exactly read.
      expect(targetTypeByAro.get(operatorId)).toBe(PermissionEntity.PERMISSION_OWNER);
      expect(targetTypeByAro.get(newRecipientId)).toBe(PermissionEntity.PERMISSION_READ);
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU confirming should move the resource with a group recipient's authoritative type", async () => {
      expect.assertions(1);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const groupId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            { ...folderPermissionDto(groupId, destinationFolderId, PermissionEntity.PERMISSION_READ), aro: "Group" },
          ],
          [movedResource.id]: [resourcePermissionDto(operatorId, movedResource.id)],
        },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");
      // ShareDialog staged the group as added on mount, since it is in the resulting set but not in
      // the resource's current permissions. The operator confirmed it without editing anything.
      const changes = [
        {
          is_new: true,
          aro: "Group",
          aro_foreign_key: groupId,
          aco: "Resource",
          aco_foreign_key: movedResource.id,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(changes));

      const [, , permissionsDto] = portRequestArgs(props.context.port, MOVE_RESOURCES_BY_IDS);
      const groupPermission = permissionsDto[movedResource.id].find(
        (permission) => permission.aro_foreign_key === groupId,
      );
      // The result carries the group as a group, at its own level, not turned into a user grant.
      expect(groupPermission).toMatchObject({ aro: "Group", type: PermissionEntity.PERMISSION_READ });
    });

    it("As LU I should see the workflow refuse the submission when the destination permissions changed during my review", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const initial = [
        folderPermissionDto(operatorId, destinationFolderId),
        folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
      ];
      const drifted = [
        ...initial,
        folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
      ];
      // The destination changes between the first read, when the dialog opens, and the second one, on
      // confirm. The moved resource's own permissions stay put.
      let destinationFindCount = 0;
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, (acoId) => {
        if (acoId === destinationFolderId) {
          destinationFindCount += 1;
          return destinationFindCount === 1 ? initial : drifted;
        }
        return [resourcePermissionDto(operatorId, acoId)];
      });
      props.context.port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) =>
        resourcesIds.map((id) => ({ id, permissions: [resourcePermissionDto(operatorId, id)] })),
      );
      props.context.port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm([]));

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        error: expect.objectContaining({
          message:
            "The destination folder permissions changed during your review. Please retry the operation and verify the permissions again.",
        }),
      });
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU I should see the workflow refuse the submission when a moved resource's own permissions changed during my review", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const destinationPerms = [
        folderPermissionDto(operatorId, destinationFolderId),
        folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
      ];
      const initialResourcePerms = [resourcePermissionDto(operatorId, movedResource.id)];
      const driftedResourcePerms = [
        ...initialResourcePerms,
        resourcePermissionDto(uuidv4(), movedResource.id, PermissionEntity.PERMISSION_READ),
      ];
      // The moved resource's own permissions change between the first read, when the dialog opens,
      // and the second one, on confirm. The destination stays put.
      let resourceFindCount = 0;
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => destinationPerms);
      props.context.port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) => {
        resourceFindCount += 1;
        const permissions = resourceFindCount === 1 ? initialResourcePerms : driftedResourcePerms;
        return resourcesIds.map((id) => ({ id, permissions }));
      });
      props.context.port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm([]));

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        error: expect.objectContaining({
          message:
            "The permissions of a resource being moved changed during your review. Please retry the operation and verify the permissions again.",
        }),
      });
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU cancelling the dialog should terminate the workflow without moving", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
        },
      });

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      shareProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe("As LU moving resources where no permission change applies", () => {
    it("As LU moving into a non-shared destination that matches the resource's own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [movedResource.id]: [resourcePermissionDto(operatorId, movedResource.id)],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        props.resources.map((resource) => resource.id),
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving a shared resource into a non-shared destination I should still see the dialog when a recipient would be dropped", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const parentFolderId = uuidv4();
      const movedResource = resourceDto({ folder_parent_id: parentFolderId });
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          // The destination is personal, it grants nobody but the operator.
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [parentFolderId]: [
            folderPermissionDto(operatorId, parentFolderId),
            folderPermissionDto(bettyId, parentFolderId, PermissionEntity.PERMISSION_READ),
          ],
          // Betty's read on the resource matches what its current folder grants, so it came from
          // there and is dropped. The personal destination gives her nothing back.
          [movedResource.id]: [
            resourcePermissionDto(operatorId, movedResource.id),
            resourcePermissionDto(bettyId, movedResource.id, PermissionEntity.PERMISSION_READ),
          ],
        },
      });

      await mountUntilShareOpen(props);

      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog, expect.anything());
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const appliedPermissions = shareProps.initialAppliedPermissions.get(movedResource.id);
      expect(appliedPermissions.getByAro(PermissionEntity.ARO_USER, bettyId)).toBeUndefined();
    });

    it("As LU moving to the root a resource that already holds only its own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const movedResource = resourceDto();
      const props = defaultProps({ resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: { [movedResource.id]: [resourcePermissionDto(operatorId, movedResource.id)] },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // No destination to fetch, but the resource's own permissions still are, to see what changes.
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        movedResource.folder_parent_id,
        expect.anything(),
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        props.resources.map((resource) => resource.id),
        null,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving to the root a resource a co-owner also holds I should move without a dialog, my re-asserted ownership leaving no delta", async () => {
      expect.assertions(3);
      const parentFolderId = uuidv4();
      const movedResource = resourceDto({ folder_parent_id: parentFolderId });
      const props = defaultProps({ resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          // The folder grants the operator alone, so their ownership of the resource is dropped as
          // coming from there. A move to the root puts them back as owner.
          // Betty's ownership is absent from the folder, so it was granted on the resource and stays.
          // The result is the same list as before.
          [parentFolderId]: [folderPermissionDto(operatorId, parentFolderId)],
          [movedResource.id]: [
            resourcePermissionDto(operatorId, movedResource.id),
            resourcePermissionDto(bettyId, movedResource.id),
          ],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(MOVE_RESOURCES_BY_IDS, [movedResource.id], null, null);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving to the root a resource that inherits a permission from its parent I should still see the dialog when it would be dropped", async () => {
      expect.assertions(2);
      const parentFolderId = uuidv4();
      const movedResource = resourceDto({ folder_parent_id: parentFolderId });
      const props = defaultProps({ resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [parentFolderId]: [
            folderPermissionDto(operatorId, parentFolderId),
            folderPermissionDto(bettyId, parentFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [movedResource.id]: [
            resourcePermissionDto(operatorId, movedResource.id),
            resourcePermissionDto(bettyId, movedResource.id, PermissionEntity.PERMISSION_READ),
          ],
        },
      });

      await mountUntilShareOpen(props);

      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog, expect.anything());
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const appliedPermissions = shareProps.initialAppliedPermissions.get(movedResource.id);
      expect(appliedPermissions.getByAro(PermissionEntity.ARO_USER, bettyId)).toBeUndefined();
    });

    it("As LU moving into a shared destination that already matches the resource's own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const readerId = uuidv4();
      const movedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource] });
      const operatorId = props.context.loggedInUser.id;
      // The resource moves from the root, so nothing is dropped, and it already carries exactly what
      // the destination grants. Merging gives the same list back, so nothing changes.
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(readerId, destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [movedResource.id]: [
            resourcePermissionDto(operatorId, movedResource.id),
            resourcePermissionDto(readerId, movedResource.id, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        [movedResource.id],
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });
  });

  describe("As LU moving resources with mixed ownership", () => {
    it("As LU owning none of the moved resources I should move them unchanged without a dialog", async () => {
      expect.assertions(4);
      const destinationFolderId = uuidv4();
      const notOwnedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_UPDATE } });
      const props = defaultProps({ destinationFolderId, resources: [notOwnedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // No moved resource can have its permissions changed, so no dialog and no error.
      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      // The resources just move, nothing is confirmed for them.
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        props.resources.map((resource) => resource.id),
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU owning a subset of the moved resources I should review an editable dialog seeded with each resource's resulting permissions", async () => {
      expect.assertions(4);
      const destinationFolderId = uuidv4();
      const ownedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_OWNER } });
      const notOwnedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_UPDATE } });
      const props = defaultProps({ destinationFolderId, resources: [ownedResource, notOwnedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          // The owned resource is private to the operator today, the destination's permissions apply to it.
          [ownedResource.id]: [resourcePermissionDto(operatorId, ownedResource.id)],
          // The other resource belongs to somebody else, the operator can only update it.
          [notOwnedResource.id]: [
            resourcePermissionDto(uuidv4(), notOwnedResource.id),
            resourcePermissionDto(operatorId, notOwnedResource.id, PermissionEntity.PERMISSION_UPDATE),
          ],
        },
      });
      jest.spyOn(props.context.port, "request");

      await mountUntilShareOpen(props);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      // The move dialog is editable, the operator can adjust what the destination proposes.
      expect(shareProps.readOnly).toBeUndefined();
      // Both moved resources are seeded so the dialog can show the marker across the selection.
      expect(shareProps.initialResources).toHaveLength(2);
      // Every moved resource's current permissions are snapshotted, in one batched request, to work
      // out what each ends up with.
      expect(props.context.port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, [
        ownedResource.id,
        notOwnedResource.id,
      ]);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        ownedResource.id,
        PermissionEntity.ACO_RESOURCE,
      );
    });

    it("As LU owning a subset I should pass the not-owned resources to the dialog as the unchanged set", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const ownedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_OWNER } });
      const notOwnedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_UPDATE } });
      const props = defaultProps({ destinationFolderId, resources: [ownedResource, notOwnedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [ownedResource.id]: [resourcePermissionDto(operatorId, ownedResource.id)],
          [notOwnedResource.id]: [
            resourcePermissionDto(uuidv4(), notOwnedResource.id),
            resourcePermissionDto(operatorId, notOwnedResource.id, PermissionEntity.PERMISSION_UPDATE),
          ],
        },
      });

      await mountUntilShareOpen(props);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      // Only the not-owned resource is reported as left unchanged.
      expect(shareProps.unchangedAcos).toHaveLength(1);
      expect(shareProps.unchangedAcos[0].id).toBe(notOwnedResource.id);
    });

    it("As LU moving an owned resource with a direct recipient I should see that recipient retained in the computed applied permissions", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const parentFolderId = uuidv4();
      const carolId = uuidv4();
      const readerId = uuidv4();
      const ownedResource = resourceDto({
        permission: { type: PermissionEntity.PERMISSION_OWNER },
        folder_parent_id: parentFolderId,
      });
      const notOwnedResource = resourceDto({ permission: { type: PermissionEntity.PERMISSION_UPDATE } });
      const props = defaultProps({ destinationFolderId, resources: [ownedResource, notOwnedResource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(readerId, destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          // The folder does not grant Carol, so she was granted on the resource itself.
          [parentFolderId]: [folderPermissionDto(operatorId, parentFolderId)],
          [ownedResource.id]: [
            resourcePermissionDto(operatorId, ownedResource.id),
            resourcePermissionDto(carolId, ownedResource.id),
          ],
          [notOwnedResource.id]: [
            resourcePermissionDto(uuidv4(), notOwnedResource.id),
            resourcePermissionDto(operatorId, notOwnedResource.id, PermissionEntity.PERMISSION_UPDATE),
          ],
        },
      });
      jest.spyOn(props.context.port, "request");

      await mountUntilShareOpen(props);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      // Its folder's permissions are fetched to work out what the owned resource ends up with.
      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        parentFolderId,
        PermissionEntity.ACO_FOLDER,
      );
      // Carol is absent from the folder, so she was granted on the resource and is kept.
      // The seed alone would not prove that, hence the check against the folder.
      const appliedForOwned = shareProps.initialAppliedPermissions.get(ownedResource.id);
      expect(appliedForOwned.items.some((permission) => permission.aroForeignKey === carolId)).toBe(true);
    });
  });

  describe("As LU when the service worker skips resources it cannot move", () => {
    it("As LU when some resources could not be moved I should see a warning and navigate to a moved one", async () => {
      expect.assertions(4);
      const destinationFolderId = uuidv4();
      const movedResource = resourceDto();
      const skippedResource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [movedResource, skippedResource] });
      const operatorId = props.context.loggedInUser.id;
      // Nothing changes for either resource, so no dialog. The service worker reports the skipped one.
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [movedResource.id]: [resourcePermissionDto(operatorId, movedResource.id)],
          [skippedResource.id]: [resourcePermissionDto(operatorId, skippedResource.id)],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => ({
        skippedResourceIds: [skippedResource.id],
      }));

      await mountUntilStopped(props);

      expect(props.actionFeedbackContext.displayWarning).toHaveBeenCalled();
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords/view/${movedResource.id}`);
    });

    it("As LU when none of the resources could be moved I should see an error and no success", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const resource = resourceDto();
      const props = defaultProps({ destinationFolderId, resources: [resource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [resource.id]: [resourcePermissionDto(operatorId, resource.id)],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => ({ skippedResourceIds: [resource.id] }));

      await mountUntilStopped(props);

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalled();
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(props.history.push).not.toHaveBeenCalled();
    });
  });

  describe("As LU moving a resource that is already in the destination folder", () => {
    it("As LU I should move without the dialog, the resource being skipped rather than re-permissioned", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const resource = resourceDto({ folder_parent_id: destinationFolderId });
      const props = defaultProps({ destinationFolderId, resources: [resource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          // The destination grants somebody the resource does not have, so a move would change something.
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [resource.id]: [resourcePermissionDto(operatorId, resource.id)],
        },
      });
      props.context.port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => ({ skippedResourceIds: [] }));
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      /*
       * Moving an item into the folder it is already in does nothing, so no permission can change.
       * No dialog, and nothing is confirmed.
       */
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        [resource.id],
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });
  });

  describe("As LU moving a resource whose parent folder permissions cannot be resolved", () => {
    it("As LU I should see an error rather than a move computed as if the resource had no parent", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const parentFolderId = uuidv4();
      const resource = resourceDto({ folder_parent_id: parentFolderId });
      const props = defaultProps({ destinationFolderId, resources: [resource] });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByAcoId: {
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [resource.id]: [resourcePermissionDto(operatorId, resource.id)],
        },
      });
      /*
       * A folder whose permissions could not be retrieved must not be read as "no folder at all".
       * That path keeps every permission instead of dropping the ones that came from the folder,
       * which quietly over-shares the moved resource.
       * Only the folder lookup fails here, so the error can come from nowhere else.
       */
      const findPermissions = PermissionServiceWorkerService.prototype.findPermissions;
      jest
        .spyOn(PermissionServiceWorkerService.prototype, "findPermissions")
        .mockImplementation(async function (acoId, acoType) {
          return acoId === parentFolderId ? undefined : findPermissions.call(this, acoId, acoType);
        });
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, expect.anything());
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_RESOURCES_BY_IDS,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
