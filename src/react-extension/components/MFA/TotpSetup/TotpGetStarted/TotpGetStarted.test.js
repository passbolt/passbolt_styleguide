/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

import { MfaSettingsWorkflowStates } from "../../../../contexts/MFAContext";
import { defaultProps } from "../ScanTotpCode/ScanTotpCode.test.data";
import TotpGetStartedPage from "./TotpGetStarted.test.page";

/**
 * Unit tests on TotpGetStarted in regard of specifications
 */

describe("TotpGetStarted", () => {
  describe("As a logged user I should see a get started screen to explain how to setup TOTP", () => {
    let page, props;

    beforeEach(() => {
      props = defaultProps();
      page = new TotpGetStartedPage(props);
    });
    it("I should have access to the scan totp screen", () => {
      expect.assertions(3);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Getting started with Time based One Time Password (TOTP)");
      expect(page.subtitle.textContent).toEqual("How does it work?");
    });

    it("I should see some explanation to how the setup will happen", async () => {
      expect.assertions(1);

      await page.clickOnGetStartedButton();

      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.SCANTOTPCODE);
    });

    it("I should be able to cancel the setup", async () => {
      expect.assertions(6);

      await page.clickOnCancelButton();
      expect(page.totpSignInIllustation).not.toBeNull();
      expect(page.totpSignInIllustationDescription.textContent).toEqual(
        "You sign in to passbolt just like you normally do.",
      );
      expect(page.totpPhoneIllustation).not.toBeNull();
      expect(page.totpPhoneIllustationDescription.textContent).toEqual(
        "When using a new browser, you need an additional code from your phone.",
      );
      expect(page.totpEnterCodeIllustation).not.toBeNull();
      expect(page.totpEnterCodeIllustationDescription.textContent).toEqual("Once you enter this code, you can log in.");
    });

    it("I should be able to start the setup", async () => {
      expect.assertions(1);

      await page.clickOnGetStartedButton();

      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.SCANTOTPCODE);
    });
  });
});
