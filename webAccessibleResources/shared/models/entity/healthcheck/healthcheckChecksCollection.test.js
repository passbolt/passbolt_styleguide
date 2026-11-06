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
import HealthcheckCheckEntity from "./healthcheckCheckEntity";
import HealthcheckChecksCollection from "./healthcheckChecksCollection";
import {
  defaultHealthcheckCheckDto,
  emptyHealthcheckApiBodyDto,
  mixedStatusHealthcheckApiBodyDto,
  nonContiguousHealthcheckApiBodyDto,
  unknownContractHealthcheckApiBodyDto,
} from "./healthcheck.test.data";

describe("HealthcheckChecksCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(HealthcheckChecksCollection.name, HealthcheckChecksCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("should build one entity per check of the response body", () => {
      expect.assertions(3);
      const body = mixedStatusHealthcheckApiBodyDto();
      const collection = new HealthcheckChecksCollection(body);
      expect(collection).toBeInstanceOf(HealthcheckChecksCollection);
      expect(collection.length).toEqual(body.length);
      expect(collection.items[0]).toBeInstanceOf(HealthcheckCheckEntity);
    });

    it("should preserve the order in which the API sent the checks", () => {
      expect.assertions(1);
      const body = mixedStatusHealthcheckApiBodyDto();
      const collection = new HealthcheckChecksCollection(body);
      expect(collection.items.map((check) => check.key)).toEqual(body.map((check) => check.key));
    });

    it("should build an empty collection out of an empty body", () => {
      expect.assertions(2);
      const collection = new HealthcheckChecksCollection(emptyHealthcheckApiBodyDto());
      expect(collection).toBeInstanceOf(HealthcheckChecksCollection);
      expect(collection.length).toEqual(0);
    });

    it("should accept two checks sharing the same key", () => {
      expect.assertions(1);
      const collection = new HealthcheckChecksCollection([
        defaultHealthcheckCheckDto(),
        defaultHealthcheckCheckDto({ message: "PHP version is 8.3 or above." }),
      ]);
      expect(collection.length).toEqual(2);
    });

    it("should skip an invalid check instead of throwing when asked to ignore invalid entities", () => {
      expect.assertions(1);
      jest.spyOn(console, "warn").mockImplementation(() => {});
      const collection = new HealthcheckChecksCollection(
        [
          defaultHealthcheckCheckDto(),
          { domain_key: "environment", status: "pass" },
          defaultHealthcheckCheckDto({ key: "pcre", message: "PCRE compiled with unicode support." }),
        ],
        { ignoreInvalidEntity: true },
      );
      expect(collection.length).toEqual(2);
    });
  });

  describe("::groupByDomain", () => {
    it("should group the checks under the domain they belong to", () => {
      expect.assertions(2);
      const body = mixedStatusHealthcheckApiBodyDto();
      const groups = new HealthcheckChecksCollection(body).groupByDomain();
      expect(groups.map((group) => group.key)).toEqual([...new Set(body.map((check) => check.domain_key))]);
      expect(groups.reduce((total, group) => total + group.checks.length, 0)).toEqual(body.length);
    });

    it("should gather the checks of a domain that comes back in several runs", () => {
      expect.assertions(3);
      const groups = new HealthcheckChecksCollection(nonContiguousHealthcheckApiBodyDto()).groupByDomain();
      expect(groups).toHaveLength(2);
      expect(groups[0].key).toEqual("environment");
      expect(groups[0].checks.map((check) => check.key)).toEqual(["php-version", "time-sync"]);
    });

    it("should order the domains by the position of their first check", () => {
      expect.assertions(1);
      const groups = new HealthcheckChecksCollection(nonContiguousHealthcheckApiBodyDto()).groupByDomain();
      expect(groups.map((group) => group.key)).toEqual(["environment", "config-files"]);
    });

    it("should title a group with the translated title the API sent", () => {
      expect.assertions(1);
      const groups = new HealthcheckChecksCollection(nonContiguousHealthcheckApiBodyDto()).groupByDomain();
      expect(groups.map((group) => group.title)).toEqual(["Environment", "Config files"]);
    });

    it("should title a group with its domain key when the API sent no title", () => {
      expect.assertions(1);
      const dto = defaultHealthcheckCheckDto();
      delete dto.domain;
      const groups = new HealthcheckChecksCollection([dto]).groupByDomain();
      expect(groups[0].title).toEqual("environment");
    });

    it("should group a domain the frontend has never heard of", () => {
      expect.assertions(3);
      const groups = new HealthcheckChecksCollection(unknownContractHealthcheckApiBodyDto()).groupByDomain();
      expect(groups).toHaveLength(1);
      expect(groups[0].title).toEqual("Quantum Entanglement");
      expect(groups[0].checks[1].status).toEqual("teapot");
    });

    it("should return no group at all when there is no check", () => {
      expect.assertions(1);
      expect(new HealthcheckChecksCollection(emptyHealthcheckApiBodyDto()).groupByDomain()).toEqual([]);
    });
  });
});
