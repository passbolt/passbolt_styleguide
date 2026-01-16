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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import SecretRevisionsSettingsEntity from "../../../models/entity/secretRevision/secretRevisionsSettingsEntity";
import SecretRevisionsSettingsServiceWorkerService from "./secretRevisionsSettingsServiceWorkerService";
import { defaultSecretRevisionsSettingsDto } from "../../../models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";

describe("SecretRevisionsSettingsServiceWorkerService", () => {
  describe("::findSettings", () => {
    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(4);

      const event = "passbolt.secret-revisions.find-settings";
      const dto = defaultSecretRevisionsSettingsDto();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new SecretRevisionsSettingsServiceWorkerService(port);
      const settings = await service.findSettings();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(settings).toBeInstanceOf(SecretRevisionsSettingsEntity);
      expect(settings.toDto()).toStrictEqual(dto);
    });
  });

  describe("::saveSettings", () => {
    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(2);
      const event = "passbolt.secret-revisions.save-settings";
      const entity = new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto());

      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request").mockImplementationOnce(() => entity.toDto());

      const service = new SecretRevisionsSettingsServiceWorkerService(port);
      await service.saveSettings(entity);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, entity);
    });

    it("should assert its parameters", async () => {
      expect.assertions(1);
      const wrongEntity = defaultSecretRevisionsSettingsDto();
      const port = new MockPort();

      const service = new SecretRevisionsSettingsServiceWorkerService(port);
      await expect(() => service.saveSettings(wrongEntity)).rejects.toThrowError();
    });
  });

  describe("::deleteSettings", () => {
    it("should call for the right service worker event and return the right entity", async () => {
      expect.assertions(2);
      const event = "passbolt.secret-revisions.delete-settings";
      const secretRevisions = defaultSecretRevisionsSettingsDto();

      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SecretRevisionsSettingsServiceWorkerService(port);
      await service.deleteSettings(secretRevisions.id);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });
});
