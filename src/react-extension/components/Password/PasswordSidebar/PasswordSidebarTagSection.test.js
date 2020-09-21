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
import {fireEvent, render, waitFor} from "@testing-library/react";
import PasswordSidebarTagSection from "./PasswordSidebarTagSection";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";


beforeEach(() => {
  jest.resetModules();
});

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
        "slug": "dede",
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
        "slug": "#gallifrey",
        "is_shared": false
      },
      {
        "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
        "slug": "tardis",
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
    },
    "tags": []
  };
};

const getDummytags = function () {
  return [
    {
      "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
      "slug": "#gg",
      "is_shared": true
    },
    {
      "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
      "slug": "tardis",
      "is_shared": false
    },
    {
      "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
      "slug": "tarantino",
      "is_shared": false
    },
    {
      "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
      "slug": "ok",
      "is_shared": false
    }
  ];
};

const getAppContext = function (appContext) {
  const defaultAppContext = {

    port: new MockPort()
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderPasswordSidebarTagSection = function (appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <PasswordSidebarTagSection debug resource={props.resource} />
    </AppContext.Provider>
  );
};

describe("PasswordSidebarTag", () => {

  it("See the tags of a resource", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
    });

  });

  it("See an empty message if the resource has no tags", () => {
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no tag, click here to add one");

  });

  it("Cut long tags so they fit on one line in tag viewer", () => {
    // TODO Cut long tags so they fit on one line
  });

  it("See loading feedback in tag viewer", () => {
    const props = {
      resource: null
    };
    const {container} = renderPasswordSidebarTagSection(null, props);
    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const emptyContent = container.querySelector(".processing-text");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("Retrieving tags");

  });


  it("Start editing by clicking on the edit icon", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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

    // notice input tag not exists
    const noticeInputTag = container.querySelector(".message");
    expect(noticeInputTag).toBeNull();

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
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list empty content exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no tag, click here to add one");
    fireEvent.click(emptyContent, emptyContent);

    // Editor input tag exists
    const editorTag = container.querySelector(".tag-editor-input");
    expect(editorTag).not.toBeNull();

    // notice input tag exists
    const noticeInputTag = container.querySelector(".message");
    expect(noticeInputTag).not.toBeNull();
    expect(noticeInputTag.textContent).toBe("Pro tip: Tags starting with # are shared with all users who have access. Separate tags using commas.");

  });

  it("Stop editing by clicking on the edit icon", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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

  it("Add a new tag to a resource", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

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

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn((message, data) => Object.assign({id: props.resource.id}, data)));
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag not exists
    const editorTagInputDisable = container.querySelector(".tag-editor-input");
    expect(editorTagInputDisable).toBeNull();

    const onApiUpdateResourceTagMeta = {
      id: props.resource.id,
      tags: [
        {
          slug: tagValue,
          is_shared: false
        }
      ]
    };
    expect(context.port.request).toHaveBeenCalledWith("passbolt.resource.update-tags", onApiUpdateResourceTagMeta);
    // notification toaster called
    expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
  });

  it("Add multiple tags to a resource", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

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

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn((message, data) => Object.assign({id: props.resource.id}, data)));
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag not exists
    const editorTagInputDisable = container.querySelector(".tag-editor-input");
    expect(editorTagInputDisable).toBeNull();

    const onApiUpdateResourceTagMeta = {
      id: props.resource.id,
      tags: [
        {
          slug: tagValues[0],
          is_shared: false
        },
        {
          slug: tagValues[1],
          is_shared: false
        }
      ]
    };
    expect(context.port.request).toHaveBeenCalledWith("passbolt.resource.update-tags", onApiUpdateResourceTagMeta);
    // notification toaster called
    expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
  });

  it("Cannot edit while submitting changes", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

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
    expect(editorTagInput.textContent).toBe("");

    let updateResolve;

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => {
      return new Promise(resolve => {
        updateResolve = resolve;
      })
    }));

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);


    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      const editorTagInputDisable = container.querySelector(".tag-editor-input");
      expect(editorTagInputDisable).not.toBeNull();
      expect(editorTagInputDisable.getAttribute("contenteditable")).toBe("false");
      updateResolve();
    });

  });

  it("Show progress feedback while submitting", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

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
    expect(editorTagInput.textContent).toBe("");

    let updateResolve;

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => {
      return new Promise(resolve => {
        updateResolve = resolve;
      })
    }));

    // submit button input tag exists
    const submitButton = container.querySelector(".tag-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      // submit button input tag exists and processing
      const submitButtonProcessing = container.querySelector(".tag-editor-submit");
      expect(submitButtonProcessing).not.toBeNull();
      expect(submitButtonProcessing.className).toBe("button tag-editor-submit primary processing disabled");
      updateResolve();
    });
  });

  it("Cannot add a shared tag to a resource I don’t own", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
    expect(editorTagInput.textContent).toBe(tagValue);


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
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
    expect(editorTagInput.textContent).toBe(tagValue);


    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(0);

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This tag can't be added, the length cannot exceeds 128");

  });

  it("Cut long tags so they fit on one line in tag editor", () => {
    // TODO Cut long tags so they fit on one line
  });

  it("Trim tag", () => {
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
    tags.forEach(function (value) {
      expect(value.textContent).toBe("trim");
    });

  });

  it("Remove a tag using the edit icon", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
    });
    // delete a tag
    const deleteIcon = container.querySelector(".tag-delete");
    fireEvent.click(deleteIcon, leftClick);

    // number of tags and check all name displayed except the one deleted
    const tagsWithOneElementDeleted = container.querySelectorAll(".tag");
    expect(tagsWithOneElementDeleted).not.toBeNull();
    expect(tagsWithOneElementDeleted.length).toBe(5);
    tagsWithOneElementDeleted.forEach(function (value, index) {
      if (index > 1) {
        expect(value.textContent).toBe(props.resource.tags[index + 1].slug);
      } else {
        expect(value.textContent).toBe(props.resource.tags[index].slug);
      }
    });

  });

  it("Remove a tag using the keyboard", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
    });

  });

  it("Cannot remove shared tags on resources not owned", () => {
    const props = {
      resource: getDummyResourceWithLastSharedTagNotOwned()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
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
      expect(value.textContent).toBe(props.resource.tags[index].slug);
    });

    // error message exists
    const errorInputTag = container.querySelector(".error");
    expect(errorInputTag).not.toBeNull();
    expect(errorInputTag.textContent).toBe("This shared tag can't be deleted, you are not the owner");

  });

  it("Hide tag delete icon for resources not owned", () => {
    const props = {
      resource: getDummyResourceWithLastSharedTagNotOwned()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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

  it("Add suggested tag to a resource", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => getDummytags()));

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "tard";
    expect(editorTagInput).not.toBeNull();
    fireEvent.input(editorTagInput, {target: {textContent: tagValue}});

    // autocompleteItem exists
    const autocompleteItem = container.querySelector(".autocomplete-item");
    expect(autocompleteItem).not.toBeNull();
    const autocompleteItemValue = "tardis"
    expect(autocompleteItem.textContent).toBe(autocompleteItemValue);
    // add it to the editor
    const autocompleteItemName = container.querySelector(".name");
    expect(autocompleteItemName).not.toBeNull();
    fireEvent.click(autocompleteItemName, leftClick);
    // input tag must be empty
    expect(editorTagInput.textContent).toBe("");

    // number of tags and check the new one is displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(1);

    tags.forEach(function (value) {
      expect(value.textContent).toBe(autocompleteItemValue);
    });

  });

  it("Navigate with keyboard in the list of suggested tags", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => getDummytags()));

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "tar";
    expect(editorTagInput).not.toBeNull();
    fireEvent.input(editorTagInput, {target: {textContent: tagValue}});
    expect(editorTagInput.textContent).toBe(tagValue);

    // autocomplete exists
    const autocomplete = container.querySelector(".autocomplete-content");
    expect(autocomplete).not.toBeNull();
    const enterUpArrowPressed = {keyCode: 38};
    const enterDownArrowPressed = {keyCode: 40};

    const autocompleteItems = container.querySelectorAll(".autocomplete-item");
    expect(autocompleteItems).not.toBeNull();
    const autocompleteItemsValues = ["tardis", "tarantino"]
    autocompleteItems.forEach(function (value, index) {
      expect(value.textContent).toBe(autocompleteItemsValues[index]);
    });

    fireEvent.keyDown(autocomplete, enterDownArrowPressed);
    expect(editorTagInput.textContent).toBe(tagValue);
    fireEvent.keyDown(autocomplete, enterDownArrowPressed);
    expect(editorTagInput.textContent).toBe(autocompleteItemsValues[0]);
    fireEvent.keyDown(autocomplete, enterUpArrowPressed);
    expect(editorTagInput.textContent).toBe(autocompleteItemsValues[1]);
    fireEvent.keyDown(autocomplete, enterDownArrowPressed);
    expect(editorTagInput.textContent).toBe(autocompleteItemsValues[0]);

    // select tardis item
    const enterKeyPressed = {keyCode: 13};
    fireEvent.keyPress(editorTagInput, enterKeyPressed);

    // number of tags and check the new one is displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(1);

    tags.forEach(function (value) {
      expect(value.textContent).toBe(autocompleteItemsValues[0]);
    });

    // input tag must be empty
    expect(editorTagInput.textContent).toBe("");
  });

  it("Cut long tags autocomplete", async () => {
    // TODO Cut long tags
  });

  it("Stop editing by cancelling the operation", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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

    // Cancel button exists
    const cancelButton = container.querySelector(".cancel");
    expect(cancelButton).not.toBeNull();
    fireEvent.click(cancelButton, leftClick);

    // Editor input tag not exists
    const editorTagClose = container.querySelector(".tag-editor-input");
    expect(editorTagClose).toBeNull();

  });

  it("Stop editing with keyboard", () => {
    const props = {
      resource: getDummyResource()
    };
    const {container} = renderPasswordSidebarTagSection(null, props);

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

    // Escape keypressed event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(editorTag, escapeKeyDown);

    // Editor input tag not exists
    const editorTagClose = container.querySelector(".tag-editor-input");
    expect(editorTagClose).toBeNull();

  });

  it("Close autocomplete with keyboard", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => getDummytags()));

    // Edit icon exists
    const editIcon = container.querySelector(".edit_tags_button");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag exists
    const editorTagInput = container.querySelector(".tag-editor-input");
    const tagValue = "tar";
    expect(editorTagInput).not.toBeNull();
    fireEvent.input(editorTagInput, {target: {textContent: tagValue}});
    expect(editorTagInput.textContent).toBe(tagValue);

    // autocomplete exists
    const autocomplete = container.querySelector(".autocomplete-content");
    expect(autocomplete).not.toBeNull();

    const autocompleteItems = container.querySelectorAll(".autocomplete-item");
    expect(autocompleteItems).not.toBeNull();
    const autocompleteItemsValues = ["tardis", "tarantino"]
    autocompleteItems.forEach(function (value, index) {
      expect(value.textContent).toBe(autocompleteItemsValues[index]);
    });

    // Escape keypressed event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(editorTagInput, escapeKeyDown);

    const autocompleteClose = container.querySelector(".autocomplete-suggestions");
    expect(autocompleteClose).toBeNull();


    fireEvent.keyDown(editorTagInput, escapeKeyDown);
    // Editor input tag not exists
    const editorTagClose = container.querySelector(".tag-editor-input");
    expect(editorTagClose).toBeNull();

  });

  it("Save tags on keyboard enter", async () => {
    const context = getAppContext();
    const props = {
      resource: getDummyResourceEmptyTag()
    };
    const {container} = renderPasswordSidebarTagSection(context, props);

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
    const enterKeyPressed = {keyCode: 13};
    expect(editorTagInput).not.toBeNull();
    fireEvent.change(editorTagInput, {target: {textContent: tagValue}});
    fireEvent.keyPress(editorTagInput, enterKeyPressed);
    expect(editorTagInput.textContent).toBe("");

    // number of tags and check all name displayed
    const tags = container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(1);
    tags.forEach(function (value) {
      expect(value.textContent).toBe(tagValue);
    });

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn((message, data) => Object.assign({id: props.resource.id}, data)));
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // submit with key enter
    fireEvent.keyPress(editorTagInput, enterKeyPressed);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
    });

    // Editor input tag not exists
    const editorTagInputDisable = container.querySelector(".tag-editor-input");
    expect(editorTagInputDisable).toBeNull();

    const onApiUpdateResourceTagMeta = {
      id: props.resource.id,
      tags: [
        {
          slug: tagValue,
          is_shared: false
        }
      ]
    };
    expect(context.port.request).toHaveBeenCalledWith("passbolt.resource.update-tags", onApiUpdateResourceTagMeta);
    // notification toaster called
    expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The tags have been updated successfully");
  });

});
