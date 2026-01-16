import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteResourceTag from "./DeleteResourceTag";
import { defaultAppContext, tagToDelete } from "./DeleteResourceTag.test.data";

export default {
  title: "Components/ResourceTag/DeleteResourceTag",
  component: DeleteResourceTag,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <Story {...args} />
      </AppContext.Provider>
    ),
  ],
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route component={(routerProps) => <DeleteResourceTag {...args} {...routerProps} />}></Route>
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = {
  args: {
    context: defaultAppContext({
      tagToDelete: tagToDelete("apache"),
    }),
  },
};

export const WithLongTagName = {
  args: {
    context: defaultAppContext({
      tagToDelete: tagToDelete("tagname".repeat(10)),
    }),
  },
};
