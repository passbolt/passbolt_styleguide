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
 * @since         5.13.0
 */

import { waitFor } from "@testing-library/react";
import { act } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultProps } from "./ResourceEditFlow.test.data";
import ResourceEditFlowTestPage from "./ResourceEditFlow.test.page";
import { RESOURCE_EDIT_FLOW_STATUS } from "./ResourceEditFlow";
import EditResource from "../../EditResource/EditResource";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { USERS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/user/userServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Wire the four port events the snapshot service relies on.
 */
function wireSnapshotListeners(port, { permissions = [], groups = [], users = [] } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissions);
  port.addRequestListener(GROUPS_GET_BY_IDS, () => groups);
  port.addRequestListener(USERS_GET_BY_IDS, () => users);
}

/**
 * A permission DTO on the resource (ACO_RESOURCE) for a given ARO.
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
 * Pull the props the workflow passed to a given dispatched dialog (by component identity).
 */
function dialogPropsFor(dialogContext, DialogComponent) {
  const call = dialogContext.open.mock.calls.find(([Dialog]) => Dialog === DialogComponent);
  return call?.[1];
}

const fakeResourceFormEntity = { toResourceDto: () => ({}), toSecretDto: () => ({}) };

/**
 * Mount the flow and wait until the EditResource dialog is open.
 */
async function mountUntilEditOpen(props) {
  let page;
  await act(() => (page = new ResourceEditFlowTestPage(props)));
  await waitFor(() => {
    if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.EDIT_RESOURCE_OPEN) {
      throw new Error("EditResource not yet opened");
    }
  });
  return page;
}

describe("ResourceEditFlow", () => {
  describe("As LU editing a shared resource I own", () => {
    it("As LU I should review the resource permissions (editable) and the confirmed changes should reach passbolt.resources.update", async () => {
      expect.assertions(6);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const readerId = uuidv4();
      wireSnapshotListeners(props.context.port, {
        permissions: [
          resourcePermissionDto(operatorId, props.resource.id),
          resourcePermissionDto(readerId, props.resource.id, PermissionEntity.PERMISSION_READ),
        ],
        users: [
          { id: operatorId, username: "operator@passbolt.com" },
          { id: readerId, username: "reader@passbolt.com" },
        ],
      });

      // Spy before mounting: the snapshot is built during componentDidMount.
      jest.spyOn(props.context.port, "request");
      const page = await mountUntilEditOpen(props);

      // The snapshot must be built from the resource itself (ACO_RESOURCE), not a parent folder.
      expect(props.context.port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        props.resource.id,
        PermissionEntity.ACO_RESOURCE,
      );

      // Submit the form: ShareDialog must follow because the resource is shared.
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      await act(() => editProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      // Owner → the dialog is editable (not read-only), seeded from the snapshot.
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.readOnly).toBe(false);
      expect(shareProps.initialPermissions).toBe(page._instance.state.snapshot.permissions);

      // Confirm with deltas: no drift, update carries the deltas straight through (4th arg).
      props.context.port.addRequestListener("passbolt.resources.update", () => ({ id: props.resource.id }));
      jest.spyOn(props.context.port, "request");
      const fakeChanges = [
        { aro_foreign_key: uuidv4(), aco_foreign_key: null, aco: "Resource", type: 1, is_new: true },
      ];
      await act(() => shareProps.onConfirm(fakeChanges));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        fakeChanges,
      );
      expect(props.context.port.request).not.toHaveBeenCalledWith("passbolt.resources.create", expect.anything());
      expect(props.onStop).toHaveBeenCalled();
    });

    it("As LU I should see the workflow refuse the submission when the resource permissions changed during my review", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      const initialPermissionsDto = [
        resourcePermissionDto(operatorId, props.resource.id),
        resourcePermissionDto(uuidv4(), props.resource.id, PermissionEntity.PERMISSION_READ),
      ];
      const driftedPermissionsDto = [
        ...initialPermissionsDto,
        resourcePermissionDto(uuidv4(), props.resource.id, PermissionEntity.PERMISSION_READ),
      ];
      let findCallCount = 0;
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => {
        findCallCount += 1;
        return findCallCount === 1 ? initialPermissionsDto : driftedPermissionsDto;
      });
      props.context.port.addRequestListener(GROUPS_GET_BY_IDS, () => []);
      props.context.port.addRequestListener(USERS_GET_BY_IDS, () => [
        { id: operatorId, username: "operator@passbolt.com" },
        { id: uuidv4(), username: "reader@passbolt.com" },
      ]);

      const page = await mountUntilEditOpen(props);
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      await act(() => editProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      await act(() => shareProps.onConfirm([{ aro_foreign_key: uuidv4(), type: 1, is_new: true }]));

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        error: expect.objectContaining({
          message:
            "The resource permissions changed during your review. Please retry the operation and verify the permissions again.",
        }),
      });
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe("As LU editing a shared resource I can update but do not own", () => {
    it("As LU I should see the share dialog read-only and the update should carry empty changes", async () => {
      expect.assertions(3);
      const props = defaultProps({ resource: { permission: { type: PermissionEntity.PERMISSION_UPDATE } } });
      const operatorId = props.context.loggedInUser.id;
      const ownerId = uuidv4();
      wireSnapshotListeners(props.context.port, {
        permissions: [
          resourcePermissionDto(ownerId, props.resource.id),
          resourcePermissionDto(operatorId, props.resource.id, PermissionEntity.PERMISSION_UPDATE),
        ],
        users: [
          { id: ownerId, username: "owner@passbolt.com" },
          { id: operatorId, username: "operator@passbolt.com" },
        ],
      });

      const page = await mountUntilEditOpen(props);
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      await act(() => editProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      // Update-but-not-owner → read-only.
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      expect(shareProps.readOnly).toBe(true);

      props.context.port.addRequestListener("passbolt.resources.update", () => ({ id: props.resource.id }));
      jest.spyOn(props.context.port, "request");
      // A read-only confirmation emits no changes.
      await act(() => shareProps.onConfirm([]));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        [],
      );
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe("As LU editing a private resource (only the operator has access)", () => {
    it("As LU I should see the resource updated directly without a share-dialog step", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [resourcePermissionDto(operatorId, props.resource.id)],
        users: [{ id: operatorId, username: "operator@passbolt.com" }],
      });

      await mountUntilEditOpen(props);
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      jest
        .spyOn(props.context.port, "request")
        .mockImplementation((event) => (event === "passbolt.resources.update" ? { id: props.resource.id } : undefined));
      await act(() => editProps.onSubmit(fakeResourceFormEntity));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        undefined,
      );
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe("As LU cancelling a dialog mid-workflow", () => {
    it("As LU cancelling EditResource should terminate the workflow without any API call", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [resourcePermissionDto(operatorId, props.resource.id)],
        users: [{ id: operatorId, username: "operator@passbolt.com" }],
      });

      await mountUntilEditOpen(props);
      jest.spyOn(props.context.port, "request");
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      editProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU cancelling ShareDialog should terminate the workflow without updating the resource", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [
          resourcePermissionDto(operatorId, props.resource.id),
          resourcePermissionDto(uuidv4(), props.resource.id, PermissionEntity.PERMISSION_READ),
        ],
      });

      const page = await mountUntilEditOpen(props);
      const editProps = dialogPropsFor(props.dialogContext, EditResource);
      await act(() => editProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      shareProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.update",
        expect.anything(),
        expect.anything(),
        expect.anything(),
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
      await act(() => (page = new ResourceEditFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_EDIT_FLOW_STATUS.ERROR) {
          throw new Error("Workflow not yet in error state");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expect.any(Error) });
      expect(props.onStop).toHaveBeenCalled();
    });
  });
});
