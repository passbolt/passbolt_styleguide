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
 * @since         5.17.0
 */

import EntityV2 from "../abstract/entityV2";

/**
 * The result of a single healthcheck, as served by GET /healthcheck.json?api-version=v5.
 * The response body is a flat list of these, every check carrying its own domain.
 */
class HealthcheckCheckEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  marshall() {
    if (typeof this._props.help === "undefined" || this._props.help === null) {
      this._props.help = [];
    }

    super.marshall();
  }

  /**
   * Get healthcheck check entity schema
   *
   * The status is validated as a plain string and not as an enum, and only the fields the page
   * cannot draw a row without are required: a check the frontend has never heard of has to
   * render rather than invalidate the whole collection.
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["domain_key", "status", "message"],
      properties: {
        key: {
          type: "string",
        },
        domain_key: {
          type: "string",
        },
        domain: {
          type: "object",
        },
        status: {
          type: "string",
        },
        message: {
          type: "string",
        },
        help: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the check key, for example "php-version"
   * @returns {(string|undefined)}
   */
  get key() {
    return this._props.key;
  }

  /**
   * Get the key of the domain the check belongs to, for example "environment"
   * @returns {string}
   */
  get domainKey() {
    return this._props.domain_key;
  }

  /**
   * Get the domain title, already translated by the API, or the domain key if the API sent none.
   * @returns {string}
   */
  get domainTitle() {
    return typeof this._props.domain?.title === "string" ? this._props.domain.title : this.domainKey;
  }

  /**
   * Get the check status, for example "pass", "error", "warning" or "info"
   * @returns {string}
   */
  get status() {
    return this._props.status;
  }

  /**
   * Get the check message, already translated by the API
   * @returns {string}
   */
  get message() {
    return this._props.message;
  }

  /**
   * Get the check help entries, already translated by the API
   * @returns {array<string>}
   */
  get help() {
    return this._props.help;
  }

  /**
   * Returns true when the check carries help.
   * Not the same as "the check did not pass": a notice level check reports "info" whether it
   * passed or not, and still carries its help.
   * @returns {boolean}
   */
  get hasHelp() {
    return this.help.length > 0;
  }
}

export default HealthcheckCheckEntity;
