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
 * @since         4.3.0
 */

import ViewModelValidationError from "./ViewModelValidationError";

describe("ViewModelValidationError", () => {
  describe("::addError", () => {
    it("should add an error on a new field", () => {
      expect.assertions(3);

      const vmve = new ViewModelValidationError();
      let errors = vmve.errors;
      expect(Object.keys(errors).length).toStrictEqual(0);

      vmve.addError("field", "required", "the field is required");
      errors = vmve.errors;
      expect(Object.keys(errors).length).toStrictEqual(1);
      expect(Object.keys(vmve.getFieldErrors('field')).length).toStrictEqual(1);
    });

    it("should add an error on an existing field", () => {
      expect.assertions(2);

      const vmve = new ViewModelValidationError();

      vmve.addError("field", "required", "the field is required");
      vmve.addError("field", "type", "the type of the field is wrong");

      expect(Object.keys(vmve.errors).length).toStrictEqual(1);
      expect(Object.keys(vmve.getFieldErrors('field')).length).toStrictEqual(2);
    });
  });

  describe("::getFieldErrors", () => {
    it("should return a map of errors of the given field", () => {
      expect.assertions(2);

      const vmve = new ViewModelValidationError();

      vmve.addError("field-1", "required", "the field is required");
      vmve.addError("field-2", "type", "the type of the field is wrong");

      const field1Error = vmve.getFieldErrors("field-1");
      const expectedField1Errors = {
        required:  "the field is required"
      };
      expect(field1Error).toStrictEqual(expectedField1Errors);

      const field2Error = vmve.getFieldErrors("field-2");
      const expectedField2Errors = {
        type: "the type of the field is wrong"
      };
      expect(field2Error).toStrictEqual(expectedField2Errors);
    });

    it("should return null if the given field has no error", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      vmve.addError("field-1", "required", "the field is required");
      vmve.addError("field-2", "type", "the type of the field is wrong");
      expect(vmve.getFieldErrors("non-set-field")).toBeNull();
    });
  });

  describe("::hasErrors", () => {
    it("should return true if at least 1 field has an error", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      vmve.addError("field-1", "required", "the field is required");
      expect(vmve.hasErrors()).toStrictEqual(true);
    });

    it("should return false if there is no registered errors", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      expect(vmve.hasErrors()).toStrictEqual(false);
    });
  });

  describe("::hasFieldErrors", () => {
    it("should return true if the given field has at least 1 error", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      vmve.addError("field-1", "required", "the field is required");
      expect(vmve.hasFieldErrors("field-1")).toStrictEqual(true);
    });

    it("should return false if the given field has no errors", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      expect(vmve.hasFieldErrors("field-1")).toStrictEqual(false);
    });

    it("should return false if the given field has no errors even if other fields have errors", () => {
      expect.assertions(1);

      const vmve = new ViewModelValidationError();

      vmve.addError("field-1", "required", "the field is required");
      expect(vmve.hasFieldErrors("field-2")).toStrictEqual(false);
    });
  });
});
