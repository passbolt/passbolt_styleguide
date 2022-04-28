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
import ServerKeyChangedError from "../../lib/Error/ServerKeyChangedError";
import SiteSettings from "../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../test/fixture/Settings/siteSettings";

/**
 * Default context
 * @param {Object} appContext The props to override
 * @returns {object}
 */
export function defaultAuthenticationLoginAppContext(appContext = {}) {
  const port = new MockPort();
  port.addRequestListener("passbolt.auth.verify-server-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.get-server-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.verify-passphrase", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.login", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.replace-server-key", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.request-help-credentials-lost", jest.fn(() => Promise.resolve()));

  const defaultAuthenticationLoginAppContext = {
    port: port,
    siteSettings: new SiteSettings(siteSettingsFixture)
  };
  return Object.assign(defaultAppContext(defaultAuthenticationLoginAppContext), appContext);
}

/**
 * Default context with account recovery disabled
 * @param {Object} appContext The props to override
 * @returns {object}
 */
export function defaultAuthenticationLoginAppContextWithAccountRecoveryDisabled(appContext = {}) {
  const siteSettingsWithAccountRecoveryDisabled = JSON.parse(JSON.stringify(siteSettingsFixture));
  siteSettingsWithAccountRecoveryDisabled.passbolt.plugins.accountRecovery.enabled = false;
  return defaultAuthenticationLoginAppContext({
    siteSettings: new SiteSettings(siteSettingsWithAccountRecoveryDisabled),
    ...appContext,
  });
}

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: defaultAuthenticationLoginAppContext()
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Decorate - with server key rotated.
 * @param {Object} props The props to decorate
 * @returns {object}
 */
export function withServerKeyChanged(props) {
  props.context.port.addRequestListener("passbolt.auth.verify-server-key", jest.fn(() => Promise.reject(new ServerKeyChangedError())));
  const serverKey = {fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3"};
  props.context.port.addRequestListener("passbolt.auth.get-server-key", jest.fn(() => Promise.resolve(serverKey)));

  return props;
}
