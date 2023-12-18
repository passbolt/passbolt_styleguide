import React from "react";
import {render, fireEvent, cleanup} from '@testing-library/react';
import {StaticRouter} from 'react-router-dom';
import ResourceCreatePage from "./ResourceCreatePage";
import "../../../shared/lib/Secret/SecretComplexity";
import {waitFor} from "@testing-library/dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import "../../../react-extension/test/lib/crypto/cryptoGetRandomvalues";
import {defaultAppContext, defaultProps} from "./ResourceCreatePage.test.data";
import PrepareResourceContextProvider from "../../contexts/PrepareResourceContext";

// Reset the modules before each test.
beforeEach(() => {
  jest.useFakeTimers();
  jest.resetModules();
});

// Cleanup after each test.
afterEach(() => {
  cleanup();
  delete window.passbolt;
  jest.clearAllTimers();
});

describe("ResourceCreatePage", () => {
  describe("Form initialization", () => {
    it("should intialize the name and uri input fields with the active tab metadata", async() => {
      expect.assertions(4);
      const context = defaultAppContext();
      // mock the passbolt messaging layer.
      const expectedSecret = "AAAAAAAAAAAAAAAAAA";
      context.port = {
        request: event => new Promise(resolve => {
          if (event === "passbolt.quickaccess.prepare-resource") {
            resolve({
              name: "Passbolt Browser Extension Test",
              uri: "https://passbolt-browser-extension/test",
              secret_clear: expectedSecret
            });
          }
        })
      };
      const props = defaultProps();
      delete props.prepareResourceContext;

      const pageToRender = (
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <PrepareResourceContextProvider context={context} passwordPoliciesContext={props.passwordPoliciesContext}>
              <ResourceCreatePage context={context} {...props} debug/>
            </PrepareResourceContextProvider>
          </StaticRouter>
        </MockTranslationProvider>
      );
      const component = render(pageToRender);
      await waitFor(() => {});

      // Assert the form.
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("Passbolt Browser Extension Test");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("https://passbolt-browser-extension/test");
      const usernameInput = component.container.querySelector('[name="username"]');
      expect(usernameInput.value).toBe(context.userSettings.username);
      const passwordInput = component.container.querySelector('[name="password"]');
      expect(passwordInput.value).toBe("AAAAAAAAAAAAAAAAAA");
    });

    it("should not initialize with chrome new tab metadata", async() => {
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
      const props = defaultProps();

      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} prepareResourceContext={props.prepareResourceContext} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );
      await waitFor(() => {});

      // Assert the form.
      expect.assertions(2);
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("");
    });

    it("should not initialize with firefox new tab metadata", async() => {
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

      const context = defaultAppContext();
      const props = defaultProps();

      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <ResourceCreatePage context={context} prepareResourceContext={props.prepareResourceContext} debug />
          </StaticRouter>
        </MockTranslationProvider>
      );
      await waitFor(() => {});

      // Assert the form.
      expect.assertions(2);
      const nameInput = component.container.querySelector('[name="name"]');
      expect(nameInput.value).toBe("");
      const uriInput = component.container.querySelector('[name="uri"]');
      expect(uriInput.value).toBe("");
    });
  });

  describe("Form submition", () => {
    it("should create a new password on submit", async() => {
      const fakeNow = new Date("2023-11-24T00:00:00.000Z");
      expect.assertions(6);
      jest
        .useFakeTimers()
        .setSystemTime(fakeNow);

      const createPasswordEventMockCallback = jest.fn();
      const context = defaultAppContext();
      const props = defaultProps();
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);
      const inputPasswordChange = async password => {
        const passwordInput = component.container.querySelector('[name="password"]');
        const passwordInputEvent = {target: {value: password}};
        fireEvent.change(passwordInput, passwordInputEvent);
        jest.runAllTimers();
      };

      const pwnedWarningMessage = () => component.container.querySelector('.pwned-password.warning-message');
      const complexityText = () => component.container.querySelector('.complexity-text');
      // Mock the passbolt messaging layer.
      context.port = {
        request: function(event, value) {
          return new Promise((resolve, reject) => {
            if (event === "passbolt.quickaccess.prepare-resource") {
              resolve({
                name: "Passbolt Browser Extension Test",
                uri: "https://passbolt-browser-extension/test",
              });
            } else if (event === "passbolt.resources.create") {
              createPasswordEventMockCallback(arguments[1], arguments[2]);
              resolve({
                id: "newly-created-resource-id"
              });
            } else if (event === "passbolt.secrets.powned-password") {
              if (value === "hello-world") {
                resolve(3);
              } else if (value === "unavailable") {
                reject();
              } else {
                resolve(0);
              }
            }
          });
        }
      };

      delete props.prepareResourceContext;
      const component = render(
        <MockTranslationProvider>
          <StaticRouter context={context}>
            <PrepareResourceContextProvider context={context} passwordPoliciesContext={props.passwordPoliciesContext}>
              <ResourceCreatePage context={context} passwordPoliciesContext={props.passwordPoliciesContext} passwordExpiryContext={props.passwordExpiryContext} debug />
            </PrepareResourceContextProvider>
          </StaticRouter>
        </MockTranslationProvider>
      );
      await waitFor(() => {});

      expect.assertions(6);

      // Fill the form empty fields
      const usernameInput = component.container.querySelector('[name="username"]');
      const usernameInputEvent = {target: {value: "test@passbolt.com"}};
      fireEvent.change(usernameInput, usernameInputEvent);

      await inputPasswordChange("P4ssb0lt");
      expect(pwnedWarningMessage()).toBe(null);
      await inputPasswordChange("");
      expect(pwnedWarningMessage()).toBe(null);
      expect(complexityText().textContent).toBe("Quality");
      //Powned password should raise a warning and not block submit
      await inputPasswordChange("hello-world");
      await waitFor(() => {});
      expect(pwnedWarningMessage().textContent).toBe("The password is part of an exposed data breach.");
      //Service for powned password unavailable should not block
      await inputPasswordChange("unavailable");
      await waitFor(() => {});
      expect(pwnedWarningMessage().textContent).toBe("The pwnedpasswords service is unavailable, your password might be part of an exposed data breach");

      //Reset the system time at the desired one as filling input runs some jest timers.
      jest.setSystemTime(fakeNow);

      // Submit the form.
      const submitButton = component.container.querySelector('button[type="submit"]');
      fireEvent.click(submitButton, {button: 0});

      // Wait the passbolt.request that request the addon code to create the password is completed.
      await waitFor(() => {});

      // Assert the request to create a password has been called and contain the expected parameters.
      const resourceMeta = {
        name: "Passbolt Browser Extension Test",
        uri: "https://passbolt-browser-extension/test",
        username: "test@passbolt.com",
        resource_type_id: context.resourceTypesSettings.findResourceTypeIdBySlug(context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION),
        expired: "2023-12-24T00:00:00.000Z",
      };

      const secretDto = {
        password: "unavailable",
        description: ""
      };
      expect(createPasswordEventMockCallback).toHaveBeenCalledWith(resourceMeta, secretDto);
    });
  });
});


