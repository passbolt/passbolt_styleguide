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
 * @since         5.18.0
 */

import LabelIndex from "./LabelIndex";

describe("LabelIndex", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("LabelIndex::labelsOf", () => {
    const fixtures = [
      "<label for='a'>A</label><input id='a'>",
      "<label for='a'>A1</label><input id='a'><label for='a'>A2</label>",
      "<label>Wrapped <input id='a'></label>",
      "<label for='a'>For</label><label>Wrapped <input id='a'></label>",
      "<label for='other'>Elsewhere <input id='a'></label><input id='other'>",
      "<label for='a'>Name only</label><input name='a'>",
      "<label for='a'>Duplicate</label><input id='a'><input id='a'>",
      "<label for='a'>Not labelable</label><div id='a'><input></div>",
      "<label>Outer <span><label>Inner <input id='a'></label></span></label>",
      "<label for=''>Empty for</label><label><input id='a'></label>",
      "<label><input id='a'><input id='b'></label>",
      "<input id='a'>",
    ];

    it.each(fixtures)("should return the same labels as element.labels for %s", (html) => {
      // eslint-disable-next-line no-unsanitized/property
      document.body.innerHTML = html;
      const elements = document.querySelectorAll("input, div[id]");
      expect.assertions(elements.length);

      const labelIndex = new LabelIndex();
      for (const element of elements) {
        expect(labelIndex.labelsOf(element)).toEqual(Array.from(element.labels ?? []));
      }
    });

    it("should only return the labels of the element's own shadow root", () => {
      expect.assertions(2);

      document.body.innerHTML = "<label for='a'>Light</label><div id='host'></div>";
      const shadowRoot = document.getElementById("host").attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "<label for='a'>Shadow</label><input id='a'>";
      const input = shadowRoot.getElementById("a");

      const labels = new LabelIndex().labelsOf(input);

      expect(labels).toEqual(Array.from(input.labels));
      expect(labels.map((label) => label.textContent)).toEqual(["Shadow"]);
    });
  });

  describe("LabelIndex::labelFor", () => {
    it("should return the first label in tree order, as querySelector", () => {
      expect.assertions(2);

      document.body.innerHTML = "<label for='a'>First</label><label for='a'>Second</label><input name='a'>";

      const label = new LabelIndex().labelFor(document, "a");

      expect(label).toBe(document.querySelector("label[for='a']"));
      expect(label.textContent).toEqual("First");
    });

    it("should return null when no label has the value", () => {
      expect.assertions(1);

      document.body.innerHTML = "<label for='a'>A</label>";

      expect(new LabelIndex().labelFor(document, "b")).toBeNull();
    });

    it("should match the value exactly, special characters included", () => {
      expect.assertions(2);

      document.body.innerHTML = `<label for='a"b c'>Quoted</label><label for='A'>Upper</label>`;
      const labelIndex = new LabelIndex();

      expect(labelIndex.labelFor(document, 'a"b c').textContent).toEqual("Quoted");
      expect(labelIndex.labelFor(document, "a")).toBeNull();
    });

    it("should query each root only once", () => {
      expect.assertions(2);

      document.body.innerHTML = "<label for='a'>A</label><label for='b'>B</label>";
      const spy = jest.spyOn(document, "querySelectorAll");
      const labelIndex = new LabelIndex();

      labelIndex.labelFor(document, "a");
      labelIndex.labelFor(document, "b");
      labelIndex.labelFor(document, "c");

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("label[for]");
      spy.mockRestore();
    });
  });
});
