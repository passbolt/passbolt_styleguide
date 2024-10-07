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

const SUCCESS_MIN_SCENARIO = min => ([{scenario: "valid minimal value", value: min}]);
const FAIL_MIN_SCENARIO = min => ([{scenario: "less than minimal value", value: min - 1}]);
export const minimum = (EntityClass, propertyName, minimum) => {
  assert(EntityClass, propertyName, SUCCESS_MIN_SCENARIO(minimum), FAIL_MIN_SCENARIO(minimum), "minimum");
};

const SUCCESS_MAX_SCENARIO = max => ([{scenario: "valid maximal value", value: max}]);
const FAIL_MAX_SCENARIO = max => ([{scenario: "more than maximal value", value: max + 1}]);
export const maximum = (EntityClass, propertyName, maximum) => {
  assert(EntityClass, propertyName, SUCCESS_MAX_SCENARIO(maximum), FAIL_MAX_SCENARIO(maximum), "maximum");
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

export const assertCollection = (CollectionClass, successScenarios, failScenarios, rule) => {
  successScenarios.forEach(test => {
    const dto = test.value;
    expect(() => new CollectionClass(dto)).not.toThrowCollectionValidationError(rule, dto);
  });
  failScenarios.forEach(test => {
    const dto = test.value;
    expect(() => new CollectionClass(dto)).toThrowCollectionValidationError(rule, dto);
  });
};

export const SCENARIO_COLLECTION_EMPTY = {scenario: "collection empty", value: []};
export const SCENARIO_COLLECTION_STRING = {scenario: "collection of string", value: ["valid-string"]};
export const SCENARIO_COLLECTION_INTEGER = {scenario: "collection of integer", value: [42]};
export const SCENARIO_COLLECTION_FLOAT = {scenario: "collection of float", value: [42.2]};
export const SCENARIO_COLLECTION_OBJECT = {scenario: "collection of object", value: [{str: "string"}]};
export const SCENARIO_COLLECTION_BOOLEAN = {scenario: "collection of boolean", value: [true, false]};

export const SUCCESS_COLLECTION_SCENARIO = [
  SCENARIO_COLLECTION_EMPTY,
  SCENARIO_COLLECTION_STRING,
  SCENARIO_COLLECTION_INTEGER,
  SCENARIO_COLLECTION_FLOAT,
  SCENARIO_COLLECTION_OBJECT,
  SCENARIO_COLLECTION_BOOLEAN
];
export const FAIL_COLLECTION_SCENARIOS = [
  // SCENARIO_EMPTY, // @todo Empty string is not well handled by schema validator, it fails but due to an assertion of the function parameters.
  SCENARIO_STRING,
  SCENARIO_INTEGER,
  SCENARIO_FLOAT,
  SCENARIO_OBJECT,
  SCENARIO_TRUE,
  // SCENARIO_FALSE // @todo False is not well handled by schema validator, it fails but due to an assertion of the function parameters.
];
export const collection = CollectionClass => {
  assertCollection(CollectionClass, SUCCESS_COLLECTION_SCENARIO, FAIL_COLLECTION_SCENARIOS, "items.type");
};

const SUCCESS_COLLECTION_MIN_ITEMS_SCENARIO = minLength => ([{scenario: "valid length", value: "a".repeat(minLength).split("")}]);
const FAIL_COLLECTION_MIN_ITEMS_SCENARIO = minLength => (!minLength ? [] : [{scenario: "too short", value: "a".repeat(minLength - 1).split("")}]);
export const collectionMinItems = (CollectionClass, minLength) => {
  assertCollection(CollectionClass, SUCCESS_COLLECTION_MIN_ITEMS_SCENARIO(minLength), FAIL_COLLECTION_MIN_ITEMS_SCENARIO(minLength), "minItems");
};

/**
 * Returns a PGP message suitable for the MetadataPrivateKeyEntity data field
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if true, adds a CRC block at the end of the message
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the message header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the message not a valid PGP message
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the message not a valid PGP message
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generate message, seperated by carriage return
 * @returns {string}
 */
export const defaultPgpMessage = options => mutatePgpBlockFromOptions(_pgpMessage, options);

/**
 * Returns a PGP message suitable for the MetadataPrivateKeyEntity armored_key field
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if true, adds a CRC block at the end of the private key
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the private key header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the private key not a valid PGP message
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the private key not a valid PGP message
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generate private key, seperated by carriage return
 * @returns {string}
 */

export const defaultArmoredKey = options => mutatePgpBlockFromOptions(_armoredPgpPrivateKey, options);

/**
 * Changes the given block according to the given options.
 * @param {string} block a valid PGP block (key or message)
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if false, removes the CRC block at the end of the PGP block
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the PGP block header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the message not a valid PGP block
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generated block, seperated by carriage returns
 * @returns {string}
 * @private
 */
function mutatePgpBlockFromOptions(block, options = {withCrc: true, withComments: false, withWrongExtraCharacters: false, withDuplicates: false}) {
  if (options.withComments) {
    block = block.replace("\n\n", "\nVersion: PGP 1.0\nComments: This is a test\n\n");
  }

  if (options.withWrongExtraCharacters) {
    block = block.replace(/\n\n(.{64})\n/, '\n\n$1Wrong Stuff Here\n');
  }

  if (!options.withCrc) {
    block = block.replace(/\n=[a-zA-Z0-9/+=]{4}\n-----/, '\n-----');
  }

  if (options.withDuplicates) {
    block = `${block}\n\n${block}\n\n${block}`;
  }
  return block;
}

/**
 * @type {string}
 * @private
 */
const _pgpMessage = `-----BEGIN PGP MESSAGE-----

hQIMAwtiNSax40KHAQ/9E0aon1ZgSczY+l9kdAkrITs3efMjEXfb3RIK0pI7pQus
9CjRkqyfSLFKoFgEtKg5kta7sP9/5GH5lA/7e5nrbOrS8pRbsFEoZ8Duho9PV1x0
esYbrUD9dGueAxDN+US5Mvo564bodGCSvsI7siGzTouNq0Jq2AP288rIFTfvZnOc
1mAoz0gfR6tG1PbKkpfP/b8ZhgX7K/DYUuGcrXABqT9ruTTscB4OPtVmONXq3Xaw
i1WDpJxEnyAsE/0M+Y1RHtL3Y4pTdX04MyCxYCAQM5qBpG18LjEhkbo0z0FxjU5x
2JTn7p31cYgjDKIseg7l9YR79HaLtUoh2USW+95TcCsnEmdMOf4d6rmXW7inXYfD
mMIUAD4q3Zf4WeFqwA99bHrthiO4ghIe3omsd9s6UDjTbOtPJgzqQDfmCwZRXQp6
V7gp8CW0sipw58O2+htv/EHn3wl+RPo7db3reIs7iDBkJXaYTB4S8wR2zxHi9k5y
arCUU9ZvIP4yffshITQ/hywtf8Y6B2KpqUw3eLg2ZX0LsBcvFR6y/6OatyDQF+nx
91I+osb9fuHQwFKqFSnY3CXJcV3aQ27lc9E0/Qkq481fKokjvRQ31n23lW4y3hdR
54lF/WEjQU6nkPlSuDguG3+yrvOEYMEoQHQilFzsQEgqE4NWOjwrEF7FoK4p/GjS
QQE5UE8bLN548QW6LwqHFmw6e7wwZnbcsJMLa72G/aDolpUslWNuGNRVRvjM+bJ3
HB8ym/pdDVi7YATf8h90V8qN
=F1li
-----END PGP MESSAGE-----`;

/**
 * @type {string}
 * @private
 */
const _armoredPgpPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=KFUt
-----END PGP PRIVATE KEY BLOCK-----`;

const SUCCESS_FINGERPRINT_SCENARIO = [
  {scenario: "with a valid fingerprint string", value: "ABCD".repeat(10)},
];
const FAIL_FINGERPRINT_SCENARIO = [
  {scenario: "with a invalid fingerprint string size", value: "ABCD".repeat(40)},
];
export const fingerprint = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_FINGERPRINT_SCENARIO, FAIL_FINGERPRINT_SCENARIO, "pattern");
};

const SUCCESS_ARMORED_PRIVATE_KEY_SCENARIO = [
  {scenario: "with comments in the header", value: defaultArmoredKey({withCrc: true, withComments: true})},
  {scenario: "without comment in the header", value: defaultArmoredKey({withCrc: true, withComments: false})},
  {scenario: "with comments in the header and multiple blocks", value: defaultArmoredKey({withCrc: true, withComments: true, withDuplicates: true})},
  {scenario: "without comment in the header and multiple blocks", value: defaultArmoredKey({withCrc: true, withComments: false, withDuplicates: true})},
];
const FAIL_ARMORED_PRIVATE_KEY_SCENARIO = [
  {scenario: "without CRC", value: defaultArmoredKey({withCrc: false})},
  {scenario: "without CRC and with multiple blocks", value: defaultArmoredKey({withCrc: false, withDuplicates: true})},
  {scenario: "with wrong extra characters", value: defaultArmoredKey({withCrc: true, withWrongExtraCharacters: true})},
  {scenario: "with wrong extra characters and multiple blocks", value: defaultArmoredKey({withCrc: true, withWrongExtraCharacters: true, withDuplicates: true})}
];

export const armoredPrivateKey = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, SUCCESS_ARMORED_PRIVATE_KEY_SCENARIO, FAIL_ARMORED_PRIVATE_KEY_SCENARIO, "pattern");
};

const successScenarios = [
  {scenario: "with comments in the header", value: defaultPgpMessage({withCrc: true, withComments: true})},
  {scenario: "without comments in the header", value: defaultPgpMessage({withCrc: true, withComments: false})},
  {scenario: "with comments in the header and multiple blocks", value: defaultPgpMessage({withCrc: true, withComments: true, withDuplicates: true})},
  {scenario: "without comments in the header and multiple blocks", value: defaultPgpMessage({withCrc: true, withComments: false, withDuplicates: true})},
];
const failScenarios = [
  {scenario: "without CRC", value: defaultPgpMessage({withCrc: false})},
  {scenario: "without CRC and multiple blocks", value: defaultPgpMessage({withCrc: false, withDuplicates: true})},
  {scenario: "with wrong extra characters", value: defaultPgpMessage({withCrc: true, withWrongExtraCharacters: true})},
  {scenario: "with wrong extra characters and multiple blocks", value: defaultPgpMessage({withCrc: true, withWrongExtraCharacters: true, withDuplicates: true})}];
export const armoredPgpMessage = (EntityClass, propertyName) => {
  assert(EntityClass, propertyName, successScenarios, failScenarios, "pattern");
};
