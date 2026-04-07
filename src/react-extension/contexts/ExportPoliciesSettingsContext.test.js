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
 * @since         5.10.0
 */

import ExportPoliciesSettingsEntity from "../../shared/models/entity/exportSettings/ExportPoliciesSettingsEntity";
import { defaultExportPoliciesSettingsDto } from "../../shared/models/entity/exportSettings/ExportPoliciesSettingsEntity.test.data";
import { defaultAppContext } from "./ExtAppContext.test.data";
import { ExportPoliciesSettingsContextProvider } from "./ExportPoliciesSettingsContext";
import mockComponentSetState from "../test/mock/components/React/mockSetState";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ExportPoliciesSettingsContextProvider", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(2);

      const props = { context: defaultAppContext() };

      const context = new ExportPoliciesSettingsContextProvider(props);
      mockComponentSetState(context);

      expect(context.runningGetSettingsPromise).toBeNull();
      expect(context.state).toMatchObject({
        getSettings: expect.any(Function),
        exportPoliciesSettings: null,
      });
    });
  });

  describe("::getSettings", () => {
    it("should return null and trigger a load when settings are not initialised", async () => {
      expect.assertions(3);

      const props = { context: defaultAppContext() };
      const context = new ExportPoliciesSettingsContextProvider(props);
      mockComponentSetState(context);

      const settingsDto = defaultExportPoliciesSettingsDto();
      jest
        .spyOn(context.exportPoliciesSettingsServiceWorkerService, "getSettings")
        .mockResolvedValue(new ExportPoliciesSettingsEntity(settingsDto));

      const settings = context.getSettings();
      await waitFor(() => {});

      expect(settings).toBeNull();
      expect(context.exportPoliciesSettingsServiceWorkerService.getSettings).toHaveBeenCalledTimes(1);
      expect(context.state.exportPoliciesSettings).toStrictEqual(new ExportPoliciesSettingsEntity(settingsDto));
    });

    it("should return the entity when settings are already initialised", () => {
      expect.assertions(2);

      const settingsDto = defaultExportPoliciesSettingsDto();
      const props = { context: defaultAppContext() };
      const context = new ExportPoliciesSettingsContextProvider(props);
      mockComponentSetState(context);

      jest
        .spyOn(context.exportPoliciesSettingsServiceWorkerService, "getSettings")
        .mockResolvedValue(new ExportPoliciesSettingsEntity(settingsDto));

      // Simulate already loaded settings
      context.state.exportPoliciesSettings = new ExportPoliciesSettingsEntity(settingsDto);

      const settings = context.getSettings();

      expect(settings).toStrictEqual(new ExportPoliciesSettingsEntity(settingsDto));
      expect(context.exportPoliciesSettingsServiceWorkerService.getSettings).not.toHaveBeenCalled();
    });
  });

  describe("::loadSettings", () => {
    it("should call the service worker service to fetch the settings", async () => {
      expect.assertions(2);

      const props = { context: defaultAppContext() };
      const context = new ExportPoliciesSettingsContextProvider(props);
      mockComponentSetState(context);

      const settingsDto = defaultExportPoliciesSettingsDto();
      jest
        .spyOn(context.exportPoliciesSettingsServiceWorkerService, "getSettings")
        .mockResolvedValue(new ExportPoliciesSettingsEntity(settingsDto));

      await context.loadSettings();

      expect(context.exportPoliciesSettingsServiceWorkerService.getSettings).toHaveBeenCalledTimes(1);
      expect(context.state.exportPoliciesSettings).toStrictEqual(new ExportPoliciesSettingsEntity(settingsDto));
    });

    it("should deduplicate concurrent calls", async () => {
      expect.assertions(2);

      const props = { context: defaultAppContext() };
      const context = new ExportPoliciesSettingsContextProvider(props);
      mockComponentSetState(context);

      const settingsDto = defaultExportPoliciesSettingsDto();
      jest
        .spyOn(context.exportPoliciesSettingsServiceWorkerService, "getSettings")
        .mockResolvedValue(new ExportPoliciesSettingsEntity(settingsDto));

      const promise1 = context.loadSettings();
      const promise2 = context.loadSettings();
      await Promise.all([promise1, promise2]);

      expect(context.exportPoliciesSettingsServiceWorkerService.getSettings).toHaveBeenCalledTimes(1);
      expect(context.state.exportPoliciesSettings).toStrictEqual(new ExportPoliciesSettingsEntity(settingsDto));
    });
  });
});
