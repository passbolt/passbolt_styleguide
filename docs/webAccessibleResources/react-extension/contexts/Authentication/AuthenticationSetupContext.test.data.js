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

import {defaultAppContext} from "../ExtAppContext.test.data";
import MockPort from "../../test/mock/MockPort";

/**
 * Default app context for authentication setup context.
 * @param {Object} appContext The override
 * @return {Object}
 */
export function defaultAuthenticationSetupAppContext(appContext) {
  const port = new MockPort();
  port.addRequestListener("passbolt.setup.start", jest.fn(() => ({locale: "fr-FR"})));
  port.addRequestListener("passbolt.setup.is-first-install", jest.fn(() => Promise.resolve(false)));
  port.addRequestListener("passbolt.setup.generate-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.download-recovery-kit", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.import-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.verify-passphrase", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.set-account-recovery-user-setting", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.set-security-token", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.complete", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.setup.sign-in", jest.fn(() => Promise.resolve()));
  port._port = {
    onDisconnect: {
      addListener: jest.fn()
    }
  };

  const defaultAuthenticationSetupAppContext = {
    port: port,
    onRefreshLocaleRequested: jest.fn(),
  };
  return Object.assign(defaultAppContext(defaultAuthenticationSetupAppContext), appContext || {});
}

/**
 * Default props.
 * @returns {object}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: defaultAuthenticationSetupAppContext(props?.context),
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Decorate - account recovery enabled
 * @param {Object} props The props to decorate
 * @returns {object}
 */
export function withAccountRecoveryEnabled(props) {
  const accountRecoveryOrganizationPolicy = {
    policy: "opt-in"
  };
  props.context.port.addRequestListener("passbolt.setup.get-account-recovery-organization-policy", () => Promise.resolve(accountRecoveryOrganizationPolicy));
  return props;
}
