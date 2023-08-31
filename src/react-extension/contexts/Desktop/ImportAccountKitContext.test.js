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
import {defaultAccountKit, defaultProps} from "./ImportAccountKitContext.test.data";

describe("ImportAccountKitContext", () => {
  let importAccountKitContext; // The ImportAccountKitContextProvider to test
  const props = defaultProps();

  beforeEach(() => {
    importAccountKitContext = new ImportAccountKitContextProvider(props);
    mockState(importAccountKitContext);
  });

  describe("ImportAccountKitContext::navigate", () => {
    it("should change state to import", () => {
      expect.assertions(1);

      importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);

      expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);
    });
  });


  describe("ImportAccountKitContext::navigate", () => {
    it("should navigate to next step", () => {
      expect.assertions(1);

      importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);

      expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);
    });
  });

  describe("ImportAccountKitContext::verifyAccountKit", () => {
    it("should navigate to VERIFY_PASSPHRASE", async() => {
      expect.assertions(2);

      jest.spyOn(props.context.port, "request").mockImplementation(() => jest.fn());

      const accountKit = defaultAccountKit();
      await importAccountKitContext.verifyAccountKit(accountKit);

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.background.verify-account-kit", accountKit);
      expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.VERIFY_PASSPHRASE);
    });

    it("should navigate to UNEXPECTED_ERROR_STATE in case of error", async() => {
      expect.assertions(1);

      jest.spyOn(props.context.port, "request").mockImplementation(() => { throw new Error(); });

      const accountKit = defaultAccountKit();
      await importAccountKitContext.verifyAccountKit(accountKit);

      expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.UNEXPECTED_ERROR_STATE);
    });
  });
});

function mockState(importAccountKitContextProvider) {
  const setStateMock = state => {
    let newState;
    if (typeof state === 'function') {
      newState = state(importAccountKitContextProvider.state);
    } else {
      newState = state;
    }
    importAccountKitContextProvider.state = Object.assign(importAccountKitContextProvider.state, newState);
  };
  jest.spyOn(importAccountKitContextProvider, "setState").mockImplementation(setStateMock);
}
