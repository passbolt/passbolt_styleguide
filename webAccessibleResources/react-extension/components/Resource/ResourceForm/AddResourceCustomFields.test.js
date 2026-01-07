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
 * @since         5.3.0
 */

/**
 * Unit tests on AddResourceCustomFields in regard of specifications
 */

import { defaultProps } from "./AddResourceCustomFields.test.data";
import AddResourceCustomFieldsPage from "./AddResourceCustomFields.test.page";
import { defaultResourceFormDto } from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import { minimalSecretDataV5StandaloneCustomFieldsCollectionDtos } from "../../../../shared/models/entity/secretData/secretDataV5StandaloneCustomFieldsCollection.test.data";
import CustomFieldEntity from "../../../../shared/models/entity/customField/customFieldEntity";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceCustomFields", () => {
  let page; // The page to test against

  describe("As LU I can see the custom fields form.", () => {
    it("As LU I can see the custom fields form.", () => {
      expect.assertions(7);

      const props = defaultProps();
      page = new AddResourceCustomFieldsPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Custom fields");
      expect(page.getCustomFieldKey(0).value).toEqual("Key 0");
      expect(page.getCustomFieldValue(0).value).toEqual("Value 0");
      expect(page.getCustomFieldKey(1).value).toEqual("Key 1");
      expect(page.getCustomFieldValue(1).value).toEqual("Value 1");
      expect(page.addCustomField.hasAttribute("disabled")).toBeFalsy();
    });

    it("As LU I can see the custom fields form empty.", () => {
      expect.assertions(5);

      const secret = minimalSecretDataV5StandaloneCustomFieldsCollectionDtos();
      secret.custom_fields[0] = CustomFieldEntity.createFromDefault().toDto();
      const props = defaultProps({
        resource: defaultResourceFormDto({
          secret: secret,
        }),
      });
      page = new AddResourceCustomFieldsPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Custom fields");
      expect(page.getCustomFieldKey(0).value).toEqual("");
      expect(page.getCustomFieldValue(0).value).toEqual("");
      expect(page.addCustomField.hasAttribute("disabled")).toBeFalsy();
    });
  });

  describe("Fill form custom fields", () => {
    it("Enter custom field key and value should call callback function.", async () => {
      expect.assertions(5);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceCustomFieldsPage(props);
      await page.fillInput(page.getCustomFieldKey(0), "Key Updated");
      expect(name).toEqual("secret.custom_fields.0.metadata_key");
      expect(value).toEqual("Key Updated");

      await page.fillInput(page.getCustomFieldValue(1), "Value Updated");
      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(name).toEqual("secret.custom_fields.1.secret_value");
      expect(value).toEqual("Value Updated");
    });
  });

  describe("As LU I should see add custom field disable if there is 32 custom fields.", () => {
    it("As LU I can not add custom field when I reach the limit.", async () => {
      expect.assertions(1);
      const secret = minimalSecretDataV5StandaloneCustomFieldsCollectionDtos();
      for (let i = 0; i < 33; i++) {
        secret.custom_fields[i] = CustomFieldEntity.createFromDefault().toDto();
      }
      const props = defaultProps({
        resource: defaultResourceFormDto({
          secret: secret,
        }),
      });
      page = new AddResourceCustomFieldsPage(props);

      expect(page.addCustomField.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe("As LU I should delete a custom field.", () => {
    it("As LU I can see the custom field form deleted.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceCustomFieldsPage(props);

      await page.click(page.getDeleteCustomField(0));

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.custom_fields.0");
      expect(value).toEqual(null);
    });
  });
});
