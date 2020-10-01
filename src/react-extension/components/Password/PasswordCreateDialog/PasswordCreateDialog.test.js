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
import {render, fireEvent, waitFor} from "@testing-library/react";
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import AppContext from "../../../contexts/AppContext";
import PasswordCreateDialog from "./PasswordCreateDialog";
import PassboltApiFetchError from "../../../lib/Common/Error/PassboltApiFetchError";
import UserSettings from "../../../lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockPort from "../../../test/mock/MockPort";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DialogContextProvider from "../../../contexts/Common/DialogContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";

beforeEach(() => {
  jest.resetModules();
});

const getAppContext = function(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    resourceCreateDialogProps: {
      folderParentId: null
    },
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderPasswordCreateDialog = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <DialogContextProvider>
        <ManageDialogs/>
        <PasswordCreateDialog debug onClose={props.onClose || jest.fn()} />
      </DialogContextProvider>
    </AppContext.Provider>
  );
};

describe("PasswordCreateDialog", () => {
  it("matches the styleguide.", () => {
    const {container} = renderPasswordCreateDialog();

    // Dialog title exists and correct
    const dialogTitle = container.querySelector(".dialog-header h2");
    expect(dialogTitle).not.toBeNull();
    expect(dialogTitle.textContent).toBe("Create a password");

    // Close button exists
    const closeButton = container.querySelector(".dialog-close");
    expect(closeButton).not.toBeNull();

    // Name input field exists.
    const nameInput = container.querySelector("[name=\"name\"]");
    expect(nameInput).not.toBeNull();
    expect(nameInput.value.trim()).toBe("");

    // Uri input field exists
    const uriInput = container.querySelector("[name=\"uri\"]");
    expect(uriInput).not.toBeNull();
    expect(uriInput.value.trim()).toBe("");

    // Username input field exists
    const usernameInput = container.querySelector("[name=\"username\"]");
    expect(usernameInput).not.toBeNull();
    expect(usernameInput.value.trim()).toBe("");

    // Password input field exists
    const passwordInput = container.querySelector("[name=\"password\"]");
    const passwordInputType = passwordInput.getAttribute("type");
    expect(passwordInput).not.toBeNull();
    expect(passwordInput.value.trim()).toBe("");
    expect(passwordInputType).toBe("password");
    const passwordInputStyle = window.getComputedStyle(passwordInput);
    expect(passwordInputStyle.background).toBe("white");
    expect(passwordInputStyle.color).toBe("");

    // Complexity label exists but is not yet defined.
    const complexityLabel = container.querySelector(".complexity-text");
    expect(complexityLabel.textContent).toBe("complexity: n/a");

    // Security token element exists.
    const securityTokenElement = container.querySelector(".security-token");
    expect(securityTokenElement).not.toBeNull();
    expect(securityTokenElement.textContent).toBe("TST");
    // And the default style is applied.
    const securityTokenStyle = window.getComputedStyle(securityTokenElement);
    expect(securityTokenStyle.background).toBe("rgb(0, 0, 0)");
    expect(securityTokenStyle.color).toBe("rgb(255, 255, 255)");

    // Password view button exists.
    const passwordViewButton = container.querySelector(".password-view.button");
    expect(passwordViewButton).not.toBeNull();
    expect(passwordViewButton.classList.contains("selected")).toBe(false);

    // Password generate button exists.
    const passwordGenerateButton = container.querySelector(".password-generate.button");
    expect(passwordGenerateButton).not.toBeNull();

    // Description textarea field exists
    const descriptionTextArea = container.querySelector("[name=\"description\"]");
    expect(descriptionTextArea).not.toBeNull();
    expect(descriptionTextArea.value.trim()).toBe("");

    // Create button exists
    const createButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    expect(createButton).not.toBeNull();

    // Cancel button exists
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    expect(cancelButton).not.toBeNull();
  });

  it("calls onClose props when clicking on the close button.", () => {
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordCreateDialog(null, props);

    const leftClick = {button: 0};
    const dialogCloseIcon = container.querySelector(".dialog-close");
    fireEvent.click(dialogCloseIcon, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("calls onClose props when clicking on the cancel button.", () => {
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordCreateDialog(null, props);

    const leftClick = {button: 0};
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    fireEvent.click(cancelButton, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("changes the style of its security token when the password input get or lose focus.", () => {
    const {container} = renderPasswordCreateDialog();

    const passwordInput = container.querySelector("[name=\"password\"]");
    const securityTokenElement = container.querySelector(".security-token");

    /*
     * Password input got focus.
     * Assert style change.
     */
    fireEvent.focus(passwordInput);
    let securityTokenStyle = window.getComputedStyle(securityTokenElement);
    let passwordInputStyle = window.getComputedStyle(passwordInput);
    expect(passwordInputStyle.background).toBe("rgb(0, 0, 0)");
    expect(passwordInputStyle.color).toBe("rgb(255, 255, 255)");
    expect(securityTokenStyle.background).toBe("rgb(255, 255, 255)");
    expect(securityTokenStyle.color).toBe("rgb(0, 0, 0)");

    /*
     * Password input lost focus.
     * Assert style
     */
    fireEvent.blur(passwordInput);
    securityTokenStyle = window.getComputedStyle(securityTokenElement);
    passwordInputStyle = window.getComputedStyle(passwordInput);
    expect(passwordInputStyle.background).toBe("white");
    expect(passwordInputStyle.color).toBe("");
    expect(securityTokenStyle.background).toBe("rgb(0, 0, 0)");
    expect(securityTokenStyle.color).toBe("rgb(255, 255, 255)");
  });

  it("generates password when clicking on the generate button.", () => {
    const {container} = renderPasswordCreateDialog();

    const leftClick = {button: 0};
    const passwordInput = container.querySelector("[name=\"password\"]");
    const generateButton = container.querySelector(".password-generate");
    const complexityLabel = container.querySelector(".complexity-text");
    const complexityBar = container.querySelector(".progress-bar");

    // Generate a password and asserts.
    fireEvent.click(generateButton, leftClick);
    expect(passwordInput.value).not.toBe("");
    expect(complexityLabel.textContent).not.toBe("complexity: n/a");
    expect(complexityBar.classList.contains("not_available")).toBe(false);
  });

  it("views password when clicking on the view button.", () => {
    const {container} = renderPasswordCreateDialog();

    const leftClick = {button: 0};
    const passwordValue = "Lise Meitner";
    const passwordInput = container.querySelector("[name=\"password\"]");
    const viewButton = container.querySelector(".password-view");
    fireEvent.change(passwordInput, {target: {value: passwordValue}});

    // View password
    fireEvent.click(viewButton, leftClick);
    expect(passwordInput.value).toBe(passwordValue);
    let passwordInputType = passwordInput.getAttribute("type");
    expect(passwordInputType).toBe("text");
    expect(viewButton.classList.contains("selected")).toBe(true);

    // Hide password
    fireEvent.click(viewButton, leftClick);
    expect(passwordInput.value).toBe(passwordValue);
    passwordInputType = passwordInput.getAttribute("type");
    expect(passwordInputType).toBe("password");
    expect(viewButton.classList.contains("selected")).toBe(false);
  });

  it("validates the form when clicking on the submit button.", async() => {
    const {container} = renderPasswordCreateDialog();

    const leftClick = {button: 0};
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, leftClick);
    await waitFor(() => {});

    // Throw name error message
    const nameErrorMessage = container.querySelector(".name.error.message");
    expect(nameErrorMessage.textContent).toBe("A name is required.");

    // Throw password error message
    const passwordErrorMessage = container.querySelector(".password.message.error");
    expect(passwordErrorMessage.textContent).toBe("A password is required.");
  });

  it("displays an error when the API call fail.", async() => {
    const context = getAppContext();
    const {container} = renderPasswordCreateDialog(context);

    const resourceMeta = {
      name: "Password name",
      uri: "https://uri.dev",
      username: "Password username",
      password: "password-value",
      description: "Password description"
    };

    // Fill the required form fields.
    const nameInput = container.querySelector("[name=\"name\"]");
    const nameInputEvent = {target: {value: resourceMeta.name}};
    fireEvent.change(nameInput, nameInputEvent);
    const passwordInput = container.querySelector("[name=\"password\"]");
    const passwordInputEvent = {target: {value: resourceMeta.password}};
    fireEvent.change(passwordInput, passwordInputEvent);

    // Mock the request function to make it return an error.
    jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
      throw new PassboltApiFetchError("Jest simulate API error.");
    });

    // Submit and assert
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, {button: 0});
    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {});

    // Throw general error message
    const generalErrorDialog = container.querySelector(".error-dialog");
    expect(generalErrorDialog).not.toBeNull();
    const generalErrorMessage = container.querySelector(".error-dialog .dialog .dialog-content .form-content");
    expect(generalErrorMessage).not.toBeNull();
  });

  it("requests the addon to create a resource when clicking on the submit button.", async() => {
    const createdResourceId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordCreateDialog(context, props);

    const resourceMeta = {
      name: "Password name",
      uri: "https://uri.dev",
      username: "Password username",
      password: "password-value",
      description: "Password description"
    };

    // Fill the form
    const nameInput = container.querySelector("[name=\"name\"]");
    const nameInputEvent = {target: {value: resourceMeta.name}};
    fireEvent.change(nameInput, nameInputEvent);
    const uriInput = container.querySelector("[name=\"uri\"]");
    const uriInputEvent = {target: {value: resourceMeta.uri}};
    fireEvent.change(uriInput, uriInputEvent);
    const usernameInput = container.querySelector("[name=\"username\"]");
    const usernameInputEvent = {target: {value: resourceMeta.username}};
    fireEvent.change(usernameInput, usernameInputEvent);
    const passwordInput = container.querySelector("[name=\"password\"]");
    const passwordInputEvent = {target: {value: resourceMeta.password}};
    fireEvent.change(passwordInput, passwordInputEvent);
    const complexityLabel = container.querySelector(".complexity-text");
    expect(complexityLabel.textContent).not.toBe("complexity: n/a");
    const complexityBar = container.querySelector(".progress-bar");
    expect(complexityBar.classList.contains("not_available")).toBe(false);
    const descriptionTextArea = container.querySelector("[name=\"description\"]");
    const descriptionTextareaEvent = {target: {value: resourceMeta.description}};
    fireEvent.change(descriptionTextArea, descriptionTextareaEvent);

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn((message, data) => Object.assign({id: createdResourceId}, data)));
    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // Submit and assert
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, {button: 0});

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {});

    const onApiCreateResourceMeta = {
      name: resourceMeta.name,
      uri: resourceMeta.uri,
      username: resourceMeta.username,
      description: resourceMeta.description,
      folder_parent_id: null
    };
    expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.create", onApiCreateResourceMeta, resourceMeta.password);
    expect(context.port.emit).toHaveBeenCalledTimes(1);
    expect(context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.resources.select-and-scroll-to", createdResourceId);
    expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    expect(props.onClose).toBeCalled();
  });
});
