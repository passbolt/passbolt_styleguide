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
    })

    describe("ImportAccountKitContext::navigate", () => {
        it("should change state to import", async () => {
            expect.assertions(1);
            
            importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);

            expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);
        });
    });

    describe("ImportAccountKitContext::clearContext", () => {
        it("should clear the context and set it by default", async () => {
            expect.assertions(2);
            
            importAccountKitContext.setProcessing(true);
            importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);

            importAccountKitContext.clearContext();

            expect(importAccountKitContext.isProcessing()).toBeFalsy();
            expect(importAccountKitContext.state.state).toEqual(ImportAccountKitWorkflowStates.GET_STARTED);
        });
    });
})

function mockState(adminMfaPolicyContextProvider) {
    const setStateMock = state => {
        let newState;
        if (typeof state === 'function') {
            newState = state(adminMfaPolicyContextProvider.state);
        } else {
            newState = state;
        }
        adminMfaPolicyContextProvider.state = Object.assign(adminMfaPolicyContextProvider.state, newState);
    };
    jest.spyOn(adminMfaPolicyContextProvider, "setState").mockImplementation(setStateMock);
}
