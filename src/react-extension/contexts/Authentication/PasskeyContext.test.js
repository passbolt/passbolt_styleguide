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
 * @since         5.14.0
 */

import { PasskeyContextProvider } from "./PasskeyContext";
import { defaultAppContext } from "../ExtAppContext.test.data";
import { isWebAuthnSupported } from "../../../shared/services/webauthn/webAuthnCeremonyService";

jest.mock("../../../shared/services/webauthn/webAuthnCeremonyService", () => ({
  isWebAuthnSupported: jest.fn(() => true),
}));

/**
 * Replace setState by a direct assignment on the (unmounted) provider instance.
 * @param {PasskeyContextProvider} provider
 */
function mockState(provider) {
  jest.spyOn(provider, "setState").mockImplementation((state) => {
    const next = typeof state === "function" ? state(provider.state) : state;
    provider.state = Object.assign(provider.state, next);
  });
}

/**
 * Build a provider with a port.request routed by event name.
 * @param {object} routes event -> value (or (…args)=>value)
 * @returns {PasskeyContextProvider}
 */
function buildProvider(routes = {}) {
  const props = { context: defaultAppContext() };
  jest.spyOn(props.context.port, "request").mockImplementation((event, ...args) => {
    const route = routes[event];
    const value = typeof route === "function" ? route(...args) : route;
    return Promise.resolve(value);
  });
  const provider = new PasskeyContextProvider(props);
  mockState(provider);
  return { provider, port: props.context.port };
}

beforeEach(() => {
  jest.resetAllMocks();
  isWebAuthnSupported.mockImplementation(() => true);
});

describe("PasskeyContext", () => {
  it("loadConfiguration reads the local kit + organization toggle when webauthn is supported", async () => {
    expect.assertions(3);
    const { provider } = buildProvider({
      "passbolt.passkey.has-local-kit": true,
      "passbolt.passkey.is-org-enabled": false,
    });

    const hasKit = await provider.loadConfiguration();

    expect(hasKit).toBe(true);
    expect(provider.hasUserAPasskeyKit()).toBe(true);
    expect(provider.isOrgEnabled()).toBe(false);
  });

  it("loadConfiguration skips the port when webauthn is unsupported (kit absent, org enabled)", async () => {
    expect.assertions(3);
    isWebAuthnSupported.mockImplementation(() => false);
    const { provider, port } = buildProvider();

    const hasKit = await provider.loadConfiguration();

    expect(hasKit).toBe(false);
    expect(provider.isOrgEnabled()).toBe(true);
    expect(port.request).not.toHaveBeenCalled();
  });

  it("loadConfiguration assumes the feature is enabled if the org toggle lookup fails", async () => {
    expect.assertions(1);
    const { provider } = buildProvider({
      "passbolt.passkey.has-local-kit": true,
      "passbolt.passkey.is-org-enabled": () => {
        throw new Error("offline");
      },
    });

    await provider.loadConfiguration();

    expect(provider.isOrgEnabled()).toBe(true);
  });

  it("setOrgEnabled persists the flag and stores the returned value", async () => {
    expect.assertions(2);
    const { provider, port } = buildProvider({ "passbolt.passkey.set-org-enabled": (enabled) => enabled });

    const result = await provider.setOrgEnabled(false);

    expect(port.request).toHaveBeenCalledWith("passbolt.passkey.set-org-enabled", false);
    expect(result).toBe(false);
  });

  it("runEnrollProcess forwards the friendly name and flags the profile as having a kit", async () => {
    expect.assertions(3);
    const stored = { id: "row-1" };
    const { provider, port } = buildProvider({ "passbolt.passkey.enroll": stored });

    const result = await provider.runEnrollProcess("Work laptop");

    expect(port.request).toHaveBeenCalledWith("passbolt.passkey.enroll", "Work laptop");
    expect(result).toEqual(stored);
    expect(provider.hasUserAPasskeyKit()).toBe(true);
  });

  it("runSignInProcess runs the login then the post-login redirect", async () => {
    expect.assertions(2);
    const { provider, port } = buildProvider();

    await provider.runSignInProcess();

    expect(port.request).toHaveBeenCalledWith("passbolt.passkey.login");
    expect(port.request).toHaveBeenCalledWith("passbolt.auth.post-login-redirect");
  });

  it("listCredentials + deleteCredential delegate to the matching port events", async () => {
    expect.assertions(2);
    const { provider, port } = buildProvider({ "passbolt.passkey.list-credentials": [] });

    await provider.listCredentials();
    await provider.deleteCredential("cred-aaa");

    expect(port.request).toHaveBeenCalledWith("passbolt.passkey.list-credentials");
    expect(port.request).toHaveBeenCalledWith("passbolt.passkey.delete-credential", "cred-aaa");
  });
});
