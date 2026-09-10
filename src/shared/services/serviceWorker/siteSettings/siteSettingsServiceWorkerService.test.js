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
 * @since         6.0.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import SiteSettingsServiceWorkerService from "./siteSettingsServiceWorkerService";
import { defaultProSiteSettings } from "../../../models/entity/siteSettings/siteSettingsEntity.test.data";
import SiteSettingsEntity from "../../../models/entity/siteSettings/siteSettingsEntity";

describe("SiteSettingsServiceWorkerService", () => {
  describe("::getOrFind", () => {
    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(4);

      const event = "passbolt.site-settings.get-or-find";
      const dto = defaultProSiteSettings();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new SiteSettingsServiceWorkerService(port);
      const entity = await service.getOrFind();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(entity).toBeInstanceOf(SiteSettingsEntity);
      expect(entity.toDto()).toStrictEqual(dto);
    });
  });

  describe("::findAndUpdate", () => {
    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(4);

      const event = "passbolt.site-settings.find-and-update";
      const dto = defaultProSiteSettings();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new SiteSettingsServiceWorkerService(port);
      const entity = await service.findAndUpdate();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(entity).toBeInstanceOf(SiteSettingsEntity);
      expect(entity.toDto()).toStrictEqual(dto);
    });
  });
});
