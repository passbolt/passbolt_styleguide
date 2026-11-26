import React from "react";
import ResourceViewPageUsername from "./ResourceViewPageUsername";
import { defaultProps, noUsernameProps } from "./ResourceViewPageUsername.test.data";
import { copiedSecretState } from "./secretState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageUsername",
  component: ResourceViewPageUsername,
  decorators: [
    (Story, { args }) => (
      <div className="container quickaccess">
        <div className="resource item-browse">
          <ul className="properties">
            <Story {...args} />
          </ul>
        </div>
      </div>
    ),
  ],
  parameters: {
    css: "ext_quickaccess",
  },
};

export const Default = {
  args: defaultProps(),
};

export const Copied = {
  args: defaultProps(copiedSecretState("username")),
};

export const NoUsername = {
  args: noUsernameProps(),
};
