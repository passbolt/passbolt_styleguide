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
 * @since         5.15.0
 */

/**
 * Maximum number of characters kept from a single scraped string before truncation.
 * @type {number}
 */
export const MAX_SCRAPED_STRING_LENGTH = 1024;

/**
 * Attributes carrying autocomplete hints, in decreasing standardisation order.
 * @type {ReadonlyArray<string>}
 */
export const AUTOCOMPLETE_ATTRS = ["autocomplete", "autocompletetype", "x-autocompletetype"];

/**
 * Attributes through which a page (or a competing password manager) opts a field out of autofill.
 * @type {ReadonlyArray<string>}
 */
export const OPT_OUT_ATTRS = ["data-lpignore", "data-1p-ignore", "data-bwignore"];

/**
 * Element attributes collected during scraping and used to classify/infer a field.
 * @type {ReadonlyArray<string>}
 */
export const SCRAPED_ATTRS = [
  "id",
  "name",
  "class",
  "pattern",
  "maxlength",
  "inputmode",
  "role",
  "required",
  "readonly",
  "disabled",
  "tabindex",
  "type",
  "placeholder",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details",
  "aria-hidden",
  "aria-disabled",
  "aria-haspopup",
  "title",
  "alt",
  "data-form-type",
  ...AUTOCOMPLETE_ATTRS,
  ...OPT_OUT_ATTRS,
];

/**
 * Attributes tokenized into a field's qualification keyword set (see `ScrapingCacheService.keywords`).
 * Structural metadata only — a field's value/text is never read, so there is nothing sensitive to redact.
 * @type {ReadonlyArray<string>}
 */
export const QUALIFICATION_TOKEN_ATTRS = [
  "id",
  "name",
  "class",
  "placeholder",
  "aria-label",
  "autocomplete",
  "data-form-type",
  "title",
  "type",
];

/**
 * Selector matching the form controls eligible for scraping.
 * @type {string}
 */
export const FORM_CONTROL_SELECTOR = "input";

/**
 * Tags that end a label search: reaching one of these means the label lookup crossed into another control.
 * @type {ReadonlyArray<string>}
 */
export const LABEL_BOUNDARY_TAGS = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"];

/**
 * Tags skipped (their text ignored) while gathering a field's label text.
 * @type {ReadonlyArray<string>}
 */
export const LABEL_SKIP_TAGS = ["A", "OPTION", "OPTGROUP", "SCRIPT", "STYLE"];

/**
 * Field attributes a `<label for>` can point at, tried in order when resolving an explicit label.
 * @type {ReadonlyArray<string>}
 */
export const LABEL_FOR_ATTRS = ["id", "name"];

/**
 * Ancestor tags that can legitimately host a field's label text.
 * @type {ReadonlyArray<string>}
 */
export const LABEL_ANCESTOR_TAGS = ["LABEL", "DIV", "TD", "TH", "DD", "LI"];

/**
 * Maximum number of ancestors walked up from a field while looking for its label.
 * @type {number}
 */
export const MAX_LABEL_ANCESTOR_HOPS = 20;

/**
 * Heading tags used to derive a field's contextual title.
 * @type {ReadonlyArray<string>}
 */
export const HEADING_TAGS = ["H1", "H2", "H3", "H4", "H5", "H6"];

/**
 * Sectioning tags that bound the region searched for a contextual heading.
 * @type {ReadonlyArray<string>}
 */
export const SECTION_TAGS = ["SECTION", "ARTICLE", "MAIN", "ASIDE", "FORM", "FIELDSET"];

/**
 * Maximum number of ancestors walked up from a field while looking for a contextual heading.
 * @type {number}
 */
export const MAX_HEADING_ANCESTOR_HOPS = 50;

/**
 * `input[type]` values (empty string = untyped) a username field can carry.
 * @type {ReadonlyArray<string>}
 */
export const USERNAME_CANDIDATE_TYPES = ["text", "email", "tel", ""];

/**
 * Autocomplete hint values that mark a field as a username candidate.
 * @type {ReadonlyArray<string>}
 */
export const USERNAME_AUTOCOMPLETE = ["username", "email", "tel"];

/**
 * Keyword tokens whose presence in a field's metadata hints at a username field.
 * @type {ReadonlyArray<string>}
 */
export const USERNAME_KEYWORD_TOKENS = ["username", "email", "login", "user", "phone", "mobile", "tel", "telephone"];

/**
 * Ordered label sources, from most to least reliable, consulted when resolving a field's label.
 * @type {ReadonlyArray<string>}
 */
export const LABEL_TIERS = ["_explicit", "_sibling", "_placeholder", "_aria", "_ancestor"];
