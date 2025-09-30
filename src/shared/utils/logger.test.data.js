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

import CollectionValidationError from "../models/entity/abstract/collectionValidationError"; // adjust path

export function makeSerializableError({message = "Top-level", props = {}, cause} = {}) {
  const err = new Error(message);
  if (cause) { err.cause = cause; }
  Object.assign(err, props);
  // Minimal toJSON polyfill for tests (browser/React apps often polyfill this)
  // eslint-disable-next-line func-names
  err.toJSON = function toJSON() {
    return {
      name: this.name || "Error",
      message: this.message,
      stack: "mock-stack",
      ...props,
    };
  };
  return err;
}

export function makeErrorWhoseToJSONThrows({message = "Boom"} = {}) {
  const err = new Error(message);
  err.toJSON = () => {
    throw new Error("toJSON exploded");
  };
  return err;
}

export function makeCollectionValidationErrorFixture() {
  // Leaf validation errors (must be serializable)
  const leaf1 = makeSerializableError({
    message: 'Field "name" is required',
    props: {field: "name", code: "ERR_REQUIRED"}
  });
  const leaf2 = makeSerializableError({
    message: 'Field "url" is invalid',
    props: {field: "url", code: "ERR_INVALID"}
  });

  // Your real CollectionValidationError class
  const cve = new CollectionValidationError("Invalid resource", [leaf1, leaf2]);

  /*
   * Ensure `.errors` is present AND populated for the test.
   * Some implementations don’t carry constructor-provided leaves into `.errors`.
   */
  if (!Array.isArray(cve.errors) || cve.errors.length === 0) {
    cve.errors = [leaf1, leaf2];
  }

  // Ensure top-level error is serializable
  if (typeof cve.toJSON !== "function") {
    // eslint-disable-next-line func-names
    cve.toJSON = function toJSON() {
      return {
        name: this.name || "CollectionValidationError",
        message: this.message,
        stack: "mock-stack"
      };
    };
  }

  return {cve, leaves: [leaf1, leaf2]};
}
