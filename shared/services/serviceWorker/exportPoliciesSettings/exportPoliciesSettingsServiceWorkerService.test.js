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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ExportPoliciesSettingsEntity from "../../../models/entity/exportSettings/ExportPoliciesSettingsEntity";
import ExportPoliciesSettingsServiceWorkerService from "./exportPoliciesSettingsServiceWorkerService";
import { defaultExportPoliciesSettingsDto } from "../../../models/entity/exportSettings/ExportPoliciesSettingsEntity.test.data";
import EntityValidationError from "../../../models/entity/abstract/entityValidationError";

describe("ExportPoliciesSettingsServiceWorkerService", () => {
  describe("::getSettings", () => {
    const event = "passbolt.export-policies.get";

    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(4);

      const dto = defaultExportPoliciesSettingsDto();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new ExportPoliciesSettingsServiceWorkerService(port);
      const settings = await service.getSettings();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(settings).toBeInstanceOf(ExportPoliciesSettingsEntity);
      expect(settings.toDto()).toStrictEqual(dto);
    });

    it("should throw TypeError if settings is not a ExportPoliciesSettingsEntity", async () => {
      expect.assertions(1);

      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new ExportPoliciesSettingsServiceWorkerService(port);

      await expect(() => service.getSettings()).rejects.toThrow(EntityValidationError);
    });
  });
});
