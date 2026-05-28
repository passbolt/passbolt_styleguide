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
    it("adds the permission-updated CSS class when updated is true", () => {
      expect.assertions(1);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ updated: true }));
      expect(page.isUpdated).toBe(true);
    });

    it("disables the select and delete button when disabled is true", () => {
      expect.assertions(2);
      const page = new GroupPermissionItemPage(defaultOwnerProps({ disabled: true }));
      expect(page.isPermissionSelectDisabled).toBe(true);
      expect(page.isDeleteButtonDisabled).toBe(true);
    });
  });

  describe("Varies details", () => {
    it("shows 'varies' in the select and an attention icon when variesDetails is set", () => {
      expect.assertions(2);
      const page = new GroupPermissionItemPage(defaultVariesProps());
      expect(page.permissionSelectValue).toBe("varies");
      expect(page.attentionIcon).not.toBeNull();
    });
  });
});
