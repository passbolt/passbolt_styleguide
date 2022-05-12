/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on ImportResources in regard of specifications
 */
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {defaultAppContext, defaultProps} from "./ImportResources.test.data";
import ImportResourcesResult from "./ImportResourcesResult";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import ImportResourcesKeyUnlock from "./ImportResourcesResult";
import ImportResourcesPage from "./ImportResources.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the password import dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start import a file', () => {
    /**
     * I should see the password import dialog
     */
    beforeEach(() => {
      page = new ImportResourcesPage(context, props);
    });

    it('As LU I see a success dialog after importing a file with success', async() => {
      expect.assertions(9);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Import passwords");
      const file = new File(['test'], 'import.csv', {type: 'csv'});
      // check fields in the form
      await page.selectImportFile(file);
      expect(page.importFolder.checked).toBeTruthy();
      expect(page.importTag.checked).toBeTruthy();
      // Fill the form
      await page.checkImportTag();
      await page.checkImportFolder();

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(requestMockImpl);

      await page.submitImport();
      await waitFor(() => {});

      const base64Content = "dABlAHMAdAA=";
      const extension = 'csv';
      const options = {credentials: {password: null, keyFile: null}, folders: false, tags: false};

      expect(context.port.request).toHaveBeenCalledWith("passbolt.import-resources.import-file", extension, base64Content, options);
      expect(props.resourceWorkspaceContext.onResourceFileImportResult).toHaveBeenCalled();
      expect(props.resourceWorkspaceContext.onResourceFileToImport).toHaveBeenCalled();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ImportResourcesResult);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      const file = new File(['test'], 'import.csv', {type: 'csv'});
      // check fields in the form
      await page.selectImportFile(file);
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockContextRequest(requestMockImpl);
      await page.submitImportWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.importFile.getAttribute("disabled")).not.toBeNull();
        expect(page.importTag.getAttribute("disabled")).not.toBeNull();
        expect(page.importFolder.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary disabled processing");
        expect(page.cancelButton.className).toBe("cancel disabled");
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is an error', async() => {
      expect.assertions(1);
      const file = new File(['test'], 'import.csv', {type: 'csv'});
      // check fields in the form
      await page.selectImportFile(file);
      const error = {name: "FileFormatError", message: "error"};

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.submitImport();
      await waitFor(() => {});

      // Throw error message
      expect(page.errorMessage).toBe(error.message);
    });

    it('As LU I shouldn’t be able to submit the form if there is an error in kdbx file', async() => {
      expect.assertions(2);
      const file = new File(['test'], 'import.kdbx', {type: 'kdbx'});
      // check fields in the form
      await page.selectImportFile(file);
      const error = {name: "KdbxError", code: "InvalidKey"};

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.submitImport();
      await waitFor(() => {});

      const resourceFileToImport = {
        b64FileContent: "dGVzdA==",
        fileType: "kdbx",
        options: {
          folders: true,
          tags: true
        }
      };
      // Throw error message
      expect(props.resourceWorkspaceContext.onResourceFileToImport).toHaveBeenCalledWith(resourceFileToImport);
      expect(props.dialogContext.open).toHaveBeenCalledWith(ImportResourcesKeyUnlock);
    });

    it('As LU I can stop importing passwords by clicking on the cancel button', async() => {
      expect.assertions(1);
      await page.cancelImport();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop importing passwords by closing the dialog', async() => {
      expect.assertions(1);
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop importing passwords with the keyboard (escape)', async() => {
      expect.assertions(1);
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      const file = new File(['test'], 'import.csv', {type: 'csv'});
      // check fields in the form
      await page.selectImportFile(file);
      // Mock the request function to make it return an error.
      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.submitImport();
      await waitFor(() => {});

      // Throw dialog general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });
});
