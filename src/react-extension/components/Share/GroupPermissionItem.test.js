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
import GroupPermissionItemPage from "./GroupPermissionItem.test.page";
import {
  defaultReadProps,
  defaultUpdateProps,
  defaultOwnerProps,
  defaultVariesProps,
} from "./GroupPermissionItem.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("GroupPermissionItem", () => {
  describe("Rendering", () => {
    it("renders the group name", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps());
      expect(page.name).toBe("Developer");
    });

    it("renders 'Group' as details", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps());
      expect(page.details).toBe("Group");
    });

    it("displays the toggle", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps());
      expect(page.groupVisibilityToggle).not.toBeNull();
    });
  });

  describe("Permission types", () => {
    it("shows 'can read' in the permission select for type 1", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultReadProps());
      expect(page.permissionSelectValue).toBe("can read");
    });

    it("shows 'can update' in the permission select for type 7", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultUpdateProps());
      expect(page.permissionSelectValue).toBe("can update");
    });

    it("shows 'is owner' in the permission select for type 15", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps());
      expect(page.permissionSelectValue).toBe("is owner");
    });
  });

  describe("Interactions", () => {
    it("calls onDelete with the permission id when delete is clicked", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps();
      const page = new GroupPermissionItemPage(props);
      await page.clickDelete();
      expect(props.onDelete).toHaveBeenCalledWith("some-uuid");
    });

    it("calls onUpdate with the new permission type when the select changes", async () => {
      expect.assertions(1);
      const props = defaultReadProps();
      const page = new GroupPermissionItemPage(props);
      await page.changePermission("can update");
      expect(props.onUpdate).toHaveBeenCalledWith("some-uuid", 7);
    });

    it("calls onToggleGroupMemberVisibility with the permission id when the toggle is clicked", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps();
      const page = new GroupPermissionItemPage(props);
      await page.clickGroupVisibilityToggle();
      expect(props.onToggleGroupMemberVisibility).toHaveBeenCalledWith("some-uuid");
    });
  });

  describe("States", () => {
    it("shows a change status chip when changeStatus is set", () => {
      expect.assertions(2);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ changeStatus: "added" }));
      expect(page.changeChip.textContent).toBe("added");
      expect(page.changeChip.classList.contains("added")).toBe(true);
    });

    it("shows no change status chip when changeStatus is not set", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps());
      expect(page.changeChip).toBeNull();
    });

    it("renders the removed state when changeStatus is removed", () => {
      expect.assertions(5);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ changeStatus: "removed" }));
      expect(page.isRemoved).toBe(true);
      expect(page.isPermissionSelectDisabled).toBe(true);
      expect(page.revertButton).not.toBeNull();
      expect(page.deleteButton).toBeNull();
      // The group members can still be expanded on a removed row.
      expect(page.groupVisibilityToggle).not.toBeNull();
    });

    it("calls onRevert with the permission id when the revert button is clicked", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps({ changeStatus: "removed" });
      const page = new GroupPermissionItemPage(props);
      await page.clickRevert();
      expect(props.onRevert).toHaveBeenCalledWith("some-uuid");
    });

    it("hides the revert button in read-only mode", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ changeStatus: "removed", isReadOnly: true }));
      expect(page.revertButton).toBeNull();
    });

    it("disables the select and delete button when disabled is true", () => {
      expect.assertions(2);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ disabled: true }));
      expect(page.isPermissionSelectDisabled).toBe(true);
      expect(page.isDeleteButtonDisabled).toBe(true);
    });
  });

  describe("Varies details", () => {
    it("shows 'varies' in the select and an info icon when variesDetails is set", () => {
      expect.assertions(2);
      const page = new GroupPermissionItemPage(defaultVariesProps());
      expect(page.permissionSelectValue).toBe("varies");
      expect(page.variesIcon).not.toBeNull();
    });

    it("does not offer the varies option once resolved to a concrete level", async () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultVariesProps({ permissionType: 15 }));
      expect(await page.getPermissionSelectOptions()).toEqual(["can read", "can update"]);
    });

    it("hides the varies info icon once resolved to a concrete level", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultVariesProps({ permissionType: 15 }));
      expect(page.variesIcon).toBeNull();
    });
  });
});
