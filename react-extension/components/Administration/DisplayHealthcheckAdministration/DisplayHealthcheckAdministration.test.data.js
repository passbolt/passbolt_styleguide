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
 * @since         4.6.0
 */

import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";
import {
  defaultAdministrationHealthcheckContext,
  healthcheckChecksCollection,
} from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext.test.data";

/**
 * Default props.
 * @param {object} [data] overrides
 * @returns {object}
 */
export function defaultProps(data = {}) {
  // Merged through the factory, so that a test can override one entry without restating the mocks.
  const { context, adminHealthcheckContext, ...rest } = data;
  return {
    context: defaultAppContext(context),
    adminHealthcheckContext: defaultAdministrationHealthcheckContext(adminHealthcheckContext),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn(),
    },
    ...rest,
  };
}

/**
 * Props carrying the healthcheck built from the given v5 response body.
 * @param {array} body a v5 response body
 * @param {object} [data] overrides
 * @returns {object}
 */
export function propsWithHealthcheckApiBody(body, data = {}) {
  return defaultProps({
    ...data,
    adminHealthcheckContext: {
      healthcheckData: healthcheckChecksCollection(body),
      ...data?.adminHealthcheckContext,
    },
  });
}
