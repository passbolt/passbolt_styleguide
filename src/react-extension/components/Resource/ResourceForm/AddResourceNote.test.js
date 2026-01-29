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
 * @since         5.0.0
 */

/**
 * Unit tests on AddResourceNote in regard of specifications
 */

import AddResourceNotePage from "./AddResourceNote.test.page";
import { defaultProps } from "./AddResourceNote.test.data";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceNote", () => {
  let page; // The page to test against

  describe("As LU I can see the resource form.", () => {
    it("As LU I can see the resource note form.", () => {
      expect.assertions(3);

      const props = defaultProps();
      page = new AddResourceNotePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Note");
      expect(page.note.value).toEqual("");
    });
  });

  describe("Fill form note", () => {
    it("Enter note should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceNotePage(props);
      await page.fillInput(page.note, "note");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.description");
      expect(value).toEqual("note");
    });
  });

  describe("As LU I can convert the note to description.", () => {
    it("As LU I can convert the note form.", async () => {
      expect.assertions(1);

      const props = defaultProps({ resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()) });
      page = new AddResourceNotePage(props);

      await page.click(page.convertToDescription);
      expect(props.onConvertToDescription).toHaveBeenCalled();
    });

    it("As LU I cannot convert the description form if there is no resource type v4 default.", async () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection([resourceTypePasswordAndDescriptionDto()]);
      const props = defaultProps({
        resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()),
        resourceTypes,
      });
      page = new AddResourceNotePage(props);

      expect(page.convertToDescription).toBeNull();
    });

    it("As LU I should not see convert the description form if the resource type is not v4 default.", async () => {
      expect.assertions(1);
      const props = defaultProps({ resourceType: new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto()) });
      page = new AddResourceNotePage(props);

      expect(page.convertToDescription).toBeNull();
    });
  });

  describe("As LU I should see the note disabled.", () => {
    it("As LU I can see the note form disabled.", async () => {
      expect.assertions(1);

      const props = defaultProps({ disabled: true });
      page = new AddResourceNotePage(props);

      expect(page.note.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
