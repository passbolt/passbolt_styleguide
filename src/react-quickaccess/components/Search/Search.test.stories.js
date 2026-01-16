import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import Search from "./Search";
import { defaultAppContext, searchStringAppContext } from "./Search.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/Search",
  component: Search,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <MemoryRouter initialEntries={["/"]}>
          <Route
            component={(routerProps) => (
              <div className="container quickaccess">
                <Story {...args} {...routerProps} />
              </div>
            )}
          />
        </MemoryRouter>
      </AppContext.Provider>
    ),
  ],
  parmeters: {
    css: "ext_quickaccess",
  },
};

export const Initial = {
  args: {
    context: defaultAppContext(),
  },
};

export const WithSearchString = {
  args: {
    context: searchStringAppContext(),
  },
};
