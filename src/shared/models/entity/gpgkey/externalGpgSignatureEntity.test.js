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
 * @since         5.1.0
 */
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import EntitySchema from "../abstract/entitySchema";
import ExternalGpgSignatureEntity from "./externalGpgSignatureEntity";
import {
  adaExternalGpgSignatureEntityDto,
  adminExternalGpgSignatureEntityDto, bettyExternalGpgSignatureEntityDto
} from "./externalGpgSignatureEntity.test.data";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

describe("ExternalGpgSignatureEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ExternalGpgSignatureEntity.name, ExternalGpgSignatureEntity.getSchema());
    });

    it("validates issuer_fingerprint property", () => {
      assertEntityProperty.string(ExternalGpgSignatureEntity, "issuer_fingerprint");
      assertEntityProperty.minLength(ExternalGpgSignatureEntity, "issuer_fingerprint", 40);
      assertEntityProperty.maxLength(ExternalGpgSignatureEntity, "issuer_fingerprint", 40);
      assertEntityProperty.required(ExternalGpgSignatureEntity, "issuer_fingerprint");
    });

    it("validates is_verified property", () => {
      assertEntityProperty.boolean(ExternalGpgSignatureEntity, "is_verified");
      assertEntityProperty.required(ExternalGpgSignatureEntity, "is_verified");
    });

    it("validates created property", () => {
      assertEntityProperty.string(ExternalGpgSignatureEntity, "created");
      assertEntityProperty.dateTime(ExternalGpgSignatureEntity, "created");
      assertEntityProperty.required(ExternalGpgSignatureEntity, "created");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(2);
      const dto = adaExternalGpgSignatureEntityDto();
      const entity = new ExternalGpgSignatureEntity(dto);

      expect(entity._props.issuer_fingerprint).toStrictEqual(dto.issuer_fingerprint);
      expect(entity._props.is_verified).toStrictEqual(dto.is_verified);
    });

    it("constructor fails if issuer fingerprint is malformed", () => {
      expect.assertions(1);
      expect(() => new ExternalGpgSignatureEntity(adminExternalGpgSignatureEntityDto({issuer_fingerprint: "10"}))).toThrowEntityValidationError("issuer_fingerprint", "minLength");
    });

    it("constructor fails if created is not a date", () => {
      expect.assertions(1);
      expect(() => new ExternalGpgSignatureEntity(adminExternalGpgSignatureEntityDto({created: "not a date"}))).toThrowEntityValidationError("created", "format");
    });

    it("constructor fails if is verified is not a boolean", () => {
      expect.assertions(1);
      expect(() => new ExternalGpgSignatureEntity(adminExternalGpgSignatureEntityDto({is_verified: null}))).toThrowEntityValidationError("is_verified", "type");
    });
  });

  describe("::getters", () => {
    it("`issuerFingerprint` should return the right value", () => {
      expect.assertions(1);
      const dto = adaExternalGpgSignatureEntityDto();
      const entity = new ExternalGpgSignatureEntity(dto);

      expect(entity.issuerFingerprint).toStrictEqual(pgpKeys.ada.fingerprint);
    });

    it("`isVerified` should return the right value", () => {
      expect.assertions(2);
      const dto = adaExternalGpgSignatureEntityDto();
      const entity1 = new ExternalGpgSignatureEntity(dto);
      const entity2 = new ExternalGpgSignatureEntity(adaExternalGpgSignatureEntityDto({is_verified: false}));

      expect(entity1.isVerified).toBeTruthy();
      expect(entity2.isVerified).toBeFalsy();
    });

    it("`created` should return the right value", () => {
      expect.assertions(1);
      const dto = bettyExternalGpgSignatureEntityDto();
      const entity = new ExternalGpgSignatureEntity(dto);

      expect(entity.created).toStrictEqual(pgpKeys.betty.created);
    });
  });
});
