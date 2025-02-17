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

import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import PassboltResponsePaginationHeaderEntity from "./PassboltResponsePaginationHeaderEntity";
import {defaultPassboltResponsePaginationHeaderDto} from "./PassboltResponsePaginationHeaderEntity.test.data";

describe("PassboltResponsePaginationHeaderEntity", () => {
  describe("PassboltResponsePaginationHeaderEntity::getSchema", () => {
    it("validates count property", () => {
      assertEntityProperty.integer(PassboltResponsePaginationHeaderEntity, "count");
      assertEntityProperty.minimum(PassboltResponsePaginationHeaderEntity, "count", 0);
      assertEntityProperty.required(PassboltResponsePaginationHeaderEntity, "count");
    });

    it("validates limit property", () => {
      assertEntityProperty.integer(PassboltResponsePaginationHeaderEntity, "limit");
      assertEntityProperty.minimum(PassboltResponsePaginationHeaderEntity, "limit", 0);
      assertEntityProperty.required(PassboltResponsePaginationHeaderEntity, "limit");
    });

    it("validates page property", () => {
      assertEntityProperty.integer(PassboltResponsePaginationHeaderEntity, "page");
      assertEntityProperty.minimum(PassboltResponsePaginationHeaderEntity, "page", 0);
      assertEntityProperty.required(PassboltResponsePaginationHeaderEntity, "page");
    });
  });

  describe("PassboltResponsePaginationHeaderEntity:constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(1);
      const dto = defaultPassboltResponsePaginationHeaderDto();
      const entity = new PassboltResponsePaginationHeaderEntity(dto);
      expect(entity).toBeInstanceOf(PassboltResponsePaginationHeaderEntity);
    });
  });
});
