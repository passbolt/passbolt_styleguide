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
import { defaultProps } from "./FolderShareFlow.test.data";
import FolderShareFlowTestPage from "./FolderShareFlow.test.page";
import { FOLDER_SHARE_FLOW_STATUS } from "./FolderShareFlow";
import ShareDialog from "../../../Share/ShareDialog";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { KEYRING_SYNC_EVENT } from "../../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import {
  PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
  SHARE_FOLDERS_SAVE,
} from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { USERS_GET_BY_IDS } from "../../../../../shared/services/serviceWorker/user/userServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * A permission DTO for a given ACO.
 */
function permissionDto(aco, acoForeignKey, aroForeignKey, type = PermissionEntity.PERMISSION_OWNER) {
  return {
    id: uuidv4(),
    aco,
    aco_foreign_key: acoForeignKey,
    aro: "User",
    aro_foreign_key: aroForeignKey,
    type,
  };
}

/**
 * Wire the folder-snapshot port events. `folderPermissions` answers the folder permission fetch;
 * groups/users resolve to empty by default.
 */
function wireSnapshotListeners(port, { folderPermissions = [] } = {}) {
  port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
  port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => folderPermissions);
  port.addRequestListener(GROUPS_GET_BY_IDS, () => []);
  port.addRequestListener(USERS_GET_BY_IDS, () => []);
}

/**
 * The props of every ShareDialog the workflow dispatched (the folder share opens a single one).
 */
function shareDialogProps(dialogContext) {
  return dialogContext.open.mock.calls.filter(([Dialog]) => Dialog === ShareDialog).map(([, props]) => props);
}

/**
 * Mount the flow and wait until the ShareDialog is open.
 */
async function mountUntilShareOpen(props) {
  let page;
  await act(() => (page = new FolderShareFlowTestPage(props)));
  await waitFor(() => {
    if (page._instance.state.status !== FOLDER_SHARE_FLOW_STATUS.SHARE_DIALOG_OPEN) {
      throw new Error("ShareDialog not yet opened");
    }
  });
  return page;
}

describe("FolderShareFlow", () => {
  it("As LU I should review and edit the folder's own permissions seeded from the snapshot (controlled, ACO_FOLDER, editable)", async () => {
    expect.assertions(5);
    const props = defaultProps();
    const operatorId = props.context.loggedInUser.id;
    const folderId = props.folder.id;
    wireSnapshotListeners(props.context.port, {
      folderPermissions: [permissionDto("Folder", folderId, operatorId)],
    });

    jest.spyOn(props.context.port, "request");
    await mountUntilShareOpen(props);

    // The snapshot is built from the folder itself (ACO_FOLDER).
    expect(props.context.port.request).toHaveBeenCalledWith(
      PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
      folderId,
      PermissionEntity.ACO_FOLDER,
    );

    const [shareProps] = shareDialogProps(props.dialogContext);
    expect(shareProps.acoType).toStrictEqual(PermissionEntity.ACO_FOLDER);
    // The single dialog sets and validates at once: editable, not read-only.
    expect(shareProps.readOnly).toBeUndefined();
    expect(shareProps.initialFolders).toHaveLength(1);
    expect(shareProps.initialFolders[0].id).toStrictEqual(folderId);
  });

  it("As LU confirming the folder permissions should save them (extension propagates to content) without a second dialog", async () => {
    expect.assertions(4);
    const props = defaultProps();
    const operatorId = props.context.loggedInUser.id;
    const folderId = props.folder.id;
    wireSnapshotListeners(props.context.port, {
      folderPermissions: [permissionDto("Folder", folderId, operatorId)],
    });
    props.context.port.addRequestListener(SHARE_FOLDERS_SAVE, () => undefined);

    await mountUntilShareOpen(props);

    jest.spyOn(props.context.port, "request");
    const folderChanges = [
      { aro: "User", aro_foreign_key: uuidv4(), aco: "Folder", aco_foreign_key: folderId, type: 1, is_new: true },
    ];
    const [shareProps] = shareDialogProps(props.dialogContext);
    await act(() => shareProps.onConfirm(folderChanges));

    // A single dialog was opened, and the confirmed folder changes were saved as-is.
    expect(shareDialogProps(props.dialogContext)).toHaveLength(1);
    expect(props.context.port.request).toHaveBeenCalledWith(SHARE_FOLDERS_SAVE, folderId, folderChanges);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    expect(props.onStop).toHaveBeenCalled();
  });

  it("As LU confirming the folder without changes should finalize without saving", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const operatorId = props.context.loggedInUser.id;
    const folderId = props.folder.id;
    wireSnapshotListeners(props.context.port, {
      folderPermissions: [permissionDto("Folder", folderId, operatorId)],
    });

    await mountUntilShareOpen(props);

    jest.spyOn(props.context.port, "request");
    const [shareProps] = shareDialogProps(props.dialogContext);
    await act(() => shareProps.onConfirm([]));

    expect(props.context.port.request).not.toHaveBeenCalledWith(
      SHARE_FOLDERS_SAVE,
      expect.anything(),
      expect.anything(),
    );
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    expect(props.onStop).toHaveBeenCalled();
  });

  it("As LU I should see the workflow refuse the share when the folder permissions changed during my review", async () => {
    expect.assertions(2);
    const props = defaultProps();
    const operatorId = props.context.loggedInUser.id;
    const folderId = props.folder.id;
    const initialFolderPermissions = [permissionDto("Folder", folderId, operatorId)];
    const driftedFolderPermissions = [
      ...initialFolderPermissions,
      permissionDto("Folder", folderId, uuidv4(), PermissionEntity.PERMISSION_READ),
    ];
    let folderFindCount = 0;
    props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
    props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => {
      folderFindCount += 1;
      return folderFindCount === 1 ? initialFolderPermissions : driftedFolderPermissions;
    });
    props.context.port.addRequestListener(GROUPS_GET_BY_IDS, () => []);
    props.context.port.addRequestListener(USERS_GET_BY_IDS, () => []);

    await mountUntilShareOpen(props);

    jest.spyOn(props.context.port, "request");
    const folderChanges = [
      { aro: "User", aro_foreign_key: uuidv4(), aco: "Folder", aco_foreign_key: folderId, type: 1, is_new: true },
    ];
    const [shareProps] = shareDialogProps(props.dialogContext);
    await act(() => shareProps.onConfirm(folderChanges));

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
      error: expect.objectContaining({
        message:
          "The folder permissions changed during your review. Please retry the operation and verify the permissions again.",
      }),
    });
    expect(props.context.port.request).not.toHaveBeenCalledWith(
      SHARE_FOLDERS_SAVE,
      expect.anything(),
      expect.anything(),
    );
  });

  it("As LU cancelling the dialog should terminate the workflow without saving", async () => {
    expect.assertions(2);
    const props = defaultProps();
    const operatorId = props.context.loggedInUser.id;
    const folderId = props.folder.id;
    wireSnapshotListeners(props.context.port, {
      folderPermissions: [permissionDto("Folder", folderId, operatorId)],
    });

    await mountUntilShareOpen(props);

    jest.spyOn(props.context.port, "request");
    const [shareProps] = shareDialogProps(props.dialogContext);
    shareProps.onClose();

    expect(props.onStop).toHaveBeenCalledTimes(1);
    expect(props.context.port.request).not.toHaveBeenCalledWith(
      SHARE_FOLDERS_SAVE,
      expect.anything(),
      expect.anything(),
    );
  });

  it("As LU I should see an error dialog and the workflow should terminate when the folder snapshot build fails", async () => {
    expect.assertions(2);
    const props = defaultProps();
    props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {
      throw new Error("Keyring sync failed");
    });

    let page;
    await act(() => (page = new FolderShareFlowTestPage(props)));
    await waitFor(() => {
      if (page._instance.state.status !== FOLDER_SHARE_FLOW_STATUS.ERROR) {
        throw new Error("Workflow not yet in error state");
      }
    });

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expect.any(Error) });
    expect(props.onStop).toHaveBeenCalled();
  });
});
