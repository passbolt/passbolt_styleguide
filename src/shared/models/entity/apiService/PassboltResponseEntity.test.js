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
import PassboltResponseEntity from "./PassboltResponseEntity";
import PassboltResponsePaginationHeaderEntity from "./PassboltResponsePaginationHeaderEntity";
import {defaultPassboltResponseDto} from "./PassboltResponseEntity.test.data";
import {defaultPassboltResponseHeaderDto} from "./PassboltResponseHeaderEntity.test.data";

describe("PassboltResponseEntity", () => {
  describe("PassboltResponseEntity::getSchema", () => {
    it("validates header property", () => {
      assertEntityProperty.integer(PassboltResponsePaginationHeaderEntity, "count");
      assertEntityProperty.minimum(PassboltResponsePaginationHeaderEntity, "count", 0);
      assertEntityProperty.required(PassboltResponsePaginationHeaderEntity, "count");
    });

    it("validates body property", () => {
      assertEntityProperty.integer(PassboltResponsePaginationHeaderEntity, "limit");
      assertEntityProperty.minimum(PassboltResponsePaginationHeaderEntity, "limit", 0);
      assertEntityProperty.required(PassboltResponsePaginationHeaderEntity, "limit");
    });

    it("validates header property", () => {
      const dto = defaultPassboltResponseDto();
      const successScenarios = [
        {scenario: "valid header object", value: defaultPassboltResponseHeaderDto()},
      ];
      const failScenarios = [
        {scenario: "invalid header type: integer", value: 42},
      ];
      assertEntityProperty.required(PassboltResponseEntity, "header");
      assertEntityProperty.assertAssociation(PassboltResponseEntity, "header", dto, successScenarios, failScenarios);
    });
  });

  describe("PassboltResponseEntity:constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(1);
      const dto = defaultPassboltResponseDto();
      const entity = new PassboltResponseEntity(dto);
      expect(entity).toBeInstanceOf(PassboltResponseEntity);
    });
  });
});
