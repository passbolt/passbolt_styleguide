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

import FieldAggregatorService from "./FieldAggregatorService";
import ElementVisibilityService from "./ElementVisibilityService";
import ShadowRootCacheService from "../ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";

describe("FieldAggregatorService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("FieldAggregatorService::aggregateFields", () => {
    it("should populate fields from a TEXT_FIELDS re-scan, including a typeless input the CTA classifier would miss", () => {
      expect.assertions(3);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      // A pseudo-form container (div) with a typeless login input + a password — the zenit.win shape.
      document.body.innerHTML =
        '<div id="modal"><input id="reg-phone" placeholder="login"/><input type="password"/></div>';
      const container = document.getElementById("modal");
      const formElements = [{ containerElement: container, fields: [], isPseudoForm: true }];

      const result = FieldAggregatorService.aggregateFields(formElements);

      expect(result).toHaveLength(1);
      // BOTH the typeless login (input:not([type])) AND the password are captured.
      expect(result[0].fields).toHaveLength(2);
      expect(result[0].fields.map((field) => field.fieldElement.id)).toContain("reg-phone");
    });

    it("should keep only visible fields", () => {
      expect.assertions(2);

      const container = document.createElement("div");
      const visible = document.createElement("input");
      const hidden = document.createElement("input");
      container.append(visible, hidden);
      document.body.appendChild(container);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockImplementation((element) => element === visible);

      const result = FieldAggregatorService.aggregateFields([
        { containerElement: container, fields: [], isPseudoForm: false },
      ]);

      expect(result[0].fields).toHaveLength(1);
      expect(result[0].fields[0].fieldElement).toBe(visible);
    });

    it("should purge containers left with no visible field", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      container.appendChild(document.createElement("input"));
      document.body.appendChild(container);
      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(false);

      expect(
        FieldAggregatorService.aggregateFields([{ containerElement: container, fields: [], isPseudoForm: false }]),
      ).toEqual([]);
    });

    it("should annotate deepestFormContainer=false for a field owned by an unmasked nested form", () => {
      expect.assertions(2);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      // The field belongs to a nested <form>, not to the outer container.
      document.body.innerHTML = '<div id="outer"><form><input type="text"/></form></div>';
      const outer = document.getElementById("outer");

      const result = FieldAggregatorService.aggregateFields([
        { containerElement: outer, fields: [], isPseudoForm: false },
      ]);

      expect(result[0].fields).toHaveLength(1);
      expect(result[0].fields[0].deepestFormContainer).toBe(false);
    });

    it("should replace any pre-existing skeleton/seed fields with the re-scan result", () => {
      expect.assertions(1);

      jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
      document.body.innerHTML = '<div id="modal"><input type="text"/></div>';
      const container = document.getElementById("modal");
      // Record arrives carrying a stale seed field; aggregateFields overwrites it.
      const staleSeed = { fieldElement: document.createElement("input") };

      const result = FieldAggregatorService.aggregateFields([
        { containerElement: container, fields: [staleSeed], isPseudoForm: true },
      ]);

      expect(result[0].fields).not.toContain(staleSeed);
    });
  });
});
