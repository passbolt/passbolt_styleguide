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
 * @since         5.0.0
 */

import {defaultProps} from "../TotpSetup/ScanTotpCode/ScanTotpCode.test.data";
import DuoGetStartedPage from "./DuoGetStarted.test.page";

/**
 * Unit tests on DuoGetStarted in regard of specifications
 */

describe("DuoGetStartedP", () => {
  describe("As a logged user I should see a get started screen to explain how to setup TOTP", () => {
    let page,
      props;

    beforeEach(() => {
      props = defaultProps();
      page = new DuoGetStartedPage(props);
    });
    it('I should have access to the get started duo screen', () => {
      expect.assertions(3);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Getting started with Duo");
      expect(page.subtitle.textContent).toEqual("How does it work?");
    });

    it('I should see illustation with steps to explain the process', async() => {
      expect.assertions(6);

      expect(page.duoSignInIllustation).not.toBeNull();
      expect(page.duoSignInIllustationDescription.textContent).toEqual("You sign in to passbolt just like you normally do.");
      expect(page.duoPushNotificationIllustation).not.toBeNull();
      expect(page.duoPushNotificationIllustationDescription.textContent).toEqual("Use you 2FA device to authenticate.");
      expect(page.duoSuccessLoginIllustation).not.toBeNull();
      expect(page.duoSuccessLoginIllustationDescription.textContent).toEqual("Follow the procedure to login.");
    });
  });
});
