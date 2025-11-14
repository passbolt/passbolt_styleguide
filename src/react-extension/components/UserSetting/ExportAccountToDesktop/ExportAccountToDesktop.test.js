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
 * @since         4.3.0
 */

import ExportAccountToDesktopPage from "./ExportAccountToDesktop.test.page";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultProps} from "./ExportAccountToDesktop.data";
/**
 * Unit tests on ExportAccountToDesktop
 */

beforeEach(() => {
  jest.resetModules();
});

describe("ExportAccountToDesktop", () => {
  let page; // The page to test against
  const context = defaultAppContext();
  const props = defaultProps();

  beforeEach(() => {
    page = new ExportAccountToDesktopPage(context, props);
  });

  describe('As a user I can setup the desktop application from the browser extension', () => {
    it('As a LU on the web application I should be able to see the “desktop app setup” in the user setting', () => {
      expect.assertions(8);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Welcome to the desktop app setup");
      expect(page.windowsStoreTitle.textContent).toEqual("Download the desktop app");
      expect(page.windowsStoreButton).toBeDefined();
      expect(page.windowsStoreDescription.textContent).toEqual("Passbolt is available on the Windows store.");
      expect(page.downloadAccountTitle.textContent).toEqual("Transfer your account kit");
      expect(page.downloadAccountDescription.textContent).toEqual("An account kit is required to transfer your profile and private key to the desktop app.");
      expect(page.downloadAccountKitButton.textContent).toEqual("Download your account kit");
    });

    it('As a LU on the web application configuring the desktop app I can access an help page', () => {
      expect.assertions(10);

      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxTitle.textContent).toEqual("Get started in 5 easy steps");
      expect(page.helpBoxDescription[0].textContent).toEqual("1. Click download the account kit.");
      expect(page.helpBoxDescription[1].textContent).toEqual("2. Install the application from the store.");
      expect(page.helpBoxDescription[2].textContent).toEqual("3. Open the application.");
      expect(page.helpBoxDescription[3].textContent).toEqual("4. Upload the account kit on the desktop app.");
      expect(page.helpBoxDescription[4].textContent).toEqual("5. And you are done!");
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://www.passbolt.com/docs/user/quickstart/desktop/windows-app/');
      expect(page.helpBoxButton.getAttribute('rel')).toEqual('noopener noreferrer');
    });

    it('As a LU on the web application configuring the desktop app I can download the desktop application from the Windows store', () => {
      expect.assertions(2);

      expect(page.windowsStoreButton.getAttribute('class')).toEqual("windows-store");
      expect(page.windowsStoreButton.getAttribute('href')).toEqual('https://apps.microsoft.com/detail/passbolt/9PFXS2WVKVPB');
    });

    it('As LU user on the web application configuring the desktop app I should be able to download the account kit <success>', async() => {
      expect.assertions(2);
      context.port.request = jest.fn();

      await page.clickOnDownloadAccountKit();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.desktop.export-account");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The account kit has been downloaded successfully.");
    });

    it('As LU user on the web application configuring the desktop app I should be able to download the account kit <error>', async() => {
      expect.assertions(2);
      const errorMessage = "Server Error";
      context.port.request = jest.fn(() => { throw Error(errorMessage); });

      await page.clickOnDownloadAccountKit();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.desktop.export-account");
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(errorMessage);
    });
  });
});
