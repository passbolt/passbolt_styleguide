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
 * @since         4.8.0
 */
import EntityValidationError from "./entityValidationError";
import CollectionValidationError from "./collectionValidationError";

describe("CollectionValidationError", () => {
  describe("::addEntityValidationError", () => {
    it("throws exception if position argument is not valid", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      const addedError = new EntityValidationError();
      addedError.addError("property_name", "rule_name", "error-message");
      expect(() => error.addItemValidationError("not-integer", addedError)).toThrow(TypeError);
    });

    it("throws exception if error argument is not valid", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      expect(() => error.addItemValidationError(42, "invalid-error")).toThrow(TypeError);
    });

    it("accepts EntityValidationError", () => {
      const error = new CollectionValidationError();
      const addedError = new EntityValidationError();
      addedError.addError("property_name", "rule_name", "error-message");
      error.addItemValidationError(42, addedError);
      expect(error.errors[42]).toEqual(addedError);
    });

    it("accepts CollectionValidationError", () => {
      const error = new CollectionValidationError();
      const subError = new CollectionValidationError();
      const entityError = new EntityValidationError();
      entityError.addError("property_name", "rule_name", "error-message");
      subError.addItemValidationError(42, entityError);
      error.addItemValidationError(1, subError);
      expect(error.errors[1]).toEqual(subError);
    });
  });

  describe("::addCollectionValidationError", () => {
    it("throws exception if rule argument is not valid", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      const addedError = new EntityValidationError();
      addedError.addError("property-name", "rule-name", "error-message");
      expect(() => error.addCollectionValidationError("not-integer", addedError)).toThrow(TypeError);
    });

    it("throws exception if error argument is not valid", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      expect(() => error.addCollectionValidationError("rule-name", 42)).toThrow(TypeError);
    });

    it("accepts error as string", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      error.addCollectionValidationError("rule-name", "The error message");
      expect(error.errors["rule-name"]).toEqual("The error message");
    });
  });

  describe("::details", () => {
    it("should return the details error if no errors were added.", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      expect(error.details).toEqual({});
    });

    it("should return the details error if items or collection errors were added.", () => {
      expect.assertions(1);
      const error = new CollectionValidationError();
      const entityValidationError1 = new EntityValidationError();
      entityValidationError1.addError("property_name", "rule_name", "error-message");
      error.addItemValidationError(2, entityValidationError1);
      const collectionValidationError1 = new CollectionValidationError();
      collectionValidationError1.addCollectionValidationError("rule_name_3", "error-message_3");
      error.addItemValidationError(15, collectionValidationError1);
      const entityValidationError2 = new EntityValidationError();
      entityValidationError2.addError("property_name_2", "rule_name_2", "error-message_2");
      error.addItemValidationError(42, entityValidationError2);
      const collectionValidationError2 = new CollectionValidationError();
      collectionValidationError2.addCollectionValidationError("rule_name_4", "error-message_4");
      error.addItemValidationError(57, collectionValidationError2);
      const expectedDetails = {
        2: {
          property_name: {
            rule_name: "error-message",
          },
        },
        15: {
          rule_name_3: "error-message_3",
        },
        42: {
          property_name_2: {
            rule_name_2: "error-message_2",
          },
        },
        57: {
          rule_name_4: "error-message_4",
        },
      };
      expect(error.details).toEqual(expectedDetails);
    });
  });
});
