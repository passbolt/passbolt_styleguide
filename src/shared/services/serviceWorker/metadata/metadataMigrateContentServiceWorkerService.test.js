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
 * @since         4.12.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import PassboltResponsePaginationHeaderEntity from "../../../models/entity/apiService/PassboltResponsePaginationHeaderEntity";
import { defaultPassboltResponsePaginationHeaderDto } from "../../../models/entity/apiService/PassboltResponsePaginationHeaderEntity.test.data";
import MetadataMigrateContentServiceWorkerService, {
  METADATA_FIND_MIGRATION_COUNT_DETAILS_EVENT,
} from "./metadataMigrateContentServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MetadataMigrateContentServiceWorkerService", () => {
  describe("::findCountMetadataMigrateResources", () => {
    it("requests the service worker with the expected event and return the count details.", async () => {
      expect.assertions(4);

      const dto = defaultPassboltResponsePaginationHeaderDto();

      const port = new MockPort();
      jest.spyOn(port, "request").mockReturnValue(dto);

      const service = new MetadataMigrateContentServiceWorkerService(port);
      const countDetails = await service.findCountMetadataMigrateResources();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(METADATA_FIND_MIGRATION_COUNT_DETAILS_EVENT, false);
      expect(countDetails).toBeInstanceOf(PassboltResponsePaginationHeaderEntity);
      expect(countDetails.toDto()).toEqual(dto);
    });

    it("requests the service worker for count details of shared resources only .", async () => {
      expect.assertions(4);

      const dto = defaultPassboltResponsePaginationHeaderDto();

      const port = new MockPort();
      jest.spyOn(port, "request").mockReturnValue(dto);

      const service = new MetadataMigrateContentServiceWorkerService(port);
      const countDetails = await service.findCountMetadataMigrateResources(true);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(METADATA_FIND_MIGRATION_COUNT_DETAILS_EVENT, true);
      expect(countDetails).toBeInstanceOf(PassboltResponsePaginationHeaderEntity);
      expect(countDetails.toDto()).toEqual(dto);
    });
  });
});
