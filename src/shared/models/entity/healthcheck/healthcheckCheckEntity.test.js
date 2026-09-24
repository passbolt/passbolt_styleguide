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
 * @since         5.17.0
 */

import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import HealthcheckCheckEntity from "./healthcheckCheckEntity";
import { defaultHealthcheckCheckDto } from "./healthcheck.test.data";

describe("HealthcheckCheckEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(HealthcheckCheckEntity.name, HealthcheckCheckEntity.getSchema());
    });

    it("validates key property", () => {
      assertEntityProperty.string(HealthcheckCheckEntity, "key");
      assertEntityProperty.notRequired(HealthcheckCheckEntity, "key");
    });

    it("validates domain_key property", () => {
      assertEntityProperty.string(HealthcheckCheckEntity, "domain_key");
      assertEntityProperty.required(HealthcheckCheckEntity, "domain_key");
    });

    it("validates domain property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_OBJECT];
      const failingScenarios = [
        assertEntityProperty.SCENARIO_STRING,
        assertEntityProperty.SCENARIO_INTEGER,
        assertEntityProperty.SCENARIO_TRUE,
      ];

      assertEntityProperty.assert(HealthcheckCheckEntity, "domain", successScenarios, failingScenarios, "type");
      assertEntityProperty.notRequired(HealthcheckCheckEntity, "domain");
    });

    it("validates status property", () => {
      assertEntityProperty.string(HealthcheckCheckEntity, "status");
      assertEntityProperty.required(HealthcheckCheckEntity, "status");
    });

    it("validates message property", () => {
      assertEntityProperty.string(HealthcheckCheckEntity, "message");
      assertEntityProperty.required(HealthcheckCheckEntity, "message");
    });

    it("validates help property", () => {
      assertEntityProperty.assertArrayItemString(HealthcheckCheckEntity, "help");
      assertEntityProperty.notRequired(HealthcheckCheckEntity, "help");
    });
  });

  describe("::constructor", () => {
    it("should instantiate the entity with a minimal dto", () => {
      expect.assertions(6);
      const dto = defaultHealthcheckCheckDto();
      const entity = new HealthcheckCheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckCheckEntity);
      expect(entity.key).toEqual(dto.key);
      expect(entity.domainKey).toEqual(dto.domain_key);
      expect(entity.status).toEqual(dto.status);
      expect(entity.message).toEqual(dto.message);
      expect(entity.help).toEqual([]);
    });

    it("should keep the help entries in the order they were received", () => {
      expect.assertions(2);
      const help = ["Set the environment variable.", "See. https://www.passbolt.com/docs/"];
      const entity = new HealthcheckCheckEntity(defaultHealthcheckCheckDto({ status: "error", help }));
      expect(entity.help).toEqual(help);
      expect(entity.hasHelp).toBe(true);
    });

    it("should default a missing help to an empty array so it can always be iterated", () => {
      expect.assertions(2);
      const dto = defaultHealthcheckCheckDto();
      delete dto.help;
      const entity = new HealthcheckCheckEntity(dto);
      expect(entity.help).toEqual([]);
      expect(entity.hasHelp).toBe(false);
    });

    it("should default a help that is not an array to an empty array so it can always be iterated", () => {
      const scenarios = [assertEntityProperty.SCENARIO_NULL, ...assertEntityProperty.FAIL_ARRAY_SCENARIOS];
      expect.assertions(scenarios.length * 2);
      scenarios.forEach(({ value }) => {
        const entity = new HealthcheckCheckEntity(defaultHealthcheckCheckDto({ help: value }));
        expect(entity.help).toEqual([]);
        expect(entity.hasHelp).toBe(false);
      });
    });

    it("should accept a status outside the documented vocabulary", () => {
      expect.assertions(1);
      const entity = new HealthcheckCheckEntity(defaultHealthcheckCheckDto({ status: "teapot" }));
      expect(entity.status).toEqual("teapot");
    });

    it("should report help on a check that is reported as info", () => {
      expect.assertions(2);
      const entity = new HealthcheckCheckEntity(
        defaultHealthcheckCheckDto({
          status: "info",
          message: "System clock and NTP service information cannot be found.",
          help: ["See `timedatectl | grep -i -A 1 clock`."],
        }),
      );
      expect(entity.status).toEqual("info");
      expect(entity.hasHelp).toBe(true);
    });

    it("should throw if the message is missing", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.message;
      expect(() => new HealthcheckCheckEntity(dto)).toThrow(EntityValidationError);
    });

    it("should throw if the status is missing", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.status;
      expect(() => new HealthcheckCheckEntity(dto)).toThrow(EntityValidationError);
    });

    it("should throw if the domain key is missing, as there is no way to group the check", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.domain_key;
      expect(() => new HealthcheckCheckEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::domainTitle", () => {
    it("should take the translated title as it comes, without interpreting it", () => {
      expect.assertions(1);
      const entity = new HealthcheckCheckEntity(
        defaultHealthcheckCheckDto({
          domain_key: "config-files",
          domain: { key: "config-files", title: "Fichiers de configuration" },
        }),
      );
      expect(entity.domainTitle).toEqual("Fichiers de configuration");
    });

    it("should fall back to the domain key when the domain is missing", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.domain;
      const entity = new HealthcheckCheckEntity(dto);
      expect(entity.domainTitle).toEqual("environment");
    });

    it("should fall back to the domain key when the title is not a string", () => {
      expect.assertions(1);
      const entity = new HealthcheckCheckEntity(
        defaultHealthcheckCheckDto({ domain: { key: "environment", title: 42 } }),
      );
      expect(entity.domainTitle).toEqual("environment");
    });
  });

  describe("::key", () => {
    it("should be undefined when the API sent no key", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.key;
      expect(new HealthcheckCheckEntity(dto).key).toBeUndefined();
    });
  });
});
