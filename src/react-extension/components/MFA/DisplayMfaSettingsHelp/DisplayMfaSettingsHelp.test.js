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
 * @since         5.0.0
 */

import { Providers } from "../../../contexts/MFAContext";
import { defaultProps } from "../DisplayProviderList/DisplayProviderList.test.data";
import DisplayMfaSettingsHelpPage from "./DisplayMfaSettingsHelp.test.page";

describe("DisplayMfaSettingsHelp", () => {
  describe("As a logged user I should see an help box in the MFA screen", () => {
    it("As a logged user I should see the default help box in the MFA screen", async () => {
      expect.assertions(5);

      const props = defaultProps();
      const page = new DisplayMfaSettingsHelpPage(props);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("What is multi-factor authentication?");
      expect(page.helpBoxDescription.textContent).toBe(
        "Multi-factor authentication (MFA) is a method of confirming a user's identity that requires presenting two or more pieces of evidence (or factor).",
      );
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual(
        "https://www.passbolt.com/docs/admin/authentication/mfa-policy",
      );
    });

    it("As a logged user I should see an help box in the scan totp screen ", async () => {
      expect.assertions(5);

      const props = defaultProps({
        mfaContext: {
          provider: Providers.TOTP,
        },
      });
      const page = new DisplayMfaSettingsHelpPage(props);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("Requirements");
      expect(page.helpBoxDescription.textContent).toBe(
        "To proceed you need to install an application that supports Time Based One Time Passwords (TOTP) on your phone or tablet such as: Google Authenticator or FreeOTP.",
      );
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual(
        "https://www.passbolt.com/docs/admin/authentication/mfa/totp",
      );
    });

    it("As a logged user I should see an help box in the duo screen ", async () => {
      expect.assertions(5);

      const props = defaultProps({
        mfaContext: {
          provider: Providers.DUO,
        },
      });
      const page = new DisplayMfaSettingsHelpPage(props);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("Requirements");
      expect(page.helpBoxDescription.textContent).toBe(
        "To proceed, you need to install the Duo mobile application or to have a device to authenticate which is supported by Duo. For the list of supported devices, see: Duo authentication methods.",
      );
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual(
        "https://www.passbolt.com/docs/admin/authentication/mfa/duo",
      );
    });
  });
});
