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
 * @since         5.14.0
 */

import { waitFor } from "@testing-library/react";
import { act } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultProps, resourceDto } from "./ResourceShareFlow.test.data";
import ResourceShareFlowTestPage from "./ResourceShareFlow.test.page";
import { RESOURCE_SHARE_FLOW_STATUS } from "./ResourceShareFlow";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import {
  PERMISSIONS_FIND_BY_IDS_FOR_SHARE,
  SHARE_RESOURCES_SAVE,
} from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { defaultGroupDto } from "../../../../../shared/models/entity/group/groupEntity.test.data";
import { defaultGroupUser } from "../../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import { defaultUserDto } from "../../../../../shared/models/entity/user/userEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * A permission DTO on a resource (ACO_RESOURCE) for a given ARO.
 */
function resourcePermissionDto(aroForeignKey, resourceId, type = PermissionEntity.PERMISSION_OWNER) {
  return {
    id: uuidv4(),
    aco: "Resource",
    aco_foreign_key: resourceId,
    aro: "User",
    aro_foreign_key: aroForeignKey,
    type,
  };
}

/**
 * Wire the snapshot port events. `permissionsByResourceId` maps a resource id to its permission DTOs;
 * the batched find event answers with one resource DTO (id + permissions) per requested id.
 */
function wireSnapshotListeners(port, { permissionsByResourceId = {} } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) =>
    resourcesIds.map((id) => ({ id, permissions: permissionsByResourceId[id] ?? [] })),
  );
  port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
}

/**
 * Pull the props the workflow passed to a given dispatched dialog (by component identity).
 */
function dialogPropsFor(dialogContext, DialogComponent) {
  const call = dialogContext.open.mock.calls.find(([Dialog]) => Dialog === DialogComponent);
  return call?.[1];
}

/**
 * Mount the flow and wait until the ShareDialog is open.
 */
async function mountUntilShareOpen(props) {
  let page;
  await act(() => (page = new ResourceShareFlowTestPage(props)));
  await waitFor(() => {
    if (page._instance.state.status !== RESOURCE_SHARE_FLOW_STATUS.SHARE_DIALOG_OPEN) {
      throw new Error("ShareDialog not yet opened");
    }
  });
  return page;
}

describe("ResourceShareFlow", () => {
  describe("As LU sharing a single resource I own", () => {
    it("As LU I should review the resource permissions seeded from the snapshot (controlled, editable)", async () => {
      expect.assertions(4);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const resourceId = props.resources[0].id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: { [resourceId]: [resourcePermissionDto(operatorId, resourceId)] },
      });

      jest.spyOn(props.context.port, "request");
      await mountUntilShareOpen(props);

      // The snapshot is built from the resource's own permissions, fetched in a single batched request.
      expect(props.context.port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, [resourceId]);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      // Controlled via initialResources, editable (no read-only).
      expect(shareProps.readOnly).toBeUndefined();
      expect(shareProps.initialResources).toHaveLength(1);
      expect(shareProps.initialResources[0].id).toStrictEqual(resourceId);
    });

    it("As LU I should see the confirmed changes saved as-is (the dialog already targets the resource)", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const resourceId = props.resources[0].id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: { [resourceId]: [resourcePermissionDto(operatorId, resourceId)] },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(SHARE_RESOURCES_SAVE, () => undefined);
      jest.spyOn(props.context.port, "request");
      const fakeChanges = [
        { aro: "User", aro_foreign_key: uuidv4(), aco: "Resource", aco_foreign_key: resourceId, type: 1, is_new: true },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(fakeChanges));

      expect(props.context.port.request).toHaveBeenCalledWith(SHARE_RESOURCES_SAVE, [resourceId], fakeChanges);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU confirming without changes should not call the share save but still finalize", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const resourceId = props.resources[0].id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: { [resourceId]: [resourcePermissionDto(operatorId, resourceId)] },
      });

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm([]));

      expect(props.context.port.request).not.toHaveBeenCalledWith(
        SHARE_RESOURCES_SAVE,
        expect.anything(),
        expect.anything(),
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU I should see the workflow refuse the submission when the resource permissions changed during my review", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const resourceId = props.resources[0].id;
      const initialPermissionsDto = [resourcePermissionDto(operatorId, resourceId)];
      const driftedPermissionsDto = [
        ...initialPermissionsDto,
        resourcePermissionDto(uuidv4(), resourceId, PermissionEntity.PERMISSION_READ),
      ];
      let findCallCount = 0;
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) => {
        findCallCount += 1;
        const permissions = findCallCount === 1 ? initialPermissionsDto : driftedPermissionsDto;
        return resourcesIds.map((id) => ({ id, permissions }));
      });
      props.context.port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() =>
        shareProps.onConfirm([
          {
            aro: "User",
            aro_foreign_key: uuidv4(),
            aco: "Resource",
            aco_foreign_key: resourceId,
            type: 1,
            is_new: true,
          },
        ]),
      );

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        error: expect.objectContaining({
          message:
            "The resource permissions changed during your review. Please retry the operation and verify the permissions again.",
        }),
      });
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        SHARE_RESOURCES_SAVE,
        expect.anything(),
        expect.anything(),
      );
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU cancelling ShareDialog should terminate the workflow without saving", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const resourceId = props.resources[0].id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: { [resourceId]: [resourcePermissionDto(operatorId, resourceId)] },
      });

      await mountUntilShareOpen(props);

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      shareProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        SHARE_RESOURCES_SAVE,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe("As LU sharing a resource shared with a group", () => {
    it("As LU I should see the group members preserved in the dialog (not 'Group with 0 member')", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const groupId = uuidv4();
      const memberId = uuidv4();
      const group = defaultGroupDto({
        id: groupId,
        name: "Developer",
        groups_users: [
          defaultGroupUser({
            user_id: memberId,
            group_id: groupId,
            user: defaultUserDto({ id: memberId, username: "member@passbolt.com" }),
          }),
        ],
      });
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, (resourcesIds) =>
        resourcesIds.map((id) => ({
          id,
          permissions: [
            resourcePermissionDto(operatorId, id),
            { id: uuidv4(), aco: "Resource", aco_foreign_key: id, aro: "Group", aro_foreign_key: groupId, type: 7 },
          ],
        })),
      );
      props.context.port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => [group]);

      await mountUntilShareOpen(props);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const sharedGroup = shareProps.initialGroups.items.find((item) => item.id === groupId);
      expect(sharedGroup).toBeTruthy();
      // Regression: the merge used to drop groups_users, so the dialog showed "Group with 0 member".
      expect(sharedGroup.groupsUsers.items).toHaveLength(1);
      expect(shareProps.initialUsers.items.map((user) => user.id)).toStrictEqual([memberId]);
    });
  });

  describe("As LU sharing multiple resources", () => {
    it("As LU I should review every selected resource, each snapshotted and seeded into the controlled dialog", async () => {
      expect.assertions(4);
      const resources = [resourceDto(), resourceDto()];
      const props = defaultProps({ resources });
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: {
          [resources[0].id]: [resourcePermissionDto(operatorId, resources[0].id)],
          [resources[1].id]: [resourcePermissionDto(operatorId, resources[1].id)],
        },
      });

      jest.spyOn(props.context.port, "request");
      await mountUntilShareOpen(props);

      // A single batched request covers the whole selection.
      expect(props.context.port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, [
        resources[0].id,
        resources[1].id,
      ]);

      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.initialResources).toHaveLength(2);
      // A snapshot is seeded for each selected resource.
      expect(shareProps.initialResources.map((resource) => resource.id)).toStrictEqual([
        resources[0].id,
        resources[1].id,
      ]);
      // It does not fall back to the uncontrolled (context-seeded) path.
      expect(props.context.setContext).not.toHaveBeenCalled();
    });

    it("As LU confirming should save the changes for all the selected resources", async () => {
      expect.assertions(1);
      const resources = [resourceDto(), resourceDto()];
      const props = defaultProps({ resources });
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissionsByResourceId: {
          [resources[0].id]: [resourcePermissionDto(operatorId, resources[0].id)],
          [resources[1].id]: [resourcePermissionDto(operatorId, resources[1].id)],
        },
      });

      await mountUntilShareOpen(props);

      props.context.port.addRequestListener(SHARE_RESOURCES_SAVE, () => undefined);
      jest.spyOn(props.context.port, "request");
      const changes = [
        {
          aro: "User",
          aro_foreign_key: uuidv4(),
          aco: "Resource",
          aco_foreign_key: resources[0].id,
          type: 1,
          is_new: true,
        },
        {
          aro: "User",
          aro_foreign_key: uuidv4(),
          aco: "Resource",
          aco_foreign_key: resources[1].id,
          type: 1,
          is_new: true,
        },
      ];
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm(changes));

      expect(props.context.port.request).toHaveBeenCalledWith(
        SHARE_RESOURCES_SAVE,
        [resources[0].id, resources[1].id],
        changes,
      );
    });
  });

  describe("As LU encountering an error mid-workflow", () => {
    it("As LU I should see an error dialog and the workflow should terminate when the snapshot build fails", async () => {
      expect.assertions(2);
      const props = defaultProps();
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {
        throw new Error("Keyring sync failed");
      });

      let page;
      await act(() => (page = new ResourceShareFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_SHARE_FLOW_STATUS.ERROR) {
          throw new Error("Workflow not yet in error state");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expect.any(Error) });
      expect(props.onStop).toHaveBeenCalled();
    });
  });
});
