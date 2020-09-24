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
 * Unit tests on password sidebar description section in regard of specifications
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import PasswordSidebarDescriptionSection from "./PasswordSidebarDescriptionSection";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  jest.resetModules();
});

const getDummyDescription = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "description": "Apache is the world's most used web server software.",
    "permission": {
      "type": 7
    }
  };
};

const getDummyDescriptionEmpty = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "description": "",
    "permission": {
      "type": 1
    }
  };
};

const getDummyDescriptionEmptyWithPermissionUpdate = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "description": "",
    "permission": {
      type: 15
    }
  };
};

const getAppContext = function(appContext) {
  const defaultAppContext = {
    port: new MockPort()
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderPasswordSidebarDescriptionSection = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <PasswordSidebarDescriptionSection debug {...props}/>
    </AppContext.Provider>
  );
};

describe("PasswordSidebarDescription", () => {
  it("See the description of a resource", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescription()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Description exists
    const description = container.querySelector(".description_content");
    expect(description).not.toBeNull();
    expect(description.textContent).toBe(props.resourceWorkspaceContext.details.resource.description);
  });

  it("See an empty message if the resource has no description", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmpty()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no description");
  });

  it("See an empty message if the resource has no description", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no description yet, click here to add one");
  });

  it("Start editing by clicking on the edit icon", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescription()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // description content not exists
    const descriptionContent = container.querySelector(".description_content");
    expect(descriptionContent).toBeNull();

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).not.toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe(props.resourceWorkspaceContext.details.resource.description);

    // submit button exists
    const submitButton = container.querySelector(".description-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");

    // cancel button exists
    const cancelButton = container.querySelector(".cancel");
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.textContent).toBe("cancel");
  });

  it("Start editing by clicking on the empty message", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    fireEvent.click(emptyContent, leftClick);

    // empty description exists
    const emptyContentHide = container.querySelector(".empty-content");
    expect(emptyContentHide).toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe("");
  });

  it("Cannot editing by clicking on edit icon or on descriptio", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmpty()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).toBeNull();

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    fireEvent.click(emptyContent, leftClick);

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).toBeNull();
  });

  it("Stop editing by clicking on the edit icon", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).not.toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe(props.resourceWorkspaceContext.details.resource.description);

    fireEvent.click(editIcon, leftClick);
    const editorDescriptionClosed = container.querySelector(".form-content");
    expect(editorDescriptionClosed).toBeNull();
  });

  it("Stop editing by clicking out of the edit zone", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescription()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).not.toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe(props.resourceWorkspaceContext.details.resource.description);

    const accordionContent = container.querySelector(".accordion-content");
    fireEvent.click(accordionContent, leftClick);

    const editorDescriptionClosed = container.querySelector(".form-content");
    expect(editorDescriptionClosed).toBeNull();
  });

  it("Stop editing by cancelling the operation", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescription()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).not.toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe(props.resourceWorkspaceContext.details.resource.description);

    // cancel button exists
    const cancelButton = container.querySelector(".cancel");
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.textContent).toBe("cancel");
    fireEvent.click(cancelButton, leftClick);

    const editorDescriptionClosed = container.querySelector(".form-content");
    expect(editorDescriptionClosed).toBeNull();
  });

  it("Stop editing with the keyboard escape", () => {
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescription()}}};
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Edit icon exists
    const editIcon = container.querySelector(".section-action");
    expect(editIcon).not.toBeNull();
    fireEvent.click(editIcon, leftClick);

    // Editor input description exists
    const editorDescription = container.querySelector(".form-content");
    expect(editorDescription).not.toBeNull();

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe(props.resourceWorkspaceContext.details.resource.description);

    // Escape keypressed event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(textearea, escapeKeyDown);

    const editorDescriptionClosed = container.querySelector(".form-content");
    expect(editorDescriptionClosed).toBeNull();
  });

  it("Update the description to a resource", async() => {
    const context = getAppContext();
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(context, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    fireEvent.click(emptyContent, leftClick);

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe("");
    const descriptionValue = "Apache is the world's most used web server software.";
    fireEvent.change(textearea, {target: {value: descriptionValue}});

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn((message, data) => Object.assign({id: props.resourceWorkspaceContext.details.resource.id}, data)));
    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // submit button exists
    const submitButton = container.querySelector(".description-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {});

    // Editor description not exists
    const editorDescriptionInputDisable = container.querySelector(".form-content");
    expect(editorDescriptionInputDisable).toBeNull();

    const onApiUpdateResourceDescriptionMeta = {
      id: props.resourceWorkspaceContext.details.resource.id,
      description: descriptionValue
    };
    expect(context.port.request).toHaveBeenCalledWith("passbolt.resource.update-description", onApiUpdateResourceDescriptionMeta);
    expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
  });

  it("Cannot edit while submitting changes", async() => {
    const context = getAppContext();
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(context, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    fireEvent.click(emptyContent, leftClick);

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe("");
    const descriptionValue = "Apache is the world's most used web server software.";
    fireEvent.change(textearea, {target: {value: descriptionValue}});

    let updateResolve;

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => new Promise(resolve => {
      updateResolve = resolve;
    })));

    // submit button exists
    const submitButton = container.querySelector(".description-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      const editorDescriptionInputDisable = container.querySelector(".fluid");
      expect(editorDescriptionInputDisable).not.toBeNull();
      expect(editorDescriptionInputDisable.getAttribute("disabled")).not.toBeNull();
      updateResolve();
    });
  });

  it("Show progress feedback while submitting", async() => {
    const context = getAppContext();
    const props = {resourceWorkspaceContext: {details: {resource: getDummyDescriptionEmptyWithPermissionUpdate()}}};
    const {container} = renderPasswordSidebarDescriptionSection(context, props);

    // Sidebar Description title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand Description
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // empty description exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    fireEvent.click(emptyContent, leftClick);

    // Textearea exists
    const textearea = container.querySelector(".fluid");
    expect(textearea).not.toBeNull();
    expect(textearea.value).toBe("");
    const descriptionValue = "Apache is the world's most used web server software.";
    fireEvent.change(textearea, {target: {value: descriptionValue}});

    let updateResolve;

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => new Promise(resolve => {
      updateResolve = resolve;
    })));

    // submit button exists
    const submitButton = container.querySelector(".description-editor-submit");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("save");
    fireEvent.click(submitButton, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      // submit button exists and processing
      const submitButtonProcessing = container.querySelector(".description-editor-submit");
      expect(submitButtonProcessing).not.toBeNull();
      expect(submitButtonProcessing.className).toBe("button description-editor-submit primary processing");
      updateResolve();
    });
  });
});
