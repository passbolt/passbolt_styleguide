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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import KeyringServiceWorkerService, {
  KEYRING_GET_PUBLIC_KEY_INFO_BY_USER_EVENT,
  KEYRING_SYNC_EVENT,
} from "./keyringServiceWorkerService";
import { ed25519ExternalPublicGpgKeyEntityDto } from "../../../models/entity/gpgkey/externalGpgKeyEntity.test.data";
import ExternalGpgKeyEntity from "../../../models/entity/gpgkey/externalGpgKeyEntity";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("KeyringServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new KeyringServiceWorkerService(port);
  });

  describe("::synchroniseKeyring", () => {
    it("requests the service worker with the expected event.", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request").mockResolvedValue();
      await service.synchroniseKeyring();
      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(KEYRING_SYNC_EVENT);
    });
  });

  describe("::getPublicKeyInformation", () => {
    it("requests the service worker with the expected event and returns an ExternalGpgKeyEntity.", async () => {
      expect.assertions(4);
      const userId = uuidv4();
      const dto = ed25519ExternalPublicGpgKeyEntityDto();
      jest.spyOn(port, "request").mockResolvedValue(dto);
      const keyInfo = await service.getPublicKeyInformation(userId);
      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(KEYRING_GET_PUBLIC_KEY_INFO_BY_USER_EVENT, userId);
      expect(keyInfo).toBeInstanceOf(ExternalGpgKeyEntity);
      expect(keyInfo.toDto()).toEqual(dto);
    });
  });
});
