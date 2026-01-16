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
import OrchestrateAccountKitImportationPage from "./OrchestrateAccountKitImportation.test.page";

describe("OrchestrateAccountKitImportation", () => {
  let page;

  describe("As a user I should be able to configure the desktop application by importing an account kit from the browser extension", () => {
    it("As an unknown user I should be invited to configure the desktop application", () => {
      expect.assertions(1);
      page = new OrchestrateAccountKitImportationPage(defaultProps());

      expect(page.getStartedPage).not.toBeNull();
    });

    it("As an unknown user configuring the desktop app I should be able to import an account kit", () => {
      expect.assertions(1);
      const props = defaultProps();
      props.importAccountKitContext.state = ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT;
      page = new OrchestrateAccountKitImportationPage(props);

      expect(page.importAccountKitPage).not.toBeNull();
    });

    it("As an unknown user configuring the desktop app I should see the detail of the account kit & verify my passphrase when importing an account", () => {
      expect.assertions(1);
      const props = defaultProps();
      props.importAccountKitContext.state = ImportAccountKitWorkflowStates.VERIFY_PASSPHRASE;
      page = new OrchestrateAccountKitImportationPage(props);

      expect(page.importAccountKitDetailsPage).not.toBeNull();
    });

    it("As an unknown user configuring the desktop app I be informed about the importation of my account kit", () => {
      expect.assertions(1);
      const props = defaultProps();
      props.importAccountKitContext.state = ImportAccountKitWorkflowStates.IMPORTING_ACCOUNT;
      page = new OrchestrateAccountKitImportationPage(props);

      expect(page.loadingTitle).toEqual("Importing account kit");
    });

    it("As an unknown user configuring the desktop app I be informed when sign in step is in progress", () => {
      expect.assertions(1);
      const props = defaultProps();
      props.importAccountKitContext.state = ImportAccountKitWorkflowStates.SIGNING_IN;
      page = new OrchestrateAccountKitImportationPage(props);

      expect(page.loadingTitle).toEqual("Sign in");
    });

    it("As an unknown user configuring the desktop app I should informed about an unexpected error", () => {
      expect.assertions(1);
      const props = defaultProps();
      props.importAccountKitContext.state = ImportAccountKitWorkflowStates.UNEXPECTED_ERROR_STATE;
      page = new OrchestrateAccountKitImportationPage(props);

      expect(page.displayUnexpectedErrorPage).not.toBeNull();
    });
  });
});
