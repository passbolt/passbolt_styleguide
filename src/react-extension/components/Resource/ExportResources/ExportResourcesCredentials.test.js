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
 * Unit tests on PasswordUnlockKeypassDialog in regard of specifications
 */
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import ExportResourcesCredentialsPage from "./ExportResourcesCredentials.test.page";
import {defaultAppContext, defaultProps} from "./ExportResourcesCredentials.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the export resources credentials dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start export resources credentials', () => {
    /**
     * I should see the export resources credentials dialog
     */
    beforeEach(() => {
      page = new ExportResourcesCredentialsPage(context, props);
    });

    it('As LU I see a success dialog after unlocking keypass file with success', async() => {
      expect.assertions(7);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Enter the password and/or key file");
      const file = new File(['test'], 'keyfile.txt', {type: 'txt'});
      await page.fillPassword("test");
      await page.showPassword();
      expect(page.password.type).toBe('text');
      await page.selectKeypassFile(file);

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.selectExport();
      await waitFor(() => {});

      const exportDto = {
        format: "kdbx",
        folders_ids: props.resourceWorkspaceContext.resourcesToExport.foldersIds,
        resources_ids: props.resourceWorkspaceContext.resourcesToExport.resourcesIds,
        options: {credentials: {password: 'test', keyfile: "dGVzdA=="}}
      };

      expect(context.port.request).toHaveBeenCalledWith("passbolt.export-resources.export-to-file", exportDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The passwords have been exported successfully");
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({resourcesIds: null, foldersIds: null});
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      const file = new File(['test'], 'keyfile.txt', {type: 'txt'});
      await page.fillPassword("test");
      await page.selectKeypassFile(file);

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockContextRequest(requestMockImpl);
      await page.submitExportWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.importFile.getAttribute("disabled")).not.toBeNull();
        expect(page.password.getAttribute("disabled")).not.toBeNull();
        expect(page.exportButton.className).toBe("button primary disabled processing");
        expect(page.exportButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.cancelButton.className).toBe("link cancel");
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        updateResolve();
      });
    });

    it('As LU I can stop importing passwords by clicking on the cancel button', async() => {
      expect.assertions(1);
      await page.cancelExport();
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
      const file = new File(['test'], 'keyfile.txt', {type: 'txt'});
      await page.fillPassword("test");
      await page.selectKeypassFile(file);
      // Mock the request function to make it return an error.
      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.selectExport();
      await waitFor(() => {});

      // Throw dialog general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });
});
