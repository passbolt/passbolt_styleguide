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
 * @since         2.13.0
 */
import EntityValidationError from "./entityValidationError";

describe("EntityValidationError", () => {
  describe("::addError", () => {
    it("throws exception if property is not a string", () => {
      const t = () => {
        const e = new EntityValidationError('placeholder message');
        e.addError(null, null, null);
      };
      expect(t).toThrow(TypeError);
    });

    it("throws exception if rule is not a string", () => {
      const t = () => {
        const e = new EntityValidationError('placeholder message');
        e.addError('prop', null, null);
      };
      expect(t).toThrow(TypeError);
    });

    it("throws exception if message is not a string", () => {
      const t = () => {
        const e = new EntityValidationError('placeholder message');
        e.addError('prop', 'rule', null);
      };
      expect(t).toThrow(TypeError);
    });

    it("addErrors add exception details", () => {
      const e = new EntityValidationError('placeholder message');
      e.addError('prop1', 'rule1', 'message1');
      e.addError('prop2', 'rule1', 'message1');
      e.addError('prop1', 'rule2', 'message2');
      expect(e.details).toEqual({
        'prop1': {
          'rule1': 'message1',
          'rule2': 'message2'
        },
        'prop2': {
          'rule1': 'message1'
        }
      });

      expect(e.hasError('prop1')).toBe(true);
      expect(e.hasError('prop2')).toBe(true);
      expect(e.hasError('prop3')).toBe(false);
      expect(e.hasError('prop1', 'rule1')).toBe(true);
      expect(e.hasError('prop1', 'rule2')).toBe(true);
      expect(e.hasError('prop2', 'rule1')).toBe(true);
      expect(e.hasError('prop2', 'rule2')).toBe(false);
    });
  });

  describe("::getError", () => {
    it("should return a map of errors of the given field", () => {
      expect.assertions(2);

      const eve = new EntityValidationError();

      eve.addError("field-1", "required", "the field is required");
      eve.addError("field-2", "type", "the type of the field is wrong");

      const field1Error = eve.getError("field-1");
      const expectedField1Errors = {
        required:  "the field is required"
      };
      expect(field1Error).toStrictEqual(expectedField1Errors);

      const field2Error = eve.getError("field-2");
      const expectedField2Errors = {
        type: "the type of the field is wrong"
      };
      expect(field2Error).toStrictEqual(expectedField2Errors);
    });

    it("should return a single error of the given field with the given validation rule", () => {
      expect.assertions(1);

      const eve = new EntityValidationError();

      const expectedField1ErrorMessage = "the field is required";
      eve.addError("field-1", "required", expectedField1ErrorMessage);

      const field1Error = eve.getError("field-1", "required");
      expect(field1Error).toStrictEqual(expectedField1ErrorMessage);
    });

    it("should return null if the field has an error but not of the given validation rule", () => {
      expect.assertions(1);

      const eve = new EntityValidationError();

      const expectedField1ErrorMessage = "the field is required";
      eve.addError("field-1", "required", expectedField1ErrorMessage);

      const field1Error = eve.getError("field-1", "other-rule");
      expect(field1Error).toBeNull();
    });

    it("should return null if the given field has no error", () => {
      expect.assertions(1);

      const eve = new EntityValidationError();

      eve.addError("field-1", "required", "the field is required");
      eve.addError("field-2", "type", "the type of the field is wrong");
      expect(eve.getError("non-set-field")).toBeNull();
    });
  });
});
