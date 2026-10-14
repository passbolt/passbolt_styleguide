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

import React from "react";
import sanitizeUrl from "../../react-extension/lib/Sanitize/sanitizeUrl";

/**
 * Matches the http and https URL candidates of a string.
 * @type {RegExp}
 */
const URL_CANDIDATE_PATTERN = /https?:\/\/\S+/gi;

/**
 * Characters that end a sentence rather than a URL.
 * @type {string}
 */
const TRAILING_PUNCTUATION = ".,;:!?)]}'\"`";

/**
 * The opening bracket of each closing one.
 * @type {Object}
 */
const BRACKET_PAIRS = { ")": "(", "]": "[", "}": "{" };

/**
 * Count the occurrences of a character in a string.
 * @param {string} text
 * @param {string} character
 * @returns {number}
 */
const countOf = (text, character) => text.split(character).length - 1;

/**
 * Give back the trailing punctuation of a URL candidate to the sentence.
 * A closing bracket is kept when the URL holds its opening one, as in "…/wiki/Foo_(bar)".
 * @param {string} url
 * @returns {string}
 */
const trimTrailingPunctuation = (url) => {
  while (url.length > 0 && TRAILING_PUNCTUATION.includes(url[url.length - 1])) {
    const last = url[url.length - 1];
    const opening = BRACKET_PAIRS[last];
    if (opening && countOf(url, opening) >= countOf(url, last)) {
      break;
    }
    url = url.slice(0, -1);
  }
  return url;
};

/**
 * Find the URL candidates of a string.
 * @param {string} text
 * @returns {array<{url: string, start: number}>} the candidates, in order, without their trailing punctuation
 */
const findUrlCandidates = (text) =>
  Array.from(text.matchAll(URL_CANDIDATE_PATTERN), (match) => ({
    url: trimTrailingPunctuation(match[0]),
    start: match.index,
  }));

/**
 * Split a plain string into React nodes, turning the URLs sanitizeUrl accepts into anchors.
 * Everything else stays a text node, which React escapes.
 * @param {string} text the string to linkify
 * @param {string} [keyPrefix] prefix for the React keys of the produced nodes
 * @returns {array<JSX.Element|string>} the nodes to render, or [text] when there is no URL
 */
export function linkifyText(text, keyPrefix = "linkified") {
  if (typeof text !== "string" || text.length === 0) {
    return [];
  }

  const nodes = [];
  let cursor = 0;

  for (const { url, start } of findUrlCandidates(text)) {
    const href = sanitizeUrl(url);
    if (!href) {
      continue;
    }

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    nodes.push(
      <a key={`${keyPrefix}-${start}`} href={href} target="_blank" rel="noopener noreferrer">
        {url}
      </a>,
    );

    cursor = start + url.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

/**
 * Returns true if the given string embeds a URL sanitizeUrl rejects, warning about each one.
 * @param {string} text the string to check
 * @param {string} [source] what the text belongs to, named in the warning
 * @returns {boolean}
 */
export function containsUnsafeUrl(text, source = "text") {
  if (typeof text !== "string" || text.length === 0) {
    return false;
  }

  const rejectedUrls = findUrlCandidates(text)
    .map(({ url }) => url)
    .filter((url) => !sanitizeUrl(url));
  rejectedUrls.forEach((url) => console.warn(`An unsafe URL has been rejected from ${source}: ${url}`));

  return rejectedUrls.length > 0;
}
