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
 * Unit tests on ExportResources in regard of specifications
 */
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import ExportResourcesPage from "./ExportResources.test.page";
import {defaultAppContext, defaultProps} from "./ExportResources.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import ExportResourcesCredentials from "./ExportResourcesCredentials";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the password export dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start export resources', () => {
    /**
     * I should see the export resources dialog
     */
    beforeEach(() => {
      page = new ExportResourcesPage(context, props);
    });

    it('As LU I see a success toaster after exporting resources in csv with success', async() => {
      expect.assertions(6);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Export passwords");

      // Fill the form
      await page.selectFormat(2);

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.submitExport();
      await waitFor(() => {});

      const exportDto = {
        format: 'csv-lastpass',
        folders_ids: props.resourceWorkspaceContext.resourcesToExport.foldersIds,
        resources_ids: props.resourceWorkspaceContext.resourcesToExport.resourcesIds
      };

      expect(context.port.request).toHaveBeenCalledWith("passbolt.export-resources.export-to-file", exportDto);
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({resourcesIds: null, foldersIds: null});
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The passwords have been exported successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As LU I see a export resources credential dialog after exporting resources in kdbx with success', async() => {
      expect.assertions(4);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Export passwords");

      // Fill the form

      await page.submitExport();
      await waitFor(() => {});

      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResourcesCredentials);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      await page.selectFormat(1);
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockContextRequest(requestMockImpl);
      page.submitExportWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.select.className).toBe("selected-value disabled");
        expect(page.exportButton.getAttribute("disabled")).not.toBeNull();
        expect(page.exportButton.className).toBe("button primary disabled processing");
        expect(page.cancelButton.className).toBe("cancel disabled");
        updateResolve();
      });
    });

    it('As LU I can stop exporting passwords by clicking on the cancel button', async() => {
      expect.assertions(2);
      await page.cancelExport();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({resourcesIds: null, foldersIds: null});
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop exporting passwords by closing the dialog', async() => {
      expect.assertions(2);
      await page.closeDialog();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({resourcesIds: null, foldersIds: null});
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop exporting passwords with the keyboard (escape)', async() => {
      expect.assertions(2);
      await page.escapeKey();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({resourcesIds: null, foldersIds: null});
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      // Fill the form
      await page.selectFormat(3);
      // Mock the request function to make it return an error.
      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.submitExport();
      await waitFor(() => {});

      // Throw dialog general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });
});
