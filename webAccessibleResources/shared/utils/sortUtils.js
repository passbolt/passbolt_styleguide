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

/**
 * Sort an array of resources alphabetically
 * @param {Array<ResourceEntityDto>} resources
 */
export const sortResourcesAlphabetically = (resources) => {
  resources?.sort((resource1, resource2) => {
    const resource1Name = resource1.metadata.name.toUpperCase();
    const resource2Name = resource2.metadata.name.toUpperCase();
    return resource1Name.localeCompare(resource2Name);
  });
};

/**
 * Url matching scores.
 * @enum {number} URL_MATCHING_SCORE
 */
export const URL_MATCHING_SCORE = {
  EXACT: 4, // The saved uri exactly matches the page url (e.g. : https://www.passbolt.com/login vs https://www.passbolt.com/login).
  SUB_PAGE: 3, // The page is a sub-page of the saved uri (e.g. : https://www.passbolt.com/login vs https://www.passbolt.com/login/user).
  SAME_FQDN: 2, // Same host but unrelated paths (e.g. : https://www.passbolt.com/login vs https://www.passbolt.com/pricing) .
  SAME_DOMAIN: 1, // Different host but the page is a sub-domain of the saved uri (e.g. : page https://login.passbolt.com/ vs saved https://passbolt.com/).
  NO_MATCH: 0, // Different base domain, or one of the uris could not be parsed (e.g. : https://www.passbolt.com vs https://example.com).
};

// Fake protocol enforced by parseUrl on uris without protocol
const FAKE_PROTOCOL_URI_PREFIX = "fake:";

/**
 * Parse an uri into a URL object.
 * The URL primitive requires a protocol to parse an uri, a fake protocol is enforced when none is present.
 * @param {string} uri
 * @returns {URL|null} The parsed URL, or null if the uri could not be parsed
 */
export const parseUrl = (uri) => {
  const hasProtocol = /^[a-z\-]*:\/\//i.test(uri);

  try {
    return new URL(hasProtocol ? uri : `${FAKE_PROTOCOL_URI_PREFIX}//${uri}`);
  } catch {
    return null;
  }
};

/**
 * Normalize a pathname by removing its trailing slash, except for the root path.
 * @param {string} pathname
 * @returns {string}
 */
export const normalizePath = (pathname) => {
  if (pathname === "") {
    return "/";
  }

  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

/**
 * Check if a domain is a subdomain of another domain.
 * @param {string} domain The domain to be checked
 * @param {string} parentDomain The parent domain to check against
 * @returns {boolean} true if the domain is a subdomain of the parent domain, false otherwise.
 */
export const isSubDomain = (domain, parentDomain) => {
  if (typeof domain !== "string" || typeof parentDomain !== "string") {
    return false;
  }

  if (domain === parentDomain) {
    return true;
  }

  const domainParts = domain.split(".");
  const parentDomainParts = parentDomain.split(".");

  if (parentDomainParts.length < 2 && domainParts.length < parentDomainParts.length) {
    return false;
  }

  // Remove TLD
  domainParts.pop();
  parentDomainParts.pop();

  // Reverse to compare from the right
  const reversedDomainParts = domainParts.reverse();
  const reversedParentDomainParts = parentDomainParts.reverse();

  // If all parent domain parts are found in the domain parts, then it's a subdomain
  return reversedParentDomainParts.every((part, index) => part === reversedDomainParts[index]);
};

/**
 * Evaluate the match between a saved uri and the current page url.
 * @param {string} pageUrl The url of the page the user is currently on
 * @param {string} uri The saved uri to score
 * @returns {URL_MATCHING_SCORE} The matching score
 */
export const getUrlMatchingScore = (pageUrl, uri) => {
  if (typeof pageUrl !== "string" || typeof uri !== "string") {
    return URL_MATCHING_SCORE.NO_MATCH;
  }

  const pageUrlObject = parseUrl(pageUrl);
  const uriObject = parseUrl(uri);
  if (!pageUrlObject?.hostname || !uriObject?.hostname) {
    return URL_MATCHING_SCORE.NO_MATCH;
  }

  if (pageUrlObject.hostname === uriObject.hostname) {
    const pagePath = normalizePath(pageUrlObject.pathname);
    const uriPath = normalizePath(uriObject.pathname);

    if (pagePath === uriPath) {
      return URL_MATCHING_SCORE.EXACT;
    }

    // The page is a sub-page of the saved uri, e.g. saved "/blog", and the current page is "/blog/post/123".
    if (pagePath.startsWith(`${uriPath}/`)) {
      return URL_MATCHING_SCORE.SUB_PAGE;
    }

    return URL_MATCHING_SCORE.SAME_FQDN;
  }

  // Different host but same base domain, e.g. saved "example.com", and the current page is "sub.example.com".
  if (isSubDomain(pageUrlObject.hostname, uriObject.hostname)) {
    return URL_MATCHING_SCORE.SAME_DOMAIN;
  }

  return URL_MATCHING_SCORE.NO_MATCH;
};

/**
 * Get the best matching uri score from a resource given the current page url.
 * @param {{metadata?: {uris?: Array<string>}}} resource The resource to look into
 * @param {string} pageUrl The url of the page the user is currently on
 * @returns {URL_MATCHING_SCORE} The best score found in the resource
 */
const getResourceBestUrlMatchingScore = (resource, pageUrl) => {
  const uris = resource?.metadata?.uris;

  if (!Array.isArray(uris)) {
    return URL_MATCHING_SCORE.NO_MATCH;
  }

  return uris.reduce((best, uri) => Math.max(best, getUrlMatchingScore(pageUrl, uri)), URL_MATCHING_SCORE.NO_MATCH);
};

/**
 * Sort an array of resources by their uris score matching with the current page url. The strongest match on top.
 * @param {Array<ResourceEntityDto>} resources The resources to sort
 * @param {string} pageUrl The url of the page the user is currently on
 * @returns {Array<ResourceEntityDto>} A new array sorted by matching score
 */
export const sortResourcesByUriMatchingScore = (resources, pageUrl) => {
  if (!Array.isArray(resources)) {
    return resources;
  }

  return [...resources].sort(
    (resource1, resource2) =>
      getResourceBestUrlMatchingScore(resource2, pageUrl) - getResourceBestUrlMatchingScore(resource1, pageUrl),
  );
};
