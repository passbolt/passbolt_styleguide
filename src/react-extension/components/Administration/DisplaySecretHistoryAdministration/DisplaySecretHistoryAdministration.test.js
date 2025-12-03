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
 * @since         5.7.0
 */

import DisplaySecretHistoryAdministration from "./DisplaySecretHistoryAdministration.test.page";
import {defaultProps} from "./DisplaySecretHistoryAdministration.test.data";
import {waitFor} from "@testing-library/react";
import SecretRevisionsSettingsEntity
  from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity";
import {
  defaultSecretRevisionsSettingsDto
} from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {v4 as uuidv4} from "uuid";

describe("DisplaySecretHistoryAdministration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the secret history settings", () => {
    it("As a signed-in administrator I can see the settings", async() => {
      expect.assertions(1);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultSecretRevisionsSettingsDto());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      expect(page.title.textContent).toBe("Secret history");
    });
  });

  describe("As a signed-in administrator, I should see warnings", () => {
    it("Displays warning if settings have changed", async() => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultSecretRevisionsSettingsDto());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.setHistoryLength(5);

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("displays warning if feature has been disabled", async() => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultSecretRevisionsSettingsDto());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("displays warning if feature has been enabled", async() => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => SecretRevisionsSettingsEntity.createFromDefault().toDto());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual("Warning: Don't forget to save your settings to apply your modification.");
    });
  });

  describe("As a signed-in administrator, I should see errors", () => {
    it("displays error on fields if history length is not valid and admin tries to save", async() => {
      expect.assertions(4);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => SecretRevisionsSettingsEntity.createFromDefault().toDto());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();
      await page.setHistoryLength(0);

      await page.save();

      expect(page.historyLengthError).not.toBeNull();
      expect(page.historyLengthError.textContent).toStrictEqual("The history length must be between 1 and 10.");

      await page.setHistoryLength(1);
      expect(page.historyLengthError).toBeNull();

      await page.setHistoryLength(11);
      expect(page.historyLengthError.textContent).toStrictEqual("The history length must be between 1 and 10.");
    });
  });

  describe("As a signed-in administrator, I should see be able to save", () => {
    it("save valid settings", async() => {
      expect.assertions(5);
      const props = defaultProps();
      const expectedSettingsDto = {
        max_revisions: 6, // Should add one for the current revision
        allow_sharing_revisions: false
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => SecretRevisionsSettingsEntity.createFromDefault().toDto());
      jest.spyOn(props.context.port, "request").mockImplementationOnce((requestName, settings) => ({id:  uuidv4(), ...(settings.toDto())}));

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();
      await page.setHistoryLength(5);

      expect(page.formBanner).not.toBeNull();

      await page.save();

      const expectedSettings = new SecretRevisionsSettingsEntity(expectedSettingsDto);

      expect(page.formBanner).toBeNull();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret-revisions.save-settings", expectedSettings);
      expect(page.historyLengthInput.value).toStrictEqual("5");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The secret history settings were updated.");
    });

    it("save and delete valid settings", async() => {
      expect.assertions(5);
      const props = defaultProps();
      const expectedSettingsDto = {
        max_revisions: 6, // Should add one for the current revision
        allow_sharing_revisions: false
      };
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => SecretRevisionsSettingsEntity.createFromDefault().toDto());
      jest.spyOn(props.context.port, "request").mockImplementationOnce((_, settings) => ({...(settings.toDto())}));
      jest.spyOn(props.context.port, "request").mockImplementationOnce(jest.fn());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();
      await page.setHistoryLength(5);

      expect(page.formBanner).not.toBeNull();

      await page.save();

      await page.clickOnFeature();

      await page.save();

      const expectedSettings = new SecretRevisionsSettingsEntity(expectedSettingsDto);

      expect(page.formBanner).toBeNull();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret-revisions.save-settings", expectedSettings);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret-revisions.delete-settings");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenNthCalledWith(2, "The secret history settings were updated.");
    });

    it("delete settings", async() => {
      expect.assertions(4);
      const props = defaultProps();
      const secretRevisions = defaultSecretRevisionsSettingsDto();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => secretRevisions);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(jest.fn());

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();

      await page.save();

      expect(page.formBanner).toBeNull();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret-revisions.delete-settings");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The secret history settings were updated.");
    });

    it("display an error dialog if api sen an error", async() => {
      expect.assertions(4);
      const props = defaultProps();
      const secretRevisions = defaultSecretRevisionsSettingsDto();
      const expectedError = new Error("API ERROR");
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => secretRevisions);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => { throw expectedError; });

      const page = new DisplaySecretHistoryAdministration(props);
      await waitFor(() => {});

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();

      await page.save();

      expect(page.formBanner).not.toBeNull();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret-revisions.delete-settings");
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: expectedError});
    });
  });
});
