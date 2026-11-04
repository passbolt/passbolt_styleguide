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
 * @since         5.18.0
 */

import { DuoSetupErrors } from "../../../contexts/MFAContext";
import { defaultProps } from "./DuoSetupError.test.data";
import DuoSetupErrorPage from "./DuoSetupError.test.page";
import { DUO_DOCUMENTATION_URL } from "./DuoSetupError";

describe("DuoSetupError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("As a logged user I should see the reason why the Duo setup failed", () => {
    it.each([{ errorCode: DuoSetupErrors.SETUP_FAILED }, { errorCode: "unknownErrorCode" }, { errorCode: undefined }])(
      "should show the default error with a documentation link for the error code $errorCode",
      (testCase) => {
        expect.assertions(4);

        const props = defaultProps({ errorCode: testCase.errorCode });
        const page = new DuoSetupErrorPage(props);

        expect(page.exists()).toBe(true);
        expect(page.title.textContent).toBe("Duo could not be enabled");
        expect(page.description.textContent).toBe(
          "Could not verify your Duo authentication. Please try again. Learn more",
        );
        expect(page.learnMoreLink.getAttribute("href")).toBe(DUO_DOCUMENTATION_URL);
      },
    );

    it("should show the subscriber mismatch error with a documentation link", () => {
      expect.assertions(4);

      const props = defaultProps({ errorCode: DuoSetupErrors.SUBSCRIBER_MISMATCH });
      const page = new DuoSetupErrorPage(props);

      expect(page.exists()).toBe(true);
      expect(page.title.textContent).toBe("Sorry, Duo could not be enabled");
      expect(page.description.textContent).toBe(
        "Your Duo username does not match your Passbolt username. Please contact your administrator to fix this issue. Learn more",
      );
      expect(page.learnMoreLink.getAttribute("href")).toBe(DUO_DOCUMENTATION_URL);
    });
  });

  describe("As a logged user I should be able to leave the error screen", () => {
    it("should go back to the providers list when the user clicks on manage providers", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new DuoSetupErrorPage(props);

      await page.clickOnManageProvidersButton();

      expect(props.onCancel).toHaveBeenCalledTimes(1);
      expect(props.onTryAgain).not.toHaveBeenCalled();
    });

    it("should restart the Duo setup when the user clicks on retry", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new DuoSetupErrorPage(props);

      await page.clickOnRetryButton();

      expect(props.onTryAgain).toHaveBeenCalledTimes(1);
      expect(props.onCancel).not.toHaveBeenCalled();
    });
  });
});
