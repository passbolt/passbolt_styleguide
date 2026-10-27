import React from "react";
import ResourceViewPagePassword from "./ResourceViewPagePassword";
import { defaultProps, noUsernameProps, revealedPasswordProps } from "./ResourceViewPagePassword.test.data";
import { copiedSecretState } from "./secretState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPagePassword",
  component: ResourceViewPagePassword,
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

export const Masked = {
  args: defaultProps(),
};

export const Revealed = {
  args: revealedPasswordProps(),
};

export const Copied = {
  args: defaultProps(copiedSecretState("password")),
};

export const NoUsername = {
  args: noUsernameProps(),
};

export const NoRights = {
  args: defaultProps({ canCopy: false, canPreview: false }),
};
