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
 * @since         3.6.0
 */

/**
 * Unit tests on ConfirmSaveAccountRecoverySettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import SelectAccountRecoveryOrganizationKeyPage from "./SelectAccountRecoveryOrganizationKey.test.page";
import MockPort from "../../../test/mock/MockPort";

const originalClipboard = global.navigator.clipboard;

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

afterEach(() => {
  jest.resetAllMocks();
  global.navigator.clipboard = originalClipboard;
});

function defaultProps() {
  return {
    context: {
      port: new MockPort(),
      setContext: () => { }
    },
    dialogContext: {
      open: jest.fn()
    },
    onClose: jest.fn(),
  };
}

describe("See the Confirm Save Account Recovery Settings", () => {
  let page; // The page to test agains

  describe('As AD I can import an ORK', () => {
    /**
     * Given  that I am a logged in administrator in the administration workspace
     * And    I am on the Account recovery settings page
     * And    I selected an Account recovery policy other than “Disabled (default)”
     * When   I click on the “Add an Organization Recovery Key” button
     * Then   I see an “Organization recovery key” dialog
     * And    I see a title
     * And    I see a close button to go back to the Account recovery settings page
     * And    I see 2 tabs, “Import”, “Generate”
     * And    I see the “Import” tab is selected by default
     * And    I see an “Import an OpenPGP Public key” mandatory text area with an “Add OpenPGP Public key” placeholder
     * And    I see a “Browse” button with a “Or select a file from your computer.” next to it
     * And    I see a pro tip bar with a description and a link
     * And    I see a “Cancel” button to go back to the Account recovery settings page
     * And    I see an “Apply” button
     */
    it('As a logged in administrator on the account recovery settings in the administration workspace, I can open a dialog to import an Organization Recovery Key', async() => {
      expect.assertions(11);
      page = new SelectAccountRecoveryOrganizationKeyPage();
      await waitFor(() => { });
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Organization Recovery Key");

      // Close button exists
      expect(page.closeButton).not.toBeNull();

      // Tabs exists
      const tabs = page.tabs;
      const tabsContent = [];
      tabs.forEach(t => tabsContent.push(t.textContent));
      expect(tabsContent.sort()).toEqual(["Import", "Generate"].sort());

      // Default selected tab is Import tab
      expect(page.isImportKeyTabSelected()).toBeTruthy();

      // Import tab has a correct title and the text area exists
      expect(page.imoprtKeyTitle.textContent).toBe("Import an OpenPGP Public key");
      expect(page.importKeyTextArea).not.toBeNull();

      // The button to import the key exists and has the correct value
      expect(page.browseInput).not.toBeNull();
      //expect(page.browseInput.textContent).toBe("Or select a file from your computer."); //There's no such thing at the moment

      // The import tab has a pro tip with a description and a link
      expect(page.proTipDescription).not.toBe("");
      expect(page.proTipLink).not.toBeNull();

      // The import tab has an Apply button
      expect(page.applyButton).not.toBeNull();
    });

    /**
     * Given  that I am a logged in administrator in the administration workspace
     * And    I am on the import tab of the “Organization Recovery Key” dialog
     * When   I paste a OpenPGP Public key in the “Import an OpenPGP Public key” field
     * Then   I see the OpenPGP key in the textarea
     */
    it('As a logged in administrator on the account recovery settings in the administration workspace, I can copy/paste an OpenPGP Public key in the Organization Recovery Key dialog', async() => {
      expect.assertions(1);
      page = new SelectAccountRecoveryOrganizationKeyPage();
      await waitFor(() => { });

      //pick a text doesn't have to be a real key
      const expectedText = "a fake pasted key";
      navigator.clipboard.writeText(expectedText);

      page.importKeyTextArea.select();
      navigator.clipboard.readText();

      expect(page.importKeyTextArea.value).toBe(expectedText);
    });

    /**
     * Given  that I am a logged in administrator in the administration workspace
     * And    I am on the import tab of the “Organization Recovery Key” dialog
     * When   I click on the browse button
     * Then   I see the OS/browser file dialog
     * When   I select a OpenPGP Public key file
     * And    I validate my selection
     * Then   the modal is closed
     * And    I see the OpenPGP key in the field
     */
    it('As a logged in administrator in the administration workspace, I can import an OpenPGP Public key in the Organization Recovery Key dialog', async() => {
      page = new SelectAccountRecoveryOrganizationKeyPage();
      await waitFor(() => { });

      const fileContent = '(⌐□_□)';
      const waitForFileReadCallback = () => expect(page.importKeyTextArea.value).toBe(fileContent);

      await page.userHasSelectedAFile(fileContent, waitForFileReadCallback);
    });

    /**
     * Given  that I am a logged in administrator in the administration workspace
     * And    I am on the import tab of the “Organization Recovery Key” dialog
     * And    I imported an invalid or weak OpenPGP key
     * And    I see the invalid OpenPGP key in the “Import an OpenPGP Public key” textarea
     * When   I click on the “Apply” button
     * Then   I see an error message under the textarea
     * And    I the message tells me the key is invalid or does not meet the security requirement
     * And    I see the “Import an OpenPGP Public key” label in @red
     *
     *
     * Given  that I am a logged in administrator in the administration workspace
     * And    I am on the import tab of the “Organization Recovery Key” dialog
     * And    I imported an OpenPGP key already in use
     * And    I see the already in use OpenPGP key in the “Import an OpenPGP Public key” textarea
     * When   I click on the “Apply” button
     * Then   I see an error message in @red under the textarea
     * And    I the message tells me the key is already in use
     * And    I see the “Import an OpenPGP Public key” label in @red
     */
    it('As a logged in administrator in the administration workspace, I cannot import an invalid OpenPGP Public key in the Organization Recovery Key settings', async() => {
      const props = defaultProps();
      page = new SelectAccountRecoveryOrganizationKeyPage(props);

      const errorMessage = "The key is already used.";
      const mockValidateKey = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
      mockValidateKey(jest.fn(() => Promise.reject(new Error(errorMessage))));

      await waitFor(() => { });

      const waitForFileReadCallback = () => expect(page.importKeyTextArea.value).not.toBe("");
      await page.userHasSelectedAFile('Key already used!', waitForFileReadCallback);

      const waitForErrorMessageCallback = () => expect(page.importErrorMessage).not.toBeNull();
      await page.applyChanges(waitForErrorMessageCallback);

      expect(page.importErrorMessage.textContent).toBe(errorMessage);
    });
  });
});
