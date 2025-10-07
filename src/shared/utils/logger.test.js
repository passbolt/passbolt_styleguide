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
 * @since         5.6.0
 */

import Logger from "./logger"; // adjust path/filename if needed (e.g. "./Logger")
import {makeSerializableError, makeErrorWhoseToJSONThrows, makeCollectionValidationErrorFixture} from "./logger.test.data";

describe("Logger", () => {
  let errorSpy,
    logSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("::serializeError", () => {
    it("should drop the 'stack' and keep custom properties", () => {
      expect.assertions(3);
      const err = makeSerializableError({message: "X", props: {foo: 42, bar: "baz"}});

      const serialized = Logger.serializeError(err);

      expect(serialized).toMatchObject({message: "X", foo: 42, bar: "baz"});
      expect("stack" in serialized).toBe(false);
      expect("cause" in serialized).toBe(false); // no cause provided
    });

    it("should include serialized cause recursively", () => {
      expect.assertions(4);
      const root = makeSerializableError({message: "Root", props: {code: "ROOT"}});
      const mid = makeSerializableError({message: "Mid", props: {code: "MID"}, cause: root});
      const top = makeSerializableError({message: "Top", props: {code: "TOP"}, cause: mid});

      const serialized = Logger.serializeError(top);

      expect(serialized).toMatchObject({message: "Top", code: "TOP"});
      expect(serialized.cause).toMatchObject({message: "Mid", code: "MID"});
      expect(serialized.cause.cause).toMatchObject({message: "Root", code: "ROOT"});
      expect("stack" in serialized).toBe(false);
    });

    it("should serialize CollectionValidationError.errors array", () => {
      expect.assertions(3);
      const {cve} = makeCollectionValidationErrorFixture();

      const serialized = Logger.serializeError(cve);

      expect(Array.isArray(serialized.errors)).toBe(true);
      expect(serialized.errors.length).toBe(2);
      // Spot-check a field from leaves
      expect(serialized.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({field: "name", code: "ERR_REQUIRED"}),
          expect.objectContaining({field: "url", code: "ERR_INVALID"})
        ])
      );
    });
  });

  describe("::error", () => {
    it("should always log the error via console.error", () => {
      expect.assertions(2);
      const err = makeSerializableError({message: "Boom"});

      Logger.error(err);

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(err);
    });

    it("should log structured details via console.log when toJSON is available", () => {
      expect.assertions(3);
      const root = makeSerializableError({message: "Root", props: {code: "ROOT"}});
      const top = makeSerializableError({message: "Top", props: {code: "TOP"}, cause: root});

      Logger.error(top);

      expect(errorSpy).toHaveBeenCalledWith(top);
      expect(logSpy).toHaveBeenCalledTimes(1);

      const expected = `Error: ${top.message}\nError structure: ${JSON.stringify(Logger.serializeError(top))}`;
      expect(logSpy.mock.calls[0][0]).toStrictEqual(expected);
    });

    it("should not attempt structured logging for non-Error values (string)", () => {
      expect.assertions(2);
      Logger.error("oops");
      expect(errorSpy).toHaveBeenCalledWith("oops");
      expect(logSpy).not.toHaveBeenCalled();
    });

    it("should not attempt structured logging for non-Error values (plain object)", () => {
      expect.assertions(2);
      const payload = {hello: "world"};
      Logger.error(payload);
      expect(errorSpy).toHaveBeenCalledWith(payload);
      expect(logSpy).not.toHaveBeenCalled();
    });

    it("should catch and report if serializeError (via toJSON) throws", () => {
      expect.assertions(4);
      const err = makeErrorWhoseToJSONThrows({message: "Top"});

      Logger.error(err);

      // First call: raw error
      expect(errorSpy.mock.calls[0][0]).toBe(err);

      // Second call: fallback message + the thrown error from toJSON
      expect(errorSpy.mock.calls[1][0]).toBe(
        "The logger was unable to extract additional error information"
      );
      expect(errorSpy.mock.calls[1][1]).toBeInstanceOf(Error);
      expect(errorSpy.mock.calls[1][1].message).toBe("toJSON exploded");
    });
  });
});
