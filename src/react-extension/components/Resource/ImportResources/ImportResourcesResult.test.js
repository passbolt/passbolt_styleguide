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
 * Unit tests on PasswordImportResultDialog in regard of specifications
 */
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultProps, defaultPropsWithNoError} from "./ImportResourcesResult.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import ImportResourcesResultPage from "./ImportResourcesResult.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the password import result dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I can see the import result', () => {
    /**
     * I should see the password import result dialog
     */
    it('As LU I see a success import result dialog with no errors', async() => {
      expect.assertions(8);
      const props = defaultPropsWithNoError(); // The props to pass
      page = new ImportResourcesResultPage(context, props);

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Import summary");
      expect(page.hasResourcesSection).toBeTruthy();
      expect(page.hasFoldersSection).toBeTruthy();
      expect(page.hasWarningsResourcesSection).toBeFalsy();
      expect(page.hasErrorsResourcesSection).toBeFalsy();
      expect(page.hasErrorsFoldersSection).toBeFalsy();

      await page.acceptResult();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I see the import result dialog with warnings and errors', async() => {
      expect.assertions(8);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Import summary");
      expect(page.hasResourcesSection).toBeTruthy();
      expect(page.hasFoldersSection).toBeTruthy();
      expect(page.hasWarningsResourcesSection).toBeTruthy();
      expect(page.hasErrorsResourcesSection).toBeTruthy();
      expect(page.hasErrorsFoldersSection).toBeTruthy();

      await page.acceptResult();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can open and see warnings resources details', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);

      expect(page.hasWarningsResourcesSection).toBeTruthy();

      await page.openWarningResourcesDetails();

      const expectedWarningDebug = "----------------------------\nResources warnings\n----------------------------\n" +
        "[\n    {\n        \"name\": \"resource1\"\n    },\n    {\n        \"name\": \"resource2\"\n    }\n]";

      expect(page.warningResourcesDebug).toBe(expectedWarningDebug);
    });

    it('As LU I can open and see errors resources details', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);

      expect(page.hasErrorsResourcesSection).toBeTruthy();

      await page.openErrorResourcesDetails();

      const expectedErrorDebug = "----------------------------\nResources errors\n----------------------------\n" +
        "[\n    {\n        \"name\": \"resource1\"\n    },\n    {\n        \"name\": \"resource2\"\n    }\n]";

      expect(page.errorResourcesDebug).toBe(expectedErrorDebug);
    });

    it('As LU I can open and see errors folders details', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);

      expect(page.hasErrorsFoldersSection).toBeTruthy();

      await page.openErrorFoldersDetails();

      const expectedFolderErrorDebug = "----------------------------\nFolder errors\n----------------------------\n" +
        "[\n    {\n        \"name\": \"folder1\"\n    }\n]";

      expect(page.errorFoldersDebug).toBe(expectedFolderErrorDebug);
    });

    it('As LU I can filter by tag', async() => {
      expect.assertions(1);
      const props = defaultPropsWithNoError();
      page = new ImportResourcesResultPage(context, props);
      await page.filterByReference();
      const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: {slug: "tag"}}};
      expect(props.history.push).toBeCalledWith({pathname: "/app/passwords", state: {filter}});
    });

    it('As LU I can filter by folder', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);
      await page.filterByReference();
      expect(props.history.push).toBeCalledWith(`/app/folders/view/${props.resourceWorkspaceContext.resourceFileImportResult.references.folder.id}`);
    });

    it('As LU I can close the dialog', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop to see the import result dialog with the keyboard (escape)', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new ImportResourcesResultPage(context, props);
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
    });
  });
});
