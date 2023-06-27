/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import EntityValidationError from "../../../../shared/lib/Error/EntityValidationError";

/**
 * Default props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    error: new Error("Mocked unexpected error.")
  };
  return Object.assign(defaultProps, props);
}

/**
 * Passbolt API fetch error props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function passboltApiFetchErrorProps(props = {}) {
  const error = new PassboltApiFetchError("Could not finalize API request", {
    body: {
      message: "The provided Gpg doesn't fit the minimal requirements.",
    },
    code: 403
  });
  const defaultProps = {error};
  return Object.assign(defaultProps, props);
}

/**
 * Passbolt Entity validation error props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function passboltEntityValidationErrorProps(props = {}) {
  const error = new EntityValidationError("Could not validate Entity");
  error.addError("algorithm", "enum", "The algorithm value is not included in the supported list.");
  const defaultProps = {error};
  return Object.assign(defaultProps, props);
}
