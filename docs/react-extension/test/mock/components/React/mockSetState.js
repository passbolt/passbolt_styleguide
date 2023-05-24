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

/**
 * Mock the context provider setState in order to be able to access the provider state in the test.
 * @param {React.Component} contextProvider The component to mock.
 */
export default contextProvider => {
  const setStateMock = state => contextProvider.state = Object.assign(contextProvider.state, state);
  jest.spyOn(contextProvider, 'setState').mockImplementation(setStateMock);
};
