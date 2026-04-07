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
 * Unit tests on ExtConfigureSafariExtension in regard of specifications
 */

import MockPort from "../../../test/mock/MockPort";
import ExtConfigureSafariExtensionPage from "./ExtConfigureSafariExtension.test.page";

beforeEach(() => {
  jest.resetModules();
  window.matchMedia = jest.fn().mockReturnValue(false);
});

describe("As AN I should be able to see Safari extension configuration helper page", () => {
  it("As AN I should see the helper page for Safari when extension is installed", () => {
    expect.assertions(5);

    const port = new MockPort();
    port.addRequestListener("passbolt.extension.start-checking-for-permission-update", jest.fn());
    port.addRequestListener("passbolt.extension.stop-checking-for-permission-update", jest.fn());
    const props = {
      context: { port },
      onContinue: jest.fn(),
    };
    const page = new ExtConfigureSafariExtensionPage(props);

    expect(page.exists()).toBeTruthy();
    // title
    expect(page.title).toBe("Congratulations! Passbolt extension has been installed.");
    // message
    expect(page.message).toBe(
      "Once the extension is installed, it must be allowed on every website, otherwise it won't work as expected. Learn more",
    );
    // go to settings button
    expect(page.goToSettingsButton.textContent).toBe("Go to settings");
    // continue link
    expect(page.continueButton.textContent).toBe("Continue");
  });

  it("As AN I should see the 'Learn more' link with noopener and noreferrer", () => {
    expect.assertions(2);

    const port = new MockPort();
    port.addRequestListener("passbolt.extension.start-checking-for-permission-update", jest.fn());
    port.addRequestListener("passbolt.extension.stop-checking-for-permission-update", jest.fn());
    const props = {
      context: { port },
      onContinue: jest.fn(),
    };
    const page = new ExtConfigureSafariExtensionPage(props);

    expect(page.learnMoreLink.getAttribute("rel")).toContain("noopener");
    expect(page.learnMoreLink.getAttribute("rel")).toContain("noreferrer");
  });

  it("As AN I should be able to click on 'Go to settings' to open extension settings", async () => {
    expect.assertions(1);

    const port = new MockPort();
    port.addRequestListener("passbolt.extension.start-checking-for-permission-update", jest.fn());
    port.addRequestListener("passbolt.extension.stop-checking-for-permission-update", jest.fn());
    port.addRequestListener("passbolt.safari.open-extension-settings", jest.fn());
    const props = {
      context: { port },
      onContinue: jest.fn(),
    };
    const page = new ExtConfigureSafariExtensionPage(props);

    await page.clickGoToSettings();

    expect(port.requestListeners["passbolt.safari.open-extension-settings"]).toHaveBeenCalled();
  });

  it("As AN I should be able to click on 'Continue' to proceed", async () => {
    expect.assertions(1);

    const port = new MockPort();
    port.addRequestListener("passbolt.extension.start-checking-for-permission-update", jest.fn());
    port.addRequestListener("passbolt.extension.stop-checking-for-permission-update", jest.fn());
    const props = {
      context: { port },
      onContinue: jest.fn(),
    };
    const page = new ExtConfigureSafariExtensionPage(props);

    await page.clickContinue();

    expect(props.onContinue).toHaveBeenCalled();
  });
});
