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
 * @since         3.9.0
 */

import each from "jest-each";
import mockComponentSetState from "../test/mock/components/React/mockSetState";
import {SsoContextProvider} from "./SsoContext";
import {defaultProps} from "./SsoContext.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("SsoContextProvider", () => {
  each([
    {name: "provider is Azure", providerId: "azure"},
    {name: "no provider available", providerId: null},
  ]).describe(`SsoContextProvider configuration handling`, scenario => {
    it(`SsoContextProvider::loadSsoConfiguration: Should call for the background page to retrieve the SSO provider data and set it on its state: ${scenario.name}`, async() => {
      const props = defaultProps(null, scenario.providerId);
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);

      await contextProvider.loadSsoConfiguration();

      expect(props.context.port.requestListeners["passbolt.sso.get-local-configured-provider"]).toHaveBeenCalled();
      expect(contextProvider.state.ssoLocalConfiguredProvider).toEqual(scenario.providerId);
    });

    it(`SsoContextProvider::getProvider: Should return the SSO provider id: ${scenario.name}`, async() => {
      const props = defaultProps(null, scenario.providerId);
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);

      await contextProvider.loadSsoConfiguration();

      expect(contextProvider.getProvider()).toEqual(scenario.providerId);
    });

    it(`SsoContextProvider::hasUserAnSsoKit: Should return true when an SSO provider is available false otherwise: ${scenario.name}`, async() => {
      const props = defaultProps(null, scenario.providerId);
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);

      await contextProvider.loadSsoConfiguration();

      expect(contextProvider.hasUserAnSsoKit()).toEqual(Boolean(scenario.providerId));
    });
  });

  describe("SsoContextProvider::runSignInProcess", () => {
    it("Should call for the background page to delegate the Sign in process", async() => {
      const props = defaultProps(null, "azure");
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);

      await contextProvider.loadSsoConfiguration();
      await contextProvider.runSignInProcess();

      expect(props.context.port.requestListeners["passbolt.sso.sign-in-with-azure"]).toHaveBeenCalledTimes(1);
      expect(props.context.port.requestListeners["passbolt.auth.post-login-redirect"]).toHaveBeenCalledTimes(1);
    });

    it("Should throw an error when something wrong happens during sign-in", async() => {
      const error = new Error("An unexpected error occured");
      const props = defaultProps(null, "azure");
      props.context.port.addRequestListener("passbolt.sso.sign-in-with-azure", jest.fn(() => Promise.reject(error)));
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);

      await contextProvider.loadSsoConfiguration();

      try {
        await contextProvider.runSignInProcess();
      } catch (e) {
        expect(e).toStrictEqual(error);
      }

      expect(props.context.port.requestListeners["passbolt.sso.sign-in-with-azure"]).toHaveBeenCalledTimes(1);
      expect(props.context.port.requestListeners["passbolt.auth.post-login-redirect"]).not.toHaveBeenCalled();
    });

    it("Should throw an error when the pasphrase mismatch", async() => {
      const errorMessage = "Passphrase mismatch";
      const error = new Error(errorMessage);
      error.name = "InvalidMasterPasswordError";

      const props = defaultProps(null, "azure");
      props.context.port.addRequestListener("passbolt.auth.post-login-redirect", jest.fn(() => Promise.reject(error)));
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);

      await contextProvider.loadSsoConfiguration();

      try {
        await contextProvider.runSignInProcess();
      } catch (e) {
        expect(e).toStrictEqual(new Error(`The passphrase from the SSO kit doesn't match your private key: ${errorMessage}`));
      }
    });

    it("Should throw an OutdatedSsoKitError", async() => {
      const errorMessage = "Passphrase can't be decrypted with the current kit";
      const error = new Error(errorMessage);
      error.name = "OutdatedSsoKitError";

      const props = defaultProps(null, "azure");
      props.context.port.addRequestListener("passbolt.auth.post-login-redirect", jest.fn(() => Promise.reject(error)));
      const contextProvider = new SsoContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);

      await contextProvider.loadSsoConfiguration();

      try {
        await contextProvider.runSignInProcess();
      } catch (e) {
        expect(e).toStrictEqual(new Error(`The SSO kit is outdated and can't be used to decrypt your passphrase: ${errorMessage}`));
      }
    });
  });
});
