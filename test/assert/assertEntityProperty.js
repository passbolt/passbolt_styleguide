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
 * @since         4.7.0
 */
import {v4 as uuidv4} from "uuid";

export const SCENARIO_EMPTY = {scenario: "empty", value: ""};
export const SCENARIO_STRING = {scenario: "a string", value: "valid-string"};
export const SCENARIO_INTEGER = {scenario: "an integer", value: 42};
export const SCENARIO_FLOAT = {scenario: "a float", value: 42.2};
export const SCENARIO_OBJECT = {scenario: "an object", value: {str: "string"}};
export const SCENARIO_ARRAY = {scenario: "an array", value: ["string"]};
export const SCENARIO_EMPTY_ARRAY = {scenario: "an empty array", value: []};
export const SCENARIO_UUID = {scenario: "a uuid", value: uuidv4()};
export const SCENARIO_NULL = {scenario: "null", value: null};
export const SCENARIO_YEAR = {scenario: "year", value: "2018"};
export const SCENARIO_YEAR_MONTH = {scenario: "year and month", value: "2018-10"};
export const SCENARIO_YEAR_MONTH_DAY = {scenario: "year, month and day", value: "2018-10-18"};
export const SCENARIO_YEAR_MONTH_DAY_TIME = {scenario: "year, month, day and time", value: "2021-11-17T13:19:48+00:00"};
export const SCENARIO_TRUE = {scenario: "true", value: true};
export const SCENARIO_FALSE = {scenario: "false", value: false};

export const SUCCESS_STRING_SCENARIOS = [SCENARIO_EMPTY, SCENARIO_STRING];
export const FAIL_STRING_SCENARIOS = [SCENARIO_INTEGER, SCENARIO_TRUE, SCENARIO_FALSE, SCENARIO_OBJECT, SCENARIO_ARRAY];

export const assert = (EntityClass, propertyName, successScenarios, failScenarios, rule) => {
  successScenarios.forEach(test => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, rule, dto);
  });
  failScenarios.forEach(test => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, rule, dto);
  });
};

export const assertAssociation = (EntityClass, propertyName, defaultValidDto, successScenarios, failScenarios) => {
  successScenarios.forEach(test => {
    const dto = Object.assign({}, defaultValidDto, {[propertyName]: test.value});
    expect(() => new EntityClass(dto)).not.toThrow();
  });
  failScenarios.forEach(test => {
    const dto = Object.assign({}, defaultValidDto, {[propertyName]: test.value});
    expect(() => new EntityClass(dto)).toThrow();
  });
};

export const assertArrayItem = (EntityClass, propertyName, successScenarios, failScenarios, rule) => {
  successScenarios.forEach(test => {
    const propertyPath = `${propertyName}.0`;
    const dto = {[propertyName]: [test.value]};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyPath, rule, dto);
  });
  failScenarios.forEach(test => {
    const propertyPath = `${propertyName}.0`;
    const dto = {[propertyName]: [test.value]};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyPath, rule, dto);
  });
};

export const string = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_STRING_SCENARIOS, FAIL_STRING_SCENARIOS, "type");
};

export const SUCCESS_UUID_SCENARIOS = [SCENARIO_UUID];
export const FAIL_UUID_SCENARIOS = [SCENARIO_STRING];
export const uuid = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_UUID_SCENARIOS, FAIL_UUID_SCENARIOS, "format");
};

export const required = (EntityClass, propertyName) => {
  const dto = {};
  expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "required", dto);
};

export const notRequired = (EntityClass, propertyName) => {
  const dto = {};
  expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "required", dto);
};

export const SUCCESS_NULL_SCENARIO = [SCENARIO_NULL];
export const nullable = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_NULL_SCENARIO, [], "type");
};

export const notNullable = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, [], SUCCESS_NULL_SCENARIO, "type");
};

const SUCCESS_MIN_LENGTH_SCENARIO = minLength => ([{scenario: "valid length", value: "a".repeat(minLength)}]);
const FAIL_MIN_LENGTH_SCENARIO = minLength => (!minLength ? [] : [{scenario: "too short", value: "a".repeat(minLength - 1)}]);
export const minLength = (EntityClass, propertyName, minLength) => {
  assert(EntityClass, propertyName, SUCCESS_MIN_LENGTH_SCENARIO(minLength), FAIL_MIN_LENGTH_SCENARIO(minLength), "minLength");
};

const SUCCESS_MAX_LENGTH_SCENARIO = maxLength => ([{scenario: "valid length", value: "a".repeat(maxLength)}]);
const FAIL_MAX_LENGTH_SCENARIO = maxLength => ([{scenario: "too long", value: "a".repeat(maxLength + 1)}]);
export const maxLength = (EntityClass, propertyName, maxLength) => {
  assert(EntityClass, propertyName, SUCCESS_MAX_LENGTH_SCENARIO(maxLength), FAIL_MAX_LENGTH_SCENARIO(maxLength), "maxLength");
};

export const SUCCESS_DATETIME_SCENARIO = [
  SCENARIO_YEAR,
  SCENARIO_YEAR_MONTH,
  SCENARIO_YEAR_MONTH_DAY,
  SCENARIO_YEAR_MONTH_DAY_TIME,
];
export const FAIL_DATETIME_SCENARIO = [
  SCENARIO_EMPTY,
  {scenario: "not a date", value: "not-a-date"},
  {scenario: "year, month, day, time and zulu", value: "2018-10-18T08:04:30+00:00Z"},
];
export const dateTime = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_DATETIME_SCENARIO, FAIL_DATETIME_SCENARIO, "format");
};

export const SUCCESS_BOOLEAN_SCENARIO = [SCENARIO_TRUE, SCENARIO_FALSE];
export const FAIL_BOOLEAN_SCENARIO = [SCENARIO_EMPTY, SCENARIO_STRING, SCENARIO_INTEGER, SCENARIO_OBJECT, SCENARIO_ARRAY];
export const boolean = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_BOOLEAN_SCENARIO, FAIL_BOOLEAN_SCENARIO, "type");
};

export const SUCCESS_EMAIL_SCENARIO = [
  {scenario: "abc.efg@domain.com", value: "abc.efg@domain.com"},
  {scenario: "efg@domain.com", value: "efg@domain.com"},
  {scenario: "abc-efg@domain.com", value: "abc-efg@domain.com"},
  {scenario: "abc_efg@domain.com", value: "abc_efg@domain.com"},
  {scenario: "raw@test.ra.ru", value: "raw@test.ra.ru"},
  {scenario: "abc-efg@domain-hyphened.com", value: "abc-efg@domain-hyphened.com"},
  {scenario: "p.o'malley@domain.com", value: "p.o'malley@domain.com"},
  {scenario: "abc+efg@domain.com", value: "abc+efg@domain.com"},
  {scenario: "abc&efg@domain.com", value: "abc&efg@domain.com"},
  {scenario: "abc.efg@12345.com", value: "abc.efg@12345.com"},
  {scenario: "abc.efg@12345.co.jp", value: "abc.efg@12345.co.jp"},
  {scenario: "abc@g.cn", value: "abc@g.cn"},
  {scenario: "abc@x.com", value: "abc@x.com"},
  {scenario: "henrik@sbcglobal.net", value: "henrik@sbcglobal.net"},
  {scenario: "sani@sbcglobal.net", value: "sani@sbcglobal.net"},
  // all ICANN TLDs
  {scenario: "abc@example.aero", value: "abc@example.aero"},
  {scenario: "abc@example.asia", value: "abc@example.asia"},
  {scenario: "abc@example.biz", value: "abc@example.biz"},
  {scenario: "abc@example.cat", value: "abc@example.cat"},
  {scenario: "abc@example.com", value: "abc@example.com"},
  {scenario: "abc@example.coop", value: "abc@example.coop"},
  {scenario: "abc@example.edu", value: "abc@example.edu"},
  {scenario: "abc@example.gov", value: "abc@example.gov"},
  {scenario: "abc@example.info", value: "abc@example.info"},
  {scenario: "abc@example.int", value: "abc@example.int"},
  {scenario: "abc@example.jobs", value: "abc@example.jobs"},
  {scenario: "abc@example.mil", value: "abc@example.mil"},
  {scenario: "abc@example.mobi", value: "abc@example.mobi"},
  {scenario: "abc@example.museum", value: "abc@example.museum"},
  {scenario: "abc@example.name", value: "abc@example.name"},
  {scenario: "abc@example.net", value: "abc@example.net"},
  {scenario: "abc@example.org", value: "abc@example.org"},
  {scenario: "abc@example.pro", value: "abc@example.pro"},
  {scenario: "abc@example.tel", value: "abc@example.tel"},
  {scenario: "abc@example.travel", value: "abc@example.travel"},
  {scenario: "someone@st.t-com.hr", value: "someone@st.t-com.hr"},
  // gTLD's
  {scenario: "example@host.local", value: "example@host.local"},
  {scenario: "example@x.org", value: "example@x.org"},
  {scenario: "example@host.xxx", value: "example@host.xxx"},
  // strange, but technically valid email addresses
  {scenario: "S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de", value: "S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de"},
  {scenario: "customer/department=shipping@example.com", value: "customer/department=shipping@example.com"},
  {scenario: "$A12345@example.com", value: "$A12345@example.com"},
  {scenario: "!def!xyz%abc@example.com", value: "!def!xyz%abc@example.com"},
  {scenario: "_somename@example.com", value: "_somename@example.com"},
  // Unicode
  {scenario: "some@eräume.foo", value: "some@eräume.foo"},
  {scenario: "äu@öe.eräume.foo", value: "äu@öe.eräume.foo"},
  {scenario: "Nyrée.surname@example.com", value: "Nyrée.surname@example.com"},
];
export const FAIL_EMAIL_SCENARIO = [
  {scenario: "abc@example", value: "abc@example"},
  {scenario: "abc@example.c", value: "abc@example.c"},
  {scenario: "abc@example.com.", value: "abc@example.com."},
  {scenario: "abc.@example.com", value: "abc.@example.com"},
  {scenario: "abc@example..com", value: "abc@example..com"},
  {scenario: "abc@example.com.a", value: "abc@example.com.a"},
  {scenario: "abc;@example.com", value: "abc;@example.com"},
  {scenario: "abc@example.com;", value: "abc@example.com;"},
  {scenario: "abc@efg@example.com", value: "abc@efg@example.com"},
  {scenario: "abc@@example.com", value: "abc@@example.com"},
  {scenario: "abc efg@example.com", value: "abc efg@example.com"},
  {scenario: "abc,efg@example.com", value: "abc,efg@example.com"},
  {scenario: "abc@sub,example.com", value: "abc@sub,example.com"},
  {scenario: "abc@sub'example.com", value: "abc@sub'example.com"},
  {scenario: "abc@sub/example.com", value: "abc@sub/example.com"},
  {scenario: "abc@yahoo!.com", value: "abc@yahoo!.com"},
  {scenario: "abc@example_underscored.com", value: "abc@example_underscored.com"},
  {scenario: "raw@test.ra.ru....com", value: "raw@test.ra.ru....com"},
];
export const email = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_EMAIL_SCENARIO, FAIL_EMAIL_SCENARIO, "custom");
};

export const SUCCESS_LOCALE_SCENARIO = [
  {scenario: "en-UK", value: "en-UK"},
  {scenario: "fr-FR", value: "fr-FR"},
];
export const FAIL_LOCALE_SCENARIO = [
  {scenario: "Wrong caps", value: "EN-UK"},
  {scenario: "Incomplete", value: "fr"},
];
export const locale = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_LOCALE_SCENARIO, FAIL_LOCALE_SCENARIO, "pattern");
};

export const enumeration = (EntityClass, propertyName, successValues, failValues = []) => {
  const successScenario = successValues.map(successValue => ({scenario: successValue, value: successValue}));
  const failScenario = failValues.map(failValue => ({scenario: failValue, value: failValue}));
  assert(EntityClass, propertyName, successScenario, failScenario, "enum");
};

export const SUCCESS_INTEGER_SCENARIO = [SCENARIO_INTEGER];
export const FAIL_INTEGER_SCENARIO = [SCENARIO_EMPTY, SCENARIO_STRING, SCENARIO_FLOAT, SCENARIO_OBJECT, SCENARIO_ARRAY];
export const integer = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_INTEGER_SCENARIO, FAIL_INTEGER_SCENARIO, "type");
};

export const SUCCESS_ARRAY_SCENARIO = [SCENARIO_EMPTY_ARRAY];
export const FAIL_ARRAY_SCENARIOS = [SCENARIO_EMPTY, SCENARIO_STRING, SCENARIO_INTEGER, SCENARIO_FLOAT, SCENARIO_OBJECT, SCENARIO_TRUE, SCENARIO_FALSE];
export const array = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_ARRAY_SCENARIO, FAIL_ARRAY_SCENARIOS, "type");
};

export const assertArrayItemString = (EntityClass, propertyName) => {
  assertArrayItem(EntityClass, propertyName, SUCCESS_STRING_SCENARIOS, FAIL_STRING_SCENARIOS, "type");
};


export const FAIL_ARRAY_UUID_SCENARIOS = [SCENARIO_EMPTY, SCENARIO_STRING];
export const assertArrayItemUuid = (EntityClass, propertyName) => {
  assertArrayItem(EntityClass, propertyName, SUCCESS_UUID_SCENARIOS, FAIL_ARRAY_UUID_SCENARIOS, "format");
};

export const arrayStringMaxLength = (EntityClass, propertyName, maxLength) => {
  assertArrayItem(EntityClass, propertyName, SUCCESS_MAX_LENGTH_SCENARIO(maxLength), FAIL_MAX_LENGTH_SCENARIO(maxLength), "maxLength");
};
