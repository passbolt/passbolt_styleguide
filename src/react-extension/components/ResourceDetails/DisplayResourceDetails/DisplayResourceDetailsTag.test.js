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
 * Unit tests on DisplayResourceDetailsTag in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps, resourceWithLastSharedTagMock,
  resourceWithNoTagMock,
  resourceWithTagMock, TagMock,
} from "./DisplayResourceDetailsTag.test.data";
import PasswordSidebarTagSectionPage from "./DisplayResourceDetailsTag.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";

beforeEach(() => {
  jest.resetModules();
});

describe("See tags", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const saveTagMockImpl = jest.fn((message, data) => Object.assign({id: resourceWithNoTagMock.id}, data));
  const tagSuggested = jest.fn(() => TagMock);

  describe('As LU I see the tags of my resources', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceWithTagMock}}};

    /**
     * Given a resource with 6 tags
     * Then I should see the 6 tags
     * And I should see the tags sorted alphabetically
     * And I should be able to see each tag name
     */

    beforeEach(() => {
      mockContextRequest(tagSuggested);
      page = new PasswordSidebarTagSectionPage(context, props);
    });

    it('I should see the 6 tags made on the resource', async() => {
      await page.title.click();

      expect(page.passwordSidebarTagSection.exists()).toBeTruthy();
      expect(page.tagItemViewer.count()).toBe(6);
    });

    it('I should be able to identify each tag name', async() => {
      await page.title.click();

      expect(page.tagItemViewer.name(1)).toBe('#gg');
      expect(page.tagItemViewer.name(2)).toBe('#test');
      expect(page.tagItemViewer.name(3)).toBe('dede');
      expect(page.tagItemViewer.name(4)).toBe('ok');
      expect(page.tagItemViewer.name(5)).toBe('test');
      expect(page.tagItemViewer.name(6)).toBe('There’s always something to look at if you open your eyes');
    });

    it('Start editing by clicking on the edit icon', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();
      expect(page.tagEditor.noticeMessage).toBeNull();
      expect(page.tagEditor.saveButton.textContent).toBe("Save");
      expect(page.tagEditor.cancelButton.textContent).toBe("Cancel");
    });

    it('Stop editing by clicking on the edit icon', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();

      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);
      expect(page.tagEditor.component).toBeNull();
    });

    it('Stop editing by clicking out of the edit zone', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();

      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.content);
      expect(page.tagEditor.component).toBeNull();
    });

    it('Stop editing by cancelling the operation', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();

      await page.passwordSidebarTagSection.click(page.tagEditor.cancelButton);
      expect(page.tagEditor.component).toBeNull();
    });

    it('Stop editing with keyboard', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();

      await page.passwordSidebarTagSection.escapeKeyDown(page.tagEditor.component);
      expect(page.tagEditor.component).toBeNull();
    });

    it('Cannot add a shared tag to a resource I don’t own', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "#test");
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      expect(page.tagEditor.count()).toBe(6);
      expect(page.tagEditor.errorMessage).toBe("This shared tag can't be added, you are not the owner");
    });

    it('Cannot add a tag already added to a resource', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "test");
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      expect(page.tagEditor.count()).toBe(6);
      expect(page.tagEditor.component.textContent).toBe("");
      expect(page.tagEditor.errorMessage).toBe("This tag is already present");
    });

    it('Remove a tag using the edit icon', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();
      expect(page.tagEditor.count()).toBe(6);
      await page.passwordSidebarTagSection.click(page.tagEditor.deleteTag);
      expect(page.tagEditor.count()).toBe(5);
    });

    it('Remove a tag using the keyboard', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.component).not.toBeNull();
      expect(page.tagEditor.count()).toBe(6);
      expect(page.tagEditor.component.textContent).toBe("");
      await page.passwordSidebarTagSection.backspaceKeyDown(page.tagEditor.component);
      expect(page.tagEditor.count()).toBe(5);
    });
  });

  describe('As LU I should see the tag section empty', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceWithNoTagMock}}};
    mockContextRequest(saveTagMockImpl);
    /**
     * Given a resource with 0 tags
     * Then I should see the tag section empty
     */

    beforeEach(() => {
      mockContextRequest(tagSuggested);
      page = new PasswordSidebarTagSectionPage(context, props);
    });

    it('See an empty message if the resource has no tags', async() => {
      await page.title.click();
      expect(page.tagItemViewer.isEmpty()).toBeTruthy();
    });

    it('Start editing by clicking on the empty message', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);
      expect(page.tagEditor.component).not.toBeNull();
      expect(page.tagEditor.noticeMessage.textContent).toBe("Pro tip: Tags starting with # are shared with all users who have access. Separate tags using commas.");
    });

    it('Add a new tag to a resource', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tardis");

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.passwordSidebarTagSection.click(page.tagEditor.saveButton);
      expect(page.tagEditor.component).toBeNull();
      const tagsDto = [{
        slug: "tardis",
        is_shared: false
      }];
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.update-resource-tags", resourceWithNoTagMock.id, tagsDto);
      // notification toaster called
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
    });

    it('Add multiple tags to a resource', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tardis");
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "vortex-manipulator");
      await page.passwordSidebarTagSection.commaKeyPressed(page.tagEditor.component);

      expect(page.tagEditor.count()).toBe(2);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.passwordSidebarTagSection.click(page.tagEditor.saveButton);
      expect(page.tagEditor.component).toBeNull();
      const tagsDto = [{
        slug: "tardis",
        is_shared: false
      }, {
        slug: "vortex-manipulator",
        is_shared: false
      }];
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.update-resource-tags", resourceWithNoTagMock.id, tagsDto);
      // notification toaster called
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
    });

    it('Cannot add a tag longer than 128 characters', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

      await page.passwordSidebarTagSection.click(page.tagEditor.saveButton);
      expect(page.tagEditor.errorMessage).toBe("This tag can't be added, the length cannot exceed 128");
    });

    it('Trim tag', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "   trim   ");
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      expect(page.tagEditor.component.textContent).toBe("");

      expect(page.tagEditor.count()).toBe(1);
      expect(page.tagEditor.name(1)).toBe("trim");
    });

    it('Cannot edit and Show progress feedback while submitting changes', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();

      let updateResolve;
      // Mock the request function to make it the expected result
      const waitSaveMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockContextRequest(waitSaveMockImpl);

      await page.passwordSidebarTagSection.clickWithoutWaitFor(page.tagEditor.saveButton);
      // API calls are made on submit, wait they are resolved.
      await page.passwordSidebarTagSection.waitForLoading(() => {
        expect(page.tagEditor.component).not.toBeNull();
        expect(page.tagEditor.component.getAttribute("contenteditable")).toBe("false");
        expect(page.tagEditor.saveButton.className).toBe("button primary tag-editor-submit processing disabled");
        expect(page.tagEditor.cancelButton.className).toBe("button cancel tag-editor-cancel disabled");
        updateResolve();
      });
    });

    it('Add suggested tag to a resource', async() => {
      await page.title.click();

      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);
      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tard");
      expect(page.tagEditor.autocompleteItem(1)).not.toBeNull();
      expect(page.tagEditor.autocompleteItemName(1).textContent).toBe(TagMock[1].slug);
      await page.passwordSidebarTagSection.click(page.tagEditor.autocompleteItemName(1));
      expect(page.tagEditor.component.textContent).toBe("");

      expect(page.tagEditor.count()).toBe(1);
      expect(page.tagEditor.name(1)).toBe(TagMock[1].slug);
    });

    it('Navigate with keyboard in the list of suggested tags', async() => {
      await page.title.click();

      const tagSuggested = jest.fn(() => TagMock);
      mockContextRequest(tagSuggested);

      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);
      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tar");
      expect(page.tagEditor.autocompleteContent).not.toBeNull();
      expect(page.tagEditor.autocompleteItemName(1).textContent).toBe(TagMock[1].slug);
      expect(page.tagEditor.autocompleteItemName(2).textContent).toBe(TagMock[2].slug);

      await page.passwordSidebarTagSection.downArrowKeyDown(page.tagEditor.autocompleteContent);
      expect(page.tagEditor.component.textContent).toBe("tar");
      await page.passwordSidebarTagSection.downArrowKeyDown(page.tagEditor.autocompleteContent);
      expect(page.tagEditor.component.textContent).toBe(TagMock[1].slug);
      await page.passwordSidebarTagSection.upArrowKeyDown(page.tagEditor.autocompleteContent);
      expect(page.tagEditor.component.textContent).toBe(TagMock[2].slug);
      await page.passwordSidebarTagSection.downArrowKeyDown(page.tagEditor.autocompleteContent);
      expect(page.tagEditor.component.textContent).toBe(TagMock[1].slug);

      await page.passwordSidebarTagSection.click(page.tagEditor.autocompleteItemName(1));
      expect(page.tagEditor.component.textContent).toBe("");

      expect(page.tagEditor.count()).toBe(1);
      expect(page.tagEditor.name(1)).toBe(TagMock[1].slug);
    });

    it('Close autocomplete with keyboard', async() => {
      await page.title.click();

      const tagSuggested = jest.fn(() => TagMock);
      mockContextRequest(tagSuggested);

      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);
      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tar");
      expect(page.tagEditor.autocompleteContent).not.toBeNull();
      expect(page.tagEditor.autocompleteItemName(1).textContent).toBe(TagMock[1].slug);
      expect(page.tagEditor.autocompleteItemName(2).textContent).toBe(TagMock[2].slug);

      await page.passwordSidebarTagSection.escapeKeyDown(page.tagEditor.component);
      expect(page.tagEditor.autocompleteContent).toBeNull();

      await page.passwordSidebarTagSection.escapeKeyDown(page.tagEditor.component);
      expect(page.tagEditor.component).toBeNull();
    });

    it('Save tags on keyboard enter', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tardis");

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      expect(page.tagEditor.component.textContent).toBe("");
      expect(page.tagEditor.count()).toBe(1);
      await page.passwordSidebarTagSection.enterKeyPressed(page.tagEditor.component);
      expect(page.tagEditor.component).toBeNull();
      const tagsDto = [{
        slug: "tardis",
        is_shared: false
      }];
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.update-resource-tags", resourceWithNoTagMock.id, tagsDto);
      // notification toaster called
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
    });

    it('As LU I should see an error message in the tag section when the API call fails', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.tagItemViewer.emptyMessage);

      expect(page.tagEditor.component).not.toBeNull();
      await page.passwordSidebarTagSection.input(page.tagEditor.component, "tardis");

      const saveErrorTagMockImpl = jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });
      mockContextRequest(saveErrorTagMockImpl);

      await page.passwordSidebarTagSection.click(page.tagEditor.saveButton);
      expect(page.tagEditor.errorMessage).toBe("Jest simulate API error.");
    });
  });

  describe('As LU I see a loading feedback in the section when the tags are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the tags section
     * And the tags are not loaded yet
     * Then I should see the loading message “Retrieving tags”
     */

    beforeEach(() => {
      page = new PasswordSidebarTagSectionPage(context, props);
    });

    it('I should see the loading message “Retrieving tags”', async() => {
      expect(page.tagItemViewer.isLoading()).toBeTruthy();
    });
  });

  describe('As LU I shouldn’t be able to deleting a shared tag', () => {
    const props = {resourceWorkspaceContext: {details: {resource: resourceWithLastSharedTagMock}}};
    /**
     * Given the tags section
     * Then I should’t be able to delete a shared tag
     * Then I should’t see the delete tag for a shared tag
     */

    beforeEach(() => {
      mockContextRequest(tagSuggested);
      page = new PasswordSidebarTagSectionPage(context, props);
    });

    it('Cannot remove shared tags on resources not owned', async() => {
      await page.title.click();
      await page.passwordSidebarTagSection.click(page.passwordSidebarTagSection.editIcon);

      expect(page.tagEditor.count()).toBe(3);
      await page.passwordSidebarTagSection.backspaceKeyDown(page.tagEditor.component);
      expect(page.tagEditor.count()).toBe(3);
      expect(page.tagEditor.errorMessage).toBe("This shared tag can't be deleted, you are not the owner");
    });
  });
});
