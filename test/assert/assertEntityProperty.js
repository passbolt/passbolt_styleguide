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

const string = (EntityClass, propertyName) => {
  // Valid scenarios
  [
    {scenario: "a string", value: "valid-string"},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "type", dto);
  });

  // Not valid scenarios
  [
    {scenario: "a number", value: 42},
    {scenario: "a boolean", value: true},
    {scenario: "an object", value: {str: "string"}},
    {scenario: "an array", value: ["string"]},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "type", dto);
  });
};

const uuid = (EntityClass, propertyName) => {
  // Valid scenarios
  [
    {scenario: "a uuid", value: uuidv4()},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "format", dto);
  });

  // Not valid scenarios
  [
    {scenario: "not a uuid", value: "invalid-id"},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "format", dto);
  });
};

const required = (EntityClass, propertyName) => {
  const dto = {};
  expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "required", dto);
};

const notRequired = (EntityClass, propertyName) => {
  const dto = {};
  expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "required", dto);
};

const nullable = (EntityClass, propertyName) => {
  // Valid scenarios
  [
    {scenario: "null", value: null},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "type", dto);
  });
};

const notNullable = (EntityClass, propertyName) => {
  // Not valid scenarios
  [
    {scenario: "null", value: null},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "type", dto);
  });
};

const minLength = (EntityClass, propertyName, minLength) => {
  // Valid scenarios
  [
    {scenario: "valid length", value: "a".repeat(minLength)},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "minLength", dto);
  });

  // Not valid scenarios
  if (minLength !== 0) {
    [
      {scenario: "too short", value: "a".repeat(minLength - 1)},
    ].forEach((test) => {
      const dto = {[propertyName]: test.value};
      expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "minLength", dto);
    });
  }
};

const maxLength = (EntityClass, propertyName, maxLength) => {
  // Valid scenarios
  [
    {scenario: "valid length", value: "a".repeat(maxLength)},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "maxLength", dto);
  });

  // Not valid scenarios
  [
    {scenario: "too long", value: "a".repeat(maxLength + 1)},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "maxLength", dto);
  });
};

const dateTime = (EntityClass, propertyName) => {
  // Valid scenarios
  [
    {scenario: "year", value: "2018"},
    {scenario: "year and month", value: "2018-10"},
    {scenario: "year, month and day", value: "2018-10-18"},
    {scenario: "year, month, day and time", value: "2021-11-17T13:19:48+00:00"},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "format", dto);
  });

  // Not valid scenarios
  [
    {scenario: "empty", value: ""},
    {scenario: "not a date", value: "not-a-date"},
    {scenario: "year, month, day, time and zulu", value: "2018-10-18T08:04:30+00:00Z"},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "format", dto);
  });
};

const boolean = (EntityClass, propertyName) => {
  // Valid scenarios
  [
    {scenario: true, value: false},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).not.toThrowEntityValidationError(propertyName, "type", dto);
  });

  // Not valid scenarios
  [
    {scenario: "a string", value: "string"},
    {scenario: "a number", value: 42},
    {scenario: "an object", value: {}},
    {scenario: "an array", value: []},
    {scenario: "null", value: null},
  ].forEach((test) => {
    const dto = {[propertyName]: test.value};
    expect(() => new EntityClass(dto)).toThrowEntityValidationError(propertyName, "type", dto);
  });
};

export default {
  boolean,
  dateTime,
  minLength,
  maxLength,
  notNullable,
  notRequired,
  nullable,
  required,
  string,
  uuid,
};
