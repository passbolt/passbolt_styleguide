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
import { defaultProps, folderDto } from "./FolderMoveFlow.test.data";
import {
  dialogPropsFor,
  folderGroupPermissionDto,
  folderPermissionDto,
  mountUntilFlowStopped,
  mountUntilStatus,
  portRequestArgs,
} from "./moveFlow.test.data";
import FolderMoveFlowTestPage from "./FolderMoveFlow.test.page";
import { FOLDER_MOVE_FLOW_STATUS } from "./FolderMoveFlow";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { MOVE_FOLDER_BY_ID } from "../../../../../shared/services/serviceWorker/move/moveItemsServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Wire the destination-snapshot port events.
 * `permissionsByFolderId` maps a folder id to its permission DTOs, and the find event answers one
 * requested folder id at a time.
 */
function wireDestinationSnapshot(port, { permissionsByFolderId = {} } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, (acoId) => permissionsByFolderId[acoId] ?? []);
  port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
}

/**
 * Mount the flow and wait until the ShareDialog is open.
 */
const mountUntilShareOpen = (props) =>
  mountUntilStatus(FolderMoveFlowTestPage, props, FOLDER_MOVE_FLOW_STATUS.SHARE_DIALOG_OPEN);

/**
 * Mount the flow and wait until it has terminated (onStop called).
 */
const mountUntilStopped = (props) => mountUntilFlowStopped(FolderMoveFlowTestPage, props);

describe("FolderMoveFlow", () => {
  describe("As LU moving a folder into a shared destination folder", () => {
    it("As LU I should review the destination folder permissions seeded into the dialog (controlled, editable)", async () => {
      expect.assertions(7);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [props.folder.id]: [folderPermissionDto(operatorId, props.folder.id)],
        },
      });

      jest.spyOn(props.context.port, "request");
      await mountUntilShareOpen(props);

      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        destinationFolderId,
        PermissionEntity.ACO_FOLDER,
      );
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.readOnly).toBeUndefined();
      // A folder is seeded through `initialFolders`. For an ACO_FOLDER dialog ShareDialog reads that
      // collection, not `initialResources`, so pairing the two wrongly leaves it empty.
      expect(shareProps.acoType).toBe(PermissionEntity.ACO_FOLDER);
      expect(shareProps.initialResources).toBeUndefined();
      expect(shareProps.initialFolders).toHaveLength(1);
      // The dialog is seeded with the permissions the folder has today, just the operator here.
      expect(shareProps.initialFolders[0].permissions.length).toBe(1);
      // What the folder ends up with, its own kept permissions merged with the destination, is passed
      // separately so the dialog can stage the added and modified badges.
      expect(shareProps.initialAppliedPermissions.get(props.folder.id).length).toBe(2);
    });

    it("As LU moving an owned folder with a direct recipient I should fetch the folder's own and parent permissions and see that recipient retained", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const parentFolderId = uuidv4();
      const carolId = uuidv4();
      const readerId = uuidv4();
      const movedFolder = folderDto({ folder_parent_id: parentFolderId });
      const props = defaultProps({ destinationFolderId, folder: movedFolder });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(readerId, destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          // The parent does not grant Carol, so she was granted on the moved folder itself.
          [parentFolderId]: [folderPermissionDto(operatorId, parentFolderId)],
          [movedFolder.id]: [
            folderPermissionDto(operatorId, movedFolder.id),
            folderPermissionDto(carolId, movedFolder.id),
          ],
        },
      });
      jest.spyOn(props.context.port, "request");

      await mountUntilShareOpen(props);

      // The folder's own permissions are snapshotted, and its parent's are fetched.
      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        movedFolder.id,
        PermissionEntity.ACO_FOLDER,
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        parentFolderId,
        PermissionEntity.ACO_FOLDER,
      );
      // Carol is absent from the parent, so she was granted on the folder and is kept.
      // The seed alone would not prove that, hence the check against the parent.
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const appliedForFolder = shareProps.initialAppliedPermissions.get(movedFolder.id);
      expect(appliedForFolder.items.some((permission) => permission.aroForeignKey === carolId)).toBe(true);
    });

    it("As LU confirming should move the folder with the full operator-confirmed permission set", async () => {
      expect.assertions(6);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      const existingRecipientId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(existingRecipientId, destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
          [props.folder.id]: [folderPermissionDto(operatorId, props.folder.id)],
        },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");
      const newRecipientId = uuidv4();
      // ShareChanges emits its changes per item. `changes` is what the real dialog would emit on
      // confirm. ShareDialog staged existingRecipient as added on mount, since they are in the
      // resulting set but not in the folder's current permissions. The operator then added
      // newRecipient by hand through the mocked dialog.
      const changes = [
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: existingRecipientId,
          aco: "Folder",
          aco_foreign_key: props.folder.id,
          type: PermissionEntity.PERMISSION_READ,
        },
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: newRecipientId,
          aco: "Folder",
          aco_foreign_key: props.folder.id,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(changes));

      const [folderId, destId, permissionsDto] = portRequestArgs(props.context.port, MOVE_FOLDER_BY_ID);
      expect(folderId).toStrictEqual(props.folder.id);
      expect(destId).toStrictEqual(destinationFolderId);
      // What the folder ends up with is sent under its id: the operator as owner, the existing
      // recipient and the new one.
      const targetTypeByAro = new Map(
        permissionsDto[folderId].map((permission) => [permission.aro_foreign_key, permission.type]),
      );
      expect([...targetTypeByAro.keys()].sort()).toStrictEqual(
        [operatorId, existingRecipientId, newRecipientId].sort(),
      );
      // Each recipient's level is carried too. The operator keeps ownership, the added one gets read.
      expect(targetTypeByAro.get(operatorId)).toBe(PermissionEntity.PERMISSION_OWNER);
      expect(targetTypeByAro.get(newRecipientId)).toBe(PermissionEntity.PERMISSION_READ);
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU confirming should move the folder with a group recipient's authoritative type", async () => {
      expect.assertions(1);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      const groupId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            { ...folderPermissionDto(groupId, destinationFolderId, PermissionEntity.PERMISSION_READ), aro: "Group" },
          ],
          [props.folder.id]: [folderPermissionDto(operatorId, props.folder.id)],
        },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");
      // ShareDialog staged the group as added on mount, since it is in the resulting set but not in
      // the folder's current permissions. The operator confirmed it without editing anything.
      const changes = [
        {
          is_new: true,
          aro: "Group",
          aro_foreign_key: groupId,
          aco: "Folder",
          aco_foreign_key: props.folder.id,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(changes));

      const [folderId, , permissionsDto] = portRequestArgs(props.context.port, MOVE_FOLDER_BY_ID);
      const groupPermission = permissionsDto[folderId].find((permission) => permission.aro_foreign_key === groupId);
      // The result carries the group as a group, at its own level, not turned into a user grant.
      expect(groupPermission).toMatchObject({ aro: "Group", type: PermissionEntity.PERMISSION_READ });
    });

    it("As LU I should see the workflow refuse the submission when the destination permissions changed during my review", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
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
      // confirm. The moved folder's own permissions stay put.
      let destinationFindCount = 0;
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, (acoId) => {
        if (acoId === destinationFolderId) {
          destinationFindCount += 1;
          return destinationFindCount === 1 ? initial : drifted;
        }
        return [folderPermissionDto(operatorId, acoId)];
      });
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
        MOVE_FOLDER_BY_ID,
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
        permissionsByFolderId: {
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
        MOVE_FOLDER_BY_ID,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe("As LU moving a folder where no permission change applies", () => {
    it("As LU moving into a non-shared destination that matches the folder's own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const props = defaultProps({ destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [props.folder.id]: [folderPermissionDto(operatorId, props.folder.id)],
        },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        props.folder.id,
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving a shared folder into a non-shared destination I should still see the dialog when a recipient would be dropped", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const parentFolderId = uuidv4();
      const props = defaultProps({ folder: folderDto({ folder_parent_id: parentFolderId }), destinationFolderId });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          // The destination is personal, it grants nobody but the operator.
          [destinationFolderId]: [folderPermissionDto(operatorId, destinationFolderId)],
          [parentFolderId]: [
            folderPermissionDto(operatorId, parentFolderId),
            folderPermissionDto(bettyId, parentFolderId, PermissionEntity.PERMISSION_READ),
          ],
          // Betty's read on the folder matches what its parent grants, so it came from there and is
          // dropped. The personal destination gives her nothing back.
          [props.folder.id]: [
            folderPermissionDto(operatorId, props.folder.id),
            folderPermissionDto(bettyId, props.folder.id, PermissionEntity.PERMISSION_READ),
          ],
        },
      });

      await mountUntilShareOpen(props);

      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog, expect.anything());
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const appliedPermissions = shareProps.initialAppliedPermissions.get(props.folder.id);
      expect(appliedPermissions.getByAro(PermissionEntity.ARO_USER, bettyId)).toBeUndefined();
    });

    it("As LU moving into a shared destination that already matches the folder's own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const readerId = uuidv4();
      const movedFolder = folderDto();
      const props = defaultProps({ destinationFolderId, folder: movedFolder });
      const operatorId = props.context.loggedInUser.id;
      // The folder moves from the root, so nothing is dropped, and it already carries exactly what the
      // destination grants. Merging gives the same list back, so nothing changes.
      const matchingSet = [
        folderPermissionDto(operatorId, destinationFolderId),
        folderPermissionDto(readerId, destinationFolderId, PermissionEntity.PERMISSION_READ),
      ];
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: matchingSet,
          [movedFolder.id]: [
            folderPermissionDto(operatorId, movedFolder.id),
            folderPermissionDto(readerId, movedFolder.id, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        movedFolder.id,
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving to the root a folder that already holds only its own permissions I should move without a dialog (zero delta)", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: { [props.folder.id]: [folderPermissionDto(operatorId, props.folder.id)] },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // No destination to fetch, but the folder's own permissions still are, to see what changes.
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        props.folder.folder_parent_id,
        expect.anything(),
      );
      expect(props.context.port.request).toHaveBeenCalledWith(MOVE_FOLDER_BY_ID, props.folder.id, null, null);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU moving to the root a folder whose recipient the old parent also granted I should see the dialog drop that recipient and keep my ownership", async () => {
      expect.assertions(3);
      const parentFolderId = uuidv4();
      const props = defaultProps({ folder: folderDto({ folder_parent_id: parentFolderId }) });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          // The parent shares with Betty at the level the folder carries, so her grant came from there
          // and is dropped. The operator is put back as owner, and the folder becomes personal.
          [parentFolderId]: [
            folderPermissionDto(operatorId, parentFolderId),
            folderPermissionDto(bettyId, parentFolderId, PermissionEntity.PERMISSION_UPDATE),
          ],
          [props.folder.id]: [
            folderPermissionDto(operatorId, props.folder.id),
            folderPermissionDto(bettyId, props.folder.id, PermissionEntity.PERMISSION_UPDATE),
          ],
        },
      });

      await mountUntilShareOpen(props);

      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog, expect.anything());
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const appliedPermissions = shareProps.initialAppliedPermissions.get(props.folder.id);
      expect(appliedPermissions.getByAro(PermissionEntity.ARO_USER, bettyId)).toBeUndefined();
      expect(appliedPermissions.getByAro(PermissionEntity.ARO_USER, operatorId).type).toBe(
        PermissionEntity.PERMISSION_OWNER,
      );
    });

    it("As LU moving to the root a folder a co-owner also holds I should move without a dialog, my re-asserted ownership leaving no delta", async () => {
      expect.assertions(3);
      const parentFolderId = uuidv4();
      const props = defaultProps({ folder: folderDto({ folder_parent_id: parentFolderId }) });
      const operatorId = props.context.loggedInUser.id;
      const bettyId = uuidv4();
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          // The parent grants the operator alone, so their ownership of the folder is dropped as
          // coming from there. A move to the root puts them back as owner.
          // Betty's ownership is absent from the parent, so it was granted on the folder and stays.
          // The result is the same list as before.
          [parentFolderId]: [folderPermissionDto(operatorId, parentFolderId)],
          [props.folder.id]: [
            folderPermissionDto(operatorId, props.folder.id),
            folderPermissionDto(bettyId, props.folder.id),
          ],
        },
      });

      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(MOVE_FOLDER_BY_ID, props.folder.id, null, null);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });
  });

  describe("As LU moving a folder I do not own", () => {
    it("As LU not owning the folder I should move it unchanged without a dialog", async () => {
      expect.assertions(4);
      const destinationFolderId = uuidv4();
      const props = defaultProps({
        destinationFolderId,
        folder: folderDto({ permission: { type: PermissionEntity.PERMISSION_UPDATE } }),
      });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // The folder's permissions cannot change, so no dialog and no error.
      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      // The folder just moves, nothing is confirmed for it.
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        props.folder.id,
        destinationFolderId,
        null,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU only able to read the folder I should see an actionable error and the folder is not moved into the shared destination", async () => {
      expect.assertions(3);
      const destinationFolderId = uuidv4();
      const props = defaultProps({
        destinationFolderId,
        folder: folderDto({ permission: { type: PermissionEntity.PERMISSION_READ } }),
      });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [
            folderPermissionDto(operatorId, destinationFolderId),
            folderPermissionDto(uuidv4(), destinationFolderId, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // A read-only folder cannot go into a shared destination. It says why, and nothing moves.
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(
        "Folders you can only read cannot be moved into a shared folder.",
      );
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU only able to read the folder I should still be able to move it to the root, where it stays self-organized", async () => {
      expect.assertions(3);
      const props = defaultProps({
        destinationFolderId: null,
        folder: folderDto({ permission: { type: PermissionEntity.PERMISSION_READ } }),
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      // The read-only rule is about shared destinations only. The root grants nobody, so a read-only
      // folder can still be reorganised there.
      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.context.port.request).toHaveBeenCalledWith(MOVE_FOLDER_BY_ID, props.folder.id, null, null);
    });

    it("As LU only able to read the folder I should see an actionable error when moving it out of a shared parent", async () => {
      expect.assertions(2);
      const parentFolderId = uuidv4();
      const props = defaultProps({
        destinationFolderId: null,
        folder: folderDto({
          folder_parent_id: parentFolderId,
          permission: { type: PermissionEntity.PERMISSION_READ },
        }),
      });
      const operatorId = props.context.loggedInUser.id;
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [parentFolderId]: [
            folderPermissionDto(operatorId, parentFolderId),
            folderPermissionDto(uuidv4(), parentFolderId, PermissionEntity.PERMISSION_READ),
          ],
        },
      });
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      /*
       * The service worker only lets a read-only folder leave the root or a personal parent, see
       * FolderEntity.canFolderMove. A shared parent must therefore be caught here, and say why,
       * rather than get the generic "can not be moved".
       */
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(
        "Folders you can only read cannot be moved out of a shared folder.",
      );
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU only able to read the folder I should be able to move it into a folder whose sole permission is a group grant", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const props = defaultProps({
        destinationFolderId,
        folder: folderDto({ permission: { type: PermissionEntity.PERMISSION_READ } }),
      });
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          // A lone permission makes the folder personal, whoever it is granted to.
          [destinationFolderId]: [folderGroupPermissionDto(uuidv4(), destinationFolderId)],
        },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        props.folder.id,
        destinationFolderId,
        null,
      );
    });

    it("As LU only able to read the folder I should be able to move it into a folder whose sole permission belongs to somebody else", async () => {
      expect.assertions(2);
      const destinationFolderId = uuidv4();
      const props = defaultProps({
        destinationFolderId,
        folder: folderDto({ permission: { type: PermissionEntity.PERMISSION_READ } }),
      });
      wireDestinationSnapshot(props.context.port, {
        permissionsByFolderId: {
          [destinationFolderId]: [folderPermissionDto(uuidv4(), destinationFolderId)],
        },
      });
      props.context.port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(props.context.port, "request");

      await mountUntilStopped(props);

      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith(
        MOVE_FOLDER_BY_ID,
        props.folder.id,
        destinationFolderId,
        null,
      );
    });
  });
});
