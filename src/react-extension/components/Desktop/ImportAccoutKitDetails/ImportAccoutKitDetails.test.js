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

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

import { ImportAccountKitWorkflowStates } from "../../../contexts/Desktop/ImportAccountKitContext";
import MockPort from "../../../test/mock/MockPort";
import { defaultContextProps } from "./ImportAccoutKitDetails.test.data";
import ImportAccoutKitDetailsPage from "./ImportAccoutKitDetails.test.page";

describe("ImportAccoutKitDetails", () => {
  let page, props, accountKit;
  const passphrase = "ada@passbolt.com";

  beforeEach(() => {
    props = defaultContextProps({ context: { port: new MockPort() } });
    accountKit = props.importAccountKitContext.accountKit;
    page = new ImportAccoutKitDetailsPage(props);
  });

  describe("As an unknown user configuring the desktop app I should see the detail of the account kit & verify my passphrase when importing an account", () => {
    it("As an unknown user configuring the desktop app I should see the detail of the account kit I am importing", () => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      expect(page.userName).toEqual(`${accountKit.first_name} ${accountKit.last_name}`);
      expect(page.email).toEqual(accountKit.username);
      expect(page.domain).toEqual(accountKit.domain);
    });

    it("As an unknown user configuring the desktop app I should be able to verify my passphrase", async () => {
      expect.assertions(1);

      jest.spyOn(props.importAccountKitContext, "verifyPassphrase").mockImplementation(() => jest.fn());

      await page.fillPassphrase(passphrase);
      await page.clickOnNextButton();

      expect(props.importAccountKitContext.verifyPassphrase).toHaveBeenCalledWith(passphrase);
    });

    it("As an unknown user configuring the desktop app I should be warned if I entered a wrong passphrase", async () => {
      expect.assertions(2);

      jest
        .spyOn(props.importAccountKitContext, "verifyPassphrase")
        .mockImplementation(() => Promise.reject({ name: "InvalidMasterPasswordError" }));
      await page.fillPassphrase(passphrase);
      await page.clickOnNextButton();

      expect(page.hasInvalidPassphraseError).toBeTruthy();
      expect(page.invalidPassphrase.textContent).toEqual("The passphrase is invalid.");
    });

    it("As an unknown user configuring the desktop app I should be warned if I entered a wrong private key", async () => {
      expect.assertions(2);

      jest
        .spyOn(props.importAccountKitContext, "verifyPassphrase")
        .mockImplementation(() => Promise.reject({ name: "GpgKeyError" }));
      await page.fillPassphrase(passphrase);
      await page.clickOnNextButton();

      expect(page.hasInvalidGPGKey).toBeTruthy();
      expect(page.invalidGPGKey.textContent).toEqual("The private key is invalid.");
    });

    it("As an unknown user configuring the desktop app I should be able to import another account", async () => {
      expect.assertions(1);

      jest.spyOn(props.importAccountKitContext, "navigate");
      await page.clickSecondaryActionLink();

      expect(props.importAccountKitContext.navigate).toHaveBeenCalledWith(
        ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT,
      );
    });
  });
});
