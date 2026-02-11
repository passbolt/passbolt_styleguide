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
import { waitFor } from "@testing-library/react";
import ExportResourcesPage from "./ExportResources.test.page";
import { defaultAppContext, defaultProps } from "./ExportResources.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import ExportResourcesCredentials from "./ExportResourcesCredentials";
import { defaultExportPoliciesSettingsContext } from "../../../contexts/ExportPoliciesSettingsContext.test.data";
import ExportPoliciesSettingsEntity from "../../../../shared/models/entity/exportSettings/ExportPoliciesSettingsEntity";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the password export dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (implementation) => jest.spyOn(context.port, "request").mockImplementation(implementation);

  describe("As LU I can start export resources", () => {
    /**
     * I should see the export resources dialog
     */
    beforeEach(() => {
      page = new ExportResourcesPage(context, props);
    });

    it("As LU I see a success toaster after exporting resources in csv with success", async () => {
      expect.assertions(6);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Export passwords");

      // Fill the form
      await page.selectFormat(3);
      await page.clickCsvWarningCheckbox();

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});

      await page.submitExport();
      await waitFor(() => {});

      const exportDto = {
        format: "csv-lastpass",
        folders_ids: props.resourceWorkspaceContext.resourcesToExport.foldersIds,
        resources_ids: props.resourceWorkspaceContext.resourcesToExport.resourcesIds,
      };

      expect(context.port.request).toHaveBeenCalledWith("passbolt.export-resources.export-to-file", exportDto);
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({
        resourcesIds: null,
        foldersIds: null,
      });
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith(
        "The passwords have been exported successfully",
      );
      expect(props.onClose).toBeCalled();
    });

    it("As LU I see a export resources credential dialog after exporting resources in kdbx with success", async () => {
      expect.assertions(4);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Export passwords");

      // Fill the form

      await page.submitExport();
      await waitFor(() => {});

      expect(props.dialogContext.open).toHaveBeenCalledWith(ExportResourcesCredentials, { format: "kdbx" });
      expect(props.onClose).toBeCalled();
    });

    it("As LU I cannot update the form fields and I should see a processing feedback while submitting the form", async () => {
      // Fill the form
      await page.selectFormat(2);
      await page.clickCsvWarningCheckbox();
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(
        () =>
          new Promise((resolve) => {
            updateResolve = resolve;
          }),
      );
      mockContextRequest(requestMockImpl);
      page.submitExportWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.select.className).toBe("selected-value disabled");
        expect(page.exportButton.getAttribute("disabled")).not.toBeNull();
        expect(page.exportButton.className).toBe("button primary form disabled processing");
        expect(page.exportButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.cancelButton.className).toBe("link cancel");
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        updateResolve();
      });
    });

    it("As LU I can stop exporting passwords by clicking on the cancel button", async () => {
      expect.assertions(2);
      await page.cancelExport();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({
        resourcesIds: null,
        foldersIds: null,
      });
      expect(props.onClose).toBeCalled();
    });

    it("As LU I can stop exporting passwords by closing the dialog", async () => {
      expect.assertions(2);
      await page.closeDialog();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({
        resourcesIds: null,
        foldersIds: null,
      });
      expect(props.onClose).toBeCalled();
    });

    it("As LU I can stop exporting passwords with the keyboard (escape)", async () => {
      expect.assertions(2);
      await page.escapeKey();
      expect(props.resourceWorkspaceContext.onResourcesToExport).toHaveBeenCalledWith({
        resourcesIds: null,
        foldersIds: null,
      });
      expect(props.onClose).toBeCalled();
    });

    it("As LU I should see an error dialog if the submit operation fails for an unexpected reason", async () => {
      expect.assertions(1);
      // Fill the form
      await page.selectFormat(3);
      await page.clickCsvWarningCheckbox();
      // Mock the request function to make it return an error.
      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, "request").mockImplementationOnce(() => {
        throw error;
      });

      await page.submitExport();
      await waitFor(() => {});

      // Throw dialog general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: error });
    });
  });

  describe("CSV warning checkbox", () => {
    beforeEach(() => {
      page = new ExportResourcesPage(context, props);
    });

    it("As LU I should see the CSV warning checkbox when a CSV format is selected", async () => {
      expect.assertions(4);
      expect(page.csvWarningCheckbox).toBeNull();

      await page.selectFormat(3);

      expect(page.csvWarningCheckbox).not.toBeNull();
      expect(page.csvWarningLabel).not.toBeNull();
      expect(page.csvWarningLabel.textContent).toContain("I understand this file is unencrypted");
    });

    it("As LU I should not see the CSV warning checkbox when KDBX format is selected", async () => {
      expect.assertions(2);

      await page.selectFormat(3);
      expect(page.csvWarningCheckbox).not.toBeNull();

      await page.selectFormat(1);
      expect(page.csvWarningCheckbox).toBeNull();
    });

    it("As LU I should see the Export button enabled when CSV is selected and checkbox is not checked", async () => {
      expect.assertions(1);
      await page.selectFormat(3);

      expect(page.exportButton.hasAttribute("disabled")).toBeFalsy();
    });

    it("As LU I should see the CSV warning checkbox with error class when trying to submit without checking", async () => {
      expect.assertions(3);
      await page.selectFormat(3);

      expect(page.csvWarningContainer.className).toBe("input checkbox");

      const requestMock = jest.spyOn(context.port, "request").mockClear();

      await page.submitExport();

      expect(page.csvWarningContainer.className).toBe("input checkbox error");
      expect(requestMock).not.toHaveBeenCalled();
    });

    it("As LU I should see the CSV warning error cleared when checking the checkbox", async () => {
      expect.assertions(2);
      await page.selectFormat(3);

      await page.submitExport();
      expect(page.csvWarningContainer.className).toBe("input checkbox error");

      await page.clickCsvWarningCheckbox();
      expect(page.csvWarningContainer.className).toBe("input checkbox");
    });

    it("As LU I should see the CSV warning error cleared when changing format", async () => {
      expect.assertions(2);
      await page.selectFormat(3);

      await page.submitExport();
      expect(page.csvWarningContainer.className).toBe("input checkbox error");

      await page.selectFormat(4);
      expect(page.csvWarningContainer.className).toBe("input checkbox");
    });

    it("As LU I should see the checkbox state reset when switching formats", async () => {
      expect.assertions(4);

      await page.selectFormat(3);
      expect(page.csvWarningCheckbox.checked).toBeFalsy();

      await page.clickCsvWarningCheckbox();
      expect(page.csvWarningCheckbox.checked).toBeTruthy();

      await page.selectFormat(4);
      expect(page.csvWarningCheckbox.checked).toBeFalsy();

      await page.selectFormat(1);
      await page.selectFormat(3);
      expect(page.csvWarningCheckbox.checked).toBeFalsy();
    });

    it("As LU I should see the Learn more link with correct href and target", async () => {
      expect.assertions(3);

      await page.selectFormat(3);

      const learnMoreLink = page.csvWarningLabel.querySelector("a");
      expect(learnMoreLink).not.toBeNull();
      expect(learnMoreLink.getAttribute("href")).toBe(
        "https://www.passbolt.com/docs/user/basic-features/browser/export/",
      );
      expect(learnMoreLink.getAttribute("target")).toBe("_blank");
    });
  });

  describe("As LU I should see export formats based on export policies settings", () => {
    it("As LU I should see only KDBX formats when CSV format is disabled", () => {
      expect.assertions(1);
      const exportPoliciesSettingsContext = defaultExportPoliciesSettingsContext({
        getSettings: () => ExportPoliciesSettingsEntity.createFromDefault({ allow_csv_format: false }),
      });
      const props = defaultProps();
      props.exportPoliciesSettingsContext = exportPoliciesSettingsContext;
      const page = new ExportResourcesPage(context, props);

      expect(page.exportFormatItems).toEqual(["kdbx (keepass)", "kdbx (keepassXC & others)"]);
    });

    it("As LU I should see all formats when CSV format is enabled", () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new ExportResourcesPage(context, props);

      expect(page.exportFormatItems).toEqual([
        "kdbx (keepass)",
        "kdbx (keepassXC & others)",
        "csv (keepass)",
        "csv (lastpass)",
        "csv (1password)",
        "csv (chromium based browsers)",
        "csv (bitwarden)",
        "csv (mozilla)",
        "csv (safari)",
        "csv (dashlane)",
        "csv (nordpass)",
        "csv (logmeonce)",
      ]);
    });

    it("As LU I should see the label 'kdbx is supported' when CSV format is disabled", () => {
      expect.assertions(1);
      const exportPoliciesSettingsContext = defaultExportPoliciesSettingsContext({
        getSettings: () => ExportPoliciesSettingsEntity.createFromDefault({ allow_csv_format: false }),
      });
      const props = defaultProps();
      props.exportPoliciesSettingsContext = exportPoliciesSettingsContext;
      const page = new ExportResourcesPage(context, props);

      expect(page.exportFormatLabel).toBe("Choose the export format (kdbx is supported)");
    });

    it("As LU I should see the label 'csv and kdbx are supported' when CSV format is enabled", () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new ExportResourcesPage(context, props);

      expect(page.exportFormatLabel).toBe("Choose the export format (csv and kdbx are supported)");
    });

    it("As LU I should see the form disabled while export policies settings are loading", () => {
      expect.assertions(2);
      const exportPoliciesSettingsContext = defaultExportPoliciesSettingsContext({
        getSettings: () => null,
      });
      const props = defaultProps();
      props.exportPoliciesSettingsContext = exportPoliciesSettingsContext;
      const page = new ExportResourcesPage(context, props);

      expect(page.select.className).toBe("selected-value disabled");
      expect(page.exportButton.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
