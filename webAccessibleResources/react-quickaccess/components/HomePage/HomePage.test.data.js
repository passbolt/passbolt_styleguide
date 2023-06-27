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
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    ...data
  };
}

/**
 * Loading props.
 * @return {Object}
 */
export function loadingProps() {
  const context = new defaultAppContext();
  return defaultProps({context});
}

/**
 * No resources props.
 * @return {Object}
 */
export function noResourcesProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: []});
  const context = new defaultAppContext({
    storage: mockStorage
  });
  return defaultProps({context});
}

/**
 * Search no result props.
 * @return {Object}
 */
export function searchNoResultProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: []});
  const context = new defaultAppContext({
    storage: mockStorage,
    search: "apache",
  });
  return defaultProps({context});
}

/**
 * Search with results props.
 * @return {Object}
 */
export function searchWithResultProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: resourcesFixture});
  const context = new defaultAppContext({
    storage: mockStorage,
    search: "apache",
  });
  return defaultProps({context});
}

/**
 * Suggested resources props.
 * @return {Object}
 */
export function suggestedResourcesProps() {
  const port = new MockPort();
  port.addRequestListener("passbolt.active-tab.get-url", () => "http:\/\/www.apache.org\/");
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: resourcesFixture});
  const context = new defaultAppContext({
    storage: mockStorage,
    port: port,
  });
  return defaultProps({context});
}

/**
 * Suggested resources props with deny ui action.
 * @return {Object}
 */
export function denyUiActionProps(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data,
  });
}
