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
 * @since         4.5.0
 */

import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";
import HealthcheckChecksCollection from "../../../../shared/models/entity/healthcheck/healthcheckChecksCollection";
import { mixedStatusHealthcheckApiBodyDto } from "../../../../shared/models/entity/healthcheck/healthcheck.test.data";
import { defaultActionFeedbackContext } from "../../ActionFeedbackContext.test.data";

/**
 * Default props.
 * @returns {object}
 * @param data
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    actionFeedbackContext: defaultActionFeedbackContext(),
  };
  return Object.assign(defaultProps, data);
}

/**
 * Build a checks collection out of a v5 response body.
 * @param {array} [body] the response body, defaults to the captured mixed status one
 * @returns {HealthcheckChecksCollection}
 */
export function healthcheckChecksCollection(body = mixedStatusHealthcheckApiBodyDto()) {
  return new HealthcheckChecksCollection(body, { ignoreInvalidEntity: true });
}

/**
 * A mocked healthcheck context.
 * @param {object} [data] overrides
 * @returns {object}
 */
export function defaultAdministrationHealthcheckContext(data = {}) {
  return {
    healthcheckData: healthcheckChecksCollection(),
    isProcessing: jest.fn(() => false),
    setProcessing: jest.fn(),
    loadHealthcheckData: jest.fn(),
    clearContext: jest.fn(),
    fetchHealthcheckData: jest.fn(),
    isHealthcheckEndpointEnabled: jest.fn(() => true),
    ...data,
  };
}
