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
import { defaultProps, defaultPropsWithMissingMetadataKey } from "./DisplayInformMenu.test.data";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultPasswordPoliciesDto } from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import { waitFor } from "@testing-library/dom";
import expect from "expect";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV6Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto,
} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("See the Inform Menu", () => {
  describe("As a signed-in user I should see menu items", () => {
    it("I should see all menu items for username with not value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should see all menu items for username with value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "test@passbolt.com", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should see all menu items for password with not value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "password", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(5);
    });

    it("I should see all menu items for password with value in input", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "password", inputValue: "thisisapassword", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should  see create credentials menu items if I am missing the shared metadata key but it is not enforced", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey({
        metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
      });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(4);
    });

    it("I should not see create credentials menu items if metadata type setting is not loaded", async () => {
      expect.assertions(1);
      const props = defaultProps({ metadataTypeSettings: null });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if I am missing the shared metadata key and it is enforced", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if metadata type setting allow only v5 and resource type has only v4", async () => {
      expect.assertions(1);
      const metadataTypeSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({ metadataTypeSettings, resourceTypes });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "username", inputValue: "test@passbolt.com", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see create credentials menu items if metadata type setting allow only v4 and resource type has only v5", async () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({ resourceTypes });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "password", inputValue: "", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see save credentials menu items if metadata type setting is not loaded", async () => {
      expect.assertions(1);
      const props = defaultProps({ metadataTypeSettings: null });
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "password", inputValue: "thisisapassword", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });

    it("I should not see save credentials menu items if I am missing shared metadata keys", async () => {
      expect.assertions(1);
      const props = defaultPropsWithMissingMetadataKey();
      const resources = [defaultResourceDto(), defaultResourceDto()];
      const configuration = { inputType: "password", inputValue: "thisisapassword", suggestedResources: resources };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => configuration);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultPasswordPoliciesDto());

      const page = new DisplayInFormMenuTestPage(props);
      await waitFor(() => {});

      expect(page.informMenuItems.length).toBe(3);
    });
  });
});
