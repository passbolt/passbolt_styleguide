/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import each from "jest-each";
import EntitySchema from "../abstract/entitySchema";
import RbacEntity from "./rbacEntity";
import {
  defaultRbacData,
  defaultRbacWithActionData,
  defaultRbacWithAllAssociationData,
  defaultRbacWithUiActionData
} from "./rbacEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";
import {defaultActionData} from "./actionEntity.test.data";
import {defaultUiActionData} from "./uiActionEntity.test.data";

describe("RbacEntity", () => {
  describe("RbacEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(RbacEntity.ENTITY_NAME, RbacEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(6);
      const dto = defaultRbacData();
      const entity = new RbacEntity(dto);
      expect(entity).toBeInstanceOf(RbacEntity);
      expect(entity.id).toEqual(dto.id);
      expect(entity.roleId).toEqual(dto.role_id);
      expect(entity.foreignModel).toEqual(dto.foreign_model);
      expect(entity.foreignId).toEqual(dto.foreign_id);
      expect(entity.controlFunction).toEqual(dto.control_function);
    });

    it("it should instantiate the entity with its associated action", () => {
      expect.assertions(7);
      const dto = defaultRbacWithActionData();
      const entity = new RbacEntity(dto);
      expect(entity).toBeInstanceOf(RbacEntity);
      expect(entity.id).toEqual(dto.id);
      expect(entity.roleId).toEqual(dto.role_id);
      expect(entity.foreignModel).toEqual(dto.foreign_model);
      expect(entity.foreignId).toEqual(dto.foreign_id);
      expect(entity.controlFunction).toEqual(dto.control_function);
      expect(entity.action.toDto()).toEqual(dto.action);
    });

    it("it should instantiate the entity with its associated ui action", () => {
      expect.assertions(7);
      const dto = defaultRbacWithUiActionData();
      const entity = new RbacEntity(dto);
      expect(entity).toBeInstanceOf(RbacEntity);
      expect(entity.id).toEqual(dto.id);
      expect(entity.roleId).toEqual(dto.role_id);
      expect(entity.foreignModel).toEqual(dto.foreign_model);
      expect(entity.foreignId).toEqual(dto.foreign_id);
      expect(entity.controlFunction).toEqual(dto.control_function);
      expect(entity.uiAction.toDto()).toEqual(dto.ui_action);
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'valid uuid', rule: 'format', value: 'invalid-id'},
    ]).describe("Should validate the id", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultRbacData({
          id: test.value
        });
        try {
          new RbacEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('id', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'valid uuid', rule: 'format', value: 'invalid-id'},
    ]).describe("Should validate the role id", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultRbacData({
          role_id: test.value
        });
        try {
          new RbacEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('role_id', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'valid foreign model', rule: 'enum', value: 'invalidForeignModel'},
    ]).describe("Should validate the foreign model", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultRbacData({
          foreign_model: test.value
        });
        try {
          new RbacEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('foreign_model', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'valid uuid', rule: 'format', value: 'invalid-id'},
    ]).describe("Should validate the foreign id", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultRbacData({
          foreign_id: test.value
        });
        try {
          new RbacEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('foreign_id', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'enum', rule: 'enum', value: 'invalid-control-function'},
    ]).describe("Should validate the control function", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultRbacData({
          control_function: test.value
        });
        try {
          new RbacEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('control_function', test.rule)).toBeTruthy();
        }
      });
    });

    it('Should not accept invalid associated action', async() => {
      expect.assertions(2);
      const dto = defaultRbacData({
        action: defaultActionData({id: "invalid-id"})
      });
      try {
        new RbacEntity(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error.hasError('id', 'format')).toBeTruthy();
      }
    });

    it('Should not accept invalid associated ui action', async() => {
      expect.assertions(2);
      const dto = defaultRbacData({
        action: defaultUiActionData({id: "invalid-id"})
      });
      try {
        new RbacEntity(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error.hasError('id', 'format')).toBeTruthy();
      }
    });
  });

  describe("RbacEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = [
        "id",
        "role_id",
        "foreign_model",
        "foreign_id",
        "control_function"
      ];

      const dto = defaultRbacData();
      const entity = new RbacEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(keys).toEqual(expectedKeys);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
    });

    it("should return the expected properties containing the associated action.", () => {
      expect.assertions(2);
      const expectedKeys = [
        "id",
        "role_id",
        "foreign_model",
        "foreign_id",
        "control_function",
        "action"
      ];

      const dto = defaultRbacWithActionData();
      const entity = new RbacEntity(dto);
      const resultDto = entity.toDto({action: true});
      const keys = Object.keys(resultDto);
      expect(keys).toEqual(expectedKeys);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
    });

    it("should return the expected properties containing the associated ui action.", () => {
      expect.assertions(2);
      const expectedKeys = [
        "id",
        "role_id",
        "foreign_model",
        "foreign_id",
        "control_function",
        "ui_action"
      ];

      const dto = defaultRbacWithUiActionData();
      const entity = new RbacEntity(dto);
      const resultDto = entity.toDto({ui_action: true});
      const keys = Object.keys(resultDto);
      expect(keys).toEqual(expectedKeys);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
    });

    it("should return the expected properties containing all the associated entities.", () => {
      expect.assertions(2);
      const expectedKeys = [
        "id",
        "role_id",
        "foreign_model",
        "foreign_id",
        "control_function",
        "action",
        "ui_action"
      ];

      const dto = defaultRbacWithAllAssociationData();
      const entity = new RbacEntity(dto);
      const resultDto = entity.toDto(RbacEntity.ALL_CONTAIN_OPTIONS);
      const keys = Object.keys(resultDto);
      expect(keys).toEqual(expectedKeys);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
    });
  });
});
