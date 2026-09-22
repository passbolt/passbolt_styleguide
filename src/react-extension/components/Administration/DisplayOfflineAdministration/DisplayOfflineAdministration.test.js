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

import { act } from "react";
import DisplayOfflineAdministration from "./DisplayOfflineAdministration.test.page";
import { communityEditionProps, defaultProps } from "./DisplayOfflineAdministration.test.data";
import { defaultOfflineSettingsDtoFromApi } from "../../../../shared/models/entity/offline/offlineSettingsEntity.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

describe("DisplayOfflineAdministration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the offline settings", () => {
    it("displays the page title", async () => {
      expect.assertions(1);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultOfflineSettingsDtoFromApi());

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      expect(page.title.textContent).toBe("Offline mode");
    });

    it("loads the settings using the OfflineModeSettingsServiceWorkerService and enables the toggle", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const settingsDto = defaultOfflineSettingsDtoFromApi();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => settingsDto);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.offline.find-settings");
      expect(page.titleToggle.checked).toBe(true);
    });

    it("hides the form when no settings are returned and disables the toggle", async () => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      expect(page.titleToggle.checked).toBe(false);
      expect(page.sessionDurationSelect).toBeNull();
    });
  });

  describe("As a signed-in administrator of a pro instance I can edit the offline settings", () => {
    it("offers every allowed session duration and data retention period", async () => {
      expect.assertions(4);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });
      await page.clickOnFeature();

      expect(page.isDisabled(page.sessionDurationSelect)).toBe(false);
      expect(page.isDisabled(page.maximumRetentionPeriodSelect)).toBe(false);
      // The select filters the selected value out of its list, hence the default option missing.
      expect(page.optionsOf(page.sessionDurationSelect)).toEqual(["15 minutes", "1 hour", "1 day"]);
      expect(page.optionsOf(page.maximumRetentionPeriodSelect)).toEqual(["1 day", "14 days", "30 days"]);
    });

    it("can change the session duration and the data retention period", async () => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });
      await page.clickOnFeature();
      await page.setSessionDuration("1 hour");
      await page.setMaximumRetentionPeriod("30 days");

      expect(page.selectedValueOf(page.sessionDurationSelect)).toBe("1 hour");
      expect(page.selectedValueOf(page.maximumRetentionPeriodSelect)).toBe("30 days");
    });
  });

  describe("As a signed-in administrator of a community edition instance I cannot edit the offline settings", () => {
    it("pins the settings to 5 minutes and 7 days when enabling the feature", async () => {
      expect.assertions(2);
      const props = communityEditionProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });
      await page.clickOnFeature();

      expect(page.selectedValueOf(page.sessionDurationSelect)).toBe("5 minutes");
      expect(page.selectedValueOf(page.maximumRetentionPeriodSelect)).toBe("7 days");
    });

    it("disables both inputs and offers no other value than the one in use", async () => {
      expect.assertions(4);
      const props = communityEditionProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultOfflineSettingsDtoFromApi());

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      expect(page.isDisabled(page.sessionDurationSelect)).toBe(true);
      expect(page.isDisabled(page.maximumRetentionPeriodSelect)).toBe(true);
      expect(page.optionsOf(page.sessionDurationSelect)).toEqual([]);
      expect(page.optionsOf(page.maximumRetentionPeriodSelect)).toEqual([]);
    });

    it("saves the pinned settings when enabling the feature", async () => {
      expect.assertions(1);
      const props = communityEditionProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);
      jest
        .spyOn(props.context.port, "request")
        .mockImplementationOnce((message, dto) => defaultOfflineSettingsDtoFromApi(dto));

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });
      await page.clickOnFeature();
      await page.save();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.offline.save-settings", {
        max_session_duration: 300,
        data_retention_period: 7,
      });
    });
  });

  describe("As a signed-in administrator, I should see warnings", () => {
    it("displays warning when enabling the feature", async () => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => null);

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual(
        "Don't forget to save your settings to apply your modification.",
      );
    });

    it("displays warning when disabling the feature", async () => {
      expect.assertions(2);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultOfflineSettingsDtoFromApi());

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      await page.clickOnFeature();

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual(
        "Don't forget to save your settings to apply your modification.",
      );
    });

    it("does not display the warning when the form has no change", async () => {
      expect.assertions(1);
      const props = defaultProps();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultOfflineSettingsDtoFromApi());

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      expect(page.formBanner).toBeNull();
    });
  });

  describe("As a signed-in administrator, I should be able to save", () => {
    it("displays an error dialog if the api returns an error during save", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const expectedError = new Error("API ERROR");
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => defaultOfflineSettingsDtoFromApi());
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => {
        throw expectedError;
      });

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      await page.clickOnFeature();
      await page.clickOnFeature();
      await page.save();

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expectedError });
    });

    it("displays an error dialog if the api returns an error during load", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const expectedError = new Error("API ERROR");
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => {
        throw expectedError;
      });

      await act(async () => {
        new DisplayOfflineAdministration(props);
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expectedError });
    });

    it("disables existing settings when toggling off and saving", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const originalSettingsDto = defaultOfflineSettingsDtoFromApi();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => originalSettingsDto);
      jest.spyOn(props.context.port, "request").mockImplementationOnce(jest.fn());

      let page;
      await act(async () => {
        page = new DisplayOfflineAdministration(props);
      });

      await page.clickOnFeature();
      await page.save();

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.offline.delete-settings",
        originalSettingsDto.id,
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The offline settings were updated.");
    });
  });
});
