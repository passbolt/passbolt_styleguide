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
 * Default app context for authentication recover context.
 * @param {Object} appContext The override
 * @return {Object}
 */
export function defaultAuthenticationRecoverAppContext(appContext) {
  const port = new MockPort();
  port.addRequestListener("passbolt.recover.start", jest.fn(() => ({locale: "fr-FR"})));
  port.addRequestListener("passbolt.recover.first-install", jest.fn(() => Promise.resolve(false)));
  port.addRequestListener("passbolt.recover.import-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.verify-passphrase", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.set-security-token", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.complete", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.sign-in", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.generate-account-recovery-request-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.request-account-recovery", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.request-help-credentials-lost", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", jest.fn(() => Promise.resolve(true)));
  port.addRequestListener("passbolt.recover.lost-passphrase-case", jest.fn(() => Promise.resolve(false)));
  port._port = {
    onDisconnect: {
      addListener: jest.fn()
    }
  };

  const defaultAuthenticationRecover = {
    port: port,
    onRefreshLocaleRequested: jest.fn(),
    initLocale: jest.fn(),
  };
  return Object.assign(defaultAppContext(defaultAuthenticationRecover), appContext || {});
}

/**
 * Default props.
 * @returns {object}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: defaultAuthenticationRecoverAppContext(props?.context),
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Decorate - account recovery enabled
 * @param {Object} props The props to decorate
 * @returns {object}
 */
export function withAccountRecoveryEnabled(props) {
  props.context.port.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", () => Promise.resolve(true));
  return props;
}
