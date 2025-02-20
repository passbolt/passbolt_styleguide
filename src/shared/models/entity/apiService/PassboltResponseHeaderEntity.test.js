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
import PassboltResponseHeaderEntity from "./PassboltResponseHeaderEntity";
import {defaultPassboltResponseHeaderDto} from "./PassboltResponseHeaderEntity.test.data";
import PassboltResponsePaginationHeaderEntity from "./PassboltResponsePaginationHeaderEntity";
import {defaultPassboltResponsePaginationHeaderDto} from "./PassboltResponsePaginationHeaderEntity.test.data";

describe("PassboltResponseHeaderEntity", () => {
  describe("PassboltResponseHeaderEntity::getSchema", () => {
    it("validates pagination property", () => {
      const dto = defaultPassboltResponseHeaderDto();
      const successScenarios = [
        {scenario: "valid pagination object", value: defaultPassboltResponsePaginationHeaderDto()},
        {scenario: "null pagination'", value: null},
      ];
      const failScenarios = [
        {scenario: "invalid pagination type: array", value: []},
        {scenario: "invalid pagination type: integer", value: 42},
      ];
      assertEntityProperty.assertAssociation(PassboltResponseHeaderEntity, "pagination", dto, successScenarios, failScenarios);
      assertEntityProperty.notRequired(PassboltResponseHeaderEntity, "pagination");
    });
  });

  describe("PassboltResponseHeaderEntity:constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(1);
      const dto = defaultPassboltResponseHeaderDto();
      const entity = new PassboltResponseHeaderEntity(dto);
      expect(entity).toBeInstanceOf(PassboltResponseHeaderEntity);
    });
  });

  describe("::pagination", () => {
    it("should return the pagination part of the Passbolt Api Response Header", () => {
      expect.assertions(2);
      const dto = defaultPassboltResponseHeaderDto();
      const entity = new PassboltResponseHeaderEntity(dto);
      expect(entity.pagination).toBeInstanceOf(PassboltResponsePaginationHeaderEntity);
      expect(entity.pagination.toDto()).toStrictEqual(dto.pagination);
    });
  });

  describe("::toDto", () => {
    it("should return a dto with the pagination if any", () => {
      expect.assertions(1);
      const dto = defaultPassboltResponseHeaderDto();
      const entity = new PassboltResponseHeaderEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });
  });
});
