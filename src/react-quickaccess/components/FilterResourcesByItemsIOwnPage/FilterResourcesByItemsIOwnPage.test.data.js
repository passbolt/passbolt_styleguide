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
 * @since         3.7.4
 */

import resourcesFixture from "../../../react-extension/test/fixture/Resources/resources";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export function defaultProps(props = {}) {
  const port = new MockPort();
  port.addRequestListener("passbolt.resources.find-all", () => new Promise(resolve => setTimeout(() => resolve([]), 4000)));
  const defaultContext = {port};

  const defaultProps = {
    context: defaultAppContext(Object.assign(defaultContext, props?.context))
  };
  delete props.context; // Treated in the default

  return Object.assign(defaultProps, props);
}

/**
 * No filtered resources props.
 * @param props
 * @return {Object}
 */
export function noFilteredResourcesProps(props) {
  const port = new MockPort();
  port.addRequestListener("passbolt.resources.find-all", () => []);
  const defaultContext = {port};
  const context = Object.assign(defaultContext, props?.context);
  return defaultProps({context});
}

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export function withFilteredResourcesProps(props) {
  const port = new MockPort();
  port.addRequestListener("passbolt.resources.find-all", () => resourcesFixture);
  const defaultContext = {port};
  const context = Object.assign(defaultContext, props?.context);
  return defaultProps({context});
}
