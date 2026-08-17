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
import GroupUserPermissionItemPage from "./GroupUserPermissionItem.test.page";
import { defaultProps, defaultSuspendedUserProps } from "./GroupUserPermissionItem.test.data";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GroupUserPermissionItem", () => {
  describe("Rendering", () => {
    it("renders the user full name", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.name).toBe("Ada Lovelace");
    });

    it("renders the username as details", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.details).toBe("ada@passbolt.com");
    });

    it("always shows the fingerprint icon", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.fingerprintIcon).not.toBeNull();
    });

    it("does not render a permission select", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.permissionSelect).toBeNull();
    });

    it("does not render a delete button", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.deleteButton).toBeNull();
    });
  });

  describe("States", () => {
    it("adds the suspended CSS class and '(suspended)' suffix when the user is suspended", () => {
      expect.assertions(2);
      const page = new GroupUserPermissionItemPage(defaultSuspendedUserProps());
      expect(page.isSuspended).toBe(true);
      expect(page.name).toContain("(suspended)");
    });

    it("adds the permission-removed CSS class when the group is pending deletion", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps({ isRemoved: true }));
      expect(page.isRemoved).toBe(true);
    });

    it("adds no permission-removed CSS class when the group is not pending deletion", () => {
      expect.assertions(1);
      const page = new GroupUserPermissionItemPage(defaultProps());
      expect(page.isRemoved).toBe(false);
    });
  });

  describe("Fingerprint tooltip", () => {
    it("requests fingerprint data via port on first hover", async () => {
      expect.assertions(1);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request");
      const page = new GroupUserPermissionItemPage(props);
      await page.hoverFingerprint();
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.keyring.get-public-key-info-by-user",
        props.user.id,
      );
    });

    it("does not repeat the fingerprint port request on a second hover", async () => {
      expect.assertions(1);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request");
      const page = new GroupUserPermissionItemPage(props);
      await page.hoverFingerprint();
      await page.hoverFingerprint();
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });
  });
});
