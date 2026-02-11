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

import ApiConfigureSafariExtensionPage from "./ApiConfigureSafariExtension.test.page";

beforeEach(() => {
  jest.resetModules();
  window.matchMedia = jest.fn().mockReturnValue(false);
});

describe("As AN I should be able to be see Safari configuration helper page", () => {
  it("As AN I should see the helper page for Safari when not installed", () => {
    expect.assertions(4);

    const page = new ApiConfigureSafariExtensionPage();

    expect(page.exists()).toBeTruthy();
    // title
    expect(page.title).toBe("Allow the extension on every website.");
    // message
    expect(page.message).toBe(
      "Once the extension is installed, it must be allowed on every website, otherwise it won't work as expected. Learn more",
    );
    // link
    expect(page.notDownloaded.textContent).toBe("I didn't install the extension");
  });

  it("As AN I should see the 'Learn more' link with noopener and noreferrer", () => {
    expect.assertions(2);

    const page = new ApiConfigureSafariExtensionPage();

    expect(page.learnMoreLink.getAttribute("rel")).toContain("noopener");
    expect(page.learnMoreLink.getAttribute("rel")).toContain("noreferrer");
  });

  it("As AN I should be able to click on 'I didn't install the extension'", async () => {
    expect.assertions(1);

    const props = {
      onExtensionNotDownloaded: jest.fn(),
    };
    const page = new ApiConfigureSafariExtensionPage(props);

    await page.clickNotDownloaded();

    expect(props.onExtensionNotDownloaded).toHaveBeenCalled();
  });
});
