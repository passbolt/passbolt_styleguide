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
import UserPermissionItemPage from "./UserPermissionItem.test.page";
import {
  defaultReadProps,
  defaultUpdateProps,
  defaultOwnerProps,
  defaultSuspendedUserProps,
  defaultVariesProps,
} from "./UserPermissionItem.test.data";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("UserPermissionItem", () => {
  describe("Rendering", () => {
    it("renders the user full name", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultOwnerProps());
      expect(page.name).toBe("Ada Lovelace");
    });

    it("renders the username as details", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultOwnerProps());
      expect(page.details).toBe("ada@passbolt.com");
    });

    it("always shows the fingerprint icon", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultOwnerProps());
      expect(page.fingerprintIcon).not.toBeNull();
    });
  });

  describe("Permission types", () => {
    it("shows 'can read' in the permission select for type 1", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultReadProps());
      expect(page.permissionSelectValue).toBe("can read");
    });

    it("shows 'can update' in the permission select for type 7", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultUpdateProps());
      expect(page.permissionSelectValue).toBe("can update");
    });

    it("shows 'is owner' in the permission select for type 15", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultOwnerProps());
      expect(page.permissionSelectValue).toBe("is owner");
    });
  });

  describe("Interactions", () => {
    it("calls onDelete with the permission id when delete is clicked", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps();
      const page = new UserPermissionItemPage(props);
      await page.clickDelete();
      expect(props.onDelete).toHaveBeenCalledWith("some-uuid");
    });

    it("calls onUpdate with the new permission type when the select changes", async () => {
      expect.assertions(1);
      const props = defaultReadProps();
      const page = new UserPermissionItemPage(props);
      await page.changePermission("can update");
      expect(props.onUpdate).toHaveBeenCalledWith("some-uuid", 7);
    });
  });

  describe("States", () => {
    it("adds the suspended CSS class and '(suspended)' suffix when the user is suspended", () => {
      expect.assertions(2);
      const page = new UserPermissionItemPage(defaultSuspendedUserProps());
      expect(page.isSuspended).toBe(true);
      expect(page.name).toContain("(suspended)");
    });

    it("adds the permission-updated CSS class when updated is true", () => {
      expect.assertions(1);
      const page = new UserPermissionItemPage(defaultOwnerProps({ updated: true }));
      expect(page.isUpdated).toBe(true);
    });

    it("disables the select and delete button when disabled is true", () => {
      expect.assertions(2);
      const page = new UserPermissionItemPage(defaultOwnerProps({ disabled: true }));
      expect(page.isPermissionSelectDisabled).toBe(true);
      expect(page.isDeleteButtonDisabled).toBe(true);
    });
  });

  describe("Varies details", () => {
    it("shows 'varies' in the select and an attention icon when variesDetails is set", () => {
      expect.assertions(2);
      const page = new UserPermissionItemPage(defaultVariesProps());
      expect(page.permissionSelectValue).toBe("varies");
      expect(page.attentionIcon).not.toBeNull();
    });
  });

  describe("Fingerprint tooltip", () => {
    it("requests fingerprint data via port on first hover", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps();
      jest.spyOn(props.context.port, "request");
      const page = new UserPermissionItemPage(props);
      await page.hoverFingerprint();
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.keyring.get-public-key-info-by-user",
        props.user.id,
      );
    });

    it("does not repeat the fingerprint port request on a second hover", async () => {
      expect.assertions(1);
      const props = defaultOwnerProps();
      jest.spyOn(props.context.port, "request");
      const page = new UserPermissionItemPage(props);
      await page.hoverFingerprint();
      await page.hoverFingerprint();
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });
  });
});
