/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on ShareDialog in regard of specifications
 */
import ShareDialogPage from "./ShareDialog.test.page";
import {
  absentFromUnownedMoveProps,
  addedGroupWithMembersFixture,
  controlledModeEmbeddedUsersProps,
  controlledModeProps,
  controlledModeWithGroupProps,
  controlledModeWithTwoGroupsProps,
  defaultAppContext,
  defaultProps,
  folderMoveProps,
  folderShareProps,
  initialGroupForShareFixture,
  operatorResourceShareProps,
  resourcesShareProps,
  twoResourcesShareProps,
  uniformRecipientMixedOwnershipProps,
  variesAppliedMoveProps,
  variesAppliedNewRecipientMoveProps,
  variesRemovalMoveProps,
} from "./ShareDialog.test.data";
import PassboltApiFetchError from "../../../shared/lib/Error/PassboltApiFetchError";
import { waitFor } from "@testing-library/react";
import NotifyError from "../Common/Error/NotifyError/NotifyError";
import { waitForTrue } from "../../../../test/utils/waitFor";
import { act } from "react";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { v4 as uuidv4 } from "uuid";
import PermissionsCollection from "../../../shared/models/entity/permission/permissionsCollection";
import { defaultPermissionDto } from "../../../shared/models/entity/permission/permissionEntity.test.data";
import GroupsCollection from "../../../shared/models/entity/group/groupsCollection";
import UsersCollection from "../../../shared/models/entity/user/usersCollection";
import { defaultGroupDto } from "../../../shared/models/entity/group/groupEntity.test.data";

beforeAll(() => {
  global.scrollTo = jest.fn();
});

beforeEach(() => {
  jest.resetModules();
});

describe("As Lu I should see the share dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  let props = null; // The component props

  const mockContextRequest = (implementation) => jest.spyOn(context.port, "request").mockImplementation(implementation);

  /**
   * Wire the port so the autocomplete search returns the given user (matched by keyword) and the
   * fingerprint hover request resolves.
   * @param {object} user The user DTO the search should return
   */
  function mockSearchReturns(user) {
    const requestBextMockImpl = (request, option) => {
      switch (request) {
        case "passbolt.keyring.get-public-key-info-by-user":
          return { fingerprint: "079D6F4FDA3BFDC2D8E562D8AA44B1DA4BFB36B6" };
        case "passbolt.share.search-aros":
          return [user].filter((candidate) => candidate.username.indexOf(option) !== -1);
      }
    };
    mockContextRequest(requestBextMockImpl);
  }

  describe("Sharing multiple resources", () => {
    beforeEach(async () => {
      mockContextRequest(jest.fn());
      props = resourcesShareProps(["apache", "cakephp", "nginx"]);
      await act(() => (page = new ShareDialogPage(context, props)));
    });

    it("As LU I see the dialog title and the recipients aggregated across the resources", () => {
      expect.assertions(2);
      expect(page.title).toBe("Share 3 resources");
      // Operator (owner) + reader, aggregated across the three resources.
      expect(page.count).toBe(2);
    });

    it("As LU adding a recipient I see onConfirm called with the new permission deltas and the dialog closed", async () => {
      expect.assertions(4);
      const newUser = defaultUserDto({
        username: "admin@passbolt.com",
        profile: defaultProfileDto({ first_name: "Admin", last_name: "User" }),
      });
      mockSearchReturns(newUser);
      await page.searchName("admin");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      expect(page.count).toBe(3);

      mockContextRequest(jest.fn());
      await page.savePermissions();

      expect(props.onConfirm).toHaveBeenCalledTimes(1);
      const changes = props.onConfirm.mock.calls[0][0];
      // One new read permission per shared resource.
      expect(changes).toEqual([
        expect.objectContaining({ is_new: true, aco: "Resource", aro: "User", aro_foreign_key: newUser.id, type: 1 }),
        expect.objectContaining({ is_new: true, aco: "Resource", aro: "User", aro_foreign_key: newUser.id, type: 1 }),
        expect.objectContaining({ is_new: true, aco: "Resource", aro: "User", aro_foreign_key: newUser.id, type: 1 }),
      ]);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU removing a recipient I see its row pending deletion and the delete deltas emitted on save", async () => {
      expect.assertions(6);
      await page.selectRemovePermission(2);

      expect(page.count).toBe(2);
      expect(page.changeChip(2).textContent).toBe("removed");
      expect(page.selectRights(2).className).toContain("disabled");
      expect(page.revertAro(2)).not.toBeNull();

      mockContextRequest(jest.fn());
      await page.savePermissions();
      const changes = props.onConfirm.mock.calls[0][0];
      // One delete delta per shared resource.
      expect(changes).toHaveLength(3);
      expect(changes.every((change) => change.delete === true)).toBe(true);
    });

    it("As LU reverting a removed recipient I see its row restored and no delta emitted", async () => {
      expect.assertions(5);
      await page.selectRemovePermission(2);
      expect(page.changeChip(2).textContent).toBe("removed");

      await page.selectRevertPermission(2);
      expect(page.changeChip(2)).toBeNull();
      expect(page.revertAro(2)).toBeNull();
      expect(page.removeAro(2)).not.toBeNull();

      mockContextRequest(jest.fn());
      await page.savePermissions();
      expect(props.onConfirm.mock.calls[0][0]).toEqual([]);
    });

    it("As LU removing a modified recipient I see its row frozen back on its original permission", async () => {
      expect.assertions(2);
      await page.selectRightsOption(2, "is owner");
      expect(page.selectRights(2).textContent).toBe("is owner");

      await page.selectRemovePermission(2);
      expect(page.selectRights(2).textContent).toBe("can read");
    });

    it("As LU removing a recipient added during the session I see its row disappear entirely", async () => {
      expect.assertions(2);
      const newUser = defaultUserDto({
        username: "admin@passbolt.com",
        profile: defaultProfileDto({ first_name: "Admin", last_name: "User" }),
      });
      mockSearchReturns(newUser);
      await page.searchName("admin");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      expect(page.count).toBe(3);

      await page.selectRemovePermission(3);
      expect(page.count).toBe(2);
    });

    it("As LU I cannot re-add a removed recipient through the autocomplete, revert is the only path", async () => {
      expect.assertions(3);
      await page.selectRemovePermission(2);
      // The removed recipient stays in the list, the autocomplete filters it out of the suggestions.
      const removedUser = defaultUserDto({ id: page.rowId(2), username: "betty@passbolt.com" });
      mockSearchReturns(removedUser);
      await page.searchName("betty");

      expect(page.userOrGroupAutocomplete(1)).toBeUndefined();
      expect(page.count).toBe(2);
      expect(page.changeChip(2).textContent).toBe("removed");
    });

    it("As LU removing the sole owner I see the no-owner error and submit disabled until reverted", async () => {
      expect.assertions(4);
      await page.selectRemovePermission(1);
      expect(page.errorMessage).toBe("Please make sure there is at least one owner.");
      expect(page.saveButton.getAttribute("disabled")).not.toBeNull();

      await page.selectRevertPermission(1);
      expect(page.hasErrorMessage).toBe(false);
      expect(page.saveButton.hasAttribute("disabled")).toBe(false);
    });

    it("As LU I see a modified chip on a changed permission, cleared when set back to its original value", async () => {
      expect.assertions(3);
      expect(page.changeChip(1)).toBeNull();

      // Demote the owner (row 1) to read.
      await page.selectRightsOption(1, "can read");
      expect(page.changeChip(1).textContent).toBe("modified");

      // Promote back to owner, the original value.
      await page.selectRightsOption(1, "is owner");
      expect(page.changeChip(1)).toBeNull();
    });

    it("As LU I see an added chip on a recipient granted a permission during the session", async () => {
      expect.assertions(1);
      const newUser = defaultUserDto({
        username: "admin@passbolt.com",
        profile: defaultProfileDto({ first_name: "Admin", last_name: "User" }),
      });
      mockSearchReturns(newUser);
      await page.searchName("admin");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      expect(page.changeChip(3).textContent).toBe("added");
    });

    it("As LU I should see a processing feedback while submitting the form", async () => {
      let resolveConfirm;
      props.onConfirm.mockImplementation(() => new Promise((resolve) => (resolveConfirm = resolve)));
      await page.savePermissionsWithoutWait();
      // onConfirm is pending, the dialog is in its processing state: every input is disabled.
      await waitFor(() => {
        expect(page.shareNameInput.getAttribute("disabled")).not.toBeNull();
        expect(page.selectRights(1).className).toBe("selected-value disabled");
        expect(page.removeAro(1).className).toBe("remove-item button inline button-transparent disabled");
        expect(page.cancelButton.className).toBe("link cancel");
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.saveButton.className).toBe("button primary form disabled processing");
        resolveConfirm();
      });
    });

    it("As LU I shouldn’t be able to submit the form if there is no owner", async () => {
      expect.assertions(2);
      // Demote the sole owner (row 1, Ada) to read: no resource keeps an owner anymore.
      await page.selectFirstItemRights(1);
      expect(page.errorMessage).toBe("Please make sure there is at least one owner.");
      expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
    });

    it("As LU I can stop sharing resources by clicking on the cancel button", async () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can stop sharing resources by closing the dialog", async () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can stop sharing resources with the keyboard (escape)", async () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I should see an error dialog if the confirm operation fails for an unexpected reason", async () => {
      expect.assertions(1);
      const error = new PassboltApiFetchError("Jest simulate API error.");
      props.onConfirm.mockImplementation(() => {
        throw error;
      });

      await page.savePermissions();

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: error });
    });
  });

  describe("Sharing a single resource", () => {
    it("As LU I see the single-resource title and subtitle and confirm the permission deltas", async () => {
      expect.assertions(4);
      props = resourcesShareProps(["apache"]);
      mockContextRequest(jest.fn());
      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.title).toBe("Share resource");
      expect(page.subtitle).toBe("apache");

      const newUser = defaultUserDto({ username: "admin@passbolt.com" });
      mockSearchReturns(newUser);
      await page.searchName("admin");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      mockContextRequest(jest.fn());
      await page.savePermissions();

      const changes = props.onConfirm.mock.calls[0][0];
      expect(changes).toHaveLength(1);
      expect(changes[0]).toMatchObject({ is_new: true, aco: "Resource", aro_foreign_key: newUser.id, type: 1 });
    });
  });

  describe("Sharing a single folder", () => {
    it("As LU I see the folder title and subtitle and confirm the folder deltas", async () => {
      expect.assertions(4);
      props = folderShareProps("apache");
      mockContextRequest(jest.fn());
      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.title).toBe("Share folder");
      expect(page.subtitle).toBe("apache");

      const newUser = defaultUserDto({ username: "adele@passbolt.com" });
      mockSearchReturns(newUser);
      await page.searchName("adele");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      mockContextRequest(jest.fn());
      await page.savePermissions();

      const changes = props.onConfirm.mock.calls[0][0];
      expect(changes).toHaveLength(1);
      expect(changes[0]).toMatchObject({ is_new: true, aco: "Folder", aro_foreign_key: newUser.id, type: 1 });
    });
  });
});

describe("As LU running ShareDialog in controlled mode (workflow-driven)", () => {
  let page;
  const context = defaultAppContext();
  const mockContextRequest = (implementation) => jest.spyOn(context.port, "request").mockImplementation(implementation);

  it("As LU I should not see the dialog fetch resource permissions when controlled-mode props are provided", async () => {
    expect.assertions(2);
    const props = controlledModeProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));

    expect(context.port.request).not.toHaveBeenCalledWith(
      "passbolt.resources.find-all-by-ids-for-display-permissions",
      expect.anything(),
    );
    expect(page.count).toBe(2);
  });

  it("As LU I should see the snapshot's permissions rendered in the order they were captured", async () => {
    expect.assertions(2);
    const props = controlledModeProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));

    // Both rendered rows match the synthetic AROs we provided via initialUsers.
    expect(page.aroDetails(1)).toEqual(expect.stringContaining("@passbolt.com"));
    expect(page.aroDetails(2)).toEqual(expect.stringContaining("@passbolt.com"));
  });

  it("As LU I should see directly-permissioned users rendered from the permission-embedded user when absent from initialUsers", async () => {
    expect.assertions(2);
    const props = controlledModeEmbeddedUsersProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));

    expect(page.aroDetails(1)).toEqual(expect.stringContaining("@passbolt.com"));
    expect(page.aroDetails(2)).toEqual(expect.stringContaining("@passbolt.com"));
  });

  it("As LU creating a resource I should see every initial permission flagged as added", async () => {
    expect.assertions(3);
    const props = controlledModeProps();
    // The creation flow passes the snapshot permissions as initial changes to show them all as new.
    props.initialChanges = props.initialResources[0].permissions.items;
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));

    expect(page.count).toBe(2);
    expect(page.changeChip(1).textContent).toBe("added");
    expect(page.changeChip(2).textContent).toBe("added");
  });

  it("As LU creating a resource removing my own initially-added row I see it disappear entirely", async () => {
    expect.assertions(3);
    const props = controlledModeProps();
    props.initialChanges = props.initialResources[0].permissions.items;
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));
    await page.selectRemovePermission(1);

    // The row was never a stored permission: it disappears rather than being marked as removed.
    expect(page.count).toBe(1);
    expect(page.changeChip(1).textContent).toBe("added");
    expect(page.revertAro(1)).toBeNull();
  });

  it("As LU creating a resource removing another recipient's initially-added row I see it disappear entirely", async () => {
    expect.assertions(3);
    const props = controlledModeProps();
    props.initialChanges = props.initialResources[0].permissions.items;
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));
    await page.selectRemovePermission(2);

    // Same treatment for a recipient's row: it disappears, no removed chip, no revert button.
    expect(page.count).toBe(1);
    expect(page.changeChip(1).textContent).toBe("added");
    expect(page.revertAro(1)).toBeNull();
  });

  it("As LU I should see the Save button enabled as soon as the dialog opens so I can confirm the snapshot as-is", async () => {
    expect.assertions(1);
    const props = controlledModeProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));

    expect(page.saveButton.hasAttribute("disabled")).toBe(false);
  });

  it("As LU confirming the dialog as-is I should see onConfirm called with an empty delta (backend already inherits parent perms)", async () => {
    expect.assertions(3);
    const props = controlledModeProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));
    // No edits, click Save. The backend already applies the parent folder's permissions on
    // resource creation, so confirming as-is emits an empty delta and the workflow skips the
    // share-save call entirely.
    await act(() => page.savePermissions());

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    expect(props.onConfirm.mock.calls[0][0]).toEqual([]);
    expect(context.port.request).not.toHaveBeenCalledWith(
      "passbolt.share.resources.save",
      expect.anything(),
      expect.anything(),
    );
  });

  it("As LU removing a row before confirming I should see a delete delta emitted for that row", async () => {
    expect.assertions(3);
    const props = controlledModeProps();
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));
    // Remove the reader (row 2) and confirm. The delta carries `delete: true` so the workflow
    // can revoke the inherited reader permission on the freshly-created resource.
    await page.selectRemovePermission(2);
    await act(() => page.savePermissions());

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    const changes = props.onConfirm.mock.calls[0][0];
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({ delete: true, aco: "Resource" });
  });

  it("As LU sharing a folder (acoType Folder) I should see the emitted deltas target the folder", async () => {
    expect.assertions(2);
    // Folder mode: the seeded entry is the folder itself; its edits must be emitted as Folder deltas
    // so the workflow saves them via the folder-share path.
    const props = controlledModeProps({ acoType: "Folder" });
    mockContextRequest(jest.fn());

    await act(() => (page = new ShareDialogPage(context, props)));
    await page.selectRemovePermission(2);
    await act(() => page.savePermissions());

    const changes = props.onConfirm.mock.calls[0][0];
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({ delete: true, aco: "Folder" });
  });

  it("As LU adding a recipient to a folder (acoType Folder) I should see the new permission emitted as a Folder delta", async () => {
    expect.assertions(2);
    // Regression: a newly added recipient on a folder share used to be emitted with `aco: "Resource"`
    // (ShareChanges tags new permissions from the ACO bucket type). The folder-share save then
    // received an empty delta and silently did nothing. The seeded folder must live in the folder
    // bucket so additions are emitted as Folder deltas.
    const props = controlledModeProps({ acoType: "Folder" });
    const newUserId = uuidv4();
    const newUser = defaultUserDto({ id: newUserId, username: "newcomer@passbolt.com" });
    mockContextRequest((request) => {
      switch (request) {
        case "passbolt.keyring.get-public-key-info-by-user":
          return { fingerprint: "079D6F4FDA3BFDC2D8E562D8AA44B1DA4BFB36B6" };
        case "passbolt.share.search-aros":
          return [newUser];
      }
    });

    await act(() => (page = new ShareDialogPage(context, props)));
    await page.searchName("newcomer");
    await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
    await page.selectUserOrGroup(1);
    await act(() => page.savePermissions());

    const changes = props.onConfirm.mock.calls[0][0];
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({ is_new: true, aco: "Folder", aro_foreign_key: newUserId });
  });

  describe("Seeded with initialResources (share)", () => {
    it("As LU I should see the recipients aggregated across the resources without fetching from the API", async () => {
      expect.assertions(2);
      const props = twoResourcesShareProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(context.port.request).not.toHaveBeenCalledWith(
        "passbolt.resources.find-all-by-ids-for-display-permissions",
        expect.anything(),
      );
      // Operator + reader, aggregated across the two resources.
      expect(page.count).toBe(2);
    });

    it("As LU sharing several resources I should see their names listed sorted in the title tooltip", async () => {
      expect.assertions(2);
      const props = twoResourcesShareProps({ resourceNames: ["RB", "RA"] });
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // Regression: controlled-mode ACOs expose only `metadata.name`, so the tooltip must not
      // resolve to blank lines.
      expect(page.titleTooltipHeader).toBe("2 items selected:");
      expect(page.titleTooltipItems).toEqual(["• RA", "• RB"]);
    });
  });

  describe("Sharing resources where a recipient's permission varies", () => {
    beforeEach(async () => {
      mockContextRequest(jest.fn());
      const props = twoResourcesShareProps({ readerPermissionTypes: [1, 7] });
      await act(() => (page = new ShareDialogPage(context, props)));
    });

    it("As LU resolving a varying permission I can no longer restore the mixed state, varies is not offered anymore", async () => {
      expect.assertions(4);
      expect(page.selectRights(2).textContent).toBe("varies");

      await page.selectRightsOption(2, "is owner");

      expect(page.selectRights(2).textContent).toBe("is owner");
      expect(page.changeChip(2).textContent).toBe("modified");
      expect(page.selectRightsItemByLabel(2, "varies")).toBeUndefined();
    });

    it("As LU removing a varying recipient I see its row frozen on varies and restorable to the mixed state", async () => {
      expect.assertions(4);
      await page.selectRemovePermission(2);
      expect(page.selectRights(2).textContent).toBe("varies");
      expect(page.changeChip(2).textContent).toBe("removed");

      await page.selectRevertPermission(2);
      expect(page.selectRights(2).textContent).toBe("varies");
      expect(page.changeChip(2)).toBeNull();
    });

    it("As LU resolving a varying permission I no longer see its varies breakdown icon", async () => {
      expect.assertions(3);
      // The uniform operator row never carries the icon, only the varying reader row does.
      expect(page.variesIcon(1)).toBeNull();
      expect(page.variesIcon(2)).not.toBeNull();

      await page.selectRightsOption(2, "is owner");

      expect(page.variesIcon(2)).toBeNull();
    });

    it("As LU removing a varying recipient I no longer see its varies breakdown icon, until I revert", async () => {
      expect.assertions(2);
      await page.selectRemovePermission(2);
      expect(page.variesIcon(2)).toBeNull();

      await page.selectRevertPermission(2);
      expect(page.variesIcon(2)).not.toBeNull();
    });
  });

  describe("Move mode (controlled)", () => {
    /**
     * Build move props where a recipient ends up read on RA and owner on RB, while the destination
     * proposes "can update" for them. The operator owns both resources.
     */
    function buildMoveModeProps({ unchangedAcos } = {}) {
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const readerId = uuidv4();
      const readerUser = defaultUserDto({ id: readerId, username: "reader@passbolt.com" });
      const buildResource = (name, readerType) => {
        const resourceId = uuidv4();
        return {
          id: resourceId,
          metadata: { name },
          permission: { type: 15 },
          permissions: new PermissionsCollection(
            [
              defaultPermissionDto({
                aco: "Resource",
                aco_foreign_key: resourceId,
                aro: "User",
                aro_foreign_key: operatorId,
                type: 15,
              }),
              defaultPermissionDto({
                aco: "Resource",
                aco_foreign_key: resourceId,
                aro: "User",
                aro_foreign_key: readerId,
                type: readerType,
              }),
            ],
            { assertAtLeastOneOwner: false },
          ),
        };
      };
      const props = {
        ...defaultProps(),
        initialResources: [buildResource("RA", 1), buildResource("RB", 15)],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, readerUser]),
        onConfirm: jest.fn(),
      };
      if (unchangedAcos) {
        props.unchangedAcos = unchangedAcos;
      }
      return props;
    }

    it("As LU moving a folder I should see the folder name as subtitle and the destination's recipient added", async () => {
      expect.assertions(4);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      // A folder move seeds `initialFolders` with an acoType of "Folder". ShareDialog has to read that
      // collection, otherwise the permission list comes out empty and the subtitle throws.
      const props = folderMoveProps(operatorId);
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.subtitle).toBe("B");
      expect(page.count).toBe(2);
      expect(page.changeChip(1)).toBeNull(); // Ada: owner before and after, no badge
      expect(page.changeChip(2).textContent).toBe("added"); // Betty: comes from the destination
    });

    it("As LU moving, a recipient whose applied permission varies shows 'varies' and the attention 'i', not the destination's lower value", async () => {
      expect.assertions(3);
      const props = buildMoveModeProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // reader does not end up at the same level everywhere, so the row reads "varies", never the
      // destination's lower "can update", which would hide the ownership RB keeps.
      expect(page.permissionValueForAro("reader@passbolt.com")).toBe("varies");
      expect(page.variesCount).toBeGreaterThanOrEqual(1);
      // Every item here is owned, so the plain marker shows the per-item list.
      // The red triangle is reserved for the items the operator does not own.
      expect(page.variesIconCount).toBeGreaterThanOrEqual(1);
    });

    it("As LU moving, a recipient the destination doesn't cover and whose permission differs shows 'varies'", async () => {
      expect.assertions(2);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const carolId = uuidv4();
      const carolUser = defaultUserDto({ id: carolId, username: "carol@passbolt.com" });
      const buildResource = (name, withCarol) => {
        const resourceId = uuidv4();
        const permissions = [
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: resourceId,
            aro: "User",
            aro_foreign_key: operatorId,
            type: 15,
          }),
        ];
        if (withCarol) {
          permissions.push(
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: resourceId,
              aro: "User",
              aro_foreign_key: carolId,
              type: 15,
            }),
          );
        }
        return {
          id: resourceId,
          metadata: { name },
          permission: { type: 15 },
          permissions: new PermissionsCollection(permissions, { assertAtLeastOneOwner: false }),
        };
      };
      const props = {
        ...defaultProps(),
        initialResources: [buildResource("R1", false), buildResource("R3", true)],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, carolUser]),
        onConfirm: jest.fn(),
      };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // Carol is not in the destination and is owner on R3 only, absent from R1, so her level varies.
      expect(page.permissionValueForAro("carol@passbolt.com")).toBe("varies");
      // Every item here is owned, so the plain marker shows the per-item list.
      expect(page.variesIconCount).toBeGreaterThanOrEqual(1);
    });

    it("As LU moving, a recipient with a differing permission on an item I don't own shows 'varies' and the attention 'i'", async () => {
      expect.assertions(2);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const adaId = uuidv4();
      const adaUser = defaultUserDto({ id: adaId, username: "ada@passbolt.com" });
      const ownedId = uuidv4();
      const notOwnedId = uuidv4();
      // The operator owns R1. They can only update R2, so R2's permissions cannot change.
      const buildResource = (resourceId, name, operatorType, adaType) => ({
        id: resourceId,
        metadata: { name },
        permission: { type: operatorType },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: resourceId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: operatorType,
            }),
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: resourceId,
              aro: "User",
              aro_foreign_key: adaId,
              type: adaType,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      });
      const props = {
        ...defaultProps(),
        initialResources: [buildResource(ownedId, "R1", 15, 15), buildResource(notOwnedId, "R2", 7, 7)],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, adaUser]),
        onConfirm: jest.fn(),
        unchangedAcos: [{ id: notOwnedId, name: "R2" }],
      };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // ada is owner on the owned R1 but only "can update" on the not-owned R2, so the row reads
      // "varies", not the destination's "is owner", and shows the attention marker.
      expect(page.permissionValueForAro("ada@passbolt.com")).toBe("varies");
      expect(page.attentionIconForAro("ada@passbolt.com")).not.toBeNull();
    });

    it("As LU moving, a recipient already holding the destination permission on an item I don't own shows no 'i'", async () => {
      expect.assertions(3);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const adaId = uuidv4();
      const adaUser = defaultUserDto({ id: adaId, username: "ada@passbolt.com" });
      const ownedId = uuidv4();
      const notOwnedId = uuidv4();
      // ada is already owner on both items, exactly what the destination proposes. Applying it changes
      // nothing, not even on the item whose permissions cannot change, so no attention marker.
      const buildResource = (resourceId, name) => ({
        id: resourceId,
        metadata: { name },
        permission: { type: 15 },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: resourceId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: 15,
            }),
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: resourceId,
              aro: "User",
              aro_foreign_key: adaId,
              type: 15,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      });
      const props = {
        ...defaultProps(),
        initialResources: [buildResource(ownedId, "R1"), buildResource(notOwnedId, "R2")],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, adaUser]),
        onConfirm: jest.fn(),
        unchangedAcos: [{ id: notOwnedId, name: "R2" }],
      };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.permissionValueForAro("ada@passbolt.com")).toBe("is owner");
      expect(page.attentionIconForAro("ada@passbolt.com")).toBeNull();
      // Nothing is blocked for anybody, so the footer banner does not show either.
      expect(page.unchangedWarning).toBeNull();
    });

    it("As LU moving, selecting a permission for a 'varies' recipient shows the 'i' only for items it can't be applied to", async () => {
      expect.assertions(4);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const carolId = uuidv4();
      const carolUser = defaultUserDto({ id: carolId, username: "carol@passbolt.com" });
      const ownedId = uuidv4();
      const notOwnedId = uuidv4();
      // carol is owner on R3 only and absent from R1, so "varies". R3's permissions cannot change.
      const r1 = {
        id: ownedId,
        metadata: { name: "R1" },
        permission: { type: 15 },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: ownedId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: 15,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      };
      const r3 = {
        id: notOwnedId,
        metadata: { name: "R3" },
        permission: { type: 15 },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: notOwnedId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: 15,
            }),
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: notOwnedId,
              aro: "User",
              aro_foreign_key: carolId,
              type: 15,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      };
      const props = {
        ...defaultProps(),
        initialResources: [r1, r3],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, carolUser]),
        onConfirm: jest.fn(),
        unchangedAcos: [{ id: notOwnedId, name: "R3" }],
      };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // carol's level varies, and R3 cannot change, so the marker shows.
      expect(page.permissionValueForAro("carol@passbolt.com")).toBe("varies");
      expect(page.attentionIconForAro("carol@passbolt.com")).not.toBeNull();

      // "is owner" is what carol already has on R3, so nothing would change there and no marker shows.
      await page.changePermissionForAro("carol@passbolt.com", "is owner");
      expect(page.attentionIconForAro("carol@passbolt.com")).toBeNull();

      // "can read" differs from carol's ownership of R3, which cannot change, so the marker comes back.
      await page.changePermissionForAro("carol@passbolt.com", "can read");
      expect(page.attentionIconForAro("carol@passbolt.com")).not.toBeNull();
    });

    it("As LU moving, selecting a permission for a recipient absent from an item I don't own surfaces the 'i'", async () => {
      expect.assertions(3);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const operatorUser = defaultUserDto({ id: operatorId, username: "operator@passbolt.com" });
      const bettyId = uuidv4();
      const bettyUser = defaultUserDto({ id: bettyId, username: "betty@passbolt.com" });
      const ownedId = uuidv4();
      const notOwnedId = uuidv4();
      // betty can update the owned R1 and is absent from the not-owned R2, so "varies". R2 cannot be
      // granted to her.
      const r1 = {
        id: ownedId,
        metadata: { name: "R1" },
        permission: { type: 15 },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: ownedId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: 15,
            }),
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: ownedId,
              aro: "User",
              aro_foreign_key: bettyId,
              type: 7,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      };
      const r2 = {
        id: notOwnedId,
        metadata: { name: "R2" },
        permission: { type: 15 },
        permissions: new PermissionsCollection(
          [
            defaultPermissionDto({
              aco: "Resource",
              aco_foreign_key: notOwnedId,
              aro: "User",
              aro_foreign_key: operatorId,
              type: 15,
            }),
          ],
          { assertAtLeastOneOwner: false },
        ),
      };
      const props = {
        ...defaultProps(),
        initialResources: [r1, r2],
        initialGroups: new GroupsCollection([]),
        initialUsers: new UsersCollection([operatorUser, bettyUser]),
        onConfirm: jest.fn(),
        unchangedAcos: [{ id: notOwnedId, name: "R2" }],
      };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // betty can update R1 and is absent from R2, so she does not end up at the same level everywhere.
      // Nothing definite was picked yet, so R2's absence blocks nothing and the plain marker shows.
      expect(page.permissionValueForAro("betty@passbolt.com")).toBe("varies");
      expect(page.variesIconForAro("betty@passbolt.com")).not.toBeNull();

      // "can update" is meant for every item, but R2 cannot receive it: she is absent and it is not
      // owned. The marker shows.
      await page.changePermissionForAro("betty@passbolt.com", "can update");
      expect(page.attentionIconForAro("betty@passbolt.com")).not.toBeNull();
    });

    it("As LU I should see the 'varies' value when a recipient's permission differs across the selection", async () => {
      expect.assertions(1);
      const props = buildMoveModeProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.variesCount).toBeGreaterThanOrEqual(1);
    });

    it("As LU moving with a recipient whose permission can't be applied to an item I don't own, I should see the attention warning banner", async () => {
      expect.assertions(3);
      const props = buildMoveModeProps({ unchangedAcos: [{ id: uuidv4(), name: "Locked A" }] });
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.unchangedWarning).not.toBeNull();
      expect(page.unchangedWarning).toContain(
        "You do not have rights to update some of the permissions. Therefore some permissions will not be applied as displayed. Please verify them.",
      );
      expect(page.unchangedWarningIcon).not.toBeNull();
    });

    it("As LU with no unchanged items I should not see the unchanged warning", async () => {
      expect.assertions(1);
      const props = buildMoveModeProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.unchangedWarning).toBeNull();
    });

    it("As LU removing a recipient present on an item I don't own, I see the attention marker and the footer warning", async () => {
      expect.assertions(4);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const props = uniformRecipientMixedOwnershipProps(operatorId);
      mockContextRequest(jest.fn());
      await act(() => (page = new ShareDialogPage(context, props)));
      // She has the same read on both items, so nothing is blocked for her yet.
      expect(page.attentionIconForAro("betty@passbolt.com")).toBeNull();

      await page.selectRemovePermission(page.rowIndexForAro("betty@passbolt.com"));

      // The removal cannot reach the not-owned R2, so Betty keeps her access there and the row must
      // say so. Deleting a row restores its displayed level, so the marker cannot be read there.
      expect(page.attentionIconForAro("betty@passbolt.com")).not.toBeNull();
      expect(page.unchangedWarning).not.toBeNull();

      await page.selectRevertPermission(page.rowIndexForAro("betty@passbolt.com"));

      expect(page.attentionIconForAro("betty@passbolt.com")).toBeNull();
    });

    it("As LU removing a recipient absent from the item I don't own, I see no attention marker", async () => {
      expect.assertions(1);
      const operatorId = context.userSettings.id;
      context.loggedInUser = { id: operatorId };
      const props = uniformRecipientMixedOwnershipProps(operatorId, { recipientAbsentFromUnowned: true });
      mockContextRequest(jest.fn());
      await act(() => (page = new ShareDialogPage(context, props)));

      await page.selectRemovePermission(page.rowIndexForAro("betty@passbolt.com"));

      // Nothing is blocked for her. She has nothing on R2, so the removal reaches everywhere it can.
      expect(page.attentionIconForAro("betty@passbolt.com")).toBeNull();
    });

    describe("Pre-seeded added/modified/removed badges", () => {
      /**
       * Build move props for a single resource, covering every badge at once: Ada unchanged, Betty
       * modified, Carol removed, Dame added and Elliot at the same level in both.
       */
      function buildPreSeededBadgeProps() {
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const users = {
          ada: defaultUserDto({ id: operatorId, username: "ada@passbolt.com" }),
          betty: defaultUserDto({
            username: "betty@passbolt.com",
            profile: defaultProfileDto({ first_name: "Betty", last_name: "Hopper" }),
          }),
          carol: defaultUserDto({
            username: "carol@passbolt.com",
            profile: defaultProfileDto({ first_name: "Carol", last_name: "Hopper" }),
          }),
          dame: defaultUserDto({
            username: "dame@passbolt.com",
            profile: defaultProfileDto({ first_name: "Dame", last_name: "Hopper" }),
          }),
          elliot: defaultUserDto({
            username: "elliot@passbolt.com",
            profile: defaultProfileDto({ first_name: "Elliot", last_name: "Hopper" }),
          }),
        };
        const resourceId = uuidv4();
        const permission = (aroForeignKey, type) =>
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: resourceId,
            aro: "User",
            aro_foreign_key: aroForeignKey,
            type,
          });
        const preMovePermissions = new PermissionsCollection(
          [
            permission(operatorId, 15),
            permission(users.betty.id, 7),
            permission(users.carol.id, 7),
            permission(users.elliot.id, 1),
          ],
          { assertAtLeastOneOwner: false },
        );
        const appliedPermissions = new PermissionsCollection(
          [
            permission(operatorId, 15),
            permission(users.betty.id, 15),
            permission(users.dame.id, 1),
            permission(users.elliot.id, 1),
          ],
          { assertAtLeastOneOwner: false },
        );
        return {
          ...defaultProps(),
          initialResources: [
            { id: resourceId, metadata: { name: "R1" }, permission: { type: 15 }, permissions: preMovePermissions },
          ],
          initialGroups: new GroupsCollection([]),
          initialUsers: new UsersCollection(Object.values(users)),
          initialAppliedPermissions: new Map([[resourceId, appliedPermissions]]),
          onConfirm: jest.fn(),
        };
      }

      it("As LU opening the move dialog I should see added/modified/removed badges without editing anything", async () => {
        expect.assertions(5);
        const props = buildPreSeededBadgeProps();
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        // Rows are sorted alphabetically at mount. Somebody who only appears in the resulting set is
        // added at the end when staged, where a hand-added recipient would land too.
        expect(page.changeChip(1)).toBeNull(); // Ada: unchanged (owner in both)
        expect(page.changeChip(2).textContent).toBe("modified"); // Betty: update -> owner
        expect(page.changeChip(3).textContent).toBe("removed"); // Carol: dropped entirely
        expect(page.changeChip(4)).toBeNull(); // Elliot: unchanged (read in both)
        expect(page.changeChip(5).textContent).toBe("added"); // Dame: destination-only
      });

      it("As LU opening the move dialog I should see a badge computed correctly for a group recipient", async () => {
        expect.assertions(2);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const operatorUser = defaultUserDto({ id: operatorId, username: "ada@passbolt.com" });
        const groupId = uuidv4();
        const groupDto = defaultGroupDto({ id: groupId, name: "Developers" });
        const resourceId = uuidv4();
        const permission = (aro, aroForeignKey, type) =>
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: resourceId,
            aro,
            aro_foreign_key: aroForeignKey,
            type,
          });
        // A group's badge compares before and after just like a user's, so read to owner is
        // "modified". Whether the recipient is a user or a group makes no difference.
        const preMovePermissions = new PermissionsCollection(
          [permission("User", operatorId, 15), permission("Group", groupId, 1)],
          { assertAtLeastOneOwner: false },
        );
        const appliedPermissions = new PermissionsCollection(
          [permission("User", operatorId, 15), permission("Group", groupId, 15)],
          { assertAtLeastOneOwner: false },
        );
        const props = {
          ...defaultProps(),
          initialResources: [
            { id: resourceId, metadata: { name: "R1" }, permission: { type: 15 }, permissions: preMovePermissions },
          ],
          initialGroups: new GroupsCollection([groupDto]),
          initialUsers: new UsersCollection([operatorUser]),
          initialAppliedPermissions: new Map([[resourceId, appliedPermissions]]),
          onConfirm: jest.fn(),
        };
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        // Rows sorted alphabetically, so "Ada Lovelace" comes before "Developers".
        expect(page.changeChip(1)).toBeNull(); // Ada (user, operator): unchanged, owner in both
        expect(page.changeChip(2).textContent).toBe("modified"); // Developers (group): read -> owner
      });

      it("As LU confirming a move with a group recipient should send the group's authoritative type", async () => {
        expect.assertions(1);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const operatorUser = defaultUserDto({ id: operatorId, username: "ada@passbolt.com" });
        const groupId = uuidv4();
        const groupDto = defaultGroupDto({ id: groupId, name: "Developers" });
        const resourceId = uuidv4();
        const permission = (aro, aroForeignKey, type) =>
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: resourceId,
            aro,
            aro_foreign_key: aroForeignKey,
            type,
          });
        const preMovePermissions = new PermissionsCollection(
          [permission("User", operatorId, 15), permission("Group", groupId, 1)],
          { assertAtLeastOneOwner: false },
        );
        const appliedPermissions = new PermissionsCollection(
          [permission("User", operatorId, 15), permission("Group", groupId, 15)],
          { assertAtLeastOneOwner: false },
        );
        const props = {
          ...defaultProps(),
          initialResources: [
            { id: resourceId, metadata: { name: "R1" }, permission: { type: 15 }, permissions: preMovePermissions },
          ],
          initialGroups: new GroupsCollection([groupDto]),
          initialUsers: new UsersCollection([operatorUser]),
          initialAppliedPermissions: new Map([[resourceId, appliedPermissions]]),
          onConfirm: jest.fn(),
        };
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));
        await page.savePermissions();

        const [changes] = props.onConfirm.mock.calls[0];
        const groupChange = changes.find((change) => change.aro_foreign_key === groupId);
        expect(groupChange).toMatchObject({ aro: "Group", type: 15 });
      });

      it("As LU opening the move dialog a removed recipient's row stays visible, faded, showing their last-held permission", async () => {
        expect.assertions(2);
        const props = buildPreSeededBadgeProps();
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        // Carol's row is not silently dropped, it stays on screen at the level she had.
        expect(page.permissionValueForAro("carol@passbolt.com")).toBe("can update");
        expect(page.classListForAro("carol@passbolt.com")).toContain("permission-removed");
      });

      it("As LU confirming a pre-seeded move without further edits should send the applied target verbatim", async () => {
        expect.assertions(1);
        const props = buildPreSeededBadgeProps();
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));
        await page.savePermissions();

        const [changes] = props.onConfirm.mock.calls[0];
        const typeByAro = new Map(
          changes.filter((change) => !change.delete).map((change) => [change.aro_foreign_key, change.type]),
        );
        const deletedAros = new Set(changes.filter((change) => change.delete).map((change) => change.aro_foreign_key));
        expect({ typeByAro, deletedAros }).toStrictEqual({
          typeByAro: new Map([
            [props.initialUsers.items.find((u) => u.username === "betty@passbolt.com").id, 15],
            [props.initialUsers.items.find((u) => u.username === "dame@passbolt.com").id, 1],
          ]),
          deletedAros: new Set([props.initialUsers.items.find((u) => u.username === "carol@passbolt.com").id]),
        });
      });

      it("As LU moving a batch where a recipient's applied permission varies across items, I should see the varies 'i' and a modified badge", async () => {
        expect.assertions(3);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const props = variesAppliedMoveProps(operatorId);
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        expect(page.permissionValueForAro("betty@passbolt.com")).toBe("varies");
        expect(page.variesIconForAro("betty@passbolt.com")).not.toBeNull();
        /*
         * The move raises Betty on RA only, so the row cannot show one level. It still carries a real
         * change, so it must be badged. No badge would read as "the raise is not applied".
         */
        expect(page.changeChipForAro("betty@passbolt.com").textContent).toBe("modified");
      });

      it("As LU confirming a move where a recipient's applied permission varies, each item's own applied permission is sent", async () => {
        expect.assertions(3);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const props = variesAppliedMoveProps(operatorId);
        mockContextRequest(jest.fn());
        await act(() => (page = new ShareDialogPage(context, props)));

        await page.savePermissions();

        const changes = props.onConfirm.mock.calls[0][0];
        const bettyChanges = changes.filter((change) => change.aro_foreign_key === props.recipient.id);
        // RA raises Betty to owner and RB keeps her a reader, so only RA carries a change.
        expect(bettyChanges).toHaveLength(1);
        expect(bettyChanges[0]).toEqual(expect.objectContaining({ aco_foreign_key: props.resourceIds.raId, type: 15 }));
        expect(changes.some((change) => change.aco_foreign_key === props.resourceIds.rbId)).toBe(false);
      });

      it("As LU moving a batch where the move drops a recipient from one item only, the removal is staged on that item only", async () => {
        expect.assertions(4);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const props = variesRemovalMoveProps(operatorId);
        mockContextRequest(jest.fn());
        await act(() => (page = new ShareDialogPage(context, props)));

        /*
         * The only change staged for her is a deletion, RB keeps her at the level she already had.
         * The row therefore reads as removed and keeps showing her last level, faded.
         */
        expect(page.changeChipForAro("betty@passbolt.com").textContent).toBe("removed");
        expect(page.permissionValueForAro("betty@passbolt.com")).toBe("can update");

        await page.savePermissions();

        const changes = props.onConfirm.mock.calls[0][0];
        const bettyChanges = changes.filter((change) => change.aro_foreign_key === props.recipient.id);
        expect(bettyChanges).toHaveLength(1);
        // Betty is dropped from RA and left untouched on RB.
        expect(bettyChanges[0]).toEqual(
          expect.objectContaining({ aco_foreign_key: props.resourceIds.raId, delete: true }),
        );
      });

      it("As LU moving, a recipient absent from an item I don't own still gets the owned item's new permission", async () => {
        expect.assertions(4);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const props = absentFromUnownedMoveProps(operatorId);
        mockContextRequest(jest.fn());
        await act(() => (page = new ShareDialogPage(context, props)));

        // She has no access at all on R2, so no single level can be shown.
        expect(page.permissionValueForAro("carol@passbolt.com")).toBe("varies");
        /*
         * Nothing definite was picked for her, so there is nothing R2 could block. No attention marker.
         */
        expect(page.attentionIconForAro("carol@passbolt.com")).toBeNull();

        await page.savePermissions();

        const changes = props.onConfirm.mock.calls[0][0];
        const carolChanges = changes.filter((change) => change.aro_foreign_key === props.recipient.id);
        expect(carolChanges).toEqual([expect.objectContaining({ aco_foreign_key: props.resourceIds.r1Id, type: 7 })]);
        expect(changes.some((change) => change.aco_foreign_key === props.resourceIds.r2Id)).toBe(false);
      });

      it("As LU moving, a recipient the destination grants at a different level per item gets an added varies row applied per item", async () => {
        expect.assertions(3);
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const props = variesAppliedNewRecipientMoveProps(operatorId);
        mockContextRequest(jest.fn());
        await act(() => (page = new ShareDialogPage(context, props)));

        expect(page.permissionValueForAro("dame@passbolt.com")).toBe("varies");
        expect(page.changeChipForAro("dame@passbolt.com").textContent).toBe("added");

        await page.savePermissions();

        const changes = props.onConfirm.mock.calls[0][0];
        const dameChanges = changes.filter((change) => change.aro_foreign_key === props.recipient.id);
        expect(dameChanges).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ aco_foreign_key: props.resourceIds.raId, type: 7 }),
            expect.objectContaining({ aco_foreign_key: props.resourceIds.rbId, type: 15 }),
          ]),
        );
      });

      // Moving a batch the operator owns only part of.
      it("As LU moving a mixed-ownership batch I should see a concrete row with attention, a modified row with attention and an untouched varies row", async () => {
        expect.assertions(10);
        // Ada owns R1, which Carol also owns, and can only update R2, which Betty owns. Both move into
        // folder A: only R1's permissions change, the higher of the two levels winning.
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const ada = defaultUserDto({ id: operatorId, username: "ada@passbolt.com" });
        const betty = defaultUserDto({
          username: "betty@passbolt.com",
          profile: defaultProfileDto({ first_name: "Betty", last_name: "Holberton" }),
        });
        const carol = defaultUserDto({
          username: "carol@passbolt.com",
          profile: defaultProfileDto({ first_name: "Carol", last_name: "Shaw" }),
        });
        const r1Id = uuidv4();
        const r2Id = uuidv4();
        const permission = (acoForeignKey, aroForeignKey, type) =>
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: acoForeignKey,
            aro: "User",
            aro_foreign_key: aroForeignKey,
            type,
          });
        const r1PreMovePermissions = new PermissionsCollection(
          [permission(r1Id, operatorId, 15), permission(r1Id, carol.id, 15)],
          { assertAtLeastOneOwner: false },
        );
        const r2PreMovePermissions = new PermissionsCollection(
          [permission(r2Id, operatorId, 7), permission(r2Id, betty.id, 15)],
          { assertAtLeastOneOwner: false },
        );
        // What R1 ends up with: the destination merged with what it keeps of its own, so Carol stays,
        // the destination says nothing about her.
        const r1AppliedPermissions = new PermissionsCollection(
          [permission(r1Id, operatorId, 15), permission(r1Id, betty.id, 7), permission(r1Id, carol.id, 15)],
          { assertAtLeastOneOwner: false },
        );
        const props = {
          ...defaultProps(),
          initialResources: [
            { id: r1Id, metadata: { name: "R1" }, permission: { type: 15 }, permissions: r1PreMovePermissions },
            { id: r2Id, metadata: { name: "R2" }, permission: { type: 7 }, permissions: r2PreMovePermissions },
          ],
          initialGroups: new GroupsCollection([]),
          initialUsers: new UsersCollection([ada, betty, carol]),
          // Only the owned R1 gets a resulting set. R2 is deliberately absent.
          initialAppliedPermissions: new Map([[r1Id, r1AppliedPermissions]]),
          unchangedAcos: [{ id: r2Id, name: "R2" }],
          onConfirm: jest.fn(),
        };
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        // Expected in the dialog: Ada owner, no badge, attention. Betty update, modified, attention.
        // Carol varies, no badge, no attention.
        expect(page.permissionValueForAro("ada@passbolt.com")).toBe("is owner");
        expect(page.changeChip(1)).toBeNull();
        expect(page.attentionIconForAro("ada@passbolt.com")).not.toBeNull();
        expect(page.permissionValueForAro("betty@passbolt.com")).toBe("can update");
        expect(page.changeChip(2)?.textContent).toBe("modified");
        expect(page.attentionIconForAro("betty@passbolt.com")).not.toBeNull();
        expect(page.permissionValueForAro("carol@passbolt.com")).toBe("varies");
        expect(page.attentionIconForAro("carol@passbolt.com")).toBeNull();
        expect(page.saveButton.disabled).toBe(false);

        await page.savePermissions();
        const [changes] = props.onConfirm.mock.calls[0];
        // The move never touches R2, which Ada does not own. No emitted change may carry its
        // aco_foreign_key, for any recipient. This is what the original bug got wrong.
        expect(changes.every((change) => change.aco_foreign_key !== r2Id)).toBe(true);
      });

      // An owned resource listed after a not-owned one still has its permissions changed.
      it("As LU moving a mixed-ownership batch to the root, a not-owned resource's sole owner does not wrongly disable Save", async () => {
        expect.assertions(6);
        // Betty's update on R1 comes from folder A, so the move to the root drops it and puts Ada back
        // as owner. R2, which Ada does not own, is left alone with Betty still its owner.
        const operatorId = context.userSettings.id;
        context.loggedInUser = { id: operatorId };
        const ada = defaultUserDto({ id: operatorId, username: "ada@passbolt.com" });
        const betty = defaultUserDto({
          username: "betty@passbolt.com",
          profile: defaultProfileDto({ first_name: "Betty", last_name: "Holberton" }),
        });
        const r1Id = uuidv4();
        const r2Id = uuidv4();
        const permission = (acoForeignKey, aroForeignKey, type) =>
          defaultPermissionDto({
            aco: "Resource",
            aco_foreign_key: acoForeignKey,
            aro: "User",
            aro_foreign_key: aroForeignKey,
            type,
          });
        const r1PreMovePermissions = new PermissionsCollection(
          [permission(r1Id, operatorId, 15), permission(r1Id, betty.id, 7)],
          { assertAtLeastOneOwner: false },
        );
        const r2PreMovePermissions = new PermissionsCollection(
          [permission(r2Id, operatorId, 7), permission(r2Id, betty.id, 15)],
          { assertAtLeastOneOwner: false },
        );
        // What R1 ends up with: nothing is kept, Betty's update matched the folder and was dropped.
        // A move to the root puts Ada back as owner, and she is the only one left.
        const r1AppliedPermissions = new PermissionsCollection([permission(r1Id, operatorId, 15)], {
          assertAtLeastOneOwner: false,
        });
        const props = {
          ...defaultProps(),
          initialResources: [
            { id: r1Id, metadata: { name: "R1" }, permission: { type: 15 }, permissions: r1PreMovePermissions },
            { id: r2Id, metadata: { name: "R2" }, permission: { type: 7 }, permissions: r2PreMovePermissions },
          ],
          initialGroups: new GroupsCollection([]),
          initialUsers: new UsersCollection([ada, betty]),
          // A move to the root has no destination folder, so an empty collection, which is what
          // ResourceMoveFlow passes.
          initialAppliedPermissions: new Map([[r1Id, r1AppliedPermissions]]),
          unchangedAcos: [{ id: r2Id, name: "R2" }],
          onConfirm: jest.fn(),
        };
        mockContextRequest(jest.fn());

        await act(() => (page = new ShareDialogPage(context, props)));

        expect(page.permissionValueForAro("ada@passbolt.com")).toBe("is owner");
        expect(page.permissionValueForAro("betty@passbolt.com")).toBe("varies");
        expect(page.changeChip(2)?.textContent).toBe("removed");
        expect(page.attentionIconForAro("betty@passbolt.com")).not.toBeNull();
        // The regression guarded against here: Betty's removal from R1 must not spill onto R2, where
        // she is the sole owner. That would read as R2 having no owner and disable Save entirely.
        expect(page.saveButton.disabled).toBe(false);

        await page.savePermissions();
        const [changes] = props.onConfirm.mock.calls[0];
        expect(changes.every((change) => change.aco_foreign_key !== r2Id)).toBe(true);
      });
    });
  });

  describe("Read-only mode", () => {
    it("As LU with update-but-not-owner access I should not see the autocomplete to add people or groups", async () => {
      expect.assertions(2);
      const props = { ...controlledModeProps(), readOnly: true };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // The permissions are still rendered for review, but the add-people autocomplete is hidden.
      expect(page.count).toBe(2);
      expect(page.shareNameInput).toBeNull();
    });

    it("As LU in read-only mode I should still be able to confirm the set as-is (empty delta)", async () => {
      expect.assertions(3);
      const props = { ...controlledModeProps(), readOnly: true };
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.saveButton.hasAttribute("disabled")).toBe(false);
      await act(() => page.savePermissions());

      expect(props.onConfirm).toHaveBeenCalledTimes(1);
      expect(props.onConfirm.mock.calls[0][0]).toEqual([]);
    });

    it("As LU in read-only mode I see the dialog flagged read-only, the styles fade the select carets on it", async () => {
      expect.assertions(2);
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, { ...controlledModeProps(), readOnly: true })));

      expect(page.dialogWrapper.classList.contains("read-only")).toBe(true);

      await act(() => (page = new ShareDialogPage(context, controlledModeProps())));

      expect(page.dialogWrapper.classList.contains("read-only")).toBe(false);
    });
  });

  describe("Group members expansion", () => {
    // Permissions are sorted by aro name: user "Ada Lovelace" (row 1), group "Developer" (row 2).
    it("As LU I should see a members toggle on group rows but not on user rows", async () => {
      expect.assertions(3);
      const props = controlledModeWithGroupProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.count).toBe(2);
      expect(page.groupVisibilityToggle(1)).toBeNull();
      expect(page.groupVisibilityToggle(2)).not.toBeNull();
    });

    it("As LU I can still expand the members of a group pending deletion, faded like its row", async () => {
      expect.assertions(4);
      const props = controlledModeWithGroupProps();
      const groupForShare = initialGroupForShareFixture(props);
      mockContextRequest((request) => (request === GROUPS_FIND_BY_IDS_FOR_SHARE ? [groupForShare] : undefined));

      await act(() => (page = new ShareDialogPage(context, props)));

      await page.selectRemovePermission(2);
      expect(page.changeChip(2).textContent).toBe("removed");
      await act(() => page.toggleGroupMemberVisibility(2));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);
      // The members carry the removed state of their group so they fade along with its row.
      expect(page.groupMember(1).classList.contains("permission-removed")).toBe(true);
      expect(page.groupMember(2).classList.contains("permission-removed")).toBe(true);
    });

    it("As LU expanding a group I should see its members, and collapsing should hide them", async () => {
      expect.assertions(4);
      const props = controlledModeWithGroupProps();
      const groupForShare = initialGroupForShareFixture(props);
      mockContextRequest((request) => (request === GROUPS_FIND_BY_IDS_FOR_SHARE ? [groupForShare] : undefined));

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.groupMemberCount).toBe(0);
      await act(() => page.toggleGroupMemberVisibility(2));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);
      // Member rows are display-only: no permission select nor delete button.
      expect(page.groupMember(1).querySelector(".select")).toBeNull();
      await act(() => page.toggleGroupMemberVisibility(2));
      expect(page.groupMemberCount).toBe(0);
    });

    it("As LU expanding a group refetches its members so I see the membership it has now", async () => {
      expect.assertions(3);
      const props = controlledModeWithGroupProps();
      const joiningMember = defaultUserDto({
        username: "grace@passbolt.com",
        profile: defaultProfileDto({ first_name: "Grace", last_name: "Hopper" }),
      });
      let groupForShare = initialGroupForShareFixture(props);
      mockContextRequest((request) => (request === GROUPS_FIND_BY_IDS_FOR_SHARE ? [groupForShare] : undefined));

      await act(() => (page = new ShareDialogPage(context, props)));

      await act(() => page.toggleGroupMemberVisibility(2));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);

      // Grace replaces both members while the dialog is open.
      groupForShare = initialGroupForShareFixture(props, [joiningMember]);

      await act(() => page.toggleGroupMemberVisibility(2)); // collapse
      await act(() => page.toggleGroupMemberVisibility(2)); // expand again
      await waitForTrue(() => page.groupMemberCount === 1);
      // The second expansion displays the refetched membership, not the one the first resolved.
      expect(page.groupMemberCount).toBe(1);
      expect(page.groupMember(1).textContent).toContain("Grace Hopper");
    });

    it("As LU adding a group I belong to I am recognised as owner through it without expanding it", async () => {
      expect.assertions(2);
      const { props, operator } = operatorResourceShareProps({ ensureOperatorIsOwner: true });
      const operatorContext = defaultAppContext({ loggedInUser: operator });
      const addedGroup = addedGroupWithMembersFixture([operator]);
      jest.spyOn(operatorContext.port, "request").mockImplementation((request) => {
        switch (request) {
          case "passbolt.share.search-aros":
            return [addedGroup.searchResult];
          case GROUPS_FIND_BY_IDS_FOR_SHARE:
            return [addedGroup.group];
        }
      });

      await act(() => (page = new ShareDialogPage(operatorContext, props)));

      // Removing its own owner row leaves the operator without ownership.
      await page.selectRemovePermission(1);
      expect(page.errorMessage).toBe("Please make sure you are still owner.");

      // The members are fetched when the group is added, so ownership resolves through the group
      // even though its row is never expanded.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      await page.selectRightsOption(3, "is owner");
      await waitForTrue(() => page.hasErrorMessage === false);
      expect(page.hasErrorMessage).toBe(false);
    });

    it("As LU expanding a group I added during the session I should see its members fetched on demand", async () => {
      expect.assertions(3);
      const props = controlledModeWithGroupProps();
      const addedGroup = addedGroupWithMembersFixture();
      const requestBextMockImpl = (request) => {
        switch (request) {
          case "passbolt.share.search-aros":
            return [addedGroup.searchResult];
          case GROUPS_FIND_BY_IDS_FOR_SHARE:
            return [addedGroup.group];
        }
      };
      mockContextRequest(requestBextMockImpl);

      await act(() => (page = new ShareDialogPage(context, props)));

      // Add, through the autocomplete, a group that was not seeded into the dialog.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      expect(page.count).toBe(3);

      // Expanding it fetches its members, they are not pre-loaded, and displays them.
      expect(page.groupMemberCount).toBe(0);
      await act(() => page.toggleGroupMemberVisibility(3));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);
    });

    it("As LU removing a group I added and adding it back I should see the member that joined meanwhile", async () => {
      expect.assertions(4);
      const props = controlledModeWithGroupProps();
      const joiningMember = defaultUserDto({
        username: "grace@passbolt.com",
        profile: defaultProfileDto({ first_name: "Grace", last_name: "Hopper" }),
      });
      const addedGroup = addedGroupWithMembersFixture();
      const grownGroup = addedGroupWithMembersFixture([...addedGroup.members, joiningMember]);
      let currentGroup = addedGroup;
      mockContextRequest((request) => {
        switch (request) {
          case "passbolt.share.search-aros":
            return [currentGroup.searchResult];
          case GROUPS_FIND_BY_IDS_FOR_SHARE:
            return [currentGroup.group];
        }
      });

      await act(() => (page = new ShareDialogPage(context, props)));

      // Add the group and expand it: two members.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      await act(() => page.toggleGroupMemberVisibility(3));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);

      // Removing a group added during the session drops its row entirely, freeing it for a re-add.
      await page.selectRemovePermission(3);
      expect(page.count).toBe(2);

      // Somebody joins the group while the dialog is still open.
      currentGroup = grownGroup;

      // Adding it back must fetch again rather than reuse what the first add resolved.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      // The row comes back collapsed and shows the count the search returned, never the previous one.
      expect(page.groupMemberCount).toBe(0);
      await waitForTrue(() => page.aroDetails(3).includes("3"));
      await act(() => page.toggleGroupMemberVisibility(3));
      await waitForTrue(() => page.groupMemberCount === 3);
      expect(page.groupMemberCount).toBe(3);
    });

    it("As LU expanding a group I added during the session, if its members cannot be fetched the dialog aborts with an error", async () => {
      expect.assertions(2);
      const props = controlledModeWithGroupProps();
      const addedGroup = addedGroupWithMembersFixture();
      const error = new Error("Unexpected error");
      const requestBextMockImpl = (request) => {
        switch (request) {
          case "passbolt.share.search-aros":
            return [addedGroup.searchResult];
          // The dialog promises that what it shows is what will be applied, so a failed member fetch
          // must close it with an error rather than show a partial list.
          case "passbolt.groups.find-by-ids-for-share":
            throw error;
        }
      };
      mockContextRequest(requestBextMockImpl);

      await act(() => (page = new ShareDialogPage(context, props)));

      // Add, through the autocomplete, a group that was not seeded into the dialog.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      // Expanding it fetches its members. The fetch fails, so the dialog closes with an error.
      await act(() => page.toggleGroupMemberVisibility(3));
      await waitForTrue(() => props.onClose.mock.calls.length > 0);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        title: "Could not retrieve the group members",
        error: error,
      });
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU expanding two groups whose members both fail to fetch, the dialog aborts once", async () => {
      expect.assertions(2);
      const props = controlledModeWithTwoGroupsProps();
      const rejections = [];
      const requestBextMockImpl = (request) => {
        if (request === GROUPS_FIND_BY_IDS_FOR_SHARE) {
          // Keep both fetches running so they can fail at the same time.
          return new Promise((resolve, reject) => rejections.push(reject));
        }
        return null;
      };
      mockContextRequest(requestBextMockImpl);
      await act(() => (page = new ShareDialogPage(context, props)));

      // Rows are sorted by name: Ada is 1, Developer 2 and Marketing 3. Expanding a group inserts its
      // members right below it, so expand the lower one first to keep the other's index stable.
      await act(() => page.toggleGroupMemberVisibility(3));
      await act(() => page.toggleGroupMemberVisibility(2));
      await waitForTrue(() => rejections.length === 2);

      await act(async () => {
        rejections.forEach((reject) => reject(new Error("Unexpected error")));
        await Promise.resolve();
      });
      await waitForTrue(() => props.onClose.mock.calls.length > 0);

      /*
       * Only the first failure reports and closes. A second error dialog on an already-closed one
       * would stack a duplicate notification and re-enter the flow's close path.
       */
      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Operator checks with rows pending deletion", () => {
    it("As LU removing my own owner permission I see the ownership error until reverted", async () => {
      expect.assertions(3);
      const { props, operator } = operatorResourceShareProps({ ensureOperatorIsOwner: true });
      const operatorContext = defaultAppContext({ loggedInUser: operator });
      jest.spyOn(operatorContext.port, "request").mockImplementation(jest.fn());

      await act(() => (page = new ShareDialogPage(operatorContext, props)));
      expect(page.hasErrorMessage).toBe(false);

      // Rows are sorted by first name: Ada the operator (row 1), Betty the reader (row 2).
      await page.selectRemovePermission(1);
      expect(page.errorMessage).toBe("Please make sure you are still owner.");

      await page.selectRevertPermission(1);
      expect(page.hasErrorMessage).toBe(false);
    });

    it("As LU confirming with my own row pending deletion the operator flags derive from the surviving rows", async () => {
      expect.assertions(3);
      const { props, operator } = operatorResourceShareProps();
      const operatorContext = defaultAppContext({ loggedInUser: operator });
      jest.spyOn(operatorContext.port, "request").mockImplementation(jest.fn());

      await act(() => (page = new ShareDialogPage(operatorContext, props)));

      // Promote the reader so the resource keeps an owner, then remove the operator's own row.
      await page.selectRightsOption(2, "is owner");
      await page.selectRemovePermission(1);
      await act(() => page.savePermissions());

      expect(props.onConfirm).toHaveBeenCalledTimes(1);
      // The operator can no longer read: its own permission is pending deletion.
      expect(props.onConfirm.mock.calls[0][1]).toBe(false);
      // A single user row survives: the share is personal.
      expect(props.onConfirm.mock.calls[0][2]).toBe(true);
    });
  });
});
