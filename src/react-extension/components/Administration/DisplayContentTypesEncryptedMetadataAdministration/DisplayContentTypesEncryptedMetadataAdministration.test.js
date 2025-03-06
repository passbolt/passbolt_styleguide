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
 * @since         4.11.0
 */

import {
  defaultProps,
  resourceTypesDeletedProps
} from "./DisplayContentTypesEncryptedMetadataAdministration.test.data";
import {waitForTrue} from '../../../../../test/utils/waitFor';
import DisplayContentTypesEncryptedMetadataAdministrationPage
  from "./DisplayContentTypesEncryptedMetadataAdministration.test.page";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV50FreshDto, defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {waitFor} from "@testing-library/react";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";

describe("DisplayContentTypesEncryptedMetadataAdministration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the content type encrypted metadata administration", () => {
    it("As a signed-in administrator I can see the settings", async() => {
      expect.assertions(15);
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Encrypted metadata");
      expect(page.allowCreationOfV5ResourcesInput.checked).toBe(false);
      expect(page.allowCreationOfV5ResourcesError).toBeNull();
      expect(page.allowCreationOfV5ResourcesWarning).toBeNull();
      expect(page.allowCreationOfV4ResourcesInput.checked).toBe(true);
      expect(page.allowCreationOfV4ResourcesError).toBeNull();
      expect(page.allowCreationOfV4ResourcesWarning).toBeNull();
      expect(page.defaultResourceTypesV5Input.checked).toBe(false);
      expect(page.defaultResourceTypesV5Error).toBeNull();
      expect(page.defaultResourceTypesV5Warning).toBeNull();
      expect(page.defaultResourceTypesV4Input.checked).toBe(true);
      expect(page.allowV4V5UpgradeInput.checked).toBe(false);
      expect(page.allowV5V4DowngradeInput.checked).toBe(false);
      expect(page.warningMessagesCount).toBe(0);
      expect(page.errorMessagesCount).toBe(0);
    });
  });

  describe("As a signed-in administrator, I should be warned if the settings I configure can later generate issues", () => {
    it("displays warning when v4 resource creation is allowed and v4 resource types are deleted", async() => {
      expect.assertions(6);
      const props = resourceTypesDeletedProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto())
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(2);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowCreationOfV4ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV4ResourcesWarning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.defaultResourceTypesV4Warning).not.toBeNull();
      expect(page.defaultResourceTypesV4Warning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
    });

    it("displays warning when v5 resource creation is allowed and v5 resource types are deleted", async() => {
      expect.assertions(6);
      const props = resourceTypesDeletedProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto())
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(2);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowCreationOfV5ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV5ResourcesWarning.textContent).toContain("All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.defaultResourceTypesV5Warning).not.toBeNull();
      expect(page.defaultResourceTypesV5Warning.textContent).toContain("All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
    });

    it("displays warning when v5 and v4 resource creation are allowed and both version resource types are deleted", async() => {
      expect.assertions(12);
      const props = resourceTypesDeletedProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto())
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(5);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowCreationOfV4ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV4ResourcesWarning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.allowCreationOfV5ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV5ResourcesWarning.textContent).toContain("All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.defaultResourceTypesV4Warning).not.toBeNull();
      expect(page.defaultResourceTypesV4Warning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.allowV4V5UpgradeWarning).not.toBeNull();
      expect(page.allowV4V5UpgradeWarning.textContent).toContain("All encrypted metadata resource types were previously disabled. Re-enable them if you want users to upgrade their resources.");
      expect(page.allowV5V4DowngradeWarning).not.toBeNull();
      expect(page.allowV5V4DowngradeWarning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to downgrade their resources.");
    });

    it("displays warning when resource upgrade is allowed and v5 resource creation is not allowed", async() => {
      expect.assertions(4);
      const props = defaultProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto({allow_v4_v5_upgrade: true}))
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(1);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowV4V5UpgradeWarning).not.toBeNull();
      expect(page.allowV4V5UpgradeWarning.textContent).toContain("Encrypted metadata should be enabled to allow users to upgrade their resources.");
    });

    it("displays warning when resource downgrade is allowed and v4 resource creation is not allowed", async() => {
      expect.assertions(4);
      const props = defaultProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto({allow_v5_v4_downgrade: true}))
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(1);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowV5V4DowngradeWarning).not.toBeNull();
      expect(page.allowV5V4DowngradeWarning.textContent).toContain("Legacy cleartext metadata should be enabled to allow users to downgrade their resources.");
    });

    it("displays warning when there are no active metadatakeys", async() => {
      expect.assertions(4);
      const props = defaultProps({
        metadataKeysServiceWorkerService: {
          findAll: () => new MetadataKeysCollection([]),
        },
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto()),
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.warningMessagesCount).toBe(1);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowCreationOfV5ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV5ResourcesWarning.textContent).toContain("A metadata key should be enabled to allow users to create resources of this type.");
    });
  });

  describe("As a signed-in administrator, I should not be able to save if the settings I configure do not validate", () => {
    it("displays error when v4 resource is default and v4 resources creation is not allowed", async() => {
      expect.assertions(6);
      const props = defaultProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto({allow_creation_of_v4_resources: false}), {validate: false})
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(page.warningMessagesCount).toBe(0);
      expect(page.errorMessagesCount).toBe(2);
      expect(page.allowCreationOfV4ResourcesError).not.toBeNull();
      expect(page.allowCreationOfV4ResourcesError.textContent).toContain("Legacy cleartext metadata must be enabled to set it as the default type.");
      expect(page.defaultResourceTypesV4Error).not.toBeNull();
      expect(page.defaultResourceTypesV4Error.textContent).toContain("Legacy cleartext metadata must be enabled to set it as the default type.");
    });

    it("displays error when v5 resource is default and v5 resources creation is not allowed", async() => {
      expect.assertions(6);
      const props = defaultProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto({allow_creation_of_v5_resources: false}), {validate: false})
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(page.warningMessagesCount).toBe(0);
      expect(page.errorMessagesCount).toBe(2);
      expect(page.allowCreationOfV5ResourcesError).not.toBeNull();
      expect(page.allowCreationOfV5ResourcesError.textContent).toContain("Encrypted metadata must be enabled to set it as the default type.");
      expect(page.defaultResourceTypesV5Error).not.toBeNull();
      expect(page.defaultResourceTypesV5Error.textContent).toContain("Encrypted metadata must be enabled to set it as the default type.");
    });
  });

  describe("As a signed-in administrator, I should be able to modify the settings ", () => {
    it("displays a changes warning message when I modify the settings", async() => {
      expect.assertions(2);
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toEqual("Don't forget to save your settings to apply your modification.");
    });

    it("updates warning on form settings changes", async() => {
      expect.assertions(6);
      const props = resourceTypesDeletedProps({
        metadataSettingsServiceWorkerService: {
          findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto())
        },
      });
      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.warningMessagesCount).toBe(2);
      expect(page.errorMessagesCount).toBe(0);
      expect(page.allowCreationOfV4ResourcesWarning).not.toBeNull();
      expect(page.allowCreationOfV4ResourcesWarning.textContent).toContain("All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
      expect(page.defaultResourceTypesV5Warning).not.toBeNull();
      expect(page.defaultResourceTypesV5Warning.textContent).toContain("All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.");
    });

    it("blocks the form edition when loading the settings", async() => {
      expect.assertions(6);
      let requestGetPromiseResolver;
      const props = defaultProps();
      jest.spyOn(props.metadataSettingsServiceWorkerService, "findTypesSettings")
        .mockImplementation(() => new Promise(resolve => { requestGetPromiseResolver = resolve; }));

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.defaultResourceTypesV4Input.checked).toBe(true);
      expect(page.defaultResourceTypesV5Input.checked).toBe(false);
      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.defaultResourceTypesV4Input.checked).toBe(true);
      expect(page.defaultResourceTypesV5Input.checked).toBe(false);

      requestGetPromiseResolver(new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()));
      await waitFor(() => {});

      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.defaultResourceTypesV4Input.checked).toBe(false);
      expect(page.defaultResourceTypesV5Input.checked).toBe(true);
    });

    it("blocks the form edition when saving", async() => {
      expect.assertions(6);
      let requestSavePromiseResolver, requestSaveSettings;
      const props = defaultProps();
      jest.spyOn(props.metadataSettingsServiceWorkerService, "saveTypesSettings").mockImplementation(settings => {
        requestSaveSettings = settings;
        return new Promise(resolve => { requestSavePromiseResolver = resolve; });
      });

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(page.defaultResourceTypesV4Input.checked).toBe(true);
      expect(page.defaultResourceTypesV5Input.checked).toBe(false);
      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.defaultResourceTypesV4Input.checked).toBe(true);
      expect(page.defaultResourceTypesV5Input.checked).toBe(false);
      await requestSavePromiseResolver(new MetadataTypesSettingsEntity(requestSaveSettings.toDto()));
      await waitFor(() => {});
      await page.clickOnDefaultResourceTypesV5Input();
      expect(page.defaultResourceTypesV4Input.checked).toBe(false);
      expect(page.defaultResourceTypesV5Input.checked).toBe(true);
    });
  });

  describe("As a signed-in administrator, I should be able to save the settings ", () => {
    it("requests the browser extension to save the original settings", async() => {
      expect.assertions(2);
      const expectedSettingsDto = defaultMetadataTypesSettingsV4Dto();
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(props.metadataSettingsServiceWorkerService.saveTypesSettings).toHaveBeenCalledTimes(1);
      expect(props.metadataSettingsServiceWorkerService.saveTypesSettings).toHaveBeenCalledWith(expect.objectContaining({
        _props: expect.objectContaining(expectedSettingsDto)
      }));
    });

    it("requests the browser extension to save updated settings", async() => {
      expect.assertions(2);
      const expectedSettingsDto = defaultMetadataTypesSettingsV50FreshDto();
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnDefaultResourceTypesV5Input();
      await page.clickOnAllowCreationOfV5ResourcesInput();
      await page.clickOnAllowCreationOfV4ResourcesInput();

      await page.submitForm();
      expect(props.metadataSettingsServiceWorkerService.saveTypesSettings).toHaveBeenCalledTimes(1);
      expect(props.metadataSettingsServiceWorkerService.saveTypesSettings).toHaveBeenCalledWith(expect.objectContaining({
        _props: expect.objectContaining(expectedSettingsDto)
      }));
    });

    it("displays a success snackbar after successful saving", async() => {
      expect.assertions(1);
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    });

    it("hides apply changes form banner after saving", async() => {
      expect.assertions(1);
      const props = defaultProps();

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnDefaultResourceTypesV5Input();
      await page.clickOnAllowCreationOfV5ResourcesInput();
      await page.submitForm();
      expect(page.formBanner).toBeNull();
    });

    it("displays an unexpected error dialog if the settings cannot be saved", async() => {
      expect.assertions(1);
      const error = new Error("Unexpected test error");
      const props = defaultProps();
      jest.spyOn(props.metadataSettingsServiceWorkerService, "saveTypesSettings").mockImplementation(() => {
        throw error;
      });

      const page = new DisplayContentTypesEncryptedMetadataAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });
  });
});
