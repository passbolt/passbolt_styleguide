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

import {defaultProps} from "./AdminAccountRecoveryContext.test.data";
import {AdminAccountRecoveryContextProvider} from "./AdminAccountRecoveryContext";

describe("AdminAccountRecoveryContext", () => {
  let adminAccountRecoveryContext; // The adminAccountRecoveryContext to text
  const props = defaultProps(); // The props to pass


  beforeEach(() => {
    adminAccountRecoveryContext = new AdminAccountRecoveryContextProvider(props);
    const setStateMock = state => adminAccountRecoveryContext.state = Object.assign(adminAccountRecoveryContext.state, state);
    jest.spyOn(adminAccountRecoveryContext, "setState").mockImplementation(setStateMock);
  });

  describe("AdminAccountRecoveryContext::findAccountRecoveryPolicy", () => {
    it("should get the current account recovery organization policy and store it in its state", async() => {
      const currentPolicy = {policy: "disabled"};

      // Mock the background page get organization policy request.
      props.context.port.request = jest.fn(() => currentPolicy);

      expect.assertions(2);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.get-organization-policy");
      expect(adminAccountRecoveryContext.state.currentPolicy).toBe(currentPolicy);
    });
  });

  describe("AdminAccountRecoveryContext::changePolicy", () => {
    it("should store the policy change", async() => {
      const currentPolicy = {policy: "disabled"};
      const newPolicy = "mandatory";

      // Mock the background page get organization policy request.
      props.context.port.request = jest.fn(() => currentPolicy);

      expect.assertions(1);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.state.policyChanges.policy).toEqual(newPolicy);
    });

    it("should not impact the stored policy changes if applying the same policy", async() => {
      const currentPolicy = {policy: "mandatory"};
      const newPolicy = "mandatory";

      // Mock the background page get organization policy request.
      props.context.port.request = jest.fn(() => currentPolicy);

      expect.assertions(1);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.state.policyChanges.policy).toBeUndefined();
    });

    it("should reset the public key policy change if AD wants to disable the policy", async() => {
      const currentPolicy = {policy: "disabled"};
      const newPolicy = "disabled";
      const newPublicKey = "new public key";

      // Mock the background page get organization policy request.
      props.context.port.request = jest.fn(() => currentPolicy);

      expect.assertions(3);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      expect(adminAccountRecoveryContext.state.policyChanges.publicKey).toEqual(newPublicKey);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.state.policyChanges.policy).toBeUndefined();
      expect(adminAccountRecoveryContext.state.policyChanges.publicKey).toBeUndefined();
    });
  });

  describe("AdminAccountRecoveryContext::changePublicKey", () => {
    it("should store the public key change", async() => {
      const newPublicKey = "new public key";

      expect.assertions(1);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      expect(adminAccountRecoveryContext.state.policyChanges.publicKey).toEqual(newPublicKey);
    });

    it("should remember the policy change", async() => {
      const newPolicy = "new policy";
      const newPublicKey = "new public key";

      expect.assertions(2);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      expect(adminAccountRecoveryContext.state.policyChanges.publicKey).toEqual(newPublicKey);
      expect(adminAccountRecoveryContext.state.policyChanges.policy).toEqual(newPolicy);
    });
  });

  describe("AdminAccountRecoveryContext::hasPolicyChanges", () => {
    it("it should return false if no policy changes", async() => {
      expect.assertions(1);
      expect(adminAccountRecoveryContext.hasPolicyChanges()).toBeFalsy();
    });

    it("it should return true if a new policy is set", async() => {
      const currentPolicy = {policy: "disabled"};
      const newPolicy = "mandatory";

      // Mock the background page get organization policy request.
      props.context.port.request = jest.fn(() => currentPolicy);

      expect.assertions(1);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.hasPolicyChanges()).toBeTruthy();
    });

    it("it should return true if a new public key is set", async() => {
      const newPublicKey = "new public key";

      expect.assertions(1);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      expect(adminAccountRecoveryContext.hasPolicyChanges()).toBeTruthy();
    });
  });

  describe("AdminAccountRecoveryContext::getKeyInfo", () => {
    it("it should return the key info", async() => {
      const armoredKey = "armored-key";
      const mockKeyInfo = {
        armored_key: "armored-key",
        key_id: "key-id",
      };

      // Mock the background page get key info.
      props.context.port.request = jest.fn(() => mockKeyInfo);

      expect.assertions(2);
      const keyInfo = await adminAccountRecoveryContext.getKeyInfo(armoredKey);
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-key-info", armoredKey);
      expect(keyInfo).toBe(mockKeyInfo);
    });
  });

  describe("AdminAccountRecoveryContext::resetChanges", () => {
    it("it should reset the policy changes", async() => {
      const newPolicy = "new policy";
      const newPublicKey = "new public key";
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);

      expect.assertions(2);
      await adminAccountRecoveryContext.resetChanges();
      expect(adminAccountRecoveryContext.state.policyChanges.publicKey).toBeUndefined();
      expect(adminAccountRecoveryContext.state.policyChanges.policy).toBeUndefined();
    });
  });

  describe("AdminAccountRecoveryContext::downloadPrivateKey", () => {
    it("it should initiate the download of the organization private key", async() => {
      const newPrivateKey = "new private key";

      // Mock the background page download private key request.
      props.context.port.request = jest.fn();

      expect.assertions(1);
      await adminAccountRecoveryContext.downloadPrivateKey(newPrivateKey);
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.download-organization-generated-key", newPrivateKey);
    });
  });

  describe("AdminAccountRecoveryContext::save", () => {
    it("it should save the policy changes", async() => {
      const newPolicy = "new policy";
      const newPublicKey = "new public key";
      const expectedSaveDto = {
        "account_recovery_organization_public_key": {
          "armored_key": "new public key",
        },
        "policy": "new policy",
      };

      // Mock the background page save request.
      props.context.port.request = jest.fn();

      expect.assertions(1);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      await adminAccountRecoveryContext.save();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.save-organization-policy", expectedSaveDto, undefined);
    });

    it("it should save the policy changes with a provided current private key", async() => {
      const newPolicy = "new policy";
      const newPublicKey = "new public key";
      const currentPrivateKey = {
        armored_key: "current-private-key",
        passhrase: "current-private-key-passphrase"
      };
      const expectedSaveDto = {
        "account_recovery_organization_public_key": {
          "armored_key": "new public key",
        },
        "policy": "new policy",
      };

      // Mock the background page save request.
      props.context.port.request = jest.fn();

      expect.assertions(1);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      await adminAccountRecoveryContext.changePublicKey(newPublicKey);
      await adminAccountRecoveryContext.save(currentPrivateKey);
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.save-organization-policy", expectedSaveDto, currentPrivateKey);
    });
  });
});
