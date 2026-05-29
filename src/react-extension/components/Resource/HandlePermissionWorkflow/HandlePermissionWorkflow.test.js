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
import { defaultProps } from "./HandlePermissionWorkflow.test.data";
import HandlePermissionWorkflowTestPage from "./HandlePermissionWorkflow.test.page";
import { HANDLE_PERMISSION_WORKFLOW_STATUS } from "./HandlePermissionWorkflow";
import PermissionSnapshotEntity from "../../../../shared/models/entity/permission/permissionSnapshotEntity";
import { KEYRING_SYNC_EVENT } from "../../../../shared/services/serviceWorker/keyring/keyringServiceWorkerService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_GET_BY_IDS } from "../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { USERS_GET_BY_IDS } from "../../../../shared/services/serviceWorker/user/userServiceWorkerService";
import { defaultPermissionDto } from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("HandlePermissionWorkflow", () => {
  describe("As LU I should build the initial permission snapshot when starting the workflow for resource creation", () => {
    it("As LU I should see the workflow transition to READY with the snapshot built from the parent folder permissions", async () => {
      expect.assertions(4);

      const props = defaultProps();
      const permissionsDto = [defaultPermissionDto({ aco: "Folder", aco_foreign_key: props.folderParentId })];
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      props.context.port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissionsDto);
      props.context.port.addRequestListener(GROUPS_GET_BY_IDS, () => []);
      props.context.port.addRequestListener(USERS_GET_BY_IDS, () => []);

      let page;
      await act(() => (page = new HandlePermissionWorkflowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status === HANDLE_PERMISSION_WORKFLOW_STATUS.INITIALIZING) {
          throw new Error("workflow still initializing");
        }
      });

      expect(page._instance.state.status).toEqual(HANDLE_PERMISSION_WORKFLOW_STATUS.READY);
      expect(page._instance.state.snapshot).toBeInstanceOf(PermissionSnapshotEntity);
      expect(page._instance.state.snapshot.permissions.toDto()).toEqual(permissionsDto);
      expect(props.dialogContext.open).not.toHaveBeenCalled();
    });

    it("As LU I should see an error dialog when the snapshot cannot be built", async () => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {
        throw new Error("Keyring sync failed");
      });

      let page;
      await act(() => (page = new HandlePermissionWorkflowTestPage(props)));
      await waitFor(() => {
        if (page._instance.state.status !== HANDLE_PERMISSION_WORKFLOW_STATUS.ERROR) {
          throw new Error("workflow not yet in error state");
        }
      });

      expect(page._instance.state.status).toEqual(HANDLE_PERMISSION_WORKFLOW_STATUS.ERROR);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expect.any(Error) });
    });

    it("As LU I should not see an error dialog when I abort the operation mid-flow", async () => {
      expect.assertions(2);

      const props = defaultProps();
      jest.spyOn(props.context.port, "request");
      const abortError = new Error("user aborted");
      abortError.name = "UserAbortsOperationError";
      props.context.port.addRequestListener(KEYRING_SYNC_EVENT, () => {
        throw abortError;
      });

      await act(() => new HandlePermissionWorkflowTestPage(props));
      await waitFor(() => {
        if (!props.context.port.request.mock.calls.length) {
          throw new Error("port.request not called yet");
        }
      });
      // Yield one extra microtask so the handler's catch branch settles before asserting.
      await waitFor(() => {});

      expect(props.context.port.request).toHaveBeenCalledWith(KEYRING_SYNC_EVENT);
      expect(props.dialogContext.open).not.toHaveBeenCalled();
    });
  });
});
