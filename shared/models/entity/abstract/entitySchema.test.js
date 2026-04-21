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
import each from "jest-each";
import EntitySchema from "./entitySchema";
import {
  SCENARIO_ARRAY,
  SCENARIO_ARRAY_EMPTY,
  SCENARIO_BOOL_FALSE,
  SCENARIO_BOOL_TRUE,
  SCENARIO_DATE_YEAR,
  SCENARIO_DATE_YEAR_MONTH,
  SCENARIO_DATE_YEAR_MONTH_DAY,
  SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
  SCENARIO_EMPTY,
  SCENARIO_FLOAT,
  SCENARIO_INTEGER,
  SCENARIO_NULL,
  SCENARIO_OBJECT,
  SCENARIO_STRING,
  SCENARIO_STRING_UTF8,
  SCENARIO_UNDEFINED,
  SCENARIO_UUID,
  schemaValidateAnyOf,
  schemaValidateEnum,
  schemaValidateFormatDateTime,
  schemaValidateFormatEmail,
  schemaValidateFormatInvalid,
  schemaValidateFormatUuid,
  schemaValidateFormatXBase64,
  schemaValidateFormatXHexColor,
  schemaValidateMaxLength,
  schemaValidateMinLength,
  schemaValidateMinimumIntegerValue,
  schemaValidateMaximumIntegerValue,
  schemaValidateMinimumNumberValue,
  schemaValidateMaximumNumberValue,
  schemaValidateNullable,
  schemaValidatePattern,
  schemaValidateRequired,
  schemaValidateSimple,
  schemaValidateTypeArray,
  schemaValidateTypeBoolean,
  schemaValidateTypeInteger,
  schemaValidateTypeInvalid,
  schemaValidateTypeNumber,
  schemaValidateTypeObject,
  schemaValidateTypeString,
  schemaValidateMinItemsArrayValue,
  schemaValidateSimpleArray,
} from "./entitySchema.test.data";

describe("EntitySchema", () => {
  describe("::validate", () => {
    each([
      SCENARIO_NULL,
      SCENARIO_UNDEFINED,
      // @todo The function should be reworked and assert the kind of expected data, additional test should be written to support it.
    ]).describe("throws a TyperError if the argument name is not valid.", (scenario) => {
      it(`scenario: ${scenario.label}`, async () => {
        expect.assertions(1);
        expect(() => EntitySchema.validate(scenario.data, { name: "test" }, schemaValidateSimple)).toThrow(TypeError);
      });
    });

    each([
      SCENARIO_NULL,
      SCENARIO_UNDEFINED,
      // @todo The function should be reworked and assert the kind of expected data, additional test should be written to support it.
    ]).describe("throws a TyperError if the argument dto is not valid.", (scenario) => {
      it(`scenario: ${scenario.label}`, async () => {
        expect.assertions(1);
        expect(() => EntitySchema.validate("TestObject", scenario.data, schemaValidateSimple)).toThrow(TypeError);
      });
    });

    each([
      SCENARIO_NULL,
      SCENARIO_UNDEFINED,
      // @todo The function should be reworked and assert the kind of expected data, additional test should be written to support it.
    ]).describe("throws a TyperError if the argument schema is not valid.", (scenario) => {
      it(`scenario: ${scenario.label}`, async () => {
        expect.assertions(1);
        expect(() => EntitySchema.validate("TestObject", { name: "test" }, scenario.data)).toThrow(TypeError);
      });
    });

    each([SCENARIO_NULL, SCENARIO_UNDEFINED, { label: "invalid-type", data: "invalid-type" }]).describe(
      "throws a TyperError if the schema type is not supported.",
      (scenario) => {
        it(`scenario: ${scenario.label}`, async () => {
          expect.assertions(1);
          const schema = {
            type: scenario.data,
          };
          expect(() => EntitySchema.validate("TestObject", {}, schema)).toThrow(
            "Could not validate entity TestObject. Unsupported type.",
          );
        });
      },
    );

    it("validates object schema.", () => {
      expect.assertions(2);
      const validObjectMock = jest.spyOn(EntitySchema, "validateObject").mockImplementationOnce(() => {});
      const schema = { type: "object" };
      expect(() => EntitySchema.validate("TestObject", {}, schema)).not.toThrow();
      expect(validObjectMock).toHaveBeenCalled();
    });

    it("validates array schema.", () => {
      expect.assertions(2);
      const validateArrayMock = jest.spyOn(EntitySchema, "validateArray").mockImplementationOnce(() => {});
      const schema = { type: "array" };
      expect(() => EntitySchema.validate("TestObject", {}, schema)).not.toThrow();
      expect(validateArrayMock).toHaveBeenCalled();
    });

    it("throws EntityValidationError id dto is invalid.", () => {
      expect.assertions(1);
      const testObject = {
        id: "nope",
        name: "ok",
        type: "not in list",
      };
      expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateSimple)).toThrowEntityValidationError(
        "id",
        "format",
      );
    });
  });

  describe("::validateObject", () => {
    it("filters out props not part of the schema.", () => {
      const testObject = {
        name: "ok",
        some: "type1",
        not_in_schema: "must be removed",
      };
      const expected = {
        name: "ok",
        some: "type1",
      };
      const result = EntitySchema.validate("TestObject", testObject, schemaValidateSimple);
      expect(result).toEqual(expected);
    });

    it("does not validate nested objects.", () => {
      const testObject = {
        name: "ok",
        some: "type1",
        nested: {
          id: "invalid-id",
        },
      };
      const result = EntitySchema.validate("TestObject", testObject, schemaValidateSimple);
      expect(result.nested.id).toEqual(testObject.nested.id);
      // Ensure it would have been validated if nested object validated directly.
      expect(() =>
        EntitySchema.validate("NestedTestObject", testObject.nested, schemaValidateSimple.properties.nested),
      ).toThrowEntityValidationError("id", "format");
    });

    /*
     * *************************************************************
     * Common assertions
     ***************************************************************
     */

    describe("::required", () => {
      it("throws an error if required and not present", () => {
        // Note that if the property is present but undefined, it will not validate due to other constraint such as the type.
        expect.assertions(1);
        expect(() => EntitySchema.validate("TestObject", {}, schemaValidateRequired)).toThrowEntityValidationError(
          "property",
          "required",
        );
      });

      each([
        SCENARIO_NULL,
        SCENARIO_INTEGER,
        SCENARIO_FLOAT,
        SCENARIO_OBJECT,
        SCENARIO_ARRAY,
        SCENARIO_ARRAY_EMPTY,
        SCENARIO_EMPTY,
        SCENARIO_STRING,
        SCENARIO_UUID,
        SCENARIO_DATE_YEAR,
        SCENARIO_DATE_YEAR_MONTH,
        SCENARIO_DATE_YEAR_MONTH_DAY,
        SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        { label: "0 as an integer", data: 0 },
        { label: "0 as an string", data: "0" },
        SCENARIO_BOOL_TRUE,
        SCENARIO_BOOL_FALSE,
      ]).describe("validates if the property is valid.", (scenario) => {
        it(`scenario: ${scenario.label}`, async () => {
          expect.assertions(1);
          const testObject = { property: scenario.data };
          expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateRequired)).not.toThrow();
        });
      });
    });

    describe("::nullable", () => {
      it("does not throw if the property is nullable and null.", async () => {
        expect.assertions(1);
        const testObject = { property: null };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateNullable)).not.toThrow();
      });
    });

    describe("::anyOf", () => {
      it("throws if none of the condition is valid.", () => {
        expect.assertions(1);
        const testObject = { name: 42 };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateAnyOf)).toThrowEntityValidationError(
          "name",
          "type",
        );
      });

      it("validates one or the other conditions.", () => {
        expect.assertions(4);
        const schema = schemaValidateAnyOf;
        // Validate one condition of the anyOf.
        let testObject = { name: null };
        let result = EntitySchema.validate("TestObject", testObject, schema);
        expect(Object.keys(result).length).toEqual(1); // The parsed object contains only one property.
        expect(result.name).toBeNull();
        // Validate the other condition of the anyOf.
        testObject = { name: "test" };
        result = EntitySchema.validate("TestObject", testObject, schema);
        expect(Object.keys(result).length).toEqual(1); // The parsed object contains only one property.
        expect(result.name).toEqual("test");
      });
    });

    describe("::type", () => {
      it("throws an error if type is not supported", () => {
        expect.assertions(1);
        expect(() => EntitySchema.validate("TestObject", { property: "" }, schemaValidateTypeInvalid)).toThrow(
          "EntitySchema validation type not supported.",
        );
      });

      describe("::type::boolean", () => {
        each([
          SCENARIO_NULL,
          SCENARIO_UNDEFINED,
          SCENARIO_INTEGER,
          SCENARIO_FLOAT,
          SCENARIO_OBJECT,
          SCENARIO_ARRAY,
          SCENARIO_ARRAY_EMPTY,
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
          { label: "1 as an integer", data: 1 },
          { label: "0 as an integer", data: 0 },
          { label: "1 as a string", data: "1" },
          { label: "0 as a string", data: "0" },
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeBoolean),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([SCENARIO_BOOL_TRUE, SCENARIO_BOOL_FALSE]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeBoolean)).not.toThrow();
          });
        });
      });

      describe("::type::string", () => {
        each([
          SCENARIO_NULL,
          SCENARIO_UNDEFINED,
          SCENARIO_INTEGER,
          SCENARIO_FLOAT,
          SCENARIO_OBJECT,
          SCENARIO_ARRAY,
          SCENARIO_ARRAY_EMPTY,
          SCENARIO_BOOL_TRUE,
          SCENARIO_BOOL_FALSE,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeString),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_STRING_UTF8,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeString)).not.toThrow();
          });
        });
      });

      describe("::type::integer", () => {
        each([
          SCENARIO_NULL,
          SCENARIO_UNDEFINED,
          SCENARIO_FLOAT,
          SCENARIO_OBJECT,
          SCENARIO_ARRAY,
          SCENARIO_ARRAY_EMPTY,
          SCENARIO_BOOL_TRUE,
          SCENARIO_BOOL_FALSE,
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeInteger),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([SCENARIO_INTEGER]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeInteger)).not.toThrow();
          });
        });
      });

      describe("::type::number", () => {
        each([
          SCENARIO_NULL,
          SCENARIO_UNDEFINED,
          SCENARIO_OBJECT,
          SCENARIO_ARRAY,
          SCENARIO_ARRAY_EMPTY,
          SCENARIO_BOOL_TRUE,
          SCENARIO_BOOL_FALSE,
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeNumber),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([SCENARIO_INTEGER, SCENARIO_FLOAT]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeNumber)).not.toThrow();
          });
        });
      });

      describe("::type::object", () => {
        each([
          SCENARIO_UNDEFINED,
          /*
           * @todo Entity schema validation should be strict
           * SCENARIO_NULL,
           * SCENARIO_ARRAY,
           * SCENARIO_ARRAY_EMPTY,
           */
          SCENARIO_BOOL_TRUE,
          SCENARIO_BOOL_FALSE,
          SCENARIO_INTEGER,
          SCENARIO_FLOAT,
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeObject),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([
          SCENARIO_OBJECT,
          // @todo Entity schema validation should be strict and the following should not validate.
          SCENARIO_NULL,
          SCENARIO_ARRAY,
          SCENARIO_ARRAY_EMPTY,
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeObject)).not.toThrow();
          });
        });
      });

      describe("::type::array", () => {
        each([
          SCENARIO_NULL,
          SCENARIO_UNDEFINED,
          SCENARIO_INTEGER,
          SCENARIO_FLOAT,
          SCENARIO_OBJECT,
          SCENARIO_BOOL_TRUE,
          SCENARIO_BOOL_FALSE,
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateTypeArray),
            ).toThrowEntityValidationError("property", "type");
          });
        });

        each([SCENARIO_ARRAY, SCENARIO_ARRAY_EMPTY]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateTypeArray)).not.toThrow();
          });
        });
      });

      describe.skip("::type::blob", () => {
        // @todo
      });
    });

    /*
     * *************************************************************
     * String assertions
     ***************************************************************
     */

    describe("::format", () => {
      it("throws an error if format is not supported", () => {
        expect.assertions(1);
        expect(() => EntitySchema.validate("TestObject", { property: "" }, schemaValidateFormatInvalid)).toThrow(
          "EntitySchema string validation format invalid is not supported.",
        );
      });

      describe("::format::uuid", () => {
        each([
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_STRING_UTF8,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateFormatUuid),
            ).toThrowEntityValidationError("property", "format");
          });
        });

        each([SCENARIO_UUID]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateFormatUuid)).not.toThrow();
          });
        });
      });

      describe("::format::date-time", () => {
        each([
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_STRING_UTF8,
          SCENARIO_UUID,
          { label: "Date expressed in common language", data: "yesterday" },
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateFormatDateTime),
            ).toThrowEntityValidationError("property", "format");
          });
        });

        each([
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateFormatDateTime)).not.toThrow();
          });
        });
      });

      describe("::format::email", () => {
        each([
          SCENARIO_EMPTY,
          SCENARIO_STRING,
          SCENARIO_STRING_UTF8,
          SCENARIO_UUID,
          SCENARIO_DATE_YEAR,
          SCENARIO_DATE_YEAR_MONTH,
          SCENARIO_DATE_YEAR_MONTH_DAY,
          SCENARIO_DATE_YEAR_MONTH_DAY_TIME,
          { label: "abc@example", data: "abc@example" },
          { label: "@example.com", data: "@example.com" },
          { label: "abc@", data: "abc@" },
          { label: "abc@example.c", data: "abc@example.c" },
          { label: "abc@example.com.", data: "abc@example.com." },
          { label: "abc.@example.com", data: "abc.@example.com" },
          { label: "abc@example..com", data: "abc@example..com" },
          { label: "abc@example.com.a", data: "abc@example.com.a" },
          { label: "abc;@example.com", data: "abc;@example.com" },
          { label: "abc@example.com;", data: "abc@example.com;" },
          { label: "abc@efg@example.com", data: "abc@efg@example.com" },
          { label: "abc@@example.com", data: "abc@@example.com" },
          { label: "abc efg@example.com", data: "abc efg@example.com" },
          { label: "abc,efg@example.com", data: "abc,efg@example.com" },
          { label: "abc@sub,example.com", data: "abc@sub,example.com" },
          { label: "abc@sub'example.com", data: "abc@sub'example.com" },
          { label: "abc@sub/example.com", data: "abc@sub/example.com" },
          { label: "abc@yahoo!.com", data: "abc@yahoo!.com" },
          { label: "abc@example_underscored.com", data: "abc@example_underscored.com" },
          { label: "raw@test.ra.ru....com", data: "raw@test.ra.ru....com" },
          /*
           * @todo Cleanup: does not validate in IsEmailValidator custom regex, but validate with the library Validator.isEmail
           * {label: "ÊXÃMPLÊ@HÕST.ÇÕM", data: "ÊXÃMPLÊ@HÕST.ÇÕM"},
           */
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateFormatEmail),
            ).toThrowEntityValidationError("property", "format");
          });
        });

        each([
          { label: "abc.efg@domain.com", data: "abc.efg@domain.com" },
          { label: "efg@domain.com", data: "efg@domain.com" },
          { label: "abc-efg@domain.com", data: "abc-efg@domain.com" },
          { label: "abc_efg@domain.com", data: "abc_efg@domain.com" },
          { label: "raw@test.ra.ru", data: "raw@test.ra.ru" },
          { label: "abc-efg@domain-hyphened.com", data: "abc-efg@domain-hyphened.com" },
          { label: "p.o'malley@domain.com", data: "p.o'malley@domain.com" },
          { label: "abc+efg@domain.com", data: "abc+efg@domain.com" },
          { label: "abc&efg@domain.com", data: "abc&efg@domain.com" },
          { label: "abc.efg@12345.com", data: "abc.efg@12345.com" },
          { label: "abc.efg@12345.co.jp", data: "abc.efg@12345.co.jp" },
          { label: "abc@g.cn", data: "abc@g.cn" },
          { label: "abc@x.com", data: "abc@x.com" },
          { label: "henrik@sbcglobal.net", data: "henrik@sbcglobal.net" },
          { label: "sani@sbcglobal.net", data: "sani@sbcglobal.net" },
          // all ICANN TLDs
          { label: "abc@example.aero", data: "abc@example.aero" },
          { label: "abc@example.asia", data: "abc@example.asia" },
          { label: "abc@example.biz", data: "abc@example.biz" },
          { label: "abc@example.cat", data: "abc@example.cat" },
          { label: "abc@example.com", data: "abc@example.com" },
          { label: "abc@example.coop", data: "abc@example.coop" },
          { label: "abc@example.edu", data: "abc@example.edu" },
          { label: "abc@example.gov", data: "abc@example.gov" },
          { label: "abc@example.info", data: "abc@example.info" },
          { label: "abc@example.int", data: "abc@example.int" },
          { label: "abc@example.jobs", data: "abc@example.jobs" },
          { label: "abc@example.mil", data: "abc@example.mil" },
          { label: "abc@example.mobi", data: "abc@example.mobi" },
          { label: "abc@example.museum", data: "abc@example.museum" },
          { label: "abc@example.name", data: "abc@example.name" },
          { label: "abc@example.net", data: "abc@example.net" },
          { label: "abc@example.org", data: "abc@example.org" },
          { label: "abc@example.pro", data: "abc@example.pro" },
          { label: "abc@example.tel", data: "abc@example.tel" },
          { label: "abc@example.travel", data: "abc@example.travel" },
          { label: "someone@st.t-com.hr", data: "someone@st.t-com.hr" },
          // gTLD's
          { label: "example@host.local", data: "example@host.local" },
          { label: "example@x.org", data: "example@x.org" },
          { label: "example@host.xxx", data: "example@host.xxx" },
          // strange, but technically valid email addresses
          {
            label: "S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de",
            data: "S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de",
          },
          { label: "customer/department=shipping@example.com", data: "customer/department=shipping@example.com" },
          { label: "$A12345@example.com", data: "$A12345@example.com" },
          { label: "!def!xyz%abc@example.com", data: "!def!xyz%abc@example.com" },
          { label: "_somename@example.com", data: "_somename@example.com" },
          // Unicode
          { label: "some@eräume.foo", data: "some@eräume.foo" },
          { label: "äu@öe.eräume.foo", data: "äu@öe.eräume.foo" },
          { label: "Nyrée.surname@example.com", data: "Nyrée.surname@example.com" },
          // Uppercase
          { label: "example@host.COM", data: "example@host.COM" },
          { label: "example@HOST.ORG", data: "example@HOST.ORG" },
          { label: "EXAMPLE@HOST.LU", data: "EXAMPLE@HOST.LU" },
          { label: "ÊXÃMPLÊ@HÕST.LU", data: "ÊXÃMPLÊ@HÕST.LU" },
          // @todo Cleanup: does not validate in IsEmailValidator custom regex, but validate with the library Validator.isEmail
          { label: "ÊXÃMPLÊ@HÕST.ÇÕM", data: "ÊXÃMPLÊ@HÕST.ÇÕM" },
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateFormatEmail)).not.toThrow();
          });
        });
      });

      describe("::format::x-hex-color", () => {
        each([
          { label: "", data: "" },
          { label: "#012#01", data: "#012#01" },
          { label: "##01201", data: "##01201" },
          { label: "012#", data: "012#" },
          { label: "#01", data: "#01" },
          { label: "34", data: "34" },
          { label: "#1", data: "#1" },
          { label: "2", data: "2" },
          { label: "#12345", data: "#12345" },
          { label: "12345", data: "12345" },
          { label: "#1234567", data: "#1234567" },
          { label: "1234567", data: "1234567" },
          { label: "#123456789", data: "#123456789" },
          { label: "123456789", data: "123456789" },
          { label: "#abcdefgh", data: "#abcdefgh" },
          { label: "abcdefgh", data: "abcdefgh" },
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateFormatXHexColor),
            ).toThrowEntityValidationError("property", "format");
          });
        });

        each([
          { label: "#012", data: "#012" },
          { label: "345", data: "345" },
          { label: "#678", data: "#678" },
          { label: "9aB", data: "9aB" },
          { label: "#cDeF01", data: "#cDeF01" },
          { label: "234567", data: "234567" },
          { label: "#89aBcDeF", data: "#89aBcDeF" },
          { label: "01234567", data: "01234567" },
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateFormatXHexColor)).not.toThrow();
          });
        });
      });

      describe("::format::x-base64", () => {
        each([
          { label: "aGVsbG8gcGFzc2JvbHQ", data: "aGVsbG8gcGFzc2JvbHQ" },
          { label: "aGVsbG8gcG==Fzc2JvbHQ", data: "aGVsbG8gcG==Fzc2JvbHQ" },
          { label: "==aGVsbG8gcGFzc2JvbHQ", data: "==aGVsbG8gcGFzc2JvbHQ" },
          { label: "$€`£ù%*:", data: "$€`£ù%*:" },
        ]).describe("throws an EntityValidationError if the property is not valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() =>
              EntitySchema.validate("TestObject", testObject, schemaValidateFormatXBase64),
            ).toThrowEntityValidationError("property", "format");
          });
        });

        each([
          { label: "aGVsbG8gcGFzc2JvbHQ=", data: "aGVsbG8gcGFzc2JvbHQ=" },
          { label: "aGVsbG8gcGFzc2JvbHQ+", data: "aGVsbG8gcGFzc2JvbHQ+" },
          {
            label: "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj02LUhVZ3pZUG05Zw==",
            data: "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj02LUhVZ3pZUG05Zw==",
          },
        ]).describe("validates if the property is valid.", (scenario) => {
          it(`scenario: ${scenario.label}`, async () => {
            expect.assertions(1);
            const testObject = { property: scenario.data };
            expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateFormatXBase64)).not.toThrow();
          });
        });
      });
    });

    describe("::enum", () => {
      it("throws if the prop value is not part of the enum list.", () => {
        expect.assertions(1);
        const testObject = { property: "invalid" };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateEnum)).toThrowEntityValidationError(
          "property",
          "enum",
        );
      });

      it("validates if part of the valid enum list.", () => {
        expect.assertions(2);
        const schema = schemaValidateEnum;
        // Validate first item.
        let testObject = { property: "value1" };
        expect(() => EntitySchema.validate("TestObject", testObject, schema)).not.toThrow();
        // Validate first item.
        testObject = { property: "value2" };
        expect(() => EntitySchema.validate("TestObject", testObject, schema)).not.toThrow();
      });
    });

    describe("::minLength", () => {
      it("throws if the prop value length does not validate.", () => {
        expect.assertions(1);
        const testObject = { property: "12" };
        expect(() =>
          EntitySchema.validate("TestObject", testObject, schemaValidateMinLength),
        ).toThrowEntityValidationError("property", "minLength");
      });

      it("validates if the prop value length is above the minimum requirements.", () => {
        expect.assertions(1);
        const testObject = { property: "123" };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateMinLength)).not.toThrow();
      });
    });

    describe("::maxLength", () => {
      it("throws if the prop value length does not validate.", () => {
        expect.assertions(1);
        const testObject = { property: "1234" };
        expect(() =>
          EntitySchema.validate("TestObject", testObject, schemaValidateMaxLength),
        ).toThrowEntityValidationError("property", "maxLength");
      });

      it("validates if the prop value length is bellow the minimum requirements.", () => {
        expect.assertions(1);
        const testObject = { property: "123" };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateMaxLength)).not.toThrow();
      });
    });

    describe("::minimum", () => {
      describe("::type::number", () => {
        it("throws if the prop value is lesser than expected.", () => {
          expect.assertions(1);
          const testObject = { property: 12 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMinimumNumberValue),
          ).toThrowEntityValidationError("property", "minimum");
        });

        it("validates if the prop value length is above the minimum requirements.", () => {
          expect.assertions(1);
          const testObject = { property: 123 };
          expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateMinimumNumberValue)).not.toThrow();
        });
      });

      describe("::type::integer", () => {
        it("throws if the prop value is lesser than expected.", () => {
          expect.assertions(1);
          const testObject = { property: 12 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMinimumIntegerValue),
          ).toThrowEntityValidationError("property", "minimum");
        });

        it("validates if the prop value length is above the minimum requirements.", () => {
          expect.assertions(1);
          const testObject = { property: 123 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMinimumIntegerValue),
          ).not.toThrow();
        });
      });
    });

    describe("::maximum", () => {
      describe("::type::number", () => {
        it("throws if the prop value is lesser than expected.", () => {
          expect.assertions(1);
          const testObject = { property: 123 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMaximumNumberValue),
          ).toThrowEntityValidationError("property", "maximum");
        });

        it("validates if the prop value length is above the minimum requirements.", () => {
          expect.assertions(1);
          const testObject = { property: 12 };
          expect(() => EntitySchema.validate("TestObject", testObject, schemaValidateMaximumNumberValue)).not.toThrow();
        });
      });

      describe("::type::integer", () => {
        it("throws if the prop value is lesser than expected.", () => {
          expect.assertions(1);
          const testObject = { property: 123 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMaximumIntegerValue),
          ).toThrowEntityValidationError("property", "maximum");
        });

        it("validates if the prop value length is above the minimum requirements.", () => {
          expect.assertions(1);
          const testObject = { property: 12 };
          expect(() =>
            EntitySchema.validate("TestObject", testObject, schemaValidateMaximumIntegerValue),
          ).not.toThrow();
        });
      });
    });

    describe("::pattern", () => {
      it("throws if the prop value length does not validate.", () => {
        expect.assertions(1);
        const testObject = { property: "1+3" };
        expect(() =>
          EntitySchema.validate("TestObject", testObject, schemaValidatePattern),
        ).toThrowEntityValidationError("property", "pattern");
      });

      it("validates if the prop value length is bellow the minimum requirements.", () => {
        expect.assertions(1);
        const testObject = { property: "123" };
        expect(() => EntitySchema.validate("TestObject", testObject, schemaValidatePattern)).not.toThrow();
      });
    });
  });

  describe("::validateArray", () => {
    describe("::items", () => {
      it("throws if the prop value is not an array.", () => {
        expect.assertions(1);
        const testArray = {};
        expect(() =>
          EntitySchema.validate("TestArray", testArray, schemaValidateSimpleArray),
        ).toThrowEntityValidationError("items", "type", "The items is not a valid array.");
      });

      it("validates if the prop value items is empty.", () => {
        expect.assertions(1);
        const testArray = [];
        expect(() => EntitySchema.validate("TestArray", testArray, schemaValidateSimpleArray)).not.toThrow();
      });

      it("validates if the prop value items is not empty.", () => {
        expect.assertions(1);
        const testArray = [{ items: 123 }];
        expect(() => EntitySchema.validate("TestArray", testArray, schemaValidateSimpleArray)).not.toThrow();
      });
    });
    describe("::minItems", () => {
      it("throws if the prop value is lesser than expected.", () => {
        expect.assertions(1);
        const testArray = [];
        expect(() =>
          EntitySchema.validate("TestArray", testArray, schemaValidateMinItemsArrayValue),
        ).toThrowEntityValidationError("minItems");
      });

      it("validates if the prop value length is above the minimum requirements.", () => {
        expect.assertions(1);
        const testArray = [{ items: 123 }];
        expect(() => EntitySchema.validate("TestArray", testArray, schemaValidateMinItemsArrayValue)).not.toThrow();
      });
    });
  });
});
