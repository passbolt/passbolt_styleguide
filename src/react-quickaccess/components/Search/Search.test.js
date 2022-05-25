import React from "react";
import Search from "./Search";
import {render, fireEvent, cleanup} from '@testing-library/react';
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
    const searchInput = component.container.querySelector('[name="search"]');
    expect(searchInput.value).toBe("search keywords");
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
});
