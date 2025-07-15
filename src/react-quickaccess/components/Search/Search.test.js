import React from "react";
import Search from "./Search";
import {render, fireEvent, cleanup, waitFor} from '@testing-library/react';
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
});

// Cleanup after each test.
afterEach(cleanup);

describe("Search", () => {
  it("should render the prop search as default input value", () => {
    const appContext = {
      search: "search keywords"
    };
    const component = render(
      <MockTranslationProvider>
        <Search context={appContext} debug />
      </MockTranslationProvider>
    );
    const clearButton = component.container.querySelector('[name="clear-button"]');
    const searchInput = component.container.querySelector('[name="search"]');
    expect(searchInput.value).toBe("search keywords");
    expect(clearButton).toBeTruthy();
  });

  it("should update the context search when the search input is updated", () => {
    const appContext = {
      updateSearch: jest.fn()
    };
    const component = render(
      <MockTranslationProvider>
        <Search context={appContext} debug />
      </MockTranslationProvider>
    );
    const searchInput = component.container.querySelector('[name="search"]');
    const event = {target: {value: "search keywords"}};
    fireEvent.change(searchInput, event);
    expect(appContext.updateSearch).toHaveBeenCalledWith("search keywords");
  });

  it("should not render close button if search input is empty", () => {
    const appContext = {
      search: ""
    };
    const component = render(
      <MockTranslationProvider>
        <Search context={appContext} debug />
      </MockTranslationProvider>
    );
    const clearButton = component.container.querySelector('[name="clear-button"]');
    expect(clearButton).not.toBeTruthy();
  });

  it("should clear input when clear button is clicked", async() => {
    const appContext = {
      search: "search keywords",
      updateSearch: () => {}
    };
    const component = render(
      <MockTranslationProvider>
        <Search context={appContext} debug />
      </MockTranslationProvider>
    );
    const clearButton = component.container.querySelector('[name="clear-button"]');
    expect(clearButton).toBeTruthy();

    const searchInput = component.container.querySelector('[name="search"]');
    const event = {button: 0};
    fireEvent.click(clearButton, event);
    await waitFor(() => () => {
      expect(searchInput.value).toBeNull();
    });
  });
});
