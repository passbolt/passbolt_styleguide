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

import React from "react";
import { render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayPasskeyUserSettingsHelp from "./DisplayPasskeyUserSettingsHelp";

describe("DisplayPasskeyUserSettingsHelp", () => {
  it("As a user I can read what passkey login is in the help sidebar", () => {
    expect.assertions(2);
    const page = render(
      <MockTranslationProvider>
        <DisplayPasskeyUserSettingsHelp />
      </MockTranslationProvider>,
    );

    expect(page.container.querySelector(".sidebar-help-section")).not.toBeNull();
    expect(page.container.querySelector("h3").textContent).toEqual("What is passkey login?");
  });
});
