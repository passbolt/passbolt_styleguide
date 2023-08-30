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
 * @since         4.3.0
 */

import {ImportAccountKitContextProvider, ImportAccountKitWorkflowStates} from "./ImportAccountKitContext";

describe("ImportAccountKitContext", () => {
  let importAccountKitContext; // The ImportAccountKitContextProvider to test

  beforeEach(() => {
    importAccountKitContext = new ImportAccountKitContextProvider();
    mockState(importAccountKitContext);
  });

  describe("ImportAccountKitContext::navigate", () => {
    it("should change state to import", async() => {
      expect.assertions(1);

      importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);

      expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);
    });
  });
});

function mockState(reactComponent) {
  const setStateMock = state => {
    let newState;
    if (typeof state === 'function') {
      newState = state(reactComponent.state);
    } else {
      newState = state;
    }
    reactComponent.state = Object.assign(reactComponent.state, newState);
  };
  jest.spyOn(reactComponent, "setState").mockImplementation(setStateMock);
}
