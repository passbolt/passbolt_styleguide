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
import CollectionValidationError from "../models/entity/abstract/collectionValidationError";

export default class Logger {
  /**
   * Error logger to log errors.
   * todo: API applications & React application need the error.toJSON polyfill to be loaded. See
   *   browser extension src/all/background_page/error/error.js
   * @param {Error|string|*} error The information to log. Can be an Error, a string, or any other serializable value.
   * @static
   */
  static error(error) {
    // Keep the native interactive stack trace (clickable in the console).
    console.error(error);

    // Avoid an additional accident.
    try {
      // If the provided value is an Error, output additional properties not shown by the console API.
      if (error instanceof Error && typeof error.toJSON === "function") {
        console.log(
          `Error: ${error.message}\nError structure: ${JSON.stringify(Logger.serializeError(error))}`
        );
      }
    } catch (error) {
      console.error("The logger was unable to extract additional error information", error);
    }
  }

  /**
   * Serialize the error for the console and remove any stack reference.
   * @param {Error} error The error to serialize.
   * @returns {object}
   */
  static serializeError(error) {
    // Exclude the stack since it is already pretty-printed by the default console API.
    // eslint-disable-next-line no-unused-vars
    const {stack, cause, ...errorProperties} = error.toJSON();
    // Serialize the error cause as well.
    if (error.cause && error.cause instanceof Error) {
      errorProperties.cause = Logger.serializeError(error.cause);
    }
    // Serialize passbolt collection validation errors.
    if (error instanceof CollectionValidationError && Array.isArray(error.errors)) {
      errorProperties.errors = error.errors.map(collectionError => Logger.serializeError(collectionError));
    }
    return errorProperties;
  }
}
