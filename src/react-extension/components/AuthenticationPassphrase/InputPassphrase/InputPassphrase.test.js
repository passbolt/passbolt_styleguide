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
 * @since         2.12.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";
import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import InputPassphrase from "./InputPassphrase";

beforeEach(() => {
  jest.resetModules();
});

const getAppContext = function(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    setContext: () => {}
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderInputPassphrase = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <MockTranslationProvider>
      <AppContext.Provider value={appContext}>
        <InputPassphrase debug t={text => text} onClose={props.onClose || jest.fn()}/>
      </AppContext.Provider>
    </MockTranslationProvider>
  );
};

describe("InputPassphrase", () => {
  it("matches the styleguide.", () => {
    const context = getAppContext();
    const {container} = renderInputPassphrase();

    // Dialog title exists and correct.
    const dialogTitle = container.querySelector(".dialog-header h2");
    expect(dialogTitle).not.toBeNull();
    expect(dialogTitle.textContent).toBe("Please enter your passphrase.");

    // Close button exists.
    const closeButton = container.querySelector(".dialog-close");
    expect(closeButton).not.toBeNull();

    // Dialog label exists and correct.
    const dialogLabel = container.querySelector(".dialog-content label");
    expect(dialogLabel).not.toBeNull();
    expect(dialogLabel.textContent).toBe("You need your passphrase to continue.");

    // Passphrase input field exists.
    const passphraseWrapper = container.querySelector(".input.password");
    const passphraseInput = container.querySelector("[type=\"password\"][name=\"passphrase\"]");
    expect(passphraseInput).not.toBeNull();
    // Is focus.
    expect(passphraseInput).toBe(document.activeElement);
    // Has the expected style.
    const passphraseInputStyle = window.getComputedStyle(passphraseWrapper);

    expect(passphraseInputStyle.background).toBe("rgb(0, 0, 0)");
    expect(passphraseInputStyle.color).toBe("rgb(255, 255, 255)");

    // Security token element exists.
    const securityTokenElement = container.querySelector(".security-token");
    expect(securityTokenElement).not.toBeNull();
    expect(securityTokenElement.textContent).toBe("TST");
    // Has the expected style.
    const securityTokenStyle = window.getComputedStyle(securityTokenElement);
    expect(securityTokenStyle.background).toBe("rgb(255, 255, 255)");
    expect(securityTokenStyle.color).toBe("rgb(0, 0, 0)");

    // Remember me checkbox exists.
    const rememberMeInput = container.querySelector("[name=\"rememberMe\"]");
    expect(rememberMeInput).not.toBeNull();
    expect(rememberMeInput.checked).toBe(false);

    // Remember me duration options exists.
    const rememberMeDurationSelect = container.querySelector(".select-container .select");
    expect(rememberMeDurationSelect).not.toBeNull();
    const rememberMeOptions = context.siteSettings.getRememberMeOptions();
    Object.keys(rememberMeOptions).forEach((optionKey, index) => {
      const rememberMeDurationOption = index === 0 ? container.querySelector(".select-container .select .selected-value .value") : container.querySelectorAll(".select-container .select .option")[index - 1];
      expect(rememberMeDurationOption).not.toBeNull();
      expect(rememberMeDurationOption.textContent).toBe(rememberMeOptions[optionKey]);
    });

    // Submit button exists.
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    expect(submitButton).not.toBeNull();

    // Cancel button exists.
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    expect(cancelButton).not.toBeNull();
  });

  it("Should not display the remember me section if no remember me options provided", () => {
    const siteSettingsFixtureWithoutRememberMe = JSON.parse(JSON.stringify(siteSettingsFixture));
    siteSettingsFixtureWithoutRememberMe.passbolt.plugins.rememberMe.options = {};
    const siteSettings = new SiteSettings(siteSettingsFixtureWithoutRememberMe);
    const appContext = getAppContext({siteSettings});
    const {container} = renderInputPassphrase(appContext);

    // Remember me checkbox exists.
    const rememberMeInput = container.querySelector("[name=\"rememberMe\"]");
    expect(rememberMeInput).toBeNull();

    // Remember me duration options exists.
    const rememberMeDurationSelect = container.querySelector("[name=\"rememberMeDuration\"]");
    expect(rememberMeDurationSelect).toBeNull();
  });

  it("calls onClose props when clicking on the close button.", () => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    const leftClick = {button: 0};
    const dialogCloseIcon = container.querySelector(".dialog-close");
    fireEvent.click(dialogCloseIcon, leftClick);
    expect(props.onClose).toBeCalled();
    const error = new UserAbortsOperationError("The dialog has been closed.");
    expect(context.port.emit).toBeCalledWith(undefined, "ERROR", error);
  });

  it("calls onClose props when clicking on the cancel button.", () => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    const leftClick = {button: 0};
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    fireEvent.click(cancelButton, leftClick);
    expect(props.onClose).toBeCalled();
    const error = new UserAbortsOperationError("The dialog has been closed.");
    expect(context.port.emit).toBeCalledWith(undefined, "ERROR", error);
  });

  it("changes the style of its security token when the passphrase input get or lose focus.", () => {
    const {container} = renderInputPassphrase();

    const passphraseWrapper = container.querySelector(".input.password");
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const securityTokenElement = container.querySelector(".security-token");

    /*
     * Passphrase input got focus.
     * Assert style change.
     */
    fireEvent.focus(passphraseInput);
    let securityTokenStyle = window.getComputedStyle(securityTokenElement);
    let passphraseInputStyle = window.getComputedStyle(passphraseWrapper);
    expect(passphraseInputStyle.background).toBe("rgb(0, 0, 0)");
    expect(passphraseInputStyle.color).toBe("rgb(255, 255, 255)");
    expect(securityTokenStyle.background).toBe("rgb(255, 255, 255)");
    expect(securityTokenStyle.color).toBe("rgb(0, 0, 0)");

    /*
     * Passphrase input lost focus.
     * Assert style
     */
    fireEvent.blur(passphraseInput);
    securityTokenStyle = window.getComputedStyle(securityTokenElement);
    passphraseInputStyle = window.getComputedStyle(passphraseInput);
    expect(passphraseInputStyle.background).toBe("white");
    expect(passphraseInputStyle.color).toBe("");
    expect(securityTokenStyle.background).toBe("rgb(0, 0, 0)");
    expect(securityTokenStyle.color).toBe("rgb(255, 255, 255)");
  });

  it("Should validate the passphrase.", async() => {
    const context = getAppContext();
    const {container} = renderInputPassphrase(context);

    // Mock the request function to make it return an error.
    jest.spyOn(context.port, 'request').mockImplementation(jest.fn(message => {
      if (message === "passbolt.keyring.private.checkpassphrase") {
        throw new Error();
      }
    }));

    // Fill the passphrase input.
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const passphraseInputEvent = {target: {value: "ada@passbolt.com"}};
    fireEvent.change(passphraseInput, passphraseInputEvent);

    // Submit.
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    const leftClick = {button: 0};
    fireEvent.click(submitButton, leftClick);

    await waitFor(() => {
    });

    // Label changed
    const dialogLabel = container.querySelector(".dialog-content label");
    expect(dialogLabel.textContent).toBe("Please enter a valid passphrase.");

    // Throw passphrase error message
    const errorMessage = container.querySelector(".error-message");
    expect(errorMessage.textContent).toBe("This is not a valid passphrase.");
  });

  it("Should allow only 3 attempts.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    // Mock the request function to make it return an error.
    jest.spyOn(context.port, 'request').mockImplementation(jest.fn(message => {
      if (message === "passbolt.keyring.private.checkpassphrase") {
        throw new Error();
      }
    }));
    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());

    // Attempting 3 times with a wrong passphrase.
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const passphraseInputEvent = {target: {value: "ada@passbolt.com"}};
    fireEvent.change(passphraseInput, passphraseInputEvent);
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    const leftClick = {button: 0};
    for (let i = 0; i < 3; i++) {
      fireEvent.click(submitButton, leftClick);
      await waitFor(() => {
      });
    }

    // Dialog label does not exist.
    const dialogLabel = container.querySelector(".dialog-content label");
    expect(dialogLabel).toBeNull();

    // Feedback message to be displayed
    const formContent = container.querySelector(".form-content");
    expect(formContent).not.toBeNull();
    expect(formContent.textContent).toBe("Your passphrase is wrong! The operation has been aborted.");

    // Close button exists.
    const closeButton = container.querySelector(".button.primary");
    expect(closeButton).not.toBeNull();
    expect(closeButton.textContent).toBe("Close");

    // Clicking on close.
    fireEvent.click(closeButton, leftClick);
    expect(props.onClose).toBeCalled();
    const error = new UserAbortsOperationError("The dialog has been closed.");
    expect(context.port.emit).toBeCalledWith(undefined, "ERROR", error);
  });

  it("Should capture passphrase.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    const leftClick = {button: 0};

    // Fill passphrase.
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const passphraseInputEvent = {target: {value: "ada@passbolt.com"}};
    fireEvent.change(passphraseInput, passphraseInputEvent);

    // Submit.
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    fireEvent.click(submitButton, leftClick);

    await waitFor(() => {
      // Assert the dialog well respond to the original request call.
      expect(props.onClose).toBeCalled();
      expect(context.port.emit).toBeCalledWith(undefined, "SUCCESS", {
        passphrase: "ada@passbolt.com",
        rememberMe: false
      });
    });
  });

  it("Should capture passphrase and the remember me duration.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    const leftClick = {button: 0};

    // Fill passphrase.
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const passphraseInputEvent = {target: {value: "ada@passbolt.com"}};
    fireEvent.change(passphraseInput, passphraseInputEvent);

    // Check remember me.
    const rememberMeInput = container.querySelector("[name=\"rememberMe\"]");
    fireEvent.click(rememberMeInput, leftClick);

    // Select a remember me duration.
    const rememberMeDurationSelect = container.querySelector(".select-container .select .selected-value");
    // The click on the select.
    fireEvent.click(rememberMeDurationSelect, leftClick);
    // Get the second select item in the list.
    const secondSelectItem = container.querySelectorAll(".select-container .select .option")[1];
    // The click on the second select item.
    fireEvent.click(secondSelectItem, leftClick);
    // Submit.
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    fireEvent.click(submitButton, leftClick);

    await waitFor(() => {
      // Assert the dialog well respond to the original request call.
      expect(props.onClose).toBeCalled();
      expect(context.port.emit).toBeCalledWith(undefined, "SUCCESS", {
        passphrase: "ada@passbolt.com",
        rememberMe: 1800
      });
    });
  });

  it("Should capture passphrase when no remember me options are provided.", async() => {
    const context = getAppContext();
    const props = {
      onClose: jest.fn()
    };
    const {container} = renderInputPassphrase(context, props);

    jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
    const leftClick = {button: 0};

    // Fill passphrase.
    const passphraseInput = container.querySelector("[name=\"passphrase\"]");
    const passphraseInputEvent = {target: {value: "ada@passbolt.com"}};
    fireEvent.change(passphraseInput, passphraseInputEvent);

    // Submit button exists.
    const submitButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    fireEvent.click(submitButton, leftClick);

    await waitFor(() => {
      // Assert the dialog well respond to the original request call.
      expect(props.onClose).toBeCalled();
      expect(context.port.emit).toBeCalledWith(undefined, "SUCCESS", {
        passphrase: "ada@passbolt.com",
        rememberMe: false
      });
    });
  });
});
