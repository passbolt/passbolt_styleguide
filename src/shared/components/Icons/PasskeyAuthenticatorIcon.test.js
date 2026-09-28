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
 * @since         5.17.0
 */

/**
 * Unit tests on PasskeyAuthenticatorIcon in regard of specifications
 */
jest.mock("../../../img/svg/passkey.svg", () => (props) => <svg data-testid="passkey-svg" {...props} />);
// Every svg file resolves to the same jest mock module, so distinct icons are provided through the mapping instead.
jest.mock("../../models/passkey/aaguidIcons.data", () => {
  const WindowsHelloSVG = (props) => <svg data-testid="windows-hello-svg" {...props} />;
  return {
    PASSKEY_AUTHENTICATOR_ICONS: {
      "fdb141b2-5d84-443e-8a35-4698c205a502": {
        iconLight: (props) => <svg data-testid="keepassxc-light-svg" {...props} />,
        iconDark: (props) => <svg data-testid="keepassxc-dark-svg" {...props} />,
      },
      "08987058-cadc-4b81-b6e1-30de50dcbe96": {
        iconLight: WindowsHelloSVG,
        iconDark: WindowsHelloSVG,
      },
    },
  };
});
import React from "react";
import PasskeyAuthenticatorIconPage from "./PasskeyAuthenticatorIcon.test.page";
import { defaultProps } from "./PasskeyAuthenticatorIcon.test.data";

describe("PasskeyAuthenticatorIcon", () => {
  it("should display the light and dark variants of an authenticator having distinct icons", () => {
    expect.assertions(4);
    const page = new PasskeyAuthenticatorIconPage(defaultProps({ aaguid: "fdb141b2-5d84-443e-8a35-4698c205a502" }));
    expect(page.exists).toBeTruthy();
    expect(page.svgs).toHaveLength(2);
    expect(page.lightIcon.dataset.testid).toStrictEqual("keepassxc-light-svg");
    expect(page.darkIcon.dataset.testid).toStrictEqual("keepassxc-dark-svg");
  });

  it("should display a single icon for an authenticator having the same icon in both themes", () => {
    expect.assertions(4);
    const page = new PasskeyAuthenticatorIconPage(defaultProps());
    expect(page.svgs).toHaveLength(1);
    expect(page.svgs[0].dataset.testid).toStrictEqual("windows-hello-svg");
    expect(page.lightIcon).toBeNull();
    expect(page.darkIcon).toBeNull();
  });

  it("should display the generic passkey icon for an unknown authenticator", () => {
    expect.assertions(2);
    const page = new PasskeyAuthenticatorIconPage(defaultProps({ aaguid: "00000000-0000-0000-0000-000000000000" }));
    expect(page.svgs).toHaveLength(1);
    expect(page.svgs[0].dataset.testid).toStrictEqual("passkey-svg");
  });

  it("should display the generic passkey icon when no aaguid is given", () => {
    expect.assertions(2);
    const page = new PasskeyAuthenticatorIconPage({});
    expect(page.svgs).toHaveLength(1);
    expect(page.svgs[0].dataset.testid).toStrictEqual("passkey-svg");
  });

  it("should display the generic passkey icon for a known authenticator without icon", () => {
    expect.assertions(2);
    // Chromium Browser has a name but no icon upstream
    const page = new PasskeyAuthenticatorIconPage(defaultProps({ aaguid: "b5397666-4885-aa6b-cebf-e52262a439a2" }));
    expect(page.svgs).toHaveLength(1);
    expect(page.svgs[0].dataset.testid).toStrictEqual("passkey-svg");
  });

  it("should append the given class name to the wrapper", () => {
    expect.assertions(1);
    const page = new PasskeyAuthenticatorIconPage(defaultProps({ className: "large" }));
    expect(page.icon.className).toStrictEqual("passkey-authenticator-icon large");
  });
});
