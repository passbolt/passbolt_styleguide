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

import React from "react";
import {fireEvent, render} from "@testing-library/react";
import AppContext from "../../../../contexts/AppContext";
import PasswordSidebarTagSection from "./PasswordSidebarTagSection";

beforeEach(() => {
  jest.resetModules();
  // mockPort();
});

// const mockPort = function() {
//   const mockedOnCallbacks = {};
//   const port = {
//     emit: jest.fn(),
//     fireAddonMessage: function(message) {
//       const callback =mockedOnCallbacks[message];
//       if (callback) {
//         const callbackArgs = Array.prototype.slice.call(arguments, 1);
//         callback.apply(null, callbackArgs);
//       }
//     },
//     on: (message, callback) => {
//       mockedOnCallbacks[message] = callback;
//     },
//     request: jest.fn()
//   };
//   Port.set(port);
// };

const getDummyResource = function () {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http://www.apache.org/",
    "description": "Apache is the world's most used web server software.",
    "deleted": false,
    "created": "2019-12-05T13:38:43+00:00",
    "modified": "2019-12-06T13:38:43+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "permission": {
      type: 10
    },
    "tags": [
      {
        "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
        "slug": "#gg",
        "is_shared": true
      },
      {
        "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
        "slug": "#test",
        "is_shared": true
      },
      {
        "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
        "slug": "tardis",
        "is_shared": false
      },
      {
        "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
        "slug": "ok",
        "is_shared": false
      },
      {
        "id": "f3ad54ab-54c1-457c-8f18-7c40dc4a37d9",
        "slug": "test",
        "is_shared": false
      },
      {
        "id": "5c6bb083-a499-40ff-a639-6593c87a24bd",
        "slug": "There’s always something to look at if you open your eyes",
        "is_shared": false
      }
    ]
  };
};

const getDummyResourceWithLastSharedTagNotOwned = function () {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http://www.apache.org/",
    "description": "Apache is the world's most used web server software.",
    "deleted": false,
    "created": "2019-12-05T13:38:43+00:00",
    "modified": "2019-12-06T13:38:43+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "permission": {
      type: 10
    },
    "tags": [
      {
        "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
        "slug": "#test",
        "is_shared": true
      },
      {
        "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
        "slug": "tardis",
        "is_shared": false
      },
      {
        "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
        "slug": "#gallifrey",
        "is_shared": true
      }
    ]
  };
};

const getDummyResourceEmptyTag = function () {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http://www.apache.org/",
    "description": "Apache is the world's most used web server software.",
    "deleted": false,
    "created": "2019-12-05T13:38:43+00:00",
    "modified": "2019-12-06T13:38:43+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "permission": {
      type: 15
    }
  };
};

describe("PasswordSidebarTag", () => {
  const resource = getDummyResource();
  const resourceLastSharedTagNotOwned = getDummyResourceWithLastSharedTagNotOwned();
  const resourceEmptyTag = getDummyResourceEmptyTag();

  const getAppContext = function (appContext) {
    const defaultAppContext = {
      user: {
        // "user.settings.securityToken.code": "TST",
        // "user.settings.securityToken.textColor": "#FFFFFF",
        // "user.settings.securityToken.color": "#000000"
      }
    };

    return Object.assign(defaultAppContext, appContext || {});
  };

  const renderPasswordSidebarTagSection = function (resource, appContext) {
    appContext = getAppContext(appContext);
    return render(
      <AppContext.Provider value={appContext}>
        <PasswordSidebarTagSection debug resource={resource}/>
      </AppContext.Provider>
    );
  };

  it("See the tags of a resource", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const tagList = container.querySelector(".tags-list");
    expect(tagList).not.toBeNull();

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);
    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(resource.tags[index].slug);
    });

  });

  it("See an empty message if the resource has no tags", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list empty content exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no tag, click edit to add one");

  });

  it("Cut long tags so they fit on one line", () => {
    // TODO Cut long tags so they fit on one line
  });

  it("Start editing by clicking on the edit icon", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTag = container.querySelector(".tag-editor-input");
    expect(editorTag).not.toBeNull();

    // notice input tag exists
    const noticeInputTag = container.querySelector(".message");
    expect(noticeInputTag).not.toBeNull();
    expect(noticeInputTag.textContent).toBe("Pro tip: Tags starting with # are shared with all users who have access. Separate tags using commas.");

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");

    // cancel button input tag exists
    const cancelButton = container.querySelector(".tag-editor-cancel");
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.textContent).toBe("cancel");

  });

  it("Start editing by clicking on the empty message", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list empty content exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no tag, click edit to add one");
    fireEvent.click(emptyContent, emptyContent);

    // Editor input tag exists
    const editorTag = container.querySelector(".tag-editor-input");
    expect(editorTag).not.toBeNull();

  });

  it("Stop editing by clicking on the edit icon", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTag = container.querySelector(".tag-editor-input");
    expect(editorTag).not.toBeNull();

    fireEvent.click(editIcon, leftClick);

    // Editor input tag not exists
    const editorTagClose = container.querySelector(".tag-editor-input");
    expect(editorTagClose).toBeNull();

  });

  it("Stop editing by clicking out of the edit zone", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTag = container.querySelector(".tag-editor-input");
    expect(editorTag).not.toBeNull();

    const accordionContent = container.querySelector(".accordion-content");
    fireEvent.click(accordionContent, leftClick);

    // Editor input tag not exists
    const editorTagClose = container.querySelector(".tag-editor-input");
    expect(editorTagClose).toBeNull();

  });

  it("Add a new tag to a resource", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "tardis";
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    // TODO event to emit tag with submit button
    //fireEvent.click(submitButton, leftClick);

    // TODO test to see the new tag
  });

  it("Add multiple tags to a resource", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValues = ["tardis", "vortex-manipulator"];
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValues[0]}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");

    const commaKeyPressed = {charCode: 44};
    fireEvent.change(editorTagInput, {target: {textContent: tagValues[1]}});
    fireEvent.keyPress(editorTagInput, commaKeyPressed);
    expect(editorTagInput.textContent).toBe("");

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(2);
    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(tagValues[index]);
    });

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    // TODO event to emit tag with submit button
    //fireEvent.click(submitButton, leftClick);

    // TODO test to see the new tag
  });

  it("Cannot edit while submitting changes", () => {
    // TODO event to emit tag with submit button
    // TODO Cannot edit while submitting changes
  });

  it("Show progress feedback while submitting", () => {
    // TODO event to emit tag with submit button
    // TODO Show progress feedback while submitting
  });

  it("Cannot add a shared tag to a resource I don’t own", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "#test";
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");


    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This shared tag can't be added, you are not the owner");

  });

  it("Cannot add a tag already added to a resource", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "test";
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");


    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This tag is already present");

  });

  it("Cannot add a tag longer than 128 characters", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");


    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(0);

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This tag can't be added, the length cannot exceeds 128");

  });

  it("Cut long tags so they fit on one line", () => {
    // TODO Cut long tags so they fit on one line
  });

  it("Trim tag", () => {
    const {container} = renderPasswordSidebarTagSection(resourceEmptyTag);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "   trim   ";
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");


    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(1);
    tags.forEach(function (value, index) {
      expect(value.textContent).toBe("trim");
    });

  });

  it("Remove a tag using the edit icon", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    expect(editorTagInput).not.toBeNull();

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);

    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(resource.tags[index].slug);
    });
    // delete a tag
    const deleteIcon = container.querySelector(".tag-delete");
    fireEvent.click(deleteIcon, leftClick);

    // number of tags and check all name displayed except the one deleted
    const tagsWithOneElementDeleted = container.querySelectorAll(".tag");
    expect(tagsWithOneElementDeleted).not.toBeNull();
    expect(tagsWithOneElementDeleted.length).toBe(5);
    tagsWithOneElementDeleted.forEach(function (value, index) {
      if(index > 1) {
        expect(value.textContent).toBe(resource.tags[index+1].slug);
      } else {
        expect(value.textContent).toBe(resource.tags[index].slug);
      }
    });

  });

  it("Remove a tag using the keyboard", () => {
    const {container} = renderPasswordSidebarTagSection(resource);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    expect(editorTagInput).not.toBeNull();

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);

    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(resource.tags[index].slug);
    });
    // delete a tag
    const backspaceKeyDown = {keyCode: 8};
    expect(editorTagInput.textContent).toBe("");
    fireEvent.keyDown(editorTagInput, backspaceKeyDown);

    // number of tags and check all name displayed except the one deleted
    const tagsWithOneElementDeleted = container.querySelectorAll(".tag");
    expect(tagsWithOneElementDeleted).not.toBeNull();
    expect(tagsWithOneElementDeleted.length).toBe(5);
    tagsWithOneElementDeleted.forEach(function (value, index) {
        expect(value.textContent).toBe(resource.tags[index].slug);
    });

  });

  it("Cannot remove shared tags on resources not owned", () => {
    const {container} = renderPasswordSidebarTagSection(resourceLastSharedTagNotOwned);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    expect(editorTagInput).not.toBeNull();

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(3);

    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(resourceLastSharedTagNotOwned.tags[index].slug);
    });
    // try to delete a tag
    const backspaceKeyDown = {keyCode: 8};
    expect(editorTagInput.textContent).toBe("");
    fireEvent.keyDown(editorTagInput, backspaceKeyDown);

    // number of tags and check all name displayed
    const tagsWithOneElementDeleted = container.querySelectorAll(".tag");
    expect(tagsWithOneElementDeleted).not.toBeNull();
    expect(tagsWithOneElementDeleted.length).toBe(3);
    tagsWithOneElementDeleted.forEach(function (value, index) {
      expect(value.textContent).toBe(resourceLastSharedTagNotOwned.tags[index].slug);
    });

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This shared tag can't be deleted, you are not the owner");

  });

  it("Hide tag delete icon for resources not owned", () => {
    const {container} = renderPasswordSidebarTagSection(resourceLastSharedTagNotOwned);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    expect(editorTagInput).not.toBeNull();

    // number of close icon (only the personal tag)
    const closeIcon = container.querySelectorAll(".tag-delete");
    expect(closeIcon).not.toBeNull();
    expect(closeIcon.length).toBe(1);

  });

});
