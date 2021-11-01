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
import {defaultAppContext, defaultProps, defaultPropsWithNoError} from "./ImportResourcesResult.test.data";
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
      const props = defaultPropsWithNoError(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Import success!");

      expect(page.result(1)).toBe("10 passwords have been imported successfully.");
      expect(page.result(2)).toBe("5 folders have been imported successfully.");

      await page.acceptResult();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I see a success import result dialog with some errors', async() => {
      const props = defaultProps(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Something went wrong!");

      expect(page.result(1)).toBe("10 out of 12");
      expect(page.result(2)).toBe("5 out of 6");
      expect(page.errorMessage(1)).toBe("There was an issue while importing passwords:");
      expect(page.errorMessage(2)).toBe("There was an issue while importing folders:");
      await page.openErrorDetails();

      const errorDebugValue = "----------------------------\nResources errors\n----------------------------\n" +
        "[\n    {\n        \"name\": \"resource1\"\n    },\n    {\n        \"name\": \"resource2\"\n    }\n" +
        "]\n\n----------------------------\nFolder errors\n----------------------------\n[\n    {\n" +
        "        \"name\": \"folder1\"\n    }\n]";

      expect(page.errorDebug).toBe(errorDebugValue);
      await page.acceptResult();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can filter by tag', async() => {
      const props = defaultPropsWithNoError(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      await page.filterByReference();
      const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: {slug: "tag"}}};
      expect(props.history.push).toBeCalledWith({pathname: "/app/passwords", state: {filter}});
    });

    it('As LU I can filter by folder', async() => {
      const props = defaultProps(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      await page.filterByReference();
      expect(props.history.push).toBeCalledWith(`/app/folders/view/${props.resourceWorkspaceContext.resourceFileImportResult.references.folder.id}`);
    });

    it('As LU I can close the dialog', async() => {
      const props = defaultProps(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop to see the import result dialog with the keyboard (escape)', async() => {
      const props = defaultProps(); // The props to pass
      page = new ImportResourcesResultPage(context, props);
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
    });
  });
});
