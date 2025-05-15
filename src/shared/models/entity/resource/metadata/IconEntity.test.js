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
 * @since         5.2.0
 */
import EntitySchema from "../../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../../test/assert/assertEntityProperty";
import IconEntity, {ICON_TYPE_KEEPASS_ICON_SET, ICON_TYPE_PASSBOLT_ICON_SET} from "./IconEntity";
import {defaultIconDto, minimalIconDto} from "./iconEntity.test.data";

describe("Icon entity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(IconEntity.ENTITY_NAME, IconEntity.getSchema());
    });

    it("validates type property", () => {
      assertEntityProperty.string(IconEntity, "type");
      assertEntityProperty.enumeration(IconEntity, "type", [ICON_TYPE_KEEPASS_ICON_SET, ICON_TYPE_PASSBOLT_ICON_SET]);
      assertEntityProperty.notRequired(IconEntity, "type");
    });

    it("validates value property", () => {
      assertEntityProperty.integer(IconEntity, "value");
      assertEntityProperty.minimum(IconEntity, "value", 0);
      assertEntityProperty.nullable(IconEntity, "value");
      assertEntityProperty.notRequired(IconEntity, "value");
    });

    it("validates background_color property", () => {
      const successScenario = [
        {scenario: "a valid hex color without transparency", value: "#FF00FF"},
        {scenario: "a valid hex color with transparency", value: "#FF00FF00"},
      ];

      const failingScenario = [
        {scenario: "a hex color without #", value: "ABCDEF"},
        {scenario: "too long string", value: "#FF00FF00F"},
        {scenario: "too short string", value: "#FF00F"},
        {scenario: "8 characters long string", value: "#FF00FF0"}
      ];

      assertEntityProperty.string(IconEntity, "background_color");
      assertEntityProperty.notRequired(IconEntity, "background_color");
      assertEntityProperty.assert(IconEntity, "background_color", successScenario, failingScenario, "pattern");
      assertEntityProperty.nullable(IconEntity, "background_color");
    });
  });

  describe("::constructor", () => {
    it("works if minimal DTO is provided", () => {
      expect.assertions(1);

      const iconDto = minimalIconDto();
      const iconEntity = new IconEntity(iconDto);
      expect(iconEntity.toDto()).toEqual(iconDto);
    });

    it("works if complete DTO is provided", () => {
      expect.assertions(1);

      const iconDto = defaultIconDto();
      const iconEntity = new IconEntity(iconDto);
      expect(iconEntity.toDto()).toEqual(iconDto);
    });

    it("should throw an error if value is set without the type", () => {
      expect.assertions(1);

      const iconDto = defaultIconDto();
      delete iconDto.type;

      expect(() => new IconEntity(iconDto)).toThrow();
    });
  });

  describe("::getters", () => {
    it("should return the expected values with full data", () => {
      expect.assertions(3);

      const iconEntity = new IconEntity(defaultIconDto());

      expect(iconEntity.type).toEqual("keepass-icon-set");
      expect(iconEntity.value).toEqual(42);
      expect(iconEntity.backgroundColor).toEqual("#E64626");
    });

    it("should return the expected values with minimal data", () => {
      expect.assertions(3);

      const iconEntity = new IconEntity({});

      expect(iconEntity.type).toBeNull();
      expect(iconEntity.value).toBeNull();
      expect(iconEntity.backgroundColor).toBeNull();
    });
  });
});
