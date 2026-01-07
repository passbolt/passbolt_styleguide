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
 * @since         5.2.0
 */

/**
 * Unit tests on AddResourceUris in regard of specifications
 */

import { defaultProps } from "./AddResourceUris.test.data";
import AddResourceUrisPage from "./AddResourceUris.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceUris", () => {
  let page; // The page to test against

  describe("As LU I can see the uris form.", () => {
    it("As LU I can see the uris form.", () => {
      expect.assertions(4);

      const props = defaultProps({ resource: { metadata: { uris: [""] } } });
      page = new AddResourceUrisPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("URIs");
      expect(page.mainUri.value).toEqual("");
      expect(page.addUri.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe("Fill form uris", () => {
    it("Enter main uri should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps({ resource: { metadata: { uris: [""] } } });
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceUrisPage(props);
      await page.fillInput(page.mainUri, "https://www.passbolt.com");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.0");
      expect(value).toEqual("https://www.passbolt.com");
    });
  });

  describe("As LU I should see add uri enabled if main uri is filled.", () => {
    it("As LU I can add uri.", async () => {
      expect.assertions(5);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceUrisPage(props);
      expect(page.addUri.hasAttribute("disabled")).toBeFalsy();
      expect(page.getAdditionalUri(1).value).toStrictEqual(props.resource.metadata.uris[1]);

      await page.click(page.addUri);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.2");
      expect(value).toEqual("");
    });
  });

  describe("As LU I should delete an additional uri.", () => {
    it("As LU I can see the uris form deleted.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceUrisPage(props);

      await page.click(page.getDeleteAdditionalUri(1));

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.1");
      expect(value).toEqual(null);
    });
  });
});
