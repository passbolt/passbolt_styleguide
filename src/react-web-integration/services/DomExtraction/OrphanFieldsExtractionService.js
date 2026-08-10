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

import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
import ElementVisibilityService, { MIN_VIEWABLE_DIMENSION_PX } from "./ElementVisibilityService";
import {
  FORM_LIKE_CONTAINERS,
  ORPHAN_PROXIMITY_MARGIN,
  MAX_PSEUDO_FORM_ANCESTOR_DEPTH,
  MAX_FIELDS_PER_CONTAINER,
  PSEUDO_FORM_ACTION_SELECTOR,
  TEXT_FIELDS,
} from "../../lib/InForm/OrphanDictionary";

/**
 * Reconstructs "pseudo-forms" from orphan fields (inputs with no form-like ancestor), for pages that
 * do not wrap their credentials in a form. Strictly read-only: the sole side effect is pushing thin
 * form records into the shared `formElements` array.
 * @see OrphanDictionary for the selectors and tuning constants driving the pipeline.
 */
class OrphanFieldsExtractionService {
  /**
   * Reconstruct pseudo-forms from orphan fields and
   * push them into the shared `formElements` array.
   * @param {Array<{element: Element, viewableRect: DOMRect}>} fields The discovered fields (cached rect).
   * @param {Array<{containerElement: Element, fields: Array, isPseudoForm: boolean}>} formElements The
   *   shared form records array, mutated in place.
   * @returns {Array} The same `formElements` array.
   */
  static aggregatePseudoForms(fields, formElements) {
    const orphanFields = OrphanFieldsExtractionService.collectOrphanFields(fields);
    if (orphanFields.length === 0) {
      return formElements;
    }

    const clusters = OrphanFieldsExtractionService.clusterByProximity(orphanFields);
    const containers = OrphanFieldsExtractionService.deriveContainers(clusters);

    for (const container of containers) {
      if (OrphanFieldsExtractionService.isValidPseudoForm(container)) {
        formElements.push({ containerElement: container.element, fields: [], isPseudoForm: true });
      }
    }

    return formElements;
  }

  /**
   * Keep only the fields with no form-like ancestor, reusing the cached rect.
   * @param {Array<{element: Element, viewableRect: DOMRect}>} fields The discovered fields.
   * @returns {Array<{element: Element, rect: DOMRect}>} The orphan fields with their cached rect.
   */
  static collectOrphanFields(fields) {
    const orphanFields = [];

    for (const field of fields ?? []) {
      const element = field?.element;
      const rect = field?.viewableRect;

      if (
        ShadowDomQueryService.isElement(element) &&
        OrphanFieldsExtractionService.isUsableRect(rect) &&
        !ShadowDomQueryService.hasAncestorMatchingDeep(element, FORM_LIKE_CONTAINERS)
      ) {
        orphanFields.push({ element, rect });
      }
    }

    return orphanFields;
  }

  /**
   * Whether a cached rect can drive spatial clustering: finite coordinates and a meaningful surface.
   * Degenerate rects (missing, NaN/Infinity, or sub-{@link MIN_VIEWABLE_DIMENSION_PX} "ghost" sizes)
   * would otherwise corrupt proximity clustering — a NaN rect never matches (silent singleton) while
   * two 0x0 rects always "touch" once inflated by the proximity margin. Mirrors the size floor used by
   * {@link ElementVisibilityService}; visibility itself is re-checked later in {@link isValidPseudoForm}.
   * @param {?{left: number, top: number, right: number, bottom: number, width?: number, height?: number}} rect
   * @returns {boolean} true when the rect is finite and at least {@link MIN_VIEWABLE_DIMENSION_PX} on both axes.
   */
  static isUsableRect(rect) {
    if (!rect) {
      return false;
    }

    if (![rect.left, rect.top, rect.right, rect.bottom].every((coordinate) => Number.isFinite(coordinate))) {
      return false;
    }

    const width = rect.width ?? rect.right - rect.left;
    const height = rect.height ?? rect.bottom - rect.top;

    return width >= MIN_VIEWABLE_DIMENSION_PX && height >= MIN_VIEWABLE_DIMENSION_PX;
  }

  /**
   * Spatial clustering. Group orphan fields by visual proximity (transitive), via union-find.
   * @param {Array<{element: Element, rect: DOMRect}>} orphanFields The orphan fields.
   * @returns {Array<Array<{element: Element, rect: DOMRect}>>} The clusters of orphan fields.
   */
  static clusterByProximity(orphanFields) {
    const parents = orphanFields.map((_, index) => index);

    const find = (index) => {
      let root = index;
      while (parents[root] !== root) {
        parents[root] = parents[parents[root]];
        root = parents[root];
      }
      return root;
    };

    const union = (a, b) => {
      parents[find(a)] = find(b);
    };

    for (let i = 0; i < orphanFields.length; i++) {
      for (let j = i + 1; j < orphanFields.length; j++) {
        if (OrphanFieldsExtractionService.areRectsWithinMargin(orphanFields[i].rect, orphanFields[j].rect)) {
          union(i, j);
        }
      }
    }

    const clustersByRoot = new Map();
    orphanFields.forEach((orphanField, index) => {
      const root = find(index);
      const cluster = clustersByRoot.get(root) ?? [];
      cluster.push(orphanField);
      clustersByRoot.set(root, cluster);
    });

    return Array.from(clustersByRoot.values());
  }

  /**
   * Whether two rects intersect once each is inflated by {@link ORPHAN_PROXIMITY_MARGIN} on every side.
   * @param {DOMRect} a The first rect.
   * @param {DOMRect} b The second rect.
   * @returns {boolean} true when the inflated rects intersect.
   */
  static areRectsWithinMargin(a, b) {
    return (
      a.left - ORPHAN_PROXIMITY_MARGIN <= b.right &&
      b.left - ORPHAN_PROXIMITY_MARGIN <= a.right &&
      a.top - ORPHAN_PROXIMITY_MARGIN <= b.bottom &&
      b.top - ORPHAN_PROXIMITY_MARGIN <= a.bottom
    );
  }

  /**
   * Container derivation. Resolve each cluster to a container, then dedupe nested/identical
   * ones keeping the deepest (inner) one.
   * @param {Array<Array<{element: Element, rect: DOMRect}>>} clusters The clusters of orphan fields.
   * @returns {Array<{element: Element, fields: Array}>} The derived containers with their fields.
   */
  static deriveContainers(clusters) {
    const derived = [];
    for (const cluster of clusters) {
      const element = OrphanFieldsExtractionService.deriveContainerElement(cluster);
      if (ShadowDomQueryService.isElement(element)) {
        derived.push({ element, fields: cluster });
      }
    }

    return OrphanFieldsExtractionService.dedupeNestedContainers(derived);
  }

  /**
   * Derive one cluster's container: its LCA widened up to encapsulate an action surface.
   * @param {Array<{element: Element, rect: DOMRect}>} cluster The cluster of orphan fields.
   * @returns {Element|null} The derived container, or null when none could be resolved.
   */
  static deriveContainerElement(cluster) {
    const fieldElements = cluster.map((orphanField) => orphanField.element);

    let container = OrphanFieldsExtractionService.lowestCommonAncestor(fieldElements);
    if (!ShadowDomQueryService.isElement(container)) {
      return null;
    }

    if (fieldElements.includes(container)) {
      container = ShadowDomQueryService.shadowPiercingParentElement(container);
      if (!ShadowDomQueryService.isElement(container)) {
        return null;
      }
    }

    return OrphanFieldsExtractionService.widenToActionSurface(container);
  }

  /**
   * Shadow-piercing lowest common ancestor, capped at {@link MAX_PSEUDO_FORM_ANCESTOR_DEPTH}.
   * @param {Array<Element>} elements The elements to find the common ancestor of.
   * @returns {Element|null} The LCA, or null when none exists within budget.
   */
  static lowestCommonAncestor(elements) {
    if (elements.length === 0) {
      return null;
    }

    const chains = elements.map((element) => ShadowDomQueryService.piercingAncestors(element));

    let candidates = chains[0];
    for (let i = 1; i < chains.length; i++) {
      const ancestors = new Set(chains[i]);
      candidates = candidates.filter((ancestor) => ancestors.has(ancestor));
      if (candidates.length === 0) {
        return null;
      }
    }

    const lowestCommonAncestor = candidates[0] ?? null;

    // Apply the depth budget to the *resolved* LCA, never to the raw chains: slicing each chain before
    // intersecting would drop a shared ancestor that is close to one field just because another,
    // deeper, field pushes it past the cap in its own chain. Measure the distance from the first
    // field (chains[0]) and reject only when the LCA itself sits beyond the budget.
    if (lowestCommonAncestor && chains[0].indexOf(lowestCommonAncestor) > MAX_PSEUDO_FORM_ANCESTOR_DEPTH) {
      return null;
    }

    return lowestCommonAncestor;
  }

  /**
   * Widen a container up (max {@link MAX_PSEUDO_FORM_ANCESTOR_DEPTH} steps) to encapsulate an action
   * surface; keep the tight container when none is found within budget.
   * @param {Element} container The starting container.
   * @returns {Element} The widened container, or the original.
   */
  static widenToActionSurface(container) {
    let current = container;
    let depth = 0;

    while (ShadowDomQueryService.isElement(current) && depth <= MAX_PSEUDO_FORM_ANCESTOR_DEPTH) {
      if (OrphanFieldsExtractionService.containsActionSurface(current)) {
        return current;
      }
      current = ShadowDomQueryService.shadowPiercingParentElement(current);
      depth++;
    }

    return container;
  }

  /**
   * Whether a container holds an action surface (submit/button element), piercing shadow roots.
   * @param {Element} container The container to inspect.
   * @returns {boolean} true when at least one action-like element is found.
   */
  static containsActionSurface(container) {
    return ShadowDomQueryService.querySelectorAllDeep(container, PSEUDO_FORM_ACTION_SELECTOR).length > 0;
  }

  /**
   * Merge containers sharing the same element, then drop any that is an ancestor of another (keep inner).
   * @param {Array<{element: Element, fields: Array}>} containers The derived containers.
   * @returns {Array<{element: Element, fields: Array}>} The deduplicated containers.
   */
  static dedupeNestedContainers(containers) {
    const byElement = new Map();
    for (const container of containers) {
      const existing = byElement.get(container.element);
      if (existing) {
        existing.fields.push(...container.fields);
      } else {
        byElement.set(container.element, { element: container.element, fields: [...container.fields] });
      }
    }

    const merged = Array.from(byElement.values());

    // Keep a container only when no other derived container is nested inside it (favor the inner one).
    return merged.filter(
      (container) =>
        !merged.some(
          (other) =>
            other !== container && OrphanFieldsExtractionService.isPiercingAncestor(container.element, other.element),
        ),
    );
  }

  /**
   * Whether `ancestor` is a shadow-piercing ancestor of `descendant`.
   * @param {Element} ancestor The candidate ancestor.
   * @param {Element} descendant The candidate descendant.
   * @returns {boolean} true when `ancestor` sits above `descendant`.
   */
  static isPiercingAncestor(ancestor, descendant) {
    if (ancestor === descendant) {
      return false;
    }
    return ShadowDomQueryService.piercingAncestors(descendant).includes(ancestor);
  }

  /**
   * Phase 4 - Validation. Valid when the container is viewable, stays under the
   * {@link MAX_FIELDS_PER_CONTAINER} density cap (anti-blob), and holds a visible orphan field.
   * @param {{element: Element, fields: Array}} container The derived container to validate.
   * @returns {boolean} true when the container qualifies as a pseudo-form.
   */
  static isValidPseudoForm(container) {
    if (!ElementVisibilityService.isElementViewable(container.element)) {
      return false;
    }

    const density = ShadowDomQueryService.querySelectorAllDeep(container.element, TEXT_FIELDS).length;
    if (density >= MAX_FIELDS_PER_CONTAINER) {
      return false;
    }

    return container.fields.some((orphanField) => ElementVisibilityService.isElementViewable(orphanField.element));
  }
}

export default OrphanFieldsExtractionService;
