/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import { ImportAccountKitWorkflowStates } from "../../../contexts/Desktop/ImportAccountKitContext";
import { defaultProps } from "../OrchestrateAccountKitImportation/OrchestrateAccoutKitImportation.test.data";
import GetStartedDesktopPage from "./GetStartedDesktop.test.page";

describe("GetStartedDesktop", () => {
  let page, props;
  beforeEach(() => {
    props = defaultProps();
    page = new GetStartedDesktopPage(props);
  });

  describe("As an unknown user I should be invited to configure the desktop application", () => {
    it("As an unknown user I can see the get started page", () => {
      expect.assertions(1);

      expect(page.exists()).toBeTruthy();
    });
    it("As an unknown user I can see the title", () => {
      expect.assertions(1);

      expect(page.title).toEqual("Get started !");
    });
    it("As an unknown user I can see the description", () => {
      expect.assertions(1);

      expect(page.description).toEqual(
        "You need to upload an account kit to start using the desktop app.  Please follow these instructions:",
      );
    });

    it("As an unknown user I can see the steps explaining how to export the account kit", () => {
      expect.assertions(4);

      expect(page.step(1).innerHTML).toEqual('<span class="step">1</span>Authenticate on your browser extension');
      expect(page.step(2).innerHTML).toEqual('<span class="step">2</span>Go to your profile');
      expect(page.step(3).innerHTML).toEqual('<span class="step">3</span>Go to the Desktop app setup section');
      expect(page.step(4).innerHTML).toEqual('<span class="step">4</span>Download the account kit');
    });

    it("As an unknown user I can click on start to switch to the import page", async () => {
      expect.assertions(2);

      await page.click(page.startButton);
      expect(page.startButton.textContent).toEqual("Start");
      expect(props.importAccountKitContext.navigate).toHaveBeenCalledWith(
        ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT,
      );
    });
  });
});
