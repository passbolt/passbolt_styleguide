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
import { PASSKEY_AUTHENTICATOR_NAMES } from "./aaguidNames.data";
import { PASSKEY_AUTHENTICATOR_ICONS } from "./aaguidIcons.data";

const AAGUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe("Passkey authenticator data", () => {
  const names = Object.entries(PASSKEY_AUTHENTICATOR_NAMES);
  const icons = Object.entries(PASSKEY_AUTHENTICATOR_ICONS);

  it("should not be empty", () => {
    expect.assertions(2);
    expect(names.length).toBeGreaterThan(0);
    expect(icons.length).toBeGreaterThan(0);
  });

  it("should index the names by lowercase RFC 4122 aaguid", () => {
    expect.assertions(names.length);
    names.forEach(([aaguid]) => expect(aaguid).toMatch(AAGUID_REGEXP));
  });

  it("should give every authenticator a name", () => {
    expect.assertions(names.length);
    names.forEach(([, name]) => expect(name.trim()).not.toStrictEqual(""));
  });

  it("should only define icons for named authenticators, with both variants set", () => {
    expect.assertions(icons.length * 3);
    icons.forEach(([aaguid, icon]) => {
      expect(PASSKEY_AUTHENTICATOR_NAMES[aaguid]).toBeDefined();
      expect(icon.iconLight).not.toBeNull();
      expect(icon.iconDark).not.toBeNull();
    });
  });
});
