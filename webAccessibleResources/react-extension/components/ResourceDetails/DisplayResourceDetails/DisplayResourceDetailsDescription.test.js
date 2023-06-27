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
 * Unit tests on DisplayResourceDetailsDescription in regard of specifications
 */
import {
  defaultAppContext,
  resourceOnlyReadWithNoDescriptionMock,
  resourceOwnedWithNoDescriptionMock,
  resourceWithDescriptionMock,
} from "./DisplayResourceDetailsDescription.test.data";
import DisplayResourceDetailsDescriptionPage from "./DisplayResourceDetailsDescription.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";

beforeEach(() => {
  jest.resetModules();
});

describe("See description", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const saveDescriptionMockImpl = jest.fn((message, data) => data);

  describe('As LU I see the description of my resources', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceWithDescriptionMock}}};

    /**
     * Given a resource with description
     * Then I should see the description
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(context, props);
    });

    it('I should see the description of the resource', async() => {
      await page.title.click();

      expect(page.passwordSidebarDescriptionSection.exists()).toBeTruthy();
      expect(page.passwordSidebarDescriptionSection.description.textContent).toBe(resourceWithDescriptionMock.description);
    });

    it('Start editing by clicking on the edit icon', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();
      expect(page.descriptionEditor.descriptionInput.value).toBe(resourceWithDescriptionMock.description);
      expect(page.descriptionEditor.saveButton.textContent).toBe("Save");
      expect(page.descriptionEditor.cancelButton.textContent).toBe("Cancel");
    });

    it('Stop editing by clicking on the edit icon', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();

      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);
      expect(page.descriptionEditor.component).toBeNull();
    });

    it('Stop editing by clicking out of the edit zone', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();

      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.content);
      expect(page.descriptionEditor.component).toBeNull();
    });

    it('Stop editing by cancelling the operation', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();

      await page.passwordSidebarDescriptionSection.click(page.descriptionEditor.cancelButton);
      expect(page.descriptionEditor.component).toBeNull();
    });

    it('Stop editing with keyboard', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();

      await page.passwordSidebarDescriptionSection.escapeKeyDown(page.descriptionEditor.component);
      expect(page.descriptionEditor.component).toBeNull();
    });
  });

  describe('As LU I should see the description section empty', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceOwnedWithNoDescriptionMock}}};
    mockContextRequest(saveDescriptionMockImpl);
    /**
     * Given a resource owned with 0 description
     * Then I should see the description section empty
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(context, props);
    });

    it('See an empty message if the resource has no description', async() => {
      await page.title.click();
      expect(page.passwordSidebarDescriptionSection.emptyMessage.textContent).toBe("There is no description yet, click here to add one.");
    });

    it('Start editing by clicking on the empty message', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.emptyMessage);
      expect(page.descriptionEditor.component).not.toBeNull();
      expect(page.descriptionEditor.descriptionInput).not.toBeNull();
    });

    it('Add a new description to a resource', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.emptyMessage);

      expect(page.descriptionEditor.component).not.toBeNull();
      await page.passwordSidebarDescriptionSection.input(page.descriptionEditor.descriptionInput, "Updated description");

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.passwordSidebarDescriptionSection.click(page.descriptionEditor.saveButton);
      expect(page.descriptionEditor.component).toBeNull();
      const resourceDto = resourceOwnedWithNoDescriptionMock;
      resourceDto.description = "Updated description";
      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDto, null);
      // notification toaster called
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The description has been updated successfully");
    });

    it('Cannot edit and show progress feedback while submitting changes', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();

      let updateResolve;
      // Mock the request function to make it the expected result
      const waitSaveMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockContextRequest(waitSaveMockImpl);

      await page.passwordSidebarDescriptionSection.clickWithoutWaitFor(page.descriptionEditor.saveButton);
      // API calls are made on submit, wait they are resolved.
      await page.passwordSidebarDescriptionSection.waitForLoading(() => {
        expect(page.descriptionEditor.component).not.toBeNull();
        expect(page.descriptionEditor.descriptionInput.getAttribute("disabled")).not.toBeNull();
        expect(page.descriptionEditor.saveButton.className).toBe("primary description-editor-submit processing");
        expect(page.descriptionEditor.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.descriptionEditor.cancelButton.className).toBe("cancel");
        expect(page.descriptionEditor.cancelButton.hasAttribute("disabled")).toBeTruthy();
        updateResolve();
      });
    });

    it('As LU I should see an error message in the description section when the API call fails', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.editIcon);

      expect(page.descriptionEditor.component).not.toBeNull();
      await page.passwordSidebarDescriptionSection.input(page.descriptionEditor.descriptionInput, "Updated description");

      const saveErrorDescriptionMockImpl = jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });
      mockContextRequest(saveErrorDescriptionMockImpl);

      await page.passwordSidebarDescriptionSection.click(page.descriptionEditor.saveButton);
      expect(page.descriptionEditor.errorMessage).toBe("Jest simulate API error.");
    });
  });

  describe('As LU with a resource only readable I should see the description section empty', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceOnlyReadWithNoDescriptionMock}}};
    /**
     * Given a resource owned with 0 description
     * Then I should see the description section empty
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsDescriptionPage(context, props);
    });

    it('See an empty message if the resource has no description', async() => {
      await page.title.click();
      expect(page.passwordSidebarDescriptionSection.emptyMessage.textContent).toBe("There is no description.");
    });

    it('Cannot editing by clicking on edit icon or on description', async() => {
      await page.title.click();
      await page.passwordSidebarDescriptionSection.click(page.passwordSidebarDescriptionSection.emptyMessage);
      expect(page.descriptionEditor.component).toBeNull();
      expect(page.descriptionEditor.descriptionInput).toBeNull();
    });
  });
});
