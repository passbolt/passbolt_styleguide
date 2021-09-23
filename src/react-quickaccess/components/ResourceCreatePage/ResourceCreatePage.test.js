import React from "react";
import {render, fireEvent, cleanup} from '@testing-library/react';
import {StaticRouter} from 'react-router-dom';
import ResourceCreatePage from "./ResourceCreatePage";
import "../../../shared/lib/Secret/SecretComplexity";
import {waitFor} from "@testing-library/dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import MockPort from "../../../react-extension/test/mock/MockPort";
import {defaultAppContext} from "./ResourceCreatePage.test.data";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
});

// Cleanup after each test.
afterEach(() => {
  cleanup();
  delete window.passbolt;
});

describe("ResourceCreatePage", () => {

  describe("Form initialization", () => {

    it("should intialize the name and uri input fields with the active tab metadata", async() => {
      const context = defaultAppContext();
      // mock the passbolt messaging layer.
      context.port = {
        request: event => new Promise(resolve => {
          if (event === "passbolt.quickaccess.prepare-resource") {
            resolve({
              name: "Passbolt Browser Extension Test",
              uri: "https://passbolt-browser-extension/test"
            });
          }
        })
      };

      jest.useFakeTimers();
      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );

      // Wait the passbolt.request executed in the ComponentDidMount is resolved.
      await waitFor(() => {});
      jest.runAllTimers();

      // Assert the form.
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("Passbolt Browser Extension Test");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("https://passbolt-browser-extension/test");
    });

    it("should not initialize with chrome new tab metadata", async () => {
      // mock the passbolt messaging layer.
      window.passbolt = {
        request: event => new Promise(resolve => {
          if (event === "passbolt.quickaccess.prepare-resource") {
            resolve({
              name: "newtab",
              uri: "chrome://newtab/"
            });
          }
        })
      };

      const context = defaultAppContext();

      jest.useFakeTimers();
      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );

      // Wait the passbolt.request executed in the ComponentDidMount is resolved.
      await waitFor(() => {});
      jest.runAllTimers();

      // Assert the form.
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("");
    });

    it("should not initialize with firefox new tab metadata", async () => {
      // mock the passbolt messaging layer.
      window.passbolt = {
        request: event => new Promise(resolve => {
          if (event === "passbolt.quickaccess.prepare-resource") {
            resolve({
              name: "",
              uri: "about:newtab"
            });
          }
        })
      };

      jest.useFakeTimers();
      const context = defaultAppContext();
      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );

      // Wait the passbolt.request executed in the ComponentDidMount is resolved.
      await waitFor(() => {});
      jest.runAllTimers();

      // Assert the form.
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("");
    });

  });

  describe("Form validation", () => {

  });

  describe("Form submition", () => {
    it("should create a new password on submit", async () => {
      const createPasswordEventMockCallback = jest.fn();
      const context = defaultAppContext();
      // Mock the passbolt messaging layer.
      context.port = {
        request: function(event) {
          return new Promise(resolve => {
            if (event === "passbolt.quickaccess.prepare-resource") {
              resolve({
                name: "Passbolt Browser Extension Test",
                uri: "https://passbolt-browser-extension/test"
              });
            }
            else if (event === "passbolt.resources.create") {
              createPasswordEventMockCallback(arguments[1], arguments[2]);
              resolve({
                id: "newly-created-resource-id"
              });
            }
          });
        }
      };

      jest.useFakeTimers();
      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );

      // Wait the passbolt.request executed in the ComponentDidMount is resolved.
      await waitFor(() => {});
      jest.runAllTimers();

      // Fill the form empty fields
      const usernameInput = component.container.querySelector('[name="username"]');
      const usernameInputEvent = {target: {value: "test@passbolt.com"}};
      fireEvent.change(usernameInput, usernameInputEvent);
      const passwordInput = component.container.querySelector('[name="password"]');
      const passwordInputEvent = {target: {value: "P4ssb0lt"}};
      fireEvent.change(passwordInput, passwordInputEvent);

      // Submit the form.
      const submitButton = component.container.querySelector('input[type="submit"]');
      fireEvent.click(submitButton, {button: 0});

      // Wait the passbolt.request that request the addon code to create the password is completed.
      await waitFor(() => {});

      // Assert the request to create a password has been called and contain the expected parameters.
      const resourceMeta = {
        name: "Passbolt Browser Extension Test",
        uri: "https://passbolt-browser-extension/test",
        username: "test@passbolt.com"
      };
      expect(createPasswordEventMockCallback).toHaveBeenCalledWith(resourceMeta, "P4ssb0lt");
    });
  });

});
