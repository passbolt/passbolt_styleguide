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
import { defaultProps } from "./ResourceCreationFlow.test.data";
import ResourceCreationFlowTestPage from "./ResourceCreationFlow.test.page";
import { RESOURCE_CREATION_FLOW_STATUS } from "./ResourceCreationFlow";
import CreateResource from "../../CreateResource/CreateResource";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { USERS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/user/userServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Wire the four port events the snapshot service relies on. Returns the listener stubs so the
 * test can override one (e.g. throw an error) before mounting the workflow.
 * @param {object} port The MockPort from defaultAppContext.
 * @param {object} options
 * @param {Array} [options.permissions] The permissions DTO array returned by findPermissions.
 * @param {Array} [options.groups]
 * @param {Array} [options.users]
 */
function wireSnapshotListeners(port, { permissions = [], groups = [], users = [] } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissions);
  port.addRequestListener(GROUPS_GET_BY_IDS, () => groups);
  port.addRequestListener(USERS_GET_BY_IDS, () => users);
}

/**
 * Build a single-owner permission DTO mirroring the parent folder for the operator.
 */
function operatorOwnerPermissionDto(operatorId, folderId) {
  return {
    id: uuidv4(),
    aco: "Folder",
    aco_foreign_key: folderId,
    aro: "User",
    aro_foreign_key: operatorId,
    type: 15,
  };
}

/**
 * Pull the props the workflow passed to a given dispatched dialog (by component identity).
 */
function dialogPropsFor(dialogContext, DialogComponent) {
  const call = dialogContext.open.mock.calls.find(([Dialog]) => Dialog === DialogComponent);
  return call?.[1];
}

describe("ResourceCreationFlow", () => {
  describe("As LU creating a resource in a shared folder", () => {
    it("As LU I should be asked to review the parent folder's permissions before the resource is created", async () => {
      expect.assertions(5);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [
          operatorOwnerPermissionDto(operatorId, props.folderParentId),
          {
            id: uuidv4(),
            aco: "Folder",
            aco_foreign_key: props.folderParentId,
            aro: "User",
            aro_foreign_key: uuidv4(),
            type: 1,
          },
        ],
        users: [
          { id: operatorId, username: "operator@passbolt.com" },
          { id: uuidv4(), username: "reader@passbolt.com" },
        ],
      });

      let page;
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN) {
          throw new Error("CreateResource not yet opened");
        }
      });

      // CreateResource was dispatched
      expect(props.dialogContext.open).toHaveBeenCalledWith(
        CreateResource,
        expect.objectContaining({
          resourceType: props.resourceType,
          folderParentId: props.folderParentId,
        }),
      );

      // Submit the form: ShareDialog must follow because the parent is shared.
      const createProps = dialogPropsFor(props.dialogContext, CreateResource);
      const fakeResourceFormEntity = { toResourceDto: () => ({}), toSecretDto: () => ({}) };
      await act(() => createProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(
        ShareDialog,
        expect.objectContaining({
          initialPermissions: page._instance.state.snapshot.permissions,
          initialGroups: page._instance.state.snapshot.groups,
          initialUsers: page._instance.state.snapshot.users,
        }),
      );

      // Confirm the share dialog: workflow creates the resource then applies the share changes.
      const createdResourceId = uuidv4();
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.resources.create") {
          return { id: createdResourceId };
        }
        return undefined;
      });
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      const fakeChanges = [{ aro_foreign_key: uuidv4(), type: 1, is_new: true }];
      await act(() => shareProps.onConfirm(fakeChanges));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.create",
        expect.anything(),
        expect.anything(),
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.share.resources.save",
        [createdResourceId],
        fakeChanges,
      );
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe("As LU creating a resource in a private folder (only the operator has access)", () => {
    it("As LU I should see the resource created directly without a share-dialog step", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [operatorOwnerPermissionDto(operatorId, props.folderParentId)],
        users: [{ id: operatorId, username: "operator@passbolt.com" }],
      });

      let page;
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN) {
          throw new Error("CreateResource not yet opened");
        }
      });

      const createProps = dialogPropsFor(props.dialogContext, CreateResource);
      const createdResourceId = uuidv4();
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.resources.create") {
          return { id: createdResourceId };
        }
        return undefined;
      });
      const fakeResourceFormEntity = { toResourceDto: () => ({}), toSecretDto: () => ({}) };
      await act(() => createProps.onSubmit(fakeResourceFormEntity));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.resources.create",
        expect.anything(),
        expect.anything(),
      );
      expect(props.dialogContext.open).not.toHaveBeenCalledWith(ShareDialog, expect.anything());
      expect(props.onStop).toHaveBeenCalled();
    });
  });

  describe("As LU creating a resource at the workspace root", () => {
    it("As LU I should see the form open without the workflow first fetching parent-folder permissions", async () => {
      expect.assertions(3);
      const props = defaultProps({ folderParentId: null });
      jest.spyOn(props.context.port, "request");

      let page;
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN) {
          throw new Error("CreateResource not yet opened");
        }
      });

      expect(props.context.port.request).not.toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        expect.anything(),
        expect.anything(),
      );
      expect(page._instance.state.snapshot).toBeNull();
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, expect.anything());
    });
  });

  describe("As LU cancelling a dialog mid-workflow", () => {
    it("As LU cancelling CreateResource should terminate the workflow without any API call", async () => {
      expect.assertions(2);
      const props = defaultProps({ folderParentId: null });

      let page;
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN) {
          throw new Error("CreateResource not yet opened");
        }
      });

      jest.spyOn(props.context.port, "request");
      const createProps = dialogPropsFor(props.dialogContext, CreateResource);
      createProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.create",
        expect.anything(),
        expect.anything(),
      );
    });

    it("As LU cancelling ShareDialog should terminate the workflow without creating the resource", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const operatorId = props.context.loggedInUser.id;
      wireSnapshotListeners(props.context.port, {
        permissions: [
          operatorOwnerPermissionDto(operatorId, props.folderParentId),
          {
            id: uuidv4(),
            aco: "Folder",
            aco_foreign_key: props.folderParentId,
            aro: "User",
            aro_foreign_key: uuidv4(),
            type: 1,
          },
        ],
      });

      let page;
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN) {
          throw new Error("CreateResource not yet opened");
        }
      });

      const createProps = dialogPropsFor(props.dialogContext, CreateResource);
      const fakeResourceFormEntity = { toResourceDto: () => ({}), toSecretDto: () => ({}) };
      await act(() => createProps.onSubmit(fakeResourceFormEntity));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.SHARE_DIALOG_OPEN) {
          throw new Error("ShareDialog not yet opened");
        }
      });

      jest.spyOn(props.context.port, "request");
      const shareProps = dialogPropsFor(props.dialogContext, ShareDialog);
      shareProps.onClose();

      expect(props.onStop).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.create",
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
      await act(() => (page = new ResourceCreationFlowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== RESOURCE_CREATION_FLOW_STATUS.ERROR) {
          throw new Error("Workflow not yet in error state");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expect.any(Error) });
      expect(props.onStop).toHaveBeenCalled();
    });
  });
});
