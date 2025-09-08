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

import DisplayContentTypesMetadataKeyAdministrationPage from "./DisplayContentTypesMetadataKeyAdministration.test.page";
import {
  defaultProps,
  defaultSettingsAndMultipleActiveKeysProps,
  defaultSettingsAndMultipleKeysProps,
  defaultSettingsAndSingleActiveKeyProps
} from "./DisplayContentTypesMetadataKeyAdministration.test.data";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {
  defaultMetadataKeysSettingsDto
} from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import {waitFor} from "@testing-library/react";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdminUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import {v4 as uuidv4} from "uuid";

describe("DisplayContentTypesMetadataKeyAdministration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the content type metadata key administration", () => {
    it("As a signed-in administrator I can see the default settings", async() => {
      expect.assertions(11);
      const props = defaultProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Metadata key");
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);
      expect(page.metadataActiveKeysWrapper).toBeNull();
      expect(page.noMetadataActiveKeysWrapper).not.toBeNull();
      expect(page.noMetadataActiveKeysWrapper.textContent).toContain("You need to generate a new shared key to enable encrypted metadata.");
      expect(page.generateKeyButton).not.toBeNull();
      expect(page.generateKeyButton.textContent).toContain("Generate key");
      expect(page.metadataExpiredKeysWrapper).toBeNull();
    });

    it("As a signed-in administrator I can see the settings configured with an active metadata key.", async() => {
      expect.assertions(12);
      const props = defaultSettingsAndSingleActiveKeyProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Metadata key");
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);
      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00"));
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).toBeNull();
    });

    it("As a signed-in administrator I can see the settings configured with multiple active metadata keys.", async() => {
      expect.assertions(15);
      const props = defaultSettingsAndMultipleActiveKeysProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Metadata key");
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);
      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00"));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.length.toString());
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).toBeNull();
    });

    it("As a signed-in administrator I can see the settings configured with multiple active and expired metadata keys.", async() => {
      expect.assertions(24);
      const props = defaultSettingsAndMultipleKeysProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Metadata key");
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);
      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00"));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.betty.length.toString());
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).not.toBeNull();
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.carol.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.carol.algorithm.toLowerCase());
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.carol.length.toString());
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00")); // created date
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-03-04T13:59:11+00:00")); // expired date
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.algorithm.toLowerCase());
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.length.toString());
      expect(page.metadataExpiredKeysWrapper.textContent).toContain(formatDateTimeAgo("2023-10-04T15:11:45+00:00")); // expired date
    });
  });

  describe("As a signed-in administrator, I should be able to modify the settings ", () => {
    it("displays a changes warning message when I modify the settings", async() => {
      expect.assertions(2);
      const props = defaultProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnDisallowUsageOfPersonalKeysInput();
      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("blocks the form edition when loading the settings", async() => {
      expect.assertions(12);
      let requestGetPromiseResolver;
      const props = defaultProps();
      jest.spyOn(props.metadataSettingsServiceWorkerService, "findKeysSettings")
        .mockImplementation(() => new Promise(resolve => { requestGetPromiseResolver = resolve; }));

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);
      await page.clickOnDisallowUsageOfPersonalKeysInput();
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(true);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(false);

      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);
      await page.clickOnAllowZeroKnowledgeInput();
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(true);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(false);

      requestGetPromiseResolver(new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()));
      await waitFor(() => {});

      await page.clickOnDisallowUsageOfPersonalKeysInput();
      expect(page.allowUsageOfPersonalKeysInput.checked).toBe(false);
      expect(page.disallowUsageOfPersonalKeysInput.checked).toBe(true);
      await page.clickOnAllowZeroKnowledgeInput();
      expect(page.disableZeroKnowledgeKeyShareInput.checked).toBe(false);
      expect(page.enableZeroKnowledgeKeyShareInput.checked).toBe(true);
    });
  });

  describe("As a signed-in administrator, I can generate a shared metadata key if none are active", () => {
    it("displays a changes warning message when I generate a key", async() => {
      expect.assertions(2);
      const props = defaultProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnGenerateKeyButton();
      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("displays the new key details when I generate a key", async() => {
      expect.assertions(7);
      const props = defaultProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnGenerateKeyButton();

      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain("Pending");
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).toBeNull();
    });

    it("displays an unexpected error dialog if the key cannot be generated", async() => {
      expect.assertions(1);
      const error = new Error("Unexpected test error");
      const props = defaultProps();
      jest.spyOn(props.metadataKeysServiceWorkerService, "generateKeyPair").mockImplementation(() => {
        throw error;
      });

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnGenerateKeyButton();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });

    it("does not display the generate key button if there is already an active key", async() => {
      expect.assertions(1);
      const props = defaultSettingsAndSingleActiveKeyProps();

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
    });
  });

  describe("As a signed-in administrator, I cannot save if the settings does not validate", () => {
    it("displays error messages when there is no active keys and I did not generate one", async() => {
      expect.assertions(5);
      const props = defaultProps();
      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(page.errorMessagesCount).toBe(1);
      expect(page.requiredSharedMetadataKeyError).not.toBeNull();
      expect(page.requiredSharedMetadataKeyError.textContent).toContain("A shared metadata key is required.");
      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toEqual("Warning: A shared metadata key is required to save the metadata keys settings.");
    });

    it("I can see the form disabled if administrator has missing keys", async() => {
      expect.assertions(3);
      const props = defaultProps({context: defaultAdministratorAppContext({loggedInUser: defaultAdminUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})})});

      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());

      expect(page.exists()).toStrictEqual(true);
      expect(page.select('.actions-wrapper button.button.primary').hasAttribute("disabled")).toBeTruthy();

      expect(page.formBanner.textContent).toBe("Warning: You are missing shared metadata keys. Ask another administrator to share them with you to update the metadata keys settings.");
    });
  });

  describe("As a signed-in administrator, I can save the settings", () => {
    it("saves a newly generated key", async() => {
      expect.assertions(10);
      const props = defaultProps();
      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.clickOnGenerateKeyButton();
      await page.submitForm();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The metadata key settings were updated.");
      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.eddsa_ed25519.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00"));
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).toBeNull();
      expect(page.formBanner).toBeNull();
    });

    it("saves again the original settings", async() => {
      expect.assertions(10);
      const props = defaultSettingsAndSingleActiveKeyProps();
      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The metadata key settings were updated.");
      expect(page.metadataActiveKeysWrapper).not.toBeNull();
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.fingerprint.replace(/.{4}/g, '$& '));
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.algorithm.toLowerCase());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(pgpKeys.ada.length.toString());
      expect(page.metadataActiveKeysWrapper.textContent).toContain(formatDateTimeAgo("2022-10-11T08:09:00+00:00"));
      expect(page.noMetadataActiveKeysWrapper).toBeNull();
      expect(page.metadataExpiredKeysWrapper).toBeNull();
      expect(page.formBanner).toBeNull();
    });

    it("displays an unexpected error dialog if the settings cannot be saved", async() => {
      expect.assertions(1);
      const props = defaultSettingsAndSingleActiveKeyProps();
      const error = new Error("Unexpected test error");
      jest.spyOn(props.metadataSettingsServiceWorkerService, "saveKeysSettings").mockImplementation(() => {
        throw error;
      });
      const page = new DisplayContentTypesMetadataKeyAdministrationPage(props);
      await waitForTrue(() => page.exists());
      await page.submitForm();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });
  });
});
