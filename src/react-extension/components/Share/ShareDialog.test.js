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
  addedGroupWithMembersFixture,
  controlledModeProps,
  controlledModeWithGroupProps,
  defaultAppContext,
  folderShareProps,
  resourcesShareProps,
  twoResourcesShareProps,
} from "./ShareDialog.test.data";
import PassboltApiFetchError from "../../../shared/lib/Error/PassboltApiFetchError";
import { waitFor } from "@testing-library/react";
import NotifyError from "../Common/Error/NotifyError/NotifyError";
import { waitForTrue } from "../../../../test/utils/waitFor";
import { act } from "react";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import { v4 as uuidv4 } from "uuid";

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
      expect.assertions(5);
      const newUser = defaultUserDto({
        username: "admin@passbolt.com",
        profile: defaultProfileDto({ first_name: "Admin", last_name: "User" }),
      });
      mockSearchReturns(newUser);
      await page.searchName("admin");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);

      expect(page.warningMessage).toBe("Click save to apply your pending changes.");
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

    it("As LU I can remove a permission", async () => {
      expect.assertions(2);
      expect(page.count).toBe(2);
      await page.selectRemovePermission(2);
      expect(page.count).toBe(1);
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
    // No edits — click Save. The backend already inherits the parent folder's permissions on
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

    it("As LU sharing several resources I should see their names listed in the title tooltip", async () => {
      expect.assertions(1);
      const props = twoResourcesShareProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      // Regression: controlled-mode ACOs expose only `metadata.name`, so the tooltip must not
      // resolve to bare commas.
      expect(page.titleTooltip).toBe("RA, RB");
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

    it("As LU expanding a group I should see its members, and collapsing should hide them", async () => {
      expect.assertions(4);
      const props = controlledModeWithGroupProps();
      mockContextRequest(jest.fn());

      await act(() => (page = new ShareDialogPage(context, props)));

      expect(page.groupMemberCount).toBe(0);
      await page.toggleGroupMemberVisibility(2);
      expect(page.groupMemberCount).toBe(2);
      // Member rows are display-only: no permission select nor delete button.
      expect(page.groupMember(1).querySelector(".select")).toBeNull();
      await page.toggleGroupMemberVisibility(2);
      expect(page.groupMemberCount).toBe(0);
    });

    it("As LU expanding a group I added during the session I should see its members fetched on demand", async () => {
      expect.assertions(3);
      const props = controlledModeWithGroupProps();
      const addedGroup = addedGroupWithMembersFixture();
      const requestBextMockImpl = (request) => {
        switch (request) {
          case "passbolt.share.search-aros":
            return [addedGroup.searchResult];
          case "passbolt.groups_users.get-by-group-id":
            return addedGroup.groupsUsers;
          case "passbolt.users.get-by-ids":
            return addedGroup.members;
        }
      };
      mockContextRequest(requestBextMockImpl);

      await act(() => (page = new ShareDialogPage(context, props)));

      // Add a group that is not part of the controlled-mode initial collections via the autocomplete.
      await page.searchName("market");
      await waitForTrue(() => Boolean(page.userOrGroupAutocomplete(1)));
      await page.selectUserOrGroup(1);
      expect(page.count).toBe(3);

      // Expanding it fetches its members on demand (they are not pre-loaded) and displays them.
      expect(page.groupMemberCount).toBe(0);
      await act(() => page.toggleGroupMemberVisibility(3));
      await waitForTrue(() => page.groupMemberCount === 2);
      expect(page.groupMemberCount).toBe(2);
    });
  });
});
