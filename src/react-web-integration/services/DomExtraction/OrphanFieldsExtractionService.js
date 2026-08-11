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
 * do not wrap their credentials in a form. Strictly read-only: the sole side effect is pushing
 * form records into the shared `formElements` array.
 *
 * Each record it appends carries its own fields directly — `{ containerElement, fields:
 * [{ fieldElement }], isPseudoForm: true }` — sourced from the orphan fields that seeded the cluster.
 * There is no later re-scan phase: fields are discovered once upstream, clustered here, and emitted on
 * the record as-is. This is both cheaper (no per-container re-query) and more precise than a re-scan,
 * which would also sweep up non-orphan inputs (fields belonging to real forms) inside the container.
 * @see OrphanDictionary for the selectors and tuning constants driving the pipeline.
 */
class OrphanFieldsExtractionService {
  /**
   * Reconstruct pseudo-forms from orphan fields and push them into the shared `formElements` array.
   *
   * Runs the read-only 4-phase pipeline over the discovered fields:
   *   1. Collection  — keep only orphan fields (no form-like ancestor), reusing their cached rect.
   *   2. Clustering  — group orphan fields by visual proximity (transitive).
   *   3. Derivation  — resolve each cluster to a single container element (LCA widened to an action surface).
   *   4. Validation  — keep only containers that qualify as a pseudo-form.
   *
   * @param {Array<{element: Element, viewableRect: DOMRect}>} discoveredFields The discovered fields (cached rect).
   * @param {Array<{containerElement: Element, fields: Array<{fieldElement: Element}>, isPseudoForm: boolean}>}
   *   formElements The shared form records array, mutated in place (real forms already present, pseudo-forms appended).
   * @returns {Array} The same `formElements` array.
   */
  static aggregatePseudoForms(discoveredFields, formElements) {
    // Phase 1 — Collection. Bail out early (no layout work) when the page has no orphan field.
    const orphanFields = OrphanFieldsExtractionService.collectOrphanFields(discoveredFields);
    if (orphanFields.length === 0) {
      return formElements;
    }

    // Phase 2 & 3 — Clustering then container derivation.
    const clusters = OrphanFieldsExtractionService.clusterByProximity(orphanFields);
    const containers = OrphanFieldsExtractionService.deriveContainers(clusters);

    // Phase 4 — Validation. Append one record per valid pseudo-form, carrying its own fields: the orphan
    // fields that seeded the cluster, mapped to the `{ fieldElement }` shape the scraper consumes. There
    // is no later re-scan — emitting the seeds here is both cheaper and more precise than re-querying the
    // widened container, which would also pull in non-orphan inputs belonging to real forms.
    for (const container of containers) {
      if (OrphanFieldsExtractionService.isValidPseudoForm(container)) {
        formElements.push({
          containerElement: container.element,
          fields: container.fields.map(({ element }) => ({ fieldElement: element })),
          isPseudoForm: true,
        });
      }
    }

    return formElements;
  }

  /**
   * Keep only the fields with no form-like ancestor, reusing the cached rect.
   * @param {Array<{element: Element, viewableRect: DOMRect}>} fields The discovered fields.
   * @returns {Array<{element: Element, rect: DOMRect}>} The orphan fields with their cached rect.
   */
  static collectOrphanFields(fields = []) {
    const orphanFields = [];

    for (const field of fields) {
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
    const clusters = [];

    for (const orphanField of orphanFields) {
      // A field can bridge several clusters at once, so gather every cluster it touches (no short-circuit),
      // then fold them all into one — this is what preserves transitivity (A~B, B~C ⇒ one cluster).
      const neighbouringClusters = clusters.filter((cluster) =>
        cluster.some((field) => OrphanFieldsExtractionService.areRectsWithinMargin(field.rect, orphanField.rect)),
      );

      if (neighbouringClusters.length === 0) {
        clusters.push([orphanField]);
        continue;
      }

      // Absorb the field and every other touched cluster into the first one, then drop the emptied clusters.
      const [target, ...clustersToMerge] = neighbouringClusters;
      target.push(orphanField);
      for (const cluster of clustersToMerge) {
        target.push(...cluster);
        clusters.splice(clusters.indexOf(cluster), 1);
      }
    }

    return clusters;
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
    // Elements are unique here (merged by element above) and the `other !== container` guard rules out
    // self-comparison, so `piercingAncestors` — which includes the element itself — never false-positives.
    return merged.filter(
      (container) =>
        !merged.some(
          (other) =>
            other !== container && ShadowDomQueryService.piercingAncestors(other.element).includes(container.element),
        ),
    );
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
