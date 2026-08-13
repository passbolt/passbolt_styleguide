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
import SecretServiceWorkerService from "./secretServiceWorkerService";
import { v4 as uuidv4 } from "uuid";
import { defaultSecretDataV5DefaultDto } from "../../../models/entity/secretData/secretDataV5DefaultEntity.test.data";
import UserActiveSessionEntity from "../../../models/entity/session/userActiveSessionEntity";
import {
  minimalUserActiveSessionDto,
  offlineUserActiveSessionDto,
} from "../../../models/entity/session/userActiveSessionEntity.test.data";

describe("SecretServiceWorkerService", () => {
  describe("::findAllByResourceIdForDisplay", () => {
    it("should call for the right service worker event and return the right entity when user active session is online", async () => {
      expect.assertions(4);

      const event = "passbolt.secret.find-by-resource-id";
      const dto = defaultSecretDataV5DefaultDto();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const resourceId = uuidv4();
      const service = new SecretServiceWorkerService(port, new UserActiveSessionEntity(minimalUserActiveSessionDto()));
      const secretDto = await service.findByResourceId(resourceId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, resourceId);
      expect(secretDto).toBeInstanceOf(Object);
      expect(secretDto).toStrictEqual(dto);
    });

    it("should call for the right service worker event and return the right entity when user active session is offline", async () => {
      expect.assertions(4);

      const event = "passbolt.offline.find-secret-by-resource-id";
      const dto = defaultSecretDataV5DefaultDto();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const resourceId = uuidv4();
      const service = new SecretServiceWorkerService(port, new UserActiveSessionEntity(offlineUserActiveSessionDto()));
      const secretDto = await service.findByResourceId(resourceId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, resourceId);
      expect(secretDto).toBeInstanceOf(Object);
      expect(secretDto).toStrictEqual(dto);
    });

    it("should assert its parameters", async () => {
      expect.assertions(1);
      const port = new MockPort();

      const service = new SecretServiceWorkerService(port);
      await expect(() => service.findByResourceId(42)).rejects.toThrow();
    });
  });
});
