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
 * @since         2.14.0
 */

import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import AppContext from "../../../contexts/AppContext";
import PasswordEditDialog from "./PasswordEditDialog";
import PassboltApiFetchError from "../../../lib/Common/Error/PassboltApiFetchError";
import UserSettings from "../../../lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockPort from "../../../test/mock/MockPort";

beforeEach(() => {
  jest.resetModules();
});

const getDummyResource = function() {
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
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450"
  };
};

const getAppContext = function(appContext) {
  const port = new MockPort();
  port.addRequestListener("passbolt.secret.decrypt", () => "secret-decrypted");
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resources = [getDummyResource()];
  const defaultAppContext = {userSettings, siteSettings, port, resources};

  return Object.assign(defaultAppContext, appContext || {});
};

const getComponentProps = function(props) {
  const defaultAppProps = {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    onClose: jest.fn()
  };

  return Object.assign(defaultAppProps, props || {});
};

const renderPasswordEditDialog = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = getComponentProps(props);

  return render(
    <AppContext.Provider value={appContext}>
      <PasswordEditDialog debug id={props.id} onClose={props.onClose}/>
    </AppContext.Provider>
  );
};

describe("PasswordEditDialog", () => {
  it("matches the styleguide.", () => {
    const resource = getDummyResource();
    const {container} = renderPasswordEditDialog();

    // Dialog title exists and correct
    const dialogTitle = container.querySelector(".dialog-header h2 .dialog-header-title");
    expect(dialogTitle).not.toBeNull();
    expect(dialogTitle.textContent).toBe("Edit");

    // Dialog subtitle exists and correct
    const dialogSubtitle = container.querySelector(".dialog-header h2 .dialog-header-subtitle");
    expect(dialogSubtitle).not.toBeNull();
    expect(dialogSubtitle.textContent).toBe(resource.name);

    // Close button exists
    const closeButton = container.querySelector(".dialog-close");
    expect(closeButton).not.toBeNull();

    // Name input field exists.
    const nameInput = container.querySelector("[name=\"name\"]");
    expect(nameInput).not.toBeNull();
    expect(nameInput.value.trim()).toBe(resource.name);

    // Uri input field exists
    const uriInput = container.querySelector("[name=\"uri\"]");
    expect(uriInput).not.toBeNull();
    expect(uriInput.value.trim()).toBe(resource.uri);

    // Username input field exists
    const usernameInput = container.querySelector("[name=\"username\"]");
    expect(usernameInput).not.toBeNull();
    expect(usernameInput.value.trim()).toBe(resource.username);

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
    expect(passwordGenerateButton.classList.contains("disabled")).toBe(true);

    // Description textarea field exists
    const descriptionTextArea = container.querySelector("[name=\"description\"]");
    expect(descriptionTextArea).not.toBeNull();
    expect(descriptionTextArea.value.trim()).toBe(resource.description);

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
    const {container} = renderPasswordEditDialog(null, props);

    const leftClick = {button: 0};
    const dialogCloseIcon = container.querySelector(".dialog-close");
    fireEvent.click(dialogCloseIcon, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("calls onClose props when clicking on the cancel button.", () => {
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordEditDialog(null, props);

    const leftClick = {button: 0};
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    fireEvent.click(cancelButton, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("changes the style of its security token when the password input get or lose focus when the password is already decrypted", async() => {
    const {container} = renderPasswordEditDialog();
    const passwordInput = container.querySelector("[name=\"password\"]");
    const securityTokenElement = container.querySelector(".security-token");

    /*
     * Password input got focus.
     * Assert style change.
     */
    fireEvent.focus(passwordInput);
    await waitFor(() => {
      expect(passwordInput.classList).toContain("decrypted");
    });
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

  it("generates password when clicking on the generate button.", async() => {
    const {container} = renderPasswordEditDialog();

    const leftClick = {button: 0};
    const passwordInput = container.querySelector("[name=\"password\"]");
    const generateButton = container.querySelector(".password-generate");
    const complexityLabel = container.querySelector(".complexity-text");
    const complexityBar = container.querySelector(".progress-bar");

    fireEvent.focus(passwordInput);
    await waitFor(() => {
      expect(passwordInput.classList).toContain("decrypted");
    });

    fireEvent.click(generateButton, leftClick);
    expect(complexityLabel.textContent).not.toBe("complexity: n/a");
    expect(complexityBar.classList.contains("not_available")).toBe(false);
  });

  it("views password when clicking on the view button.", async() => {
    const {container} = renderPasswordEditDialog();

    const leftClick = {button: 0};
    const passwordValue = "secret-decrypted";

    const passwordInput = container.querySelector("[name=\"password\"]");
    const viewButton = container.querySelector(".password-view.button");

    // View password
    fireEvent.click(viewButton, leftClick);
    await waitFor(() => {
      expect(passwordInput.classList).toContain("decrypted");
    });
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
    const {container} = renderPasswordEditDialog();

    const nameInput = container.querySelector("[name=\"name\"]");
    const passwordInput = container.querySelector("[name=\"password\"]");

    const nameInputEvent = {target: {value: ""}};
    fireEvent.change(nameInput, nameInputEvent);

    fireEvent.focus(passwordInput);
    await waitFor(() => {
      expect(passwordInput.classList).toContain("decrypted");
    });
    const passwordInputEvent = {target: {value: ""}};
    fireEvent.change(passwordInput, passwordInputEvent);

    await waitFor(() => {
    });

    const leftClick = {button: 0};
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, leftClick);

    await waitFor(() => {
      // Throw name error message
      const nameErrorMessage = container.querySelector(".name.error.message");
      expect(nameErrorMessage.textContent).toBe("A name is required.");

      // Throw password error message
      const passwordErrorMessage = container.querySelector(".password.message.error");
      expect(passwordErrorMessage.textContent).toBe("A password is required.");
    });
  });

  it("displays an error when the API call fail.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordEditDialog(context, props);

    // Mock the request function to make it return an error.
    jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
      throw new PassboltApiFetchError("Jest simulate API error.");
    });

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

    // Submit and assert
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, {button: 0});

    // API calls are made on submit, wait on them.
    await waitFor(() => {
    });

    // Throw general error message
    const generalErrorMessage = container.querySelector(".feedbacks.error.message");
    expect(generalErrorMessage.textContent).toBe("Jest simulate API error.");
  });

  it("requests the addon to edit a resource when clicking on the submit button.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderPasswordEditDialog(context, props);

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
    fireEvent.focus(passwordInput);
    await waitFor(() => {
      expect(passwordInput.classList).toContain("decrypted");
    });
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
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn());
    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());

    // Submit and assert
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, {button: 0});

    const onApiUpdateResourceMeta = {
      id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
      name: resourceMeta.name,
      uri: resourceMeta.uri,
      username: resourceMeta.username,
      description: resourceMeta.description
    };

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, resourceMeta.password);
      expect(context.port.emit).toHaveBeenCalledTimes(2);
      expect(context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.notification.display", {
        "message": "The password has been updated successfully",
        "status": "success"
      });
      expect(context.port.emit).toHaveBeenNthCalledWith(2, "passbolt.resources.select-and-scroll-to", "8e3874ae-4b40-590b-968a-418f704b9d9a");
      expect(props.onClose).toBeCalled();
    });
  });
});
