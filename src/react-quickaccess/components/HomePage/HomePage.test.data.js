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

import {defaultAppContext} from "../../contexts/AppContext.test.data";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import MockPort from "../../../react-extension/test/mock/MockPort";
import resourcesFixture from "../../../react-extension/test/fixture/Resources/resources";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export function defaultProps(props = {}) {
  const port = new MockPort();
  port.addRequestListener("passbolt.active-tab.get-url", () => "http:\/\/www.apache.org\/");
  const defaultContext = {port};

  const defaultProps = {
    context: defaultAppContext(Object.assign(defaultContext, props?.context)),
    rbacContext: defaultAdministratorRbacContext(),
  };
  delete props.context; // Treated in the default

  return Object.assign(defaultProps, props);
}

/**
 * Loading props.
 * @return {Object}
 */
export function loadingProps() {
  const context = {};
  return defaultProps({context});
}

/**
 * No resources props.
 * @return {Object}
 */
export function noResourcesProps(props) {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: []});
  const defaultContext = {
    storage: mockStorage
  };
  const context = Object.assign(defaultContext, props?.context);
  return defaultProps({context});
}

/**
 * Search no result props.
 * @return {Object}
 */
export function searchNoResultProps() {
  const context = {
    search: "apache",
  };
  return noResourcesProps({context});
}

/**
 * Search with results props.
 * @return {Object}
 */
export function searchWithResultProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: resourcesFixture});
  const context = {
    storage: mockStorage,
    search: "apache",
  };
  return defaultProps({context});
}

/**
 * Suggested resources props.
 * @return {Object}
 */
export function suggestedResourcesProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: resourcesFixture});
  const context = {
    storage: mockStorage,
  };
  return defaultProps({context});
}

/**
 * Suggested resources props with deny ui action.
 * @return {Object}
 */
export function suggestedResourcesPropsWithDenyUiAction() {
  const props = suggestedResourcesProps();
  props.rbacContext = denyRbacContext();
  return props;
}
