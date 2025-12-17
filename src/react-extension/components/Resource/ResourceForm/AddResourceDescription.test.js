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
 * Unit tests on AddResourceDescription in regard of specifications
 */

import { defaultProps } from "./AddResourceDescription.test.data";
import AddResourceDescriptionPage from "./AddResourceDescription.test.page";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import { resourceTypePasswordStringDto } from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceDescription", () => {
  let page; // The page to test against

  describe("As LU I can see the description form.", () => {
    it("As LU I can see the description password form.", () => {
      expect.assertions(3);

      const props = defaultProps({ resource: { metadata: { description: "" } } });
      page = new AddResourceDescriptionPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Description");
      expect(page.description.value).toEqual("");
    });
  });

  describe("Fill form description", () => {
    it("Enter description should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceDescriptionPage(props);
      await page.fillInput(page.description, "description");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.description");
      expect(value).toEqual("description");
    });
  });

  describe("As LU I can convert the description to note.", () => {
    it("As LU I can convert the description form.", async () => {
      expect.assertions(1);

      const props = defaultProps({ resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()) });
      page = new AddResourceDescriptionPage(props);

      await page.click(page.convertToNote);
      expect(props.onConvertToNote).toHaveBeenCalled();
    });

    it("As LU I cannot convert the description form if there is no resource type v4 default.", async () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection([resourceTypePasswordStringDto()]);
      const props = defaultProps({
        resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()),
        resourceTypes,
      });
      page = new AddResourceDescriptionPage(props);

      expect(page.convertToNote).toBeNull();
    });

    it("As LU I should not see convert the description form if the resource type is not v4 password string.", async () => {
      expect.assertions(1);
      const props = defaultProps();
      page = new AddResourceDescriptionPage(props);

      expect(page.convertToNote).toBeNull();
    });
  });

  describe("As LU I should see the description disabled.", () => {
    it("As LU I can see the description form disabled.", async () => {
      expect.assertions(1);

      const props = defaultProps({ disabled: true });
      page = new AddResourceDescriptionPage(props);

      expect(page.description.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
