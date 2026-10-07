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

import OrphanFieldsExtractionService from "./OrphanFieldsExtractionService";
import ElementVisibilityService, { MIN_VIEWABLE_DIMENSION_PX } from "./ElementVisibilityService";
import { MAX_FIELDS_PER_CONTAINER, MAX_PSEUDO_FORM_ANCESTOR_DEPTH } from "../../lib/InForm/OrphanDictionary";

/**
 * Build a rect literal shaped like the cached `viewableRect` (a DOMRect) the discovery phase provides.
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @returns {{left: number, top: number, right: number, bottom: number, width: number, height: number}}
 */
function rect(left, top, width = 100, height = 20) {
  return { left, top, right: left + width, bottom: top + height, width, height };
}

/**
 * Append a text input to `parent` and return it.
 * @param {Element} parent
 * @returns {HTMLInputElement}
 */
function appendInput(parent) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  parent.appendChild(input);
  return input;
}

describe("OrphanFieldsExtractionService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = "";
  });

  describe("OrphanFieldsExtractionService::collectOrphanFields", () => {
    it("should return an empty array for nullish or empty input", () => {
      expect.assertions(2);

      expect(OrphanFieldsExtractionService.collectOrphanFields(undefined)).toEqual([]);
      expect(OrphanFieldsExtractionService.collectOrphanFields([])).toEqual([]);
    });

    it("should keep fields that have no form-like ancestor", () => {
      expect.assertions(2);

      const input = appendInput(document.body);
      const fields = [{ element: input, viewableRect: rect(0, 0) }];

      const orphans = OrphanFieldsExtractionService.collectOrphanFields(fields);

      expect(orphans).toHaveLength(1);
      expect(orphans[0]).toEqual({ element: input, rect: rect(0, 0) });
    });

    it("should discard fields nested in a native form", () => {
      expect.assertions(1);

      const form = document.createElement("form");
      document.body.appendChild(form);
      const input = appendInput(form);

      const orphans = OrphanFieldsExtractionService.collectOrphanFields([{ element: input, viewableRect: rect(0, 0) }]);

      expect(orphans).toHaveLength(0);
    });

    it("should discard fields nested in a custom form-like container", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      container.setAttribute("role", "form");
      document.body.appendChild(container);
      const input = appendInput(container);

      const orphans = OrphanFieldsExtractionService.collectOrphanFields([{ element: input, viewableRect: rect(0, 0) }]);

      expect(orphans).toHaveLength(0);
    });

    it("should discard entries with a non-element or a missing rect", () => {
      expect.assertions(1);

      const input = appendInput(document.body);
      const fields = [
        { element: null, viewableRect: rect(0, 0) },
        { element: document.createTextNode("noise"), viewableRect: rect(0, 0) },
        { element: input, viewableRect: null },
      ];

      expect(OrphanFieldsExtractionService.collectOrphanFields(fields)).toHaveLength(0);
    });

    it("should discard entries with a degenerate rect (NaN coordinates or zero surface)", () => {
      expect.assertions(1);

      const nanField = appendInput(document.body);
      const zeroField = appendInput(document.body);
      const infiniteField = appendInput(document.body);
      const fields = [
        // NaN coordinate: would never match in clustering, leaking a silent singleton.
        { element: nanField, viewableRect: rect(NaN, 0) },
        // 0x0 surface: two such rects always "touch" once inflated by the proximity margin.
        { element: zeroField, viewableRect: rect(0, 0, 0, 0) },
        // Non-finite coordinate.
        { element: infiniteField, viewableRect: rect(0, 0, Infinity, 20) },
      ];

      expect(OrphanFieldsExtractionService.collectOrphanFields(fields)).toHaveLength(0);
    });

    it("should keep a field sized at exactly the minimum viewable dimension", () => {
      expect.assertions(1);

      const input = appendInput(document.body);
      const fields = [
        { element: input, viewableRect: rect(0, 0, MIN_VIEWABLE_DIMENSION_PX, MIN_VIEWABLE_DIMENSION_PX) },
      ];

      expect(OrphanFieldsExtractionService.collectOrphanFields(fields)).toHaveLength(1);
    });

    it("should keep a field with negative coordinates (scrolled off-screen but still rendered)", () => {
      expect.assertions(1);

      const input = appendInput(document.body);
      const fields = [{ element: input, viewableRect: rect(-50, -50) }];

      expect(OrphanFieldsExtractionService.collectOrphanFields(fields)).toHaveLength(1);
    });

    it("should not trigger any layout recalculation (relies on the cached rect)", () => {
      expect.assertions(1);

      const input = appendInput(document.body);
      const spy = jest.spyOn(Element.prototype, "getBoundingClientRect");

      OrphanFieldsExtractionService.collectOrphanFields([{ element: input, viewableRect: rect(0, 0) }]);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("OrphanFieldsExtractionService::areRectsWithinMargin", () => {
    it("should return true for overlapping rects", () => {
      expect.assertions(1);

      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(10, 5))).toBe(true);
    });

    it("should return true when the gap is within the proximity margin", () => {
      expect.assertions(1);

      // rect a ends at x=100, rect b starts at x=170 → 70px gap ≤ 100px margin.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(170, 0))).toBe(true);
    });

    it("should return false when the gap exceeds the proximity margin", () => {
      expect.assertions(1);

      // rect a ends at x=100, rect b starts at x=250 → 150px gap > 100px margin.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(250, 0))).toBe(false);
    });

    it("should measure proximity on the vertical axis too", () => {
      expect.assertions(2);

      // rect a ends at y=20, rect b starts at y=90 → 70px gap ≤ 100px margin.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(0, 90))).toBe(true);
      // rect a ends at y=20, rect b starts at y=170 → 150px gap > 100px margin.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(0, 170))).toBe(false);
    });

    it("should treat the margin as inclusive at its exact boundary", () => {
      expect.assertions(2);

      // rect a ends at x=100, rect b starts at x=200 → 100px gap == margin ⇒ still within.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(200, 0))).toBe(true);
      // One pixel past the boundary ⇒ outside.
      expect(OrphanFieldsExtractionService.areRectsWithinMargin(rect(0, 0), rect(201, 0))).toBe(false);
    });
  });

  describe("OrphanFieldsExtractionService::clusterByProximity", () => {
    it("should return an empty array for an empty input", () => {
      expect.assertions(1);

      expect(OrphanFieldsExtractionService.clusterByProximity([])).toEqual([]);
    });

    it("should return a single cluster for a single field", () => {
      expect.assertions(2);

      const orphans = [{ element: appendInput(document.body), rect: rect(0, 0) }];

      const clusters = OrphanFieldsExtractionService.clusterByProximity(orphans);

      expect(clusters).toHaveLength(1);
      expect(clusters[0]).toHaveLength(1);
    });

    it("should group all fields close to each other in a single cluster", () => {
      expect.assertions(2);

      const orphans = [
        { element: appendInput(document.body), rect: rect(0, 0) },
        { element: appendInput(document.body), rect: rect(0, 40) },
        { element: appendInput(document.body), rect: rect(0, 80) },
      ];

      const clusters = OrphanFieldsExtractionService.clusterByProximity(orphans);

      expect(clusters).toHaveLength(1);
      expect(clusters[0]).toHaveLength(3);
    });

    it("should split fields that are far apart into separate clusters", () => {
      expect.assertions(3);

      const orphans = [
        { element: appendInput(document.body), rect: rect(0, 0) },
        { element: appendInput(document.body), rect: rect(0, 40) },
        { element: appendInput(document.body), rect: rect(2000, 2000) },
      ];

      const clusters = OrphanFieldsExtractionService.clusterByProximity(orphans);

      expect(clusters).toHaveLength(2);
      expect(clusters.find((cluster) => cluster.length === 2)).toBeDefined();
      expect(clusters.find((cluster) => cluster.length === 1)).toBeDefined();
    });

    it("should group fields transitively (A~B, B~C ⇒ one cluster)", () => {
      expect.assertions(1);

      // A~B and B~C are within margin, but A~C are not (80px gaps, 180px end-to-end); B bridges them.
      const orphans = [
        { element: appendInput(document.body), rect: rect(0, 0) },
        { element: appendInput(document.body), rect: rect(0, 100) },
        { element: appendInput(document.body), rect: rect(0, 200) },
      ];

      const clusters = OrphanFieldsExtractionService.clusterByProximity(orphans);

      expect(clusters).toHaveLength(1);
    });
  });

  describe("OrphanFieldsExtractionService::lowestCommonAncestor", () => {
    it("should return null for an empty cluster", () => {
      expect.assertions(1);

      expect(OrphanFieldsExtractionService.lowestCommonAncestor([])).toBeNull();
    });

    it("should return the element itself for a single-element cluster", () => {
      expect.assertions(1);

      const input = appendInput(document.body);

      expect(OrphanFieldsExtractionService.lowestCommonAncestor([input])).toBe(input);
    });

    it("should return the shared wrapper for sibling fields", () => {
      expect.assertions(1);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);
      const input1 = appendInput(wrapper);
      const input2 = appendInput(wrapper);

      expect(OrphanFieldsExtractionService.lowestCommonAncestor([input1, input2])).toBe(wrapper);
    });

    it("should return null when the common ancestor is deeper than the depth budget", () => {
      expect.assertions(1);

      const root = document.createElement("div");
      document.body.appendChild(root);

      const buildDeepBranch = () => {
        let node = root;
        for (let i = 0; i <= MAX_PSEUDO_FORM_ANCESTOR_DEPTH + 1; i++) {
          const child = document.createElement("div");
          node.appendChild(child);
          node = child;
        }
        return appendInput(node);
      };

      const input1 = buildDeepBranch();
      const input2 = buildDeepBranch();

      expect(OrphanFieldsExtractionService.lowestCommonAncestor([input1, input2])).toBeNull();
    });

    it("should resolve a shared ancestor close to one field even when another field is deeply nested under it", () => {
      // Regression: the depth budget must apply to the resolved LCA, not to each raw ancestor chain.
      // Slicing chains before intersecting would drop the wrapper (out of budget in the deep field's
      // chain) and return null, even though the wrapper is the immediate parent of the shallow field.
      expect.assertions(1);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);

      // Shallow field: the wrapper is exactly one ancestor away.
      const shallowField = appendInput(wrapper);

      // Deep field: the wrapper sits well beyond the depth budget in *its* chain.
      let node = wrapper;
      for (let i = 0; i < MAX_PSEUDO_FORM_ANCESTOR_DEPTH + 2; i++) {
        const child = document.createElement("div");
        node.appendChild(child);
        node = child;
      }
      const deepField = appendInput(node);

      expect(OrphanFieldsExtractionService.lowestCommonAncestor([shallowField, deepField])).toBe(wrapper);
    });
  });

  describe("OrphanFieldsExtractionService::deriveContainerElement", () => {
    it("should step a single-field cluster up to the field's wrapper (LCA is the field itself)", () => {
      expect.assertions(1);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);
      const input = appendInput(wrapper);

      // No action surface anywhere ⇒ the container stays the tight wrapper, not the input.
      const container = OrphanFieldsExtractionService.deriveContainerElement([{ element: input, rect: rect(0, 0) }]);

      expect(container).toBe(wrapper);
    });

    it("should widen a single-field cluster up to the ancestor holding an action surface", () => {
      expect.assertions(1);

      const outer = document.createElement("div");
      const inner = document.createElement("div");
      outer.appendChild(inner);
      document.body.appendChild(outer);
      const input = appendInput(inner);
      const submit = document.createElement("button");
      submit.setAttribute("type", "submit");
      outer.appendChild(submit);

      const container = OrphanFieldsExtractionService.deriveContainerElement([{ element: input, rect: rect(0, 0) }]);

      expect(container).toBe(outer);
    });
  });

  describe("OrphanFieldsExtractionService::widenToActionSurface", () => {
    it("should widen the container up to the ancestor holding an action surface", () => {
      expect.assertions(1);

      const outer = document.createElement("div");
      const inner = document.createElement("div");
      outer.appendChild(inner);
      document.body.appendChild(outer);
      appendInput(inner);
      // The submit button lives on the outer wrapper, not the inner one.
      const submit = document.createElement("button");
      submit.setAttribute("type", "submit");
      outer.appendChild(submit);

      expect(OrphanFieldsExtractionService.widenToActionSurface(inner)).toBe(outer);
    });

    it("should recognise an ARIA button as an action surface", () => {
      expect.assertions(1);

      const outer = document.createElement("div");
      const inner = document.createElement("div");
      outer.appendChild(inner);
      document.body.appendChild(outer);
      appendInput(inner);
      // Not a native <button>: a div acting as a button via role.
      const action = document.createElement("div");
      action.setAttribute("role", "button");
      outer.appendChild(action);

      expect(OrphanFieldsExtractionService.widenToActionSurface(inner)).toBe(outer);
    });

    it("should keep the tight container when no action surface is found within budget", () => {
      expect.assertions(1);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);
      appendInput(wrapper);

      expect(OrphanFieldsExtractionService.widenToActionSurface(wrapper)).toBe(wrapper);
    });

    it("should not widen past the depth budget to reach a far ancestor's action surface", () => {
      expect.assertions(1);

      const top = document.createElement("div");
      document.body.appendChild(top);
      const submit = document.createElement("button");
      submit.setAttribute("type", "submit");
      top.appendChild(submit);

      // The starting container sits MAX + 2 levels below the action surface: beyond the walk budget.
      let node = top;
      for (let i = 0; i < MAX_PSEUDO_FORM_ANCESTOR_DEPTH + 2; i++) {
        const child = document.createElement("div");
        node.appendChild(child);
        node = child;
      }
      const start = node;
      appendInput(start);

      expect(OrphanFieldsExtractionService.widenToActionSurface(start)).toBe(start);
    });
  });

  describe("OrphanFieldsExtractionService::dedupeNestedContainers", () => {
    it("should keep the inner container and drop the outer one", () => {
      expect.assertions(2);

      const outer = document.createElement("div");
      const inner = document.createElement("div");
      outer.appendChild(inner);
      document.body.appendChild(outer);

      const deduped = OrphanFieldsExtractionService.dedupeNestedContainers([
        { element: outer, fields: [] },
        { element: inner, fields: [] },
      ]);

      expect(deduped).toHaveLength(1);
      expect(deduped[0].element).toBe(inner);
    });

    it("should merge records sharing the same container element", () => {
      expect.assertions(2);

      const container = document.createElement("div");
      document.body.appendChild(container);
      const field1 = { element: appendInput(container), rect: rect(0, 0) };
      const field2 = { element: appendInput(container), rect: rect(0, 40) };

      const deduped = OrphanFieldsExtractionService.dedupeNestedContainers([
        { element: container, fields: [field1] },
        { element: container, fields: [field2] },
      ]);

      expect(deduped).toHaveLength(1);
      expect(deduped[0].fields).toHaveLength(2);
    });
  });

  describe("OrphanFieldsExtractionService::isValidPseudoForm", () => {
    it("should reject an invisible container", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(false);

      expect(OrphanFieldsExtractionService.isValidPseudoForm({ element: container, fields: [] })).toBe(false);
    });

    it("should reject a container exceeding the density cap (anti-blob)", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      for (let i = 0; i < MAX_FIELDS_PER_CONTAINER; i++) {
        appendInput(container);
      }
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const field = { element: container.firstChild, rect: rect(0, 0) };

      expect(OrphanFieldsExtractionService.isValidPseudoForm({ element: container, fields: [field] })).toBe(false);
    });

    it("should accept a container sitting one field below the density cap", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      for (let i = 0; i < MAX_FIELDS_PER_CONTAINER - 1; i++) {
        appendInput(container);
      }
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const field = { element: container.firstChild, rect: rect(0, 0) };

      expect(OrphanFieldsExtractionService.isValidPseudoForm({ element: container, fields: [field] })).toBe(true);
    });

    it("should reject a container without any visible orphan field", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      const field = { element: appendInput(container), rect: rect(0, 0) };
      // The container is viewable, but its field is not.
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockImplementation((element) => element === container);

      expect(OrphanFieldsExtractionService.isValidPseudoForm({ element: container, fields: [field] })).toBe(false);
    });

    it("should accept a viewable container within density holding a visible field", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      const field = { element: appendInput(container), rect: rect(0, 0) };
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      expect(OrphanFieldsExtractionService.isValidPseudoForm({ element: container, fields: [field] })).toBe(true);
    });
  });

  describe("OrphanFieldsExtractionService::aggregatePseudoForms", () => {
    it("should be a no-op that triggers no layout when there is no orphan field", () => {
      expect.assertions(3);

      const form = document.createElement("form");
      document.body.appendChild(form);
      const input = appendInput(form);
      const formElements = [{ containerElement: form, fields: [], isPseudoForm: false }];
      const spy = jest.spyOn(Element.prototype, "getBoundingClientRect");

      const result = OrphanFieldsExtractionService.aggregatePseudoForms(
        [{ element: input, viewableRect: rect(0, 0) }],
        formElements,
      );

      // The shared array is returned as-is (mutated in place), untouched, and no layout was read.
      expect(result).toBe(formElements);
      expect(result).toHaveLength(1);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should push a well-shaped pseudo-form record for a cluster of orphan fields", () => {
      expect.assertions(5);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);
      const input1 = appendInput(wrapper);
      const input2 = appendInput(wrapper);
      const submit = document.createElement("button");
      submit.setAttribute("type", "submit");
      wrapper.appendChild(submit);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const formElements = [];
      const result = OrphanFieldsExtractionService.aggregatePseudoForms(
        [
          { element: input1, viewableRect: rect(0, 0) },
          { element: input2, viewableRect: rect(0, 40) },
        ],
        formElements,
      );

      expect(result).toBe(formElements);
      expect(formElements).toHaveLength(1);
      expect(formElements[0].containerElement).toBe(wrapper);
      // The record is a skeleton (fields:[]); fields are populated downstream by FieldAggregatorService.
      expect(formElements[0].fields).toEqual([]);
      expect(formElements[0].isPseudoForm).toBe(true);
    });

    it("should push one record per spatially separated cluster", () => {
      expect.assertions(3);

      const buildBlock = (topOffset) => {
        const wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
        const input1 = appendInput(wrapper);
        const input2 = appendInput(wrapper);
        const submit = document.createElement("button");
        submit.setAttribute("type", "submit");
        wrapper.appendChild(submit);
        return {
          wrapper,
          fields: [
            { element: input1, viewableRect: rect(0, topOffset) },
            { element: input2, viewableRect: rect(0, topOffset + 40) },
          ],
        };
      };

      const blockA = buildBlock(0);
      const blockB = buildBlock(2000); // Far enough to land in its own cluster.
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const formElements = [];
      OrphanFieldsExtractionService.aggregatePseudoForms([...blockA.fields, ...blockB.fields], formElements);

      const containers = formElements.map((record) => record.containerElement);
      expect(formElements).toHaveLength(2);
      expect(containers).toContain(blockA.wrapper);
      expect(containers).toContain(blockB.wrapper);
    });

    it("should merge separate clusters that widen up to the same shared container", () => {
      expect.assertions(3);

      // Two spatially separate field groups, each in its own actionless wrapper, sharing a grandparent
      // that holds the only submit surface ⇒ both widen to the grandparent and dedupe into one record.
      const grandparent = document.createElement("div");
      document.body.appendChild(grandparent);
      const submit = document.createElement("button");
      submit.setAttribute("type", "submit");
      grandparent.appendChild(submit);

      const wrapperA = document.createElement("div");
      const wrapperB = document.createElement("div");
      grandparent.appendChild(wrapperA);
      grandparent.appendChild(wrapperB);
      const inputA = appendInput(wrapperA);
      const inputB = appendInput(wrapperB);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const formElements = [];
      OrphanFieldsExtractionService.aggregatePseudoForms(
        [
          { element: inputA, viewableRect: rect(0, 0) },
          { element: inputB, viewableRect: rect(0, 2000) },
        ],
        formElements,
      );

      expect(formElements).toHaveLength(1);
      expect(formElements[0].containerElement).toBe(grandparent);
      // Both clusters dedupe into a single skeleton record; fields are populated by FieldAggregatorService.
      expect(formElements[0].fields).toEqual([]);
    });

    it("should discard a blob container exceeding the density cap", () => {
      expect.assertions(1);

      const wrapper = document.createElement("div");
      document.body.appendChild(wrapper);
      for (let i = 0; i < MAX_FIELDS_PER_CONTAINER; i++) {
        appendInput(wrapper);
      }
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const formElements = [];
      OrphanFieldsExtractionService.aggregatePseudoForms(
        [
          { element: wrapper.children[0], viewableRect: rect(0, 0) },
          { element: wrapper.children[1], viewableRect: rect(0, 40) },
        ],
        formElements,
      );

      expect(formElements).toHaveLength(0);
    });

    it("should ignore fields that belong to a real form", () => {
      expect.assertions(1);

      const form = document.createElement("form");
      document.body.appendChild(form);
      const input = appendInput(form);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);

      const formElements = [];
      OrphanFieldsExtractionService.aggregatePseudoForms([{ element: input, viewableRect: rect(0, 0) }], formElements);

      expect(formElements).toHaveLength(0);
    });
  });
});
