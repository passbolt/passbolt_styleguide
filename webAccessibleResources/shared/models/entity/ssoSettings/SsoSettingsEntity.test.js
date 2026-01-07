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
 * @since         4.5.0
 */

import each from "jest-each";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import SsoSettingsEntity from "./SsoSettingsEntity";
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";
import {
  defaultSsoSettings,
  defaultSsoSettingsWithAdfs,
  defaultSsoSettingsWithAzure,
  defaultSsoSettingsWithGoogle,
  defaultSsoSettingsWithOAuth2,
} from "./SsoSettingsEntity.test.data";
import { v4 as uuid } from "uuid";
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("SsoSettingsEntity", () => {
  describe("SsoSettingsEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SsoSettingsEntity.ENTITY_NAME, SsoSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(SsoSettingsEntity, "id");
      assertEntityProperty.notRequired(SsoSettingsEntity, "id");
    });

    it("validates providers property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_ARRAY];
      const failingScenarios = [
        assertEntityProperty.SCENARIO_INTEGER,
        assertEntityProperty.SCENARIO_STRING,
        assertEntityProperty.SCENARIO_NULL,
      ];
      assertEntityProperty.assert(SsoSettingsEntity, "providers", successScenarios, failingScenarios, "type");
      assertEntityProperty.notRequired(SsoSettingsEntity, "providers");
    });

    it("validates provider property", () => {
      const successValues = ["azure", "adfs", "google", "oauth2"];

      const failingValues = ["test", "other", "unknown"];

      const successScenarios = successValues.map((value) => ({ scenario: `with value "${value}}"`, value: value }));
      const failingScenarios = failingValues.map((value) => ({ scenario: `with value "${value}}"`, value: value }));

      assertEntityProperty.assert(SsoSettingsEntity, "provider", successScenarios, failingScenarios, "enum");
      assertEntityProperty.nullable(SsoSettingsEntity, "provider");
      assertEntityProperty.notRequired(SsoSettingsEntity, "provider");
    });

    it("validates data property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_OBJECT];

      /*
       * @todo: add object failing scenarios when the schema will handled such checks
       * const failingScenarios = [
       *   assertEntityProperty.SCENARIO_INTEGER,
       *   assertEntityProperty.SCENARIO_NULL,
       *   assertEntityProperty.SCENARIO_STRING,
       *   assertEntityProperty.SCENARIO_ARRAY
       * ];
       */

      const failingScenarios = [];
      assertEntityProperty.assert(SsoSettingsEntity, "data", successScenarios, failingScenarios, "type");
      assertEntityProperty.notRequired(SsoSettingsEntity, "data");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SsoSettingsEntity, "created");
      assertEntityProperty.dateTime(SsoSettingsEntity, "created");
      assertEntityProperty.notRequired(SsoSettingsEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SsoSettingsEntity, "modified");
      assertEntityProperty.dateTime(SsoSettingsEntity, "modified");
      assertEntityProperty.notRequired(SsoSettingsEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(SsoSettingsEntity, "created_by");
      assertEntityProperty.notRequired(SsoSettingsEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(SsoSettingsEntity, "modified_by");
      assertEntityProperty.notRequired(SsoSettingsEntity, "modified_by");
    });
  });

  describe("SsoSettingsEntity:constructor", () => {
    each([
      { provider: null, dto: defaultSsoSettings() },
      { provider: AzureSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithAzure({ id: uuid() }) },
      { provider: GoogleSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithGoogle({ id: uuid() }) },
      { provider: OAuth2SsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithOAuth2({ id: uuid() }) },
      { provider: AdfsSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithAdfs({ id: uuid() }) },
    ]).describe("it should instantiate the entity with a minimal dto", (scenario) => {
      it(`For: ${scenario.provider}`, () => {
        expect.assertions(4);
        const entity = new SsoSettingsEntity(scenario.dto);

        expect(entity).toBeInstanceOf(SsoSettingsEntity);
        expect(entity.toJSON()).toEqual(scenario.dto);
        expect(entity.id).toStrictEqual(scenario.dto?.id);
        expect(entity.provider).toStrictEqual(scenario.dto?.provider);
      });
    });

    it(`should throw an exception if OAuth2 specific validation fails`, () => {
      expect.assertions(2);
      const erroneousDto = defaultSsoSettingsWithOAuth2({
        data: {
          url: "http://www.passbolt.com",
        },
      });

      try {
        new SsoSettingsEntity(erroneousDto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError("url", "pattern")).toStrictEqual(true);
      }
    });
  });
});
