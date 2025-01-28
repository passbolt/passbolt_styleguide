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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import GpgServiceWorkerService, {GPG_KEY_INFO_EVENT} from "./gpgServiceWorkerService";
import {
  adaExternalPrivateGpgKeyEntityDto,
  ed25519ExternalPublicGpgKeyEntityDto
} from "../../../models/entity/gpgkey/externalGpgKeyEntity.test.data";
import ExternalGpgKeyEntity from "../../../models/entity/gpgkey/externalGpgKeyEntity";
import ExternalGpgKeyCollection from "../../../models/entity/gpgkey/externalGpgKeyCollection";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GpgServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new GpgServiceWorkerService(port);
  });

  describe("::keyInfo", () => {
    it("requests the service worker with the expected event and return a gpg key info.", async() => {
      expect.assertions(3);
      const dto = ed25519ExternalPublicGpgKeyEntityDto();
      jest.spyOn(port, "request").mockReturnValue(dto);
      const settings = await service.keyInfo(dto.armored_key);
      expect(port.request).toHaveBeenCalledWith(GPG_KEY_INFO_EVENT, dto.armored_key);
      expect(settings).toBeInstanceOf(ExternalGpgKeyEntity);
      expect(settings.toDto()).toEqual(dto);
    });
  });


  describe("::keysInfo", () => {
    it("requests the service worker with the expected event and return multiple gpg keys info.", async() => {
      expect.assertions(5);
      const dto1 = ed25519ExternalPublicGpgKeyEntityDto();
      const dto2 = adaExternalPrivateGpgKeyEntityDto();
      const dtos = [dto1, dto2];
      jest.spyOn(port, "request").mockImplementation((data, armoredKey) => dtos.find(dto => dto.armored_key === armoredKey));
      const keysInfo = await service.keysInfo([dto1.armored_key, dto2.armored_key]);
      expect(port.request).toHaveBeenCalledTimes(2);
      expect(port.request).toHaveBeenCalledWith(GPG_KEY_INFO_EVENT, dto1.armored_key);
      expect(port.request).toHaveBeenCalledWith(GPG_KEY_INFO_EVENT, dto1.armored_key);
      expect(keysInfo).toBeInstanceOf(ExternalGpgKeyCollection);
      expect(keysInfo.toDto()).toEqual(dtos);
    });
  });
});
