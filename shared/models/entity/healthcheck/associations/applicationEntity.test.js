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
 * @since         4.8.0
 */
import EntitySchema from "../../abstract/entitySchema";
import ApplicationEntity from "./applicationEntity";
import * as assertEntityProperty from "../../../../../../test/assert/assertEntityProperty";

describe("ApplicationEntity", () => {
  describe("ApplicationEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ApplicationEntity.ENTITY_NAME, ApplicationEntity.getSchema());
    });

    it("validates info property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_OBJECT];
      /*
       * @todo: //add failing scenarios when nested object will be checked
       */
      const failingScenarios = [];
      assertEntityProperty.assert(ApplicationEntity, "info", successScenarios, failingScenarios, "type");
      assertEntityProperty.required(ApplicationEntity, "info");
    });

    it("validates latestVersion property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "latestVersion");
      assertEntityProperty.nullable(ApplicationEntity, "latestVersion");
      assertEntityProperty.required(ApplicationEntity, "latestVersion");
    });

    it("validates schema property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "schema");
      assertEntityProperty.required(ApplicationEntity, "schema");
    });

    it("validates robotsIndexDisabled property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "robotsIndexDisabled");
      assertEntityProperty.required(ApplicationEntity, "robotsIndexDisabled");
    });

    it("validates sslForce property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "sslForce");
      assertEntityProperty.required(ApplicationEntity, "sslForce");
    });

    it("validates sslFullBaseUrl property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "sslFullBaseUrl");
      assertEntityProperty.required(ApplicationEntity, "sslFullBaseUrl");
    });

    it("validates seleniumDisabled property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "seleniumDisabled");
      assertEntityProperty.required(ApplicationEntity, "seleniumDisabled");
    });

    it("validates registrationClosed property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_OBJECT];
      /*
       * @todo: //add failing scenarios when nested object will be checked
       */
      const failingScenarios = [];
      assertEntityProperty.assert(ApplicationEntity, "registrationClosed", successScenarios, failingScenarios, "type");
      assertEntityProperty.required(ApplicationEntity, "registrationClosed");
    });

    it("validates hostAvailabilityCheckEnabled property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "hostAvailabilityCheckEnabled");
      assertEntityProperty.required(ApplicationEntity, "hostAvailabilityCheckEnabled");
    });

    it("validates jsProd property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "jsProd");
      assertEntityProperty.required(ApplicationEntity, "jsProd");
    });

    it("validates emailNotificationEnabled property", () => {
      assertEntityProperty.boolean(ApplicationEntity, "emailNotificationEnabled");
      assertEntityProperty.required(ApplicationEntity, "emailNotificationEnabled");
    });
  });
});
