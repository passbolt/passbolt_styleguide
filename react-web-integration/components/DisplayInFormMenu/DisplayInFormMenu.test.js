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
 * @since         4.10.0
 */

/**
 * Unit tests on DisplayInFormMenu in regard of specifications
 */

import DisplayInFormMenuTestPage from "./DisplayInformMenu.test.page";
import { defaultProps, defaultPropsWithMissingMetadataKey, offlineSessionProps } from "./DisplayInformMenu.test.data";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import {
  defaultResourceDto,
  resourceStandaloneTotpDto,
  resourceWithTotpDto,
} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultPasswordPoliciesDto } from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV6Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto,
} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import { act } from "react";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("See the Inform Menu", () => {
  let page;
  describe("As a signed-in user I should see menu items", () => {
    it("I should see all menu items for username with no value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should see all menu items for username with value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "test@passbolt.com",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should see all menu items for password with no value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(5);
    });

    it("I should see all menu items for password with value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "thisisapassword",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should see all menu items for OTP with no value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [resourceWithTotpDto(), resourceStandaloneTotpDto()];
      const configuration = {
        inputType: "otp",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should see all menu items for OTP with value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [resourceWithTotpDto(), resourceStandaloneTotpDto()];
      const configuration = {
        inputType: "otp",
        inputValue: "123456",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should  see create credentials menu items if I am missing the shared metadata key but it is not enforced", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey({
        metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
      });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should not see create credentials menu items if metadata type setting is not loaded", async () => {
      expect.assertions(1);
      const props = defaultProps({ metadataTypeSettings: null });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if I am missing the shared metadata key and it is enforced", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if metadata type setting allow only v5 and resource type has only v4", async () => {
      expect.assertions(1);
      const metadataTypeSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({ metadataTypeSettings, resourceTypes });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "test@passbolt.com",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if metadata type setting allow only v4 and resource type has only v5", async () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({ resourceTypes });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see save credentials menu items if metadata type setting is not loaded", async () => {
      expect.assertions(1);
      const props = defaultProps({ metadataTypeSettings: null });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "thisisapassword",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see save credentials menu items if I am missing shared metadata keys", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "thisisapassword",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      expect(page.informMenuItems.length).toBe(3);
    });
  });
  describe("As a user in an offline session I should not see the menu items requiring the API", () => {
    it("I should only see the suggested resources and the browse credentials menu item for an empty username", async () => {
      expect.assertions(1);
      const props = offlineSessionProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      // 2 suggested resources + browse credentials, no create credential
      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should only see the suggested resources and the browse credentials menu item for a filled username", async () => {
      expect.assertions(1);
      const props = offlineSessionProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "username",
        inputValue: "test@passbolt.com",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      // 2 suggested resources + browse credentials, no save as new credential
      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see the generate password nor the create credential menu items for an empty password", async () => {
      expect.assertions(1);
      const props = offlineSessionProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      // 2 suggested resources + browse credentials, no generate password and no create credential
      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see the menu items requiring the API in an online session whose server is not reachable", async () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_server_reachable: false })),
      });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = {
        inputType: "password",
        inputValue: "",
        suggestedResources: resources,
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      await act(async () => (page = new DisplayInFormMenuTestPage(props)));

      // 2 suggested resources + browse credentials, no generate password and no create credential
      expect(page.informMenuItems.length).toBe(3);
    });
  });
});

describe("See the passkeys in the Inform Menu", () => {
  let page;
  const passkeyRequestId = "f3a9d1c4-62b8-4e0f-9b7a-2c5d8e1f4a30";
  const suggestedPasskeys = [
    { id: "8e3874ae-4b40-590b-968a-418f704b9d9a", name: "GitHub", username: "ada" },
    { id: "9a1c2f3e-7b6d-4e5a-8c9b-0d1e2f3a4b5c", name: "GitHub work", username: "ada-work" },
  ];

  /**
   * Render the menu of a username field the conditional passkey request of the page offers passkeys on.
   * @param {object} configuration Fields of the configuration to override.
   * @returns {Promise<object>} The props.
   */
  const renderWithPasskeys = async (configuration = {}) => {
    const props = defaultProps();
    props.context.port.addRequestListener("passbolt.in-form-menu.init", () => ({
      inputType: "username",
      inputValue: "",
      suggestedResources: [defaultResourceDto(), defaultResourceDto()],
      passkeyRequestId,
      suggestedPasskeys,
      ...configuration,
    }));
    props.context.port.addRequestListener("passbolt.password-policies.get", () => defaultPasswordPoliciesDto());
    props.context.port.addRequestListener("passbolt.in-form-menu.is-application-overlaid", () => false);
    props.context.port.addRequestListener("passbolt.in-form-menu.use-passkey", () => undefined);
    props.context.port.addRequestListener("passbolt.in-form-menu.close", () => undefined);
    jest.spyOn(props.context.port, "request");
    await act(async () => (page = new DisplayInFormMenuTestPage(props)));
    await waitUntil(() => page.informMenuItems.length > 0);
    return props;
  };

  /**
   * Wait until the condition holds.
   * @param {function(): boolean} condition The condition.
   * @returns {Promise<void>}
   */
  const waitUntil = (condition) =>
    waitFor(() => {
      if (!condition()) {
        throw new Error("The condition does not hold yet.");
      }
    });

  /**
   * Whether the menu sent the request with the given first arguments.
   * @param {object} props The props.
   * @param {Array} args The request name and arguments.
   * @returns {boolean}
   */
  const hasRequested = (props, ...args) =>
    props.context.port.request.mock.calls.some((call) => args.every((arg, index) => call[index] === arg));

  it("I should see the passkeys first, then the passwords, each under its label", async () => {
    expect.assertions(4);
    await renderWithPasskeys();
    expect(page.groupLabels).toStrictEqual(["Passkeys", "Passwords"]);
    expect(page.informMenuItems.length).toBe(6);
    expect(page.itemTitle(0)).toBe("GitHub");
    expect(page.itemTitle(1)).toBe("GitHub work");
  });

  it("I should see only the passkeys label when no password is suggested", async () => {
    expect.assertions(2);
    await renderWithPasskeys({ suggestedResources: [] });
    expect(page.groupLabels).toStrictEqual(["Passkeys"]);
    expect(page.informMenuItems.length).toBe(4);
  });

  it("I should see no label when the page offers no passkey", async () => {
    expect.assertions(2);
    await renderWithPasskeys({ passkeyRequestId: null, suggestedPasskeys: [] });
    expect(page.groupLabels).toStrictEqual([]);
    expect(page.informMenuItems.length).toBe(4);
  });

  it("I should sign in with the passkey I click, then the menu closes", async () => {
    expect.assertions(2);
    const props = await renderWithPasskeys();
    page.clickItem(1);
    await waitUntil(() => hasRequested(props, "passbolt.in-form-menu.close"));
    expect(props.context.port.request).toHaveBeenCalledWith(
      "passbolt.in-form-menu.use-passkey",
      passkeyRequestId,
      suggestedPasskeys[1].id,
    );
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.in-form-menu.close");
  });

  it("I should not sign in when the application is overlaid", async () => {
    expect.assertions(2);
    const props = await renderWithPasskeys();
    props.context.port.addRequestListener("passbolt.in-form-menu.is-application-overlaid", () => true);
    page.clickItem(0);
    await waitUntil(() => hasRequested(props, "passbolt.in-form-menu.is-application-overlaid"));
    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.in-form-menu.is-application-overlaid", undefined);
    expect(props.context.port.request).not.toHaveBeenCalledWith(
      "passbolt.in-form-menu.use-passkey",
      expect.anything(),
      expect.anything(),
    );
  });

  it("I should keep the menu open when I cancel the passphrase prompt", async () => {
    expect.assertions(2);
    const props = await renderWithPasskeys();
    props.context.port.addRequestListener("passbolt.in-form-menu.use-passkey", () => {
      throw { name: "UserAbortsOperationError", message: "The dialog has been closed." };
    });
    page.clickItem(0);
    await waitUntil(() =>
      hasRequested(props, "passbolt.in-form-menu.use-passkey", passkeyRequestId, suggestedPasskeys[0].id),
    );
    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(page.informMenuItems[0].classList.contains("processing")).toBe(false);
    expect(props.context.port.request).not.toHaveBeenCalledWith("passbolt.in-form-menu.close");
  });

  it("I should no longer see the passkeys once the page's passkey request ends", async () => {
    expect.assertions(2);
    const props = await renderWithPasskeys();
    expect(page.groupLabels).toStrictEqual(["Passkeys", "Passwords"]);
    props.context.port.addRequestListener("passbolt.in-form-menu.init", () => ({
      inputType: "username",
      inputValue: "",
      suggestedResources: [defaultResourceDto(), defaultResourceDto()],
      passkeyRequestId: null,
      suggestedPasskeys: [],
    }));
    await act(async () => props.context.port.emit("passbolt.passkey.conditional-request-changed"));
    await waitUntil(() => page.groupLabels.length === 0);
    expect(page.informMenuItems.length).toBe(4);
  });
});
