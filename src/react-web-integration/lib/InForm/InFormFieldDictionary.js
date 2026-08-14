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
 * CSS selector for HTML elements that will trigger a shadow dom rescan.
 * @type {string}
 */
export const SHADOW_RESCAN_FIELD_SELECTOR = "input, form, [autocomplete]";

/**
 * Field-relevance attributes InForm asks the (generic) shadow observer to watch. Owned here, on the
 * InForm side, and injected into ShadowMutationObserverService via configureObserveOptions() — the
 * observer service itself stays field-agnostic.
 * @type {ReadonlyArray<string>}
 */
export const FIELD_ATTRIBUTES_TO_WATCH = Object.freeze([
  "type",
  "name",
  "id",
  "autocomplete",
  "hidden",
  "disabled",
  "readonly",
  "placeholder",
  "aria-hidden",
  "role",
  "style",
  "class",
]);

/**
 * Subset of {@link FIELD_ATTRIBUTES_TO_WATCH} that can toggle the visibility of a whole subtree.
 * When one of these changes on a CONTAINER holding a field, a pre-rendered form may just have been
 * revealed/hidden (e.g. a login modal toggled via display on its wrapper) — the fields themselves
 * receive no mutation in that case, so the container change is the only signal to re-scan on.
 * @type {ReadonlyArray<string>}
 */
export const CONTAINER_VISIBILITY_ATTRIBUTES = Object.freeze(["style", "class", "hidden", "aria-hidden"]);
