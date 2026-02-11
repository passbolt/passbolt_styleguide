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
 * @since         5.10.0
 */

/**
 * Unit tests on  InstallSafariExtension in regard of specifications
 */

import InstallSafariExtensionTestPage from "./InstallSafariExtension.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should be able to be requested to download the extension during the setup of my account in Safari", () => {
  it("As AN I should see the install extension for safari", () => {
    expect.assertions(7);

    const page = new InstallSafariExtensionTestPage();

    expect(page.exists()).toBeTruthy();
    // title
    expect(page.title).toBe("Please install the browser extension (BETA).");
    // browser image
    expect(page.browserClassName).toBe("browser-webstore safari");
    // message
    expect(page.message).toBe("Please download the browser extension and refresh this page to continue.");
    // download
    expect(page.download).toBe("Download extension");
    // download
    expect(page.downloadUrl).toBe("https://apps.apple.com/app/6754879299");
    // link
    expect(page.link.textContent).toBe("I already installed the extension");
  });
});
