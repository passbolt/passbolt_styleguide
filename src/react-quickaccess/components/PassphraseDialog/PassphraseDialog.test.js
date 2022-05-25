import React from "react";
import {render, fireEvent, cleanup} from '@testing-library/react';
import PassphraseDialog from "./PassphraseDialog";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";
import {waitFor} from "@testing-library/dom";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
});

// Cleanup after each test.
afterEach(cleanup);

describe("PassphraseDialog", () => {
  it("should execute the onComplete prop function when the passphrase is correct", async() => {
    const onComplete = jest.fn();
    const appContext = {
      userSettings: new UserSettings(userSettingsFixture),
    };
    const component = render(
      <MockTranslationProvider>
        <PassphraseDialog debug context={appContext} onComplete={onComplete} />
      </MockTranslationProvider>
    );
    // mock the passbolt messaging layer.
    appContext.port = {
      emit: () => new Promise(resolve => resolve()),
      request: () => new Promise(resolve => resolve())
    };

    // Fill the passphrase input.
    const passphraseInput = component.container.querySelector('[name="passphrase"]');
    const event = {target: {value: "admin@passbolt.com"}};
    fireEvent.change(passphraseInput, event);

    // Click on submit.
    const submitButton = component.container.querySelector('button[type="submit"]');
    fireEvent.click(submitButton, {button: 0});

    await waitFor(() => {});
    expect(onComplete).toHaveBeenCalled();
  });
});
