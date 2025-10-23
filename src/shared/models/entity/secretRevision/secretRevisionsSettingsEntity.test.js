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
 * @since         5.7.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultSecretRevisionsSettingsDto} from "./secretRevisionsSettingsEntity.test.data";
import SecretRevisionsSettingsEntity from "./secretRevisionsSettingsEntity";
import {v4 as uuidv4} from "uuid";

describe("SecretRevisionsSettings", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretRevisionsSettingsEntity.name, SecretRevisionsSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(SecretRevisionsSettingsEntity, "id");
      assertEntityProperty.uuid(SecretRevisionsSettingsEntity, "id");
      assertEntityProperty.notRequired(SecretRevisionsSettingsEntity, "id");
    });

    it("validates allow_creation_of_v5_resources property", () => {
      assertEntityProperty.integer(SecretRevisionsSettingsEntity, "max_revisions");
      assertEntityProperty.minimum(SecretRevisionsSettingsEntity, "max_revisions", 1);
      assertEntityProperty.required(SecretRevisionsSettingsEntity, "max_revisions");
    });

    it("validates allow_sharing_revisions property", () => {
      assertEntityProperty.boolean(SecretRevisionsSettingsEntity, "allow_sharing_revisions");
      assertEntityProperty.required(SecretRevisionsSettingsEntity, "allow_sharing_revisions");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(2);
      const dto = defaultSecretRevisionsSettingsDto();
      delete dto.id;
      const entity = new SecretRevisionsSettingsEntity(dto);

      expect(entity._props.max_revisions).toStrictEqual(2);
      expect(entity._props.allow_sharing_revisions).toBeFalsy();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);
      const dto = defaultSecretRevisionsSettingsDto();
      const entity = new SecretRevisionsSettingsEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.max_revisions).toStrictEqual(2);
      expect(entity._props.allow_sharing_revisions).toBeFalsy();
    });
  });

  describe("::createFromDefault", () => {
    it("creates from default metadata keys settings", () => {
      expect.assertions(2);
      const entity = SecretRevisionsSettingsEntity.createFromDefault();

      expect(entity._props.max_revisions).toStrictEqual(1);
      expect(entity._props.allow_sharing_revisions).toBeFalsy();
    });

    it("creates from default metadata keys settings with data overridden", () => {
      expect.assertions(3);
      const id = uuidv4();
      const entity = SecretRevisionsSettingsEntity.createFromDefault({id: id, max_revisions: 10, allow_sharing_revisions: true});

      expect(entity._props.id).toStrictEqual(id);
      expect(entity._props.max_revisions).toStrictEqual(10);
      expect(entity._props.allow_sharing_revisions).toBeTruthy();
    });
  });

  describe("::maxRevisions", () => {
    it("get max_revisions property value", () => {
      expect.assertions(2);
      let entity = new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto());
      expect(entity.maxRevisions).toStrictEqual(2);
      entity = new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto({max_revisions: 10}));
      expect(entity.maxRevisions).toStrictEqual(10);
    });
  });

  describe("::zeroKnowledgeKeyShare", () => {
    it("get allow_sharing_revisions property value", () => {
      expect.assertions(2);
      let entity = new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto());
      expect(entity.allowSharingRevisions).toBeFalsy();
      entity = new SecretRevisionsSettingsEntity(defaultSecretRevisionsSettingsDto({allow_sharing_revisions: true}));
      expect(entity.allowSharingRevisions).toBeTruthy();
    });
  });
});
