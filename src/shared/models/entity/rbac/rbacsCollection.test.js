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
 * @since         4.1.0
 */
import RbacsCollection from "./rbacsCollection";
import EntitySchema from "../abstract/entitySchema";
import {defaultRbacData, defaultRbacWithActionData, defaultRbacWithUiActionData} from "./rbacEntity.test.data";
import {userRoleDto} from "../role/roleEntity.test.data";
import RoleEntity from "../role/roleEntity";
import {uiActions} from "../../../services/rbacs/uiActionEnumeration";
import {defaultUiActionData} from "./uiActionEntity.test.data";
import {defaultActionData} from "./actionEntity.test.data";
import RbacEntity from "./rbacEntity";
import {v4 as uuidv4} from "uuid";

describe("Rbacs Collection", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(RbacsCollection.ENTITY_NAME, RbacsCollection.getSchema());
  });

  it("constructor works with collection DTO", () => {
    expect.assertions(4);
    const collectionDto = [defaultRbacData(), defaultRbacData()];
    const collection = new RbacsCollection(collectionDto);
    expect(collection.toDto()).toEqual(collectionDto);
    expect(JSON.stringify(collection)).toEqual(JSON.stringify(collectionDto));
    expect(collection.items[0].id).toEqual(collectionDto[0].id);
    expect(collection.items[1].id).toEqual(collectionDto[1].id);
  });

  it("constructor works with empty collection", () => {
    const collection = new RbacsCollection([]);
    expect(collection.length).toEqual(0);
  });

  it("constructor throw exception if invalid id DTO provided", () => {
    expect.assertions(1);
    const collectionDto = [defaultRbacData(), defaultRbacData({id: 'invalid-data'})];
    expect(() => new RbacsCollection(collectionDto)).toThrowCollectionValidationError("1.id.format");
  });

  it("constructor throw exception if invalid unique id DTO provided", () => {
    expect.assertions(1);
    const id = uuidv4();
    const collectionDto = [defaultRbacData({id}), defaultRbacData({id})];
    expect(() => new RbacsCollection(collectionDto)).toThrowCollectionValidationError("1.id.unique");
  });

  it("constructor doesn't include rbac item having an unsupported control", () => {
    expect.assertions(2);

    const collectionDto = [defaultRbacData(), defaultRbacData({control_function: "NotSupported"})];
    const collection = new RbacsCollection(collectionDto, {ignoreInvalidEntity: true});

    expect(collection.items.length).toEqual(1);
    expect(collection.items[0].id).toEqual(collectionDto[0].id);
  });

  describe("RbacsCollection::findRbacByRoleAndUiActionName", () => {
    it("should return a rbac item", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByRoleAndUiActionName(role, uiActions.USERS_VIEW_WORKSPACE).toDto(RbacEntity.ALL_CONTAIN_OPTIONS)).toEqual(rbacDto);
    });

    it("should return undefined if not found", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByRoleAndUiActionName(role, uiActions.ADMINSTRATION_VIEW_WORKSPACE)).toBeUndefined();
    });

    it("should throw an error if role is not a roleEntity", () => {
      const dto = userRoleDto();
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByRoleAndUiActionName(dto, uiActions.USERS_VIEW_WORKSPACE)).toThrowError('The role parameter should be a role entity.');
    });

    it("should throw an error if ui action is not a string", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByRoleAndUiActionName(role, {})).toThrowError('The name parameter should be a valid string.');
    });
  });

  describe("RbacsCollection::findRbacByUiActionName", () => {
    it("should return a rbac item", () => {
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByUiActionName(uiActions.USERS_VIEW_WORKSPACE).toDto(RbacEntity.ALL_CONTAIN_OPTIONS)).toEqual(rbacDto);
    });

    it("should return undefined if not found", () => {
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByUiActionName(uiActions.ADMINSTRATION_VIEW_WORKSPACE)).toBeUndefined();
    });

    it("should throw an error if ui action is not a string", () => {
      const rbacDto = defaultRbacWithUiActionData({ui_action: defaultUiActionData({name: uiActions.USERS_VIEW_WORKSPACE})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByUiActionName({})).toThrowError('The name parameter should be a valid string.');
    });
  });

  describe("RbacsCollection::findRbacByRoleAndActionName", () => {
    it("should return a rbac item", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithActionData({action: defaultActionData({name: "Group.add"})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByRoleAndActionName(role, "Group.add").toDto(RbacEntity.ALL_CONTAIN_OPTIONS)).toEqual(rbacDto);
    });

    it("should return undefined if not found", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithActionData({action: defaultActionData({name: "Group.add"})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByRoleAndActionName(role, "Resources.add")).toBeUndefined();
    });

    it("should throw an error if role is not a roleEntity", () => {
      const dto = userRoleDto();
      const rbacDto = defaultRbacWithActionData({action: defaultActionData({name: "Group.add"})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByRoleAndActionName(dto, "Group.add")).toThrowError('The role parameter should be a role entity.');
    });

    it("should throw an error if action is not a string", () => {
      const dto = userRoleDto();
      const role = new RoleEntity(dto);
      const rbacDto = defaultRbacWithActionData({action: defaultActionData({name: "Group.add"})});
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByRoleAndActionName(role, {})).toThrowError('The name parameter should be a valid string.');
    });
  });

  describe("RbacsCollection::findRbacByActionName", () => {
    it("should return a rbac item", () => {
      const rbacDto = defaultRbacWithActionData();
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByActionName("Resources.add").toDto(RbacEntity.ALL_CONTAIN_OPTIONS)).toEqual(rbacDto);
    });

    it("should return undefined if not found", () => {
      const rbacDto = defaultRbacWithActionData();
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(collection.findRbacByActionName("Group.add")).toBeUndefined();
    });

    it("should throw an error if action is not a string", () => {
      const rbacDto = defaultRbacWithActionData();
      const collectionDto = [rbacDto, defaultRbacWithUiActionData()];
      const collection = new RbacsCollection(collectionDto);

      expect(() => collection.findRbacByActionName({})).toThrowError('The name parameter should be a valid string.');
    });
  });
});
