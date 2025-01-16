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
import MetadataKeysServiceWorkerService, {METADATA_KEYS_FIND_ALL_EVENT} from "./metadataKeysServiceWorkerService";
import {defaultMetadataKeysDtos} from "../../../models/entity/metadata/metadataKeysCollection.test.data";
import MetadataKeysCollection from "../../../models/entity/metadata/metadataKeysCollection";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MetadataKeysServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new MetadataKeysServiceWorkerService(port);
  });

  describe("::findAll", () => {
    it("requests the service worker with the expected event and return metadata keys collection.", async () => {
      expect.assertions(3);
      const dto = defaultMetadataKeysDtos();
      jest.spyOn(port, "request").mockReturnValue(dto);
      const settings = await service.findAll();
      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_FIND_ALL_EVENT);
      expect(settings).toBeInstanceOf(MetadataKeysCollection);
      expect(settings.toDto()).toEqual(dto);
    });
  });
});
