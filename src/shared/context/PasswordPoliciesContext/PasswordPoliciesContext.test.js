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
 * @since         4.4.0
 */

import { defaultAppContext } from "../../../react-extension/contexts/ExtAppContext.test.data";
import { defaultPasswordPoliciesDto } from "../../models/passwordPolicies/PasswordPoliciesDto.test.data";
import { PasswordPoliciesContextProvider } from "./PasswordPoliciesContext";

describe("PasswordPoliciesContext", () => {
  describe("::getPolicies", () => {
    it("should return the current policies set", () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider();
      mockState(contextProvider);

      const expectedPolicies = defaultPasswordPoliciesDto();
      contextProvider.setState({ policies: expectedPolicies });

      const registeredPolicies = contextProvider.getPolicies();
      expect(registeredPolicies).toStrictEqual(expectedPolicies);
    });
  });

  describe("::findPolicies", () => {
    it("should request the background page to retrieve the current policies settings", async () => {
      expect.assertions(4);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      mockState(contextProvider);

      const requestSpy = jest.spyOn(contextProvider.props.context.port, "request");

      const expectedPolicies = defaultPasswordPoliciesDto();
      (contextProvider.props.context.port.addRequestListener(
        "passbolt.password-policies.get",
        async () => expectedPolicies,
      ),
        await contextProvider.findPolicies());
      expect(requestSpy).toHaveBeenCalledTimes(1);
      expect(requestSpy).toHaveBeenCalledWith("passbolt.password-policies.get");
      expect(contextProvider.setState).toHaveBeenCalledWith({ policies: expectedPolicies });
      expect(contextProvider.getPolicies()).toStrictEqual(expectedPolicies);
    });

    it("should not request the background page to get password policies if they are already set", async () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      mockState(contextProvider);

      const requestSpy = jest.spyOn(contextProvider.props.context.port, "request");
      contextProvider.setState({ policies: defaultPasswordPoliciesDto() });

      await contextProvider.findPolicies();
      expect(requestSpy).not.toHaveBeenCalled();
    });
  });

  describe("::shouldRunDictionaryCheck", () => {
    it("should return true if the policies state that an external check should be done", () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      mockState(contextProvider);

      contextProvider.setState({
        policies: defaultPasswordPoliciesDto({
          external_dictionary_check: true,
        }),
      });

      expect(contextProvider.shouldRunDictionaryCheck()).toStrictEqual(true);
    });

    it("should return false if the policies state that no external check should be done", () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      mockState(contextProvider);

      contextProvider.setState({
        policies: defaultPasswordPoliciesDto({
          external_dictionary_check: false,
        }),
      });

      expect(contextProvider.shouldRunDictionaryCheck()).toStrictEqual(false);
    });

    it("should return false if the policies are not set yet", () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      expect(contextProvider.shouldRunDictionaryCheck()).toStrictEqual(false);
    });
  });
});

function mockState(component) {
  const setStateMock = (state) => {
    let newState;
    if (typeof state === "function") {
      newState = state(component.state);
    } else {
      newState = state;
    }
    component.state = Object.assign(component.state, newState);
  };
  jest.spyOn(component, "setState").mockImplementation(setStateMock);
}
