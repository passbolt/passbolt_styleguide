/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {enableFetchMocks} from 'jest-fetch-mock';
import {defaultProps} from './AdministrationRbacContext.test.data';
import {defaultSettingsRbacsCollectionData, settingsRbacsCollectionData} from '../../../../shared/models/entity/rbac/rbacsCollection.test.data';
import {AdminRbacContextProvider} from './AdministrationRbacContext';
import RbacsCollection from '../../../../shared/models/entity/rbac/rbacsCollection';
import PassboltServiceUnavailableError from '../../../../shared/lib/Error/PassboltServiceUnavailableError';
import RbacService from '../../../../shared/services/api/rbac/rbacService';

describe("AdministrationRbacContext", () => {
  let adminRbacContext; // The adminRbacContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    adminRbacContext = new AdminRbacContextProvider(props);
    mockState(adminRbacContext);
    enableFetchMocks();
  });

  describe("AdministrationRbacContext::setRbacs", () => {
    it("should set rbacs with parameter", async() => {
      expect.assertions(2);

      expect(adminRbacContext.state.rbacs).toBeNull();
      adminRbacContext.setRbacs(defaultSettingsRbacsCollectionData);
      expect(adminRbacContext.state.rbacs).toEqual(defaultSettingsRbacsCollectionData);
    });
  });

  describe("AdministrationRbacContext::setRbacsUpdated", () => {
    it("should set rbacs updated with parameter", async() => {
      expect.assertions(2);

      expect(adminRbacContext.state.rbacsUpdated).toEqual(new RbacsCollection([]));
      adminRbacContext.setRbacsUpdated(defaultSettingsRbacsCollectionData);
      expect(adminRbacContext.state.rbacsUpdated).toEqual(defaultSettingsRbacsCollectionData);
    });
  });

  describe("AdministrationRbacContext::hasSettingsChanges", () => {
    it("should set return true if changes exist", async() => {
      expect.assertions(1);

      adminRbacContext.setRbacsUpdated(new RbacsCollection(settingsRbacsCollectionData()));

      expect(adminRbacContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should set return false if there are no change", async() => {
      expect.assertions(1);

      expect(adminRbacContext.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdministrationRbacContext::clearContext", () => {
    it("should clear the context and set it by default", () => {
      expect.assertions(2);

      //init context
      adminRbacContext.setRbacsUpdated(defaultSettingsRbacsCollectionData);
      adminRbacContext.setRbacs(defaultSettingsRbacsCollectionData);

      adminRbacContext.clearContext();

      expect(adminRbacContext.state.rbacsUpdated).toEqual(new RbacsCollection([]));
      expect(adminRbacContext.state.rbacs).toBeNull();
    });
  });

  describe("AdministrationRbacContext::save", () => {
    it("As a logged in administrator I can update the rbacs setting", async() => {
      expect.assertions(2);

      adminRbacContext.setRbacs(new RbacsCollection(defaultSettingsRbacsCollectionData));

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, () => mockApiResponse(defaultSettingsRbacsCollectionData));

      await adminRbacContext.save();

      expect(adminRbacContext.state.rbacsUpdated).toEqual(new RbacsCollection([]));
      expect(adminRbacContext.state.rbacs).toEqual(new RbacsCollection(defaultSettingsRbacsCollectionData));
    });

    it("As a logged in administrator I should not be blocked when an error occured", async() => {
      expect.assertions(3);

      const error = {message: "The service is unavailable"};
      props.adminRbacContext.save = () => Promise.reject(error);
      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, () => Promise.reject(error));

      const rbacsUpdated = defaultSettingsRbacsCollectionData;
      adminRbacContext.setRbacsUpdated(new RbacsCollection(rbacsUpdated));
      await expect(() => adminRbacContext.save()).rejects.toThrowError(PassboltServiceUnavailableError);
      expect(adminRbacContext.state.rbacsUpdated).toEqual(new RbacsCollection(rbacsUpdated));
      expect(adminRbacContext.state.rbacs).toEqual(null);
    });

    it("As a logged in administrator I can update the rbacs setting even with no changes", async() => {
      expect.assertions(1);

      adminRbacContext.setRbacs(new RbacsCollection(defaultSettingsRbacsCollectionData));

      jest.spyOn(RbacService.prototype, "updateAll");
      await adminRbacContext.save();

      expect(RbacService.prototype.updateAll).not.toHaveBeenCalled();
    });
  });
});


function mockState(contextProvider) {
  const setStateMock = state => {
    let newState;
    if (typeof state  === 'function') {
      newState = state(contextProvider.state);
    } else {
      newState = state;
    }
    contextProvider.state = Object.assign(contextProvider.state, newState);
  };
  jest.spyOn(contextProvider, "setState").mockImplementation(setStateMock);
}
