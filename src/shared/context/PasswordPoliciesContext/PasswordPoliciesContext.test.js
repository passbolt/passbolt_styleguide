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
  describe("::loadPolicies", () => {
    it("should request the background page to retrieve the current policies settings", async () => {
      expect.assertions(3);
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
        await contextProvider.loadPolicies());
      expect(requestSpy).toHaveBeenCalledTimes(1);
      expect(requestSpy).toHaveBeenCalledWith("passbolt.password-policies.get");
      expect(contextProvider.setState).toHaveBeenCalledWith({ policies: expectedPolicies });
    });

    it("should not request the background page to get password policies if they are already set", async () => {
      expect.assertions(1);
      const contextProvider = new PasswordPoliciesContextProvider({
        context: defaultAppContext(),
      });
      mockState(contextProvider);

      const requestSpy = jest.spyOn(contextProvider.props.context.port, "request");
      contextProvider.setState({ policies: defaultPasswordPoliciesDto() });

      await contextProvider.loadPolicies();
      expect(requestSpy).not.toHaveBeenCalled();
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
