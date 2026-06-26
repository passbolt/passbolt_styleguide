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
 * @since         4.10.0
 */

import { defaultResourceDto } from "../models/entity/resource/resourceEntity.test.data";
import {
  getUrlMatchingScore,
  sortResourcesAlphabetically,
  sortResourcesByUriMatchingScore,
  URL_MATCHING_SCORE,
} from "./sortUtils";
import { defaultResourceMetadataDto } from "../models/entity/resource/metadata/resourceMetadataEntity.test.data";

describe("sortUtils", () => {
  describe("::sortResourceAlphabetically", () => {
    it("should sort resources based on their name given from metadata and in case insensitve way", () => {
      expect.assertions(4);

      const resource1 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "resource1" }) });
      const resource2 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "Resource2" }) });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "resource3" }) });
      const resource4 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "Resource4" }) });

      const resources = [resource2, resource3, resource4, resource1];

      sortResourcesAlphabetically(resources);

      expect(resources[0]).toStrictEqual(resource1);
      expect(resources[1]).toStrictEqual(resource2);
      expect(resources[2]).toStrictEqual(resource3);
      expect(resources[3]).toStrictEqual(resource4);
    });

    it("should not crash if null is given", () => {
      expect.assertions(1);
      expect(() => sortResourcesAlphabetically(null)).not.toThrow();
    });
  });

  describe("::getUrlMatchingScore", () => {
    it("should score an exact match with the highest score", () => {
      expect.assertions(2);

      expect(getUrlMatchingScore("https://www.passbolt.com/login", "https://www.passbolt.com/login")).toStrictEqual(
        URL_MATCHING_SCORE.EXACT,
      );

      expect(getUrlMatchingScore("https://www.passbolt.com/login/", "https://www.passbolt.com/login/")).toStrictEqual(
        URL_MATCHING_SCORE.EXACT,
      );
    });

    it("should score an exact match with a trailing slash", () => {
      expect.assertions(2);

      expect(getUrlMatchingScore("https://www.passbolt.com/blog", "https://www.passbolt.com/blog/")).toStrictEqual(
        URL_MATCHING_SCORE.EXACT,
      );

      expect(getUrlMatchingScore("https://www.passbolt.com/blog/", "https://www.passbolt.com/blog")).toStrictEqual(
        URL_MATCHING_SCORE.EXACT,
      );
    });

    it("should score an exact match for a protocol-less bare host", () => {
      expect.assertions(1);

      expect(getUrlMatchingScore("https://www.passbolt.com", "www.passbolt.com")).toStrictEqual(
        URL_MATCHING_SCORE.EXACT,
      );
    });

    it("should score a sub-page as a sub-page match", () => {
      expect.assertions(4);

      expect(getUrlMatchingScore("https://example.com/blog/post/123", "https://example.com/blog")).toStrictEqual(
        URL_MATCHING_SCORE.SUB_PAGE,
      );

      expect(getUrlMatchingScore("https://example.com/blog/post/123/", "https://example.com/blog")).toStrictEqual(
        URL_MATCHING_SCORE.SUB_PAGE,
      );

      expect(getUrlMatchingScore("https://example.com/blog/post/123/", "https://example.com/blog/")).toStrictEqual(
        URL_MATCHING_SCORE.SUB_PAGE,
      );

      expect(getUrlMatchingScore("https://example.com/blog/post/123", "https://example.com/blog/")).toStrictEqual(
        URL_MATCHING_SCORE.SUB_PAGE,
      );
    });

    it("should not score a sub-page match when the current path is contained in the saved uri but doesn't match the same page", () => {
      expect.assertions(1);

      expect(getUrlMatchingScore("https://example.com/blogger", "https://example.com/blog")).toStrictEqual(
        URL_MATCHING_SCORE.SAME_FQDN,
      );
    });

    it("should score the same host with unrelated paths as a same fqdn match", () => {
      expect.assertions(1);

      expect(getUrlMatchingScore("https://www.example.com/login", "https://www.example.com/blog")).toStrictEqual(
        URL_MATCHING_SCORE.SAME_FQDN,
      );
    });

    it("should score a different sub-domain as a sub domain match", () => {
      expect.assertions(1);

      expect(getUrlMatchingScore("https://sub.example.com", "https://example.com")).toStrictEqual(
        URL_MATCHING_SCORE.SAME_DOMAIN,
      );
    });

    it("should not score a match when the page and the saved uri are sibling sub-domains", () => {
      expect.assertions(2);

      expect(getUrlMatchingScore("https://login.example.com", "https://blog.example.com")).toStrictEqual(
        URL_MATCHING_SCORE.NO_MATCH,
      );

      expect(getUrlMatchingScore("https://www.example.com", "https://sub.example.com")).toStrictEqual(
        URL_MATCHING_SCORE.NO_MATCH,
      );
    });

    it("should not score a match when the base domains differ", () => {
      expect.assertions(1);

      expect(getUrlMatchingScore("https://www.passbolt.com/login", "https://www.p4ssbolt.com/login")).toStrictEqual(
        URL_MATCHING_SCORE.NO_MATCH,
      );
    });

    it("should not crash and return no match if the page url or the uri is invalid", () => {
      expect.assertions(4);

      expect(getUrlMatchingScore("not a url", "https://www.passbolt.com")).toStrictEqual(URL_MATCHING_SCORE.NO_MATCH);
      expect(getUrlMatchingScore("https://www.passbolt.com", "")).toStrictEqual(URL_MATCHING_SCORE.NO_MATCH);
      expect(getUrlMatchingScore(null, "https://www.passbolt.com")).toStrictEqual(URL_MATCHING_SCORE.NO_MATCH);
      expect(getUrlMatchingScore("https://www.passbolt.com", null)).toStrictEqual(URL_MATCHING_SCORE.NO_MATCH);
    });
  });

  describe("::sortResourcesByUriMatchingScore", () => {
    it("should sort the resources from the strongest match to the lowest", () => {
      expect.assertions(5);

      const pageUrl = "https://sub.example.com/login";

      const exact = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "exact", uris: [pageUrl] }),
      });
      const subPage = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "subPage",
          uris: ["https://sub.example.com/login/user"],
        }),
      });
      const parentDomain = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "parentDomain",
          uris: ["https://example.com/login"],
        }),
      });
      const sameFqdn = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "sameFqdn", uris: ["https://sub.example.com/blog"] }),
      });
      const unrelated = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "unrelated", uris: ["https://www.passbolt.com"] }),
      });

      const resources = [subPage, unrelated, sameFqdn, parentDomain, exact];

      const sorted = sortResourcesByUriMatchingScore(resources, pageUrl);

      expect(sorted[0]).toStrictEqual(exact);
      expect(sorted[1]).toStrictEqual(subPage);
      expect(sorted[2]).toStrictEqual(sameFqdn);
      expect(sorted[3]).toStrictEqual(parentDomain);
      expect(sorted[4]).toStrictEqual(unrelated);
    });

    it("should not mutate the given array", () => {
      expect.assertions(2);

      const pageUrl = "https://www.passbolt.com/login";
      const exact = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "exact", uris: [pageUrl] }) });
      const unrelated = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "unrelated", uris: ["https://example.com"] }),
      });

      const resources = [unrelated, exact];
      const sorted = sortResourcesByUriMatchingScore(resources, pageUrl);

      expect(resources).toStrictEqual([unrelated, exact]);
      expect(sorted).not.toBe(resources);
    });

    it("should score a resource on its best matching uri", () => {
      expect.assertions(2);

      const pageUrl = "https://www.passbolt.com/login";
      const bestIsExact = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "bestIsExact",
          uris: ["https://other.com", pageUrl],
        }),
      });
      const sameFqdn = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "sameFqdn", uris: ["https://www.passbolt.com/blog"] }),
      });

      const resources = [sameFqdn, bestIsExact];

      const sorted = sortResourcesByUriMatchingScore(resources, pageUrl);

      expect(sorted[0]).toStrictEqual(bestIsExact);
      expect(sorted[1]).toStrictEqual(sameFqdn);
    });

    it("should keep the original relative order of resources sharing the same score", () => {
      expect.assertions(3);

      const pageUrl = "https://www.passbolt.com/login";
      const first = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "first", uris: ["https://www.passbolt.com/a"] }),
      });
      const second = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "second", uris: ["https://www.passbolt.com/b"] }),
      });
      const third = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "third", uris: ["https://www.passbolt.com/c"] }),
      });

      const resources = [first, second, third];

      const sorted = sortResourcesByUriMatchingScore(resources, pageUrl);

      expect(sorted[0]).toStrictEqual(first);
      expect(sorted[1]).toStrictEqual(second);
      expect(sorted[2]).toStrictEqual(third);
    });

    it("should not crash if null is given", () => {
      expect.assertions(1);

      expect(() => sortResourcesByUriMatchingScore(null, "https://www.passbolt.com")).not.toThrow();
    });

    it("should not crash if the page url is empty", () => {
      expect.assertions(1);

      const resource = defaultResourceDto({
        metadata: defaultResourceMetadataDto({ uris: ["https://www.passbolt.com"] }),
      });
      expect(() => sortResourcesByUriMatchingScore([resource], "")).not.toThrow();
    });
  });
});
