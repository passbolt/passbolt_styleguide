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
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

import SubscriptionEntity, { ENTITY_NAME } from "./subscriptionEntity";
import { defaultSubscriptionDto, minimalSubscriptionDto } from "./subscriptionEntity.test.data";

describe("Subscription entity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SubscriptionEntity.ENTITY_NAME, SubscriptionEntity.getSchema());
    });

    it("validates customer_id property", () => {
      assertEntityProperty.string(SubscriptionEntity, "customer_id");
    });

    it("validates subscription_id property", () => {
      assertEntityProperty.string(SubscriptionEntity, "subscription_id");
      assertEntityProperty.required(SubscriptionEntity, "subscription_id");
    });

    it("validates users property", () => {
      assertEntityProperty.integer(SubscriptionEntity, "users");
      assertEntityProperty.required(SubscriptionEntity, "users");
    });

    it("validates email property", () => {
      assertEntityProperty.string(SubscriptionEntity, "email");
      assertEntityProperty.emailFormat(SubscriptionEntity, "email");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SubscriptionEntity, "created");
      assertEntityProperty.dateTime(SubscriptionEntity, "created");
      assertEntityProperty.required(SubscriptionEntity, "created");
    });

    it("validates expiry property", () => {
      assertEntityProperty.string(SubscriptionEntity, "expiry");
      assertEntityProperty.dateTime(SubscriptionEntity, "expiry");
      assertEntityProperty.required(SubscriptionEntity, "expiry");
    });

    it("validates data property", () => {
      assertEntityProperty.string(SubscriptionEntity, "data");
      assertEntityProperty.required(SubscriptionEntity, "data");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal DTO is provided", () => {
      expect.assertions(1);
      const dto = minimalSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor works if complete DTO is provided", () => {
      expect.assertions(1);
      const dto = defaultSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::getters", () => {
    it("expiry should return the right value", () => {
      expect.assertions(1);
      const dto = defaultSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.expiry).toStrictEqual(dto.expiry);
    });

    it("should return its entity name", () => {
      expect.assertions(1);
      expect(SubscriptionEntity.ENTITY_NAME).toStrictEqual(ENTITY_NAME);
    });
  });

  describe("::toJSON", () => {
    it("should return the minimal DTO object", () => {
      expect.assertions(1);
      const dto = minimalSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toJSON()).toStrictEqual(dto);
    });

    it("should return the complete DTO object", () => {
      expect.assertions(1);
      const dto = defaultSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toJSON()).toStrictEqual(dto);
    });
  });

  describe("::toDto", () => {
    it("should return the minimal DTO object", () => {
      expect.assertions(1);
      const dto = minimalSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("should return the complete DTO object", () => {
      expect.assertions(1);
      const dto = defaultSubscriptionDto();
      const entity = new SubscriptionEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });
  });
});
