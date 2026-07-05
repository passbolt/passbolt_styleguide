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
 * @since         5.14.0
 */

import { defaultProps, passkeysSecretDto } from "./AddResourcePasskeys.test.data";
import AddResourcePasskeysPage from "./AddResourcePasskeys.test.page";

describe("AddResourcePasskeys", () => {
  it("As a user editing a resource without passkeys I see the empty state", () => {
    expect.assertions(2);
    const page = new AddResourcePasskeysPage(defaultProps());

    expect(page.title.textContent).toEqual("Passkeys");
    expect(page.emptyDescription.textContent).toEqual("There is no passkey in this item.");
  });

  it("As a user I can see the passkeys stored in the resource secret", () => {
    expect.assertions(2);
    const page = new AddResourcePasskeysPage(defaultProps({ passkeys: passkeysSecretDto() }));

    expect(page.fields.length).toEqual(1);
    expect(page.fieldLabel(0)).toEqual("brf@webauthn.io");
  });

  it("As a user I remove a passkey via a soft-delete after confirming my passphrase", async () => {
    expect.assertions(3);
    const props = defaultProps({ passkeys: passkeysSecretDto() });
    const page = new AddResourcePasskeysPage(props);

    await page.clickDelete(0);

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.fido2-passkey.confirm-passphrase");
    expect(props.onChange).toHaveBeenCalledTimes(1);
    // Soft delete: a deleted_at timestamp is set on the passkey, not a removal.
    expect(props.onChange.mock.calls[0][0].target.name).toEqual("secret.passkeys.0.deleted_at");
  });

  it("As a user I keep the passkey when I cancel the passphrase prompt", async () => {
    expect.assertions(1);
    const props = defaultProps({ passkeys: passkeysSecretDto() });
    props.context.port.request.mockImplementation(() => Promise.reject(new Error("cancelled")));
    const page = new AddResourcePasskeysPage(props);

    await page.clickDelete(0);

    expect(props.onChange).not.toHaveBeenCalled();
  });
});
