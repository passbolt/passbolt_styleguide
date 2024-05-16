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
  defaultSsoSettingsWithOAuth2
} from "./SsoSettingsEntity.test.data";
import {v4 as uuid} from "uuid";
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";

describe("SsoSettingsEntity", () => {
  describe("SsoSettingsEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SsoSettingsEntity.ENTITY_NAME, SsoSettingsEntity.getSchema());
    });

    each([
      {provider: null, dto: defaultSsoSettings()},
      {provider: AzureSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithAzure({id: uuid()})},
      {provider: GoogleSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithGoogle({id: uuid()})},
      {provider: OAuth2SsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithOAuth2({id: uuid()})},
      {provider: AdfsSsoSettingsEntity.PROVIDER_ID, dto: defaultSsoSettingsWithAdfs({id: uuid()})},
    ]).describe("it should instantiate the entity with a minimal dto", scenario => {
      it(`For: ${scenario.provider}`, () => {
        expect.assertions(4);
        const entity = new SsoSettingsEntity(scenario.dto);

        expect(entity).toBeInstanceOf(SsoSettingsEntity);
        expect(entity.toJSON()).toEqual(scenario.dto);
        expect(entity.id).toStrictEqual(scenario.dto?.id);
        expect(entity.provider).toStrictEqual(scenario.dto?.provider);
      });
    });

    each([
      {dto: {id: "string but not uuid"}, errorType: "format"},
      {dto: {id: -1}, errorType: "type"},

      {dto: {providers: -1}, errorType: "type"},

      {dto: {data: 15}, errorType: "type"},
    ]).describe("should throw an exception if DTO contains invalid values", scenario => {
      it(`scenario: ${JSON.stringify(scenario)}`, () => {
        expect.assertions(2);
        const fieldName = Object.keys(scenario.dto)[0];
        const erroneousDto = defaultSsoSettingsWithAzure(scenario.dto);
        try {
          new SsoSettingsEntity(erroneousDto);
        } catch (e) {
          expect(e).toBeInstanceOf(EntityValidationError);
          expect(e.hasError(fieldName, scenario.errorType)).toStrictEqual(true);
        }
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
        expect(e.hasError('url', 'pattern')).toStrictEqual(true);
      }
    });
  });
});
